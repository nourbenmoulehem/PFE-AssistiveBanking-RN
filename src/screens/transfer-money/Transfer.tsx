import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { useGetBeneficiairesQuery, useSendTransferMutation } from '../../API/ClientApi';
import { tokens } from '../../assets/palette';
import CustomDropdownComponent from '../../components/CustomDropdown';
import { Formik } from 'formik';
import { transferMoneySchema } from '../../constants/yupValidations';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


// components
import ConfirmationModel from '../../components/ConfirmationTransferModel';

const Transfer = () => {
  const { mode, user } = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);
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
    libelle: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      textAlign: 'left',
      fontSize: wp(8),
      marginBottom: wp(3),
      marginTop: wp(3),
    },
    inputStyle: {
      alignSelf: 'center',
      width: wp(89),
      height: hp(9),
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
  }

  );
  // confirmation model related stuff
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { data } = useGetBeneficiairesQuery(user?.clientId);
  const [beneficiaires, setBeneficiaires] = useState([] as any[]);

  useEffect(() => {
    if (data && data[0]?.client?.beneficiairesList) {
      setBeneficiaires(data[0].client.beneficiairesList);
    }
  }, [data]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [sendTransfer,{ error }] = useSendTransferMutation();
  const transformedData = beneficiaires.map(item => ({ label: item.nom, value: item.rib, itemAccessibilityLabelField: `Beneficiary ${item.nom} with RIB ${item.rib}`, }));
  const initialValues = { id: user?.clientId, rib: '', montant: '', motif: '', };
  
  

  function hideDialog(): void {
    setVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.libelle}>Effectuer un virement</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={transferMoneySchema}
        onSubmit={(values,errors) => {
          console.log(values);
          console.log('errors', errors);
          setLoading(true);
          setVisible(true);
          sendTransfer({
            id: initialValues.id,
            rib: values.rib,
            motif: values.motif,
            montant: values.montant
          }).then((response:any) => {
            console.log('API response:', response);
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            setLoading(false);
            setMessage(response.data);
            setVisible(true);
            
          })
          .catch(error => {
            console.log('====================================');
            console.log('error');
            console.log('====================================');
            console.log('API error:', error.response.data.error.message);
            // setMessage(error.body);
            setLoading(false);
            setMessage(error.response.data);
            // if(error.status) {
            //   console.log('====================================');
            //   console.log(error.status);
            //   console.log('====================================');
            // }
            console.log('====================================');
            console.log(error.response);
            console.log('====================================');
            // Check if error.response exists
            // if (error.response) {
            //   // Access the error message from the server's response
            //   const serverErrorMessage = error.response.data;
            //   console.log("🚀 ~ Transfer ~ serverErrorMessage:", serverErrorMessage)
            //   setMessage(serverErrorMessage);
            // } else {
            //   // If error.response doesn't exist, use error.message
            //   setMessage(error.message);
            // }
          });
          ;
          // }).then((response: any) => {
          //   console.log('Response:', response); 
          //   if ('error' in response) {
          //   setModalMessage(response.error.message);
          //   setModalVisible(true);}
          //   else {
          //     setModalMessage('Virement effectue avec succes');
          //     setModalVisible(true);
          //   }
          // });
          
          
        }}>
        {({
          values, // where we're getting all the value of the input fields
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          
          console.log('errors',errors);
          
          return (

          <>

            <View style={styles.miniContainer}>
              <Text style={styles.title}>Beneficiaires</Text>
              <CustomDropdownComponent
                data={transformedData}
                bgColor={colors.main.rectangleColor}
                iconSource='account-circle'
                iconColor={colors.primary[200]}
                textColor={colors.main.fontColor}
                searchColor={colors.background[300]}
                placeholder='Selectionnez le beneficiaire'
                accessibilityLabel='choisir le beneficiaire'
                onValueChange={(value) => {
                  console.log('Dropdown value:', value); 
                  setFieldValue('rib', value);
                }}
              />
              <Text style={styles.title}>Montant</Text >
              <TextInput
                mode='outlined'
                placeholder='Inserez Montant'
                placeholderTextColor={colors.background[700]}
                style={styles.inputStyle}
                outlineColor={colors.primary[200]}
                activeOutlineColor={colors.secondary[200]}
                textColor={colors.main.fontColor}
                outlineStyle={{ borderRadius: wp(4), borderColor: 'transparent' }}
                contentStyle={{ backgroundColor: colors.main.rectangleColor }}
                keyboardType='numeric'
                accessibilityLabel='inserez le montant a transferer'
                onChangeText={handleChange('montant')}
                onBlur={handleBlur('montant')}
                value={values.montant}
              />
              {errors.montant && <Text>{errors.montant}</Text>}
              <Text style={styles.title}>Motif</Text >
              <TextInput
                mode='outlined'
                placeholder='Inserez Motif'
                placeholderTextColor={colors.background[700]}
                style={styles.inputStyle}
                outlineColor={colors.primary[200]}
                activeOutlineColor={colors.secondary[200]}
                textColor={colors.main.fontColor}
                outlineStyle={{ borderRadius: wp(4), borderColor: 'transparent' }}
                contentStyle={{ backgroundColor: colors.main.rectangleColor }}
                accessibilityLabel='Inserez le motif du virement'
                onChangeText={handleChange('motif')}
                onBlur={handleBlur('motif')}
                value={values.motif}
              />
              {errors.motif && <Text>{errors.motif}</Text>}
              <TouchableOpacity
              onPress={() => {
                handleSubmit();
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
            </View>
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
          </>
        ); 
      }}
      </Formik>

      <ConfirmationModel
        visible={visible}
        hideDialog={hideDialog}
        message={message}
        loading={loading}
      />

    </View>
  );
};

export default Transfer;
