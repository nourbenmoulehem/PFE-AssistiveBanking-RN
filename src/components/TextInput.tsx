import React from 'react';
import {
  TextInput as PaperTextInput,
  HelperText,
  Text,
} from 'react-native-paper';
import {useField} from 'formik';
import {View, StyleSheet} from 'react-native';
// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface TextInputProps {
  name: string;
  placeholder: string;
  modeI?: 'flat' | 'outlined';
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  secureTextEntry?: boolean;
  showLabel?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  placeholder,
  modeI = 'flat',
  keyboardType = 'default',
  showLabel = false,
  secureTextEntry = false,
}) => {
  const [field, meta] = useField(name);


  const {mode} = useSelector((state: RootState) => state.global);
  const colors:any = tokens(mode);
  const styles = StyleSheet.create({
    error: {
      fontSize: wp(4.5),
      color: colors.tertiary[400],
      marginTop: hp(1),
      // marginRight: 30,
      // textAlign: 'center',
      alignSelf: 'center',
      fontWeight: 'bold',
    },
    label: {
      fontSize: wp(4),
      color: colors.primary[500],
      fontWeight: 'bold',
      paddingVertical: hp(2),
    },
    inputStyle: {
      
      alignSelf: 'center',
      width: wp(86),
      // height: hp(8),
      fontSize: wp(5),
      fontWeight: 'bold',
      marginVertical: wp(0),
      //  borderRadius: wp(4),
      padding: wp(1),
      paddingHorizontal: wp(5),
      backgroundColor: colors.main.rectangleColor,
    },
  });
  return (
    <View >
      {showLabel && <Text style={styles.label}>{placeholder}</Text>}
      <PaperTextInput
         mode='outlined'
         placeholder={placeholder}
         placeholderTextColor={colors.background[700]}
         style={styles.inputStyle}
         outlineColor={colors.primary[200]}
         activeOutlineColor={colors.secondary[200]}
         textColor={colors.main.fontColor}
         outlineStyle={{ borderRadius: wp(4), borderColor: 'transparent' }}
         contentStyle={{ backgroundColor: colors.main.rectangleColor }}
        value={field.value}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        error={!!(meta.touched && meta.error)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        accessible={true}
        accessibilityLabel={`Champ de saisie ${placeholder}`}
        accessibilityRole="text"
      />
      {meta.error ? (
        <HelperText style={styles.error} type="error">
          {meta.error}
        </HelperText>
      ) : null}
    </View>
  );
};



export default TextInput;
