import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import InputTitle from './InputTitle';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';
import {TextInput} from 'react-native-paper';

type DatePickerProps = {
  name: 'date de naissance' | 'date de délivration CIN' | 'date de fin';
  title: string;
  field: string;
  placeholder: string;
  value: string;
  handleChange: (field: string) => (value: string) => void;
};

const DatePickerInput: React.FC<DatePickerProps> = ({
  title,
  placeholder,
  value,
  handleChange,
  field,
  name
}) => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors:any = tokens(mode);
  // date picker related
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    // console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  const styles = StyleSheet.create({
    inputWrapper: {
      width: 340,
      justifyContent: 'center',
    },
    dateContainer: {
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30,
    },
    pickDateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: 10,
      backgroundColor: colors.accent[400],
      height: 100,
      width: 210,
      borderRadius: 8,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    TextButtonNextPrev: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
  });
  return (
    <>
      <InputTitle title={title} />
      <View style={styles.dateContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            mode="outlined"
            placeholder={placeholder}
            value={value}
            disabled={true}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel={placeholder}
          />
        </View>

        <TouchableOpacity
          style={styles.pickDateButton}
          onPressIn={showDatePicker}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Choisir une ${name}`}
          accessibilityHint={`Ouvrir le calendrier pour sélectionner une ${name}`}>
          <Icon name="calendar-month-outline" size={40} />
          <Text style={styles.TextButtonNextPrev}>Choisir une date</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date: Date) => {
          const extractedDate = date.toISOString().split('T')[0];
          handleChange(field)(extractedDate);
          handleConfirm(date);
        }}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DatePickerInput;
