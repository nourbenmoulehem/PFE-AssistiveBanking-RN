import { StyleSheet, Text, View, TextInput as NativeTextInput, Button, TouchableOpacity } from 'react-native';
import {TextInput} from 'react-native-paper';
import React, { useState } from 'react'
import {tokens} from '../../assets/palette'

// form
import { Formik } from 'formik';
import * as yup from 'yup';

//redux
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';

const steps = [
  { label: "offre", inputs: ["field1", "field2"] },
  { label: "sexe", inputs: ["field3", "field4"] },
  // Add more steps as needed
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const { mode } = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.main.backgroundColor,
      justifyContent: 'space-around'
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    nextPrevButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  }

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderInputsForCurrentStep = () => {
    const step = steps[currentStep];
    if(step.label === "offre"){
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.main.buttonColor,
              padding: 10,
              alignItems: 'center',
            }}
            onPress={() => console.log('WeStart Button pressed')}>
            <Text>WeStart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: 'pink', padding: 10, alignItems: 'center'}}
            onPress={() => console.log('WeTrust Button pressed')}>
            <Text>WeTrust</Text>
          </TouchableOpacity>
        </View>
      )
    }
    if(step.label === "Step 2"){
    return step.inputs.map((inputName) => (
      <View key={inputName}>
        <Text style={{color:"white", fontWeight:"bold"}}>{inputName}</Text>
        <TextInput
          onChangeText={(text) => handleInputChange(inputName, text)}
        />
      </View>
    ));
  };
  
  return (
    <View style={styles.container}>
      <Text>{steps[currentStep].label}</Text>
      {renderInputsForCurrentStep()}
      <View style={styles.nextPrevButtonContainer}>
        <Button title="Back" disabled={currentStep === 0} onPress={handlePrevStep} />
        <Button title="Next" onPress={handleNextStep} />
      </View>
    </View>
  )
}


}



export default MultiStepForm




const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  contact: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
  occupation: yup.string().required('required'),
  location: yup.string().required('required'),
  password: yup
    .string()
    .matches(
      passwordRegExp,
      'Password must contain at least 5 characters, one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .min(5, 'Password must be exactly 5 characters long')
    .required('required'),
  agency: yup.string().required('required'),
});