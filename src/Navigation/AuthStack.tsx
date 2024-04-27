import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import ForgotPassword from '../Screens/ForgotPassword';
import ForgotCode from '../Screens/ForgotCode';
import Signup from '../Screens/Signup';


const AuthStack = createStackNavigator();
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Login">
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <AuthStack.Screen name="ForgotCode" component={ForgotCode} />
    <AuthStack.Screen name="Signup" component={Signup} />
  </AuthStack.Navigator>
);
export default AuthNavigator;
