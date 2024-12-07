import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import reset from "../../styles/reset";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        paddingBottom: 50,
        width: '100%'
    },

    containerHeader: {
        width: '100%',
        backgroundColor: colors.mainColor,
        paddingTop: reset.padTop,
    },

    headerAreaBottom: {
        marginTop: 25,
        width: '100%',
        height: 20,
        backgroundColor: colors.background,
        borderTopLeftRadius: 30
    },

    containerGuiaData: {
        width: '100%',
        paddingTop: reset.padTop,
        flexDirection: 'row',
        minHeight: 120,
        gap: 15,
        paddingBottom: 10,
        alignItems: 'center'
    },

    profileImageHeader: {
        width: 77,
        height: 77,
        borderRadius: 100,
        resizeMode: 'cover',
        backgroundColor: colors.brighterBlue
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
        justifyContent: 'center'
    },

    containerGuiaDataContent: {
        rowGap: 10
    },

    guiaNameTitle: {
        fontSize: 15,
        fontFamily: fonts.semiBold,
        color: colors.white
    },

    guiaCityText: {
        fontSize: 11,
        fontFamily: fonts.medium,
        color: colors.white
    },

    guiaCadastur: {
        fontSize: 10,
        fontFamily: fonts.medium,
        color: colors.lightPurple
    },

    containerGuiaStatistics: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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

    guiaChatBtn: {
        width: 120,
        height: 40,
        borderWidth: 1,
        borderColor: colors.lightBlue,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },

    guiaChatBtnText: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.white
    },

    containerMain: {
        paddingTop: reset.padTop,
        paddingHorizontal: reset.padH,
        width: '100%',
        rowGap: 32
    },

    containerSection: {
        width: '100%',
    },

    sectionTitle: {
        fontFamily: fonts.semiBold,
        fontSize: 15,
        color: colors.textColor,
        marginBottom: 14
    },

    sectionText: {
        fontFamily: fonts.medium,
        fontSize: 13,
        color: colors.mediumGray
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

    btnOpenComment: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 5
    },

    btnOpenCommentText: {
        fontFamily: fonts.medium,
        color: colors.brighterBlue,
        fontSize: 13
    },

    modalRating: {
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
        marginTop: 40
    },

    containerRatingStars: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    },

    ratingStarsText: {
        fontSize: 32,
        fontFamily: fonts.semiBold,
        color: colors.brighterBlue
    },

    inputSlider: {
        width: 250
    },

    textInputComment: {
        width: '100%',
        minHeight: 280,
        marginTop: 20,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: colors.lightPurple,
        borderStyle: 'dashed',
        padding: 20,
        fontFamily: fonts.medium,
        fontSize: 13
    },

    containerButtonsModal: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
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

    cardCommentDate: {
        position: 'absolute',
        right: 12,
        bottom: 10,
        fontFamily: fonts.medium,
        fontSize: 8,
        color: colors.lightGray
    },

    containerTaxas:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    cardTaxaLabel:{
        color: colors.mediumGray,
        fontSize: 12,
        fontFamily: fonts.bold
    },

    cardTaxa:{
        width: 175,
        minHeight: 50,
        backgroundColor: colors.cardColor,
        borderRadius: 7,
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10
    },

    cardTaxaText:{
        color: colors.lightGray,
        fontFamily: fonts.semiBold,   
    },


})