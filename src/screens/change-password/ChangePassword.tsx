import React, {useEffect, useState} from 'react'; // Import the missing useState hook
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {TouchableRipple, Icon} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useGetOperationsQuery} from '../../API/ClientApi';

// components
import TextInput from '../../components/TextInput';
import AuthButton from '../../components/AuthButton';
import InputTitle from '../../components/InputTitle';
import Modal from '../../components/Modal';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {tokens} from '../../assets/palette';

import axios from 'axios';
import {API_BASE_URL} from '@env';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Formik} from 'formik';
// yup validation schema
import {ChangePasswordSchema} from '../../constants/yupValidations';
import {current} from '@reduxjs/toolkit';

const initialValues = {
  currentPassword: '',
  newPassword: '',
  passwordConfirm: '',
};

const Notification = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onClose = () => setVisible(false);

  const {mode} = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);

  type FormValues = {
    currentPassword: string;
    newPassword: string;
    passwordConfirm: string;
  };

  const changePassword = async (values: FormValues) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${API_BASE_URL}/api/v1/auth/change-password`,
        withCredentials: true,
        responseType: 'json',
        data: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.passwordConfirm,
          clientId: 1,
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
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.main.backgroundColor,
    },
    libelle: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      textAlign: 'left',
      fontSize: wp(6),
      marginBottom: wp(3),
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary[500],
    },
  });

  return (
    <View style={styles.container}>
      <View style={{flex: 1, margin: 0, padding: 0}}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          style={{flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            backgroundColor: colors.main.backgroundColor,
          }}>
          <InputTitle title="Changer votre mot de passe" />
          <Formik
            initialValues={initialValues}
            validationSchema={ChangePasswordSchema}
            validateOnChange={true}
            style={styles.container}
            onSubmit={values => {
              changePassword(values);
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
                    name="currentPassword"
                    placeholder="Votre mot de passe actuel"
                    secureTextEntry
                    showLabel
                  />
                  <TextInput
                    name="newPassword"
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
    </View>
  );
};

export default Notification;
