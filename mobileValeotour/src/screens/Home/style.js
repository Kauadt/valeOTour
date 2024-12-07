import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import reset from "../../styles/reset";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        paddingBottom: 50
    },

    containerHeader: {
        width: '100%',
        height: 352,
        backgroundColor: colors.mainColor,
        paddingTop: reset.padTop,
        paddingHorizontal: reset.padH,
        borderBottomLeftRadius: 30,
    },

    containerTopButtonsHeader: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    containerProfileButtonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    btnProfileHeader: {
        width: 32,
        height: 32,
        backgroundColor: colors.brighterBlue,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    profileImageHeader: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 100
    },

    containerMainText: {
        width: '100%',
        paddingTop: reset.padTop,
    },

    mainText: {
        fontFamily: fonts.bold,
        fontSize: 26,
        color: colors.white
    },

    containerGroupButtons: {
        width: '100%',
        paddingTop: reset.padTop,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    containerTourismTypeButtons: {
        alignItems: 'center',
        gap: 5,
    },

    btnTourismType: {
        width: 64,
        height: 64,
        backgroundColor: colors.brighterBlue,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    tourismTypeText: {
        fontFamily: fonts.medium,
        fontSize: 10,
        color: colors.white,
        fontWeight: '300'
    },

    containerMainContent: {
        width: '100%',
        paddingTop: reset.padTop,
    },

    titleMainContent: {
        fontFamily: fonts.semiBold,
        color: colors.textColor,
        fontSize: 18,
        paddingLeft: reset.padH,
        marginBottom: 15
    },

    btnShowMoreText: {
        color: colors.mediumGray,
        fontFamily: fonts.medium,
        fontSize: 10
    },

    containerGuiasHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: reset.padH
    },

    containerGuias: {
        width: '100%',
        marginBottom: 15
    },

    containerCardGuias: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: reset.padH,
        marginTop: 15,
        marginBottom: 25
    },

    cardGuias: {
        width: 145,
        height: 170,
        backgroundColor: colors.cardColor,
        borderRadius: 10,
        elevation: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },

    cardGuiaImg: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 100,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardGuiaTitle: {
        fontFamily: fonts.medium,
        fontSize: 13,
        color: colors.textColor
    },

    cardGuiaText: {
        color: colors.mediumGray,
        fontFamily: fonts.medium,
        fontSize: 10
    },

    containerCardGuiaBtn: {
        width: '100%',
        alignItems: 'flex-end'
    },

    cardGuiaBtn: {
        width: 25,
        height: 25,
        backgroundColor: colors.lightGreen,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardGuiaBtnIcon: {
        transform: [{ rotate: '-45deg' }]
    },

    containerCommentFilters: {
        width: '100%',
    },

    containerFilters: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: reset.padH
    },

    btnFilter: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#D1E5E9'
    },

    btnFilterText: {
        fontFamily: fonts.medium,
        fontSize: 13,
        color: colors.mediumGray
    },

    btnFilterActive: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.mainGreen,
        borderColor: colors.background
    },

    btnFilterActiveText: {
        fontFamily: fonts.bold,
        fontSize: 13,
        color: colors.white
    },

    containerCardPlaces: {
        width: '100%',
        paddingTop: reset.padTop,
        paddingHorizontal: reset.padH,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },

    cardPlaces: {
        width: '49%',
        rowGap: 5,
        marginTop: 10
    },

    cardPlacesImg: {
        width: '100%',
        height: 130,
        borderRadius: 7
    },

    cardPlacesBottom: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },

    cardPlacesText: {
        fontFamily: fonts.medium,
        color: colors.textColor,
        fontSize: 11,
        width: '70%',
        textAlign: 'left'
    },

    cardPlacesRating: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },

    cardPlacesRatingText: {
        fontFamily: fonts.medium,
        color: colors.brighterBlue,
        fontSize: 11
    },

    btnShowMorePlaces: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 999,
    },

    containerNotifications: {
        width: 330,
        height: 300,
        backgroundColor: colors.darkBlue,
        position: 'absolute',
        right: 24,
        top: 60,
        zIndex: 999,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        padding: 20,
        gap: 10
    },

    cardNotification: {
        width: '100%',
        minHeight: 60,
        backgroundColor: colors.mainColor,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingVertical: 13,
        gap: 15
    },

    cardNotificationIcon: {
        width: 38,
        height: 38,
        borderRadius: 100,
        backgroundColor: colors.mainGreen,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardNotificationIconVerify: {
        width: 38,
        height: 38,
        borderRadius: 100,
        backgroundColor: colors.lightBlue,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardNotificationContent: {
        width: 140,
        justifyContent: 'center',
        gap: 5,
    },

    cardNotificationText: {
        color: colors.white,
        fontSize: 10,
        fontFamily: fonts.medium,
    },

    cardNotificationDateText: {
        color: colors.lightPurple,
        fontSize: 10,
        fontFamily: fonts.medium,
    },

    cardNotificationBtn: {
        width: 60,
        height: 30,
        borderRadius: 6,
        backgroundColor: colors.lightBlue,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardNotificationBtnText: {
        color: colors.darkBlue,
        fontSize: 10,
        fontFamily: fonts.medium,
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

    inputUserPassword:{
        width: '100%',
        height: 55,
        backgroundColor: colors.background,
        borderRadius: 7,
        paddingHorizontal: 12,
        fontSize: 13,
        fontFamily: fonts.semiBold,
        paddingRight: 47
    },

    btnShowPassword:{
        position: 'absolute',
        right: 18,
        top: 15
    },

    modalGuiaVerificationText:{
        color: colors.brighterBlue,
        fontFamily: fonts.medium,
        fontSize: 16
    },

    cardCommentAdmin:{
        backgroundColor: colors.background,
        width: '100%',
        marginTop: 20,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 20
    },

    cardCommentAdminTitle:{
     fontSize: 13,
     fontFamily: fonts.semiBold,
     color: colors.mediumGray 
    },

    cardCommentAdminText:{
     fontSize: 13,
     fontFamily: fonts.medium,
     color: colors.lightGray,
     marginTop: 10
    },
})