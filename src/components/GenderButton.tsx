import React from 'react';
import {TouchableOpacity, Text, ViewStyle, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
  const colors:any = tokens(mode);

  const styles = StyleSheet.create({
    checkedButton: {
      backgroundColor: colors.secondary[400],
      padding: wp(5),
      borderRadius: wp(6),
      marginVertical: wp(3),
      marginBottom: wp(6),
      justifyContent: 'center',
      alignItems: 'center',
    },
    uncheckedButton: {
      backgroundColor: 'transparent',
      borderWidth: wp(1),
      borderColor: colors.secondary[500],
      padding: wp(5),
      borderRadius: wp(6),
      marginVertical: wp(3),
      marginBottom: wp(6),
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkedTextButton: {
      color: colors.main.fontColor,
      fontSize: wp(7),
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    uncheckedTextButton: {
      color: colors.secondary[500],
      fontSize: wp(7),
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
        color={checkedGender === gender ? "white" : colors.secondary[500]}
      />
      <Text style={checkedGender === gender ? styles.checkedTextButton : styles.uncheckedTextButton}>
        {gender === 'male' ? 'Homme' : 'Femme'}
      </Text>
    </TouchableOpacity>
  );
};

export default GenderButton;
