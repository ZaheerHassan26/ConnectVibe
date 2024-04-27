import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {emailRegex} from '../utils/function';
import {Toast} from 'react-native-toast-notifications';
import {useImages} from '../utils/Images';
import Button from '../Components/Button';
import {NavigationType} from '../utils/function';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Entypo from 'react-native-vector-icons/Entypo';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import CameraModal from '../Components/ImageModal';
import * as yup from 'yup';


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

const Signup: React.FC<NavigationType> = ({navigation}) => {
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
