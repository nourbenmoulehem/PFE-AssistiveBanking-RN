import React from 'react';
import {TouchableOpacity, Text, ViewStyle, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

interface GenderButtonProps {
  gender: 'male' | 'female' | undefined;
  checkedGender: 'male' | 'female' | undefined;
  handleChange: (field: string) => (value: string | undefined) => void;
  setCheckedGender: (gender: 'male' | 'female' | undefined) => void;
  setGenderChanged: (changed: boolean) => void;
}

const GenderButton: React.FC<GenderButtonProps> = ({
  gender,
  checkedGender,
  handleChange,
  setCheckedGender,
  setGenderChanged,
}) => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);

  const styles = StyleSheet.create({
    checkedButton: {
      backgroundColor: colors.orange[300],
      padding: 20,
      borderRadius: 8,
      marginRight: 10,
      marginBottom: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    uncheckedButton: {
      backgroundColor: colors.yellow[300],
      padding: 20,
      borderRadius: 8,
      marginRight: 10,
      marginBottom: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextButton: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        handleChange('gender')(gender);
        setCheckedGender(gender);
        setGenderChanged(true);
        console.log('🚀 ~ gender:', gender);
      }}
      style={
        checkedGender === gender ? styles.checkedButton : styles.uncheckedButton
      }
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={gender === 'male' ? 'Bouton Homme' : 'Bouton Femme'}
      accessibilityState={{selected: checkedGender === gender}}
      accessibilityHint={
        gender === 'male'
          ? 'Sélectionnez pour choisir Homme'
          : 'Sélectionnez pour choisir Femme'
      }>
      <Icon
        name={gender === 'female' ? 'gender-female' : 'gender-male'}
        size={35}
        color="white"
      />
      <Text style={styles.TextButton}>
        {gender === 'male' ? 'Homme' : 'Femme'}
      </Text>
    </TouchableOpacity>
  );
};

export default GenderButton;
