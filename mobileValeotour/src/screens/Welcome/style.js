import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import reset from "../../styles/reset";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkBlue,
        paddingVertical: 100,
    },

    welcomeTitle: {
        fontFamily: fonts.bold,
        fontSize: 50,
        color: colors.white,
        width: 320,
        paddingHorizontal: reset.padH
    },

    welcomeText: {
        fontFamily: fonts.medium,
        fontSize: 15,
        color: colors.lightBlue,
        width: 320,
        marginTop: 30,
        paddingHorizontal: reset.padH
    },

    containerLogo:{
        width: '100%',
        alignItems: 'flex-end',
        marginLeft: 120,
        marginTop: 35
    },

    logo: {
        width: 330,
        height: 330,
        objectFit: 'contain',
    },

    btnNext:{
        width: 64,
        height: 64,
        backgroundColor: colors.lightBlue,
        borderRadius: 25,
        marginLeft: 24,
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }

})