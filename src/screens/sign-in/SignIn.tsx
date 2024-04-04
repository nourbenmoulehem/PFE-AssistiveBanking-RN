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
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';

// components
import TextInput from '../../components/TextInput';
import AuthButton from '../../components/AuthButton';
import InputTitle from '../../components/InputTitle';
import NavigationLink from '../../components/NavigationLink';

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
import Modal from '../../components/Modal';

// axios
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

axios.defaults.withCredentials = true;

//type safety
type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: SignInProps) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const {isLoggedIn, mode, user} = useSelector(
    (state: RootState) => state.global,
  );

  // testing purposes, need to be deleted later
  const getCredentials = async () => {
    const credentials = await Keychain.getGenericPassword();
  };
  getCredentials();
  // testing purposes, need to be deleted later

  const colors:any = tokens(mode); // get the color palette based on the mode
  const dispatch = useDispatch();

  type FormValues = {
    email: string;
    password: string;
  };

  const authenticate = async (values: FormValues) => {
    try {
      const response = await axios({
        method: 'post',
        url: `http://192.168.84.48:5001/api/v1/auth/authenticate`,
        withCredentials: true,
        responseType: 'json',
        data: {
          email: values.email.toLowerCase(), // we're making sure the email is lowercase
          password: values.password,
        },
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
      const accessCredentials = await Keychain.getGenericPassword({
        service: 'accessService',
      });
      const refreshCredentials = await Keychain.getGenericPassword({
        service: 'refreshService',
      });

      if (accessCredentials && refreshCredentials) {
        dispatch(setLogin({name: 'mohamed'}));
      }
    } catch (error: any) {
      setVisible(true);
      console.log('error', error);
      setMessage(error.response.data);
    }
  };

  const onClose = () => setVisible(false); // close the modal

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

    linksWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      gap: 20,
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

                <AuthButton
                  handleSubmit={handleSubmit}
                  label="Envoyer"
                  accessibilityHint={
                    Object.keys(errors).length === 0
                      ? !touched.email && !touched.password
                        ? 'Vous devez entrer des données'
                        : 'Vos informations sont valides. Bienvenue !'
                      : 'Veuillez vérifier vos saisies'
                  }
                />
              </>
            )}
          </Formik>
          <View style={styles.linksWrapper}>
            <NavigationLink
              navigation={navigation}
              navigationTarget="SignUp"
              text="Vous n'avez pas de compte ?"
              linkText="Inscrivez-vous"
            />
            <NavigationLink
              navigation={navigation}
              navigationTarget="ForgotPassword"
              linkText="Mot de passe oublié ?"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Modal visible={visible} error={message} onClose={onClose} />
    </View>
  );
};

export default SignIn;
