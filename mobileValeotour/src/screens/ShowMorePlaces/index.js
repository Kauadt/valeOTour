import { Iconify } from 'react-native-iconify';

import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import Header from '../../components/Header';
import url from '../../services/url';
import colors from '../../styles/colors';
import reset from '../../styles/reset';

import { showMessage } from "react-native-flash-message";
import { styles } from './style';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Text, View, ScrollView, TouchableOpacity, Image, Modal, SafeAreaView, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import fonts from '../../styles/fonts';
import { useNavigation } from '@react-navigation/core';


ParamList = {
    Detail: {
        id_reg: string,
    }
};

export default function ShowMorePlaces() {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [guiaData, setGuiaData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenRating, setIsOpenRating] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [stars, setStars] = useState(0);
    const [placeData, setPlaceData] = useState([]);
    const [placeTime, setPlaceTime] = useState([]);
    const [placeDataImg, setPlaceDataImg] = useState([]);
    const [placeRating, setPlaceRating] = useState([]);
    const [comment, setComment] = useState("");
    const [idRating, setIdRating] = useState(null)
    const [commentCount, setCommentCount] = useState("");
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [activeTabFilter, setActiveTabFilter] = useState('Sobre');
    const filters = ['Todos', '5', '4', '3', '2', '1'];
    const place = { ...placeData.dados } || {}
    const placeImages = [...(placeDataImg?.dados || [])];


    const starsRounded = stars.toFixed(1)

    async function listPlaceData() {
        try {
            const placeID = await AsyncStorage.getItem('@place');
            const res = await api.get(`valeOTour/pontos_turisticos/listar_id.php?id=${placeID}`);
            setPlaceData(res.data);
        } catch (error) {
            console.log("Erro ao Listar:", error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    async function listPlaceTime() {
        try {
            const placeID = await AsyncStorage.getItem('@place');
            const res = await api.get(`valeOTour/pontos_turisticos/listar_horarios.php?id=${placeID}`);
            setPlaceTime(res.data.result);
        } catch (error) {
            console.log("Erro ao Listar:", error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    async function listPlaceImages() {
        try {
            const placeID = await AsyncStorage.getItem('@place');
            const res = await api.get(`valeOTour/pontos_turisticos/listar_imagens.php?id=${placeID}`);
            setPlaceDataImg(res.data);
        } catch (error) {
            console.log("Erro ao Listar:", error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    async function listPlacesRating() {
        try {
            const placeID = await AsyncStorage.getItem('@place');
            const res = await api.get(`valeOTour/pontos_turisticos/listar_avaliacoes.php?id=${placeID}`);
            setPlaceRating(res.data.dados);
            setFilteredPlaceRating(res.data.dados);
        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    async function listCommentCount() {
        try {
            const placeID = await AsyncStorage.getItem('@place');
            const userID = await AsyncStorage.getItem('@user');

            const res = await api.get(`valeOTour/pontos_turisticos/verificar_avaliacoes.php?userID=${userID}&placeID=${placeID}`);


            if (res.data.success && res.data.dados.length > 0) {
                const firstComment = res.data.dados[0];
                console.log(firstComment)
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

    async function listGuiasData() {

        try {
            const res = await api.get(`valeOTour/guias/listar.php`);
            setGuiaData(res.data.result);
        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);

        }
    }

    function renderData() {
        listPlaceData();
        listPlaceImages();
        listPlacesRating();
        listGuiasData();
        listPlaceTime();
        listCommentCount()
    }

    useEffect(() => {
        renderData()
    }, [isFocused]);

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

            const date = new Date();
            const formattedDate = date.getFullYear().toString().slice(-2) + '/' +
                (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
                date.getDate().toString().padStart(2, '0');

            const userID = await AsyncStorage.getItem('@user');
            const obj = {
                placeID: place.placeID,
                stars: starsRounded,
                comment: comment,
                userID: userID,
                type: type,
                idRating: idRating,
                date: formattedDate
            }

            console.log(obj)

            const res = await api.post('valeOTour/pontos_turisticos/adicionar_avaliacao.php', obj);

            if (res.data.success) {
                showMessage({
                    message: "Comentário adicionado",
                    description: "Registro Salvo",
                    type: "success",
                    duration: 800,
                    type: "warning",
                    backgroundColor: colors.brighterBlue,
                    color: "#fff",
                    icon: "success",
                });
            }

            commentSuccess();

        } catch (error) {
            console.log('Erro ao postar comentário: ', error);
        }
    }


    const handleFilterTabPress = (filter) => {
        setActiveTabFilter(filter);
    };

    const [filteredPlaceRating, setFilteredPlaceRating] = useState([])

    const handleFilterPress = (filter) => {
        setActiveFilter(filter);

        if (Array.isArray(placeRating) && placeRating.length > 0) {
            if (filter === 'Todos') {
                setFilteredPlaceRating(placeRating);
            } else {
                const minStars = parseInt(filter);
                const filteredComments = Array.isArray(placeRating) && placeRating.filter(comment => {
                    const stars = comment.stars;
                    return stars >= minStars && stars < minStars + 1;
                });
                setFilteredPlaceRating(filteredComments);
            }
        } else {
            setFilteredPlaceRating([]);
        }
    };

    async function showProfileGuia(userID, guiaID) {
        await AsyncStorage.setItem('@guia', JSON.stringify(userID));
        await AsyncStorage.setItem('@guiaID', JSON.stringify(guiaID));
        navigation.push('ProfileGuia');
    }

    function formatDate(date) {
        if (!date) return '';

        const [yy, mm, dd] = date.split('-');
        return `${dd}/${mm}/${yy}`;
    }

    const [image, setImage] = useState(null)
    const [isOpenImage, setIsOpenImage] = useState(false)






    const showAboutPlace = () => {
        return (
            <View style={styles.containerSobre}>
                <Text style={styles.placeDescriptionText}>{place.description}</Text>
                <Text style={styles.infoSectionTitle}>Fotos</Text>



                <ScrollView horizontal showsVerticalScrollIndicator={false}>
                    <View style={styles.containerImages}>
                        {Array.isArray(placeImages) && placeImages.length > 0 ? (
                            placeImages.map((item) => (
                                <TouchableOpacity onPress={() => {
                                    setImage(`${url}valeOTour/pontos_turisticos/assets/${item.imagePath}`)
                                    setIsOpenImage(true)
                                }} key={item.idImages}>
                                    <Image style={styles.placesImages} source={{ uri: `${url}valeOTour/pontos_turisticos/assets/${item.imagePath}` }} />
                                </TouchableOpacity>

                            ))
                        ) : (
                            <Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Sem resultados</Text>
                        )}
                    </View>
                </ScrollView>
                <Text style={styles.infoSectionTitle}>Detalhes</Text>
                <View style={{ paddingHorizontal: 24, marginTop: 10 }}>
                    <View style={styles.containerDetails}>
                        <View style={styles.detailsRow}>
                            <Ionicons name='location-outline' color={colors.mainGreen} size={20}></Ionicons>
                            <Text style={styles.infoPlaceText}>Rua {place.street} - Bairro {place.bairro}, {place.city} - SP</Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <Ionicons name='call-outline' color={colors.mainGreen} size={20}></Ionicons>
                            <Text style={styles.infoPlaceText}>{place.telefone}</Text>
                        </View>

                        <View style={styles.detailsRowFunc}>
                            <Ionicons name='time-outline' color={colors.mainGreen} size={20}></Ionicons>
                            <Text style={styles.infoPlaceText}>Funcionamento</Text>
                        </View>
                        <View style={styles.detailsRowFunc}>
                            <View style={{ paddingLeft: 38, gap: 16 }}>
                                {Array.isArray(placeTime) && placeTime.length > 0 ? (
                                    placeTime.map((item) => (
                                        <View style={styles.detailsArea} key={item.timeID}>
                                            <Text style={styles.detailsAreaText}>{item.day}</Text>
                                            {
                                                item.status != 'Fechado' ?
                                                    <Text style={styles.detailsAreaText}>  {`${item.openingTime.split(':').slice(0, 2).join(':')} às ${item.closingTime.split(':').slice(0, 2).join(':')}`}</Text>
                                                    : <Text style={styles.detailsAreaText}>Fechado</Text>
                                            }

                                        </View>
                                    ))
                                ) : (
                                    <Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Sem resultados</Text>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const showGuias = () => {
        return (
            <>
                <View style={styles.containerSobre}>
                    <View style={{ paddingHorizontal: reset.padH, gap: 10 }}>
                        {
                            Array.isArray(guiaData) && guiaData.length > 0 ? guiaData.map((item) => (
                                <View style={styles.cardGuia} key={item.userID}>
                                    <TouchableOpacity style={styles.cardGuiaBtn}
                                        onPress={() => showProfileGuia(item.userID, item.guiaID)}
                                    >
                                    </TouchableOpacity>
                                    {
                                        item.imagePath ? (
                                            <Image
                                                style={styles.cardGuiaImg}
                                                source={{ uri: `${url}valeOTour/usuarios/assets/${item.imagePath}` }}
                                            ></Image>
                                        ) : (
                                            <View style={styles.cardGuiaImg}>
                                                <Ionicons name='person' color={colors.lightBlue} size={26}></Ionicons>
                                            </View>
                                        )
                                    }
                                    <View style={styles.cardGuiaContent}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                            <Text style={styles.cardGuiaTitle}>{item.guiaName}</Text>
                                            <Iconify icon="ph:seal-check-fill" size={16} color="#64D196" />
                                        </View>
                                        <Text style={styles.cardGuiaText}>{item.guiaCity}</Text>
                                    </View>

                                </View>
                            )) : (<Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Sem resultados</Text>)
                        }
                    </View>
                </View>
            </>

        )
    }

    const showComments = () => {
        return (
            <View style={styles.containerSobre}>
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

                <View style={{ paddingHorizontal: reset.padH, marginTop: 26 }}>
                    {
                        Array.isArray(filteredPlaceRating) && filteredPlaceRating.length > 0 ? filteredPlaceRating.map((item) => (
                            <View style={styles.cardComment} key={item.idRating}>
                                <Image
                                    source={{ uri: `${url}valeOTour/usuarios/assets/${item.imagePath}` }}
                                    style={styles.cardCommentImage}>
                                </Image>
                                <View style={styles.cardCommentContent}>
                                    <Text style={styles.cardCommentName}>{item.userName}</Text>
                                    <Text style={styles.cardCommentText}>{item.comment}</Text>
                                    <View style={styles.cardCommentRatingArea}>
                                        <Text style={styles.cardCommentRatingText}>{(item.stars).replace('.', ',')}</Text>
                                        <Ionicons name='star' color={colors.brighterBlue} size={18}></Ionicons>
                                    </View>
                                </View>

                                <Text style={styles.cardCommentDate}>
                                    {formatDate(item.date)}
                                </Text>
                            </View>
                        )) : (<Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium, marginTop: 20 }}>Sem resultados</Text>)
                    }
                </View>

            </View>

        )
    }

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.containerHeader}>
                        <Image
                            source={{ uri: `${url}valeOTour/pontos_turisticos/assets/${place.imagePath}` }}
                            style={styles.headerPlaceImg}></Image>
                        <View style={styles.containerNavHeader}>
                            <Header title='' hasScdIcon={false} mainIcon='chevron-back-outline' screenLeft={'left'} isButton={true}></Header>
                        </View>

                        <View style={styles.headerAreaBottom}>
                            <View style={styles.headerAreaBottom}>
                                <TouchableOpacity style={styles.btnShowRoute} onPress={() => {
                                    navigation.navigate("Maps", {
                                        destination: {
                                            latitude: parseFloat(place.latitude),
                                            longitude: parseFloat(place.longitude),
                                            latitudeDelta: 0.00922,
                                            longitudeDelta: 0.00421,
                                        },
                                    });
                                }}>
                                    <View style={{ transform: [{ rotate: '90deg' }] }}>
                                        <Iconify icon="iconoir:maps-arrow" size={30} color={colors.formLabelColor} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.containerMain}>
                        <Text style={styles.placeNameTitle}>{place.placeName}</Text>
                        <View style={{ flexDirection: 'row', gap: 5, marginTop: 2 }}>
                            <Text style={styles.placeRatingStarText}>{parseFloat(place?.stars).toFixed(1).replace('.', ',')}</Text>
                            <Ionicons name='star' size={18} color={colors.brighterBlue}></Ionicons>
                        </View>

                        <Text style={styles.placeTagsTitle}>Tags</Text>

                        <View style={styles.containerTagsPlaces}>
                            <View style={styles.placesTags}>
                                <Text style={styles.placesTagsText}>{place.type}</Text>
                            </View>
                            <View style={styles.placesTags}>
                                <Text style={styles.placesTagsText}>{place.city}</Text>
                            </View>
                            <View style={styles.placesTags}>
                                <Text style={styles.placesTagsText} onPress={() => console.log(place)}>
                                    {place.stars ? parseInt(place.stars) : '0.0'}</Text>
                                <Ionicons name='star' color={colors.lightGray}></Ionicons>
                            </View>
                        </View>
                    </View>

                    <View style={styles.containerFiltersTabs}>
                        <TouchableOpacity
                            style={[styles.btnFilterTabs]}
                            onPress={() => handleFilterTabPress('Sobre')}
                        >
                            <Text style={[styles.btnFilterTabsText, activeTabFilter === 'Sobre' && styles.btnFilterTabsActiveText]}>Sobre</Text>
                            <View style={[{}, activeTabFilter === 'Sobre' && { width: 12, height: 3, borderRadius: 100, backgroundColor: colors.mainGreen }]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btnFilterTabs]}
                            onPress={() => handleFilterTabPress('Comentarios')}
                        >
                            <Text style={[styles.btnFilterTabsText, activeTabFilter === 'Comentarios' && styles.btnFilterTabsActiveText]}>Comentários</Text>
                            <View style={[{}, activeTabFilter === 'Comentarios' && { width: 12, height: 3, borderRadius: 100, backgroundColor: colors.mainGreen }]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btnFilterTabs]}
                            onPress={() => handleFilterTabPress('Guias')}
                        >
                            <Text style={[styles.btnFilterTabsText, activeTabFilter === 'Guias' && styles.btnFilterTabsActiveText]}>Guias</Text>
                            <View style={[{}, activeTabFilter === 'Guias' && { width: 12, height: 3, borderRadius: 100, backgroundColor: colors.mainGreen }]}></View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerInfos}>
                        {
                            activeTabFilter === 'Sobre' && showAboutPlace() ||
                            activeTabFilter === 'Comentarios' && showComments() ||
                            activeTabFilter === 'Guias' && showGuias()
                        }
                    </View>
                </View>
            </ScrollView>

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


            <Modal
                visible={isOpenImage}
                transparent={true}
                animationType='slide'
            >
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
                    <Animatable.View
                        animation="fadeInUp"
                        duration={600}
                        style={{ paddingHorizontal: 24, width: '100%', height: 500 }}
                    >
                        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 5 }}></Image>
                        <TouchableOpacity onPress={() => setIsOpenImage(false)}
                            style={{ width: 32, height: 32, backgroundColor: colors.mainGreen, position: 'absolute', left: 36, top: 12, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name='chevron-back-outline' size={20} color={'#ffffff'}></Ionicons>
                        </TouchableOpacity>
                    </Animatable.View>
                </SafeAreaView>
            </Modal>




        </View>

    )
}