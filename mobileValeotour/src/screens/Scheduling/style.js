import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import reset from "../../styles/reset";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
    },

    containerHeader: {
        width: '100%',
        backgroundColor: colors.mainColor,
        paddingTop: reset.padTop,
        top: 0,
        height: 200,

    },

    headerAreaBottom: {
        backgroundColor: colors.background,
        width: '100%',
        height: 20,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 60
    },

    headerTop: {
        paddingTop: 10,
        paddingBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: reset.padH,
    },

    containerMain: {
        width: '100%',
        paddingBottom: 12,
        paddingHorizontal: reset.padH
    },

    containerInputBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50
    },

    containerInput: {
        width: '48%',
        rowGap: 5
    },

    inputLabel: {
        fontFamily: fonts.semiBold,
        fontSize: 15,
        color: colors.textColor
    },

    inputDateAndTime: {
        width: '100%',
        height: 55,
        backgroundColor: colors.cardColor,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        gap: 10,
        borderRadius: 7,
        elevation: 2
    },

    containerIconInputDateTime: {
        width: 33,
        height: 33,
        borderRadius: 14,
        backgroundColor: colors.lightBlue,
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputDateTimeText: {
        fontFamily: fonts.semiBold,
        fontSize: 13,
        color: colors.textColor
    },

    inputText: {
        backgroundColor: colors.cardColor,
        height: 40,
        elevation: 1,
        borderRadius: 7,
        paddingLeft: 10,
        fontFamily: fonts.semiBold,
        fontSize: 13,
    },

    containerPoint: {
        width: '100%',
        paddingHorizontal: reset.padH,
        paddingTop: 40,
        gap: 5
    },

    cardPoint: {
        width: '100%',
        minHeight: 58,
        backgroundColor: colors.cardColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 13,
        elevation: 2,
        borderRadius: 10,
        paddingVertical: 15
        
    },

    cardPointText: {
        fontFamily: fonts.medium,
        fontSize: 11,
        color: colors.mediumGray,
        maxWidth: '75%',
        lineHeight: 20,
    },

    btnChoosePoint: {
        padding: 7,
        borderWidth: 1.5,
        borderColor: colors.formLabelColor,
        borderRadius: 8
    },
    btnChoosePointText: {
        fontFamily: fonts.bold,
        fontSize: 13,
        color: colors.formLabelColor
    },

    containerScheduling: {
        width: '100%',
        height: 132,
        backgroundColor: colors.cardColor,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: reset.padH,
        paddingVertical: 20
        
    },

    containerSchedulingTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10
    },

    containerSchedulingTopText:{
        fontFamily: fonts.semiBold,
        fontSize: 15,
        color: colors.mediumGray
    },

    btnScheduling: {
        width: '100%',
        height: 50,
        backgroundColor: colors.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },

    btnSchedulingText: {
        fontFamily: fonts.bold,
        fontSize: 12,
        color: colors.white
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

    map:{
        width: '100%',
        minHeight: 280,
        marginTop: 20,
        borderRadius: 15,
    },

    addressText:{
        fontFamily: fonts.medium,
        fontSize: 10,
        color: colors.mediumGray,
        marginTop: 10
    },

    containerButtonsModal:{
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
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
        backgroundColor: colors.white,
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
})