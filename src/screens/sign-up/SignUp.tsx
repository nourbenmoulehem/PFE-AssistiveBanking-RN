import React, {useState} from 'react';
import {
  View,
  Button,
  TextInput as NativeTextInput,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Switch} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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
  const [selectedImage, setSelectedImage] = useState<string | undefined>('');

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
  };

  const getStep = <T extends keyof Steps>(stepNumber: number): T => {
    switch (stepNumber) {
      case 1:
        return 'offer' as T;
      case 2:
        return 'gender' as T;
      case 3:
        return 'firstName' as T;
      case 4:
        return 'lastName' as T;
      case 5:
        return 'email' as T;
      case 6:
        return 'phoneNumber' as T;
      case 7:
        return 'birthday' as T;
      case 8:
        return 'nationality' as T;
      case 9:
        return 'statusCivil' as T;
      case 10:
        return 'nombre_enfant' as T;
      case 11:
        return 'socio_professional' as T;
      case 12:
        return 'revenu' as T;
      case 13:
        return 'natureActivite' as T;
      case 14:
        return 'secteurActivite' as T;
      default:
        return 'Invalid step' as T;
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const getFieldName = (step: number): keyof typeof initialValues => {
    const stepFieldName = getStep(step);
    return stepFieldName;
  };

  const handlePrevious = () => {
    setStep(step - 1);
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
      justifyContent: 'center',
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
      marginBottom: 20,
    },
    prevNextButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    prevButton: {
      backgroundColor: colors.main.buttonColor,
      padding: 10,
      alignItems: 'center',
      width: 80,
    },
    nextButton: {
      backgroundColor: colors.orange[300],
      padding: 10,
      alignItems: 'center',
      width: 80,
    },
    submitButton: {
      backgroundColor: colors.main.buttonColor,
      padding: 10,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
    },
    TextButton: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    },
    checkedButton: {
      backgroundColor: colors.orange[300],
      padding: 15,
      borderRadius: 8,
      marginRight: 10,
      marginBottom: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    uncheckedButton: {
      backgroundColor: colors.yellow[300],
      padding: 15,
      borderRadius: 8,
      marginRight: 10,
      marginBottom: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateContainer: {
      padding: 16,
      // backgroundColor: colors.main.backgroundColor,
      margin: 50,
      justifyContent: 'space-between',
      alignItems: 'center',
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
  const openImagePicker = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker errorMessage: ', response.errorMessage);
      } else {
        let imageUri = response.assets ? response.assets[0].uri : '';
        setSelectedImage(imageUri);
      }
    });
  };

  // open camera
  const handleCameraLaunch = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera errorMessage: ', response.errorMessage);
      } else {
        let imageUri = response.assets ? response.assets[0].uri : '';
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  };

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
            {/* <ProgressBar now={(step / 3) * 100} /> */}

            {step === 1 && (
              <View style={styles.inputWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    handleChange('offer')('WeStart');
                    setChecked('WeStart');
                    console.log('hani houni', touched.offer, errors.offer);

                    console.log('TouchableOPcity WeStart', values.offer);
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
              </View>
            )}

            {step === 2 && (
              <View style={styles.inputWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    handleChange('gender')('female');
                    setCheckedGender('female');

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
              </View>
            )}

            {step === 3 && (
              <View style={styles.inputWrapper}>
                <TextInput
                  value={values.firstName}
                  mode="outlined"
                  label="firstName"
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
            )}
            {step === 4 && (
              <View style={styles.inputWrapper}>
                <TextInput
                  value={values.lastName}
                  mode="outlined"
                  label="nom"
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
            )}
            {step === 5 && (
              <>
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
            {step === 6 && (
              <>
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
              <View style={styles.dateContainer}>
                <Button title="Show Date Picker" onPress={showDatePicker} />
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
              </View>
            )}
            {step === 8 && ( // adresse
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
            )}
            {step === 8 && ( // gouvernourat
              <>
                <Text>Status Civil</Text>
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
                />
              </>
            )}
            {step === 9 && ( // code postal
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
            )}
            {step === 10 && ( // nationalite
              <>
                <Text>Nationalité</Text>
                <RNPickerSelect
                  onValueChange={value => handleChange('nationality')(value)}
                  items={[
                    {label: 'Tunisienne', value: 'Tunisienne'},
                    {label: 'Française', value: 'Française'},
                  ]}
                  value={values.nationality}
                  // touchableWrapperProps={{
                  //   // <- Use touchableWrapperProps to pass accessibility properties
                  //   accessible: true,
                  //   accessibilityLabel: 'Favorite sport',
                  //   accessibilityHint: 'Double tap to select an option.',
                  //   accessibilityRole: 'combobox',
                  // }}
                />
              </>
            )}
            {step === 11 && ( // status civil
              <>
                <Text>Status Civil</Text>
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
                />
              </>
            )}
            {step === 12 && ( // nombre d'enfant
              <>
                <Text>Nombre d'enfant</Text>
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
                />
              </>
            )}
            {step === 13 && ( // socio_professional
              <>
                <Text>Socio professionel</Text>
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
                />
              </>
            )}
            {step === 14 &&
              !isEtudiant && ( // revenu_mensuel
                <>
                  <Text>Revenu</Text>
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
                  />
                </>
              )}
            {step === 15 &&
              !isEtudiant && ( // natureActivite
                <>
                  <Text>Nature Activite</Text>
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
                  />
                </>
              )}
            {step === 16 &&
              !isEtudiant && ( // secteurActivite
                <>
                  <Text>Secteur Activite</Text>
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
                  />
                </>
              )}
            {step === 17 && ( // num cin
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
            )}
            {step === 18 && ( // date de delivration
              <View style={styles.dateContainer}>
                <Text>date de delivration</Text>
                <Button title="Show Date Picker" onPress={showDatePicker} />
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
              </View>
            )}
            {step === 19 && ( // cin recto
              <>
                <Text>Cin recto</Text>
                <TouchableOpacity
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
                        setSelectedImage(imageUri);
                      }
                    });
                  }}>
                  <Text>Open Galery</Text>
                </TouchableOpacity>
                <TouchableOpacity
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
                        setSelectedImage(imageUri);
                        handleChange('cinRecto')(imageUri ? imageUri : '');
                        console.log(imageUri);
                      }
                    });
                  }}>
                  <Text>Open Camera</Text>
                </TouchableOpacity>
              </>
            )}
            {step === 20 && ( // cin verso
              <>
                <Text>Cin verso</Text>
                <TouchableOpacity
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
                        setSelectedImage(imageUri);
                      }
                    });
                  }}>
                  <Text>Open Galery</Text>
                </TouchableOpacity>
                <TouchableOpacity
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
                        setSelectedImage(imageUri);
                        console.log(imageUri);
                      }
                    });
                  }}>
                  <Text>Open Camera</Text>
                </TouchableOpacity>
              </>
            )}
            {step === 21 && ( // selfie
              <>
                <Text>selfie</Text>
                <TouchableOpacity
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
                        setSelectedImage(imageUri);
                      }
                    });
                  }}>
                  <Text>Open Galery</Text>
                </TouchableOpacity>
                <TouchableOpacity
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
                        setSelectedImage(imageUri);
                        console.log(imageUri);
                      }
                    });
                  }}>
                  <Text>Open Camera</Text>
                </TouchableOpacity>
              </>
            )}
            {step === 22 && ( // selfie
              <>
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
                  />
                  {touched.password && errors.password && (
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
                    label="Confirm password"
                    onChangeText={handleChange('passwordConfirm')}
                    onBlur={handleBlur('passwordConfirm')}
                    placeholder="passwordConfirm"
                    value={values.passwordConfirm}
                    contentStyle={styles.contentStyle}
                    outlineStyle={styles.outlineStyle}
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
            {step === 23 && ( // selfie
              <>
                <View style={styles.inputWrapper}>
                  <Switch
                    value={values.hasAmericanityIndex}
                    onValueChange={value => {
                      setFieldValue('hasAmericanityIndex', value);
                    }}
                  />
                  <Text>Americani</Text>

                  <Switch
                    value={values.hasOtherBank}
                    onValueChange={value => {
                      setFieldValue('hasOtherBank', value);
                    }}
                  />
                  <Text>Banka o5ra</Text>
                  <Switch
                    value={values.hasConfirmedForPersonalData}
                    onValueChange={value => {
                      setFieldValue('hasConfirmedForPersonalData', value);
                    }}
                  />
                  <Text>confirmi</Text>

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
                </View>
              </>
            )}

            <View style={styles.prevNextButtonsContainer}>
              {step > 1 && (
                <TouchableOpacity
                  style={styles.prevButton}
                  onPress={handlePrevious}>
                  <Text style={{color: 'white'}}>Previous</Text>
                </TouchableOpacity>
              )}
              {step < 23 ? (
                <TouchableOpacity
                  style={styles.nextButton}
                  // disabled={
                  //   values[getFieldName(step)] === '' ||
                  //   !!errors[getFieldName(step)]
                  // }
                  onPress={() => {
                    console.log('Next is pressed');

                    console.log(values[getFieldName(step)] === '');

                    handleNext();
                  }}>
                  <Text style={{color: 'white'}}>Next</Text>
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
  location: yup.string().required('required'),
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

  // .transform((value, originalValue) =>{
  //   if (isType(value)) {
  //     return value;
  //   }
  //   const result = parse(originalValue, "dd.MM.yyyy", new Date());
  //   return result;
  // })
  // .typeError("please enter a valid date")
  // .min("1969-11-13", "Date is too early")

  // occupation: yup.string().required('required'),
  //
  // password: yup
  //   .string()
  //   .matches(
  //     passwordRegExp,
  //     'Password must contain at least 5 characters, one uppercase letter, one lowercase letter, one number, and one special character',
  //   )
  //   .min(5, 'Password must be exactly 5 characters long')
  //   .required('required'),
  // agency: yup.string().required('required'),
});

export default SignUp;
