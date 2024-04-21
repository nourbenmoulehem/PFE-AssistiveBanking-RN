import React, { useEffect, useState } from 'react'; // Import the missing useState hook
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { TextInput, TouchableRipple, Icon } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import {
  useGetOperationsQuery,
} from '../../API/ClientApi';
import { tokens } from '../../assets/palette';
import axios from 'axios';
import { Formik } from 'formik';
import { reclamationSchema } from '../../constants/yupValidations';
import CustomDropdownComponent from '../../components/CustomDropdown';
import { objet_reclamation } from '../../constants/items';


const Reclamation = () => {
  const { mode, user } = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);
  const initialValues = { id: user?.clientId, libelle: '', description: '' };
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
          </View>
        )}
      </Formik>

    </View>
  );
};

export default Reclamation;
