import 'react-native-gesture-handler';
import React, {Fragment} from 'react';
import {Provider} from 'react-native-paper';
import {SafeAreaView, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from './core/theme';
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from './screens';
const AuthenticationStack = createStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="HomeScreen" component={HomeScreen} />
      <AuthenticationStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthenticationStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <AuthenticationStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <AuthenticationStack.Screen name="Dashboard" component={Dashboard} />
    </AuthenticationStack.Navigator>
  );
};

export const Router = () => {
  return (
    <Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: '#072c14'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#072c14'}}>
        <StatusBar backgroundColor="#072c14" barStyle="light-content" />
        <Provider theme={theme}>
          <NavigationContainer>
            <AuthenticationNavigator />
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    </Fragment>
  );
};
