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
    SafeAreaView,
    Alert,
    TextInput

} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Load from '../../components/Load';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import api from '../../services/api';

import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import colors from '../../styles/colors';
import { Graphic } from '../../components/Graphic';
import url from '../../services/url';
import * as Animatable from 'react-native-animatable';
import fonts from '../../styles/fonts';

import Header from '../../components/Header'

export default function User() {



    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [userData, setUserData] = useState([]);
    const [scheduling, setScheduling] = useState([]);
    const [userScheduling, setUserScheduling] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
    const [isOpenModalAuthDelete, setIsOpenModalAuthDelete] = useState(false)
    const [isOpenModalAuthDeleteGuia, setIsOpenModalAuthDeleteGuia] = useState(false)
    const [isOpenModalLogOut, setIsOpenModalLogOut] = useState(false)
    const [isOpenModalAuthFail, setIsOpenModalAuthFail] = useState(false)
    const [isOpenModalAuthFailGuia, setIsOpenModalAuthFailGuia] = useState(false)
    const [isOpenModalGuia, setIsOpenModalGuia] = useState(false)
    const [isOpenModalDeleteGuia, setIsOpenModalDeleteGuia] = useState(false)


    async function listUserData() {

        try {
            const user = await AsyncStorage.getItem('@user');
            const userType = await AsyncStorage.getItem('@userType');
            const res = await api.get(`valeOTour/usuarios/listar_id.php?id=${user}&tipo_usuario=${userType}`);
            setUserData(res.data.dados);

        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);

        }
    }

    isGuia = () => {
        if (userData && userData.tipo === 'Guia') {
            listGuiaComment();
            listScheduling();
        }
    };


    async function listScheduling() {
        try {
            const res = await api.get(`valeOTour/guias/listar_agendamentos.php?id=${userData.guiaID}`);
            setScheduling(res.data.dados);
        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    async function listUserScheduling() {
        try {
            const user = await AsyncStorage.getItem('@user');
            const res = await api.get(`valeOTour/usuarios/listar_agendamentos.php?id=${user}`);
            setUserScheduling(res.data.dados);
        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }


    async function logOut() {
        try {
            await AsyncStorage.clear();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }]
            });
            navigation.navigate('Welcome');
        } catch (error) {
            Alert.alert('Não foi possivel sair, tente novamente!')
        }
    }

    async function deleteAccount(id) {
        const res = await api.get(`valeOTour/usuarios/excluir.php?id=${id}`);

        if (res.data.success) {
            try {
                await AsyncStorage.clear();
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Welcome' }]
                });
                navigation.navigate('Welcome');
                setIsOpenModalDelete(false)
            } catch (error) {
                Alert.alert('Não foi possivel sair, tente novamente!')
            }
        } else {
            alert('Erro ao excluir conta')
        }
    }

    const openModal = () => {
        if (isOpenModal) {
            setIsOpenModal(false)
        } else {
            setIsOpenModal(true)
        }

    }

    useEffect(() => {
        listUserData();
        listUserScheduling();
    }, [isFocused]);

    useEffect(() => {
        if (userData && userData.tipo === 'Guia') {
            isGuia();
        }
    }, [userData]);

    const onRefresh = () => {
        setRefreshing(true);
        listUserData();
        isGuia()
    };

    const formatDate = (dateString) => {
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${day}/${month}/${year}`;
        }
        return dateString;
    };


    const [activeFilter, setActiveFilter] = useState('Todos');
    const [filteredGuiaComments, setFilteredGuiaComments] = useState([]);
    const [guiaComment, setGuiaComment] = useState([]);

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

    async function listGuiaComment() {
        try {
            const res = await api.get(`valeOTour/guias/listar_comentarios.php?id=${userData.guiaID}`);
            setGuiaComment(res.data.dados);
            setFilteredGuiaComments(res.data.dados);
        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    async function verifyIsGuia() {
        try {
            const res = await api.get(`valeOTour/usuarios/listar_verificacao.php?id=${userData.userID}`);
            if (res.data.dados.isGuia > 0) {
                setIsOpenModalGuia(true)
            } else {
                navigation.push("GuiaBecome")
            }
        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    const filters = ['Todos', '1', '2', '3', '4', '5'];

    {
        filters.map((filter, index) => (
            <TouchableOpacity
                key={index}
                style={[styles.btnFilter, activeFilter === filter && styles.btnFilterActive]}
                onPress={() => handleFilterPress(filter)}
            >
                <Text style={[styles.btnFilterText, activeFilter === filter && styles.btnFilterActiveText]}>{filter}</Text>
                {filter !== 'Todos' && <Ionicons name='star' size={13} color={activeFilter === filter ? '#FFFFFF' : '#CCCCCC'} />}
            </TouchableOpacity>
        ))
    }

    const [userPassword, setUserPassword] = useState('')

    async function auth() {
        let userEmail = userData.email
        const obj = { userEmail, userPassword };
        const res = await api.post('valeOTour/login/login.php', obj);

        if (res.data.result === 'Dados Incorretos!') {
            return false

        } else {
            return true
        }
    }


    const OpenModalDelete = async () => {
        const isAuthenticated = await auth();
        if (isAuthenticated) {
            setIsOpenModalAuthDelete(false);
            setIsOpenModalDelete(true);
            setUserPassword('');
        } else {
            setIsOpenModalAuthDelete(false);
            setIsOpenModalAuthFail(true);
            setUserPassword('');
        }
    };
    
    const OpenModalDeleteGuia = async () => {
        const isAuthenticated = await auth();
        if (isAuthenticated) {
            setIsOpenModalAuthDeleteGuia(false);
            setIsOpenModalDeleteGuia(true);
            setUserPassword('');
        } else {
            setIsOpenModalAuthDeleteGuia(false);
            setIsOpenModalAuthFailGuia(true);
            setUserPassword('');
        }
    };
    


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
                            <Header title='Perfil' hasScdIcon={true} mainIcon='person-outline' screenLeft={'left'} isButton={false} scdIcon={'settings-outline'} scdIconColor='#fff' scdIconFunction={openModal}></Header>
                        </View>

                        {isOpenModal ? (

                            <View style={styles.modalSettings}>
                                <TouchableOpacity style={styles.modalSettingsBtn} onPress={() => navigation.push('UpdateProfile')}>
                                    <Ionicons name='pencil-outline' color={colors.background} size={16}></Ionicons>
                                    <Text style={styles.modalSettingsBtnText}>Alterar informações</Text>
                                </TouchableOpacity>

                                {userData && userData.tipo == 'Comum' ? (
                                    <View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: '#002876' }}></View>
                                        <TouchableOpacity style={styles.modalSettingsBtn} onPress={() => verifyIsGuia()}>
                                            <Ionicons name='person-outline' color={colors.background} size={16}></Ionicons>
                                            <Text style={styles.modalSettingsBtnText}>Tornar-me guia</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: '#002876' }}></View>
                                        <TouchableOpacity style={styles.modalSettingsBtn} onPress={() => setIsOpenModalAuthDeleteGuia()}>
                                            <Ionicons name='person-remove-outline' color={colors.background} size={16}></Ionicons>
                                            <Text style={styles.modalSettingsBtnText}>Cancelar Cadastro de guia</Text>
                                        </TouchableOpacity>
                                    </View>
                                )

                                }
                                <View style={{ width: '100%', height: 1, backgroundColor: '#002876' }}></View>

                                <TouchableOpacity style={styles.modalSettingsBtn} onPress={() => setIsOpenModalLogOut()}>
                                    <Ionicons name='exit-outline' color={colors.background} size={16}></Ionicons>
                                    <Text style={styles.modalSettingsBtnText}>Sair da conta</Text>
                                </TouchableOpacity>

                                <View style={{ width: '100%', height: 1, backgroundColor: '#002876' }}></View>

                                <TouchableOpacity style={styles.modalSettingsBtn} onPress={() => setIsOpenModalAuthDelete(true)}>
                                    <Ionicons name='close-circle-outline' color={'#ff0000'} size={16}></Ionicons>
                                    <Text style={styles.modalSettingsBtnTextWarning}>Excluir conta</Text>
                                </TouchableOpacity>
                            </View>
                        ) : ''}


                        <View style={userData && userData.tipo === 'Guia' ? styles.containerGuiaProfile : styles.containerUserProfile}>
                            <LinearGradient
                                colors={['#0038A5', '#0038A5', '#002875', '#002875']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={styles.profileImageBorder}
                            >
                                <View style={styles.containerImg}>
                                    {
                                        userData && userData.imagePath ? (
                                            <Image
                                                style={styles.profileImageHeader}
                                                source={{ uri: `${url}valeOTour/usuarios/assets/${userData.imagePath}` }}
                                            />
                                        ) : (
                                            <Ionicons name="person" color={colors.white} size={42}></Ionicons>
                                        )
                                    }

                                </View>
                            </LinearGradient>

                            <Text style={styles.userNameText} onPress={() => console.log(userData)}>{userData && userData.nome}</Text>
                            {
                                userData && userData.tipo == 'Guia' ? (
                                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 4, marginBottom: 20 }}>
                                        <Ionicons name='location-outline' color={'#fff'} size={12}></Ionicons>
                                        <Text style={styles.guiaLocationText}>Ilha comprida</Text>
                                    </View>
                                ) : ''

                            }

                            {
                                userData && userData.tipo == 'Comum' ?
                                    <Text style={styles.userTypeText}>{userData && userData.tipo}</Text> :
                                    <Text style={styles.userTypeTextGuia}>{userData && userData.tipo}</Text>
                            }

                            {userData && userData.tipo == 'Guia' ? (
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
                                </View>

                            ) : ''
                            }
                        </View>

                        <View style={styles.containerUserContent}>
                            <Text style={styles.profileSectionTitle}>Informações Gerais</Text>

                            <View style={styles.containerSectionContent}>
                                <View style={{ flexDirection: 'row', gap: 7 }}>
                                    <Ionicons name='mail-outline' color={colors.mainGreen} size={20}></Ionicons>
                                    <View style={{ gap: 5 }}>
                                        <Text style={styles.userInfoTitle}>E-mail</Text>
                                        <Text style={styles.userInfoText}>{userData && userData.email}</Text>
                                    </View>
                                </View>
                                {
                                    userData && userData.tipo == 'Guia' ? (
                                        <View style={{ flexDirection: 'row', gap: 7 }}>
                                            <Ionicons name='document-outline' color={colors.mainGreen} size={20}></Ionicons>
                                            <View style={{ gap: 5 }}>
                                                <Text style={styles.userInfoTitle}>Cadastur</Text>
                                                <Text style={styles.userInfoText}>{userData && userData.cadastur}</Text>
                                            </View>
                                        </View>
                                    ) : ''

                                }
                                {
                                    userData && userData.tipo == 'Guia' ? (
                                        <View style={{ flexDirection: 'row', gap: 7 }}>
                                            <Ionicons name='pencil-outline' color={colors.mainGreen} size={20}></Ionicons>
                                            <View style={{ gap: 5 }}>
                                                <Text style={styles.userInfoTitle}>Minha Biografia</Text>
                                                <Text style={styles.userInfoText}>{userData && userData.biografia}</Text>
                                            </View>
                                        </View>
                                    ) : ''

                                }

                            </View>


                            <View>
                                <Text style={styles.profileSectionTitle}>Últimos agendamentos</Text>
                                <View style={styles.containerCardScheduling}>

                                    {Array.isArray(userScheduling) && userScheduling.length > 0 ? (
                                        userScheduling.map((item) => (
                                            <View style={styles.cardScheduling} key={item.schedulingID}>
                                                <View style={styles.cardSchedulingIcon}>
                                                    <Ionicons name='calendar-outline' color={colors.mainColor} size={18}></Ionicons>
                                                </View>
                                                <View style={styles.cardSchedulingContent}>
                                                    <Text style={styles.userInfoTitle}>{item.guiaName}</Text>
                                                    <Text style={styles.userInfoText}>{formatDate(item.date)}</Text>
                                                </View>
                                            </View>
                                        ))
                                    ) : (
                                        <Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Sem resultados</Text>
                                    )}
                                </View>
                            </View>
                        </View>

                        {
                            userData && userData.tipo == 'Guia' ? (
                                <>
                                    <View style={styles.containerUserContent}>
                                        <Text style={styles.profileSectionTitle}>Comentários</Text>
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
                                </>
                            ) : ''
                        }

                        <View style={styles.containerUserContent}>

                            {
                                userData && userData.tipo == 'Guia' ? (
                                    <View>

                                        <View style={styles.containerCardScheduling}>
                                            {
                                                Array.isArray(filteredGuiaComments) && filteredGuiaComments.length > 0 ? filteredGuiaComments.map((item) => (
                                                    <View style={styles.cardComment} key={item.idComment}>
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

                                ) : ''

                            }
                        </View>

                        <View style={styles.containerUserContent}>
                            {
                                userData && userData.tipo == 'Guia' ? (
                                    <View>
                                        <Text style={styles.profileSectionTitle}>Minha estatísticas</Text>
                                        <Graphic guiaID={userData.guiaID}></Graphic>
                                    </View>
                                ) : ''

                            }
                        </View>
                    </View>

                    <Modal
                        visible={isOpenModalDelete}
                        transparent={true}
                    >
                        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <Animatable.View
                                animation="fadeIn"
                                duration={600}
                                style={styles.modal}
                            >
                                <View style={styles.headerModal}>
                                    <View style={styles.containerIconModal}>
                                        <Ionicons name='trash-outline' size={20} color={colors.mainColor}></Ionicons>
                                    </View>

                                    <TouchableOpacity onPress={() => setIsOpenModalDelete(false)}>
                                        <Ionicons name='close-outline' size={26} color={colors.textColor}></Ionicons>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.titleModal}>Você está prestes a excluir esta conta</Text>
                                <Text style={styles.modalSubTitle}>
                                    Esta ação não pode ser desfeita.
                                </Text>
                                <Text style={styles.modalSubTitle}>
                                    Por favor, confirme se você deseja prosseguir com a exclusão da sua conta
                                </Text>

                                <View style={styles.containerButtonsModal}>
                                    <TouchableOpacity style={styles.btnModalCancel} onPress={()=> setIsOpenModalDelete(false)}>
                                        <Text style={styles.btnModalCancelText}>Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.btnModalPost} onPress={() => deleteAccount(userData.userID)}>
                                        <Text style={styles.btnModalPostText}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </SafeAreaView>
                    </Modal >

                    <Modal
                        visible={isOpenModalDeleteGuia}
                        transparent={true}
                    >
                        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <Animatable.View
                                animation="fadeIn"
                                duration={600}
                                style={styles.modal}
                            >
                                <View style={styles.headerModal}>
                                    <View style={styles.containerIconModal}>
                                        <Ionicons name='trash-outline' size={20} color={colors.mainColor}></Ionicons>
                                    </View>

                                    <TouchableOpacity onPress={() => setIsOpenModalDeleteGuia(false)}>
                                        <Ionicons name='close-outline' size={26} color={colors.textColor}></Ionicons>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.titleModal}>Você está prestes a deixar de ser um guia</Text>
                                <Text style={styles.modalSubTitle}>
                                    Esta ação não pode ser desfeita. Ou seja, para tornar-se um guia novamente terá que passar pela verificação novamente
                                </Text>
                                <Text style={styles.modalSubTitle}>
                                    Por favor, confirme se você deseja prosseguir com o processo de deixar de ser um guia
                                </Text>

                                <View style={styles.containerButtonsModal}>
                                    <TouchableOpacity style={styles.btnModalCancel} onPress={()=> setIsOpenModalDeleteGuia(false)}>
                                        <Text style={styles.btnModalCancelText}>Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.btnModalPost} onPress={() => console.log('Deixou de ser guia')}>
                                        <Text style={styles.btnModalPostText}>Deixar de ser guia</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </SafeAreaView>
                    </Modal >
                    <Modal
                        visible={isOpenModalAuthDeleteGuia}
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
                                        <Ionicons name='mail-outline' size={20} color={colors.mainColor}></Ionicons>
                                    </View>

                                    <TouchableOpacity onPress={() => setIsOpenModalAuthDeleteGuia(false)}>
                                        <Ionicons name='close-outline' size={26} color={colors.textColor}></Ionicons>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.titleModal}>Confirme sua senha para deixar de ser guia</Text>

                                <Text style={styles.modalSubTitle}>
                                    Por favor, confirme sua senha para prosseguir.
                                </Text>

                                <View style={{ position: 'relative', marginTop: 40, }}>
                                    <TextInput
                                        style={styles.inputUserPassword}
                                        placeholder='Digite sua senha'
                                        placeholderTextColor={colors.lightGray}
                                        value={userPassword}
                                        onChangeText={(userPassword) => setUserPassword(userPassword)}
                                    >

                                    </TextInput>
                                    <TouchableOpacity style={styles.btnShowPassword}>
                                        <Ionicons name='eye-outline' color={colors.lightGray} size={22}></Ionicons>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.containerButtonsModal}>
                                    <TouchableOpacity style={styles.btnModalCancel} onPress={() => setIsOpenModalAuthDeleteGuia(false)} >
                                        <Text style={styles.btnModalCancelText}>Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.btnModalPostGreen} onPress={() => OpenModalDeleteGuia()}>
                                        <Text style={styles.btnModalPostText}>Continuar</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </SafeAreaView>
                    </Modal>

                    <Modal
                        visible={isOpenModalAuthDelete}
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
                                        <Ionicons name='mail-outline' size={20} color={colors.mainColor}></Ionicons>
                                    </View>

                                    <TouchableOpacity onPress={() => setIsOpenModalAuthDelete(false)}>
                                        <Ionicons name='close-outline' size={26} color={colors.textColor}></Ionicons>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.titleModal}>Confirme sua senha para excluir</Text>

                                <Text style={styles.modalSubTitle}>
                                    Por favor, confirme sua senha para prosseguir.
                                </Text>

                                <View style={{ position: 'relative', marginTop: 40, }}>
                                    <TextInput
                                        style={styles.inputUserPassword}
                                        placeholder='Digite sua senha'
                                        placeholderTextColor={colors.lightGray}
                                        value={userPassword}
                                        onChangeText={(userPassword) => setUserPassword(userPassword)}
                                    >

                                    </TextInput>
                                    <TouchableOpacity style={styles.btnShowPassword}>
                                        <Ionicons name='eye-outline' color={colors.lightGray} size={22}></Ionicons>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.containerButtonsModal}>
                                    <TouchableOpacity style={styles.btnModalCancel} onPress={() => setIsOpenModalAuthDelete(false)} >
                                        <Text style={styles.btnModalCancelText}>Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.btnModalPostGreen} onPress={() => OpenModalDelete()}>
                                        <Text style={styles.btnModalPostText}>Continuar</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </SafeAreaView>
                    </Modal >

                    <Modal
                        visible={isOpenModalLogOut}
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
                                        <Ionicons name='exit-outline' size={20} color={colors.mainColor}></Ionicons>
                                    </View>

                                    <TouchableOpacity onPress={() => setIsOpenModalLogOut(false)}>
                                        <Ionicons name='close-outline' size={26} color={colors.textColor}></Ionicons>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.titleModal}>Sair da conta</Text>
                                <Text style={styles.modalSubTitle}>
                                    Você realmente deseja sair da conta?
                                </Text>
                                <Text style={styles.modalSubTitle}>
                                    Esta ação encerrará sua sessão e você precisará fazer login novamente para acessar sua conta.
                                </Text>

                                <View style={styles.containerButtonsModal}>
                                    <TouchableOpacity style={styles.btnModalCancel} onPress={() => setIsOpenModalLogOut(false)}>
                                        <Text style={styles.btnModalCancelText}>Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.btnModalPostGreen} onPress={() => logOut()}>
                                        <Text style={styles.btnModalPostText}>Sair</Text>
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
                                        <Ionicons name='information-circle-outline' size={20} color={colors.mainColor}></Ionicons>
                                    </View>
                                </View>

                                <Text style={styles.titleModal}>Verificação em andamento</Text>
                                <Text style={styles.modalSubTitle}>
                                    Você já possui uma solicitação em andamento.
                                </Text>
                                <Text style={styles.modalSubTitle}>
                                    Por favor, aguarde a análise dos dados
                                </Text>

                                <View style={styles.containerButtonsModal}>
                                    <TouchableOpacity style={styles.btnModalPostGreen} onPress={() => setIsOpenModalGuia(false)}>
                                        <Text style={styles.btnModalPostText}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </SafeAreaView>
                    </Modal>

                    <Modal
                        visible={isOpenModalAuthFailGuia}
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
                                        <Ionicons name='information-circle-outline' size={20} color={colors.mainColor}></Ionicons>
                                    </View>
                                </View>

                                <Text style={styles.titleModal}>Dados incorretos!</Text>
                                <Text style={styles.modalSubTitle}>
                                    Sua senha está incorreta. Por favor, se realmente deseja prosseguir, tente novamente.
                                </Text>

                                <View style={styles.containerButtonsModal}>
                                    <TouchableOpacity style={styles.btnModalCancel} onPress={() => setIsOpenModalAuthFailGuia(false)}>
                                        <Text style={styles.btnModalCancelText}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnModalPostGreen} onPress={() => {
                                        setIsOpenModalAuthFailGuia(false)
                                        setIsOpenModalAuthDeleteGuia(true)
                                    }}>
                                        <Text style={styles.btnModalPostText}>Tentar novamente</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </SafeAreaView>
                    </Modal >
                    <Modal
                        visible={isOpenModalAuthFail}
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
                                        <Ionicons name='information-circle-outline' size={20} color={colors.mainColor}></Ionicons>
                                    </View>
                                </View>

                                <Text style={styles.titleModal}>Dados incorretos!</Text>
                                <Text style={styles.modalSubTitle}>
                                    Sua senha está incorreta. Por favor, se realmente deseja prosseguir, tente novamente.
                                </Text>

                                <View style={styles.containerButtonsModal}>
                                    <TouchableOpacity style={styles.btnModalCancel} onPress={() => setIsOpenModalAuthFail(false)}>
                                        <Text style={styles.btnModalCancelText}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnModalPostGreen} onPress={() => {
                                        setIsOpenModalAuthFail(false)
                                        setIsOpenModalAuthDelete(true)
                                    }}>
                                        <Text style={styles.btnModalPostText}>Tentar novamente</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </SafeAreaView>
                    </Modal >
                </ScrollView>


            }
        </View >

    )
}