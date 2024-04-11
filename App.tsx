import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

//React Native Paper
import {PaperProvider, DefaultTheme} from 'react-native-paper';

//Navigation
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
/* NavigationContainer : wrap the whole app in this container and define the routes so we can navigate between screens */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
/* createNativeStackNavigator : Stack is the type of Navigation we're using, there is other types like Draws */

import MainStack from './src/Navigation/MainStack';

// Redux
import {RootState, store} from './src/context/store';
import { Provider } from 'react-redux';

// screens
import SignIn from './src/screens/sign-in/SignIn';
import SignUp from './src/screens/sign-up/SignUp';

// storage
import * as Keychain from 'react-native-keychain';

import AppBar from './src/components/AppBar';

// typescript related, specifying the type
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  MultiStepForm: undefined;
  AccountActivation: undefined;
  NewPassword: undefined;
};

export type RootStackParamListSignedIn = {
  Home: undefined;
  Operations: undefined;
  Settings: undefined;
  ColorPreferences: undefined;
  Card: undefined;
};

const stack = createNativeStackNavigator<RootStackParamList>();


// Linking is used to handle deep linking, it's a way to navigate to a specific screen in the app from a link
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['webankassistive://'],
  config: {
    initialRouteName: 'SignIn',
    screens: {
      SignIn: {
        path: 'home'
      },
      AccountActivation: {
        path: 'account-activation/:activationtoken' // it worked like this and it didnt work with the token in the query account-activation?token
      },
      NewPassword: {
        path: 'create-new-password/:token' 
      }
    }
  }
};

const App = () => {
  return (
    <Provider store={store} >
      <PaperProvider>
        <NavigationContainer linking={linking}>
          <MainStack />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
