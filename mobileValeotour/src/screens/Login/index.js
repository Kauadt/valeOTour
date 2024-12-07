import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { styles } from './style';
import { TouchableOpacity, View, Text, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import colors from "../../styles/colors";
import { Ionicons } from '@expo/vector-icons';
import Header from "../../components/Header";

export default function Login() {
  const navigation = useNavigation();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(true)

  async function login() {
    const obj = { userEmail, userPassword };
    const res = await api.post('valeOTour/login/login.php', obj);

    if (res.data.result === 'Dados Incorretos!') {
      Alert.alert('Ops!', 'Dados Incorretos!');
    } else {
      const user = res.data.result[0];
      await AsyncStorage.setItem('@user', JSON.stringify(user.userID));
      await AsyncStorage.setItem('@userType', user.type);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
      });
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Header title='' hasScdIcon={false} mainIcon='chevron-back' screenLeft='left' isButton={true} ></Header>
        <Text style={styles.titleHeader}>Sign In</Text>
        <Text style={styles.labelHeader}>Insira seus dados para avançar</Text>
      </View>
      <View style={styles.containerForm}>
        <View style={styles.containerInput}>
          <Text style={styles.labelFormInput}>E-mail</Text>
          <TextInput
            style={styles.inputTextForm}
            placeholder="Digite seu e-mail"
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
        onPress={login}
      >
        <Text style={styles.btnLoginText}>ENTRAR</Text>
      </TouchableOpacity>
      <View style={styles.containerBtnRegister}>
        <Text style={styles.registerText}>Não tem conta?</Text>
        <TouchableOpacity
          onPress={() => navigation.push('userRegister')}
        >
          <Text style={styles.btnRegisterText}>Registre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}