import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../styles/colors';

const DadosProps = {
    title: string = "",
    mainIcon: string = "",
    hasScdIcon: null,
    screenLeft: string = "",
    scdIcon: string = "",
    scdIconColor: string = ""
}

export const Header = ({ title, hasScdIcon, mainIcon, screenLeft, isButton, scdIcon, scdIconColor, scdIconFunction } = DadosProps) => {
    const navigation = any = useNavigation();

    const goBack = () => {
        screenLeft == 'left' ? navigation.goBack() : navigation.push(screenLeft)
    }

    return (
        <View style={styles.containerMenu}>
            <View style={styles.menuLeftArea}>
                {
                    isButton ? <TouchableOpacity style={styles.btnLeft} onPress={() => goBack()}>
                        <Ionicons name={mainIcon} size={18} color={colors.white} ></Ionicons>
                    </TouchableOpacity> : <View style={styles.btnLeft}>
                        <Ionicons name={mainIcon} size={18} color={colors.white} ></Ionicons>
                    </View>
                }
                <Text style={styles.menuTitle}>{title}</Text>
            </View>

            {hasScdIcon ? <TouchableOpacity onPress={scdIconFunction}>
                <Ionicons name={scdIcon} size={26} color={scdIconColor}></Ionicons>
            </TouchableOpacity> : ''
            }


        </View>


    )

}
export default Header;