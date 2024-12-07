import { StyleSheet } from 'react-native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import reset from '../../styles/reset';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainColor,
        alignItems: 'center',
    },

    containerHeader: {
        width: '100%',
        height: 150,
        paddingTop: reset.padTop,
        paddingHorizontal: reset.padH,
    },

    containerMain: {
        width: '100%',
        paddingHorizontal: reset.padH
    },

    titleMain: {
        fontSize: 26,
        fontFamily: fonts.bold,
        color: colors.white
    },

    labelMain: {
        fontSize: 15,
        fontFamily: fonts.semiBold,
        color: colors.lightBlue,
        marginTop: 8
    },

    userImage: {
        position: 'absolute',
        zIndex: 999,
        width: '100%',
        height: '100%',
        borderRadius: 15
    },

    btnChooseImage: {
        width: '100%',
        height: 320,
        borderWidth: 3,
        borderRadius: 15,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.lightPurple,
        marginTop: 35,
        gap: 8
    },

    btnChooseImageText: {
        fontFamily: fonts.medium,
        fontSize: 13,
        color: colors.lightPurple
    },

    btnTakePhoto: {
        borderColor: colors.formLabelColor,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        borderRadius: 5
    },

    btnTakePhotoText: {
        fontFamily: fonts.semiBold,
        color: colors.formLabelColor,
        fontSize: 13
    },

    containerButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 40,
        paddingHorizontal: reset.padH,
        gap: 15
    },


    btnSkip: {
        paddingHorizontal: 15,
        borderRadius: 8,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.formLabelColor
    },

    btnSkipText: {
        color: colors.formLabelColor,
        fontSize: 13,
        fontFamily: fonts.bold
    },
    btnNext: {
        paddingHorizontal: 15,
        backgroundColor: colors.mainGreen,
        borderRadius: 8,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnNextText: {
        color: colors.white,
        fontSize: 13,
        fontFamily: fonts.bold
    },

    containerModalSuccess: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 24,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#00000099'
    },

    modalSuccess: {
        width: '100%',
        height: 413,
        backgroundColor: colors.cardColor,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 15
    },

    modalSuccessIcon: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: colors.lightBlue,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalSuccessTitle: {
        fontSize: 26,
        fontFamily: fonts.bold,
        color: colors.mainColor
    },

    modalSuccessText: {
        fontSize: 15,
        fontFamily: fonts.semiBold,
        color: colors.lightGray,
        width: 250,
        textAlign: 'center'
    },

    modalSuccessBtn: {
        marginTop: 50,
        alignSelf: 'flex-end',
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: colors.mainGreen,
        borderRadius: 8
    },

    modalSuccessBtnText:{
        fontSize: 13,
        fontFamily: fonts.bold,
        color: colors.white 
    }




})


