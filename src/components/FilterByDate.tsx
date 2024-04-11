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
import {useSelector} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//forms
import {Formik} from 'formik';
import * as Yup from 'yup';
import AuthButton from './AuthButton';

const initialValues = {
  startDate: '',
  endDate: '',
};

interface FilterByDateProps {
  onDatesSelected: (startDate: string, endDate: string) => void;
}

const FilterByDate: React.FC<FilterByDateProps> = ({onDatesSelected}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentField, setCurrentField] = useState<string>('');

  // Show date picker when TextInput is pressed
  const showDatePicker = (field: string) => {
    setCurrentField(field);
    setDatePickerVisibility(true);
  };

  // Hide date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle selected date
  const handleConfirm = (date: Date) => {
    console.log('Selected Date: ', date);
    hideDatePicker();
    // Do something with the selected date
  };

  return (
    <View>
      <Text>Filrage</Text>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log('hiiii');

          console.log(values);
          onDatesSelected(values.startDate, values.endDate);
        }}
        validationSchema={validationSchema}>
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
          setFieldValue,
          /* and other goodies */
        }) => (
          <>
            <TouchableWithoutFeedback
              onPress={() => showDatePicker('startDate')}>
              <View>
                <TextInput
                  value={values.startDate}
                  placeholder="Date de début"
                  editable={false}
                  onPressIn={() => {
                    setCurrentField('startDate');
                  }}
                />
                {touched.startDate && errors.startDate && (
                  <Text>{errors.startDate}</Text>
                )}
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => showDatePicker('endDate')}>
              <View>
                <TextInput
                  value={values.endDate}
                  placeholder="Date de fin"
                  editable={false}
                  onPressIn={() => {
                    setCurrentField('endDate');
                  }}
                />

                {touched.endDate && errors.endDate && (
                  <Text>{errors.endDate}</Text>
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

            <AuthButton
              handleSubmit={handleSubmit}
              label="Envoyer"
              accessibilityHint={'filter'}
            />
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
