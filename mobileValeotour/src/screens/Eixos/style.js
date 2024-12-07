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
        height: 250,
        backgroundColor: colors.mainColor,
        paddingTop: reset.padTop,
        paddingHorizontal: reset.padH,
        borderBottomLeftRadius: 30,
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
        width: '84%',
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

    btnFilterNav: {
        width: 45,
        height: 45,
        backgroundColor: colors.lightBlue,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnShowMoreText: {
        color: colors.mediumGray,
        fontFamily: fonts.medium,
        fontSize: 10
    },

    containerGuias: {
        flexDirection: 'row',
        gap: 24,
        paddingBottom: 50,
        paddingTop: 20
    },

    cardGuia: {
        alignItems: 'center'
    },

    cardGuiaImg: {
        width: 55,
        height: 55,
        borderRadius: 100,
        marginBottom: 5
    },

    cardGuiaTitle: {
        fontSize: 13,
        fontFamily: fonts.medium,
        color: colors.textColor
    },

    cardGuiaText: {
        fontSize: 10,
        fontFamily: fonts.medium,
        color: colors.mediumGray
    },


    containerMainContent: {
        width: '100%',
        paddingHorizontal: reset.padH,
        paddingTop: reset.padTop,
    },

    mainContentTitle: {
        fontSize: 18,
        fontFamily: fonts.semiBold,
        color: colors.textColor
    },

    mainContentSubtitle: {
        color: colors.mediumGray,
        fontSize: 13,
        fontFamily: fonts.medium
    },

    mainCard: {
        marginTop: 25,
        width: '100%',
        height: 400,
        backgroundColor: '#135357',
        borderRadius: 15,
        position: 'relative'
    },

    mainCardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },

    mainCardContentArea: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingTop: 15,
        justifyContent: 'space-between',
        backgroundColor: '#00000033'
    },

    mainCardRating: {
        width: 100,
        height: 42,
        backgroundColor: colors.white,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 7
    },

    mainCardRatingText: {
        fontFamily: fonts.bold,
        fontSize: 26,
        color: colors.brighterBlue
    },

    mainCardContentBottom: {
        width: '100%',
        rowGap: 5,
        paddingBottom: 30
    },

    mainCardPlaceName: {
        fontSize: 18,
        fontFamily: fonts.semiBold,
        color: colors.white,
        width: '70%'
    },

    mainCardPlaceLocation: {
        fontSize: 11,
        fontFamily: fonts.medium,
        color: colors.white
    },

    mainCardBottomArea: {
        width: '100%',
        height: 130,
        gap: 10,
        paddingTop: 18
    },

    mainCardName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff'
    },

    mainCardRankArea: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },

    mainCardRankText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff'
    },

    mainCardButton: {
        width: 50,
        height: 50,
        backgroundColor: '#399CA2',
        position: 'absolute',
        bottom: 5,
        right: 0,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerSuggestion: {
        width: '100%',
        paddingTop: reset.padTop
    },

    suggestionTitle: {
        fontSize: 18,
        fontFamily: fonts.semiBold,
        color: colors.textColor
    },

    containerCardSuggestion: {
        width: '100%',
        marginTop: 20,
        gap: 15
    },

    cardSuggestion: {
        width: '100%',
        minHeight: 108,
        padding: 7,
        backgroundColor: colors.white,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10
    },

    cardSuggestionImage: {
        width: 105,
        height: '100%',
        backgroundColor: '#399CA3',
        borderRadius: 5
    },

    cardSuggestionInfo: {
        width: '62%',
        height: '100%',
        paddingVertical: 6,
        rowGap: 3
    },

    cardSuggestionName: {
        fontSize: 11,
        fontFamily: fonts.medium,
        color: colors.textColor,
        width: '70%'
    },

    cardSuggestionLocation: {
        fontSize: 10,
        fontFamily: fonts.medium,
        color: colors.mediumGray
    },

    cardSuggestionBottom: {
        width: '100%',
        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },

    cardSuggestionRating: {
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center'
    },

    cardSuggestionRatingText: {
        fontSize: 11,
        color: colors.brighterBlue,
        fontFamily: fonts.medium
    },

    cardSuggestionStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },

    cardSuggestionStatusText: {
        fontSize: 10,
        fontFamily: fonts.medium,
        color: colors.mainGreen
    },

    btnShowMorePlaces: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 999,
    },

    modalEixo: {
        position: 'absolute',
        width: 280,
        minHeight: 120,
        backgroundColor: colors.darkBlue,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 16,
        top: 88,
        right: 24,
        zIndex: 999
    },

    modalEixoText: {
        color: colors.lightPurple,
        fontFamily: fonts.medium,
        fontSize: 12
    },

    modalEixoTextBold: {
        color: colors.formLabelColor,
        fontFamily: fonts.bold
    },

    modal: {
        width: '100%',
        height: 650,
        backgroundColor: colors.cardColor,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 30,
        elevation: 100,
        paddingTop: reset.padTop,
        paddingHorizontal: 24,
        paddingBottom: 20
    },

    headerModalFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    modalFilterLogo: {
        width: 40,
        height: 40,
        backgroundColor: colors.lightBlue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },

    headerModalFilterTitle:{
        fontSize: 26,
        fontFamily: fonts.bold,
        color: colors.textColor,
        marginTop: 25
    },

    filterLabel:{
        fontSize: 13,
        fontFamily: fonts.semiBold,
        color: colors.mediumGray,
        marginTop: 30,
        marginBottom: 13
    },

    containerFilters: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 10,
    },

    btnFilter: {
        paddingVertical: 6,
        paddingHorizontal: 13,
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
        paddingVertical: 6,
        paddingHorizontal: 13,
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

    containerFilterStars: {
        flexDirection: 'row',
        gap: 10,
    },

    btnFilterStars: {
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

    btnFilterActiveStars: {
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

    containerFilterControls:{
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 70
    },

    btnFilterClear:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderWidth: 1.2,
        borderColor: colors.formLabelColor,
        borderRadius: 15
    },

    btnFilterClearText:{
        fontSize: 13,
        fontFamily: fonts.bold,
        color: colors.formLabelColor
    },

    btnFilterApply:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 41,
        paddingVertical: 16,
        backgroundColor: colors.mainGreen,
        borderRadius: 15
    },

    btnFilterClearAplly:{
        fontSize: 13,
        fontFamily: fonts.bold,
        color: colors.white
    },

    modalSuccess:{
        width: '90%',
        height: 280,
        backgroundColor: colors.cardColor,
        elevation: 100,
        paddingTop: reset.padTop,
        paddingHorizontal: 24,
        paddingBottom: 20,
        marginHorizontal: 24,
        borderRadius: 10
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

    containerButtonsModal: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        alignItems: 'center'
    },

})