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
import {useImages} from '../../Utils/Images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';
import {forgotPassword as forgotPasswordAction} from './redux/actions';

import styles from './style';
import {connect} from 'react-redux';
import {emailRegex} from '../../Utils/function';

const ForgotPassword = ({navigation, forgotPasswordAction, requesting}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const onCheckEmail = value => {
    setEmail(value);
    setEmailError('');
  };

  const onForgotPassword = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Email must be valid');
    } else {
      const data = {
        email: email,
      };

      forgotPasswordAction(data, callBack);
    }
  };
  const callBack = () => {
    navigation.navigate('ForgotCode', {email});
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
        </TouchableOpacity>
        <Text style={styles.forgetPasswordText}>Forgot your password</Text>
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
            value={email}
            placeholder={'example@test.com'}
            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
            onChangeText={value => onCheckEmail(value)}
          />
        </View>
        {emailError ? (
          <Text style={{color: 'red', alignSelf: 'flex-start'}}>
            {emailError}
          </Text>
        ) : (
          ''
        )}

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={onForgotPassword}
          loading={requesting}>
          <Text style={styles.loginTxt}>Submit Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  requesting: state?.forgotPassword?.requesting,
});

const mapDispatchToProps = dispatch => ({
  forgotPasswordAction: (data, callBack) =>
    dispatch(forgotPasswordAction(data, callBack)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
