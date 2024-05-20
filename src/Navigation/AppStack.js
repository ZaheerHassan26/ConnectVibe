import {Appearance, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EditProfile from '../Screens/EditProfileScreen';
import Home from '../Screens/HomeScreen';
import Chat from '../Screens/ChatScreen';
import Setting from '../Screens/SettingScreen';
import {getThemeColor} from '../Screens/ThemeProvider/redux/saga';
import {connect} from 'react-redux';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = ({theme}) => {
  const colorScheme = Appearance.getColorScheme();
  const styles = getStyles(theme);

  const tabConfig = [
    {
      name: 'home',
      component: Home,
      focusedIcon: (
        <View style={styles.activeIconContainer}>
          <AntDesign size={25} color={'white'} name={'home'} />
        </View>
      ),
      defaultIcon: (
        <View style={styles.defaultIcon}>
          <AntDesign size={20} color={'white'} name={'home'} />
          <Text style={{color: 'white', fontSize: 10, marginTop: 2}}>Home</Text>
        </View>
      ),
    },
    {
      name: 'profile',
      component: EditProfile,
      focusedIcon: (
        <View style={styles.activeIconContainer}>
          <EvilIcons
            size={30}
            color={'white'}
            name={'user'}
            style={{marginBottom: 7}}
          />
        </View>
      ),
      defaultIcon: (
        <View style={styles.defaultIcon}>
          <EvilIcons size={25} color={'white'} name={'user'} />
          <Text style={{color: 'white', fontSize: 10, marginTop: 2}}>
            Profile
          </Text>
        </View>
      ),
    },
    {
      name: 'setting',
      component: Setting,
      focusedIcon: (
        <View style={styles.activeIconContainer}>
          <AntDesign size={25} color={'white'} name={'setting'} />
        </View>
      ),
      defaultIcon: (
        <View style={styles.defaultIcon}>
          <AntDesign size={20} color={'white'} name={'setting'} />
          <Text style={{color: 'white', fontSize: 10, marginTop: 2}}>Logs</Text>
        </View>
      ),
    },
  ];
  const TabBarIcon = ({route, focused}) => {
    const tab = tabConfig.find(tab => tab.name === route.name);
    return <>{focused ? tab.focusedIcon : tab.defaultIcon}</>;
  };

  const BottomNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={({route}) => ({
          tabBarPressColor: 'none',
          tabBarActiveTintColor: '#58ceb2',
          tabBarInactiveTintColor: 'gray',
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 80 : 70,
            backgroundColor: getThemeColor('headerColor', theme),
            borderTopColor: 'white',
            borderTopWidth: 1,
            // borderRadius: 15,
            // overflow: 'hidden',
          },
          tabBarIconStyle: {
            alignContent: 'center',
            width: 'auto',
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: ['home', 'profile', 'setting'].includes(route.name)
            ? undefined
            : () => {
                return null;
              },
          tabBarIcon: ({focused}) => (
            <TabBarIcon route={route} focused={focused} />
          ),
          tabBarIndicatorStyle: {display: 'none'},
        })}>
        {tabConfig.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
          />
        ))}
      </Tab.Navigator>
    );
  };

  return (
    <AppStack.Navigator
      initialRouteName={'BottomBar'}
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name="BottomBar" component={BottomNavigator} />
      <AppStack.Screen name="chat" component={Chat} />
    </AppStack.Navigator>
  );
};

export const getStyles = theme =>
  StyleSheet.create({
    activeIconContainer: {
      width: 84,
      alignItems: 'center',
      height: 49,
      borderRadius: 24,
      backgroundColor: getThemeColor('activeTab', theme),
      justifyContent: 'center',
      alignSelf: 'center',
    },
    defaultIcon: {
      width: 55,
      alignItems: 'center',
      height: 55,
      justifyContent: 'center',
    },
  });

const mapStateToProps = state => ({
  theme: state?.themes?.theme,
});

export default connect(mapStateToProps, null)(AppNavigator);
