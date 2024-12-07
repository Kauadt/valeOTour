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

    btnSettings: {
        paddingTop: 10
    },

    modalSettings: {
        width: 244,
        backgroundColor: '#040F3C',
        position: 'absolute',
        right: 24,
        top: 85,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        paddingHorizontal: 16, zIndex: 999
    },

    modalSettingsBtn: {
        width: '100%',
        paddingVertical: 17,
        flexDirection: 'row',
        gap: 10
    },

    modalSettingsBtnText: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fonts.medium
    },

    modalSettingsBtnTextWarning: {
        color: '#ff0000',
        fontSize: 12,
        fontFamily: fonts.medium
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
        height: 380,
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

    sectionCommentTitle: {
        fontFamily: fonts.semiBold,
        fontSize: 18,
        color: colors.textColor,
    },

    containerSectionContent: {
        width: '100%',
        minHeight: 60,
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: 7,
        elevation: 1,
        marginTop: 18,
        paddingVertical: 30,
        paddingHorizontal: 20,
        gap: 30,
    },

    userInfoTitle: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.textColor
    },

    userInfoText: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.lightGray,
        width: 290
    },

    containerCardScheduling: {
        width: '100%',
        paddingVertical: 18,
        gap: 10
    },

    cardScheduling: {
        width: '100%',
        height: 62,
        backgroundColor: colors.white,
        elevation: 1,
        borderRadius: 7,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: 16
    },

    cardSchedulingIcon: {
        width: 38,
        height: 38,
        backgroundColor: colors.lightBlue,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardSchedulingContent: {
        rowGap: 3
    },

    cardComment: {
        width: '100%',
        minHeight: 60,
        backgroundColor: colors.cardColor,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 20,
        gap: 14,
        marginBottom: 10
    },

    cardCommentImage: {
        width: 45,
        height: 45,
        borderRadius: 100,
        backgroundColor: colors.mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardCommentContent: {
        width: '84%',
        height: '100%',
    },

    cardCommentName: {
        fontSize: 15,
        fontFamily: fonts.semiBold,
        color: '#3A3839',
        marginBottom: 5
    },

    cardCommentText: {
        fontSize: 13,
        fontFamily: fonts.medium,
        color: '#5F5F5F',
        marginBottom: 5
    },

    cardCommentRatingArea: {
        marginTop: 6,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },

    cardCommentRatingText: {
        fontSize: 18,
        fontFamily: fonts.semiBold,
        color: colors.brighterBlue
    },

    cardCommentDate: {
        position: 'absolute',
        right: 12,
        bottom: 10,
        fontFamily: fonts.medium,
        fontSize: 8,
        color: colors.lightGray
    },

    containerCommentFilters: {
        width: '100%',
        marginTop: 15
    },

    containerFilters: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: reset.padH
    },

    btnFilter: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#D1E5E9',
        flexDirection: 'row',
        gap: 5
    },

    btnFilterText: {
        fontFamily: fonts.medium,
        fontSize: 13,
        color: colors.lightGray
    },

    btnFilterActive: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.mainGreen,
        borderColor: colors.background,
        flexDirection: 'row',
        gap: 5
    },

    btnFilterActiveText: {
        fontFamily: fonts.bold,
        fontSize: 13,
        color: colors.white
    },

    guiaLocationText: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: colors.white
    },

    containerGuiaStatistics: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        marginTop: 40
    },

    guiaStatisticsArea: {
        alignItems: 'center',
        rowGap: 5
    },

    guiaStatisticsText: {
        fontSize: 20,
        fontFamily: fonts.bold,
        color: colors.white
    },

    guiaStatisticsLabel: {
        fontFamily: fonts.medium,
        fontSize: 10,
        color: colors.lightBlue
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
    }


})