import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Toast} from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Entypo from 'react-native-vector-icons/Entypo';

import * as yup from 'yup';

import CameraModal from '../../Components/ImageModal';
import {emailRegex} from '../../Utils/function';
import {useImages} from '../../Utils/Images';
import Button from '../../Components/Button';
import {signup as signupAction} from './redux/action';
import styles from './style';
import {connect} from 'react-redux';
import Input from '../../Components/Input';

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

const Signup = ({navigation, signupAction, requesting}) => {
  const [pictureModalVisible, setPictureModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [passwordView, setPasswordView] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {images} = useImages();

  const signupButton = data => {
    if (data.password !== data.confirmPassword) {
      Toast.show(L('pass_match'));
    } else {
      const payload = new FormData();
      if (profileImage) {
        payload.append('profile_image', {
          name: profileImage.path + 'new image.jpeg',
          type: profileImage.mime,
          uri: profileImage.path,
        });
      }
      payload.append('email', data.email);
      payload.append('phone', data.mobileNo.trim());
      payload.append('password', data.password.trim());
      payload.append('confirmPassword', data.confirmPassword.trim());
      signupAction(payload, callBack);
    }
  };
  const callBack = () => {
    navigation.navigate('login');
  };

  return (
    <>
      <View style={styles.main}>
        <View style={styles.newRegistrationView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons size={25} color={'#10445C'} name={'arrow-back'} />
          </TouchableOpacity>
          <Text style={styles.newRegistrationText}>New Registration</Text>
        </View>
        <View style={styles.registrationInputView}>
          <View style={styles.registrationTextView}>
            <Text style={styles.registrationText}>New Registration</Text>
            {/* <Text style={styles.serviseProviderText}>User</Text> */}
          </View>
          <Text style={styles.entryInformationText}>
            Please enter the following information to create a new account.
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.pictureView}>
              <TouchableOpacity onPress={() => setPictureModalVisible(true)}>
                <ImageBackground
                  style={styles.userPicture}
                  borderRadius={50}
                  source={
                    profileImage ? {uri: profileImage.path} : images.profile
                  }>
                  <Image
                    style={styles.userPictureCircleWithCamera}
                    source={images.userImageupload}
                  />
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <Text style={styles.lableStyle}>User Name</Text>

            <View style={styles.inputFocus}>
              <View style={styles.emailImgView}>
                <Entypo size={17} color={'white'} name={'user'} />
              </View>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder={'John'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="userName"
              />
            </View>

            <Text style={styles.lableStyle}>Email</Text>

            <View style={styles.inputFocus}>
              <View style={styles.emailImgView}>
                <MaterialCommunityIcons
                  size={17}
                  color={'white'}
                  name={'email'}
                />
              </View>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder={'example@test.com'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
              />
            </View>

            <Text style={styles.lableStyle}>Phone_no</Text>

            <View style={styles.inputFocus}>
              <View style={styles.emailImgView}>
                <MaterialCommunityIcons
                  size={17}
                  color={'white'}
                  name={'phone'}
                />
              </View>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder={'123456789'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="mobileNo"
              />
            </View>

            <Text style={[styles.lableStyle]}>Password</Text>
            <View style={styles.inputFocus}>
              <View
                style={[styles.passView, {justifyContent: 'space-between'}]}>
                <View style={{flexDirection: 'row', width: '89%'}}>
                  <View style={styles.emailImgView}>
                    <Foundation size={17} color={'white'} name={'key'} />
                  </View>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        placeholder={'password'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        showPassword={passwordView}
                        secureTextEntry={true}
                      />
                    )}
                    name="password"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setPasswordView(!passwordView)}
                  style={{justifyContent: 'center', marginRight: 5}}>
                  <FontAwesome5
                    size={15}
                    color={'white'}
                    name={passwordView ? 'eye' : 'eye-slash'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[styles.lableStyle]}>Confirm Password</Text>
            <View style={styles.inputFocus}>
              <View
                style={[styles.passView, {justifyContent: 'space-between'}]}>
                <View style={{flexDirection: 'row', width: '89%'}}>
                  <View style={styles.emailImgView}>
                    <Foundation size={17} color={'white'} name={'key'} />
                  </View>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        placeholder={'c_password'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        showPassword={passwordView}
                        secureTextEntry={true}
                      />
                    )}
                    name="confirmPass"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setPasswordView(!passwordView)}
                  style={{justifyContent: 'center', marginRight: 5}}>
                  <FontAwesome5
                    size={15}
                    color={'white'}
                    name={passwordView ? 'eye' : 'eye-slash'}
                  />
                </TouchableOpacity>
              </View>
            </View>
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
              onPress={handleSubmit(signupButton)}
              text={'Register'}
              textStyle={{
                fontSize: 20,
                fontWeight: 'bold',
              }}
              loading={requesting}
              containerStyle={{
                backgroundColor: '#00a1e9',
                marginTop: 30,
                marginBottom: 25,
              }}
            />
          </ScrollView>
        </View>
      </View>
      <CameraModal
        pictureModalVisible={pictureModalVisible}
        setPictureModalVisible={setPictureModalVisible}
        setProfileImage={setProfileImage}
      />
    </>
  );
};

const mapStateToProps = state => ({
  requesting: state?.signUp?.requesting,
});

const mapDispatchToProps = dispatch => ({
  signupAction: (data, callBack) => dispatch(signupAction(data, callBack)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
