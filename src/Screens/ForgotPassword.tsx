import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import * as yup from 'yup';
import {useImages} from '../Utils/Images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [passwordView, setPasswordView] = useState(false);
  const {images} = useImages();
  const navigation = useNavigation();

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Enter a valid email')
      .required()
      .label('Email'),
  });

  const handleSubmit = async (data: object) => {
    navigation.navigate('ForgotCode');
  };

  return (
    <View style={styles.main}>
      <StatusBar
        animated={true}
        backgroundColor={'#EDF4F6'}
        barStyle={'dark-content'}
      />

      <View style={styles.loginView}>
        <TouchableOpacity
          style={styles.backTouchable}
          onPress={() => navigation.goBack()}>
          <Ionicons size={25} color={'#10445C'} name={'arrow-back'} />

          <Text style={styles.forgetPasswordText}>Forgot your password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.EmailInputView}>
        <Text style={styles.enterEmailText}>Enter email</Text>
        <View style={styles.inputFocus}>
          <View style={styles.emailImgView}>
            <MaterialCommunityIcons size={25} color={'white'} name={'email'} />
          </View>
          <TextInput
            style={styles.textInputStyle}
            keyboardType={'email-address'}
            autoCapitalize="none"
            textContentType="username"
            placeholder={'example@test.com'}
            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
          />
        </View>
        {/* {emailError ? <Text style={{color: 'red'}}>{emailError}</Text> : ''} */}

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.loginBtn}
          //   disabled={isLoading}
        >
          <Text style={styles.loginTxt}>Submit Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#EDF4F6',
  },
  loginView: {
    flex: 0.1,
    backgroundColor: '#EDF4F6',
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  backTouchable: {
    flexDirection: 'row',
    gap: 11,
    alignItems: 'center',
  },
  forgetPasswordText: {
    color: '#10445C',
    fontSize: 18,
    fontWeight: '700',
  },
  EmailInputView: {
    flex: 1,
    backgroundColor: '#10445C',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 32,
    gap: 11,
    paddingHorizontal: 27,
  },
  enterEmailText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 20,
  },
  inputFocus: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderRadius: 5,
    borderColor: 'white',
    marginTop: 30,
    paddingLeft: 14,
    color: 'blue',
    height: 42,
    backgroundColor: '#3a6579',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1,
    elevation: 1,
  },
  textInputStyle: {
    color: 'white',
    flex: 1,
    marginLeft: 10,
  },
  emailError: {color: 'yellow'},
  loginBtn: {
    width: '40%',
    backgroundColor: '#00a1e9',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 30,
  },
  loginTxt: {fontSize: 20, color: 'white', fontWeight: 'bold'},
  emailImgView: {justifyContent: 'center'},
});

export default Login;
