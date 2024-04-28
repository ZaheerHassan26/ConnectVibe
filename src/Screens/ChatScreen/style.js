import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF4F6',
  },
  header: {
    backgroundColor: '#10445C',
    height: 80,
    gap: 10,
    borderBottomRightRadius: 26,
    borderBottomLeftRadius: 26,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    paddingBottom: 20,
    flexDirection: 'row',
  },
  imagediv: {
    flexDirection: 'row',
    gap: 7,
    top: 5,
    justifyContent: 'center',
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
  chatMainHeader: {
    marginHorizontal: 24,
  },
  inputInnerContainer: {
    backgroundColor: '#CBDFE8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 26,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  leftInputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 14,
    minHeight: 50,
    marginRight: 10,
    flexBasis: '60%',
  },
  iconContainer: {
    flexDirection: 'row',
    flexBasis: '20%',
    justifyContent: 'space-between',
  },
  sendbtn: {
    backgroundColor: '#CBDFE8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
  },
});
export default styles