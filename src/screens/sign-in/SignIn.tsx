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
import {TextInput, HelperText} from 'react-native-paper';
import {UseSelector, useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {tokens} from '../../assets/palette';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

// forms
import {Formik} from 'formik';
import * as yup from 'yup';

// axios
import axios from 'axios';

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'), //validate for an email
  password: yup.string().required('required'),
});

//type safety
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const SignIn = ({navigation}: HomeProps) => {
  const {isLoggedIn, mode} = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);

  const validationSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required'),
  });

  type FormValues = {
    email: string;
    password: string;
  };

  
  // const authenticate = async (values: FormValues) => {
  //   const response = await axios({
  //     method: 'post',
  //     url: `${process.env.API_BASE_URL}/api/v1/auth/authenticate`,
  //     withCredentials: true,
  //     responseType: 'json',
  //   })
  //   .then(response => {
  //       console.log(response.data);
  //     })
  //   .catch(error => {
  //       console.log(error);
  //     });
  // };

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
    submitButton: {
      backgroundColor: colors.main.buttonColor,
      padding: 10,
      margin: 30,
      height: 60,
      width: 275,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
    },
    TextButton: {
      color: colors.main.backgroundColor,
      fontSize: 20,
      fontWeight: 'bold',
    },
    inputWrapper: {
      width: 340,
      marginBottom: 20,
    },
    inputFieldsWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentStyle: {
      backgroundColor: 'white',
    },
    outlineStyle: {
      borderColor: colors.main.buttonColor,
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
    <SafeAreaView style={styles.container}>
      <View>
        <Formik
          initialValues={initialValuesLogin}
          validationSchema={validationSchema} // we're using yup
          onSubmit={values => {
            console.log(values);
            // authenticate(values);
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
                <View style={styles.inputWrapper}>
                  <KeyboardAvoidingView behavior="padding">
                    <TextInput
                      mode="flat"
                      label="email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder="email"
                      value={values.email}
                      keyboardType="email-address"
                      contentStyle={styles.contentStyle}
                      outlineStyle={styles.outlineStyle}
                    />
                  </KeyboardAvoidingView>
                  {touched.email && errors.email && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.email}
                    </Text>
                  )}
                </View>

                <View style={styles.inputWrapper}>
                  <KeyboardAvoidingView behavior="position">
                    <TextInput
                      mode="flat"
                      label="Password"
                      onChangeText={handleChange('password')} // to tell that we're changing the value of password
                      secureTextEntry
                      onChange={() => handleChange('password')}
                      placeholder="password"
                      onBlur={handleBlur('password')}
                      value={values.password}
                      contentStyle={styles.contentStyle}
                      outlineStyle={styles.outlineStyle}
                      outlineColor={colors.main.buttonColor}
                    />
                  </KeyboardAvoidingView>

                  {touched.password && errors.password && (
                    <Text style={{fontSize: 15, color: 'red', marginTop: 10}}>
                      {errors.password}
                    </Text>
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                disabled={!isValid || isSubmitting}
                onPress={() => handleSubmit()} // handlesubmit will collect all the values and send it to onSubmit itself
              >
                <Text style={styles.TextButton}>Connexion</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
      <View style={styles.linksWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.textNotLinked}>
            Vous n'avez pas de compte ?{' '}
            <Text style={styles.linkText}>Inscrivez-vous</Text>{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkText}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
