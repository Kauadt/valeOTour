import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from "react";
import { styles } from './style';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Success } from '../../lotties/Success';
import colors from "../../styles/colors";
import Header from '../../components/Header';

import AsyncStorage from '@react-native-async-storage/async-storage';

ParamList = {
  Detail: {
    id_reg: string,
  }
};

export default function Register() {

  const route = useRoute < RouteProp < ParamList; 'Detail';
  const id_reg = route?.params?.id_reg;
  const navigation = useNavigation();


  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(true)
  const [userPassword, setUserPassword] = useState('');
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);


  async function userRegister() {
    if (!userName || !userEmail || !userPassword) {
      showMessage({
        message: "Erro ao cadastrar-se",
        description: 'Preencha os todos os campos!',
        type: "warning",
      });
      return;
    }

    await AsyncStorage.setItem('@nameRegister', JSON.stringify(userName));
    await AsyncStorage.setItem('@emailRegister', JSON.stringify(userEmail));
    await AsyncStorage.setItem('@passwordRegister', JSON.stringify(userPassword));
    navigation.push("RegisterUserImage")
  }

  if (loading === true) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ActivityIndicator style={{ marginTop: 100 }} color="#000" size="large" />
      </View>
    )
  }

  if (sucess) {
    return <Success />
  }



  return (
    <View style={styles.container}>
       <View style={styles.containerHeader}>
        <Header title='' hasScdIcon={false} mainIcon='chevron-back' screenLeft='left' isButton={true} ></Header>
        <Text style={styles.titleHeader}>Sign In</Text>
        <Text style={styles.labelHeader}>Registre-se e explore novos destinos! </Text>
      </View>

      <View style={styles.containerForm}>
        <View style={styles.containerInput}>
          <Text style={styles.labelFormInput}>Nome</Text>
          <TextInput
            style={styles.inputTextForm}
            placeholder="Digite seu nome"
            placeholderTextColor={colors.lightGray}
            value={userName}
            onChangeText={(userName) => setUserName(userName)}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.labelFormInput}>Email</Text>
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
              style={styles.btnShowPassword}
              onPress={() => {
                isVisiblePassword ? setIsVisiblePassword(false) : setIsVisiblePassword(true);
              }}
            >
              <Ionicons name={isVisiblePassword ? 'eye-off-outline' : 'eye-outline'} color={colors.lightGray} size={22}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btnLogin}
        onPress={() => {
          setSucess(true);
          userRegister();
          setSucess(false);
        }}
      >
        <Text style={styles.btnLoginText}>CADASTRAR-SE</Text>
      </TouchableOpacity>
    </View>
  )
}