import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Toast} from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './style';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import {useState} from 'react';

const schema = yup.object({
  password: yup.string().required(),
  confirm_password: yup.string().required(),
});

const SetNewPassword = ({
  route,
  navigation,
  setNewPasswordAction,
  passwordRequesting,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [passwordView, setPasswordView] = useState(false);

  const onSure = data => {
    if (data.confirm_password !== data.password) {
      //   Toast.show(L('pass_match'));
    } else {
      const changePasswordData = {
        token: route?.params?.code,
        password: data?.password,
      };
      setNewPasswordAction(changePasswordData, callBack);
    }
  };
  const callBack = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.main}>
      <View style={styles.newPasswordView}>
        <TouchableOpacity
          style={styles.backTouchable}
          onPress={() => navigation.goBack()}>
          <Ionicons size={25} color={'#10445C'} name={'arrow-back'} />
        </TouchableOpacity>
        <Text style={styles.newPasswordText}>Set the new password</Text>
      </View>

      <View style={styles.passwordInputView}>
        <Text style={styles.setNewPasswordlText}>Set new password</Text>

        <Text style={[styles.lableStyle]}>Password</Text>
        <View style={styles.inputFocus}>
          <View style={[styles.passView, {justifyContent: 'space-between'}]}>
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
          <View style={[styles.passView, {justifyContent: 'space-between'}]}>
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

        <Button
          onPress={handleSubmit(onSure)}
          text={'Sure'}
          loading={passwordRequesting}
          containerStyle={styles.button}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  passwordRequesting: state?.forgotPassword?.passwordRequesting,
});

const mapDispatchToProps = dispatch => ({
  setNewPasswordAction: (data, callBack) =>
    dispatch(setNewPasswordAction(data, callBack)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetNewPassword);
