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
import styles from './style';

const ForgotPassword = () => {
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

  const handleSubmit = async data => {
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

export default ForgotPassword;
