import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import React, { createContext, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
// import AppNavigator from './AppStack'
import AuthNavigator from './AuthStack'
import SplashScreen from '../Screens/SplashScreen'
import { createStackNavigator } from '@react-navigation/stack'
export const AuthContext = createContext()
const Splash = createStackNavigator()
const RootNavigator = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [splash, setSplash] = useState(true)
 

  useEffect(() => {
    const interval = setInterval(() => setSplash(false), 2000)
    return () => clearInterval(interval)
  }, [])
  const load = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('accessToken')
      if (token) {
        // const { success } = await onBoardUser()
        // success && setIsSignedIn(true)
      } else {
        setIsSignedIn(false)
      }
    } catch (error) {
      setIsSignedIn(false)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    load()
  }, [])
  const logout = async () => {
    await AsyncStorage.clear()
    setIsSignedIn(false)
  }
  const login = () => {
    setIsSignedIn(true)
  }
  const renderLoading = () => <SplashScreen />
  const SplashNavigator = () => (
    <Splash.Navigator screenOptions={{ headerShown: false }}>
      <Splash.Screen name="splash" component={SplashScreen} />
    </Splash.Navigator>
  )
  const renderApp = () => (
    <NavigationContainer>
      <AuthContext.Provider value={{ logout, login }}>
        <>
          {splash ? (
            <SplashNavigator />
          ) : isSignedIn ? (
            <></>
            // <AppNavigator />
          ) : (
            <AuthNavigator />
          )}
        </>
      </AuthContext.Provider>
    </NavigationContainer>
  )
  return loading ? renderLoading() : renderApp()
}
export default RootNavigator