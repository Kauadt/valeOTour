import { StyleSheet } from 'react-native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import reset from '../../styles/reset';

export const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      paddingBottom: 40
    },

    containerHeader:{
      width: '100%',
      height: 230,
      backgroundColor: colors.mainColor,
      paddingTop: reset.padTop,
      paddingHorizontal: reset.padH,
      borderBottomLeftRadius: 30,
      marginBottom: 50
    },

    titleHeader:{
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: colors.white,
      marginTop: 16,
      marginBottom: 8
    },

    labelHeader:{
      fontSize: 15,
      fontFamily: fonts.medium,
      color: colors.lightBlue,
    },

    containerLogo:{
      width: '100%',
      height: 120,
      justifyContent: 'center',
      alignItems: 'center'
    },

    containerForm:{
      paddingHorizontal: reset.padH,
      width: '100%',
      gap: 20
    },

    sectionTitle:{
      fontSize: 15,
      fontFamily: fonts.semiBold,
      marginBottom: 10,
      marginTop: 20
    },

    sectionText:{
      fontSize: 13,
      fontFamily: fonts.medium,
      marginTop: -20,
      marginBottom: 10,
      color: colors.lightGray
    },

    containerInput:{
      gap: 3
    },

    labelFormInput:{
      color: colors.mediumGray,
      fontFamily: fonts.bold,
      fontSize: 12
    },

    btnShowPassword:{
      position: 'absolute',
      right: 15,
      top: 16,
    },

    inputTextForm:{
      width: '100%',
      height: 58,
      backgroundColor: colors.cardColor,
      borderRadius: 10,
      paddingHorizontal: 20,
      fontFamily: fonts.semiBold,
    },

    pickerForm:{
      width: '100%',
      height: 58,
      backgroundColor: colors.cardColor,
      borderRadius: 10,
      paddingHorizontal: 20,

    },

    pickerFormText:{
      fontFamily: fonts.semiBold,
      color: colors.lightGray
    },

    inputNumberForm:{
      width: 170,
      height: 58,
      backgroundColor: colors.cardColor,
      borderRadius: 10,
      paddingHorizontal: 20,
      fontFamily: fonts.semiBold,
    },

    inputTextAreaForm:{
      width: '100%',
      height: 150,
      backgroundColor: colors.cardColor,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingTop: 15,
      fontFamily: fonts.semiBold,
      textAlignVertical: 'top',
      marginBottom: 20
    },

    containerFiles:{
      width: '100%',
      marginTop: 5,
      gap: 10
    },

    cardFile:{
      width: '100%',
      height: 50,
      backgroundColor: colors.cardColor,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 15
    },

    fileText:{
      fontSize: 12,
      fontFamily: fonts.medium
    },

    btnUploadImg:{
      width: '49%',
      height: 43,
      backgroundColor: colors.lightBlue,
      borderRadius: 7,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 7,
    },

    btnUploadImgText:{
      color: colors.brighterBlue,
      fontFamily: fonts.bold,
      fontSize: 15
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

    containerButtonsUpload:{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },



    modal: {
      width: '90%',
      padding: 20,
      backgroundColor: colors.cardColor,
      borderRadius: 7,
  },

  headerModal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },

  containerIconModal: {
      width: 40,
      height: 40,
      backgroundColor: colors.lightBlue,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100
  },

  titleModal: {
      fontSize: 26,
      fontFamily: fonts.bold,
      color: colors.textColor,
      marginTop: 40,
      paddingBottom: 20
  },

  modalSubTitle: {
      fontFamily: fonts.semiBold,
      color: colors.lightGray,
      fontSize: 15,
  },

  containerButtonsModal: {
      marginTop: 60,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
      alignItems: 'center'
  },

  btnModalCancel: {
      borderWidth: 1,
      borderColor: colors.formLabelColor,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10
  },

  btnModalCancelText: {
      fontFamily: fonts.bold,
      fontSize: 13,
      color: colors.formLabelColor
  },

  btnModalPost: {
      backgroundColor: '#E40000',
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10
  },

  btnModalPostGreen: {
      backgroundColor: colors.mainGreen,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10
  },

  btnModalPostText: {
      fontFamily: fonts.bold,
      fontSize: 13,
      color: colors.white
  },
  
})


