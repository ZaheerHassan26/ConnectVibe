import React from 'react';
import RootNavigator from './src/Navigation';
import {store} from '././src/Redux/store';
import {Provider} from 'react-redux';
// import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {ToastProvider} from 'react-native-toast-notifications';

// const persist = persistStore(store);

export default function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persist} > */}
          <RootNavigator />
        {/* </PersistGate> */}
      </Provider>
    </ToastProvider>
  );
}
