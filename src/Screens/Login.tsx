import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import * as yup from 'yup';
import {useImages} from '../utils/Images';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Foundation from 'react-native-vector-icons/Foundation';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {emailRegex} from '../utils/function';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../Components/Input';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import Button from '../Components/Button';
import {NavigationType} from '../utils/function';

const schema = yup.object({
  username: yup
    .string()
    .matches(emailRegex, 'Email is invalid')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login: React.FC<NavigationType> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {images} = useImages();

  const [passwordView, setPasswordView] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(emailRegex, 'Enter a valid email')
      .required()
      .label('Email'),
    password: yup.string().required().label('Password'),
  });

  const loginUser = async (data: object) => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EDF4F6'}}>
      <StatusBar
        animated={true}
        backgroundColor={'#EDF4F6'}
        barStyle={'dark-content'}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#EDF4F6',
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Image source={images.logo} style={styles.loginImage} />
        <View style={styles.logoImgView}>
          <Text style={{marginTop: 10, fontSize: 32, color: '#10445C'}}>
            Connect Vibe
          </Text>
        </View>
        <View style={styles.cardView}>
          <View style={styles.cardHeader}>
            <Text style={styles.siginTxt}>SignIn</Text>
            <Text style={styles.subTxt}>To access your dashboard</Text>
          </View>

          <View style={styles.mainView}>
            <Text style={styles.lableStyle}>Email</Text>

            <View style={styles.inputFocus}>
              <View style={styles.emailImgView}>
                {/* <MaterialCommunityIcons
                  size={17}
                  color={'white'}
                  name={'email'}
                /> */}
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
                name="username"
              />
            </View>

            <Text style={[styles.lableStyle, {marginTop: 20}]}>Password</Text>
            <View style={styles.inputFocus}>
              <View
                style={[styles.passView, {justifyContent: 'space-between'}]}>
                <View style={{flexDirection: 'row', width: '89%'}}>
                  <View style={styles.emailImgView}>
                    {/* <Foundation size={17} color={'white'} name={'key'} /> */}
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
                        error={errors?.password?.message}
                        secureTextEntry={true}
                      />
                    )}
                    name="password"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setPasswordView(!passwordView)}
                  style={{justifyContent: 'center', marginRight: 5}}>
                  {/* <FontAwesome5
                    size={15}
                    color={'white'}
                    name={passwordView ? 'eye' : 'eye-slash'}
                  /> */}
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={{alignItems: 'flex-end', marginTop: 10}}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPass}>Forgot Password ?</Text>
            </TouchableOpacity>

            <Button
              onPress={() => console.log('dlogin')}
              text={'Login'}
              textStyle={{
                fontSize: 20,
                fontWeight: 'bold',
              }}
              // loading={requesting}
              containerStyle={{
                backgroundColor: '#00a1e9',
                marginTop: 25,
                width: '100%',
                height: 52,
              }}
            />
            <View style={styles.careateAnAccountView}>
              <Text style={styles.careateAnAccountText}>
                Don’t have an account yet?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text
                  style={[styles.careateAnAccountText, styles.fontWeightBold]}>
                  Register now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 27,
  },
  lableStyle: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  inputFocus: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: 'grey',
    marginTop: 3,
    paddingLeft: 14,
    height: 42,
    backgroundColor: '#3a6579',
  },
  loginImage: {
    marginTop: 100,
    alignSelf: 'center',
    height: 68,
    width: 103,
  },
  cardView: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 15,
    marginTop: 10,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    backgroundColor: '#10445C',
  },
  logoImgView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImg: {height: 19, width: 200},
  cardHeader: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  siginTxt: {color: 'white', fontWeight: '600', fontSize: 32},
  subTxt: {color: 'white', fontWeight: '400', fontSize: 14, marginTop: 10},
  emailImg: {height: 13, width: 16},
  emailError: {color: 'yellow'},
  forgotPass: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '400',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  passError: {color: 'yellow'},
  passView: {flexDirection: 'row'},
  emailImgView: {justifyContent: 'center', marginRight: 10},

  careateAnAccountView: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 15,
    justifyContent: 'center',
  },
  careateAnAccountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
  },
  fontWeightBold: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default Login;
