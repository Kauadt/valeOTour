import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import reset from "../../styles/reset";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },

    map: {
        height: '100%',
    },

    btnFilterNav: {
        width: 45,
        height: 45,
        backgroundColor: colors.mainColor,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerSearch: {
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 18,
        top: 50,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },


    containerDistance: {
        width: 110,
        position: 'absolute',
        top: 120,
        right: 20,
        backgroundColor: '#fff',
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },

    distance: {
        color: colors.brighterBlue,
        fontFamily: fonts.bold,
        fontSize: 24,
        fontSize: 16
    },


    modalPlaces: { 
        width: '100%', 
        height: 420, 
        backgroundColor: colors.cardColor, 
        position: 'absolute', 
        bottom: 0,
        borderTopLeftRadius: 30,
        elevation: 100,
        paddingTop: reset.padTop
    },

    placeNameTitle:{
        fontSize: 26,
        fontFamily: fonts.bold,
        color: colors.textColor
    },

    placeNameRatingText:{
        fontFamily: fonts.semiBold,
        fontSize: 18,
        color: colors.brighterBlue
    },

    placeDescriptionText:{
        fontFamily: fonts.medium,
        fontSize: 13,
        color: colors.mediumGray,
        marginTop: 8,
        marginHorizontal: reset.padH
    },

    infoSectionTitle: {
        fontSize: 15,
        fontFamily: fonts.semiBold,
        color: colors.textColor,
        paddingLeft: reset.padH,
        paddingTop: reset.padTop
    },

    placesImages: {
        width: 150,
        height: 170,
        borderRadius: 10
    },

    containerImages: {
        flexDirection: 'row',
        paddingTop: 10,
        gap: 10,
        paddingHorizontal: reset.padH
    },

    btnStopRoute:{
        position: 'absolute',
        bottom: 20,
        left: 24,
        paddingHorizontal: 25,
        paddingVertical: 9,
        backgroundColor: colors.darkBlue,
        borderRadius: 12,
        width: 140,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnStopRouteText:{
        fontSize: 11,
        fontFamily: fonts.bold,
        color: colors.white
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

});

