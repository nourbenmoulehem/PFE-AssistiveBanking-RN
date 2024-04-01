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
import NewPassword from '../screens/new-password/NewPassword';
import Card from '../screens/Card/Card';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {setMode, setInitialLogin, setLogout} from '../context/globalReducer';

// storage
import * as Keychain from 'react-native-keychain';

// components
import FloatingButton from '../components/FloatingButton';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  MultiStepForm: undefined;
  AccountActivation: undefined;
  Transactions: undefined;
  NewPassword: undefined;
  Card: undefined;
  // Profile: { userId: string };
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
    <>
      <stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.main.backgroundColor,
          },
          headerTintColor: mode === 'dark' ? 'white' : 'black',
          // headerBackTitleVisible: false,
          headerShadowVisible: false, // to remove shadow from the header
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              accessible={true}
              accessibilityRole="header"
              accessibilityLabel="WeBank">
              <Image
                source={require('../assets/logo/logo-webank.png')}
                style={{width: 68, height: 48, marginRight: 10}}
                accessible={true}
                accessibilityLabel="WeBank Logo"
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
              <TouchableOpacity
                onPressIn={toggleMode}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={
                  mode == 'dark'
                    ? 'Passer en mode clair'
                    : 'Passer en mode sombre'
                }>
                <Icon
                  name={mode == 'dark' ? 'brightness-3' : 'white-balance-sunny'}
                  size={30}
                  color={colors.main.buttonColor}
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
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
                    <TouchableOpacity
                      onPressIn={handleLogout}
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel="Logout">
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
            <stack.Screen name="Card" component={Card}
              options={{
                headerShown: true,
                title: 'Card',
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
            <stack.Screen name="NewPassword" component={NewPassword} />

          </>
        )}
      </stack.Navigator>

      {isLoggedIn ? <FloatingButton /> : null}
      
    </>
  );
};

export default MainStack;
