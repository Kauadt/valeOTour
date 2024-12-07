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

    headerChat: {
        width: '100%',
        backgroundColor: colors.mainColor,
        paddingTop: reset.padTop,
        position: 'absolute',
        top: 0,
        zIndex: 100,
        height: 150,

    },

    headerChatContent: {
        paddingTop: 10,
        paddingBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerChatLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    headerChatUserIcon: {
        marginLeft: 5,
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.mainGreen
    },

    headerChatUserIconImg: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    },

    headerChatNameText: {
        fontFamily: fonts.medium,
        fontSize: 16,
        color: colors.background,
        paddingLeft: 5
    },

    containerMain: {
        width: '100%',
        height: '100%',
        paddingBottom: 12,
    },

    //

    innerContainer: {
        width: '100%',
        height: '100%'
    },

    messagesArea: {
        marginTop: 140,
        paddingHorizontal: 16,
        flex: 1,
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingTop: 50
    },

    containerReceivedMessage: {
        rowGap: 7,
        marginBottom: 12,
        alignItems: 'flex-start',
    },

    messageReceivedArea: {
        maxWidth: '78%',
        minHeight: 10,
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        position: 'relative'
    },

    messageReceived: {
        maxWidth: '100%',
        fontSize: 12,
        color: colors.mediumGray,
        fontFamily: fonts.medium,
        textAlign: 'left',
        paddingBottom: 14
    },

    messageReceivedHour: {
        fontSize: 8,
        color: colors.lightGray,
        fontFamily: fonts.semiBold,
        position: 'absolute',
        bottom: 2,
        right: 10
    },

    headerAreaBottom:{
        backgroundColor: colors.background,
        width: '100%',  
        height: 20,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 60 
    },

    // Sent Messages

    containerSentMessage: {
        rowGap: 7,
        marginBottom: 12,
        alignItems: 'flex-end',
    },
    messageSentArea: {
        maxWidth: '78%',
        minHeight: 10,
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.lightBlue,
        borderTopLeftRadius: 7,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        position: 'relative'
    },

    messageSent: {
        maxWidth: '100%',
        fontSize: 12,
        color: colors.darkBlue,
        fontFamily: fonts.medium,
        textAlign: 'left',
        paddingBottom: 19
    },

    messageSentHour: {
        fontSize: 8,
        color: colors.lightPurple,
        fontFamily: fonts.semiBold,
        position: 'absolute',
        bottom: 5,
        right: 10
    },

    scheduleText: {
        minWidth: '100%',
        padding: 10,
        backgroundColor: colors.brighterBlue,
        marginBottom: 10,
        fontSize: 12,
        color: colors.white,
        fontFamily: fonts.medium,
        borderTopLeftRadius: 7,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
    },

    btnShowMoreSchedule: {
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    btnShowMoreText: {
        fontSize: 12,
        color: '#8B90BE',
        fontFamily: fonts.medium,
    },

    //

    containerInputChat: {
        width: '100%',
        paddingHorizontal: reset.padH,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    inputMessage: {
        width: '85%',
        height: 47,
        borderRadius: 100,
        backgroundColor: colors.white,
        paddingLeft: 20
    },

    btnSendMessages: {
        width: 47,
        height: 47,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.mainColor,
        borderRadius: 20
    },


    messageSentScheduleArea:{
        width: 180,
        height: 50,
        marginBottom: 10,
        backgroundColor: '#C5D0E5',
        borderTopLeftRadius: 7,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },

    messageSentScheduleText:{
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.darkBlue
    },

    messageSentScheduleShowMore:{
        fontFamily: fonts.medium,
        fontSize: 9,
        color: colors.lightPurple,
        alignSelf: 'center'
    },

    messageReceivedScheduleArea:{
        width: 180,
        height: 50,
        marginBottom: 10,
        backgroundColor: '#F2F5FB',
        borderTopLeftRadius: 7,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },

    messageReceivedScheduleText:{
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.mediumGray
    },

    messageSentScheduleShowMore:{
        fontFamily: fonts.medium,
        fontSize: 9,
        color: colors.lightPurple,
        alignSelf: 'center'
    },

    messageReceivedScheduleShowMore:{
        fontFamily: fonts.medium,
        fontSize: 9,
        color: colors.lightGray,
        alignSelf: 'center'
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

    modalSubTitle:{
        fontFamily: fonts.semiBold,
        color: colors.lightGray,
        fontSize: 15,
        paddingTop: 8,
        paddingBottom: 30
    },

    modalRow:{
        flexDirection: 'row',
        paddingTop: 28,
        alignItems: 'center',
        gap: 20,
        paddingRight: 30
    },

    modalLabel:{
        fontSize: 15,
        color: colors.mediumGray,
        fontFamily: fonts.semiBold
    },

    modalText:{
        fontSize: 13,
        color: colors.lightGray,
        fontFamily: fonts.medium
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

})