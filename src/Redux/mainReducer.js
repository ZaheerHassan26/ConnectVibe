import {persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

import login from '../Screens/LoginScreen/redux/reducer';
// import signUp from '../screens/Auth/NewRegistration/redux/reducer';
// import forgotPassword from '../screens/Auth/ForgotPassWord/redux/reducer';

const appPresistConfig = {
  key: 'login',
  storage: AsyncStorage,
  timeout: null,
};

export default {
  login: persistReducer(appPresistConfig, login),
  // signUp,
  // forgotPassword,
};
