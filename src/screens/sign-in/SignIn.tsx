import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  TextInput as NativeTextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';

// components
import TextInput from '../../components/TextInput';
import AuthButton from '../../components/AuthButton';
import InputTitle from '../../components/InputTitle';

// redux
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {setLogin} from '../../context/globalReducer';
import {tokens} from '../../assets/palette';

// storage
import * as Keychain from 'react-native-keychain';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

// forms
import {Formik} from 'formik';
import * as yup from 'yup';
import {loginSchema} from '../../constants/yupValidations';

// axios
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

axios.defaults.withCredentials = true;

//type safety
type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: SignInProps) => {
  const {isLoggedIn, mode, user} = useSelector(
    (state: RootState) => state.global,
  );

  // testing purposes, need to be deleted later
  const getCredentials = async () => {
    const credentials = await Keychain.getGenericPassword();
  };
  getCredentials();
  // testing purposes, need to be deleted later

  const colors = tokens(mode); // get the color palette based on the mode
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required'),
  });

  type FormValues = {
    email: string;
    password: string;
  };

  const authenticate = async (values: FormValues) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.API_BASE_URL}/api/v1/auth/authenticate`,
        withCredentials: true,
        responseType: 'json',
        data: values,
      });

      await Keychain.setGenericPassword(
        'accessToken',
        response.data.access_token,
        {service: 'accessService'},
      );

      await Keychain.setGenericPassword(
        'refreshToken',
        response.data.refresh_token,
        {service: 'refreshService'},
      );
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        dispatch(setLogin({name: 'mohamed'}));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValuesLogin = {
    email: '',
    password: '',
  };

  const styles = StyleSheet.create({
    // stylesheet is put inside the component because it's tracking the mode
    container: {
      backgroundColor: colors.main.backgroundColor,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    inputFieldsWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    linkText: {
      color: colors.main.buttonColor,
      fontSize: 15,
      fontWeight: 'bold',
      margin: 10,
    },
    linksWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      gap: 20,
    },
    textNotLinked: {
      color: mode == 'dark' ? 'white' : 'black',
      fontSize: 15,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={{flex: 1, margin: 0, padding: 0}}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          backgroundColor: colors.main.backgroundColor,
        }}>
        <View style={styles.container}>
          <InputTitle title="S'authentifier" />
          <Formik
            initialValues={initialValuesLogin}
            validationSchema={loginSchema} // we're using yup
            onSubmit={values => {
              authenticate(values);
            }}>
            {({
              values, // where we're getting all the value of the input fields
              errors,
              touched,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              isSubmitting,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputFieldsWrapper}>
                  <TextInput
                    name="email"
                    placeholder="Adresse e-mail"
                    keyboardType="email-address"
                    showLabel
                  />

                  <TextInput
                    mode="flat"
                    name="password"
                    placeholder="Choisissez un mot de passe"
                    showLabel
                    secureTextEntry={true}
                  />
                </View>

                <AuthButton handleSubmit={handleSubmit} label="Envoyer" />
              </>
            )}
          </Formik>
          <View style={styles.linksWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.textNotLinked}>
                Vous n'avez pas de compte ?{' '}
                <Text style={styles.linkText}>Inscrivez-vous</Text>{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.linkText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignIn;
