import {all} from 'redux-saga/effects';

import login from '../Screens/LoginScreen/redux/saga';
import signUp from '../Screens/RegisterScreen/redux/saga';
import forgotPassword from "../Screens/ForgotPasswordScreen/redux/saga";

export function* mainSaga() {
  yield all({
    login,
    signUp,
    forgotPassword,
  });
}
