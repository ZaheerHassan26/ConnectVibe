import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import * as yup from 'yup';
import {TextInput} from 'react-native-paper';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {emailRegex} from '../../Utils/function';
import styles from './style';
import CameraModal from '../../Components/ImageModal';
import {updateProfile as updateProfileAction} from './redux/actions';
import {useImages} from '../../Utils/Images';
import Button from '../../Components/Button';

const schema = yup.object({
  name: yup.string().trim().required(),
  phone: yup
    .string()
    .matches(/^(?:\D*\d){12}\D*$/, 'Invalid phone number')
    .required()
    .label('Phone Number'),
  email: yup
    .string()
    .matches(emailRegex, 'Enter a valid email')
    .required()
    .label('Email'),
  password: yup.string().required('Password is required'),
});

const EditProfile = ({
  updateProfileAction,
  requesting,
  navigation,
  userDeatil,
  profileData,
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [active, setActive] = useState(false);
  const {images} = useImages();

  const isFocused = useIsFocused();

  const image = {
    uri: null,
  };

  useLayoutEffect(() => {
    setValue('name', userDeatil?.name);
    setValue('email', userDeatil?.user_email);
    setValue('phone', userDeatil?.phone);
  }, [isFocused]);

  const updatePrifileButton = data => {
    if (!active) {
      const payload = new FormData();
      const city = CityData.find(item => item.label === data.city);
      payload.append('id', profileData?.id);
      if (profileImage) {
        payload.append('profile_image', {
          name: profileImage.path + 'new image.jpeg',
          type: profileImage.mime,
          uri: profileImage.path,
        });
      }
      if (data.email.trim() != profileData?.user_email) {
        payload.append('email', data.email);
      }

      if (data.mobileNo && data.mobileNo != profileData?.phone) {
        data.mobileNo = '+' + countryCode.split('0')[2] + data.mobileNo.trim();

        payload.append('phone', data.mobileNo);
      }
      if (data.password) {
        payload.append('new_password', data.password);
      }
      payload?._parts.length > 1 ? updateProfileAction(payload, callBack) : '';
    } else {
      Toast.show('Please select the country and city');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <ScrollView>
        <View style={styles.ImgView}>
          {image.uri ? (
            <View style={styles.imageView}>
              <Image
                source={
                  profileImage ? {uri: profileImage?.path} : images.profile
                }
                style={styles.profileImg}
              />
            </View>
          ) : (
            <View style={styles.imageView}>
              <Text style={styles.imgTxt}>N/A</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.camImg}
            onPress={() => setShowImageUploadModal(true)}>
            <Entypo size={25} color={'white'} name={'camera'} />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="username"
                value={value}
                onChangeText={onChange}
                placeholder={'Admintest'}
                placeholderTextColor={'grey'}
                activeUnderlineColor={'#10445C'}
                style={styles.input}
              />
            )}
            name="name"
          />

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                placeholder={'example@test.com'}
                placeholderTextColor={'grey'}
                style={styles.input}
                disabled
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Phone"
                value={value}
                onChangeText={onChange}
                placeholder={'123456789'}
                activeUnderlineColor={'#10445C'}
                placeholderTextColor={'grey'}
                style={styles.input}
              />
            )}
            name="phone"
          />

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Password"
                value={value}
                onChangeText={onChange}
                placeholder={'12345'}
                activeUnderlineColor={'#10445C'}
                placeholderTextColor={'grey'}
                style={styles.input}
              />
            )}
            name="password"
          />
        </View>

        <View>
          <Button
            text={'Save'}
            loading={requesting}
            containerStyle={styles.buttonCon}
            onPress={handleSubmit(updatePrifileButton)}
            disabled={requesting}
          />
        </View>
      </ScrollView>

      <CameraModal
        setPictureModalVisible={setShowImageUploadModal}
        pictureModalVisible={showImageUploadModal}
        setProfileImage={setProfileImage}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  requesting: state?.editProfile?.requesting,
  userDeatil: state?.login?.userDetail?.user,
  // profileData: state?.editProfile?.profile,
});

const mapDispatchToProps = dispatch => ({
  updateProfileAction: (data, callBack) =>
    dispatch(updateProfileAction(data, callBack)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
