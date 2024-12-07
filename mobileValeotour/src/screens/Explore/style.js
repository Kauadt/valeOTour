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

    btnFilterHeader: {
        width: 45,
        height: 45,
        backgroundColor: colors.lightBlue,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerAreaBottom: {
        marginTop: 55,
        width: '100%',
        height: 20,
        backgroundColor: colors.background,
        borderTopLeftRadius: 30
    },

    containerMain: {
        paddingTop: reset.padTop,
        paddingHorizontal: reset.padH,
        width: '100%',
        rowGap: 32
    },

    containerSection: {
        width: '100%',
        paddingTop: 20
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

    containerRecentlyAdded: {
        width: '100%',
        height: 200,
        backgroundColor: 'blue'
    },

    containerPlaces: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: reset.padH,
        flexDirection: 'row',
        gap: 15
    },

    cardRecentlyAdded: {
        width: 170,
        height: 210,
        borderRadius: 10,
        backgroundColor: colors.white,
        elevation: 1.5
    },

    cardRecentlyAddedImg: {
        width: '100%',
        height: '60%',
        objectFit: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    cardRecentlyAddedInfo: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        gap: 4
    },

    cardRecentlyAddedTitle: {
        fontSize: 11,
        color: colors.textColor,
        fontFamily: fonts.medium
    },

    cardLocationText: {
        fontSize: 10,
        color: colors.mediumGray,
        fontFamily: fonts.medium,
        marginBottom: 5
    },

    containerRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },

    ratingText: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.brighterBlue
    },

    cardPopularPlaces: {
        width: 290,
        height: 210,
        borderRadius: 15
    },

    cardPopularPlacesImg: {
        width: '100%',
        height: '75%',
        objectFit: 'cover',
        borderRadius: 15
    },

    cardPopularPlacesTopInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 9
    },

    cardPopularPlacesTitle: {
        fontFamily: fonts.semiBold,
        fontSize: 13,
        color: colors.textColor,
        width: 260,
        // backgroundColor: 'red'
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

    
    containerCardSuggestion: {
        width: '100%',
        marginTop: 20,
        gap: 15,
        paddingHorizontal: reset.padH
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

    cardSuggestionName:{
        fontSize: 11,
        fontFamily: fonts.medium,
        color: colors.textColor,
        width: '70%'
    },

    cardSuggestionLocation:{
        fontSize: 10,
        fontFamily: fonts.medium,
        color: colors.mediumGray
    },

    cardSuggestionBottom:{
        width: '100%',
        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },

    cardSuggestionRating:{
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center'
    },

    cardSuggestionRatingText:{
        fontSize: 11,
        color: colors.brighterBlue,
        fontFamily: fonts.medium
    },

    cardSuggestionStatus:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },

    cardSuggestionStatusText:{
        fontSize: 10,
        fontFamily: fonts.medium,
        color: colors.mainGreen
    },

    btnShowMore:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 999,
        borderRadius: 10,
    },

    containerGuias:{
        flexDirection: 'row',
        gap: 24,
        paddingBottom: 50,
        paddingTop: 20,
        paddingHorizontal: reset.padH
    },

    cardGuia:{
        alignItems: 'center'
    },

    cardGuiaImg:{
        width: 55, 
        height: 55,
        borderRadius: 100,
        marginBottom: 5
    },

    cardGuiaTitle:{
        fontSize: 13,
        fontFamily: fonts.medium,
        color: colors.textColor
    },

    cardGuiaText:{
        fontSize: 10,
        fontFamily: fonts.medium,
        color: colors.mediumGray
    },

    btnShowMoreText: {
        color: colors.mediumGray,
        fontFamily: fonts.medium,
        fontSize: 10
    },

    mainContentTitle: {
        fontSize: 18,
        fontFamily: fonts.semiBold,
        color: colors.textColor
    },

})