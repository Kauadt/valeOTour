import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, Modal, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './style';
import config from '../../config/index.json'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import colors from '../../styles/colors';
import { useIsFocused } from '@react-navigation/native';
import api from '../../services/api';
import * as Animatable from 'react-native-animatable';
import fonts from '../../styles/fonts';
import url from '../../services/url';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default function Maps() {


  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const mapEl = useRef(null);
  const [placeData, setPlaceData] = useState([]);
  const [placeID, setPlaceID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    if (route.params?.destination) {
      setDestination(route.params.destination);
    }
  }, [route.params]);

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

  useEffect(() => {
    listPlaceData()
  }, [isFocused]);

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

  const renderIconByType = (type) => {
    switch (type) {
      case 'Hospedagem':
        return (
          <Image source={require('../../assets/pHospedagem.png')} style={{ width: 30, height: 30 }} resizeMode="contain"></Image>
        )
        break
      case 'Alimentação':
        return (
          <Image source={require('../../assets/pAlimentacao.png')} style={{ width: 30, height: 30 }} resizeMode="contain"></Image>
        )
      case 'Compras':
        return (
          <Image source={require('../../assets/pCompras.png')} style={{ width: 30, height: 30 }} resizeMode="contain"></Image>
        )
      case 'Lazer':
        return (
          <Image source={require('../../assets/pLazer.png')} style={{ width: 30, height: 30 }} resizeMode="contain"></Image>
        )
      case 'Trilha':
        return (
          <Image source={require('../../assets/pTrilha.png')} style={{ width: 30, height: 30 }} resizeMode="contain"></Image>
        )
      default:
        return (
          <Image source={require('../../assets/pPatrimonio.png')} style={{ width: 30, height: 30 }} resizeMode="contain"></Image>
        )
    }
  };

  const [placeImages, setPlaceImages] = useState([]);;
  const [place, setPlace] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [activeFilterStars, setActiveFilterStars] = useState('');
  const [activeFilterType, setActiveFilterType] = useState('');
  const [isOpenModalFilterSuccess, setIsOpenModalFilterSuccess] = useState(false)
  const [isOpenModalFilter, setIsOpenModalFilter] = useState(false)

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

  const [appliedFilters, setAppliedFilters] = useState({
    location: null,
    stars: null,
    type: null, 
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

  const filteredPlaceData = Array.isArray(placeData)
  ? placeData.filter((marker) => {
      const totalStars = typeof marker.totalStars === 'number' 
        ? marker.totalStars 
        : parseFloat(marker.totalStars);

      const starsFilter = parseFloat(appliedFilters.stars);

      return (
        (!appliedFilters.location || marker.city === appliedFilters.location) &&
        
        (!appliedFilters.stars || 
          (!isNaN(totalStars) && 
           totalStars >= starsFilter && 
           totalStars < starsFilter + 1)
        ) &&

        (!appliedFilters.type || marker.type === appliedFilters.type)
      );
    })
  : [];

  async function listPlaceImages(placeID) {
    try {
      const res = await api.get(`valeOTour/pontos_turisticos/listar_imagens.php?id=${placeID}`);
      setPlaceImages(res.data.dados);

    } catch (error) {
      console.log("Erro ao Listar:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }

  async function listPlace(placeID) {
    try {
      const res = await api.get(`valeOTour/pontos_turisticos/listar_id.php?id=${placeID}`);
      setPlace(res.data.dados);
    } catch (error) {
      console.log("Erro ao Listar:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }

  const showAboutPlace = () => {
    return (
      <View style={styles.containerSobre}>
        <Text style={styles.placeDescriptionText}>{place.description}</Text>
        <Text style={styles.infoSectionTitle}>Fotos</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.containerImages}>
            {Array.isArray(placeImages) && placeImages.length > 0 ? (
              placeImages.map((item) => (
                <Image style={styles.placesImages} key={item.idImages} source={{ uri: `${url}valeOTour/pontos_turisticos/assets/${item.imagePath}` }} />
              ))
            ) : (
              <Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium }}>Sem resultados</Text>
            )}
          </View>
        </ScrollView>
      </View>
    )
  }

  async function showProfilePlace(placeID) {
    await AsyncStorage.setItem('@place', JSON.stringify(placeID));
    navigation.push('ShowMorePlaces');
    setIsOpenModal(false)
  }


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={origin}
        showsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled={true}
        ref={mapEl}
        customMapStyle={[
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          }
        ]}
      >
        {
          Array.isArray(filteredPlaceData) && filteredPlaceData.map((marker) => {

            return (
              <Marker
                key={marker.placeID}
                onPress={() => {
                  setIsOpenModal(true);
                  listPlaceImages(marker.placeID)
                  listPlace(marker.placeID)
                  setPlaceID(marker.placeID)
                }}
                coordinate={{ latitude: Number(marker.latitude), longitude: Number(marker.longitude) }}
                title={marker.placeName}
              >
                <View style={{ alignItems: 'center' }}>
                  {renderIconByType(marker.type)}
                </View>
              </Marker>
            );
          })
        }


        {destination &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={config.googleApi}
            strokeWidth={10}
            strokeColor='#728EC2'
            onReady={result => {
              setDistance(result.distance);
              mapEl.current.fitToCoordinates(
                result.coordinates, {
                edgePadding: {
                  top: 50,
                  bottom: 50,
                  left: 50,
                  right: 50
                }
              }
              );

            }

            }

          >
          </MapViewDirections>
        }

      </MapView>


      <View style={styles.containerSearch}>
        <TouchableOpacity style={styles.btnFilterNav} onPress={()=> setIsOpenModalFilter(true)}>
          <Ionicons name='filter-outline' color={colors.white} size={20}></Ionicons>
        </TouchableOpacity>
        <View style={{ width: '85%', alignSelf: 'flex-end' }}>
          <GooglePlacesAutocomplete
            placeholder='Toque para pesquisar'
            placeholderTextColor='#fff'
            onPress={(data, details = null) => {
              setDestination({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.000922,
                longitudeDelta: 0.000421
              });
            }}
            query={{
              key: config.googleApi,
              language: 'pt-br',
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            styles={{ listView: { height: 100 }, }}
          />

        </View>
      </View>
      {distance &&
        <View style={styles.containerDistance}>
          <Text style={styles.distance}>{distance.toFixed(1).replace('.', ',')} Km</Text>
        </View>
      }

      {destination &&
        <TouchableOpacity style={styles.btnStopRoute} onPress={() => {
          setDestination(null)
          setDistance(null)
        }}>
          <Text style={styles.btnStopRouteText}>Cancelar rota</Text>
        </TouchableOpacity>
      }


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

      <Modal
        visible={isOpenModal}
        transparent={true}
        animationType='slide'
      >
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={() => setIsOpenModal(false)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>

          <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animatable.View
              animation="fadeInUp"
              duration={600}
              style={[styles.modalPlaces, { flex: 1 }]}
            >
              <View style={{ paddingHorizontal: 24, paddingBottom: 20 }}>
                <Text style={styles.placeNameTitle}>{place && place.placeName}</Text>
                <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center', marginTop: 5 }}>
                  <Ionicons name='star' size={18} color={colors.brighterBlue} />
                  <Text style={styles.placeNameRatingText}>{place && place.stars ? parseInt(place.stars) : '0.0'}</Text>
                </View>
              </View>

              {placeID ? showAboutPlace() : null}

              <TouchableOpacity
                style={{ position: 'absolute', right: 24, top: 45 }}
                onPress={() => showProfilePlace(placeID)}
              >
                <Text style={{ fontSize: 11, fontFamily: fonts.medium, color: colors.mediumGray }}>Ver mais</Text>
              </TouchableOpacity>
            </Animatable.View>
          </SafeAreaView>
        </View>
      </Modal>
    </View >
  );
}
