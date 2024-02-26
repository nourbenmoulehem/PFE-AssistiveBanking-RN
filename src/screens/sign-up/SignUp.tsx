import React, {useState} from 'react';
import {
  View,
  Button,
  TextInput as NativeTextInput,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TextInput, Switch, HelperText} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import ProgressBar from 'react-native-progress/Bar';

// custom components
import InputTitle from '../../components/InputTitle';
import HelperTextInfo from '../../components/HelperTextInfo';

// form
import {Formik} from 'formik';
import * as yup from 'yup';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {tokens} from '../../assets/palette';

const SignUp = () => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);

  const [step, setStep] = useState(1);

  const [checked, setChecked] = useState(''); // for offer (WeStart, WeTrust)
  const [checkedGender, setCheckedGender] = useState(''); // for gender
  const [isEtudiant, setIsEtudiant] = useState(false); // if the user is a student there is some options need to skip
  const [offreChanged, setOffreChanged] = useState(false);
  const [genderChanged, setGenderChanged] = useState(false);

  const [selectedCinRectoImage, setSelectedCinRectoImage] = useState<
    string | undefined
  >(''); // cinRecto
  const [selectedCinVersoImage, setSelectedCinVersoImage] = useState<
    string | undefined
  >(''); // cinVerso
  const [selectedSelfieImage, setSelectedSelfieImage] = useState<
    string | undefined
  >(''); // selfie

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    emailConfirm: '',
    offer: '',
    gender: '',
    phoneNumber: '',
    phoneNumberConfirm: '',
    birthday: '',
    adresse: '', // 👍
    nationality: '',
    statusCivil: '',
    nombre_enfant: '',
    socio_professional: '',
    revenu: '',
    natureActivite: '',
    secteurActivite: '',

    codePostal: '', // 👍
    gouvernorat: '', // 👍
    //pays: '',  !!!

    cin: '', // 👍
    dateDelivrationCin: '', // 👍
    cinRecto: '', // 👍
    cinVerso: '', // 👍
    selfie: '', // 👍

    password: '', // !!!
    passwordConfirm: '', // !!!

    hasAmericanityIndex: false,
    hasOtherBank: false,
    hasConfirmedForPersonalData: false,
  };

  type Steps = {
    offer: string;
    gender: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthday: string;
    nationality: string;
    statusCivil: string;
    nombre_enfant: string;
    socio_professional: string;
    revenu: string;
    natureActivite: string;
    secteurActivite: string;
    adresse: string;
    gouvernorat: string;
    codePostal: string;
    cin: string;
    dateDelivrationCin: string;
    cinRecto: string;
    cinVerso: string;
    selfie: string;
    password: string;
    passwordConfirm: string;
    phoneNumberConfirm: string;
    emailConfirm: string;
  };

  const getStep = <T extends keyof Steps>(stepNumber: number): T[] => {
    switch (stepNumber) {
      case 1:
        return ['offer'] as T[];
      case 2:
        return ['gender'] as T[];
      case 3:
        return ['firstName'] as T[];
      case 4:
        return ['lastName'] as T[];
      case 5:
        return ['email', 'emailConfirm'] as T[];
      case 6:
        return ['phoneNumber', 'phoneNumberConfirm'] as T[];
      case 7:
        return ['birthday'] as T[];
      case 8:
        return ['adresse'] as T[];
      case 9:
        return ['gouvernorat'] as T[];
      case 10:
        return ['codePostal'] as T[];
      case 11:
        return ['nationality'] as T[];
      case 12:
        return ['statusCivil'] as T[];
      case 13:
        return ['nombre_enfant'] as T[];
      case 14:
        return ['socio_professional'] as T[];
      case 15:
        return ['revenu'] as T[];
      case 16:
        return ['natureActivite'] as T[];
      case 17:
        return ['secteurActivite'] as T[];
      case 18:
        return ['cin'] as T[];
      case 19:
        return ['dateDelivrationCin'] as T[];
      case 20:
        return ['cinRecto'] as T[];
      case 21:
        return ['cinVerso'] as T[];
      case 22:
        return ['selfie'] as T[];
      case 23:
        return ['password', 'confirmPassword'] as T[];
      default:
        return ['secteurActivite'] as T[];
    }
  };

  const handleNext = () => {
    if (step === 14 && isEtudiant) {
      setStep(step + 4);
    } else {
      setStep(step + 1);
    }
  };
    

  const getFieldName = (step: number): (keyof typeof initialValues)[] => {
    const stepFieldName = getStep(step);
    console.log('🚀 ~ getFieldName ~ stepFieldName:', stepFieldName);
    return stepFieldName;
  };

  const handlePrevious = () => {
    if (step === 18 && isEtudiant) {
      setStep(step - 4);
    } else {
      setStep(step - 1);
    }
  };

  const handleInputChange = (target: any) => {
    const {name, value} = target;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // handle form submission
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.main.backgroundColor,
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    contentStyle: {
      // related to textInput decoration of react-native-paper
      backgroundColor: 'white',
    },
    outlineStyle: {
      // related to textInput decoration of react-native-paper
      borderColor: colors.main.buttonColor,
    },
    inputWrapper: {
      width: 340,
      justifyContent: 'center',
    },
    prevNextButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    TextButton: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    nextPrevButton: {
      backgroundColor: colors.orange[300],
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 120,
      height: 70,
      borderRadius: 30,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    submitButton: {
      backgroundColor: colors.main.buttonColor,
      padding: 10,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
    },
    TextButtonNextPrev: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
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
    dateContainer: {
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30,
    },
    disabledButton: {
      backgroundColor: colors.secondary[100],
    },
    openGaleryButton: {
      height: 150,
      width: 120,
      borderRadius: 8,
      backgroundColor: colors.secondary[400],
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
    openCameraButton: {
      height: 150,
      width: 120,
      borderRadius: 8,
      backgroundColor: colors.secondary[200],
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
    pickDateButton: {
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: 10,
      backgroundColor: colors.light_blue[400],
      height: 100,
      width: 210,
      borderRadius: 8,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

    },
    
  });

  const customPickerStyles = StyleSheet.create({
    
      inputIOS: {color: 'pink'},
      inputAndroid: {
          color: colors.secondary[900],
          fontSize: 16,
          fontWeight: 'bold', 
          backgroundColor: colors.secondary[400],
          paddingRight: 30
        },
      placeholderColor: {
        color: 'pink',
      },
    
  });

  // date picker related
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  // select related
  const selectedItem = {
    title: 'Selected item title',
    description: 'Secondary long descriptive text ...',
  };

  const status_civil = [
    {label: 'Célibataire', value: 'Célibataire'},
    {label: 'Marié', value: 'Marié'},
    {label: 'Divorcé', value: 'Divorcé'},
    {label: 'Veuf', value: 'Veuf'},
  ];

  const nombre_enfant = [
    {label: '0', value: '0'},
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
  ];

  const socio_professional = [
    {label: 'Etudiant', value: 'Etudiant'},
    {label: 'Salarié', value: 'Salarié'},
    {label: 'Retraité', value: 'Retraité'},
    {label: 'Autres', value: 'Autres'},
  ];

  const revenu_mensuel = [
    {label: '0-700 DT', value: '0-700 DT'},
    {label: '700-1600 DT', value: '700-1600 DT'},
    {label: '1600-3500 DT', value: '1600-3500 DT'},
    {label: '+3500 DT', value: '+3500 DT'},
  ];

  const secteur_activite = [
    {label: 'Agriculture', value: 'Agriculture'},
    {label: 'Santé', value: 'Santé'},
    {label: 'Industrie & mécanique', value: 'Industrie & mécanique'},
    {label: 'Artisanat', value: 'Artisanat'},
    {label: 'Industrie', value: 'Industrie'},
    {label: 'Services', value: 'Services'},
    {label: 'Commerce', value: 'Commerce'},
    {label: 'Education', value: 'Education'},
    {label: 'Transport', value: 'Transport'},
    {label: 'Autres', value: 'Autres'},
  ];

  const gouvernoratsTunisiens = [
    'Ariana',
    'Béja',
    'Ben Arous',
    'Bizerte',
    'Gabès',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kébili',
    'Le Kef',
    'Mahdia',
    'Manouba',
    'Médenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan',
  ];

  const gouvernoratsOptions = gouvernoratsTunisiens.map(gouvernorat => ({
    label: gouvernorat,
    value: gouvernorat,
  }));

  // type safety
  type Options = {
    mediaType: 'photo' | 'video' | 'mixed';
    includeBase64: boolean;
    maxHeight: number;
    maxWidth: number;
  };

  const options: Options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  // open galerie
  // const openImagePicker = () => {
  //   launchImageLibrary(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorMessage) {
  //       console.log('Image picker errorMessage: ', response.errorMessage);
  //     } else {
  //       let imageUri = response.assets ? response.assets[0].uri : '';
  //       setSelectedImage(imageUri);
  //     }
  //   });
  // };

  // ouvrir la caméra
  // const handleCameraLaunch = () => {
  //   launchCamera(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled camera');
  //     } else if (response.errorMessage) {
  //       console.log('Camera errorMessage: ', response.errorMessage);
  //     } else {
  //       let imageUri = response.assets ? response.assets[0].uri : '';
  //       setSelectedImage(imageUri);
  //       console.log(imageUri);
  //     }
  //   });
  // };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema} // we're using yup
      onSubmit={values => {
        console.log('hello');

        console.log(values);
      }}>
      {({
        values, // where we're getting all the value of the input fields
        errors,
        touched,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
        setFieldValue,
        /* and other goodies */
      }) => (
        <>
          <View style={styles.container}>
          
          {/* <ProgressBar progress={(step / 24)} width={300} color={colors.orange[200]} /> */}

            {step === 1 && ( // offre
              <>
                
                <InputTitle title="Choisissez l'offre qui vous convient " />
                <View style={styles.inputWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      handleChange('offer')('WeStart');
                      setChecked('WeStart');
                      setOffreChanged(true);

                    }}
                    style={
                      
                      checked === 'WeStart'
                        ? styles.checkedButton
                        : styles.uncheckedButton
                    }>
                    <Text style={styles.TextButton}>WeStart</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      handleChange('offer')('WeTrust');
                      setChecked('WeTrust');
                      setOffreChanged(true);
                      console.log('TouchableOPcity WeTrust', values.offer);
                    }}
                    style={
                      checked === 'WeTrust'
                        ? styles.checkedButton
                        : styles.uncheckedButton
                    }>
                    <Text style={styles.TextButton}>WeTrust</Text>
                  </TouchableOpacity>
                  {touched.offer && errors.offer && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.offer}
                    </Text>
                  )}

                  { offreChanged && <HelperTextInfo info={`Vous avez choisit l'offre ${checked}`} /> }
                </View>
              </>
            )}

            {step === 2 && ( // gender
              <>
                <InputTitle title="Sélectionnez votre sexe " />
                <View style={styles.inputWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      handleChange('gender')('female');
                      setCheckedGender('female');
                      setGenderChanged(true);

                      // console.log("TouchableOPcity female", values.gender);
                    }}
                    style={
                      checkedGender === 'female'
                        ? styles.checkedButton
                        : styles.uncheckedButton
                    }>
                    <Text style={styles.TextButton}>Femme</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      handleChange('gender')('male');
                      setCheckedGender('male');
                      setGenderChanged(true);
                      // console.log("TouchableOPcity male", values.gender);
                    }}
                    style={
                      checkedGender === 'male'
                        ? styles.checkedButton
                        : styles.uncheckedButton
                    }>
                    <Text style={styles.TextButton}>Homme</Text>
                  </TouchableOpacity>

                  {touched.gender && errors.gender && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.gender}
                    </Text>
                  )}
                 {genderChanged && <HelperTextInfo info={`Vous avez choisit ${checkedGender}`} />}
                </View>
              </>
            )}

            {step === 3 && ( // firstName
              <>
                <InputTitle title="Sélectionnez votre prénom" />
                <View style={styles.inputWrapper}>
                  <TextInput
                    mode="flat"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    placeholder="prenom"
                    contentStyle={styles.contentStyle}
                    outlineStyle={styles.outlineStyle}
                  />
                  {touched.firstName && errors.firstName && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.firstName}
                    </Text>
                  )}
                </View>
              </>
            )}
            {step === 4 && ( // lastName
              <>
                <InputTitle title="Sélectionnez votre nom" />
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.lastName}
                    mode="outlined"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    placeholder="nom"
                    contentStyle={styles.contentStyle}
                    outlineStyle={styles.outlineStyle}
                  />
                  {touched.lastName && errors.lastName && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.lastName}
                    </Text>
                  )}
                </View>
              </>
            )}
            {step === 5 && ( // email & confirm
              <>
              
              <InputTitle title="Sélectionnez votre adresse e-mail et confirmez-la, s'il vous plaît." />
                <View style={styles.inputWrapper}>
                  <TextInput
                    mode="outlined"
                    label="email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="email"
                    value={values.email}
                    keyboardType="email-address"
                    contentStyle={styles.contentStyle}
                    outlineStyle={styles.outlineStyle}
                  />
                  {touched.email && errors.email && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.email}
                    </Text>
                  )}
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    mode="outlined"
                    label="Confirm email"
                    onChangeText={handleChange('emailConfirm')}
                    onBlur={handleBlur('emailConfirm')}
                    placeholder="emailConfirm"
                    value={values.emailConfirm}
                    keyboardType="email-address"
                    contentStyle={styles.contentStyle}
                    outlineStyle={styles.outlineStyle}
                  />
                  {touched.emailConfirm && errors.emailConfirm && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.emailConfirm}
                    </Text>
                  )}
                </View>
              </>
            )}
            {step === 6 && ( // phoneNumber & confirm
              <>
                <InputTitle title="Sélectionnez votre numéro de téléphone et confirmez-le, s'il vous plaît." />
                <View style={styles.inputWrapper}>
                  <TextInput
                    mode="outlined"
                    label="Téléphone"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    placeholder="phoneNumber"
                    value={values.phoneNumber}
                    keyboardType="phone-pad"
                    contentStyle={styles.contentStyle}
                    outlineStyle={styles.outlineStyle}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.phoneNumber}
                    </Text>
                  )}
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    mode="outlined"
                    label="Confirm Tel number"
                    onChangeText={handleChange('phoneNumberConfirm')}
                    onBlur={handleBlur('phoneNumberConfirm')}
                    placeholder="phoneNumberConfirm"
                    value={values.phoneNumberConfirm}
                    keyboardType="phone-pad"
                    contentStyle={styles.contentStyle}
                    outlineStyle={styles.outlineStyle}
                  />
                  {touched.phoneNumberConfirm && errors.phoneNumberConfirm && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.phoneNumberConfirm}
                    </Text>
                  )}
                </View>
              </>
            )}
            {step === 7 && ( // birthday
              <>
              <InputTitle title="Sélectionnez votre date de naissance" />
                <View style={styles.dateContainer}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      mode="outlined"
                      label="date de naissance"
                      value={values.birthday}
                      disabled={true}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.pickDateButton}
                    onPress={showDatePicker}>
                    <Icon name="calendar-month-outline" size={40} />
                    <Text style={styles.TextButtonNextPrev}>Choisir une date</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={(date: Date) => {
                    console.log('🚀 ~ SignUp ~ date:', date);

                    const extractedDate = date.toISOString().split('T')[0];
                    console.log('🚀 ~ SignUp ~ extractedDate:', extractedDate);
                    handleChange('birthday')(extractedDate);
                    console.log('values.birthday : ', values.birthday);
                  }}
                  onCancel={hideDatePicker}
                />
              </>
            )}
            {step === 8 && ( // adresse
              <>
                <InputTitle title="Sélectionnez votre adresse" />
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.adresse}
                    mode="outlined"
                    label="adresse"
                    onChangeText={handleChange('adresse')}
                    onBlur={handleBlur('adresse')}
                    placeholder="Adresse"
                    contentStyle={styles.contentStyle}
                    outlineStyle={styles.outlineStyle}
                  />
                  {touched.adresse && errors.adresse && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.adresse}
                    </Text>
                  )}
                </View>
              </>
            )}
            {step === 9 && ( // gouvernorat
              <>
                <InputTitle title="Gouvernorat" />
                <View style={styles.inputWrapper}>
                  <RNPickerSelect
                    onValueChange={value => handleChange('gouvernorat')(value)}
                    items={gouvernoratsOptions}
                    value={values.gouvernorat}
                    // touchableWrapperProps={{
                    //   // <- Use touchableWrapperProps to pass accessibility properties
                    //   accessible: true,
                    //   accessibilityLabel: 'status civil',
                    //   accessibilityHint: 'Double tap to select an option.',
                    //   accessibilityRole: 'combobox',
                    // }}
                    style={customPickerStyles}
                  />
                </View>
                
              </>
            )}
            {step === 10 && ( // code postal
              <>
                <InputTitle title="Sélectionnez votre code postal" />
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.codePostal}
                    mode="outlined"
                    label="Code Postal"
                    onChangeText={handleChange('codePostal')}
                    onBlur={handleBlur('codePostal')}
                    placeholder="code postal"
                    contentStyle={styles.contentStyle}
                    outlineStyle={styles.outlineStyle}
                    keyboardType="phone-pad"
                  />
                  {touched.codePostal && errors.codePostal && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.codePostal}
                    </Text>
                  )}
                </View>
              </>
            )}
            {step === 11 && ( // nationalite
              <>
              <InputTitle title="Sélectionnez votre nationalité" />
                <View style={styles.inputWrapper}>
                <RNPickerSelect
                  onValueChange={value => handleChange('nationality')(value)}
                  items={[
                    {label: 'Tunisienne', value: 'Tunisienne'},
                    {label: 'Française', value: 'Française'},
                  ]}
                  value={values.nationality}
                  style={customPickerStyles}
                />
                </View>
              </>
            )}
            {step === 12 && ( // status civil
              <>
                <InputTitle title="Sélectionnez votre status civil" />
                <View style={styles.inputWrapper}>
                <RNPickerSelect
                  onValueChange={value => handleChange('statusCivil')(value)}
                  items={status_civil}
                  value={values.statusCivil}
                  // touchableWrapperProps={{
                  //   // <- Use touchableWrapperProps to pass accessibility properties
                  //   accessible: true,
                  //   accessibilityLabel: 'status civil',
                  //   accessibilityHint: 'Double tap to select an option.',
                  //   accessibilityRole: 'combobox',
                  // }}
                  style={customPickerStyles}
                />
                </View>
              </>
            )}
            {step === 13 && ( // nombre d'enfant
              <>
              <InputTitle title="Sélectionnez le nombre d'enfants que vous avez" />
                <View style={styles.inputWrapper}>
                <RNPickerSelect
                  onValueChange={value => handleChange('nombre_enfant')(value)}
                  value={values.nombre_enfant}
                  items={nombre_enfant}
                  // touchableWrapperProps={{
                  //   // <- Use touchableWrapperProps to pass accessibility properties
                  //   accessible: true,
                  //   accessibilityLabel: 'Favorite sport',
                  //   accessibilityHint: 'Double tap to select an option.',
                  //   accessibilityRole: 'combobox',
                  // }}
                  style={customPickerStyles}
                />
                </View>
                
              </>
            )}
            {step === 14 && ( // socio_professional
              <>
              <InputTitle title="Sélectionnez votre statut socio-professionnel" />
                <View style={styles.inputWrapper}>
                <RNPickerSelect
                  onValueChange={value => {
                    handleChange('socio_professional')(value);
                    if (value === 'Etudiant') {
                      setIsEtudiant(true);
                    }
                  }}
                  value={values.socio_professional}
                  items={socio_professional}
                  // touchableWrapperProps={{
                  //   // <- Use touchableWrapperProps to pass accessibility properties
                  //   accessible: true,
                  //   accessibilityLabel: 'Favorite sport',
                  //   accessibilityHint: 'Double tap to select an option.',
                  //   accessibilityRole: 'combobox',
                  // }}
                  style={customPickerStyles}
                />
                </View>
              </>
            )}
            {step === 15 &&
              !isEtudiant && ( // revenu_mensuel
                <>
                <InputTitle title="Sélectionnez votre revenu net mensuel" />
                  <View style={styles.inputWrapper}>
                  <RNPickerSelect
                    onValueChange={value => {
                      handleChange('revenu')(value);
                      console.log('isEtudiant', isEtudiant);
                    }}
                    value={values.revenu}
                    items={revenu_mensuel}
                    touchableWrapperProps={{
                      // <- Use touchableWrapperProps to pass accessibility properties
                      accessible: true,
                      accessibilityLabel: 'Favorite sport',
                      accessibilityHint: 'Double tap to select an option.',
                      accessibilityRole: 'combobox',
                    }}
                    style={customPickerStyles}
                  />
                  </View>
                </>
              )}
            {step === 16 &&
              !isEtudiant && ( // natureActivite
                <>
                <InputTitle title="Sélectionnez la nature de votre activité" />
                  <View style={styles.inputWrapper}>
                  <RNPickerSelect
                    onValueChange={value =>
                      handleChange('natureActivite')(value)
                    }
                    value={values.natureActivite}
                    items={[
                      {label: 'Public', value: 'Public'},
                      {label: 'Privé', value: 'Privé'},
                    ]}
                    touchableWrapperProps={{
                      // <- Use touchableWrapperProps to pass accessibility properties
                      accessible: true,
                      accessibilityLabel: 'Favorite sport',
                      accessibilityHint: 'Double tap to select an option.',
                      accessibilityRole: 'combobox',
                    }}
                    style={customPickerStyles}
                  />
                  </View>
                </>
              )}
            {step === 17 &&
              !isEtudiant && ( // secteurActivite
                <>
                <InputTitle title="Sélectionnez votre secteur d'activité" />
                  <View style={styles.inputWrapper}>
                  <RNPickerSelect
                    onValueChange={value =>
                      handleChange('secteurActivite')(value)
                    }
                    value={values.secteurActivite}
                    items={secteur_activite}
                    // touchableWrapperProps={{
                    //   // <- Use touchableWrapperProps to pass accessibility properties
                    //   accessible: true,
                    //   accessibilityLabel: 'Favorite sport',
                    //   accessibilityHint: 'Double tap to select an option.',
                    //   accessibilityRole: 'combobox',
                    // }}
                    style={customPickerStyles}
                  />
                  </View>
                </>
              )}
            {step === 18 && ( // num cin
              <>
              <InputTitle title="Saisissez votre numéro Carte d'Identité Nationale" />
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.cin}
                    mode="outlined"
                    label="cin"
                    onChangeText={handleChange('cin')}
                    onBlur={handleBlur('cin')}
                    placeholder="numero cin"
                    contentStyle={styles.contentStyle}
                    outlineStyle={styles.outlineStyle}
                  />
                  {touched.cin && errors.cin && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.cin}
                    </Text>
                  )}
                </View>
              </>
            )}
            {step === 19 && ( // date de delivration
              <>
              <InputTitle title="Sélectionnez la date de délivrance de votre CIN" />
                <View style={styles.dateContainer}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      mode="outlined"
                      label="date de naissance"
                      value={values.dateDelivrationCin}
                      disabled={true}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.pickDateButton}
                    onPress={showDatePicker}>
                    <Icon name="calendar-month-outline" size={24} />
                    <Text style={styles.TextButtonNextPrev} >Choisir une date</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={(date: Date) => {
                    console.log('🚀 ~ SignUp ~ date:', date);

                    const extractedDate = date.toISOString().split('T')[0];
                    console.log('🚀 ~ SignUp ~ extractedDate:', extractedDate);
                    handleChange('dateDelivrationCin')(extractedDate);
                    console.log(
                      'values.dateDelivrationCin : ',
                      values.dateDelivrationCin,
                    );
                  }}
                  onCancel={hideDatePicker}
                />
              </>
            )}
            {step === 20 && ( // cin recto
              <>
              <InputTitle title="Veuillez prendre en photo le recto de votre CIN ou l'importer" />
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-around',
                    gap: 20,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.openGaleryButton}
                    onPress={() => {
                      launchImageLibrary(options, response => {
                        if (response.didCancel) {
                          console.log('User cancelled image picker');
                        } else if (response.errorMessage) {
                          console.log(
                            'Image picker errorMessage: ',
                            response.errorMessage,
                          );
                        } else {
                          let imageUri = response.assets
                            ? response.assets[0].uri
                            : '';
                          handleChange('cinRecto')(imageUri ? imageUri : '');
                          setSelectedCinRectoImage(imageUri);
                        }
                      });
                    }}>
                    <Icon name="image-search-outline" size={40} />
                    <Text style={styles.TextButtonNextPrev}>
                      ouvrir la galerie
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.openCameraButton}
                    onPress={() => {
                      launchCamera(options, response => {
                        if (response.didCancel) {
                          console.log('User cancelled camera');
                        } else if (response.errorMessage) {
                          console.log(
                            'Camera errorMessage: ',
                            response.errorMessage,
                          );
                        } else {
                          let imageUri = response.assets
                            ? response.assets[0].uri
                            : '';
                          setSelectedCinRectoImage(imageUri);
                          handleChange('cinRecto')(imageUri ? imageUri : '');

                          console.log(imageUri);
                        }
                      });
                    }}>
                    <Icon name="camera-enhance-outline" size={40} />
                    <Text style={styles.TextButtonNextPrev}>
                      ouvrir la caméra
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  {selectedCinRectoImage ? (
                    <Image
                      source={{uri: selectedCinRectoImage}}
                      style={{width: 250, height: 250}}
                      alt="votre cin recto"
                    />
                  ) : (
                    <Text> no image</Text>
                  )}
                </View>
                {touched.cinRecto && errors.cinRecto && (
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'red',
                      marginTop: 10,
                      marginRight: 30,
                    }}>
                    {errors.cinRecto}
                  </Text>
                )}
              </>
            )}
            {step === 21 && ( // cin verso
              <>
                <InputTitle title="Veuillez prendre en photo le verso de votre CIN ou l'importer" />
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-around',
                    gap: 20,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.openGaleryButton}
                    onPress={() => {
                      launchImageLibrary(options, response => {
                        if (response.didCancel) {
                          console.log('User cancelled image picker');
                        } else if (response.errorMessage) {
                          console.log(
                            'Image picker errorMessage: ',
                            response.errorMessage,
                          );
                        } else {
                          let imageUri = response.assets
                            ? response.assets[0].uri
                            : '';
                          handleChange('cinVerso')(imageUri ? imageUri : '');
                          setSelectedCinVersoImage(imageUri);
                        }
                      });
                    }}>
                    <Icon name="image-search-outline" size={40} />
                    <Text style={styles.TextButtonNextPrev}>
                      ouvrir la galerie
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.openCameraButton}
                    onPress={() => {
                      launchCamera(options, response => {
                        if (response.didCancel) {
                          console.log('User cancelled camera');
                        } else if (response.errorMessage) {
                          console.log(
                            'Camera errorMessage: ',
                            response.errorMessage,
                          );
                        } else {
                          let imageUri = response.assets
                            ? response.assets[0].uri
                            : '';
                          handleChange('cinVerso')(imageUri ? imageUri : '');
                          setSelectedCinVersoImage(imageUri);
                          console.log(imageUri);
                        }
                      });
                    }}>
                    <Icon name="camera-enhance-outline" size={40} />
                    <Text style={styles.TextButtonNextPrev}>
                      ouvrir la caméra
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  {selectedCinVersoImage ? (
                    <Image
                      source={{uri: selectedCinVersoImage}}
                      style={{width: 250, height: 250}}
                      alt='votre cin verso'
                    />
                  ) : (
                    <Text> no image</Text>
                  )}
                </View>
                {touched.cinVerso && errors.cinVerso && (
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'red',
                      marginTop: 10,
                      marginRight: 30,
                    }}>
                    {errors.cinVerso}
                  </Text>
                )}
              </>
            )}
            {step === 22 && ( // selfie
              <>
              <InputTitle title="Prenez ou importez votre photo" />
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-around',
                    gap: 20,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.openGaleryButton}
                    onPress={() => {
                      launchImageLibrary(options, response => {
                        if (response.didCancel) {
                          console.log('User cancelled image picker');
                        } else if (response.errorMessage) {
                          console.log(
                            'Image picker errorMessage: ',
                            response.errorMessage,
                          );
                        } else {
                          let imageUri = response.assets
                            ? response.assets[0].uri
                            : '';
                          handleChange('selfie')(imageUri ? imageUri : '');
                          setSelectedSelfieImage(imageUri);
                        }
                      });
                    }}>
                    <Icon name="image-search-outline" size={40} />
                    <Text style={styles.TextButtonNextPrev}>
                      ouvrir la galerie
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.openCameraButton}
                    onPress={() => {
                      launchCamera(options, response => {
                        if (response.didCancel) {
                          console.log('User cancelled camera');
                        } else if (response.errorMessage) {
                          console.log(
                            'Camera errorMessage: ',
                            response.errorMessage,
                          );
                        } else {
                          let imageUri = response.assets
                            ? response.assets[0].uri
                            : '';
                          handleChange('selfie')(imageUri ? imageUri : '');
                          setSelectedSelfieImage(imageUri);
                          console.log(imageUri);
                        }
                      });
                    }}>
                    <Icon name="camera-enhance-outline" size={40} />
                    <Text style={styles.TextButtonNextPrev}>
                      ouvrir la caméra
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  {selectedSelfieImage ? (
                    <Image
                      source={{uri: selectedSelfieImage}}
                      style={{width: 250, height: 250}}
                      alt='votre selfie'
                    />
                  ) : (
                    <Text> no image</Text>
                  )}
                </View>
                {touched.selfie && errors.selfie && (
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'red',
                      marginTop: 10,
                      marginRight: 30,
                    }}>
                    {errors.selfie}
                  </Text>
                )}
              </>
            )}
            {step === 23 && ( // password
              <>
              <InputTitle title="Choisissez un mot de passe et confirmez-le, s'il vous plaît." />
                <View style={styles.inputWrapper}>
                  <TextInput
                    mode="outlined"
                    label="password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder="password"
                    value={values.password}
                    contentStyle={styles.contentStyle}
                    outlineStyle={styles.outlineStyle}
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.password}
                    </Text>
                  )}
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    mode="outlined"
                    label="Confirm password"
                    onChangeText={handleChange('passwordConfirm')}
                    onBlur={handleBlur('passwordConfirm')}
                    placeholder="passwordConfirm"
                    value={values.passwordConfirm}
                    contentStyle={styles.contentStyle}
                    outlineStyle={styles.outlineStyle}
                    secureTextEntry={true}
                  />
                  {touched.passwordConfirm && errors.passwordConfirm && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      {errors.passwordConfirm}
                    </Text>
                  )}
                </View>
              </>
            )}
            {step === 24 && ( // confirmation
              <>
                <View>
                  <Switch
                    value={values.hasAmericanityIndex}
                    onValueChange={value => {
                      setFieldValue('hasAmericanityIndex', value);
                    }}
                  />
                  <Text>Americani</Text>
                </View>

                <View>
                  <Switch
                    value={values.hasOtherBank}
                    onValueChange={value => {
                      setFieldValue('hasOtherBank', value);
                    }}
                  />
                  <Text>Banka o5ra</Text>
                </View>

                <View>
                  <Switch
                    value={values.hasConfirmedForPersonalData}
                    onValueChange={value => {
                      setFieldValue('hasConfirmedForPersonalData', value);
                    }}
                  />
                  <Text>confirmi</Text>
                </View>
                {touched.hasAmericanityIndex &&
                  errors.hasAmericanityIndex &&
                  touched.hasOtherBank &&
                  errors.hasOtherBank &&
                  touched.hasConfirmedForPersonalData &&
                  errors.hasConfirmedForPersonalData && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        marginTop: 10,
                        marginRight: 30,
                      }}>
                      <Text>{errors.hasAmericanityIndex}</Text>
                      <Text>{errors.hasOtherBank}</Text>
                      <Text>{errors.hasConfirmedForPersonalData}</Text>
                    </Text>
                  )}
              </>
            )}

            <View style={styles.prevNextButtonsContainer}>
              {step > 1 && (
                <TouchableOpacity
                  style={styles.nextPrevButton}
                  onPress={handlePrevious}>
                  <Text style={styles.TextButtonNextPrev}>Précédent</Text>
                </TouchableOpacity>
              )}
              {step < 24 ? (
                <TouchableOpacity
                  style={[
                    styles.nextPrevButton,
                    getFieldName(step).some(
                      fieldName =>
                        values[fieldName] === '' || !!errors[fieldName],
                    )
                      ? styles.disabledButton
                      : styles.nextPrevButton,
                  ]}
                  // disabled={
                  //   getFieldName(step).some(fieldName => values[fieldName] === '' || !!errors[fieldName])
                  // }
                  onPress={() => {
                    console.log('onPress Next button');

                    const fieldNames = getFieldName(step);
                    console.log('Field Names:', fieldNames);
                    console.log(
                      'Values:',
                      fieldNames.map(fieldName => values[fieldName]),
                    );
                    console.log(
                      'Errors:',
                      fieldNames.map(fieldName => errors[fieldName]),
                    );

                    handleNext();
                  }}>
                  <Text style={styles.TextButtonNextPrev}>Suivant</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    console.log('submit: ');
                    console.log('VALUES:', values);

                    console.log('ERRORS', errors);
                    handleSubmit();
                  }} // handlesubmit will collect all the values and send it to onSubmit itself
                >
                  <Text>valider</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
const cinRegExp = /^[0-9]{8}$/;
const codePostalRegExp = /^\d{4}$/;

const checkoutSchema = yup.object().shape({
  offer: yup
    .string()
    .oneOf(['WeStart', 'WeTrust'], 'Invalid offer')
    .required('required'),
  gender: yup
    .string()
    .oneOf(['female', 'male'], 'Invalid gender')
    .required('required'),
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  emailConfirm: yup
    .string()
    .oneOf([yup.ref('email')], 'emails must match')
    .email('invalid email')
    .required('required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
  phoneNumberConfirm: yup
    .string()
    .oneOf([yup.ref('phoneNumber')], 'Phone numbers must match')
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
  birthday: yup.date().required('required'),
  adresse: yup.string().required('required'),
  gouvernorat: yup.string().required('required'),
  codePostal: yup
    .string()
    .matches(codePostalRegExp, 'Invalid postal code. Must be 4 digits.')
    .required('required'),
  nationality: yup.string().required('required'),
  statusCivil: yup.string().required('required'),
  nombre_enfant: yup.string().required('required'),
  socio_professional: yup.string().required('required'),
  revenu: yup.string().required('required'),
  natureActivite: yup.string().required('required'),
  secteurActivite: yup.string().required('required'),
  cin: yup
    .string()
    .matches(cinRegExp, 'Invalid CIN format. Must be 8 digits.')
    .required('required'),
  dateDelivrationCin: yup.date().required('required'),
  password: yup
    .string()
    .matches(
      passwordRegExp,
      'Password must contain at least 5 characters, one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .min(5, 'Password must be exactly 5 characters long')
    .required('required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .matches(
      passwordRegExp,
      'Password must contain at least 5 characters, one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .min(5, 'Password must be exactly 5 characters long')
    .required('required'),
  hasAmericanityIndex: yup
    .boolean()
    .oneOf([true], 'hasAmericanityIndex must be true')
    .required('required'),
  hasOtherBank: yup
    .boolean()
    .oneOf([true], 'hasOtherBank must be true')
    .required('required'),
  hasConfirmedForPersonalData: yup
    .boolean()
    .oneOf([true], 'hasConfirmedForPersonalData must be true')
    .required('required'),
});

export default SignUp;
