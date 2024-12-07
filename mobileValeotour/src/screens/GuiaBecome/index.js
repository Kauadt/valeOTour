import React, { useEffect, useState } from 'react';
import { styles } from './style';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Image,
  Modal,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import api from '../../services/api';
import { Iconify } from 'react-native-iconify';

import { useIsFocused } from '@react-navigation/native';
import Header from '../../components/Header'
import colors from "../../styles/colors";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';



export default function GuiaBecome() {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [userData, setUserData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalCadastur, setIsOpenModalCadastur] = useState(false);
  const [isOpenModalInfo, setIsOpenModalInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [cpf, setCpf] = useState('')
  const [biografia, setBiografia] = useState('')
  const [cadastur, setCadastur] = useState('')
  const [city, setCity] = useState('')
  const [tourismType, setTourismType] = useState('')
  const [pricePeople, setPricePeople] = useState(0)
  const [priceTime, setPriceTime] = useState(0)
  const user = { ...userData.dados } || {}


  const [imageFrente, setImageFrente] = useState(null);
  const [imageVerso, setImageVerso] = useState(null);

  async function chooseImage(type) {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.canceled) {
      const uri = res.assets[0].uri;
      const fileExtension = uri.split('.').pop();
      const fileName = `${type === 'frente' ? 'imagemFrente' : 'imagemVerso'}.${fileExtension}`;

      if (type === 'frente') {
        setImageFrente({ uri, name: fileName, showImage: false });
      } else {
        setImageVerso({ uri, name: fileName, showImage: false });
      }
    }
  }

  function toggleImage(type) {
    if (type === 'frente') {
      setImageFrente((prevImage) => ({ ...prevImage, showImage: !prevImage.showImage }));
    } else {
      setImageVerso((prevImage) => ({ ...prevImage, showImage: !prevImage.showImage }));
    }
  }

  function removeImage(type) {
    if (type === 'frente') {
      setImageFrente(null);
    } else {
      setImageVerso(null);
    }
  }

  const verifyBecomeGuia = () => {
    if (cpf && biografia && cadastur && city && tourismType && pricePeople && priceTime && user.userID && imageFrente && imageVerso) {
      becomeGuia();
    } else {
      setIsOpenModalInfo(true)
    }
  };

  const becomeGuia = async () => {
    const formData = new FormData();

    formData.append('cpf', cpf);
    formData.append('biografia', biografia);
    formData.append('cadastur', cadastur);
    formData.append('city', city);
    formData.append('tourismType', tourismType);
    formData.append('pricePeople', pricePeople);
    formData.append('priceTime', priceTime);
    formData.append('userID', user.userID);

    formData.append('photoFrente', {
      uri: imageFrente.uri,
      type: imageFrente.type || 'image/jpeg',
      name: imageFrente.fileName || 'frente.jpg'
    });

    formData.append('photoVerso', {
      uri: imageVerso.uri,
      type: imageVerso.type || 'image/jpeg',
      name: imageVerso.fileName || 'verso.jpg'
    });

    try {
      const res = await api.post('valeOTour/guias/salvar.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success === true) {
        setIsOpenModal(true)
      } else if (res.data.mensagem === 'Cadastur já cadastrado!') {
        setIsOpenModalCadastur(true)
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.',
        [{ text: "OK" }],
        { cancelable: true }
      );
    }
  };


  async function listUserData() {

    try {
      const user = await AsyncStorage.getItem('@user');
      const userType = await AsyncStorage.getItem('@userType');
      const res = await api.get(`valeOTour/usuarios/listar_id.php?id=${user}&tipo_usuario=${userType}`);
      setUserData(res.data);

    } catch (error) {
      console.log("Erro ao Listar " + error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);

    }
  }


  useEffect(() => {
    listUserData();
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    listUserData();
  };

  const formatCPF = (value) => {
    const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');

    const formattedValue = sanitizedValue
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3}\.\d{3})(\d)/, '$1.$2') 
      .replace(/^(\d{3}\.\d{3}\.\d{3})([a-zA-Z0-9]{0,2})/, '$1-$2');

    return formattedValue;
  };

  const onCPFChange = (text) => {
    const formattedText = formatCPF(text);
    setCpf(formattedText);
  };


  return (
    <View>
      <ScrollView>


        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Header title='' hasScdIcon={false} mainIcon='chevron-back' screenLeft='left' isButton={true} ></Header>
            <Text style={styles.titleHeader}>Torne-se guia!</Text>
            <Text style={styles.labelHeader}>Insira seus dados para avançar</Text>
          </View>

          <View style={styles.containerForm}>

            <Text style={styles.sectionTitle}>Informações Gerais</Text>
            <View style={styles.containerInput}>
              <Text style={styles.labelFormInput}>CPF</Text>
              <TextInput
                style={styles.inputTextForm}
                placeholder="Digite seu CPF"
                placeholderTextColor="#A9A9A9"
                value={cpf}
                onChangeText={onCPFChange}
                maxLength={14}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.labelFormInput}>Biografia</Text>
              <TextInput
                style={styles.inputTextAreaForm}
                placeholder="Digite sua biografia"
                placeholderTextColor={colors.lightGray}
                multiline={true}
                onChangeText={(text) => setBiografia(text)}
              />
            </View>



            <Text style={styles.sectionTitle}>Detalhes do guia</Text>
            <View style={styles.containerInput}>
              <Text style={styles.labelFormInput}>Cadastur</Text>
              <TextInput
                style={styles.inputTextForm}
                placeholder="Digite seu cadastur"
                placeholderTextColor={colors.lightGray}
                onChangeText={(text) => setCadastur(text)}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.labelFormInput}>Cidade de atuação</Text>
              <TextInput
                style={styles.inputTextForm}
                placeholder="Digite sua cidade de atuação"
                placeholderTextColor={colors.lightGray}
                onChangeText={(text) => setCity(text)}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.labelFormInput}>Eixo turístico</Text>
              <Picker
                selectedValue={tourismType}
                style={styles.pickerForm}
                onValueChange={(tourismType) => setTourismType(tourismType)}
              >
                <Picker.Item style={styles.pickerFormText} label="Histórico" value="Histórico" />
                <Picker.Item style={styles.pickerFormText} label="Gastronômico" value="Gastronômico" />
                <Picker.Item style={styles.pickerFormText} label="Ecológico" value="Ecológico" />
                <Picker.Item style={styles.pickerFormText} label="Aventura" value="Aventura" />
              </Picker>
            </View>

            <Text style={styles.sectionTitle}>Precificação</Text>
            <Text style={styles.sectionText}>
              O valor do guiamento será dado por: {'\n'}
              (Taxa por Hora * Nº de Horas) + (Taxa por Pessoa * Nº de Pessoas)
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', gap: 10 }}>
              <View style={styles.containerInput}>
                <Text style={styles.labelFormInput}>Taxa por Hora(R$)</Text>
                <TextInput
                  style={styles.inputNumberForm}
                  placeholder="00,00"
                  placeholderTextColor={colors.lightGray}
                  onChangeText={(text) => setPriceTime(text)}
                />
              </View>
              <View style={styles.containerInput}>
                <Text style={styles.labelFormInput}>Taxa por Pessoa(R$)</Text>
                <TextInput
                  style={styles.inputNumberForm}
                  placeholder="00,00"
                  placeholderTextColor={colors.lightGray}
                  onChangeText={(text) => setPricePeople(text)}
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>Foto Cadastur</Text>
            <Text style={styles.sectionText}>
              O envio da foto frente e verso do Cadastur é obrigatório para concluir seu cadastro.
              Por favor, certifique-se de enviar ambos os lados do documento.
            </Text>

            <View style={styles.containerFiles}>

              {imageFrente ? (
                <View>
                  {imageFrente.showImage ? (
                    <>
                      <Image
                        source={{ uri: imageFrente.uri }}
                        style={{ width: 200, height: 150, borderRadius: 10 }}
                      />
                      <TouchableOpacity
                        onPress={() => toggleImage('frente')}
                        style={{
                          marginTop: 5,
                          backgroundColor: 'blue',
                          padding: 5,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: 'white' }}>Esconder Imagem</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity style={styles.cardFile} onPress={() => toggleImage('frente')}>
                        <Text style={styles.fileText}>{imageFrente.name}</Text>
                        <TouchableOpacity onPress={() => removeImage('frente')}>
                          <Ionicons name='close-outline' size={20} color={colors.lightGray}></Ionicons>
                        </TouchableOpacity>
                      </TouchableOpacity>
                      {!imageVerso ? (
                        <View style={{ width: '100%', height: 40 }}>
                        </View>
                      ) : ''}
                    </>
                  )}
                </View>
              ) : (
                ''
              )}

              {imageVerso ? (
                <View>
                  {imageVerso.showImage ? (
                    <>
                      <View>
                        <Image
                          source={{ uri: imageFrente.uri }}
                          style={{ width: 200, height: 150, borderRadius: 10 }}
                        />
                        <TouchableOpacity
                          onPress={() => toggleImage('verso')}
                          style={{
                            marginTop: 5,
                            backgroundColor: 'blue',
                            padding: 5,
                            borderRadius: 5,
                          }}
                        >
                          <Text style={{ color: 'white' }}>Esconder Imagem</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={{ width: '100%', height: 20 }}></View>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity style={styles.cardFile} onPress={() => toggleImage('verso')}>
                        <Text style={styles.fileText}>{imageVerso.name}</Text>
                        <TouchableOpacity onPress={() => removeImage('verso')}>
                          <Ionicons name='close-outline' size={20} color={colors.lightGray}></Ionicons>
                        </TouchableOpacity>
                      </TouchableOpacity>

                      {imageVerso ? (
                        <View style={{ width: '100%', height: 20 }}>
                        </View>
                      ) : ''}
                    </>


                  )}
                </View>
              ) : (
                ''
              )}

              <View style={styles.containerButtonsUpload}>
                <TouchableOpacity style={styles.btnUploadImg} onPress={() => chooseImage('frente')} >
                  <Text style={styles.btnUploadImgText}>Frente</Text>
                  <Iconify icon="octicon:upload-16" size={15} color={colors.brighterBlue} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnUploadImg} onPress={() => chooseImage('verso')} >
                  <Text style={styles.btnUploadImgText}>Verso</Text>
                  <Iconify icon="octicon:upload-16" size={15} color={colors.brighterBlue} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.btnRegister}
              onPress={verifyBecomeGuia}
            >
              <Text style={styles.btnRegisterText}>SALVAR ALTERAÇÕES</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView >


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
                <Ionicons name='person-add-outline' size={20} color={colors.mainColor}></Ionicons>
              </View>
            </View>

            <Text style={styles.titleModal}>Tornar-se guia</Text>
            <Text style={styles.modalSubTitle}>
              Solicitação realizada com sucesso, aguarde a verificação dos dados
            </Text>

            <View style={styles.containerButtonsModal}>
              <TouchableOpacity style={styles.btnModalPostGreen} onPress={() => {
                setIsOpenModal(false)
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }]
                });
                navigation.navigate('User');
              }}>
                <Text style={styles.btnModalPostText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </SafeAreaView>
      </Modal >

      <Modal
        visible={isOpenModalCadastur}
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
            </View>

            <Text style={styles.titleModal}>Ops! dados já cadastrados</Text>
            <Text style={styles.modalSubTitle}>
              O cadastur informado já foi cadastrado.
            </Text>
            <Text style={styles.modalSubTitle}>
              Por favor, confira as suas informações!
            </Text>

            <View style={styles.containerButtonsModal}>
              <TouchableOpacity style={styles.btnModalPostGreen} onPress={() => {
                setIsOpenModalCadastur(false)
              }}>
                <Text style={styles.btnModalPostText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </SafeAreaView>
      </Modal >

      <Modal
        visible={isOpenModalInfo}
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
            </View>

            <Text style={styles.titleModal}>Erro</Text>
            <Text style={styles.modalSubTitle}>
              Por favor, preencha todos os campos!
            </Text>


            <View style={styles.containerButtonsModal}>
              <TouchableOpacity style={styles.btnModalPostGreen} onPress={() => {
                setIsOpenModalInfo(false)
              }}>
                <Text style={styles.btnModalPostText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </SafeAreaView>
      </Modal >
    </View >
  )
}