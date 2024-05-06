import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {logout as logoutAction} from '../../Screens/LoginScreen/redux/actions';
import { connect } from 'react-redux';

const Logout = ({
  isLogOutModelVisibale,
  setIsLogOutModalVisible,
  logoutAction,
}) => {
  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
      isVisible={isLogOutModelVisibale}
      style={styles.addModalContainer}
      hasBackdrop={true}
      onBackdropPress={() => setIsLogOutModalVisible(false)}>
      <View style={styles.ModalContainer}>
        <View style={styles.modalTextContainer}>
          <Text style={styles.titleText}>Logout</Text>
          <Text style={styles.descriptionText}>
            Are you sure to want to Logout
          </Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => setIsLogOutModalVisible(false)}
            style={styles.cancelView}>
            <Text style={styles.cancelText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteView}
            onPress={() => logoutAction()}>
            <Text style={styles.DeleteText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => ({
  logoutAction: () => dispatch(logoutAction()),
});

export default connect(null, mapDispatchToProps)(Logout);
const styles = StyleSheet.create({
  addModalContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: '100%',
    paddingHorizontal: 16,
    paddingLeft: 15,
    paddingTop: 30,
    paddingBottom: 20,
  },
  modalTextContainer: {
    paddingTop: 32,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 16,
  },
  titleText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#414141',
    textAlign: 'center',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#414141',
    textAlign: 'center',
  },
  btnView: {
    paddingBottom: 14,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    marginTop: 20,
  },
  cancelView: {
    paddingHorizontal: 46,
    paddingVertical: 19,
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 137,
    height: 57,
  },
  cancelText: {
    fontSize: 14,
    color: '#252525',
    fontWeight: '700',
  },
  deleteView: {
    paddingHorizontal: 53,
    paddingVertical: 19,
    backgroundColor: '#BC5555',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 137,
    height: 57,
  },
  DeleteText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
