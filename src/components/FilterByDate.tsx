import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//forms
import {Formik} from 'formik';
import * as Yup from 'yup';

// redux
import { useSelector } from 'react-redux';
import {RootState} from '../context/store';
import { tokens } from '../assets/palette';

const initialValues = {
  startDate: '',
  endDate: '',
};

interface FilterByDateProps {
  onDatesSelected: (startDate: string, endDate: string) => void;
  resetOperations: () => void;
}

const FilterByDate: React.FC<FilterByDateProps> = ({
  onDatesSelected,
  resetOperations,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentField, setCurrentField] = useState<string>('');

  const showDatePicker = (field: string) => {
    setCurrentField(field);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    hideDatePicker();
  };

  const reset = () => {
    resetOperations();
  };
  const {mode} = useSelector((state: RootState) => state.global);
  const colors:any = tokens(mode);

  const styles = StyleSheet.create({
    inputField: {
      alignSelf: 'center',
      width: wp(89),
      height: hp(7),
      fontSize: wp(4.5),
      fontWeight: 'bold',
      marginBottom: hp(2),
      paddingTop: wp(1),
      paddingHorizontal: wp(5),
      backgroundColor: colors.main.rectangleColor,
    },
    buttonsContainer: {
      marginTop: hp(0.5),
      flexDirection: 'row',
      justifyContent: 'space-around',

    },
    submitButton: {
      flex: 1,
      height: hp(7),
      backgroundColor: colors.secondary[500],
      marginBottom: hp(2),
      borderRadius: wp(4),
      justifyContent: 'center',
      alignItems: 'center',
    },
    resetButton: {
      flex: 1,
      height: hp(7),
      backgroundColor: colors.background[500],
      marginBottom: hp(2),
      borderRadius: wp(4),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: wp(2),
    },
    errorText: {
      color: colors.primary[500],
      fontSize: wp(3.5),
      fontWeight: 'bold',
      marginBottom: hp(1),
      textAlign: 'center',
    },
    textButton: {
      fontSize: wp(4.5),
      fontWeight: 'bold',
      color: colors.main.fontColor,
    },
    filterByDate: {
      fontSize: wp(5.5),
      fontWeight: 'bold',
      color: colors.accent[500],
      marginBottom: hp(2),
    },
  });

  return (
    <View>
      <Text style={styles.filterByDate}>Filtrer par date</Text>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          onDatesSelected(values.startDate, values.endDate);
        }}
        validationSchema={validationSchema}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleReset,
          setFieldValue,
        }) => (
          <>
            <TouchableWithoutFeedback
              onPress={() => showDatePicker('startDate')}>
              <View>
                <TextInput
                  mode='outlined'
                  placeholderTextColor={colors.background[700]}
                style={styles.inputField}
                outlineColor={colors.primary[200]}
                activeOutlineColor={colors.secondary[200]}
                textColor={colors.main.fontColor}
                outlineStyle={{ borderRadius: wp(4), borderColor: 'transparent' }}
                contentStyle={{ backgroundColor: colors.main.rectangleColor }}
                  value={values.startDate}
                  placeholder="Date de début"
                  editable={false}
                  onPressIn={() => {
                    setCurrentField('startDate');
                  }}
                />
                {touched.startDate && errors.startDate && (
                  <Text style={styles.errorText}>{errors.startDate}</Text>
                )}
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => showDatePicker('endDate')}>
              <View>
                <TextInput
                   mode='outlined'
                   placeholderTextColor={colors.background[700]}
                 style={styles.inputField}
                 outlineColor={colors.primary[200]}
                 activeOutlineColor={colors.secondary[200]}
                 textColor={colors.main.fontColor}
                 outlineStyle={{ borderRadius: wp(4), borderColor: 'transparent' }}
                 contentStyle={{ backgroundColor: colors.main.rectangleColor }}
                  value={values.endDate}
                  placeholder="Date de fin"
                  editable={false}
                  onPressIn={() => {
                    setCurrentField('endDate');
                  }}
                />

                {touched.endDate && errors.endDate && (
                  <Text style={styles.errorText}>{errors.endDate}</Text>
                )}
              </View>
            </TouchableWithoutFeedback>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={date => {
                setFieldValue(currentField, date.toISOString().split('T')[0]);
                handleConfirm(date);
              }}
              onCancel={hideDatePicker}
            />

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  handleReset();
                  reset();
                }}>
                <Text style={styles.textButton}>réinitialiser</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => handleSubmit()}>
                <Text style={styles.textButton}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default FilterByDate;

const validationSchema = Yup.object().shape({
  startDate: Yup.date()
    .required('Requis')
    .max(Yup.ref('endDate'), 'La date de début doit être avant la date de fin')
    .max(new Date(), 'La date de début ne peut pas être dans le futur'),
  endDate: Yup.date()
    .required('Requis')
    .min(
      Yup.ref('startDate'),
      'La date de fin doit être après la date de début',
    )
    .max(new Date(), 'La date de fin ne peut pas être dans le futur'),
});


