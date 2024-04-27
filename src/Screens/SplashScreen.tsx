import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useImages} from '../utils/Images';

export default function SplashScreen() {
  const {images} = useImages();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EDF4F6'}}>
      <StatusBar
        animated={true}
        backgroundColor={'#EDF4F6'}
        barStyle={'dark-content'}
      />
      <View style={{alignItems: 'center', marginVertical: '50%'}}>
        <Image source={images.appLogo} style={{width: 250, height: 215}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
