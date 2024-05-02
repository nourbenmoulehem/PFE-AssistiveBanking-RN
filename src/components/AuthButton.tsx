import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// redux
import { useSelector } from 'react-redux';
import {RootState} from '../context/store';
import { tokens } from '../assets/palette';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface SubmitButtonProps {
  handleSubmit: () => void;
  label: string;
  accessibilityHint: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ handleSubmit, label, accessibilityHint }) => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors:any = tokens(mode);
  const styles = StyleSheet.create({
    submitButton: {
      backgroundColor: colors.main.buttonColor,
      padding: wp(3),
      margin: hp(4),
      height: hp(8),
      width: wp(86),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: wp(4),
    },
    textButton: {
      color: colors.main.fontColor,
      fontSize: wp(6),
      fontWeight: 'bold',
    },
  });
  return(
  <TouchableOpacity style={styles.submitButton} onPressIn={handleSubmit} 
  accessibilityRole='button'
  accessibilityLabel={label}
  accessibilityHint={accessibilityHint}
  
  
  >
    <Text style={styles.textButton}>{label}</Text>
  </TouchableOpacity>
)
};

export default SubmitButton;