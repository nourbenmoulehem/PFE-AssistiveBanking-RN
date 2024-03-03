import {View, Text, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {tokens} from '../assets/palette';

// Navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import SignIn from '../screens/sign-in/SignIn';
import SignUp from '../screens/sign-up/SignUp';
import ForgotPassword from '../screens/forgot-password/ForgotPassword';
import AccountActivation from '../screens/account-activation/AccountActivation';
import Home from '../screens/home/Home';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {setMode} from '../context/globalReducer';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  MultiStepForm: undefined;
  AccountActivation: undefined;
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

const stack = createNativeStackNavigator<RootStackParamList>();
const MainStack = () => {
  const dispatch = useDispatch();
  const {mode, isLoggedIn} = useSelector((state: RootState) => state.global);
  const toggleMode = () => {
    dispatch(setMode());
  };
  const colors = tokens(mode);
  return (
    <stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.main.backgroundColor,
        },
        headerShadowVisible: false, // to remove shadow from the header
        headerTitle: () => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/logo/logo-webank.png')}
              style={{width: 68, height: 48, marginRight: 10}}
            />
            <Text
              style={{
                color: mode == 'dark' ? 'white' : 'black',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              WeBank
            </Text>
          </View>
        ),
        headerRight: () => (
          <Icon
            name={mode == 'dark' ? 'brightness-3' : 'white-balance-sunny'}
            size={30}
            color={colors.main.buttonColor}
            style={{marginRight: 10}}
            onPress={toggleMode}
          />
        ),
      }}
      initialRouteName="SignIn">

{isLoggedIn ? (
    <>
      <stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          title: 'Home',
        }}
      />
    </>
  ) : (
    <>
      <stack.Screen name="SignIn" component={SignIn} />
      <stack.Screen name="SignUp" component={SignUp} />
      <stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <stack.Screen name="AccountActivation" component={AccountActivation} />
    </> 
  )}
    </stack.Navigator>
  );
};

export default MainStack;
