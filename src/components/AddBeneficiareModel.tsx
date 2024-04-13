import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Paragraph, Portal, Text,  TouchableRipple } from 'react-native-paper';

import {useAddBeneficiaireMutation} from '../API/ClientApi';

// forms
import {Formik} from 'formik';
import * as yup from 'yup';


// components
import TextInput from "./TextInput";
import SendButton from './AuthButton';


interface Props  {
  visible: boolean;
  hideDialog: () => void;
};

const AddBeneficiaire: React.FC<Props> = ({visible, hideDialog}) => {
  const [addBeneficiaire, { data, error }] = useAddBeneficiaireMutation();
  const [success, setSuccess] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  console.log("🚀 ~ data:", data)
  console.log("🚀 ~ error:", error)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      // backgroundColor: colors.main.backgroundColor,
    },

    inputFieldsWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    },
  });

  const onSubmit = async (values: { nom: string; rib: string; }) => {
    try {
      const result = await addBeneficiaire({ clientId: 1, beneficiaire: { nom: values.nom, rib: values.rib } }).unwrap();
      console.log("🚀 ~ onSubmit ~ result:", result)
      if(result) {
        // todo : show success message
        setIsSuccess(true)
        setSuccess(result.message)
      }
      // handle success
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      // handle error
    }
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Ajouter un bénéficiaire</Dialog.Title>
        <Dialog.Content  >
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
            {isSuccess && <Text style={{color: 'green', fontWeight: 'bold' }}>{success}</Text>}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>Fermer</Button>
          
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
  nom: yup.string()
    .required('Le nom est requis')
    .matches(/^[A-Za-z]+$/, 'Le nom doit contenir uniquement des caractères alphabétiques'),
  rib: yup.string()
    .required('Le RIB est requis')
    .matches(/^[0-9]+$/, 'Le RIB doit contenir uniquement des chiffres')
    .length(20, 'Le RIB doit être exactement de 20 chiffres'),
});