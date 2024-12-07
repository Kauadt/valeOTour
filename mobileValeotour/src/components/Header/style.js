import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";

export const styles = StyleSheet.create({
    containerMenu:{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
        // backgroundColor: 'red'
    },

    menuLeftArea:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    btnLeft:{
        width: 32,
        height: 32,
        backgroundColor: colors.mainGreen,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },

    menuTitle:{
        fontSize: 18,
        fontFamily: fonts.semiBold,
        color: colors.white
    }


})