import React from 'react';
import { styles } from './style';
import {
    Text,
    View,
    TouchableOpacity,
    Image,

} from 'react-native';

import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core';
import colors from '../../styles/colors';


export default function Welcome() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeTitle}>Não importa o <Text style={{ color: colors.mainGreen }}>destino!</Text></Text>
            <Text style={styles.welcomeText}>Descubra a natureza e cultura única do <Text style={{ color: colors.lightGreen }}>Vale do Ribeira.</Text></Text>
            <View style={styles.containerLogo}>
                <Image source={require('../../assets/logo.png')} style={styles.logo}></Image>
            </View>
            <TouchableOpacity 
            style={styles.btnNext}
            onPress={()=> navigation.push('Login')}
            >
                <Ionicons name='chevron-forward-outline' size={36} color={colors.mainColor}></Ionicons>
            </TouchableOpacity>
        </View>

    )
}