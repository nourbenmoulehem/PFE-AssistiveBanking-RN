import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

//React Native Paper
import {PaperProvider} from 'react-native-paper';

//Navigation
import {NavigationContainer} from '@react-navigation/native';
/* NavigationContainer : wrap the whole app in this container and define the routes so we can navigate between screens */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
/* createNativeStackNavigator : Stack is the type of Navigation we're using, there is other types like Draws */

import MainStack from './src/Navigation/MainStack';
// Redux
import {RootState, store} from './src/context/store';
import {Provider, useSelector} from 'react-redux';

// screens
import SignIn from './src/screens/sign-in/SignIn';
import SignUp from './src/screens/sign-up/SignUp';

import AppBar from './src/components/AppBar';

// typescript related, specifying the type
export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  MultiStepForm: undefined;
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

const stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
