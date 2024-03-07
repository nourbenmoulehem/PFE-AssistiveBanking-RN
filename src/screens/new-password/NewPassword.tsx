import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useRef} from 'react';

import {Formik} from 'formik';
import * as yup from 'yup';

// components
import TextInput from '../../components/TextInput';
import AuthButton from '../../components/AuthButton';
import InputTitle from '../../components/InputTitle';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {tokens} from '../../assets/palette';

// axios
import axios from 'axios';

// env variables
import {API_BASE_URL} from '@env';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const initialValues = {
  password: '',
  passwordConfirm: '',
};

const ForgotPassword = () => {
  const {mode} = useSelector((state: RootState) => state.global);

  const colors = tokens(mode);

  type FormValues = {
    password: string;
    passwordConfirm: string;
  };
  
  const resetPassword = async (values: FormValues) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.API_BASE_URL}/api/v1/auth/create-new-password`,
        withCredentials: true,
        responseType: 'json',
        data: values,
      });

      
    } catch (error) {
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: colors.main.backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary[500],
    },
  });
  //behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  return (
    <View style={{flex: 1, margin: 0, padding: 0}}>
      

    <KeyboardAwareScrollView
      enableOnAndroid={true}
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1, padding: 20, backgroundColor: colors.main.backgroundColor}}
      
      >
        <InputTitle title="Creez un nouveau mot de passe" />
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        validateOnChange={true}
        style={styles.container}
        onSubmit={values => {
          console.log(values);
          resetPassword(values);
        }}>
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <>
            <View style={styles.container}>
              <TextInput
                name="password"
                placeholder="Votre nouveau mot de passe"
                secureTextEntry
                showLabel

              />
              <TextInput
                name="passwordConfirm"
                placeholder="Confirmez votre nouveau mot de passe"
                secureTextEntry
                showLabel

              />
              <AuthButton handleSubmit={handleSubmit} label="Envoyer" accessibilityHint='envoyer votre nouveau mot de passe'/>
            </View>
            
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
    </View> 
  );
};

export default ForgotPassword;

// yup validation schema
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
const checkoutSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      passwordRegExp,
      'Le mot de passe doit contenir au moins 5 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
    )
    .min(5, 'Le mot de passe doit avoir exactement 5 caractères')
    .required('Ce champ est obligatoire'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre')
    .matches(
      passwordRegExp,
      'Le mot de passe doit contenir au moins 5 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
    )
    .min(5, 'Le mot de passe doit avoir exactement 5 caractères')
    .required('Ce champ est obligatoire'),
});
