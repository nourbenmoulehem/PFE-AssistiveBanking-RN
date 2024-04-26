import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import InputTitle from './InputTitle';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HelperTextInfo from './HelperTextInfo';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../context/store';
import { tokens } from '../assets/palette';

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
      width: 340,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
  });
  const customPickerStyles = StyleSheet.create({
    inputIOS: {color: 'pink'},
    inputAndroid: {
      color: colors.secondary[900],
      fontSize: 16,
      fontWeight: 'bold',
      backgroundColor:
        mode === 'dark' ? colors.secondary[400] : colors.secondary[100],
      paddingRight: 30,
    },
    placeholderColor: {
      color: 'pink',
    },
  });
  return (
  <>
    <InputTitle title={title} />
    <View style={styles.inputWrapper}> 
      <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        value={value}
        style={customPickerStyles}
        pickerProps={{
          // <- Use touchableWrapperProps to pass accessibility properties
          accessible: true,
          accessibilityLabel: `${name}`,
          accessibilityRole: 'combobox',
        }}
      />
      {value && <HelperTextInfo info={`Vous avez choisit : ${value}`}  />}
    </View>
  </>
);

}

export default PickerInput;
