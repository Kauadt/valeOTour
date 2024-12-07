import React, { useEffect, useState } from 'react';
import { styles } from './style';

import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    RefreshControl,
    Modal,
    SafeAreaView,
    TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import Header from '../../components/Header';


import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import url from '../../services/url';


export default function Eixos() {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [loggedUser, setLoggedUser] = useState(null);
    const [guiaData, setGuiaData] = useState([]);
    const [eixo, setEixo] = useState(null);
    const [address, setAddress] = useState(null);
    const [placeData, setPlaceData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isOpenModalFilter, setIsOpenModalFilter] = useState(false)

    const fetchLoggedUser = async () => {
        try {
            const userID = await AsyncStorage.getItem('@user');
            setLoggedUser(userID);
        } catch (error) {
            console.log('Erro ao recuperar o ID do usuário logado:', error);
        }
    };

    const fecthEixo = async () => {
        try {
            const type = await AsyncStorage.getItem('@eixos');
            const parsedType = type ? JSON.parse(type) : null;
            setEixo(parsedType);
        } catch (error) {
            console.log('Erro ao recuperar o eixo:', error);
        }
    };

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
            const res = await api.get(`valeOTour/eixos/listar.php?eixo=${eixo}`);
            setPlaceData(res.data.result);
        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchLoggedUser();
            await fecthEixo();
            await listGuiasData();
        };

        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    useEffect(() => {
        if (eixo) {
            listPlaceData();
        }
    }, [eixo]);

    const onRefresh = () => {
        setRefreshing(true);
        listGuiasData();
        listPlaceData();
    };

    async function showProfileGuia(userID, guiaID) {
        await AsyncStorage.setItem('@guia', JSON.stringify(userID));
        await AsyncStorage.setItem('@guiaID', JSON.stringify(guiaID));
        navigation.push('ProfileGuia');
    }

    async function showProfilePlace(placeID) {
        await AsyncStorage.setItem('@place', JSON.stringify(placeID));
        navigation.push('ShowMorePlaces');
    }

    const [isOpenModal, setIsOpenModal] = useState(false)

    function openModal() {
        isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true)
    }

    const eixoText = eixo == 'Aventura' ? (
        <Text style={styles.modalEixoText}>
            O <Text style={styles.modalEixoTextBold}>turismo de aventura</Text> tem se tornado cada vez mais popular entre os viajantes que buscam contato intenso com a natureza e experiências emocionantes. Ele envolve atividades recreativas que são praticadas de forma segura, com riscos avaliados e controlados.
        </Text>
    ) : eixo == 'Gastronômico' ? (
        <Text style={styles.modalEixoText}>
            O <Text style={styles.modalEixoTextBold}>turismo gastronômico</Text> é uma tendência que valoriza a culinária local como parte essencial da experiência de um destino. Ao invés de refeições apressadas, esse tipo de turismo permite que os visitantes mergulhem nas tradições e sabores de cada lugar.
        </Text>
    ) : eixo == 'Histórico' ? (
        <Text style={styles.modalEixoText}>
            O <Text style={styles.modalEixoTextBold}>turismo histórico</Text> foca na visita a locais de importância histórica, como monumentos e museus, permitindo que os viajantes explorem a história, tradições e cultura de um lugar.
        </Text>
    ) : (
        <Text style={styles.modalEixoText}>
            O <Text style={styles.modalEixoTextBold}>turismo ecológico</Text> é um segmento da atividade turística que utiliza o patrimônio natural e cultural de forma sustentável, promovendo sua conservação e a formação de uma consciência ambientalista.
        </Text>
    )

    const handleFilterPress = (filter) => {
        setActiveFilter(filter);
    };

    const handleFilterPressType = (filter) => {
        setActiveFilterType(filter);

    };

    const filters = ['5', '4', '3', '2', '1'];
    const handleFilterPressStars = (filter) => {
        setActiveFilterStars(filter);
    };

    const filteredGuiaData = Array.isArray(guiaData) && guiaData.filter((item) => item.userID != loggedUser && item.eixo == eixo);


    const [activeFilter, setActiveFilter] = useState('');
    const [activeFilterStars, setActiveFilterStars] = useState('');
    const [activeFilterType, setActiveFilterType] = useState('');

    const [appliedFilters, setAppliedFilters] = useState({
        location: '',
        stars: '',
        type: ''
    });

    const applyFilters = () => {
        setAppliedFilters({
            location: activeFilter,
            stars: activeFilterStars,
            type: activeFilterType
        });
        setIsOpenModalFilter(false)
        setIsOpenModalFilterSuccess(true)
    };

    const filteredPlaceData = Array.isArray(placeData) && placeData
        .filter((item) =>
            (!appliedFilters.location || item.city === appliedFilters.location) &&
            (!appliedFilters.stars || item.totalStars >= parseFloat(appliedFilters.stars)) &&
            (!appliedFilters.type || item.type === appliedFilters.type)
        );

    const filteredPopularPlaceData = filteredPlaceData
        .reduce((max, item) => (item.totalStars > (max?.totalStars || 0) ? item : max), null);

    const filteredPlaces = filteredPlaceData
        .filter((item) => item.placeID !== filteredPopularPlaceData?.placeID);

    const [isOpenModalFilterSuccess, setIsOpenModalFilterSuccess] = useState(false)


    return (
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        }>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Header title={eixo && eixo == 'Aventura' ? `Turismo de ${eixo}` : `Turismo ${eixo}`} hasScdIcon={true} mainIcon='chevron-back' screenLeft='left' isButton={true} scdIcon='information-circle-outline' scdIconColor={colors.lightPurple} scdIconFunction={openModal}></Header>


                    {
                        isOpenModal && (
                            <View style={styles.modalEixo}>
                                {eixoText}
                            </View>
                        )
                    }

                    <View style={styles.containerSearch}>
                        <View style={styles.containerInputSearch}>
                            <Ionicons name='search-outline' color={colors.lightBlue} size={20}></Ionicons>
                            <TextInput style={styles.inputSearch} placeholder='Toque para pesquisar' placeholderTextColor={colors.lightBlue}></TextInput>
                        </View>
                        <TouchableOpacity style={styles.btnFilterNav} onPress={() => setIsOpenModalFilter(true)}>
                            <Ionicons name='filter-outline' color={colors.mainColor} size={20}></Ionicons>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.containerMainContent}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.mainContentTitle}>Guias</Text>
                        <Text style={styles.btnShowMoreText} onPress={() => navigation.push('Guias')}>Ver mais</Text>
                    </View>

                    <View style={styles.containerGuias}>
                        {filteredGuiaData.length > 0 ? (
                            filteredGuiaData.map((item) => (
                                <TouchableOpacity style={styles.cardGuia} key={item.userID} onPress={() => showProfileGuia(item.userID, item.guiaID)}>
                                    {
                                        item.imagePath ? (
                                            <Image
                                                style={styles.cardGuiaImg}
                                                source={{ uri: `${url}valeOTour/usuarios/assets/${item.imagePath}` }}
                                            />
                                        ) : (
                                            <View style={styles.cardGuiaImg}>
                                                <Ionicons name='person' color={colors.lightBlue} size={32}></Ionicons>
                                            </View>
                                        )
                                    }

                                    <Text style={styles.cardGuiaTitle}>{item.guiaName}</Text>
                                    <Text style={styles.cardGuiaText}>{item.guiaCity}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Não há guias cadastrados nesse eixo turístico</Text>
                        )}
                    </View>

                    {
                        filteredPopularPlaceData && filteredPopularPlaceData.imagePath ? (
                            <>
                                <Text style={styles.mainContentTitle}>Descubra</Text>
                                <Text style={styles.mainContentSubtitle}>Melhor avaliado</Text>

                                <View style={styles.mainCard}>
                                    <TouchableOpacity
                                        style={styles.btnShowMorePlaces}
                                        onPress={() => showProfilePlace(filteredPopularPlaceData.placeID)}
                                    />
                                    <Image
                                        style={styles.mainCardImage}
                                        source={{
                                            uri: `${url}valeOTour/pontos_turisticos/assets/${filteredPopularPlaceData.imagePath}`,
                                        }}
                                    />
                                    <View style={styles.mainCardContentArea}>
                                        <View style={styles.mainCardRating}>
                                            <Text style={styles.mainCardRatingText}>
                                                {filteredPopularPlaceData?.totalStars
                                                    ? parseFloat(filteredPopularPlaceData.totalStars)
                                                        .toFixed(1)
                                                        .replace('.', ',')
                                                    : '0'}
                                            </Text>
                                            <Ionicons
                                                name="star"
                                                size={24}
                                                color={colors.brighterBlue}
                                            />
                                        </View>
                                        <View style={styles.mainCardContentBottom}>
                                            <Text style={styles.mainCardPlaceName}>
                                                {filteredPopularPlaceData?.placeName}
                                            </Text>
                                            <Text style={styles.mainCardPlaceLocation}>
                                                {address || ''}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                        ) : null
                    }

                    <View style={styles.containerSuggestion}>

                        <View style={styles.containerCardSuggestion}>
                            {

                                Array.isArray(filteredPlaces) && filteredPlaces.length > 0 ? (
                                    <>
                                        <Text style={styles.mainContentTitle}>Sugestões</Text>
                                        {filteredPlaces.map((item) => (
                                            <View style={styles.cardSuggestion} key={item.placeID}>
                                                <TouchableOpacity
                                                    style={styles.btnShowMorePlaces}
                                                    onPress={() => showProfilePlace(item.placeID)}
                                                />
                                                <Image
                                                    source={{
                                                        uri: `${url}valeOTour/pontos_turisticos/assets/${item.imagePath}`,
                                                    }}
                                                    style={styles.cardSuggestionImage}
                                                />
                                                <View style={styles.cardSuggestionInfo}>
                                                    <Text style={styles.cardSuggestionName}>
                                                        {item.placeName}
                                                    </Text>
                                                    <Text style={styles.cardSuggestionLocation}>
                                                        {item.street} - Bairro {item.bairro}, {item.city} - SP
                                                    </Text>
                                                    <View style={styles.cardSuggestionBottom}>
                                                        <View style={styles.cardSuggestionRating}>
                                                            <Ionicons
                                                                name="star"
                                                                size={13}
                                                                color={colors.brighterBlue}
                                                            />
                                                            <Text style={styles.cardSuggestionRatingText}>
                                                                {item.totalStars
                                                                    ? parseFloat(item.totalStars)
                                                                        .toFixed(1)
                                                                        .replace('.', ',')
                                                                    : '0'}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.cardSuggestionStatus}>
                                                            <Text style={styles.cardSuggestionStatusText}>
                                                                Aberto
                                                            </Text>
                                                            <Ionicons
                                                                name="time-outline"
                                                                size={13}
                                                                color={colors.mainGreen}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        ))}
                                    </>
                                ) : null
                            }

                            {
                                !filteredPopularPlaceData?.imagePath &&
                                    (!Array.isArray(filteredPlaces) || filteredPlaces.length === 0) ? (
                                    <>
                                        <Text style={styles.suggestionTitle}>Sugestões</Text>
                                        <Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Não há pontos disponíveis</Text>
                                    </>
                                ) : null
                            }

                        </View>
                    </View>
                </View>


                <Modal
                    visible={isOpenModalFilter}
                    transparent={true}
                    animationType='slide'
                >
                    <View style={{ flex: 1 }}>
                        <TouchableWithoutFeedback onPress={() => setIsOpenModalFilter(false)}>
                            <View style={{ flex: 1 }} />
                        </TouchableWithoutFeedback>

                        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Animatable.View
                                animation="fadeInUp"
                                duration={600}
                                style={[styles.modal, { flex: 1 }]}
                            >
                                <View style={styles.headerModalFilter}>
                                    <View style={styles.modalFilterLogo}>
                                        <Ionicons name='filter-outline' size={18} color={colors.brighterBlue} />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => setIsOpenModalFilter(false)}
                                    >
                                        <Ionicons name='close-outline' size={24} color={colors.mediumGray} />
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.headerModalFilterTitle}>Filtro</Text>

                                <Text style={styles.filterLabel}>Cidade</Text>
                                <View style={styles.containerFilters}>
                                    <TouchableOpacity
                                        style={[styles.btnFilter, activeFilter === 'Cananéia' && styles.btnFilterActive]}
                                        onPress={() => handleFilterPress('Cananéia')}
                                    >
                                        <Text style={[styles.btnFilterText, activeFilter === 'Cananéia' && styles.btnFilterActiveText]}>Cananéia</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.btnFilter, activeFilter === 'Ilha Comprida' && styles.btnFilterActive]}
                                        onPress={() => handleFilterPress('Ilha Comprida')}
                                    >
                                        <Text style={[styles.btnFilterText, activeFilter === 'Ilha Comprida' && styles.btnFilterActiveText]}>Ilha Comprida</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.btnFilter, activeFilter === 'Iporanga' && styles.btnFilterActive]}
                                        onPress={() => handleFilterPress('Iporanga')}
                                    >
                                        <Text style={[styles.btnFilterText, activeFilter === 'Iporanga' && styles.btnFilterActiveText]}>Iporanga</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.btnFilter, activeFilter === 'Iguape' && styles.btnFilterActive]}
                                        onPress={() => handleFilterPress('Iguape')}
                                    >
                                        <Text style={[styles.btnFilterText, activeFilter === 'Iguape' && styles.btnFilterActiveText]}>Iguape</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.btnFilter, activeFilter === 'Miracatu' && styles.btnFilterActive]}
                                        onPress={() => handleFilterPress('Miracatu')}
                                    >
                                        <Text style={[styles.btnFilterText, activeFilter === 'Miracatu' && styles.btnFilterActiveText]}>Miracatu</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.filterLabel}>Estrelas</Text>
                                <View style={styles.containerFilterStars}>
                                    {filters.map((filter, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.btnFilterStars, activeFilterStars === filter && styles.btnFilterActiveStars]}
                                            onPress={() => handleFilterPressStars(filter)}
                                        >
                                            <Text style={[styles.btnFilterText, activeFilterStars === filter && styles.btnFilterActiveText]}>{filter}</Text>
                                            {filter !== 'Todos' && <Ionicons name='star' size={13} color={activeFilterStars === filter ? '#FFFFFF' : '#CCCCCC'} />}
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <Text style={styles.filterLabel}>Tipo</Text>
                                <View style={styles.containerFilters}>
                                    <TouchableOpacity
                                        style={[styles.btnFilter, activeFilterType === 'Alimentação' && styles.btnFilterActive]}
                                        onPress={() => handleFilterPressType('Alimentação')}
                                    >
                                        <Text style={[styles.btnFilterText, activeFilterType === 'Alimentação' && styles.btnFilterActiveText]}>Alimentação</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.btnFilter, activeFilterType === 'Compras' && styles.btnFilterActive]}
                                        onPress={() => handleFilterPressType('Compras')}
                                    >
                                        <Text style={[styles.btnFilterText, activeFilterType === 'Compras' && styles.btnFilterActiveText]}>Compras</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.btnFilter, activeFilterType === 'Hospedagem' && styles.btnFilterActive]}
                                        onPress={() => handleFilterPressType('Hospedagem')}
                                    >
                                        <Text style={[styles.btnFilterText, activeFilterType === 'Hospedagem' && styles.btnFilterActiveText]}>Hospedagem</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.btnFilter, activeFilterType === 'Lazer' && styles.btnFilterActive]}
                                        onPress={() => handleFilterPressType('Lazer')}
                                    >
                                        <Text style={[styles.btnFilterText, activeFilterType === 'Lazer' && styles.btnFilterActiveText]}>Lazer</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.btnFilter, activeFilterType === 'Trilha' && styles.btnFilterActive]}
                                        onPress={() => handleFilterPressType('Trilha')}
                                    >
                                        <Text style={[styles.btnFilterText, activeFilterType === 'Trilha' && styles.btnFilterActiveText]}>Trilhas</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.containerFilterControls}>

                                    <TouchableOpacity style={styles.btnFilterClear} onPress={() => {
                                        setActiveFilter('');
                                        setActiveFilterStars('');
                                        setActiveFilterType('');
                                        setAppliedFilters({ location: '', stars: '', type: '' });
                                        setIsOpenModalFilter(false)
                                        setIsOpenModalFilterSuccess(true)
                                    }}>
                                        <Text style={styles.btnFilterClearText}>Limpar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.btnFilterApply} onPress={applyFilters}>
                                        <Text style={styles.btnFilterClearAplly}>Aplicar</Text>
                                    </TouchableOpacity>

                                </View>

                            </Animatable.View>
                        </SafeAreaView>
                    </View>
                </Modal>

                <Modal
                    visible={isOpenModalFilterSuccess}
                    transparent={true}
                    animationType='slide'
                >
                    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <Animatable.View
                            animation="fadeInUp"
                            duration={600}
                            style={styles.modalSuccess}
                        >
                            <View style={styles.headerModal}>
                                <View style={styles.containerIconModal}>
                                    <Ionicons name='filter-outline' size={20} color={colors.mainColor}></Ionicons>
                                </View>

                            </View>

                            <Text style={styles.titleModal}>Filtro adicionado com sucesso</Text>

                            <View style={styles.containerButtonsModal}>

                                <TouchableOpacity style={styles.btnModalPostGreen} onPress={() => setIsOpenModalFilterSuccess(false)}>
                                    <Text style={styles.btnModalPostText}>Continuar</Text>
                                </TouchableOpacity>
                            </View>
                        </Animatable.View>
                    </SafeAreaView>
                </Modal >
            </View>


        </ScrollView>
    )
}