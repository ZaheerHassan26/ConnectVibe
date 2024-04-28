import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#EDF4F6',
    },
    newRegistrationView: {
      flex: 0.1,
      backgroundColor: '#EDF4F6',
      flexDirection:'row',
      paddingTop: 60,
      paddingHorizontal: 27,
      paddingBottom: 45,
    },
    backTouchable: {
      flexDirection: 'row',
      gap: 11,
      alignItems: 'center',
    },
    newRegistrationText: {
      color: '#10445C',
      fontSize: 18,
      left:6,
      fontWeight: '700',
    },
    registrationInputView: {
      flex: 1,
      backgroundColor: '#10445C',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 32,
      gap: 11,
      paddingHorizontal: 27,
    },
    registrationTextView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 10,
    },
    registrationText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: '400',
    },
    serviseProviderText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: '700',
      marginLeft: 5,
    },
    entryInformationText: {
      color: '#000',
      fontSize: 14,
      fontWeight: '300',
    },
    pictureView: {
      marginTop: 30,
      flexDirection: 'row',
      marginBottom: 30,
      alignItems: 'center',
      gap: 27,
    },
    pictureText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '300',
      textAlign: 'center',
      width: 87,
    },
    userPictureCircleWithCamera: {
      width: 103,
      height: 103,
    },
    userPicture: {
      width: 75,
      height: 75,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputStyle: {
      borderWidth: 1.5,
      borderRadius: 5,
      borderColor: 'grey',
      marginTop: 3,
      paddingLeft: 14,
      height: 42,
      backgroundColor: '#3a6579',
    },
    byClickText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '400',
      marginTop: 15,
    },
    termsAndConditionText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '700',
      marginTop: 2,
      textDecorationLine: 'underline',
    },
  });

  export default styles