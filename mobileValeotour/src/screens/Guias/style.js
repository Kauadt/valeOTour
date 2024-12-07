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

    containerMain:{
        paddingHorizontal: reset.padH,
        paddingTop: reset.padTop,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        rowGap: 15,
        width: '100%'
    },

    cardGuia:{
        width: '48%',
        height: 205,
        backgroundColor: colors.cardColor,
        borderRadius: 10,
        elevation: 1,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    cardGuiaImg:{
        width: 72,
        height: 72,
        borderRadius: 100,
        backgroundColor: colors.background,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardGuiaContent:{
        width: '100%',
        alignItems: 'center',
        gap: 3,
    },

    cardGuiaTitle:{
        fontFamily: fonts.medium,
        color: colors.textColor,
        fontSize: 15
    },

    cardGuiaText:{
        fontFamily: fonts.medium,
        color: colors.mediumGray,
        fontSize: 11
    },

    cardGuiaBtn:{
        width: '100%',
        height: 25,
        backgroundColor: colors.background,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardGuiaBtnText:{
        color: colors.mediumGray,
        fontFamily: fonts.medium,
        fontSize: 10
    },

    modal: {
        width: '100%',
        height: 530,
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