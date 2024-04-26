import React, { useEffect, useState } from 'react'; // Import the missing useState hook
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal
} from 'react-native';
import { TextInput } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import {
  useSendReclamationMutation,
} from '../../API/ClientApi';
import { tokens } from '../../assets/palette';
import { Formik } from 'formik';
import { reclamationSchema } from '../../constants/yupValidations';
import CustomDropdownComponent from '../../components/CustomDropdown';
import { objet_reclamation } from '../../constants/items';


const Reclamation = () => {
  const { mode, user } = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);
  const initialValues = { id: user?.clientId, libelle: '', description: '' };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [sendReclamation] = useSendReclamationMutation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.main.backgroundColor,
    },
    miniContainer: {
      flex: 1,
      borderRadius: wp(4),
      // backgroundColor: colors.background[400],
    },
    libelle: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      textAlign: 'left',
      fontSize: wp(6),
      marginBottom: wp(3)
    },
    inputStyle: {
      alignSelf: 'center',
      width: wp(89),
      height: hp(30),
      fontSize: wp(5),
      fontWeight: 'bold',
      marginVertical: wp(0),
      //  borderRadius: wp(4),
      paddingTop: wp(1),
      paddingHorizontal: wp(5),
      backgroundColor: colors.main.rectangleColor,
    },
    title: {
      fontSize: wp(6),
      fontWeight: 'bold',
      color: colors.accent[500],
      marginVertical: wp(2),
      paddingHorizontal: wp(5),
    },
    btnContainer: {
      marginTop: hp(4),
      padding: wp(2),
      width: wp(89),
      height: hp(9),
      flexDirection: 'row',
      // justifyContent: 'space-between',

      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: colors.accent[500],
      borderRadius: wp(4),
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: hp('3%')
    },
    modalView: {
      margin: wp('5%'),
      backgroundColor: colors.main.backgroundColor,
      borderRadius: wp('5%'),
      padding: wp('4%'),
      alignItems: "center",
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: wp('1%'),
      elevation: 5
    },
    button: {
      borderRadius: wp('5%'),
      padding: wp('2.5%'),
      elevation: 2
    },
    buttonClose: {
      backgroundColor: colors.primary[500],
    },
    textStyle: {
      color: colors.main.fontColor,
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: wp('4%'),
      textAlign: "center",
      fontSize: wp(4),
      fontWeight: 'bold',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      
    },

  });

  return (
    <View style={styles.container}>
      <Text
        style={styles.libelle}>
        Envoyer une réclamation à nos assistants
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={reclamationSchema}
        onSubmit={(values) => {
          console.log(values);
          sendReclamation({ id: initialValues.id, objet: values.libelle, description: values.description })
            .then((response) => {
              // This function will be called when the mutation completes successfully
              setModalMessage('Reclamation envoyqée avec succès!');
              setModalVisible(true);
            })
            .catch((error) => {
              // This function will be called if there was an error sending the reclamation
              setModalMessage('Erreur: ' + error.message);
              setModalVisible(true);
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors }) => (
          <View style={styles.miniContainer}>
            <Text style={styles.title}>Objet Reclamtion</Text>
            <CustomDropdownComponent
              data={objet_reclamation}
              bgColor={colors.main.rectangleColor}
              iconColor={colors.primary[200]}
              textColor={colors.main.fontColor}
              searchColor={colors.background[300]}
              iconSource='alert-box-outline'
              placeholder='Objet de la réclamation...'
              accessibilityLabel='choisir l objet de la réclamation'
              showSearch={false}
              onValueChange={(value) => {
                console.log('Dropdown value:', value);
                setFieldValue('libelle', value);
              }}
            />
            {errors.libelle && <Text>{errors.libelle}</Text>}
            <Text style={styles.title}>Description</Text >
            <TextInput
              mode='outlined'
              placeholder='Description de la réclamation...'
              placeholderTextColor={colors.background[700]}
              style={styles.inputStyle}
              outlineColor={colors.primary[200]}
              activeOutlineColor={colors.secondary[200]}
              textColor={colors.main.fontColor}
              outlineStyle={{ borderRadius: wp(4), borderColor: 'transparent' }}
              contentStyle={{ backgroundColor: colors.main.rectangleColor }}
              accessibilityLabel='ecrire la description de la réclamation'
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              multiline={true}
              numberOfLines={10}
            />
            {errors.description && <Text>{errors.description}</Text>}
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
                console.log('errors', errors);
              }}
            >
              <View style={styles.btnContainer}>
                <Text
                  style={{
                    color: colors.main.fontColor,
                    fontSize: wp(6),
                    fontWeight: 'bold',
                    marginEnd: wp(3),
                    textAlign: 'center',
                  }}
                >
                  Envoyer
                </Text>
              </View>
            </TouchableOpacity>
            <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.modalOverlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </Modal>
          </View>
        )}
      </Formik>

    </View>
  );
};

export default Reclamation;


