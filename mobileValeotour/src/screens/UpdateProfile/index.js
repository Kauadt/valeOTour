import React, { useEffect, useState } from 'react';
import { styles } from './style';

import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    RefreshControl,
    TextInput

} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Load from '../../components/Load';
import { useNavigation } from '@react-navigation/core';
import api from '../../services/api';

import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import colors from '../../styles/colors';
import url from '../../services/url';;
import { Iconify } from 'react-native-iconify';
import Header from '../../components/Header'
import * as ImagePicker from 'expo-image-picker';

export default function UpdateProfile() {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

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

    const [guiaData, setGuiaData] = useState()

    async function listGuiaData() {
        try {
            const userID = await AsyncStorage.getItem('@user');
            const res = await api.get(`valeOTour/guias/listar_id.php?id=${userID}`);
            setGuiaData(res.data.dados);
        } catch (error) {
            console.log("Erro ao Listar:", error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        listUserData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        listUserData();
    };

    useEffect(() => {
        if (userData) {
            setUserName(userData.nome);
            setUserEmail(userData.email);
            setUserBio(userData.biografia);
            setImage(userData.imagePath);
            setUserType(userData.tipo);
            setUserID(userData.userID);
        }

        if (userData && userData.tipo === "Guia") {
            listGuiaData();
        }
    }, [userData]);

    useEffect(() => {
        if (guiaData) {
            setNumHour(String(guiaData.priceHour || ""));
            setNumPeople(String(guiaData.pricePeople || ""));
        }
    }, [guiaData]);


    const [isVisiblePassword, setIsVisiblePassword] = useState(true)
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userBio, setUserBio] = useState('')
    const [numHour, setNumHour] = useState('')
    const [numPeople, setNumPeople] = useState('')
    const [userType, setUserType] = useState('')
    const [userID, setUserID] = useState('')
    const [image, setImage] = useState('')
    const [newImage, setNewImage] = useState(null);

    const update = async () => {
        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("userEmail", userEmail);
        formData.append("userPassword", userPassword);
        formData.append("userBio", userBio);
        formData.append("numHour", numHour);
        formData.append("numPeople", numPeople);
        formData.append("userType", userType);
        formData.append("userID", userID);
    
        if (newImage) {
            const uri = newImage;
            const type = 'image/jpeg';
            const name = uri.split('/').pop();
    
            formData.append('photo', {
                uri,
                type,
                name,
            });
        }
    
        try {
            const response = await fetch(`${url}valeOTour/usuarios/editar_usuario.php`, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            const result = await response.json(); 
    
            if (result.success) {
                if (result.guia) {
                    navigation.goBack()
                }
            } else {
                if (result.guia && !result.guia.success) {
                    console.log("Erro Guia", result.guia.mensagem);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    const chooseImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Você precisa de permissão para acessar a galeria");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.Photo,
            quality: 0.8,
        });

        if (result && !result.canceled && result.assets && result.assets.length > 0) {
            const newImageUri = result.assets[0].uri;
            setNewImage(newImageUri); 
        } else {
            console.log('Nenhuma imagem selecionada ou cancelada');
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
                            <Header title='Alterar Perfil' hasScdIcon={false} mainIcon='chevron-back-outline' screenLeft={'left'} isButton={true}></Header>
                        </View>


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
                                                source={newImage ? { uri: newImage } : { uri: `${url}valeOTour/usuarios/assets/${userData.imagePath}` }}
                                            />
                                        ) : (
                                            newImage ? (
                                                <Image
                                                    style={styles.profileImageHeader}
                                                    source={{ uri: newImage }}
                                                />
                                            ) : (
                                                <Ionicons name="person" color={colors.white} size={42} />
                                            )
                                        )
                                    }

                                    <TouchableOpacity style={{ position: 'absolute', width: 30, height: 30, backgroundColor: colors.lightBlue, bottom: 5, right: -5, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }} onPress={chooseImage}>
                                        <Iconify icon="lucide:edit" size={16} color={colors.mainColor} />
                                    </TouchableOpacity>

                                </View>
                            </LinearGradient>

                            <Text style={styles.userNameText}>{userData && userData.nome}</Text>
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
                        </View>

                        <View style={styles.containerUserContent}>

                            <Text style={styles.profileSectionTitle}>Informações Gerais</Text>
                            <View style={{ height: 30 }}></View>
                            <View style={styles.containerInput}>
                                <Text style={styles.labelFormInput}>Nome</Text>
                                <TextInput
                                    style={styles.inputTextForm}
                                    placeholder="Digite o seu nome"
                                    placeholderTextColor={colors.lightGray}
                                    value={userName}
                                    onChangeText={(userName) => setUserName(userName)}
                                />
                            </View>
                            <View style={styles.containerInput}>
                                <Text style={styles.labelFormInput}>E-mail</Text>
                                <TextInput
                                    style={styles.inputTextForm}
                                    placeholder="Digite o seu e-mail"
                                    placeholderTextColor={colors.lightGray}
                                    value={userEmail}
                                    onChangeText={(userEmail) => setUserEmail(userEmail)}
                                />
                            </View>
                            <View style={styles.containerInput}>
                                <Text style={styles.labelFormInput}>Senha</Text>
                                <View style={{ position: 'relative' }}>
                                    <TextInput
                                        secureTextEntry={isVisiblePassword}
                                        style={styles.inputTextForm}
                                        placeholder="Digite sua senha"
                                        placeholderTextColor={colors.lightGray}
                                        value={userPassword}
                                        onChangeText={(userPassword) => setUserPassword(userPassword)}
                                    />

                                    <TouchableOpacity
                                        style={{ position: 'absolute', top: 18, right: 16 }}
                                        onPress={() => {
                                            isVisiblePassword ? setIsVisiblePassword(false) : setIsVisiblePassword(true);
                                        }}
                                    >
                                        <Ionicons name={isVisiblePassword ? 'eye-off-outline' : 'eye-outline'} color={colors.lightGray} size={22}></Ionicons>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {
                                userData && userData.tipo == 'Guia' ? (
                                    <View style={styles.containerInput}>
                                        <Text style={styles.labelFormInput}>Biografia</Text>
                                        <TextInput
                                            style={styles.inputTextFormBio}
                                            placeholder="Digite a sua biografia"
                                            placeholderTextColor={colors.lightGray}
                                            value={userBio}
                                            multiline={true}
                                            textAlignVertical='top'
                                            onChangeText={(userBio) => setUserBio(userBio)}
                                        />
                                    </View>
                                ) : ''
                            }

                            {
                                userData && userData.tipo == 'Guia' ? (
                                    <View>
                                        <Text style={styles.profileSectionTitle}>Detalhes do Guia</Text>
                                        <View style={{ height: 30 }}></View>

                                        <View style={{ flexDirection: 'row', gap: 10 }}>
                                            <View style={styles.containerInput}>
                                                <Text style={styles.labelFormInput}>Taxa por Hora(R$)</Text>
                                                <TextInput
                                                    style={styles.inputTextFormTaxa}
                                                    placeholder="00,00"
                                                    placeholderTextColor={colors.lightGray}
                                                    value={numHour}
                                                    onChangeText={(numHour) => setNumHour(numHour)}
                                                    keyboardType='numeric'
                                                />
                                            </View>
                                            <View style={styles.containerInput}>
                                                <Text style={styles.labelFormInput}>Taxa por Pessoa(R$)</Text>
                                                <TextInput
                                                    style={styles.inputTextFormTaxa}
                                                    placeholder="00,00"
                                                    placeholderTextColor={colors.lightGray}
                                                    value={numPeople}
                                                    onChangeText={(numPeople) => setNumPeople(numPeople)}
                                                    keyboardType='numeric'
                                                />
                                            </View>
                                        </View>
                                    </View>
                                ) : ''
                            }

                            <TouchableOpacity
                                style={styles.btnRegister}
                                onPress={update}
                            >
                                <Text style={styles.btnRegisterText}>SALVAR ALTERAÇÕES</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>
            }
        </View >

    )
}