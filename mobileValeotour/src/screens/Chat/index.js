import React, { useEffect, useState, useRef } from "react";
import { Text, View, Button, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView, TouchableOpacity, Image, Modal, Alert } from "react-native";
import { usePubNub } from "pubnub-react";
import { Ionicons } from '@expo/vector-icons'
import { styles } from "./style";
import { Iconify } from 'react-native-iconify';
import { useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "../../styles/colors";
import url from "../../services/url";
import api from '../../services/api';
import config from '../../config/index.json'
import axios from "axios";

import fonts from "../../styles/fonts";

export const Chat = () => {

    const navigation = any = useNavigation();

    const [channelName, setChannelName] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userType, setUserType] = useState(null)
    const [imagePath, setImagePath] = useState(null)
    const [loggedUser, setLoggedUser] = useState(null)
    const pubnub = usePubNub();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [scheduling, setScheduling] = useState(null)
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchAddress = async () => {
            if (scheduling && scheduling.scheduleData) {
                const { longitude, latitude } = scheduling.scheduleData;
                const addr = await getAddress(longitude, latitude);
                setAddress(addr);
            }
        };

        fetchAddress();
    }, [scheduling]);


    const [isOpenModal, setIsOpenModal] = useState(false)
    const fetchUserChatInfo = async () => {
        try {
            const userName = await AsyncStorage.getItem('@userChatName');
            const userImage = await AsyncStorage.getItem('@userChatImage');
            const userType = await AsyncStorage.getItem('@userChatType');
            setUserName(userName);
            setImagePath(userImage);
            setUserType(userType);
        } catch (error) {
            console.log('Erro ao recuperar o ID do usuário logado:', error);
        }
    };

    const scrollViewRef = useRef();

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    const fetchChannelName = async () => {
        try {
            const channel = await AsyncStorage.getItem('@channelName');
            setChannelName(channel);
        } catch (error) {
            console.log('Erro ao recuperar o ID do usuário logado:', error);
        }
    };

    const fetchLoggedUser = async () => {
        try {
            const userID = await AsyncStorage.getItem('@user');
            setLoggedUser(userID);
        } catch (error) {
            console.log('Erro ao recuperar o ID do usuário logado:', error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchLoggedUser(), fetchChannelName()]);
            setIsLoading(false);
        };

        fetchData();
    }, []);
    useEffect(() => {
        fetchUserChatInfo()
    }, []);

    useEffect(() => {
        if (!isLoading && pubnub) {
            pubnub.setUUID(loggedUser);
            const listener = {
                message: envelope => {
                    setMessages(msgs => [
                        ...msgs,
                        {
                            id: envelope.message.id,
                            author: envelope.message.author,
                            content: envelope.message.content,
                            timetoken: envelope.timetoken,
                            type: envelope.message.type,
                            scheduleData: envelope.message.scheduleData,
                            responseText: envelope.message.responseText
                        }
                    ]);
                }
            };

            pubnub.history(
                { channel: channelName, count: 100 },
                (status, response) => {
                    if (status.error) {
                        console.error("Error fetching history:", status);
                    } else {
                        setMessages(response.messages.map(msg => ({
                            id: msg.entry.id,
                            author: msg.entry.author,
                            content: msg.entry.content,
                            timetoken: msg.timetoken,
                            type: msg.entry.type,
                            scheduleData: msg.entry.scheduleData,
                            responseText: msg.entry.responseText,
                        })));
                    }
                }
            );

            pubnub.addListener(listener);
            pubnub.subscribe({ channels: [channelName] });

            return () => {
                pubnub.removeListener(listener);
                pubnub.unsubscribeAll();
            };
        }
    }, [isLoading, channelName, loggedUser]);

    const handleSubmit = (type = 'text') => {
        if (!input.trim() && type === 'text') return;


        const message = {
            content: type === 'text' ? input : null,
            id: Math.random().toString(16).substr(2),
            author: loggedUser,
            type: type,
        };

        if (type === 'text') {
            setInput("");
        }

        pubnub.publish({ channel: channelName, message });
    };

    const handleSubmitResponse = (response) => {

        const message = {
            content: 'Status do agendamento alterado',
            id: Math.random().toString(16).substr(2),
            author: loggedUser,
            type: 'response',
            responseText: response,
            scheduleData: {
                date: scheduling.scheduleData.date,
                time: scheduling.scheduleData.time,
                numHour: scheduling.scheduleData.numHour,
                numPeople: scheduling.scheduleData.numHour,
                latitude: scheduling.scheduleData.latitude,
                longitude: scheduling.scheduleData.longitude,
                schedulingID: scheduling.scheduleData.schedulingID,
                price: scheduling.scheduleData.price
            }
        };
        pubnub.publish({ channel: channelName, message });
    };

    const updateScheduling = (response) => {
        schedulingConfirmation(response)
        setIsOpenModal(false)
    }

    const showScheduling = data => {
        setScheduling(data)
        listSchedulingStatus(data.scheduleData.schedulingID)
        setIsOpenModal(true)
    }

    const schedulingConfirmation = async (s) => {
        const obj = {
            status: s,
            id: scheduling.scheduleData.schedulingID
        };

        try {
            const res = await api.post('valeOTour/guias/confirmacao_agendamento.php', obj, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.data.success === true) {
                handleSubmitResponse(s)
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            Alert.alert(
                'Erro',
                'Ocorreu um erro ao responder. Tente novamente mais tarde.',
                [
                    { text: "OK" }
                ],
                { cancelable: true }
            );
        }
    };

    const getAddress = async (longitude, latitude) => {

        try {
            const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${config.googleApi}`);
            if (res.data.status === 'OK') {
                const address = res.data.results[0].formatted_address;
                return address;

            } else {
                throw new Error('Não foi possível obter o endereço.');
            }
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
            return 'Endereço não encontrado';
        }
    };


    const [schedulingStatus, setSchedulingStatus] = useState('')

    async function listSchedulingStatus(id) {
        try {
            const res = await api.get(`valeOTour/guias/listar_status_agendamento.php?id=${id}`);
            console.log(res.data.dados)
            setSchedulingStatus(res.data.dados[0]);
        } catch (error) {
            console.log("Erro ao Listar " + error);
        }
    }

    return (
        <SafeAreaView style={styles.outerContainer}>
            <View style={styles.headerChat}>
                <View style={{ paddingHorizontal: 24 }}>
                    <View style={styles.headerChatContent}>
                        <View style={styles.headerChatLeft}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons name='chevron-back-outline' color={colors.lightBlue} size={22}></Ionicons>
                            </TouchableOpacity>
                            <View style={styles.headerChatUserIcon}>
                                {
                                    imagePath != 'none' ? (<Image source={{ uri: `${url}valeOTour/usuarios/assets/${imagePath}` }} style={styles.headerChatUserIconImg}></Image>) :
                                        (<Ionicons name="person" color={colors.white} size={20}></Ionicons>)
                                }
                            </View>
                            <Text style={styles.headerChatNameText}>{userName}</Text>
                        </View>

                        {userType == "Guia" ?
                            (<TouchableOpacity onPress={() => navigation.push('Scheduling')}>
                                <Ionicons name='calendar-outline' color={colors.lightBlue} size={22}></Ionicons>
                            </TouchableOpacity>) : ''}

                    </View>
                </View>
                <View style={styles.headerAreaBottom}></View>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color={colors.brighterBlue} />
            ) : (
                channelName && loggedUser ? (
                    <View style={styles.containerMain}>
                        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
                            <KeyboardAvoidingView
                                style={styles.innerContainer}
                                behavior="height"
                                keyboardVerticalOffset={Platform.select({ ios: 78, android: 0 })}
                            >
                                <View style={styles.messagesArea}>

                                    {messages.map(message => {
                                        const isUserLoggedMessage = message.author === loggedUser;

                                        const messageTime = new Date(parseInt(message.timetoken) / 10000);

                                        const formattedTime = messageTime.toLocaleTimeString('pt-BR', {
                                            hour: '2-digit',
                                            minute: '2-digit',

                                        });

                                        const responseAction = message.responseText === 'Aceito'
                                            ? <Text style={{ color: colors.mainColor, fontFamily: fonts.bold }}>ACEITOU</Text>
                                            : <Text style={{ color: '#ff0000', fontFamily: fonts.bold }}>RECUSOU</Text>;

                                        return (
                                            <View
                                                style={
                                                    isUserLoggedMessage
                                                        ? styles.containerSentMessage
                                                        : styles.containerReceivedMessage
                                                }
                                                key={message.timetoken}
                                            >
                                                <View
                                                    style={
                                                        isUserLoggedMessage
                                                            ? styles.messageSentArea
                                                            : styles.messageReceivedArea
                                                    }
                                                >
                                                    {message.type === 'schedule' ? (
                                                        <TouchableOpacity onPress={() => showScheduling(message)}>
                                                            <View
                                                                style={
                                                                    isUserLoggedMessage
                                                                        ? styles.messageSentScheduleArea
                                                                        : styles.messageReceivedScheduleArea
                                                                }
                                                            >
                                                                <Text
                                                                    style={
                                                                        isUserLoggedMessage
                                                                            ? styles.messageSentScheduleText
                                                                            : styles.messageReceivedScheduleText
                                                                    }
                                                                >
                                                                    {isUserLoggedMessage ? 'Você solicitou um pedido para agendamento' : `${userName && userName.toUpperCase()} solicitou um pedido para agendamento`}
                                                                </Text>
                                                            </View>

                                                            <Text
                                                                style={
                                                                    isUserLoggedMessage
                                                                        ? styles.messageSentScheduleShowMore
                                                                        : styles.messageReceivedScheduleShowMore
                                                                }
                                                            >
                                                                Clique para ver mais
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ) : message.type === 'response' ? (
                                                        <TouchableOpacity onPress={() => showScheduling(message)}>
                                                            <View
                                                                style={
                                                                    isUserLoggedMessage
                                                                        ? styles.messageSentScheduleArea
                                                                        : styles.messageReceivedScheduleArea
                                                                }
                                                            >
                                                                <View style={{paddingHorizontal: 3}}>
                                                                    <Text
                                                                        style={
                                                                            isUserLoggedMessage
                                                                                ? styles.messageSentScheduleText
                                                                                : styles.messageReceivedScheduleText
                                                                        }
                                                                    >
                                                                        {isUserLoggedMessage ? 'Você ' : `${userName && userName.toUpperCase()} `}{responseAction}{' a solicitação de agendamento'}
                                                                    </Text>
                                                                </View>
                                                            </View>

                                                            <Text
                                                                style={
                                                                    isUserLoggedMessage
                                                                        ? styles.messageSentScheduleShowMore
                                                                        : styles.messageReceivedScheduleShowMore
                                                                }
                                                            >
                                                                Clique para ver mais
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ) : (
                                                        <Text
                                                            style={
                                                                isUserLoggedMessage
                                                                    ? styles.messageSent
                                                                    : styles.messageReceived
                                                            }
                                                        >
                                                            {message.content}
                                                        </Text>
                                                    )}
                                                    <Text
                                                        style={
                                                            isUserLoggedMessage
                                                                ? styles.messageSentHour
                                                                : styles.messageReceivedHour
                                                        }
                                                    >
                                                        {formattedTime}
                                                    </Text>
                                                </View>
                                            </View>

                                        );
                                    })}
                                </View>
                            </KeyboardAvoidingView>
                        </ScrollView>

                        <View style={styles.containerInputChat}>
                            <TextInput placeholder='Mensagem'
                                style={styles.inputMessage}
                                value={input}
                                onChangeText={setInput}
                                onSubmitEditing={() => handleSubmit('text')}
                                returnKeyType="send"
                                enablesReturnKeyAutomatically={true}
                            ></TextInput>
                            <TouchableOpacity
                                style={styles.btnSendMessages}
                                onPress={() => handleSubmit('text')}
                            >
                                <Ionicons name='chevron-forward-outline' color={colors.white} size={20}></Ionicons>
                            </TouchableOpacity>
                        </View>

                    </View>
                ) : (
                    <Text>Não foi possível carregar as informações do chat.</Text>
                )
            )}

            <Modal
                visible={isOpenModal}
                transparent={true}
                animationType='slide'
            >
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <Animatable.View
                        animation="fadeInUp"
                        duration={600}
                        style={styles.modal}
                    >
                        <View style={styles.headerModal}>
                            <View style={styles.containerIconModal}>
                                <Ionicons name='calendar-outline' size={20} color={colors.mainColor}></Ionicons>
                            </View>

                            <TouchableOpacity onPress={() => setIsOpenModal(false)}>
                                <Ionicons name='close-outline' size={26} color={colors.textColor}></Ionicons>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.titleModal} onPress={() => console.log(scheduling)}>Agendamento</Text>
                        <Text style={styles.modalSubTitle}>
                            {
                                scheduling ? (scheduling.author == loggedUser ? 'Você solicitou um agendamento' : `${userName && userName.toUpperCase()} solicitou um agendamento`) : ''
                            }
                        </Text>

                        <View style={styles.modalRow}>
                            <Ionicons name="checkmark" size={20} color={colors.formLabelColor}></Ionicons>
                            <View>
                                <Text style={styles.modalLabel}>Status agendamento</Text>
                                <Text style={styles.modalText}>{schedulingStatus.status}</Text>
                            </View>
                        </View>
                        <View style={styles.modalRow}>
                            <Iconify icon="uil:schedule" size={20} color={colors.formLabelColor} />
                            <View>
                                <Text style={styles.modalLabel}>Data</Text>
                                <Text style={styles.modalText}>{scheduling ? scheduling.scheduleData.date : ''}</Text>
                            </View>
                        </View>
                        <View style={styles.modalRow}>
                            <Ionicons name="time-outline" size={20} color={colors.formLabelColor}></Ionicons>
                            <View>
                                <Text style={styles.modalLabel}>Horário de início</Text>
                                <Text style={styles.modalText}>{scheduling ? scheduling.scheduleData.time : ''}</Text>
                            </View>
                        </View>

                        <View style={styles.modalRow}>
                            <Ionicons name="person-outline" size={20} color={colors.formLabelColor}></Ionicons>
                            <View>
                                <Text style={styles.modalLabel}>Participantes</Text>
                                <Text style={styles.modalText}>{scheduling ? scheduling.scheduleData.numPeople : ''}</Text>
                            </View>
                        </View>

                        <View style={styles.modalRow}>
                            <Ionicons name="hourglass-outline" size={20} color={colors.formLabelColor}></Ionicons>
                            <View>
                                <Text style={styles.modalLabel}>Total de horas</Text>
                                <Text style={styles.modalText}>{scheduling ? scheduling.scheduleData.numHour : ''}h</Text>
                            </View>
                        </View>

                        <View style={styles.modalRow}>
                            <Ionicons name="location-outline" size={20} color={colors.formLabelColor}></Ionicons>
                            <View>
                                <Text style={styles.modalLabel}>Ponto de encontro</Text>
                                <Text style={styles.modalText}>{address ? address : ''}</Text>
                            </View>
                        </View>

                        <View style={styles.modalRow}>
                            <Ionicons name="cash-outline" size={20} color={colors.formLabelColor}></Ionicons>
                            <View>
                                <Text style={styles.modalLabel}>Preço</Text>
                                <Text style={styles.modalText}>R$ {scheduling ? scheduling.scheduleData.price : ''}</Text>
                            </View>
                        </View>


                        {
                            scheduling ? (scheduling.author != loggedUser && schedulingStatus.status == 'Aguardando confirmação do guia' ? (
                                <View style={styles.containerButtonsModal}>
                                    <TouchableOpacity style={styles.btnModalCancel} onPress={() => updateScheduling('Recusado')}>
                                        <Text style={styles.btnModalCancelText}>Recusar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.btnModalPost} onPress={() => updateScheduling('Aceito')}>
                                        <Text style={styles.btnModalPostText}>Aceitar</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : <View style={{ width: '100%', height: 30 }}></View>) : ''
                        }
                    </Animatable.View>
                </SafeAreaView>
            </Modal >

        </SafeAreaView >
    );
};

