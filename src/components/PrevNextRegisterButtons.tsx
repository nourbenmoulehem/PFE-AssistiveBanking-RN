import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

interface ButtonProps {
  onPress: () => void;
  text: 'Valider' | 'Suivant' | 'Précédent';
  disabled?: boolean;
  values?: any;
  errors?: any;
  getFieldName?: (step: number) => string[];
  step?: number;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  onPress,
  text,
  disabled,
  values,
  errors,
  getFieldName,
  step,
}) => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);
  const styles = StyleSheet.create({
    textButton: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    button: {
      backgroundColor:
        text === 'Valider' ? colors.yellow[300] : colors.orange[300],
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 120,
      height: 70,
      borderRadius: 30,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      opacity:
        getFieldName &&
        step !== undefined &&
        values &&
        errors &&
        getFieldName(step).some(
          fieldName => values[fieldName] === '' || !!errors[fieldName],
        )
          ? 0.5
          : 2,
    },
  });
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={text}
      accessibilityState={{disabled: disabled}}
      accessibilityHint={disabled ? `Vous devez choisir et vérifier vos données avant appuyer sur suivant` : `Appuyez sur ${text}`} >
      <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
