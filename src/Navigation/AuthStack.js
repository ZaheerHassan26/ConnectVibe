import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import ForgotPassword from '../Screens/ForgotPasswordScreen';
import ForgotCode from '../Screens/ForgotCodeScreen';
import RegisterationScreen from '../Screens/RegisterScreen';

const AuthStack = createStackNavigator();
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Login">
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <AuthStack.Screen name="ForgotCode" component={ForgotCode} />
    <AuthStack.Screen name="Registeration" component={RegisterationScreen} />
  </AuthStack.Navigator>
);
export default AuthNavigator;
