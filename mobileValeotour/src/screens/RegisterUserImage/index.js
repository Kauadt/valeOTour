import { useNavigation } from '@react-navigation/core';
import React, { useState } from "react";
import { styles } from './style';
import {
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Alert,
    Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Ionicons } from '@expo/vector-icons';
import { showMessage } from "react-native-flash-message";
import { Success } from '../../lotties/Success';
import api from '../../services/api';
import colors from "../../styles/colors";
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../services/url';
import { Iconify } from 'react-native-iconify';


export default function RegisterUserImage() {


    const navigation = useNavigation();
    const [isOpenModalSuccess, setIsOpenModalSuccess] = useState(false);

    const [image, setImage] = useState(null);

    async function chooseImage() {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        if (!res.canceled) {
            setImage(res.assets[0].uri)
        }
    }

    async function takePhoto() {
        let res = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        if (!res.canceled) {
            setImage(res.assets[0].uri)
        }
    }

    async function Register(checkImage = true) {
        if (checkImage && !image) {
            Alert.alert("Nenhuma imagem selecionada", "Por favor, selecione ou tire uma foto primeiro.");
            return;
        }

        const userName = JSON.parse(await AsyncStorage.getItem('@nameRegister'));
        const userEmail = JSON.parse(await AsyncStorage.getItem('@emailRegister'));
        const userPassword = JSON.parse(await AsyncStorage.getItem('@passwordRegister'));

        let formData = new FormData();

        if (image) {
            let filename = image.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            formData.append('photo', { uri: image, name: filename, type });
        }

        formData.append('userName', userName);
        formData.append('userEmail', userEmail);
        formData.append('userPassword', userPassword);
        formData.append('userType', 'Comum');

        try {
            const response = await fetch(`${url}valeOTour/usuarios/salvar.php`, {
                method: 'POST',
                body: formData,
            });

            const contentType = response.headers.get("content-type");
            const responseText = await response.text();

            if (!response.ok || !contentType || !contentType.includes("application/json")) {
                Alert.alert("Erro", "Falha ao enviar os dados.");
                return;
            }

            const resData = JSON.parse(responseText);

            if (resData.success === false) {
                showMessage({
                    message: "Erro ao Salvar",
                    description: resData.mensagem,
                    type: "warning",
                    duration: 3000,
                });
                return;
            }

            setIsOpenModalSuccess(true)

        } catch (error) {
            console.log("Erro:", error);
            Alert.alert("Ops", "Alguma coisa deu errado, tente novamente.");
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Header title='Sign Up' hasScdIcon={false} mainIcon='chevron-back' screenLeft='left' isButton={true} ></Header>
            </View>
            <View style={styles.containerMain}>
                <Text style={styles.titleMain}>Foto de perfil</Text>
                <Text style={styles.labelMain}>Adicione uma foto ao seu perfil</Text>
                <TouchableOpacity style={styles.btnChooseImage} onPress={chooseImage}>
                    {image && (
                        <Image source={{ uri: image }} style={styles.userImage}></Image>
                    )}
                    <Ionicons name='images-outline' size={60} color={colors.lightPurple}></Ionicons>
                    <Text style={styles.btnChooseImageText}>Clique para selecionar uma foto de perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnTakePhoto} onPress={takePhoto}>
                    <Ionicons name='camera-outline' size={30} color={colors.lightPurple}></Ionicons>
                    <Text style={styles.btnTakePhotoText}>Tirar foto agora</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.containerButtons}>
                <TouchableOpacity style={styles.btnSkip} onPress={() => Register(false)}>
                    <Text style={styles.btnSkipText}>Pular</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnNext} onPress={() => Register(true)}>
                    <Text style={styles.btnNextText}>Continuar</Text>
                </TouchableOpacity>
            </View>

            {
                isOpenModalSuccess ? (
                    <View style={styles.containerModalSuccess}>
                            <View style={styles.modalSuccess}>
                                <View style={styles.modalSuccessIcon}>
                                    <Iconify icon="lucide:party-popper" size={85} color={colors.mainColor} />
                                </View>
                                <Text style={styles.modalSuccessTitle}>Bem vindo(a)!</Text>
                                <Text style={styles.modalSuccessText}>Parabéns! Seus dados foram aprovados com sucesso.</Text>
                                <TouchableOpacity style={styles.modalSuccessBtn} onPress={() => {
                                    navigation.push('Login')
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Login' }]
                                    });
                                }}>
                                    <Text style={styles.modalSuccessBtnText}>Continuar</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                ) : ''
            }

        </View>
    )
}