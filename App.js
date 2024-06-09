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

const persist = persistStore(store);

export default function App() {
  const [loading, setLoading] = useState(false);
  const {height, width} = Dimensions.get('window');
  const logoHeight = height;
  const logoWidth = width;

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
