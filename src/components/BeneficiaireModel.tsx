import * as React from 'react';
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
import {
  useUpdateBeneficiaireMutation,
  useDeleteBeneficiaireMutation,
} from '../API/ClientApi';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

// forms
import {Formik} from 'formik';
import * as yup from 'yup';

// components
import SendButton from './AuthButton';
import TextInput from './TextInput';
import {StyleSheet, View} from 'react-native';

interface Props {
  visible: boolean;
  hideDialog: () => void;
  item: {nom: string; rib: string; id: number};
  type: 'delete' | 'edit';
}

const Confirmation: React.FC<Props> = ({visible, hideDialog, item, type}) => {
  const [updateBeneficiaire, {data, error}] = useUpdateBeneficiaireMutation();
  const [deleteBeneficiaire, {data: deleteData, error: deleteError}] =
    useDeleteBeneficiaireMutation();
  const [success, setSuccess] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const {mode, user} = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);

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
    dialogContent: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: wp('9'),
    },
    inputFieldsWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    },
    actionButton: {
      //padding: 10,
      backgroundColor: colors.main.new,
      borderRadius: 5,
      width: wp('50'),
      height: hp('7'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textSupprimer: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      fontSize: 20,
    },
    info: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: wp('3'),
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
  });

  const initialValues = {
    nom: item.nom,
  };

  const onSubmitUpdate = async (values: {nom: string}) => {
    try {
      const result = await updateBeneficiaire({
        clientId: 1,
        beneficiaire: {id: item.id, nom: values.nom, rib: item.rib},
      }).unwrap();
      if (result) {
        // todo : show success message
        setIsSuccess(true);
        setSuccess(result.message);
      }
      // handle success
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      // handle error
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteBeneficiaire({
        clientId: 1,
        beneficiaire: {id: item.id, nom: item.nom, rib: item.rib},
      }).unwrap();
      if (result) {
        // todo : show success message
        setIsSuccess(true);
        setSuccess(result.message);
      }
      // handle success
    } catch (error: any) {
      // handle error
      setSuccess(error.message);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog} style={styles.container}>
        {type === 'delete' ? (
          <>
            <Dialog.Title style={styles.title}>
              Êtes-vous sûr(e) de vouloir supprimer cette personne ?
            </Dialog.Title>
            <Dialog.Content style={styles.dialogContent}>
              <View style={styles.info}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.main.fontColor,
                  }}>
                  Nom: {item.nom}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: colors.main.fontColor,
                  }}>
                  Rib: {item.rib}
                </Text>
              </View>

              <TouchableRipple
                style={styles.actionButton}
                onPress={handleDelete}>
                <Text style={styles.textSupprimer}>Supprimer</Text>
              </TouchableRipple>

              {isSuccess && (
                <Text style={{color: 'green', fontWeight: 'bold'}}>
                  {success}
                </Text>
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <TouchableRipple
                style={styles.fermerButton}
                onPress={() => {
                  hideDialog();
                  setIsSuccess(false);
                  setSuccess('');
                }}>
                <Text style={styles.textFermer}>Fermer</Text>
              </TouchableRipple>
            </Dialog.Actions>
          </>
        ) : (
          <>
            <Dialog.Title style={styles.title}>
              Modifier cette personne avec le RIB {item.rib} ?
            </Dialog.Title>
            <Dialog.Content>
              <Formik
                initialValues={initialValues}
                validationSchema={UpdateBeneficiaireSchema} // we're using yup
                onSubmit={values => onSubmitUpdate(values)}>
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

                      <SendButton
                        handleSubmit={handleSubmit}
                        label="Modifier le nom"
                        accessibilityHint={
                          Object.keys(errors).length === 0
                            ? !touched.nom
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
                <Text style={{color: 'green', fontWeight: 'bold'}}>
                  {success}
                </Text>
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <TouchableRipple
                style={styles.fermerButton}
                onPress={() => {
                  hideDialog();
                  setIsSuccess(false);
                  setSuccess('');
                }}>
                <Text style={styles.textFermer}>Fermer</Text>
              </TouchableRipple>
            </Dialog.Actions>
          </>
        )}
      </Dialog>
    </Portal>
  );
};

export default Confirmation;

const UpdateBeneficiaireSchema = yup.object().shape({
  nom: yup
    .string()
    .required('Le nom est requis')
    .matches(
      /^[A-Za-z]+$/,
      'Le nom doit contenir uniquement des caractères alphabétiques',
    ),
});
