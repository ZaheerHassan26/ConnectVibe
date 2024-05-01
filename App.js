import React from 'react';
import RootNavigator from './src/Navigation';
import AppNavigator from './src/Navigation/AppStack';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import store from './src/Redux/store';

export default function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </ToastProvider>
  );
}
