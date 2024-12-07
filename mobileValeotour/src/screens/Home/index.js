import React, { useEffect, useState } from 'react';
import { styles } from './style';

import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    RefreshControl,
    Modal,
    TouchableWithoutFeedback,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Load from '../../components/Load';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import url from '../../services/url';
import { Iconify } from 'react-native-iconify';
import * as Animatable from 'react-native-animatable';

export default function Home() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [userData, setUserData] = useState([]);
    const [guiaData, setGuiaData] = useState([]);
    const [placeData, setPlaceData] = useState([]);
    const [placeFilters, setPlaceFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isOpenNotifications, setIsOpenNotifications] = useState(false);
    const [isOpenModalGuiaStatus, setIsOpenModalGuiaStatus] = useState(false)
    const [isOpenModalGuia, setIsOpenModalGuia] = useState(false)

    const user = { ...userData.dados } || {}

    const [loggedUser, setLoggedUser] = useState(null);

    const fetchLoggedUser = async () => {
        try {
            const userID = await AsyncStorage.getItem('@user');
            setLoggedUser(userID);
        } catch (error) {
            console.log('Erro ao recuperar o ID do usuário logado:', error);
        }
    };

    const becomeGuia = async () => {
        const userID = await AsyncStorage.getItem('@user');

        const obj = {
            userID: userID,
            userType: 'Guia'
        };

        try {
            const res = await api.post('valeOTour/guias/tornar_guia.php', obj, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.data.success === true) {
                await AsyncStorage.clear();
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                });
                navigation.navigate('Login');
                setIsOpenNotifications(false)
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const filteredGuiaData = Array.isArray(guiaData) && guiaData.filter((item) => item.userID != loggedUser);

    async function listUserData() {

        try {
            const userID = await AsyncStorage.getItem('@user');
            const userType = await AsyncStorage.getItem('@userType');
            const res = await api.get(`valeOTour/usuarios/listar_id.php?id=${userID}&tipo_usuario=${userType}`);
            setUserData(res.data);

        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    const [verification, setVerification] = useState([])

    async function verifyIsGuia() {
        try {
            const userID = await AsyncStorage.getItem('@user');
            const res = await api.get(`valeOTour/usuarios/listar_verificacao.php?id=${userID}`);
            setVerification(res.data.dados)
        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        if (isOpenNotifications) {
            verifyIsGuia();
        }
    }, [isOpenNotifications]);

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

    async function listPlaceData() {
        try {
            const res = await api.get(`valeOTour/pontos_turisticos/listar.php`);
            setPlaceData(res.data.result);
        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }
    const renderData = async () => {
        try {
            await Promise.all([
                listUserData(),
                listGuiasData(),
                listPlaceData(),
                fetchLoggedUser()
            ]);
            filterControls()
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            renderData();
        }
    }, [isFocused]);


    const onRefresh = () => {
        setRefreshing(true);
        renderData();
    };


    filterControls = () => {
        if (placeData.length > 0) {
            setPlaceFilters(placeData);
        }
        setActiveFilter('Todos');
    }

    async function showProfileGuia(userID, guiaID) {
        await AsyncStorage.setItem('@guia', JSON.stringify(userID));
        await AsyncStorage.setItem('@guiaID', JSON.stringify(guiaID));
        navigation.push('ProfileGuia');
    }

    async function showProfilePlace(placeID) {
        await AsyncStorage.setItem('@place', JSON.stringify(placeID));
        navigation.push('ShowMorePlaces');
    }


    async function showEixo(type) {
        await AsyncStorage.setItem('@eixos', JSON.stringify(type));
        navigation.push('Eixos');
    }

    const [activeFilter, setActiveFilter] = useState('Todos');

    const handleFilterPress = (filter) => {
        setActiveFilter(filter);

        if (Array.isArray(placeData) && placeData.length > 0) {
            if (filter === 'Todos') {
                setPlaceFilters(placeData);
            } else {
                const filteredPlaces = placeData.filter(place => place.type === filter);
                setPlaceFilters(filteredPlaces);
            }
        } else {
            setPlaceFilters([]);
        }
    };

    const keyMap = {
        biografia: "Biografia",
        cadastur: "Cadastur",
        cadasturFrente: "Foto do Cadastur (Frente)",
        cadasturVerso: "Foto do Cadastur (Verso)",
        cpf: "CPF",
        eixo: "Eixo de Atuação",
        email: "E-mail",
        imagePath: "Foto de Perfil",
        name: "Nome de Usuário",
        priceHour: "Preço por Hora",
        pricePeople: "Preço por Pessoa",
    };

    const reprovados = Object.entries(verification).filter(
        ([key, value]) => value === "Reprovado" && key !== "status"
    );



    return (
        <View>
            {isLoading ? <Load /> :
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                    <View style={styles.container}>
                        <View style={styles.containerHeader}>
                            <View style={styles.containerTopButtonsHeader}>
                                <View style={styles.containerProfileButtonHeader}>
                                    {user && user.imagePath ? (
                                        <View style={styles.btnProfileHeader}>
                                            <Image
                                                style={styles.profileImageHeader}
                                                source={{ uri: `${url}valeOTour/usuarios/assets/${user.imagePath}` }}
                                            ></Image>
                                        </View>
                                    ) : ''}

                                    <Text style={{ color: colors.white, fontFamily: fonts.medium, fontSize: 14 }}>Olá,
                                        <Text style={
                                            { color: colors.mainGreen, fontFamily: fonts.bold }}> {user.nome}!
                                        </Text>
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    isOpenNotifications ? setIsOpenNotifications(false) : setIsOpenNotifications(true)
                                }}>
                                    <Ionicons name='notifications-outline' color={colors.white} size={25}></Ionicons>
                                </TouchableOpacity>

                                <Modal
                                    visible={isOpenNotifications}
                                    transparent={true}
                                >
                                    <View style={{ flex: 1 }}>
                                        <TouchableWithoutFeedback onPress={() => setIsOpenNotifications(false)}>
                                            <View style={{ flex: 1 }} />
                                        </TouchableWithoutFeedback>

                                        <SafeAreaView style={{ width: '100%', position: 'absolute' }}>
                                            <Animatable.View
                                                animation="fadeInRight"
                                                duration={600}
                                                style={styles.containerNotifications}
                                            >

                                                <View style={{ gap: 10 }}>
                                                    {
                                                        verification && verification.isGuia > 0 ? (
                                                            <View style={styles.cardNotification}>
                                                                <View style={styles.cardNotificationIconVerify}>
                                                                    <Iconify icon="ic:round-domain-verification" size={20} color={colors.lightPurple} />
                                                                </View>
                                                                <View style={styles.cardNotificationContent}>
                                                                    <Text style={styles.cardNotificationText}>
                                                                        <Text style={{ fontFamily: fonts.bold }}>Status da Verificação:</Text>
                                                                    </Text>
                                                                    <Text style={styles.cardNotificationText}>
                                                                        <Text>
                                                                            {verification.status == "Aprovado" ? (
                                                                                <Text style={{ color: colors.mainGreen }}>{verification.status}</Text>
                                                                            ) : verification.status == "Reprovado" ? (
                                                                                <Text style={{ color: '#ff0000' }}>{verification.status}</Text>
                                                                            ) : (
                                                                                <Text style={{ color: colors.lightPurple }}>{verification.status}</Text>
                                                                            )}
                                                                        </Text>
                                                                    </Text>
                                                                </View>
                                                                {

                                                                        verification && verification.status == "Reprovado" ? (
                                                                            <TouchableOpacity style={styles.cardNotificationBtn} onPress={() => setIsOpenModalGuiaStatus(true)}>
                                                                                <Text style={styles.cardNotificationBtnText}>Ver mais</Text>
                                                                            </TouchableOpacity>
                                                                        ) : (
                                                                            <TouchableOpacity style={styles.cardNotificationBtn} onPress={() => setIsOpenModalGuia(true)}>
                                                                                <Text style={styles.cardNotificationBtnText}>Continuar</Text>
                                                                            </TouchableOpacity>
                                                                        )

                                                                }

                                                            </View>
                                                        ) : (
                                                            <Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Sem resultados</Text>
                                                        )
                                                    }
                                                </View>

                                            </Animatable.View>
                                        </SafeAreaView>
                                    </View>
                                </Modal>


                            </View>


                            <View style={styles.containerMainText}>
                                <Text style={styles.mainText}>Para onde</Text>
                                <View style={{ paddingLeft: 16 }}>
                                    <Text style={styles.mainText}>você irá hoje?</Text>
                                </View>
                            </View>

                            <View style={styles.containerGroupButtons}>
                                <View style={styles.containerTourismTypeButtons}>
                                    <TouchableOpacity style={styles.btnTourismType} onPress={() => showEixo('Histórico')}>
                                        <Ionicons name='book-outline' size={30} color={colors.lightBlue}></Ionicons>
                                    </TouchableOpacity>
                                    <Text style={styles.tourismTypeText}>Histórico</Text>
                                </View>
                                <View style={styles.containerTourismTypeButtons}>
                                    <TouchableOpacity
                                        style={styles.btnTourismType}
                                        onPress={() => showEixo('Gastronômico')}
                                    >
                                        <Ionicons name='restaurant-outline' size={30} color={colors.lightBlue}></Ionicons>
                                    </TouchableOpacity>
                                    <Text style={styles.tourismTypeText}>Gastronômico</Text>
                                </View>
                                <View style={styles.containerTourismTypeButtons}>
                                    <TouchableOpacity
                                        style={styles.btnTourismType}
                                        onPress={() => showEixo('Ecológico')}
                                    >
                                        <Ionicons name='leaf-outline' size={30} color={colors.lightBlue}></Ionicons>
                                    </TouchableOpacity>
                                    <Text style={styles.tourismTypeText}>Ecológico</Text>
                                </View>
                                <View style={styles.containerTourismTypeButtons}>
                                    <TouchableOpacity
                                        style={styles.btnTourismType}
                                        onPress={() => showEixo('Aventura')}
                                    >
                                        <Ionicons name='bicycle-outline' size={30} color={colors.lightBlue}></Ionicons>
                                    </TouchableOpacity>
                                    <Text style={styles.tourismTypeText}>Aventura</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.containerMainContent}>

                            <View style={styles.containerGuiasHeader}>
                                <Text style={styles.titleMainContent}>Guias</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.push('Guias')}
                                >
                                    <Text style={styles.btnShowMoreText}>Ver mais</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.containerGuias}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View style={styles.containerCardGuias}>
                                        {filteredGuiaData.length > 0 ? (
                                            filteredGuiaData.map((item) => (
                                                <View style={styles.cardGuias} key={item.userID}>
                                                    <TouchableOpacity></TouchableOpacity>
                                                    {
                                                        item.imagePath ? (
                                                            <Image
                                                                style={styles.cardGuiaImg}
                                                                source={{ uri: `${url}valeOTour/usuarios/assets/${item.imagePath}` }}
                                                            />
                                                        ) : (
                                                            <View style={styles.cardGuiaImg}>
                                                                <Ionicons name='person' color={colors.lightBlue} size={28}></Ionicons>
                                                            </View>
                                                        )
                                                    }
                                                    <Text style={styles.cardGuiaTitle}>{item.guiaName}</Text>
                                                    <Text style={styles.cardGuiaText}>{item.guiaCity}</Text>
                                                    <View style={styles.containerCardGuiaBtn}>
                                                        <TouchableOpacity
                                                            style={styles.cardGuiaBtn}
                                                            onPress={() => showProfileGuia(item.userID, item.guiaID)}
                                                        >
                                                            <Ionicons
                                                                name='arrow-forward'
                                                                size={18}
                                                                color={colors.mainGreen}
                                                                style={styles.cardGuiaBtnIcon}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            ))
                                        ) : (
                                            <Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Sem resultados</Text>
                                        )}

                                    </View>
                                </ScrollView>
                            </View>

                            <Text style={styles.titleMainContent}>Populares</Text>

                            <View style={styles.containerMostPopularPlacesFilters}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View style={styles.containerFilters}>
                                        <TouchableOpacity
                                            style={[styles.btnFilter, activeFilter === 'Todos' && styles.btnFilterActive]}
                                            onPress={() => handleFilterPress('Todos')}
                                        >
                                            <Text style={[styles.btnFilterText, activeFilter === 'Todos' && styles.btnFilterActiveText]}>Todos</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.btnFilter, activeFilter === 'Alimentação' && styles.btnFilterActive]}
                                            onPress={() => handleFilterPress('Alimentação')}
                                        >
                                            <Text style={[styles.btnFilterText, activeFilter === 'Alimentação' && styles.btnFilterActiveText]}>Alimentação</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.btnFilter, activeFilter === 'Hospedagem' && styles.btnFilterActive]}
                                            onPress={() => handleFilterPress('Hospedagem')}
                                        >
                                            <Text style={[styles.btnFilterText, activeFilter === 'Hospedagem' && styles.btnFilterActiveText]}>Hospedagem</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.btnFilter, activeFilter === 'Compras' && styles.btnFilterActive]}
                                            onPress={() => handleFilterPress('Compras')}
                                        >
                                            <Text style={[styles.btnFilterText, activeFilter === 'Compras' && styles.btnFilterActiveText]}>Compras</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.btnFilter, activeFilter === 'Lazer' && styles.btnFilterActive]}
                                            onPress={() => handleFilterPress('Lazer')}
                                        >
                                            <Text style={[styles.btnFilterText, activeFilter === 'Lazer' && styles.btnFilterActiveText]}>Lazer</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.btnFilter, activeFilter === 'Trilha' && styles.btnFilterActive]}
                                            onPress={() => handleFilterPress('Trilha')}
                                        >
                                            <Text style={[styles.btnFilterText, activeFilter === 'Trilha' && styles.btnFilterActiveText]}>Trilhas</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>

                            <View style={styles.containerCardPlaces}>

                                {Array.isArray(placeFilters) && placeFilters.length > 0 ? (
                                    placeFilters.map((item) => (
                                        <View style={styles.cardPlaces} key={item.placeID}>
                                            <TouchableOpacity style={styles.btnShowMorePlaces} onPress={() => showProfilePlace(item.placeID)}></TouchableOpacity>
                                            <Image style={styles.cardPlacesImg} source={{ uri: `${url}valeOTour/pontos_turisticos/assets/${item.imagePath}` }} />
                                            <View style={styles.cardPlacesBottom}>
                                                <Text style={styles.cardPlacesText}>{item.placeName}</Text>
                                                <View style={styles.cardPlacesRating}>
                                                    <Text style={styles.cardPlacesRatingText}>{item.totalStars ?
                                                        parseFloat(item.totalStars).toFixed(1).replace('.', ',') : '0'}</Text>
                                                    <Ionicons name='star' color={colors.brighterBlue} size={11} />
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Sem resultados</Text>
                                )}

                            </View>
                        </View>
                    </View>
                </ScrollView>
            }


            <Modal
                visible={isOpenModalGuiaStatus}
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
                                <Ionicons name='warning-outline' size={20} color={colors.mainColor}></Ionicons>
                            </View>

                            <TouchableOpacity onPress={() => setIsOpenModalGuiaStatus(false)}>
                                <Ionicons name='close-outline' size={26} color={colors.textColor}></Ionicons>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.titleModal}>Cadastro Recusado</Text>

                        <Text style={styles.modalSubTitle}>
                            Parece que houve um problema com as informações fornecidas para cadastro como Guia. Por favor, verifique:
                        </Text>

                        <View style={{ marginTop: 30 }}>
                            {reprovados.map(([key], index) => (
                                <Text key={index} style={styles.modalGuiaVerificationText}>
                                    • {keyMap[key] || key}
                                </Text>
                            ))}
                        </View>

                        {
                            verification && verification.comment ? (
                                <View style={styles.cardCommentAdmin}>
                                    <Text style={styles.cardCommentAdminTitle}>Comentário do administrador:</Text>
                                    <Text style={styles.cardCommentAdminText}>{verification && verification.comment}</Text>
                                </View>
                            ) : ''
                        }



                        <View style={styles.containerButtonsModal}>
                            <TouchableOpacity style={styles.btnModalCancel} onPress={() => setIsOpenModalGuiaStatus(false)} >
                                <Text style={styles.btnModalCancelText}>Fechar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnModalPostGreen} onPress={() => {
                                navigation.push('GuiaBecome')
                                setIsOpenModalGuiaStatus(false)
                                setIsOpenNotifications(false)
                            }}>
                                <Text style={styles.btnModalPostText}>Tentar novamente</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </SafeAreaView>
            </Modal>


            <Modal
                visible={isOpenModalGuia}
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
                                <Ionicons name='checkmark-outline' size={20} color={colors.mainColor}></Ionicons>
                            </View>

                            <TouchableOpacity onPress={() => setIsOpenModalGuia(false)}>
                                <Ionicons name='close-outline' size={26} color={colors.textColor}></Ionicons>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.titleModal}>Cadastro Aprovado</Text>

                        <Text style={styles.modalSubTitle}>
                            Parabéns! Seu cadastro como Guia foi aprovado com sucesso. Para começar a explorar todas as funcionalidades disponíveis, por favor, faça login novamente.
                        </Text>

                        <View style={styles.containerButtonsModal}>

                            <TouchableOpacity style={styles.btnModalPostGreen} onPress={() => becomeGuia()}>
                                <Text style={styles.btnModalPostText}>Continuar</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </SafeAreaView>
            </Modal >

        </View >
    )
}