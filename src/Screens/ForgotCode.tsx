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

          <Text style={styles.entrCodedText}>Enter the code</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#EDF4F6',
  },
  enterCodeView: {
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
  entrCodedText: {
    color: '#10445C',
    fontSize: 18,
    fontWeight: '700',
  },
  codeInputView: {
    flex: 1,
    backgroundColor: '#10445C',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 32,
    paddingHorizontal: 27,
  },
  verficationCodeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 30,
  },
  enterCodeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 0,
  },
  userEmailText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 30,
  },
  resendText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 17,
    textDecorationLine: 'underline',
  },
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
  codeFieldRoot: { marginTop: 20, width: "100%" },
  cell: {
    flex: 1,
    lineHeight: 38,
    fontSize: 28,
    color: "#fff",
    borderBottomWidth: 2,
    borderColor: "#fff",
    textAlign: "center",
    fontWeight: "600",
    paddingTop: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  focusCell: {
    borderColor: "#fff",
    fontSize: 28,
    fontWeight: "600",
  },
  CodeWrapper: {
    shadowColor: "#fff",
    shadowRadius: 7,
    elevation: 5,
    // backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
});
