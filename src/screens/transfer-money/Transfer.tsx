import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Button, Pressable } from 'react-native';
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
const Transfer = () => {
  const { mode, user } = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);

  const { data } = useGetBeneficiairesQuery(user?.clientId);
  const [beneficiaires, setBeneficiaires] = useState([] as any[]);

  useEffect(() => {
    if (data && data[0]?.client?.beneficiairesList) {
      setBeneficiaires(data[0].client.beneficiairesList);
    }
  }, [data]);

  //const [sendTransfer, {data, error}] = useSendTransferMutation();
  const [sendTransfer] = useSendTransferMutation();
  const transformedData = beneficiaires.map(item => ({ label: item.nom, value: item.rib, itemAccessibilityLabelField: `Beneficiary ${item.nom} with RIB ${item.rib}`, }));
  const initialValues = { id: user?.clientId, rib: '', montant: '', motif: '', };
  
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      width: wp(89),
      borderRadius: wp(4),
      backgroundColor: colors.background[200],
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalText: {
      marginBottom: wp(5),
      fontSize: wp(6),
      fontWeight: 'bold',
      color: colors.main.fontColor,
      justifyContent: 'space-between',
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

  return (
    <View style={styles.container}>
      <Text style={styles.libelle}>Effectuer un virement</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={transferMoneySchema}
        onSubmit={(values,errors) => {
          console.log(values);
          console.log('errors', errors);
          sendTransfer({
            id: initialValues.id,
            rib: values.rib,
            motif: values.motif,
            montant: values.montant
          }).then(response => {
            console.log('API response:', response);
          })
          .catch(error => {
            console.log('API error:', error);
          });
          ;
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
              {/* <Pressable
                onPress={() => handleSubmit()}
                accessibilityRole="button"
                accessibilityLabel="confirmez le virement"
                accessibilityHint="Appuyer pour confirmer le virement"
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : colors.accents[500],
                  },
                  styles.btnContainer,
                ]}
              >
                <Text
                  style={{
                    color: colors.main.fontColor,
                    fontSize: wp(6),
                    fontWeight: 'bold',
                    marginEnd: wp(3),
                    textAlign: 'center',
                  }}
                >
                  Confirmer Virement
                </Text>
              </Pressable> */}
              <Button
                accessibilityLabel="confirmez le virement"
                title="Confirmer Virement"
                color={colors.accent[500]}
                onPress={() => {
                  console.log('values', values);
                  console.log('values', values.rib, values.motif, values.montant);
                  
                  handleSubmit();
                }}
              />
            </View>
          </>
        ); 
      }}
      </Formik>

    </View>
  );
};

export default Transfer;
