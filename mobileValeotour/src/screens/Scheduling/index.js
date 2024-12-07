import React, { useEffect, useState, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, Button, Alert, Modal, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "../../styles/colors";
import { Ionicons } from '@expo/vector-icons'
import { styles } from "./style";
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Iconify } from "react-native-iconify";
import { usePubNub } from "pubnub-react";
import api from "../../services/api";
import * as Animatable from 'react-native-animatable';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import config from '../../config/index.json'

export const Scheduling = () => {

    const navigation = any = useNavigation();
    const [loggedUser, setLoggedUser] = useState(null)
    const pubnub = usePubNub();


    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [numPeople, setNumPeople] = useState(null);
    const [numHour, setNumHour] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [guiaData, setGuiaData] = useState(null)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [schedulingID, setSchedulingID] = useState(false)


    const [dbDate, setDbDate] = useState(null)
    const [dbTime, setDbTime] = useState(null)

    const showDatePicker = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        DateTimePickerAndroid.open({
            value: tomorrow,
            onChange: (event, selectedDate) => {
                if (selectedDate) {
                    const date = new Date(selectedDate);
                    const formattedDate = date.toLocaleDateString();
                    setSelectedDate(formattedDate);

                    const isoDate = date.toISOString().split('T')[0];
                    setDbDate(isoDate);
                }
            },
            mode: 'date',
            minimumDate: tomorrow
        });
    };

    const showTimePicker = () => {
        DateTimePickerAndroid.open({
            value: new Date(),
            onChange: (event, selectedTime) => {
                if (selectedTime) {
                    const time = new Date(selectedTime);
                    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                    setSelectedTime(formattedTime);

                    const hours = time.getHours().toString().padStart(2, '0');
                    const minutes = time.getMinutes().toString().padStart(2, '0');
                    const seconds = time.getSeconds().toString().padStart(2, '0');
                    const localTime = `${hours}:${minutes}:${seconds}`;

                    setDbTime(localTime);
                }
            },
            mode: 'time',
            is24Hour: true
        });
    };



    const [channelName, setChannelName] = useState(null)
    const fetchChannelName = async () => {
        try {
            const channel = await AsyncStorage.getItem('@channelName');
            setChannelName(channel);
        } catch (error) {
            console.log('Erro ao recuperar o ID do canal:', error);
        }
    };

    const priceScheduling = (priceHour, numHour, pricePerCapita, numPeople) => {
        if (!priceHour || !numHour || !pricePerCapita || !numPeople) {
            return '00,00'
        }
        return ((priceHour * numHour) + (pricePerCapita * numPeople))
    }

    const verficationScheduling = async (priceHour, numHour, pricePerCapita, numPeople, coordinates) => {
        if (!priceHour || !numHour || !pricePerCapita || !numPeople || !coordinates) {
            Alert.alert(
                'Erro',
                'Por favor, preencha todos os campos',
                [
                    { text: "OK" }
                ],
                { cancelable: true }
            );
        } else {
            await requireScheduling();
        }
    };
    
    const requireScheduling = async () => {
        const obj = {
            numHour: numHour,
            numPeople: numPeople,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            dbDate: dbDate,
            dbTime: dbTime,
            userID: loggedUser,
            guiaID: guiaData.guiaID
        };
    
        try {
            const res = await api.post('valeOTour/guias/agendamento_guia.php', obj, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (res.data.success === true) {
                setSchedulingID(res.data.id_agendamento);
                handleSubmit('schedule', res.data.id_agendamento);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };
    
    const handleSubmit = (type, schedulingID) => {
        const message = {
            content: 'Solicitação de agendamento',
            id: Math.random().toString(16).substr(2),
            author: loggedUser,
            type: type,
            scheduleData: type === 'schedule' ? {
                date: selectedDate,
                time: selectedTime,
                numHour: numHour,
                numPeople: numPeople,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                schedulingID: schedulingID,
                price:  priceScheduling(Number(guiaData.priceHour), numHour, Number(guiaData.pricePeople), numPeople )
            } : null
        };
    
        pubnub.publish({ channel: channelName, message });
        navigation.goBack();
    };
    
    const fetchLoggedUser = async () => {
        try {
            const userID = await AsyncStorage.getItem('@user');
            setLoggedUser(userID);
        } catch (error) {
            console.log('Erro ao recuperar o ID do usuário logado:', error);
        }
    };

    async function listGuiaData() {
        try {
            const guiaID = await AsyncStorage.getItem('@userChatID');
            const res = await api.get(`valeOTour/guias/listar_id.php?id=${guiaID}`);
            setGuiaData(res.data.dados);
        } catch (error) {
            console.log("Erro ao Listar:", error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchLoggedUser(), fetchChannelName(), listGuiaData()]);
            setIsLoading(false);
        };

        fetchData();
    }, []);


    useEffect(() => {
        (async function () {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421
                })
            } else {
                throw new Error('Location permission not granted');
            }
        })();
    }, []);


    const mapEl = useRef(null);
    const [origin, setOrigin] = useState(null);

    const [coordinates, setCoordinates] = useState(null);
    const [address, setAddress] = useState(null);

    const handleMapPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setCoordinates({ latitude, longitude });

        try {
            const res = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${config.googleApi}`
            );
            const data = await res.json();
            if (data.status === 'OK') {
                const formattedAddress = data.results[0].formatted_address;
                setAddress(formattedAddress);
            } else {
                Alert.alert('Erro', 'Não foi possível obter o endereço.');
            }
        } catch (error) {
            console.error('Erro ao obter o endereço:', error);
            Alert.alert('Erro', 'Não foi possível obter o endereço.');
        }
    };


    closeModal = (isClose) => {
        if (isClose) {
            setIsOpenModal(false)
            setAddress(null)
        } else {
            setIsOpenModal(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.headerTop}>
                    <Header title='Agendamento' hasScdIcon={false} mainIcon='chevron-back-outline' screenLeft={'left'} isButton={true}></Header>
                </View>
                <View style={styles.headerAreaBottom}></View>
            </View>


            <View style={styles.containerMain}>
                <View style={styles.containerInputBtn}>
                    <View style={styles.containerInput}>
                        <Text style={styles.inputLabel}>Data</Text>
                        <TouchableOpacity style={styles.inputDateAndTime} onPress={showDatePicker}>
                            <View style={styles.containerIconInputDateTime}>
                                <Iconify icon="uil:schedule" size={16} color={colors.mainColor} />
                            </View>
                            <Text style={styles.inputDateTimeText}>{selectedDate || 'Data'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.inputLabel}>Horário de Início</Text>
                        <TouchableOpacity style={styles.inputDateAndTime} onPress={showTimePicker}>
                            <View style={styles.containerIconInputDateTime}>
                                <Ionicons name="time-outline" size={16} color={colors.mainColor}></Ionicons>
                            </View>
                            <Text style={styles.inputDateTimeText}>{selectedTime || 'Horário'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.containerInputBtn}>
                    <View style={styles.containerInput}>
                        <Text style={styles.inputLabel}>Nº Participantes</Text>
                        <TextInput style={styles.inputText}
                            placeholder="0 pessoas"
                            placeholderTextColor={colors.lightGray}
                            onChangeText={(numPeople) => setNumPeople(numPeople)}
                            value={numPeople}
                            keyboardType="numeric"
                        ></TextInput>
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.inputLabel}>Tempo de passeio (h)</Text>
                        <TextInput style={styles.inputText}
                            placeholder="Tempo"
                            placeholderTextColor={colors.lightGray}
                            onChangeText={(numHour) => setNumHour(numHour)}
                            value={numHour}
                            keyboardType="numeric"
                        ></TextInput>
                    </View>
                </View>
            </View>

            <View style={styles.containerPoint}>
                <Text style={styles.inputLabel}>Ponto de encontro</Text>
                <View style={styles.cardPoint}>
                    <Text style={styles.cardPointText}>{address ? address : 'Selecione um ponto de encontro'}</Text>
                    <TouchableOpacity style={styles.btnChoosePoint}>
                        <Text style={styles.btnChoosePointText} onPress={() => setIsOpenModal(true)}>Escolher</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.containerScheduling}>
                <View style={styles.containerSchedulingTop}>
                    <Text style={styles.containerSchedulingTopText}>Preço Total</Text>
                    <Text style={styles.containerSchedulingTopText}>{guiaData ? 'R$ ' + priceScheduling(Number(guiaData.priceHour), numHour, Number(guiaData.pricePeople), numPeople) : ''} </Text>
                </View>
                <TouchableOpacity style={styles.btnScheduling} onPress={() => verficationScheduling(Number(guiaData.priceHour), numHour, Number(guiaData.pricePeople), numPeople, address)}>
                    <Text style={styles.btnSchedulingText}>AGENDAR</Text>
                </TouchableOpacity>
            </View>


            <Modal
                visible={isOpenModal}
                transparent={true}
                animationType='slide'
            >
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <Animatable.View
                        animation="fadeInUp"
                        duration={600}
                        style={styles.modalRating}
                    >
                        <View style={styles.headerModal}>
                            <View style={styles.containerIconModal}>
                                <Ionicons name='map-outline' size={20} color={colors.mainColor}></Ionicons>
                            </View>

                            <TouchableOpacity onPress={() => closeModal(true)}>
                                <Ionicons name='close-outline' size={26} color={colors.textColor}></Ionicons>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.titleModal}>Ponto de Encontro</Text>

                        <View style={styles.containerSearch}>
                            <View style={styles.containerInputSearch}>
                                <Ionicons name='search-outline' color={colors.mediumGray} size={20}></Ionicons>
                                <TextInput style={styles.inputSearch} placeholder='Toque para pesquisar' placeholderTextColor={colors.mediumGray}></TextInput>
                            </View>
                        </View>

                        <View style={styles.containerRatingStars}>

                            <View style={{ flexDirection: 'row', gap: 7, alignItems: 'center' }}>

                            </View>

                        </View>


                        <MapView
                            style={styles.map}
                            initialRegion={origin}
                            zoomEnabled={true}
                            loadingEnabled={true}
                            ref={mapEl}
                            onPress={handleMapPress}
                        >
                            {coordinates && (
                                <Marker
                                    coordinate={coordinates}
                                    title="Local Selecionado"
                                    description={address || `Lat: ${coordinates.latitude}, Lon: ${coordinates.longitude}`}
                                />
                            )}
                        </MapView>
                        <Text style={styles.addressText}>{address ? address : ''}</Text>

                        <View style={styles.containerButtonsModal}>
                            <TouchableOpacity style={styles.btnModalCancel} onPress={() => closeModal(true)}>
                                <Text style={styles.btnModalCancelText} >Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnModalPost} onPress={() => closeModal(false)}>
                                <Text style={styles.btnModalPostText}>Confirmar</Text>
                            </TouchableOpacity>

                        </View>

                    </Animatable.View>
                </SafeAreaView>
            </Modal>



        </View>
    );
};

