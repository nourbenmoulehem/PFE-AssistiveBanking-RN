import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {tokens} from '../assets/palette';
import {Avatar} from 'react-native-paper';
import {ActivityIndicator} from 'react-native';

// Navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import SignIn from '../screens/sign-in/SignIn';
import SignUp from '../screens/sign-up/SignUp';
import ForgotPassword from '../screens/forgot-password/ForgotPassword';
import AccountActivation from '../screens/account-activation/AccountActivation';
import Home from '../screens/home/Home';
import Transactions from '../screens/transactions/Transactions';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {setMode, setInitialLogin, setLogout} from '../context/globalReducer';

// storage
import * as Keychain from 'react-native-keychain';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  MultiStepForm: undefined;
  AccountActivation: undefined;
  Transactions: undefined;
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

const stack = createNativeStackNavigator<RootStackParamList>();
const MainStack = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {mode, isLoggedIn} = useSelector((state: RootState) => state.global);
  console.log('🚀 ~ MainStack ~ isLoggedIn:', isLoggedIn);
  const toggleMode = () => {
    dispatch(setMode());
  };
  const colors = tokens(mode);

  // to check if the user is logged in or not and update the initial state
  useEffect(() => {
    const checkKeychain = async () => {
      const credentials = await Keychain.getGenericPassword({
        service: 'accessService',
      });
      dispatch(setInitialLogin(credentials !== false));
    };

    checkKeychain();
  }, [dispatch]);

  const handleLogout = async () => {
    await Keychain.resetGenericPassword({service: 'accessService'});
    await Keychain.resetGenericPassword({service: 'refreshService'});
    dispatch(setLogout());
  };

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
          <>
            <Icon
              name={mode == 'dark' ? 'brightness-3' : 'white-balance-sunny'}
              size={30}
              color={colors.main.buttonColor}
              style={{marginRight: 10}}
              onPress={toggleMode}
            />
            {isLoggedIn ? (
              loading ? (
                <ActivityIndicator
                  size="large"
                  color={colors.main.buttonColor}
                />
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 15,
                  }}>
                  <Avatar.Text size={30} label="XD" />
                  <TouchableOpacity onPress={handleLogout}>
                    <Icon
                      name="logout"
                      size={30}
                      color={colors.main.buttonColor}
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                </View>
              )
            ) : null}
          </>
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
          <stack.Screen
            name="Transactions"
            component={Transactions}
            options={{
              headerShown: true,
              title: 'Transactions',
            }}
          />
        </>
      ) : (
        <>
          <stack.Screen name="SignIn" component={SignIn} />
          <stack.Screen name="SignUp" component={SignUp} />
          <stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <stack.Screen
            name="AccountActivation"
            component={AccountActivation}
          />
        </>
      )}
    </stack.Navigator>
  );
};

export default MainStack;
