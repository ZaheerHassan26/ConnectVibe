import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EDF4F6',
    },
    header: {
      backgroundColor: '#10445C',
      height: 80,
      borderBottomRightRadius: 26,
      borderBottomLeftRadius: 26,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'flex-end',
      paddingBottom: 20,
      flexDirection: 'row',
    },
    headerText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
    },
    imageContainer: {
      backgroundColor: 'white',
      width: 42,
      height: 42,
      marginHorizontal: 3,
      borderRadius: 30,
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'black',
    },
    chatContainer: {
      marginHorizontal: 10,
      marginTop: 20,
      flexDirection: 'row',
    },
    imgText: {
      color: 'green',
      fontSize: 17,
      alignSelf: 'center',
    },
    image: {
      width: 37,
      height: 36,
      alignSelf: 'center',
      borderRadius: 30,
    },
    textContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '70%',
      borderRadius: 30,
    },
    userName: {color: '#10445C', fontSize: 16},
    dateView: {justifyContent: 'flex-end', right: 10},
    date: {color: 'grey', fontSize: 12},
  });
  export default styles