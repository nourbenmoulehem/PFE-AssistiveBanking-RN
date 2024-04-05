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
// yup validation schema
import {NewPasswordSchema} from '../../constants/yupValidations';

// components
import TextInput from '../../components/TextInput';
import AuthButton from '../../components/AuthButton';
import InputTitle from '../../components/InputTitle';
import Modal from '../../components/Modal';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {tokens} from '../../assets/palette';

// axios
import axios from 'axios';

// env variables
import {API_BASE_URL} from '@env';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useRoute} from '@react-navigation/native';

const initialValues = {
  password: '',
  passwordConfirm: '',
};

const ForgotPassword = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onClose = () => setVisible(false);

  const {mode} = useSelector((state: RootState) => state.global);

  const colors:any = tokens(mode);

  const route = useRoute();
  const {token} = route.params as {token?: string};
  console.log('🚀 ~ ForgotPassword ~ token:', token);

  type FormValues = {
    password: string;
    passwordConfirm: string;
  };

  const resetPassword = async (values: FormValues) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.API_BASE_URL}/api/v1/auth/new-password`,
        withCredentials: true,
        responseType: 'json',
        data: {
          ...values,
          token,
        },
      });
      if (response.status === 200) {
        setLoading(false);
        setVisible(true);
        setMessage(response.data);
      }
    } catch (error: any) {
      setLoading(false);
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
        <InputTitle title="Creez un nouveau mot de passe" />
        <Formik
          initialValues={initialValues}
          validationSchema={NewPasswordSchema}
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
                <AuthButton
                  handleSubmit={handleSubmit}
                  label="Envoyer"
                  accessibilityHint="envoyer votre nouveau mot de passe"
                />
              </View>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <Modal
        visible={visible}
        isLoading={loading}
        error={message}
        onClose={onClose}
      />
    </View>
  );
};

export default ForgotPassword;
