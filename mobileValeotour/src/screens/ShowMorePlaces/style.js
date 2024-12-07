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

    headerPlaceImg: {
        width: '100%',
        height: '100%'
    },

    containerHeader: {
        width: '100%',
        height: 350,
        position: 'relative'
    },

    containerNavHeader: {
        position: 'absolute',
        paddingHorizontal: reset.padH,
        paddingTop: reset.padTop
    },

    headerAreaBottom: {
        width: '100%',
        height: 20,
        backgroundColor: colors.background,
        borderTopLeftRadius: 20,
        position: 'absolute',
        bottom: 0,
        right: 0
    },

    btnShowRoute: {
        width: 64,
        height: 64,
        backgroundColor: colors.brighterBlue,
        position: 'absolute',
        bottom: -10,
        right: 24,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerMain: {
        width: '100%',
        paddingHorizontal: reset.padH,
        paddingTop: reset.padTop
    },

    placeNameTitle: {
        fontSize: 24,
        fontFamily: fonts.bold,
        color: colors.textColor,
        lineHeight: 36
    },

    placeRatingStarText: {
        fontFamily: fonts.semiBold,
        fontSize: 18,
        color: colors.brighterBlue
    },

    placeTagsTitle: {
        fontFamily: fonts.semiBold,
        color: colors.lightGray,
        fontSize: 15,
        marginTop: 35
    },

    containerTagsPlaces: {
        flexDirection: 'row',
        gap: 10,
        paddingTop: 10
    },

    placesTags: {
        minWidth: 50,
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 100,
        borderColor: colors.lightBlue,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 3

    },

    placesTagsText: {
        fontSize: 13,
        fontFamily: fonts.medium,
        alignItems: 'center',
        color: colors.lightGray,
    },

    containerFiltersTabs: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 24,
        paddingTop: 70,
        justifyContent: 'flex-start',
        width: '100%',
        borderBottomWidth: 1,
        paddingBottom: 7,
        borderColor: colors.lightGray
    },

    btnFilterTabs: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#D1E5E9'
    },

    btnFilterTabsText: {
        fontFamily: fonts.medium,
        fontSize: 13,
        color: colors.textColor
    },

    btnFilterTabsActiveText: {
        fontFamily: fonts.bold,
        fontSize: 13,
        color: colors.mainGreen
    },

    containerInfos: {
        width: '100%',
        paddingVertical: reset.padTop
    },

    placeDescriptionText: {
        width: '100%',
        paddingHorizontal: reset.padH,
        color: colors.mediumGray,
        fontFamily: fonts.medium,
        fontSize: 13
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

    containerDetails: {
        width: '100%',
        backgroundColor: colors.cardColor,
        paddingHorizontal: 16,
        paddingVertical: 28,
        borderRadius: 7,
        gap: 16,
    },

    infoPlaceText: {
        color: colors.textColor,
        fontSize: 13,
        fontFamily: fonts.medium,
        width: '95%'
    },

    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 16,
    },

    detailsRowFunc: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },

    detailsArea: {
        flexDirection: 'row',
        gap: 40,
    },

    detailsAreaText: {
        fontFamily: fonts.medium,
        color: colors.lightGray,
        fontSize: 13,
        minWidth: 100
    },

    btnOpenComment: {
        flexDirection: 'row',
        gap: 10,
        marginLeft: reset.padH
    },

    btnOpenCommentText: {
        fontFamily: fonts.medium,
        color: colors.brighterBlue,
        fontSize: 13
    },

    containerFilters: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: reset.padH,
        marginTop: 20
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

    containerIconModal:{
        width: 40,
        height: 40,
        backgroundColor: colors.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },

    titleModal:{
        fontSize: 26,
        fontFamily: fonts.bold,
        color: colors.textColor,
        marginTop: 40
    },

    containerRatingStars:{
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    },

    ratingStarsText:{
        fontSize: 32,
        fontFamily: fonts.semiBold,
        color: colors.brighterBlue
    },

    inputSlider:{
        width: 250
    },

    textInputComment:{
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

    containerButtonsModal:{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    btnModalCancel:{
        borderWidth: 1,
        borderColor: colors.formLabelColor,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10
    },

    btnModalCancelText:{
        fontFamily: fonts.bold,
        fontSize: 13,
        color: colors.formLabelColor
    },

    btnModalPost:{
        backgroundColor: colors.mainGreen,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10
    },

    btnModalPostText:{
        fontFamily: fonts.bold,
        fontSize: 13,
        color: colors.white
    },

    cardGuia:{
        width: '100%',
        height: 70,
        backgroundColor: colors.white,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1,
        position: 'relative'
    },

    cardGuiaImg:{
        width: 50,
        height: 50,
        borderRadius: 100,
        marginLeft: 15,
        backgroundColor: colors.background,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardGuiaContent:{
        paddingLeft: 15,
        rowGap: 3
    },

    cardGuiaTitle:{
        fontSize: 15,
        color: colors.textColor,
        fontFamily: fonts.semiBold
    },

    cardGuiaText:{
        color: colors.mediumGray,
        fontSize: 11,
        fontFamily: fonts.medium
    },

    cardGuiaBtn:{
        position: 'absolute',
        zIndex: 999,
        width: '100%',
        height: '100%'
    },

    cardCommentDate: {
        position: 'absolute',
        right: 12,
        bottom: 10,
        fontFamily: fonts.medium,
        fontSize: 8,
        color: colors.lightGray
    }


})