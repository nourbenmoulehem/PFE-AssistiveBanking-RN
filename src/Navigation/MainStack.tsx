import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  Settings as RNSettings,
} from 'react-native';
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
import Settings from '../screens/Settings/Settings';
import ColorPreferences from '../screens/ColorPreferences/ColorPreferences';
import Operations from '../screens/operations/Operations';
import Transfers from '../screens/transfers/Transfers';
import Transfer from '../screens/transfer-money/Transfer';
import VerifiedTransfer from '../screens/transfer-money/VerifiedTransfer';
import Beneficiaire from '../screens/beneficiaire/Beneficiaire';
import Reclamation from '../screens/reclamation/Reclamation';
import Notification from '../screens/notification/Notification';
import ChangePassword from '../screens/change-password/ChangePassword';
import NewPassword from '../screens/new-password/NewPassword';
import Card from '../screens/Card/Card';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {setMode, setInitialLogin, setLogout} from '../context/globalReducer';

// storage
import * as Keychain from 'react-native-keychain';

// components
// import FloatingButton from '../components/FloatingButton';
import Microphone from '../components/microphone';
import axios from 'axios';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  MultiStepForm: undefined;
  AccountActivation: undefined;
  Operations: undefined;
  NewPassword: undefined;
  Settings: undefined;
  ColorPreferences: undefined;
  Card: undefined;
  Transfers: undefined;
  Transfer: undefined;
  Beneficiaire: undefined;
  Reclamation: undefined;
  Notification: undefined;
  ChangePassword: undefined;
  VerifiedTransfer: undefined;
  // Profile: { userId: string };
};

const stack = createNativeStackNavigator<RootStackParamList>();
const MainStack = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {mode, isLoggedIn} = useSelector((state: RootState) => state.global);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const toggleMode = () => {
    dispatch(setMode('dark'));
  };
  const colors: any = tokens(mode);
  const [active, setActive] = useState(false);

  // to check if the user is logged in or not and update the initial state
  useEffect(() => {
    const checkKeychain = async () => {
      const credentials = await Keychain.getGenericPassword({
        service: 'accessService',
      });
      if (credentials !== false) {
        // TODO SEND THE ACCESS TOKEN TO THE SERVER TO CHECK IF IT'S VALID
        const accessCredentials = await Keychain.getGenericPassword({
          service: 'accessService',
        });

        const refreshCredentials = await Keychain.getGenericPassword({
          service: 'refreshService',
        });

        if (accessCredentials !== false) {
          try {
            const response = await axios({
              method: 'post',
              url: `${process.env.API_BASE_URL}/api/v1/auth/verifyToken`,
              withCredentials: true,
              responseType: 'json',
              data: {
                access_token: accessCredentials.password,
              },
            });

            let user = {
              clientId: response.data.clientId,
            };
            
            dispatch(setInitialLogin({isLoggedIn: true, user: user}));
          } catch (error: any) {
            if (error.response && error.response.status === 500) {
              console.log('Server error occurred');
              await Keychain.resetGenericPassword({service: 'accessService'});
              await Keychain.resetGenericPassword({service: 'refreshService'});
              dispatch(setInitialLogin({isLoggedIn: false, user: null}));
              dispatch(setLogout());
              setIsTokenValid(false);
              // Handle the error here
            } else {
              console.log('Token expired');
              dispatch(setInitialLogin({isLoggedIn: false, user: null}));
              dispatch(setLogout());
            }
          }
        }
      }
      // console.log(credentials !== false);
      // console.log("hana houni");

      // dispatch(setInitialLogin(credentials !== false));
    };

    checkKeychain();
  }, [dispatch]);

  const handleLogout = async () => {
    await Keychain.resetGenericPassword({service: 'accessService'});
    await Keychain.resetGenericPassword({service: 'refreshService'});
    dispatch(setInitialLogin({isLoggedIn: false, user: null}));
    dispatch(setLogout());
    
  };

  console.log('🚀 ~ MainStack ~ isLoggedIn:', isLoggedIn);

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
              {/* <Text
                style={{
                  color: mode == 'dark' ? 'white' : 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                WeBank
              </Text> */}
            </View>
          ),
          headerRight: () => (
            <>
              {/* dark and light switcher <TouchableOpacity
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
              </TouchableOpacity> */}
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
              name="Operations"
              component={Operations}
              options={{
                headerShown: true,
                title: 'Operations',
              }}
            />
            <stack.Screen
              name="Transfer"
              component={Transfer}
              options={{
                headerShown: true,
                title: 'Transfer',
              }}
            />
            <stack.Screen
              name="Transfers"
              component={Transfers}
              options={{
                headerShown: true,
                title: 'Transfers',
              }}
            />
            <stack.Screen
              name="Beneficiaire"
              component={Beneficiaire}
              options={{
                headerShown: true,
                title: 'Beneficiaire',
              }}
            />
            <stack.Screen
              name="Reclamation"
              component={Reclamation}
              options={{
                headerShown: true,
                title: 'Reclamation',
              }}
            />
            <stack.Screen
              name="Notification"
              component={Notification}
              options={{
                headerShown: true,
                title: 'Notification',
              }}
            />
            <stack.Screen
              name="Settings"
              component={Settings}
              options={{
                headerShown: true,
                title: 'Settings',
              }}
            />
            <stack.Screen
              name="ColorPreferences"
              component={ColorPreferences}
              options={{
                headerShown: true,
                title: 'ColorPreferences',
              }}
            />
            <stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{
                headerShown: true,
                title: 'ChangePassword',
              }}
            />
            <stack.Screen
              name="Card"
              component={Card}
              options={{
                headerShown: true,
                title: 'Card',
              }}
            />
            <stack.Screen
              name="VerifiedTransfer"
              component={VerifiedTransfer}
              // options={{
              //   headerShown: true,
              //   title: 'VerifiedTransfer',
              // }}
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

      {isLoggedIn ? <Microphone /> : null}
    </>
  );
};

export default MainStack;
