import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

interface Props {
  containerStyle: object;
  textStyle: object;
  text: string;
  onPress: () => void;
  //   rightImage,
  loading: boolean;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  containerStyle,
  textStyle,
  text,
  onPress,
  //   rightImage,
  loading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonTouchable, containerStyle]}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      )}

      {/* {rightImage && <Image style={styles.rightImage} source={rightImage} />} */}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonTouchable: {
    height: 60,
    borderWidth: 1,
    // borderColor: '#fff',
    borderRadius: 10,
    width: 143,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  rightImage: {
    width: 20,
    height: 20,
    marginLeft: 7,
  },
});
