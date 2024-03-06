import React from 'react';
import { TouchableOpacity, Text, ViewStyle,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../context/store';
import { tokens } from '../assets/palette';

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

  return(
  <TouchableOpacity
    onPress={() => {
      handleChange('offer')(offer);
      setCheckedOffer(offer);
      setOffreChanged(true);
      console.log("🚀 ~ offer:", offer)
    }}
    style={
      
      checkedGender === offer
        ? styles.checkedButton
        : styles.uncheckedButton
    }
  >
    {/* <Icon
      name={gender === "WeTrust" ? "gender-WeTrust" : "gender-male"}
      size={35}
      color="white"
    /> */}
    <Text style={styles.TextButton} >{offer === 'WeStart' ? 'WeStart' : 'WeTrust'}</Text>
  </TouchableOpacity>
);}

export default OfferButton;