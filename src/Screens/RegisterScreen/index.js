import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {Toast} from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

import CameraModal from '../../Components/ImageModal';
import {emailRegex} from '../../Utils/function';
import {useImages} from '../../Utils/Images';
import Button from '../../Components/Button';
import styles from './style';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Email is invalid'),
  mobileNo: yup.string().required('Mobile Number is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().required('Confirm password is required'),
});

const Signup = ({navigation}) => {
  const [pictureModalVisible, setPictureModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [passwordView, setPasswordView] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {images} = useImages();

  const callBack = () => {
    navigation.navigate('login');
  };

  return (
    <>
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.newRegistrationView}>
            <TouchableOpacity
              style={styles.backTouchable}
              onPress={() => navigation.goBack()}>
              <Ionicons size={25} color={'#10445C'} name={'arrow-back'} />
            </TouchableOpacity>
            <Text style={styles.newRegistrationText}>New Registration</Text>
          </View>
          <View style={styles.registrationInputView}>
            <TouchableOpacity style={styles.registrationTextView}>
              <Text style={styles.registrationText}>New Registration</Text>
              <Text style={styles.serviseProviderText}>User</Text>
            </TouchableOpacity>
            <View style={styles.pictureView}>
              <View>
                <Text style={styles.pictureText}>Personal_pictures</Text>
              </View>

              <TouchableOpacity onPress={() => setPictureModalVisible(true)}>
                <ImageBackground
                  style={styles.userPicture}
                  borderRadius={50}
                  source={
                    profileImage
                      ? {uri: profileImage.path}
                      : images.providerProfile
                  }>
                  <Image
                    style={styles.userPictureCircleWithCamera}
                    source={
                      profileImage
                        ? images.userImageuploadactive
                        : images.userImageupload
                    }
                  />
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  label="Full Name"
                  value={value}
                  onChangeText={onChange}
                  activeUnderlineColor="white"
                  underlineColor="white"
                  textColor="white"
                  style={{
                    backgroundColor: '#3a6579',
                  }}
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
                  activeUnderlineColor="white"
                  underlineColor="white"
                  textColor="white"
                  style={{
                    backgroundColor: '#3a6579',
                  }}
                />
              )}
              name="email"
            />

            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  label="Phone_no"
                  value={value}
                  onChangeText={onChange}
                  activeUnderlineColor="white"
                  underlineColor="white"
                  textColor="white"
                  style={{
                    backgroundColor: '#3a6579',
                  }}
                />
              )}
              name="mobileNo"
            />
            <>
              {errors ? (
                <Text style={{color: 'red'}}>{errors?.mobileNo?.message}</Text>
              ) : (
                ''
              )}
            </>

            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  activeUnderlineColor="white"
                  underlineColor="white"
                  textColor="white"
                  style={{
                    backgroundColor: '#3a6579',
                  }}
                  secureTextEntry={passwordView}
                />
              )}
              name="password"
            />

            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  label="confirm_Password"
                  value={value}
                  onChangeText={onChange}
                  activeUnderlineColor="white"
                  underlineColor="white"
                  textColor="white"
                  style={{
                    backgroundColor: '#3a6579',
                  }}
                  secureTextEntry={passwordView}
                />
              )}
              name="confirmPassword"
            />
            <View style={{}}>
              <Text style={styles.byClickText}>
                terms_and_condition_new_account
              </Text>
              <TouchableOpacity
              // onPress={() => navigation.navigate('termsAndCondition')}
              >
                <Text style={styles.termsAndConditionText}>
                  terms_and_conditions
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              onPress={() => console.log('dlogin')}
              text={'Register'}
              textStyle={{
                fontSize: 20,
                fontWeight: 'bold',
              }}
              // loading={requesting}
              containerStyle={{
                backgroundColor: '#00a1e9',
                marginTop: 30,
                marginBottom: 25,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <CameraModal
        pictureModalVisible={pictureModalVisible}
        setPictureModalVisible={setPictureModalVisible}
        setProfileImage={setProfileImage}
      />
    </>
  );
};

export default Signup;
