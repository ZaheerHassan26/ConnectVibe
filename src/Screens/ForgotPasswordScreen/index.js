import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {forgotPassword as forgotPasswordAction} from './redux/actions';

import styles from './style';
import Button from '../../Components/Button';

import {connect} from 'react-redux';
import {emailRegex} from '../../Utils/function';
import Input from '../../Components/Input';

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
      callBack();

      // forgotPasswordAction(data, callBack);
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
            <MaterialCommunityIcons size={17} color={'white'} name={'email'} />
          </View>

          <Input
            placeholder={'example@test.com'}
            value={email}
            onChangeText={value => onCheckEmail(value)}
          />
        </View>
        {emailError ? <Text style={styles.emailError}>{emailError}</Text> : ''}
        <Button
          onPress={onForgotPassword}
          text={'Send Code'}
          textStyle={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
          loading={requesting}
          containerStyle={styles.button}
          disabled={requesting}
        />
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
