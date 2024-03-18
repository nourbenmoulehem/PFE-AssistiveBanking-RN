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

// formik
import {Formik} from 'formik';
// yup
import {ForgotPasswordSchema} from '../../constants/yupValidations';

// components
import TextInput from '../../components/TextInput';
import AuthButton from '../../components/AuthButton';
import InputTitle from '../../components/InputTitle';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {tokens} from '../../assets/palette';
import Modal from '../../components/Modal';

// axios
import axios from 'axios';

// env variables
import {API_BASE_URL} from '@env';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';



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
  const [loading, setLoading] = useState(false);

  
  const onClose = () => setVisible(false);

  const ForgotPasswordApi = async (values: FormValues) => {
    try {
      setVisible(true);
      setLoading(true);
      const response = await axios({
        method: 'post',
        url: `${process.env.API_BASE_URL}/api/v1/auth/forgot-password`,
        withCredentials: true,
        responseType: 'json',
        data: values,
      });

      if(response.status === 200) {
        setLoading(false);
        setMessage(response.data);
      }

    } catch (error: any) {
      // console.log("🚀 ~ ForgotPasswordApi ~ error:", error.response.data)
      setLoading(false);
      setMessage(error.response.data);
      
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
          validationSchema={ForgotPasswordSchema}
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
      <Modal visible={visible} isLoading={loading} error={message} onClose={onClose}/>
    </View>
  );
};

export default ForgotPassword;

// yup validation schema




