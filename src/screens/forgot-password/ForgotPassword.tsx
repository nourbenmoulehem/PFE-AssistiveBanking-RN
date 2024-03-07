import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useRef, useState} from 'react';

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

import Modal from '../../components/Modal';

const initialValues = {
  email: '',
  cin: '',
  birthday: '',
  cardNumber: '',
  phoneNumber: '',
};

type FormValues = {
  email: string;
  cin: string;
  birthday: string;
  cardNumber: string;
  phoneNumber: string;
};

const ForgotPassword = () => {
  const {mode} = useSelector((state: RootState) => state.global);

  const colors = tokens(mode);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  
  const onClose = () => setVisible(false);

  const ForgotPasswordApi = async (values: FormValues) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.API_BASE_URL}/api/v1/auth/forgot-password`,
        withCredentials: true,
        responseType: 'json',
        data: values,
      });

      setMessage(response.data);
      setVisible(true);
      
    } catch (error: any) {
      console.log("🚀 ~ ForgotPasswordApi ~ error:", error.response.data)
      setMessage(error.response.data);
      setVisible(true);
      
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
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          backgroundColor: colors.main.backgroundColor,
        }}>
        <InputTitle title="Mot de passe oublié ?" />
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          validateOnChange={true}
          style={styles.container}
          onSubmit={values => {
            console.log(values);
            ForgotPasswordApi(values);
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
                  name="email"
                  placeholder="Adresse e-mail"
                  keyboardType="email-address"
                  showLabel
                />
                <TextInput
                  name="birthday"
                  placeholder="Votre date de naissance"
                  keyboardType="number-pad"
                  showLabel
                />
                <TextInput
                  name="cin"
                  placeholder="CIN"
                  keyboardType="numeric"
                  showLabel
                />
                <TextInput
                  name="phoneNumber"
                  placeholder="Numéro de téléphone"
                  keyboardType="numeric"
                  showLabel
                />
                <TextInput
                  name="cardNumber"
                  placeholder="4 derniers chiffres de carte"
                  keyboardType="numeric"
                  showLabel
                />
                <AuthButton
                  handleSubmit={handleSubmit}
                  label="Envoyer"
                  accessibilityHint={
                    Object.keys(errors).length === 0
                      ? !touched.email &&
                        !touched.birthday &&
                        !touched.cin &&
                        !touched.phoneNumber &&
                        !touched.cardNumber
                        ? 'Vous devez entrer des données'
                        : 'Vos informations sont valides. Vous pouvez réinitialiser votre mot de passe'
                      : 'Veuillez vérifier vos saisies'
                  }
                />
              </View>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <Modal visible={visible} error={message} onClose={onClose}/>
    </View>
  );
};

export default ForgotPassword;

// yup validation schema
const cinRegExp = /^[0-9]{8}$/;
const phoneRegExp = /^[0-9]{8}$/;
const birthdayRegExp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const lastFourDigitRegExp = /^\d{4}$/;
const checkoutSchema = yup.object().shape({
  email: yup
    .string()
    .email('Adresse e-mail invalide')
    .required('Ce champ est obligatoire'),
  birthday: yup
    .string()
    .matches(
      birthdayRegExp,
      'La date de naissance doit être au format YYYY-MM-DD',
    )
    .required('Ce champ est obligatoire')
    .test(
      'is-future-date',
      'La date de naissance ne peut pas être une date future',
      value => {
        const today = new Date();
        const birthDate = new Date(value);
        return birthDate <= today;
      },
    ),
  cin: yup
    .string()
    .matches(cinRegExp, 'Format CIN invalide. Doit contenir 8 chiffres.')
    .required('Ce champ est obligatoire'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Numéro de téléphone invalide')
    .required('Ce champ est obligatoire'),
  cardNumber: yup
    .string()
    .matches(lastFourDigitRegExp, 'Dernier 4 chiffres de votre carte.')
    .required('Ce champ est obligatoire'),
});
