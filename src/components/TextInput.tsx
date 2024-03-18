import React from 'react';
import {
  TextInput as PaperTextInput,
  HelperText,
  Text,
} from 'react-native-paper';
import {useField} from 'formik';
import {View, StyleSheet} from 'react-native';

interface TextInputProps {
  name: string;
  placeholder: string;
  mode?: 'flat' | 'outlined';
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
  mode = 'flat',
  keyboardType = 'default',
  showLabel = false,
  secureTextEntry = false,
}) => {
  const [field, meta] = useField(name);

  return (
    <View style={styles.inputWrapper}>
      {showLabel && <Text style={styles.label}>{placeholder}</Text>}
      <PaperTextInput
        placeholder={placeholder}
        mode={mode}
        value={field.value}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        error={!!(meta.touched && meta.error)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        contentStyle={styles.contentStyle}
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

const styles = StyleSheet.create({
  inputWrapper: {
    width: 340,
    marginBottom: 20,
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
    marginRight: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contentStyle: {
    backgroundColor: 'white',
  },
  label: {
    fontSize: 15,
    color: 'orange',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});

export default TextInput;
