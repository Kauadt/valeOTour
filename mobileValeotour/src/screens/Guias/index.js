import React, { useEffect, useState } from 'react';
import { styles } from './style';

import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    RefreshControl,
    TextInput,
    Modal,
    SafeAreaView,
    TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Load from '../../components/Load';
import { useNavigation } from '@react-navigation/core';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import url from '../../services/url';
import Header from '../../components/Header';
import * as Animatable from 'react-native-animatable';

export default function Guias() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [guiaData, setGuiaData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);
    const [searchText, setSearchText] = useState('');


    const fetchLoggedUser = async () => {
        try {
            const userID = await AsyncStorage.getItem('@user');
            setLoggedUser(userID);
        } catch (error) {
            console.log('Erro ao recuperar o ID do usuário logado:', error);
        }
    };

    async function listGuiasData() {

        try {
            const res = await api.get(`valeOTour/guias/listar.php`);
            setGuiaData(res.data.result);
            console.log(res.data.result);
        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);

        }
    }

    useEffect(() => {
        fetchLoggedUser();
        listGuiasData();
    }, [isFocused]);

    const onRefresh = () => {
        setRefreshing(true);
        listGuiasData();
    };

    async function showProfileGuia(userID, guiaID) {
        await AsyncStorage.setItem('@guia', JSON.stringify(userID));
        await AsyncStorage.setItem('@guiaID', JSON.stringify(guiaID));
        navigation.push('ProfileGuia');
    }

    const [appliedFilters, setAppliedFilters] = useState({ location: '', stars: null });
    const [activeFilter, setActiveFilter] = useState('');
    const [activeFilterStars, setActiveFilterStars] = useState(null);
    const [isOpenModalFilter, setIsOpenModalFilter] = useState(false);
    const [isOpenModalFilterSuccess, setIsOpenModalFilterSuccess] = useState(false);

    const filters = ['5', '4', '3', '2', '1'];


    const handleFilterPress = (filter) => {
        setActiveFilter(filter);
    };

    const handleFilterPressStars = (filter) => {
        setActiveFilterStars(filter);
    };

    const applyFilters = () => {
        setAppliedFilters({
            location: activeFilter,
            stars: activeFilterStars
        });

        setIsOpenModalFilter(false);
        setIsOpenModalFilterSuccess(true);
    };


    const getFilteredGuiaData = () => {
        let filteredData = guiaData.filter((item) =>
            (!appliedFilters.location || item.guiaCity === appliedFilters.location) &&
            (!appliedFilters.stars || item.totalStars >= parseFloat(appliedFilters.stars))
        );

        if (searchText !== '') {
            filteredData = filteredData.filter((item) =>
                item.guiaName.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        return filteredData;
    };

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
                            <Header title='Guias' hasScdIcon={false} mainIcon='chevron-back' screenLeft='left' isButton={true}></Header>

                            <View style={styles.containerSearch}>
                                <View style={styles.containerInputSearch}>
                                    <Ionicons name='search-outline' color={colors.lightBlue} size={20}></Ionicons>
                                    <TextInput style={styles.inputSearch} placeholder='Toque para pesquisar' placeholderTextColor={colors.lightBlue} onChangeText={(value) => setSearchText(value)} value={searchText}></TextInput>
                                </View>
                                <TouchableOpacity style={styles.btnFilterNav} onPress={() => setIsOpenModalFilter(true)}>
                                    <Ionicons name='filter-outline' color={colors.mainColor} size={20}></Ionicons>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.containerMain}>

                            {getFilteredGuiaData().length > 0 ? (
                                getFilteredGuiaData().map((item) => (
                                    <View style={styles.cardGuia} key={item.userID}>
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

                                        <View style={styles.cardGuiaContent}>
                                            <Text style={styles.cardGuiaTitle}>{item.guiaName}</Text>
                                            <Text style={styles.cardGuiaText}>{item.guiaCity}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.cardGuiaBtn}
                                            onPress={() => showProfileGuia(item.userID, item.guiaID)}
                                        >
                                            <Text style={styles.cardGuiaBtnText}>Ver mais</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            ) : (
                                <Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Sem resultados</Text>
                            )}
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

                                        <View style={styles.containerFilterControls}>

                                            <TouchableOpacity style={styles.btnFilterClear} onPress={() => {
                                                setActiveFilter('');
                                                setActiveFilterStars('');
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
            }
        </View>
    )
}