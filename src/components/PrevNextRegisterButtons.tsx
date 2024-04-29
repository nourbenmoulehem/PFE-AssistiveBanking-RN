import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


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
  const colors:any = tokens(mode);
  const styles = StyleSheet.create({
    textButton: {
      color: colors.main.fontColor,
      fontSize: wp(5),
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    button: {
      flex: 1,
      backgroundColor:
        // text === 'Valider' ? colors.secondary[300] : colors.secondaryAccent[300],
        colors.secondaryAccent[700],
      padding: wp(3),
      marginHorizontal: hp(1), 
      alignItems: 'center',
      justifyContent: 'center',
      height: hp(8),
      borderRadius: wp(6),
      // elevation: 3,
      // shadowColor: '#000',
      // shadowOffset: {width: 0, height: 2},
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
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
      onPressIn={onPress}
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
