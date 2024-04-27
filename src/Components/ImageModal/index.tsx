import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {useImages} from '../../utils/Images';
import {CamerProps} from '../../utils/function';
import ImageCropPicker from 'react-native-image-crop-picker';

const CameraModal: React.FC<CamerProps> = ({
  pictureModalVisible,
  setPictureModalVisible,
  setProfileImage,
}) => {
  const {images} = useImages();

  const openCamara = () => {
    ImageCropPicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        setPictureModalVisible(false);
        setProfileImage(image);
      });
  };

  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPictureModalVisible(false);
      setProfileImage(image);
    });
  };

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      isVisible={pictureModalVisible}
      hasBackdrop={true}
      backdropOpacity={0.4}
      style={styles.modalStyle}
      onRequestClose={() => {
        setPictureModalVisible(false);
      }}
      onBackdropPress={() => setPictureModalVisible(false)}>
      <View style={styles.pictureModalView}>
        <TouchableOpacity
          style={styles.iconTouchable}
          onPress={openImagePicker}>
          <View style={styles.iconView}>
            <Image style={styles.attachemtnIcon} source={images.attachment} />
          </View>
          <Text style={styles.gelleryAndCameraTxt}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconTouchable} onPress={openCamara}>
          <View style={styles.iconView}>
            <Image style={styles.cameraIcon} source={images.camera} />
          </View>
          <Text style={styles.gelleryAndCameraTxt}>Camera</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CameraModal;

const styles = StyleSheet.create({
  modalStyle: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end',
  },
  pictureModalView: {
    backgroundColor: '#EDF4F6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 14,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '30%',
    width: '100%',
    marginTop: 30,
    paddingBottom: 74,
  },
  iconView: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 20,
  },
  iconTouchable: {
    alignItems: 'center',
  },
  attachemtnIcon: {
    width: 20,
    height: 20,
  },
  cameraIcon: {
    width: 24,
    height: 24,
  },
  gelleryAndCameraTxt: {
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
  },
});
