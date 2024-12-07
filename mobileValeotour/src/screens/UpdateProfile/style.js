import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import reset from "../../styles/reset";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        paddingBottom: 60
    },

    containerHeader: {
        width: '100%',
        paddingHorizontal: reset.padH,
        paddingTop: reset.padTop,
        alignItems: 'flex-end',
        backgroundColor: colors.mainColor
    },

    containerUserProfile: {
        width: '100%',
        alignItems: 'center',
        height: 260,
        backgroundColor: colors.mainColor,
        paddingBottom: 80,
        borderBottomLeftRadius: 30,
        marginBottom: reset.padTop,
    },

    containerGuiaProfile: {
        width: '100%',
        alignItems: 'center',
        height: 280,
        backgroundColor: colors.mainColor,
        paddingBottom: 60,
        borderBottomLeftRadius: 30,
        marginBottom: reset.padTop,
    },

    profileImageHeader: {
        width: 77,
        height: 77,
        borderRadius: 100,
        resizeMode: 'cover',
        backgroundColor: colors.brighterBlue,
    },

    containerImg: {
        width: 88,
        height: 88,
        backgroundColor: colors.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },

    profileImageBorder: {
        padding: 2,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32
    },

    userNameText: {
        fontFamily: fonts.semiBold,
        fontSize: 18,
        color: colors.white,
        paddingTop: 16
    },

    userTypeText: {
        paddingHorizontal: 18,
        paddingVertical: 3,
        backgroundColor: colors.lightBlue,
        borderRadius: 100,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontFamily: fonts.bold,
        fontSize: 12,
        color: colors.darkBlue,
        marginTop: 7
    },

    userTypeTextGuia: {
        paddingHorizontal: 18,
        paddingVertical: 3,
        backgroundColor: colors.mainGreen,
        borderRadius: 100,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontFamily: fonts.bold,
        fontSize: 12,
        color: colors.white,
        marginTop: 7
    },

    containerUserContent: {
        paddingHorizontal: reset.padH,
        width: '100%',
    },

    profileSectionTitle: {
        fontFamily: fonts.semiBold,
        fontSize: 18,
        color: colors.textColor,
        paddingTop: reset.padTop
    },

    guiaLocationText: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: colors.white
    },

    containerInput: {
        gap: 3,
        marginBottom: 20
    },

    labelFormInput: {
        color: colors.mediumGray,
        fontFamily: fonts.bold,
        fontSize: 12
    },


    inputTextForm: {
        width: '100%',
        height: 58,
        backgroundColor: colors.cardColor,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 70,
        fontFamily: fonts.semiBold,
    },

    inputTextFormBio: {
        width: '100%',
        height: 200,
        backgroundColor: colors.cardColor,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 70,
        fontFamily: fonts.semiBold,
        paddingTop: 15
    },

    inputTextFormTaxa: {
        width: 178,
        height: 58,
        backgroundColor: colors.cardColor,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 5,
        fontFamily: fonts.semiBold,
    },

    btnRegister:{
        marginTop: 50,
        width: '100%',
        height: 58,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkBlue
      },
  
      btnRegisterText:{
        fontSize: 14,
        fontFamily: fonts.bold,
        color: colors.white
      },
})