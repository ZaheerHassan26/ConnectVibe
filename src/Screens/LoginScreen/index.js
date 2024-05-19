import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';

import * as yup from 'yup';
import {useImages} from '../../Utils/Images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {emailRegex} from '../../Utils/function';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../../Components/Input';
import {login as loginAction} from './redux/actions';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import Button from '../../Components/Button';
import styles from './style';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Error from '../../Components/Input/Error';

const schema = yup.object({
  username: yup
    .string()
    .matches(emailRegex, 'Email is invalid')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = ({navigation, loginAction, requesting}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {images} = useImages();

  const [passwordView, setPasswordView] = useState(false);

  const loginUser = async data => {
    // const fcmToken = await AsyncStorage.getItem('FCMToken');
    loginAction(data, navigation);
  };

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
            <Text style={styles.signInTxt}>SignIn</Text>
            <Text style={styles.subTxt}>To access your dashboard</Text>
          </View>

          <View style={styles.mainView}>
            <Text style={styles.labelStyle}>Email</Text>

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
                name="username"
              />
            </View>
            <Error errors={errors?.username} />

            <Text style={[styles.labelStyle, {marginTop: 20}]}>Password</Text>
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
            <Error errors={errors?.password} />

            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                bottom: errors?.password ? 16 : 0,
              }}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPass}>Forgot Password ?</Text>
            </TouchableOpacity>

            <Button
              onPress={handleSubmit(loginUser)}
              text={'Login'}
              textStyle={{
                fontSize: 20,
                fontWeight: 'bold',
              }}
              loading={requesting}
              containerStyle={{
                backgroundColor: '#00a1e9',
                marginTop: 25,
                width: '100%',
                height: 52,
              }}
            />
            <View style={styles.createAnAccountView}>
              <Text style={styles.createAnAccountText}>
                Don’t have an account yet?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}>
                <Text
                  style={[styles.createAnAccountText, styles.fontWeightBold]}>
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

const mapStateTopProps = state => ({
  userDetail: state.login.userDetail,
  requesting: state.login.requesting,
});

const mapDispatchToProps = dispatch => ({
  loginAction: (data, navigation) => dispatch(loginAction(data, navigation)),
});

export default connect(mapStateTopProps, mapDispatchToProps)(Login);
