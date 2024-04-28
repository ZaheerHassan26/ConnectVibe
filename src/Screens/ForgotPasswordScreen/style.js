import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#EDF4F6',
    },
    loginView: {
      flex: 0.1,
      backgroundColor: '#EDF4F6',
      paddingTop: 60,
      paddingHorizontal: 10,
    },
    backTouchable: {
      flexDirection: 'row',
      gap: 11,
      alignItems: 'center',
    },
    forgetPasswordText: {
      color: '#10445C',
      fontSize: 18,
      fontWeight: '700',
    },
    EmailInputView: {
      flex: 1,
      backgroundColor: '#10445C',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 32,
      gap: 11,
      paddingHorizontal: 27,
    },
    enterEmailText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: '700',
      marginTop: 50,
      marginBottom: 20,
    },
    inputFocus: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderRadius: 5,
      borderColor: 'white',
      marginTop: 30,
      paddingLeft: 14,
      color: 'blue',
      height: 42,
      backgroundColor: '#3a6579',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.23,
      shadowRadius: 1,
      elevation: 1,
    },
    textInputStyle: {
      color: 'white',
      flex: 1,
      marginLeft: 10,
    },
    emailError: {color: 'yellow'},
    loginBtn: {
      width: '40%',
      backgroundColor: '#00a1e9',
      height: 52,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginVertical: 30,
    },
    loginTxt: {fontSize: 20, color: 'white', fontWeight: 'bold'},
    emailImgView: {justifyContent: 'center'},
  });
  export default styles