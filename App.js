import React, {useEffect, useState} from 'react';
import RootNavigator from './src/Navigation';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import AnimatedSplash from 'react-native-animated-splash-screen';
import SplashScreen from './src/Screens/SplashScreen';
import {Dimensions} from 'react-native';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {ThemeProvider} from './src/Screens/ThemeProvider/ThemeProvider';
import RemotePushController from './src/Utils/notification';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persist = persistStore(store);

export default function App() {
  const [loading, setLoading] = useState(false);
  const {height, width} = Dimensions.get('window');
  const logoHeight = height;
  const logoWidth = width;

  useEffect(() => {
    requestUserPermission();

    PushNotification.createChannel(
      {
        channelId: 'com.connectvibe',
        channelName: 'connectvibe',
        channelDescription: 'Chat App',
      },
      created => console.log(`createChannel returned '${created}'`),
    );

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          setTimeout(() => {
            if (remoteMessage.notification.title) {
              console.log(
                'Notification caused app to open from quit state:',
                remoteMessage.notification.title,
              );
            }
          }, 2000);
        }
      })
      .catch(err => {
        console.error('Error getting initial notification:', err);
      });

    // Handle notification opened while app is in background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened from background state:', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      try {
        console.log('Foreground notification:', remoteMessage);

        const {title, body} = remoteMessage.notification || {};
        if (!title && !body) {
          console.log('Notification data is missing title and body.');
          return;
        }

        const localNotification = {
          title: title || 'Notification',
          message: body || 'You have a new message',
        };

        if (Platform.OS === 'android') {
          localNotification.channelId = 'com.connectvibe';
        }

        console.log('Displaying local notification:', localNotification);
        PushNotification.localNotification(localNotification);
      } catch (error) {
        console.error('Error handling foreground notification:', error);
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('Authorization status:', enabled ? 'enabled' : 'disabled');
    await AsyncStorage.setItem('fcmenabled', enabled ? 'true' : '');

    if (enabled) {
      console.log('FCM permissions granted.');
    }
  }

  const onloading = () => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  };
  useEffect(() => {
    onloading();
  }, []);

  return (
    <ToastProvider>
      <ThemeProvider>
        <AnimatedSplash
          isLoaded={loading}
          customComponent={<SplashScreen />}
          logoWidth={logoWidth}
          logoHeight={logoHeight}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persist}>
              <RemotePushController />
              <RootNavigator />
            </PersistGate>
          </Provider>
        </AnimatedSplash>
      </ThemeProvider>
    </ToastProvider>
  );
}
