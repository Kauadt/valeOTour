import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import reset from "../../styles/reset";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        position: 'relative',
    },

    containerHeader: {
        width: '100%',
        height: 260,
        backgroundColor: colors.mainColor,
        paddingTop: reset.padTop,
    },

    containerSearch: {
        width: '100%',
        paddingTop: reset.padTop,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    containerInputSearch: {
        position: 'relative',
        width: '100%',
        height: 45,
        backgroundColor: colors.brighterBlue,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12
    },

    inputSearch: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 100,
        paddingLeft: 50,
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.lightBlue
    },

    headerAreaBottom: {
        width: '100%',
        height: 20,
        backgroundColor: colors.background,
        borderTopLeftRadius: 30,
        bottom: 0,
        position: 'absolute'
    },

    containerMain: {
        width: '100%',
        paddingTop: 10,
        gap: 1
    },

    btnShowChat:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'blue'
    },


    cardMessage: {
        width: '100%',
        height: 80,
        paddingHorizontal: reset.padH,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.mediumGray,
        justifyContent: 'space-between',
        position: 'relative'
    },

    userMessageIcon: {
        width: 55,
        height: 55,
        backgroundColor: colors.mainColor,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },

    userMessageIconImg:{
        width: '100%',
        height: '100%',
        borderRadius: 100
    },

    cardMessageContent: {
        width: '70%',
        gap: 5,
        paddingLeft: 2,
    },

    cardMessageUserName:{
        fontSize: 12,
        fontFamily: fonts.medium,
        color: colors.textColor
    },

    cardMessagePreview:{
        fontSize: 11,
        fontFamily: fonts.medium,
        color: colors.mediumGray,
        maxWidth: '100%',
    },

    cardMessageInfo:{
        alignItems: 'center',
        gap: 5,
        width: 35
    },

    cardMessageUnread: {
        width: 20,
        height: 20,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardMessageUnreadDate: {
        color: colors.mediumGray,
        fontFamily: fonts.medium,
        fontSize: 11
    },

    cardMessageUnreadText: {
        color: colors.white,
        fontFamily: fonts.medium,
        fontSize: 11
    }
})