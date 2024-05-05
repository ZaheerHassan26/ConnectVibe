import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './style';
import {connect} from 'react-redux';
import {
  forgotToken as forgotTokenAction,
  forgotPassword as forgotPasswordAction,
} from '../ForgotPasswordScreen/redux/actions';
import Button from '../../Components/Button';

const CELL_COUNT = 5;

const ForgotCode = ({
  navigation,
  forgotTokenAction,
  tokenRequesting,
  route,
  forgotPasswordAction,
}) => {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState(false);
  const [mail, setMail] = useState(route?.params?.email);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onConfirmCode = () => {
    // if (value) {
    //   const data = {
    //     token: value,
    //   };
    //   forgotTokenAction(data, callBack);
    // } else {
    //   setValueError(true);
    // }
    callBack()
  };

  const callBack = () => {
    navigation.navigate('SetNewPassword', {
      code: value,
    });
  };

  const onResendButton = () => {
    const data = {
      email: mail,
    };
    forgotPasswordAction(data, varificationCode);
  };

  const varificationCode = () => {
    navigation.navigate('forgotCode');
  };
  return (
    <View style={styles.main}>
      <StatusBar
        animated={true}
        backgroundColor={'#EDF4F6'}
        barStyle={'dark-content'}
      />
      <View style={styles.enterCodeView}>
        <TouchableOpacity
          style={styles.backTouchable}
          onPress={() => navigation.goBack()}>
          <Ionicons size={25} color={'#10445C'} name={'arrow-back'} />
        </TouchableOpacity>
        <Text style={styles.entrCodedText}>Enter the code</Text>
      </View>
      <View style={styles.codeInputView}>
        <Text style={styles.verficationCodeText}>
          Enter the verification code
        </Text>
        <Text style={styles.enterCodeText}>
          Please enter the code sent to the following e-mail
        </Text>
        <View
          style={{
            alignItems: 'flex-start',
          }}>
          <Text style={styles.userEmailText}>{mail}</Text>
        </View>
        <View style={styles.CodeWrapper}>
          <CodeField
            ref={ref}
            {...propss}
            value={value}
            onChangeText={e => {
              setValue(e), setValueError(false);
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        {valueError ? (
          <Text style={{color: 'red'}}>Please enter the code</Text>
        ) : (
          ''
        )}
        <TouchableOpacity onPress={onResendButton}>
          <Text style={styles.resendText}>Resend</Text>
        </TouchableOpacity>

        <Button
          onPress={onConfirmCode}
          text={'Confirm'}
          loading={tokenRequesting}
          containerStyle={styles.button}
          disabled={tokenRequesting}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  tokenRequesting: state.forgotPassword.tokenRequesting,
});
const mapDispatchToPropos = dispatch => ({
  forgotTokenAction: (data, callBack) =>
    dispatch(forgotTokenAction(data, callBack)),
  forgotPasswordAction: (data, callBack) =>
    dispatch(forgotPasswordAction(data, callBack)),
});

export default connect(mapStateToProps, mapDispatchToPropos)(ForgotCode);
