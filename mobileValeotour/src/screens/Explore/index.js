import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Load from '../../components/Load';
import api from '../../services/api';
import Header from '../../components/Header';
import url from '../../services/url';
import colors from '../../styles/colors';
import { useNavigation } from "@react-navigation/core";
import { styles } from './style';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import fonts from '../../styles/fonts';
import { Text, View, ScrollView, TouchableOpacity, Image, RefreshControl, TextInput } from 'react-native';



export default function Explore() {

    const navigation = useNavigation();

    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Todos');
    const filters = ['Todos', '5', '4', '3', '2', '1'];
    const [loggedUser, setLoggedUser] = useState(null);
    const [placeFilters, setPlaceFilters] = useState([]);

    const fetchLoggedUser = async () => {
        try {
            const userID = await AsyncStorage.getItem('@user');
            setLoggedUser(userID);
        } catch (error) {
            console.log('Erro ao recuperar o ID do usuário logado:', error);
        }
    };


    const [guiaData, setGuiaData] = useState([]);

    async function listGuiaData() {

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

    const filteredGuiaData = Array.isArray(guiaData) && guiaData.filter((item) => item.userID != loggedUser);

    async function showProfileGuia(userID, guiaID) {
        await AsyncStorage.setItem('@guia', JSON.stringify(userID));
        await AsyncStorage.setItem('@guiaID', JSON.stringify(guiaID));
        navigation.push('ProfileGuia');
    }

    useEffect(() => {
        fetchLoggedUser()
        listGuiaData();
        listPlaceData();
    }, [isFocused]);

    const onRefresh = () => {
        setRefreshing(true);
        listGuiaData();
        listPlaceData()
    };

    const handleFilterPress = (filter) => {
        setActiveFilter(filter);

        if (Array.isArray(otherPlaces) && otherPlaces.length > 0) {
            if (filter === 'Todos') {
                setPlaceFilters(otherPlaces);
            } else {
                const filteredPlaces = otherPlaces.filter(place => place.city === filter);
                setPlaceFilters(filteredPlaces);
            }
        } else {
            setPlaceFilters([]);
        }
    };


    const [placeData, setPlaceData] = useState([]);

    async function listPlaceData() {
        try {
            const res = await api.get(`valeOTour/pontos_turisticos/listar.php`);
            setPlaceData(res.data.result);

            let place = res.data.result
            let filteredPlaces = Array.isArray(place) && place
                .sort((a, b) => parseFloat(b.totalStars) - parseFloat(a.totalStars))
                .slice(0, 4);

            let otherPlaces = Array.isArray(place) && place.filter(place => Array.isArray(filteredPlaces) && !filteredPlaces.some(topPlace => topPlace.placeID === place.placeID));


            setFilteredPlaces(filteredPlaces)
            setOtherPlaces(otherPlaces)
            setPlaceFilters(otherPlaces)


        } catch (error) {
            console.log("Erro ao Listar " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [otherPlaces, setOtherPlaces] = useState([])

    async function showProfilePlace(placeID) {
        await AsyncStorage.setItem('@place', JSON.stringify(placeID));
        navigation.push('ShowMorePlaces');
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
                                <Header title='Explorar' hasScdIcon={false} mainIcon='search-outline' screenLeft={'left'} isButton={false}></Header>

                                <View style={styles.containerSearch}>
                                    <View style={styles.containerInputSearch}>
                                        <Ionicons name='search-outline' color={colors.lightBlue} size={20}></Ionicons>
                                        <TextInput style={styles.inputSearch} placeholder='Toque para pesquisar' placeholderTextColor={colors.lightBlue}></TextInput>
                                    </View>
                                    <TouchableOpacity style={styles.btnFilterHeader} onPress={() => console.log(filteredPlaces)}>
                                        <Ionicons name='filter-outline' color={colors.mainColor} size={20}></Ionicons>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={styles.headerAreaBottom}></View>
                        </View>

                        <View style={styles.containerSection}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24 }}>
                                <Text style={styles.mainContentTitle}>Guias</Text>
                                <Text style={styles.btnShowMoreText} onPress={() => navigation.push('Guias')}>Ver mais</Text>
                            </View>

                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.containerGuias}>
                                    {filteredGuiaData.length > 0 ? (
                                        filteredGuiaData.map((item) => (
                                            <TouchableOpacity style={styles.cardGuia} key={item.guiaID} onPress={() => showProfileGuia(item.userID, item.guiaID)}>
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
                            </ScrollView>


                        </View>

                        <View style={styles.containerSection}>
                            <View style={{ paddingHorizontal: 24 }}>
                                <Text style={styles.sectionTitle}>Populares</Text>
                            </View>

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                <View style={styles.containerPlaces}>

                                    {Array.isArray(filteredPlaces) && filteredPlaces.length > 0 ? (
                                        filteredPlaces.map((item) => (
                                            <View style={styles.cardPopularPlaces} key={item.placeID}>
                                                <TouchableOpacity style={styles.btnShowMore} onPress={() => showProfilePlace(item.placeID)}></TouchableOpacity>
                                                <Image source={{ uri: `${url}valeOTour/pontos_turisticos/assets/${item.imagePath}` }} style={styles.cardPopularPlacesImg}></Image>
                                                <View style={styles.cardPopularPlacesTopInfo}>
                                                    <Text style={styles.cardPopularPlacesTitle}>{item.placeName}</Text>
                                                    <View style={styles.containerRating}>
                                                        <Ionicons name='star' size={16} color={colors.brighterBlue}></Ionicons>
                                                        <Text style={styles.ratingText}>{item.totalStars ? parseFloat(item.totalStars).toFixed(1).replace('.', ',') : '0'}</Text>
                                                    </View>
                                                </View>
                                                <Text style={styles.cardLocationText}>{item.city}</Text>
                                            </View>
                                        ))
                                    ) : (
                                        <Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Sem resultados</Text>
                                    )}
                                </View>
                            </ScrollView>
                        </View>


                        <View style={styles.containerSection}>
                            <View style={{ paddingHorizontal: 24 }}>
                                <Text style={styles.sectionTitle}>Sugestões</Text>
                            </View>

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
                                            style={[styles.btnFilter, activeFilter === 'Miracatu' && styles.btnFilterActive]}
                                            onPress={() => handleFilterPress('Miracatu')}
                                        >
                                            <Text style={[styles.btnFilterText, activeFilter === 'Miracatu' && styles.btnFilterActiveText]}>Miracatu</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.btnFilter, activeFilter === 'Iguape' && styles.btnFilterActive]}
                                            onPress={() => handleFilterPress('Iguape')}
                                        >
                                            <Text style={[styles.btnFilterText, activeFilter === 'Iguape' && styles.btnFilterActiveText]}>Iguape</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>

                            <View style={styles.containerCardSuggestion}>
                                {Array.isArray(placeFilters) && placeFilters.length > 0 ? (
                                    placeFilters.map((item) => (
                                        <View style={styles.cardSuggestion} key={item.placeID}>
                                            <TouchableOpacity style={styles.btnShowMore} onPress={() => showProfilePlace(item.placeID)}></TouchableOpacity>
                                            <Image source={{ uri: `${url}valeOTour/pontos_turisticos/assets/${item.imagePath}` }} style={styles.cardSuggestionImage}></Image>
                                            <View style={styles.cardSuggestionInfo}>
                                                <Text style={styles.cardSuggestionName}>{item.placeName}</Text>
                                                <Text style={styles.cardSuggestionLocation}>{item.street}, {item.bairro}, {item.city} - SP </Text>
                                                <View style={styles.cardSuggestionBottom}>
                                                    <View style={styles.cardSuggestionRating}>
                                                        <Ionicons name='star' size={13} color={colors.brighterBlue}></Ionicons>
                                                        <Text style={styles.cardSuggestionRatingText}>{item.totalStars ? parseFloat(item.totalStars).toFixed(1).replace('.', ',') : '0'}</Text>
                                                    </View>
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
        </View>

    )
}