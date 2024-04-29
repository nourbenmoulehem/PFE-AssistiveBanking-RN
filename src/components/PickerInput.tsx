import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import InputTitle from './InputTitle';
import { Icon } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HelperTextInfo from './HelperTextInfo';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../context/store';
import { tokens } from '../assets/palette';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface PickerInputProps {
  title: string;
  name: string;
  items: { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
}

const PickerInput: React.FC<PickerInputProps> = ({
  title,
  items,
  value,
  name,
  onValueChange,
}) => {
  
  const { mode } = useSelector((state: RootState) => state.global);
  const colors:any = tokens(mode);

  const styles = StyleSheet.create({
    inputWrapper: {
      width: wp(89),
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: wp(4),
      // gap: 10,
    },
  });
  const customPickerStyles = StyleSheet.create({
    inputIOS: {color: 'pink'},
    inputAndroid: {
      backgroundColor:
        colors.main.rectangleColor,
      paddingHorizontal: wp(5),
      marginBottom: hp(2),
      width: wp(89),
      height: hp(8), 
      borderRadius: wp(4), // Modify the borderRadius value to match the desired roundedness
      color: colors.main.fontColor,
      fontSize: wp(5),
      fontWeight: 'bold', 
      textTransform: 'capitalize',
      
    },
  });
  return (
  <>
    <InputTitle title={title} />
    <View style={styles.inputWrapper}> 
      <RNPickerSelect
      placeholder={'Sélectionner...'}
      useNativeAndroidPickerStyle={false}
        onValueChange={onValueChange}
        items={items}
        value={value}
        style={{
          ...customPickerStyles,
          placeholder: {
            fontSize: wp(5),
            fontWeight: 'bold', 
            color: colors.background[300],
          },
          iconContainer: {
            top: wp(4),
            right: wp(3),
          },
        }}
        
        pickerProps={{
          // <- Use touchableWrapperProps to pass accessibility properties
          accessible: true,
          accessibilityLabel: `${name}`,
          accessibilityRole: 'combobox',
        }}
        Icon={() => {
          return <Icon source="chevron-down" size={wp(8)} color={colors.background[300]} />;
        }}
      />
      {value && <HelperTextInfo info={`Vous avez choisit : ${value}`}  />}
    </View>
  </>
);

}

export default PickerInput;
