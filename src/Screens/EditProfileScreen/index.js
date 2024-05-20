import {
  ActivityIndicator,
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
import {getStyles} from './style';
import CameraModal from '../../Components/ImageModal';
import {updateProfile as updateProfileAction} from './redux/actions';
import {useImages} from '../../Utils/Images';
import Button from '../../Components/Button';
import Error from '../../Components/Input/Error';
import {getThemeColor} from '../ThemeProvider/redux/saga';

const schema = yup.object({
  name: yup.string().trim().required(),
  phone: yup
    .string()
    .matches(/^(?:\D*\d){12}\D*$/, 'Invalid phone number')
    .label('Phone Number'),
  email: yup.string().matches(emailRegex, 'Enter a valid email').label('Email'),
});

const EditProfile = ({updateProfileAction, requesting, profileData, theme}) => {
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

  const {images} = useImages();
  const isFocused = useIsFocused();
  const styles = getStyles(theme);

  const image = {
    uri: null,
  };

  const updateProfileButton = data => {
    const payload = new FormData();
    payload.append('id', profileData?.id);
    if (profileImage) {
      payload.append('profile_image', {
        name: profileImage.path + 'new image.jpeg',
        type: profileImage.mime,
        uri: profileImage.path,
      });
    }
    if (data.email.trim() !== profileData?.user_email) {
      payload.append('email', data.email);
    }
    if (data.mobileNo && data.mobileNo != profileData?.phone) {
      data.mobileNo = '+' + countryCode.split('0')[2] + data.mobileNo.trim();

      payload.append('phone', data.mobileNo);
    }
    if (data.password !== undefined || data.password !== '') {
      payload.append('new_password', data.password);
    }
    payload?._parts.length > 1 ? updateProfileAction(payload) : '';
  };

  useLayoutEffect(() => {
    setValue('name', profileData?.name);
    setValue('email', profileData?.user_email);
    setValue('phone', profileData?.phone);
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      {!profileData ? (
        <ActivityIndicator
          size={'large'}
          color={getThemeColor('text', theme)}
          style={{marginVertical: '60%'}}
        />
      ) : (
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
                  placeholder={'AdminTest'}
                  placeholderTextColor={styles.placeholder}
                  activeUnderlineColor={styles.text.color}
                  style={styles.input}
                />
              )}
              name="name"
            />
            <Error errors={errors.name} />
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  placeholder={'example@test.com'}
                  textColor={styles.placeholder.color}
                  placeholderTextColor={styles.placeholder}
                  style={styles.input}
                  editable={false}
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
                  activeUnderlineColor={styles.text.color}
                  placeholderTextColor={styles.placeholder}
                  style={styles.input}
                />
              )}
              name="phone"
            />
            <Error errors={errors.phone} />

            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  textColor={styles.text.color}
                  placeholder={'12345'}
                  activeUnderlineColor={styles.text.color}
                  placeholderTextColor={styles.placeholder}
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
              onPress={handleSubmit(updateProfileButton)}
              disabled={requesting}
            />
          </View>
        </ScrollView>
      )}

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
  profileData: state?.editProfile?.profile,
  theme: state?.themes?.theme,
});

const mapDispatchToProps = dispatch => ({
  updateProfileAction: data => dispatch(updateProfileAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
