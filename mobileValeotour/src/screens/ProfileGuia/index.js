import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Load from '../../components/Load';
import api from '../../services/api';
import Header from '../../components/Header';
import url from '../../services/url';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { styles } from './style';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, ScrollView, TouchableOpacity, Image, RefreshControl, Modal, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import * as Animatable from 'react-native-animatable';
import Slider from '@react-native-community/slider';
import { showMessage } from "react-native-flash-message";

export default function ProfileGuia() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [guiaData, setGuiaData] = useState([]);
    const [guiaComment, setGuiaComment] = useState([]);
    const [scheduling, setScheduling] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Todos');
    const filters = ['Todos', '5', '4', '3', '2', '1'];
    const [loggedUser, setLoggedUser] = useState(null);

    async function listGuiaData() {
        try {
            const guiaID = await AsyncStorage.getItem('@guia');
            const res = await api.get(`valeOTour/guias/listar_id.php?id=${guiaID}`);
            setGuiaData(res.data.dados);
        } catch (error) {
            console.log("Erro ao Listar:", error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    async function listGuiaComment() {
        try {
            const guiaID = await AsyncStorage.getItem('@guiaID');
            const res = await api.get(`valeOTour/guias/listar_comentarios.php?id=${guiaID}`);
            setGuiaComment(res.data.dados);
        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    async function listScheduling() {
        try {
            const guiaID = await AsyncStorage.getItem('@guiaID');
            const res = await api.get(`valeOTour/guias/listar_agendamentos.php?id=${guiaID}`);
            setScheduling(res.data.dados);
        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    const renderData = () => {
        listGuiaData();
        listGuiaComment()
        fetchLoggedUser();
        listScheduling()
        listCommentCount()
    }

    useEffect(() => {
        renderData()
    }, [isFocused, isLoading]);

    const onRefresh = () => {
        setRefreshing(true);
        renderData()
    };

    const [filteredGuiaComments, setFilteredGuiaComments] = useState([])

    useEffect(() => {
        if (Array.isArray(guiaComment) && guiaComment.length > 0) {
            setFilteredGuiaComments(guiaComment);
        }
    }, [guiaComment]);

    const handleFilterPress = (filter) => {
        setActiveFilter(filter);

        if (Array.isArray(guiaComment) && guiaComment.length > 0) {
            if (filter === 'Todos') {
                setFilteredGuiaComments(guiaComment);
            } else {
                const minStars = parseInt(filter);
                const filteredComments = Array.isArray(guiaComment) && guiaComment.filter(comment => {
                    const stars = comment.stars;
                    return stars >= minStars && stars < minStars + 1;
                });
                setFilteredGuiaComments(filteredComments);
            }
        } else {
            setFilteredGuiaComments([]);
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

    const createChannel = async (userID, otherUserID) => {
        const channelName = getChannelName(userID, otherUserID);

        try {
            let res = await api.get(`valeOTour/chat/listar.php`);
            let channels = res.data.result || [];

            const channelExists = Array.isArray(channels) && channels.some(channel => channel.channelName === channelName);

            if (!channelExists) {

                await api.post(`valeOTour/chat/add.php`, {
                    channelName: channelName,
                    userID: userID,
                    guiaID: otherUserID,
                });
            }

        } catch (error) {
            console.error('Erro ao verificar ou criar o canal:', error);
        }
    };


    const handleUserPress = async (user) => {
        try {
            const channelName = getChannelName(loggedUser, user.userID);
            await AsyncStorage.setItem('@channelName', channelName);
            await createChannel(loggedUser, user.userID);
            user.imagePath ? await AsyncStorage.setItem('@userChatImage', user.imagePath) : await AsyncStorage.setItem('@userChatImage', 'none')
            await AsyncStorage.setItem('@userChatName', user.guiaName?.toString() || '');
            await AsyncStorage.setItem('@userChatType', user.userType?.toString() || '');
            await AsyncStorage.setItem('@userChatID', user.userID?.toString() || '');
            navigation.navigate('Chat');
        } catch (error) {
            console.log('Erro ao configurar o chat:', error);
        }
    };

    const getChannelName = (userId1, userId2) => {
        const ids = [userId1, userId2].sort();
        return `chat_${ids[0]}_${ids[1]}`;
    };

    const [comment, setComment] = useState("");
    const [idRating, setIdRating] = useState(null)
    const [commentCount, setCommentCount] = useState("");
    const [isOpenRating, setIsOpenRating] = useState(false);
    const [stars, setStars] = useState(0);
    const starsRounded = stars.toFixed(1)

    async function listCommentCount() {
        try {
            const guiaID = await AsyncStorage.getItem('@guiaID');
            const userID = await AsyncStorage.getItem('@user');

            const res = await api.get(`valeOTour/guias/verificar_avaliacoes.php?userID=${userID}&guiaID=${guiaID}`);


            if (res.data.success && res.data.dados.length > 0) {
                const firstComment = res.data.dados[0];
                if (firstComment.commentCount > 0) {
                    setComment(firstComment.comment);
                    setCommentCount(firstComment.commentCount);
                    setStars(parseFloat(firstComment.stars));
                    setIdRating(parseFloat(firstComment.idRating));
                }
            } else {
                console.log("Nenhum comentário encontrado.");
            }

        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    const commentValidation = () => {
        if (!stars || !comment) {
            showMessage({
                message: "Erro ao comentar",
                description: 'Preencha os todos os campos!',
                type: "warning",
            });
            return;
        } else {
            if (commentCount > 0) {
                postComment("Update")
            } else {
                postComment("Insert")
            }
        }
    }

    commentSuccess = () => {
        setIsOpenRating(false)
        renderData()
        setStars(0);
        setComment('')
    }

    async function postComment(type) {
        try {
            const userID = await AsyncStorage.getItem('@user');

            const date = new Date();
            const formattedDate = date.getFullYear().toString().slice(-2) + '/' +
                (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
                date.getDate().toString().padStart(2, '0');

            const obj = {
                guiaID: guiaData.guiaID,
                stars: starsRounded,
                comment: comment,
                userID: userID,
                type: type,
                idRating: idRating,
                date: formattedDate
            };

            const res = await api.post('valeOTour/guias/adicionar_avaliacao.php', obj);

            if (res.data.success) {
                commentSuccess();
            } else {
                console.log(res.data)
            }

        } catch (error) {
            console.log('Erro ao postar comentário: ', error);
        }
    }

    function formatDate(date) {
        if (!date) return '';

        const [yy, mm, dd] = date.split('-');
        return `${dd}/${mm}/${yy}`;
    }

    return (
        <View>
            {isLoading ? <Load /> :
                <ScrollView showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.container}>

                        <View style={styles.containerHeader}>
                            <View style={{ paddingHorizontal: 24 }}>
                                <Header title='Guia' hasScdIcon={false} mainIcon='chevron-back-outline' screenLeft={'left'} isButton={true}></Header>

                                <View style={styles.containerGuiaData}>
                                    <LinearGradient
                                        colors={['#0038A5', '#0038A5', '#002875', '#002875']}
                                        start={{ x: 1, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        style={styles.profileImageBorder}
                                    >
                                        <View style={styles.containerImg}>
                                            {
                                                guiaData && guiaData.imagePath ? (
                                                    <Image
                                                        style={styles.profileImageHeader}
                                                        source={{ uri: `${url}valeOTour/usuarios/assets/${guiaData.imagePath}` }}
                                                    />
                                                ) : (
                                                    <Ionicons name="person" color={colors.white} size={42}></Ionicons>
                                                )
                                            }
                                        </View>
                                    </LinearGradient>

                                    <View style={styles.containerGuiaDataContent}>
                                        <View style={{ rowGap: 2 }}>
                                            <Text style={styles.guiaNameTitle} onPress={()=> console.log(guiaData)}>{guiaData && guiaData.guiaName}</Text>
                                            <Text style={styles.guiaCityText}>{guiaData && guiaData.guiaCity}</Text>
                                        </View>
                                        <Text style={styles.guiaCadastur}>{guiaData && guiaData.guiaCadastur}(Cadastur)</Text>
                                    </View>
                                </View>

                                <View style={styles.containerGuiaStatistics}>
                                    <View style={styles.guiaStatisticsArea}>
                                        <Text style={styles.guiaStatisticsText}>{scheduling[0]?.countScheduling || 0}</Text>
                                        <Text style={styles.guiaStatisticsLabel}>Agendamentos</Text>
                                    </View>
                                    <View style={styles.guiaStatisticsArea}>
                                        <Text style={styles.guiaStatisticsText}>
                                            {guiaComment && guiaComment[0]?.totalStars
                                                ? parseFloat(guiaComment[0]?.totalStars).toFixed(1).replace('.', ',')
                                                : "0"}
                                        </Text>

                                        <Text style={styles.guiaStatisticsLabel}>Avaliação Geral</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.guiaChatBtn}
                                        onPress={() => handleUserPress(guiaData)}
                                    >
                                        <Text style={styles.guiaChatBtnText}>Abrir conversa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.headerAreaBottom}></View>
                        </View>

                        <View style={styles.containerMain}>
                            <View style={styles.containerSection}>
                                <Text style={styles.sectionTitle}>Biografia</Text>
                                <Text style={styles.sectionText}>{guiaData && guiaData.guiaBio}</Text>
                            </View>

                            <View style={styles.containerSection}>
                                <Text style={styles.sectionTitle}>Taxas</Text>
                                <View style={styles.containerTaxas}>
                                    <View style={{ gap: 4 }}>
                                        <Text style={styles.cardTaxaLabel}>Taxa por Hora</Text>
                                        <View style={styles.cardTaxa}>
                                            <Text style={styles.cardTaxaText}>R$ {guiaData && Number(guiaData.priceHour).toFixed(2).replace('.',',')}</Text>
                                        </View>
                                    </View>
                                    <View style={{ gap: 4 }}>
                                        <Text style={styles.cardTaxaLabel}>Taxa por Pessoa</Text>
                                        <View style={styles.cardTaxa}>
                                            <Text style={styles.cardTaxaText}>R$ {guiaData && Number(guiaData.pricePeople).toFixed(2).replace('.',',')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.containerSection}>
                                <Text style={styles.sectionTitle}>Comentários</Text>
                                <TouchableOpacity style={styles.btnOpenComment} onPress={() => {
                                    listCommentCount();
                                    setIsOpenRating(true);
                                }}>
                                    <Ionicons name='add-outline' size={20} color={colors.brighterBlue}></Ionicons>
                                    <Text style={styles.btnOpenCommentText}>
                                        {
                                            commentCount && commentCount > 0 ? (
                                                "Editar avaliação"
                                            ) : (
                                                "Adicione uma avaliação"
                                            )
                                        }

                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.containerCommentFilters}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.containerFilters}>
                                    {filters.map((filter, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.btnFilter, activeFilter === filter && styles.btnFilterActive]}
                                            onPress={() => handleFilterPress(filter)}
                                        >
                                            <Text style={[styles.btnFilterText, activeFilter === filter && styles.btnFilterActiveText]}>{filter}</Text>
                                            {filter !== 'Todos' && <Ionicons name='star' size={13} color={activeFilter === filter ? '#FFFFFF' : '#CCCCCC'} />}
                                        </TouchableOpacity>
                                    ))}

                                </View>
                            </ScrollView>
                        </View>

                        <View style={styles.containerMain}>
                            <View style={styles.containerSection}>

                                {
                                    Array.isArray(filteredGuiaComments) && filteredGuiaComments.length > 0 ? filteredGuiaComments.map((item) => (
                                        guiaComment && guiaComment.length > 0 ? guiaComment.map((item) => (
                                            <View style={styles.cardComment} key={item.idComment}>
                                                <Image
                                                    source={{ uri: `${url}valeOTour/usuarios/assets/${item.imagePath}` }}
                                                    style={styles.cardCommentImage}>
                                                </Image>
                                                <View style={styles.cardCommentContent}>
                                                    <Text style={styles.cardCommentName} onPress={() => console.log(item)} >{item.userName}</Text>
                                                    <Text style={styles.cardCommentText}>{item.comment}</Text>
                                                    <View style={styles.cardCommentRatingArea}>
                                                        <Text style={styles.cardCommentRatingText}>{item.stars != null ? Number(item.stars).toFixed(1).replace('.', ',') : '0'
                                                        }</Text>
                                                        <Ionicons name='star' color={colors.brighterBlue} size={18}></Ionicons>
                                                    </View>
                                                </View>
                                                <Text style={styles.cardCommentDate}>
                                                    {formatDate(item.date)}
                                                </Text>
                                            </View>
                                        )) : (<Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Sem resultados</Text>)
                                    )) : (<Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium, marginTop: 20 }}>Sem resultados</Text>)
                                }
                            </View>
                        </View>

                    </View>
                </ScrollView>
            }


            <Modal
                visible={isOpenRating}
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
                                <Ionicons name='create-outline' size={20} color={colors.mainColor}></Ionicons>
                            </View>

                            <TouchableOpacity onPress={() => setIsOpenRating(false)}>
                                <Ionicons name='close-outline' size={26} color={colors.textColor}></Ionicons>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.titleModal}>
                            {
                                commentCount && commentCount > 0 ? (
                                    "Editar avaliação"
                                ) : (
                                    "Avaliar"
                                )
                            }
                        </Text>

                        <View style={styles.containerRatingStars}>
                            <View style={{ flexDirection: 'row', gap: 7, alignItems: 'center' }}>
                                <Text style={styles.ratingStarsText}>{stars.toFixed(1).replace('.', ',')}</Text>
                                <Ionicons name='star' color={colors.brighterBlue} size={26}></Ionicons>
                            </View>
                            <Slider
                                minimumValue={1}
                                maximumValue={5}
                                minimumTrackTintColor={colors.brighterBlue}
                                maximumTrackTintColor={colors.lightBlue}
                                thumbTintColor={colors.mainColor}
                                value={stars}
                                style={styles.inputSlider}
                                onValueChange={(value) => setStars(value)}
                            />
                        </View>
                        <TextInput
                            style={styles.textInputComment}
                            placeholder="Adicione um comentário"
                            placeholderTextColor={colors.lightPurple}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                            onChangeText={(comment) => setComment(comment)}
                            value={comment}
                        ></TextInput>

                        <View style={styles.containerButtonsModal}>
                            <TouchableOpacity style={styles.btnModalCancel} onPress={() => setIsOpenRating(false)}>
                                <Text style={styles.btnModalCancelText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnModalPost} onPress={() => commentValidation()}>
                                <Text style={styles.btnModalPostText}>Publicar</Text>
                            </TouchableOpacity>

                        </View>

                    </Animatable.View>
                </SafeAreaView>
            </Modal>

        </View>

    )
}