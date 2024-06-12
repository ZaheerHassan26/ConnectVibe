import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RemotePushController = props => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      PushNotification.configure({
        onRegister: function (token) {
          console.log(token, 'token');
          AsyncStorage.setItem('FCMToken', token.token);
        },
        onNotification: function (notification) {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        senderID: '629772472444',
        popInitialNotification: true,
        requestPermissions: true,
      });
    } else {
      PushNotificationIOS.requestPermissions();
      PushNotificationIOS.addEventListener('register', token => {
        const data = {
          token: token,
          os: 'ios',
        };
        AsyncStorage.setItem('FCMToken', data.token);
      });
      PushNotificationIOS.getInitialNotification().then(notification => {
        if (notification.userInteraction) {
          // navigate('Notifications');
        }
      });
    }
  }, []);
  return null;
};
export default RemotePushController;
