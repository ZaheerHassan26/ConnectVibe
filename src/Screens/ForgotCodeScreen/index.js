import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useState } from 'react';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {useNavigation} from '@react-navigation/native';
  import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  import styles from './style'; 
  
  
  const CELL_COUNT = 5;
  
  export default function ForgotCode() {
  
    const [value, setValue] = useState("");
    const [valueError, setValueError] = useState(false);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const navigation = useNavigation();
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
            <Text style={styles.userEmailText}>zh78452@gmail.com</Text>
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
          <TouchableOpacity>
            <Text style={styles.resendText}>Resend</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={handleSubmit}
            style={styles.loginBtn}
            //   disabled={isLoading}
          >
            <Text style={styles.loginTxt}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  
  