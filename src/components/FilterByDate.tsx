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

  return (
    <View>
      <Text style={styles.filterByDate}>Filrage</Text>
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
                  style={styles.inputField}
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
                  style={styles.inputField}
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
                <Text style={styles.textButton}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => handleSubmit()}>
                <Text style={styles.textButton}>Submit</Text>
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
    .required('Required')
    .max(Yup.ref('endDate'), 'Start date must be before end date'),
  endDate: Yup.date()
    .required('Required')
    .min(Yup.ref('startDate'), 'End date must be after start date'),
});

const styles = StyleSheet.create({
  inputField: {
    width: wp(80),
    height: hp(7),
    backgroundColor: 'white',
    marginBottom: hp(2),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  submitButton: {
    width: wp(40),
    height: hp(7),
    backgroundColor: '#A45704',
    marginBottom: hp(2),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',

  },
  resetButton: {
    width: wp(40),
    height: hp(7),
    backgroundColor: '#999999',
    marginBottom: hp(2),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2),
  },
  errorText: {
    color: 'red',
  },
  textButton: {
    fontSize: 18,
    color: 'black',
  },
  filterByDate: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: hp(2),
  }
});
