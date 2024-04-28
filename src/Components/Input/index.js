import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Input = props => {
  const {
    secureTextEntry,
    placeholder,
    onBlur,
    onChangeText,
    value,
    error,
    containerStyle,
    numberOfLines,
    maxLength,
    textAlign,
    multiline,
    keyboardType,
    editable,
    showPassword,
  } = props;
  return (
    <>
      <View style={[styles.main, containerStyle]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          editable={editable}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          multiline={multiline}
          textAlignVertical="top"
          placeholderTextColor={'white'}
          secureTextEntry={secureTextEntry && !showPassword}
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          textAlign={textAlign}
        />
      </View>
      {error ? <Text style={{color: 'red'}}>{error}</Text> : ''}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
  },
});
