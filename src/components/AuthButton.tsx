import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// redux
import { useSelector } from 'react-redux';
import {RootState} from '../context/store';
import { tokens } from '../assets/palette';

interface SubmitButtonProps {
  handleSubmit: () => void;
  label: string;
  accessibilityHint: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ handleSubmit, label, accessibilityHint }) => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);
  const styles = StyleSheet.create({
    submitButton: {
      backgroundColor: colors.main.buttonColor,
      padding: 10,
      margin: 30,
      height: 60,
      width: 275,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
    },
    textButton: {
      color: colors.main.backgroundColor,
      fontSize: 20,
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