import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EDF4F6',
    },
    header: {
      backgroundColor: '#10445C',
      height: 80,
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 10,
      borderBottomRightRadius: 26,
      borderBottomLeftRadius: 26,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    headerText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
    },
    ImgView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
    },
    profileImg: {
      margin: -0.7,
      height: '100%',
      width: '100%',
    },
    imageView: {
      height: 150,
      width: 150,
      borderRadius: 75,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 5,
      borderColor: '#10445C',
    },
    imgTxt: {
      color: '#10445C',
      fontSize: 40,
      fontWeight: '600',
    },
    camImg: {
      position: 'relative',
      left: 45,
      borderWidth: 1,
      borderColor: 'white',
      backgroundColor: '#10445C',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      bottom: 40,
      height: 40,
      width: 40,
      overflow: 'hidden',
    },
    input: {backgroundColor: 'transparent', marginVertical: 5},
    buttonCon: {
      alignSelf: 'flex-end',
      marginHorizontal: 20,
      width: 100,
      height: 54,
      backgroundColor: '#10445C',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      marginVertical: 20,
    },
    btnText: {color: 'white', fontSize: 20},
  });

  export default styles 