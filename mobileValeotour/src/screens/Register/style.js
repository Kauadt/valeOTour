import { StyleSheet } from 'react-native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import reset from '../../styles/reset';

export const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
    },

    containerHeader:{
      width: '100%',
      height: 230,
      backgroundColor: colors.mainColor,
      paddingTop: reset.padTop,
      paddingHorizontal: reset.padH,
      borderBottomLeftRadius: 30
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
      paddingTop: 80,
      paddingHorizontal: reset.padH,
      width: '100%',
      gap: 20
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
      paddingLeft: 20,
      paddingRight: 70,
      fontFamily: fonts.semiBold,
    },

    btnLogin:{
      marginTop: 50,
      width: '80%',
      height: 58,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.darkBlue
    },

    btnLoginText:{
      fontSize: 14,
      fontFamily: fonts.bold,
      color: colors.white
    },
})


