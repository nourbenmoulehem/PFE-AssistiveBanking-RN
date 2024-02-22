import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {tokens} from '../../assets/palette';

// redux
import {UseSelector, useSelector} from 'react-redux';
import {RootState} from '../../context/store';

// form
import {Formik} from 'formik';
import * as yup from 'yup';

/* TODO 
  Choix de l'offre : weStart & weTrust 

  identifications : 
    madame monsieur
    Nom & prénom
    tel & confirm tel
    email & confirm email
    date de naissance

  Mieux vous connaitre:
    Nationalite
    status civil
    nombre d'enfants
  
  informations financieres
    categorie socio professionelle
    revenu net mensuel
    nature de l'activite
    secteur d'activite
  
  Mes documents
    num cin
    date de delivration cin
    scanner cin recto & verso
    selfie
    confirmation

  creation de mot de passe & confirmation

  signature numerique: email verification / phone verification / entretien visio
  


*/

const steps = [
  {
    title: "Choix de l'offre",
    inputs: ['weStart', 'weTrust'],
  },
  {
    title: 'Identifications',
    inputs: [
      'Madame/Monsieur',
      'Nom & prénom',
      'Tel & confirm tel',
      'Email & confirm email',
      'Date de naissance',
    ],
  },
  // Add more steps as needed
];

const SignUp = () => {
  const {mode} = useSelector((state: RootState) => state.global);

  const colors = tokens(mode);

  const [currentStep, setCurrentStep] = useState(0);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const handleInputChange = (inputName: string, text: string) => {
    setFormData(prevData => ({...prevData, [inputName]: text}));
    console.log('🚀 ~ handleInputChange ~ formData:', formData);
  };

  const handleNextStep = () => {
    const currentStepInfo = steps[currentStep];
    const nextInputIndex = currentInputIndex + 1;

    if (nextInputIndex < currentStepInfo.inputs.length) {
      setCurrentInputIndex(nextInputIndex);
    } else {
      setCurrentInputIndex(0);
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const renderInputsForCurrentStep = () => {
    const styles = StyleSheet.create({
      titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
      },
    });
    const currentStepInfo = steps[currentStep];

    // if current step is "Choix de l'offre" then render two buttons for weStart and weTrust
    if (currentStepInfo.title === "Choix de l'offre") {
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
      );
    } else {
      const inputs = steps[currentStep].inputs;
      console.log('🚀 ~ renderInputs ~ inputs:', inputs);

      inputs.forEach(input => {
        console.log("🚀 ~ renderInputsForCurrentStep ~ input:", input)
        return (
          <TextInput
            key={input}
            placeholder={input}
            onChangeText={text => handleInputChange(input, text)}
          />
        );
      });
      
    }

    // array.forEach(element => {

    // });
  };

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: colors.main.backgroundColor,
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    inputTitle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    },

    prevNextButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>{steps[currentStep].title}</Text>
      {renderInputsForCurrentStep()}
      <View style={styles.prevNextButtonsContainer}>
        <Button title="Previous"></Button>
        <Button title="Next" onPress={handleNextStep} />
      </View>
    </View>
  );
};

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

export default SignUp;
