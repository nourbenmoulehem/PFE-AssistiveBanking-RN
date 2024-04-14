import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAddBeneficiaireMutation} from '../API/ClientApi';

// forms
import {Formik} from 'formik';
import * as yup from 'yup';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

// components
import TextInput from './TextInput';
import SendButton from './AuthButton';

interface Props {
  visible: boolean;
  hideDialog: () => void;
}

const AddBeneficiaire: React.FC<Props> = ({visible, hideDialog}) => {
  const {mode, user} = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);

  const [addBeneficiaire, {data, error}] = useAddBeneficiaireMutation();
  const [success, setSuccess] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  const styles = StyleSheet.create({
    container: {
      //flex: 1,
      //alignItems: 'center',
      padding: 20,
      backgroundColor: colors.main.backgroundColor,
    },
    title: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    inputFieldsWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    },
    fermerButton: {
      backgroundColor: colors.main.gaugeBG,
      borderRadius: 5,
      width: wp('25'),
      height: hp('7'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textFermer: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      fontSize: wp(4),
    },
    errorText: {
      color: 'red',
      fontSize: wp(4),
      fontWeight: 'bold',
    },
  });

  const onSubmit = async (values: {nom: string; rib: string}) => {
    try {
      const result = await addBeneficiaire({
        clientId: user?.clientId as number,
        beneficiaire: {nom: values.nom, rib: values.rib},
      }).unwrap();
      if (result) {
        // todo : show success message
        setIsError(false);
        setErrorText('');
        setIsSuccess(true);
        setSuccess(result.message);
      }
      // handle success
    } catch (error: any) {
      setIsSuccess(false);
      setSuccess('');
      setIsError(true);
      setErrorText(error.data);
      // handle error
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog} style={styles.container}>
        <Dialog.Title style={styles.title}>
          Ajouter un bénéficiaire
        </Dialog.Title>
        <Dialog.Content>
          <Formik
            initialValues={initialValues}
            validationSchema={AddBeneficiaireSchema} // we're using yup
            onSubmit={values => onSubmit(values)}>
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
            }) => (
              <>
                <View style={styles.inputFieldsWrapper}>
                  <TextInput
                    name="nom"
                    placeholder="nom de bénéficiaire"
                    showLabel
                  />

                  <TextInput
                    name="rib"
                    placeholder="RIB de bénéficiaire"
                    keyboardType="numeric"
                    showLabel
                  />

                  <SendButton
                    handleSubmit={handleSubmit}
                    label="Ajouter bénéficiaire"
                    accessibilityHint={
                      Object.keys(errors).length === 0
                        ? !touched.nom && !touched.rib
                          ? 'Vous devez entrer des données'
                          : 'Vos informations sont valides. Bienvenue !'
                        : 'Veuillez vérifier vos saisies'
                    }
                  />
                </View>
              </>
            )}
          </Formik>
          {isSuccess && (
            <Text style={{color: 'green', fontWeight: 'bold'}}>{success}</Text>
          )}
          {isError && <Text style={styles.errorText}>{errorText}</Text>}
        </Dialog.Content>
        <Dialog.Actions>
          <TouchableRipple
            style={styles.fermerButton}
            onPress={() => {
              hideDialog();
              setIsSuccess(false);
              setSuccess('');
              setIsError(false);
              setErrorText('');
            }}>
            <Text style={styles.textFermer}>Fermer</Text>
          </TouchableRipple>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddBeneficiaire;

const initialValues = {
  nom: '',
  rib: '',
};

const AddBeneficiaireSchema = yup.object().shape({
  nom: yup
    .string()
    .required('Le nom est requis')
    .matches(
      /^[A-Za-z]+$/,
      'Le nom doit contenir uniquement des caractères alphabétiques',
    ),
  rib: yup
    .string()
    .required('Le RIB est requis')
    .matches(/^[0-9]+$/, 'Le RIB doit contenir uniquement des chiffres')
    .length(20, 'Le RIB doit être exactement de 20 chiffres'),
});
