import React from 'react';
import {TouchableOpacity, Text, ViewStyle, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface OfferButtonProps {
  offer: 'WeStart' | 'WeTrust' | undefined;
  checkedGender: 'WeStart' | 'WeTrust' | undefined;
  handleChange: (field: string) => (value: string | undefined) => void;
  setCheckedOffer: (offer: 'WeStart' | 'WeTrust' | undefined) => void;
  setOffreChanged: (changed: boolean) => void;
}

const OfferButton: React.FC<OfferButtonProps> = ({
  offer,
  checkedGender,
  handleChange,
  setCheckedOffer,
  setOffreChanged,
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
      onPressIn={() => {
        handleChange('offer')(offer);
        setCheckedOffer(offer);
        setOffreChanged(true);
      }}
      style={
        checkedGender === offer ? styles.checkedButton : styles.uncheckedButton
      }
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={
        offer === 'WeStart' ? 'Bouton Offre WeStart' : 'Bouton Offre WeTrust'
      }
      accessibilityState={{selected: checkedGender === offer}}
      accessibilityHint={
        offer === 'WeStart'
          ? 'Sélectionnez pour choisir WeStart'
          : 'Sélectionnez pour choisir WeTrust'
      }>
      {/* <Icon
      name={gender === "WeTrust" ? "gender-WeTrust" : "gender-male"}
      size={35}
      color="white"
    /> */}
      <Text style={checkedGender === offer ? styles.checkedTextButton : styles.uncheckedTextButton}>
        {offer === 'WeStart' ? 'WeStart' : 'WeTrust'}
      </Text>
    </TouchableOpacity>
  );
};

export default OfferButton;
