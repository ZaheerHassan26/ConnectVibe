import { all } from "redux-saga/effects";

import login from "../Screens/LoginScreen/redux/saga";
// import signUp from "../screens/Auth/NewRegistration/redux/saga";
// import forgotPassword from "../screens/Auth/ForgotPassWord/redux/saga";


export function* mainSaga() {
  yield all({
    login,
    // signUp,
    // forgotPassword,
  });
}
