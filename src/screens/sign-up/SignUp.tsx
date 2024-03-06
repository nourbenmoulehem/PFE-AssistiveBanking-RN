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
  Linking,
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
import CustomTextInput from '../../components/TextInput';
import OfferButton from '../../components/OfferButton';
import GenderButton from '../../components/GenderButton';
import ImagePicker from '../../components/ImagePicker';

// form
import {Formik} from 'formik';
import * as yup from 'yup';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {tokens} from '../../assets/palette';

// axios
import axios from 'axios';


const SignUp = () => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);

  const [step, setStep] = useState(1);

  const [checkedOffer, setCheckedOffer] = useState<
    'WeStart' | 'WeTrust' | undefined
  >(undefined); // for offer (WeStart, WeTrust)
  const [checkedGender, setCheckedGender] = useState<
    'male' | 'female' | undefined
  >(undefined); // for gender
  const [isEtudiant, setIsEtudiant] = useState(false); // if the user is a student there is some options need to skip
  const [offreChanged, setOffreChanged] = useState(false);
  const [genderChanged, setGenderChanged] = useState(false);
  const [registration, setRegistration] = useState<string>('');

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
    agence: '',
  };

  axios.defaults.withCredentials = true;

  const register = async (values: Steps) => {
    console.log('🚀 ~ file: Form.jsx:71 ~ register ~ values', values);

    const res = await axios
      .post(
        `${process.env.API_BASE_URL}/api/v1/auth/register`,
        {values},
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      )
      .catch(err => {
        console.log('Error message:', err.message);
        // console.log("Error stack:", err.stack);
        setRegistration(
          "L'inscription a échoué, veuillez réessayer plus tard ❌",
        );
      });

    if (res && res.data) {
      // Handle successful response here
      const data = res.data;
      console.log('Registration successful:', data);
      setRegistration('Inscription réussie, veuillez vérifier votre email ✅');
      return res;
    }
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
    agence: string;
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
        return ['phoneNumber', 'phoneNumberConfirm'] as T[]; // baaed bch n7ot el agence
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
    return stepFieldName;
  };

  const handlePrevious = () => {
    if (step === 18 && isEtudiant) {
      setStep(step - 4);
    } else {
      setStep(step - 1);
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.main.backgroundColor,
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
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
      backgroundColor: colors.yellow[300],
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
    TextButtonNextPrev: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 1,
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
    switchContainer: {
      flexDirection: 'row',
      width: '100%',
      padding: 30,
      alignItems: 'center',
    },
    confirmationText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: mode === 'dark' ? colors.secondary[900] : colors.secondary[100],
    },
    linkText: {
      color: colors.main.buttonColor,
      fontSize: 16,
      fontWeight: 'bold',
    },
    error: {
    fontSize: 15,
    color: 'red',
    marginTop: 10,
    marginRight: 30,
  }
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

  // date picker related
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    // console.warn('A date has been picked: ', date);
    hideDatePicker();
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema} // we're using yup
      onSubmit={values => {
        register(values);
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
        dirty
        /* and other goodies */
      }) => (
        <>
          <View style={styles.container}>
            {/* <ProgressBar progress={(step / 24)} width={300} color={colors.orange[200]} /> */}

            {step === 1 && ( // offre
              <>
                <InputTitle title="Choisissez l'offre qui vous convient " />
                <View style={styles.inputWrapper}>
                  <OfferButton
                    offer="WeStart"
                    checkedGender={checkedOffer}
                    handleChange={offer => () => {
                      handleChange('offer')('WeStart');
                    }}
                    setCheckedOffer={setCheckedOffer}
                    setOffreChanged={setOffreChanged}
                  />

                  <OfferButton
                    offer="WeTrust"
                    checkedGender={checkedOffer}
                    handleChange={offer => () => {
                      handleChange('offer')('WeTrust');
                    }}
                    setCheckedOffer={setCheckedOffer}
                    setOffreChanged={setOffreChanged}
                  />
                  {touched.offer && errors.offer && (
                    <Text
                      style={styles.error}>
                      {errors.offer}
                    </Text>
                  )}

                  {offreChanged && (
                    <HelperTextInfo
                      info={`Vous avez choisi l'offre ${checkedOffer}`}
                    />
                  )}
                </View>
              </>
            )}

            {step === 2 && ( // gender
              <>
                <InputTitle title="Sélectionnez votre sexe " />
                <View style={styles.inputWrapper}>
                  <GenderButton
                    gender="female"
                    checkedGender={checkedGender}
                    setCheckedGender={setCheckedGender}
                    setGenderChanged={setGenderChanged}
                    handleChange={gender => () => {
                      handleChange('gender')('female');
                      console.log('values.gender', values.gender);
                    }}
                  />
                  <GenderButton
                    gender="male"
                    checkedGender={checkedGender}
                    setCheckedGender={setCheckedGender}
                    setGenderChanged={setGenderChanged}
                    handleChange={gender => () => {
                      handleChange('gender')('male');
                      console.log('values.gender', values.gender);
                    }}
                  />
                  {touched.gender && errors.gender && (
                    <Text
                      style={styles.error}>
                      {errors.gender}
                    </Text>
                  )}
                  {genderChanged && (
                    <HelperTextInfo
                      info={`Vous avez choisi ${checkedGender}`}
                    />
                  )}
                </View>
              </>
            )}

            {step === 3 && ( // firstName
              <>
                <InputTitle title="Sélectionnez votre prénom" />
                <CustomTextInput
                  mode="flat"
                  name="firstName"
                  placeholder="Votre prénom"
                />
              </>
            )}
            {step === 4 && ( // lastName
              <>
                <InputTitle title="Sélectionnez votre nom" />
                <CustomTextInput
                  mode="flat"
                  name="lastName"
                  placeholder="Votre nom de famille"
                />
              </>
            )}
            {step === 5 && ( // email & confirm
              <>
                <InputTitle title="Sélectionnez votre adresse e-mail et confirmez-la, s'il vous plaît." />
                <CustomTextInput
                  mode="flat"
                  name="email"
                  placeholder="Votre adresse e-mail"
                  keyboardType="email-address"
                />

                <CustomTextInput
                  mode="flat"
                  name="emailConfirm"
                  placeholder="Confirmez votre adresse email"
                  keyboardType="email-address"
                />
              </>
            )}
            {step === 6 && ( // phoneNumber & confirm
              <>
                <InputTitle title="Sélectionnez votre numéro de téléphone et confirmez-le, s'il vous plaît." />
                <CustomTextInput
                  mode="flat"
                  name="phoneNumber"
                  placeholder="Votre numéro de téléphone"
                  keyboardType="phone-pad"
                />
                <CustomTextInput
                  mode="flat"
                  name="phoneNumberConfirm"
                  placeholder="Confirmez votre numéro de téléphone"
                  keyboardType="phone-pad"
                />
              </>
            )}
            {step === 7 && ( // birthday
              <>
                <InputTitle title="Sélectionnez votre date de naissance" />
                <View style={styles.dateContainer}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      mode="outlined"
                      placeholder="Date de naissance"
                      value={values.birthday}
                      disabled={true}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.pickDateButton}
                    onPress={showDatePicker}>
                    <Icon name="calendar-month-outline" size={40} />
                    <Text style={styles.TextButtonNextPrev}>
                      Choisir une date
                    </Text>
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
                    handleConfirm(date);
                  }}
                  onCancel={hideDatePicker}
                />
              </>
            )}
            {step === 8 && ( // adresse
              <>
                <InputTitle title="Sélectionnez votre adresse" />
                <CustomTextInput
                  mode="flat"
                  name="adresse"
                  placeholder="Adresse"
                />
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

                <CustomTextInput
                  mode="flat"
                  name="codePostal"
                  placeholder="code postal"
                  keyboardType="phone-pad"
                />
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
                {touched.nationality && errors.nationality && (
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'red',
                      marginTop: 10,
                      marginRight: 30,
                    }}>
                    {errors.nationality}
                  </Text>
                )}
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
                {touched.statusCivil && errors.statusCivil && (
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'red',
                      marginTop: 10,
                      marginRight: 30,
                    }}>
                    {errors.statusCivil}
                  </Text>
                )}
              </>
            )}
            {step === 13 && ( // nombre d'enfant
              <>
                <InputTitle title="Sélectionnez le nombre d'enfants que vous avez" />
                <View style={styles.inputWrapper}>
                  <RNPickerSelect
                    onValueChange={value =>
                      handleChange('nombre_enfant')(value)
                    }
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
                {touched.nombre_enfant && errors.nombre_enfant && (
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'red',
                      marginTop: 10,
                      marginRight: 30,
                    }}>
                    {errors.nombre_enfant}
                  </Text>
                )}
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
                      } else {
                        setIsEtudiant(false);
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
                {touched.socio_professional && errors.socio_professional && (
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'red',
                      marginTop: 10,
                      marginRight: 30,
                    }}>
                    {errors.socio_professional}
                  </Text>
                )}
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

                <CustomTextInput
                  mode="flat"
                  name="cin"
                  placeholder="Votre numéro Carte d'Identité Nationale"
                  keyboardType="phone-pad"
                />
              </>
            )}
            {step === 19 && ( // date de delivration
              <>
                <InputTitle title="Sélectionnez la date de délivrance de votre CIN" />
                <View style={styles.dateContainer}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      mode="flat"
                      placeholder="date de délivrance de votre CIN"
                      value={values.dateDelivrationCin}
                      disabled={true}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.pickDateButton}
                    onPress={showDatePicker}>
                    <Icon name="calendar-month-outline" size={24} />
                    <Text style={styles.TextButtonNextPrev}>
                      Choisir une date
                    </Text>
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
                    handleConfirm(date);
                  }}
                  onCancel={hideDatePicker}
                />
              </>
            )}
            {step === 20 && ( // cin recto
              <>
              <ImagePicker
                title="Veuillez prendre en photo le recto de votre CIN ou l'importer"
                selectedImage={selectedCinRectoImage}
                setSelectedImage={setSelectedCinRectoImage}
                handleChange={(uri: string | undefined) => setFieldValue('cinRecto', uri)}
                field="cinRecto"
              />
              {touched.cinRecto && errors.cinRecto && (
                    <Text
                      style={styles.error}>
                      {errors.cinRecto}
                    </Text>
                  )}
                  </>
            )}
            {step === 21 && ( // cin verso
              <>
              <ImagePicker
                title="Veuillez prendre en photo le verso de votre CIN ou l'importer"
                selectedImage={selectedCinVersoImage}
                setSelectedImage={setSelectedCinVersoImage}
                handleChange={(uri: string | undefined) => setFieldValue('cinVerso', uri)}
                field="cinVerso"
              />
              {touched.cinVerso && errors.cinVerso && (
                    <Text
                      style={styles.error}>
                      {errors.cinVerso}
                    </Text>
                  )}
              </>
            )}
            {step === 22 && ( // selfie
              <>
              <ImagePicker
                title="Prenez ou importez votre photo"
                selectedImage={selectedSelfieImage}
                setSelectedImage={setSelectedSelfieImage}
                handleChange={(uri: string | undefined) => setFieldValue('selfie', uri)}
                field="selfie"
              />
              {touched.selfie && errors.selfie && (
                    <Text
                      style={styles.error}>
                      {errors.selfie}
                    </Text>
                  )}
              </>
            )}
            {step === 23 && ( // password
              <>
                <InputTitle title="Choisissez un mot de passe et confirmez-le, s'il vous plaît." />
                <CustomTextInput
                  mode="flat"
                  name="password"
                  placeholder="Choisissez un mot de passe"
                  secureTextEntry={true}
                />
                <CustomTextInput
                  mode="flat"
                  name="passwordConfirm"
                  placeholder="Confirmez votre mot de passe"
                  secureTextEntry={true}
                />
              </>
            )}
            {step === 24 && ( // confirmation
              <>
                <View style={styles.switchContainer}>
                  <Switch
                    value={values.hasAmericanityIndex}
                    onValueChange={value => {
                      setFieldValue('hasAmericanityIndex', value);
                    }}
                  />
                  <Text style={styles.confirmationText}>
                    Je confirme que je n'ai pas d'indice d'américanité.
                  </Text>
                </View>

                <View style={styles.switchContainer}>
                  <Switch
                    value={values.hasOtherBank}
                    onValueChange={value => {
                      setFieldValue('hasOtherBank', value);
                    }}
                  />
                  <Text style={styles.confirmationText}>
                    Je suis client dans une autre banque
                  </Text>
                </View>

                <View style={styles.switchContainer}>
                  <Switch
                    value={values.hasConfirmedForPersonalData}
                    onValueChange={value => {
                      setFieldValue('hasConfirmedForPersonalData', value);
                    }}
                  />
                  <Text style={styles.confirmationText}>
                    J'accepte les{' '}
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://www.webank.com.tn/fr/mentions-legales',
                        )
                      }>
                      <Text style={styles.linkText}>
                        mentions légales relatives à la protection des données
                        personnelles.
                      </Text>
                    </TouchableOpacity>{' '}
                  </Text>
                </View>
                {touched.hasAmericanityIndex && errors.hasAmericanityIndex && (
                  <Text
                    style={styles.error}>
                    <Text>{errors.hasAmericanityIndex}</Text>
                  </Text>
                )}
                {touched.hasConfirmedForPersonalData &&
                  errors.hasConfirmedForPersonalData && (
                    <Text
                      style={styles.error}>
                      {errors.hasConfirmedForPersonalData}
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
                  disabled={getFieldName(step).some(
                    fieldName =>
                      values[fieldName] === '' || !!errors[fieldName],
                  )}
                  onPress={() => {
                    const fieldNames = getFieldName(step);
                    handleNext();
                  }}>
                  <Text style={styles.TextButtonNextPrev}>Suivant</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.submitButton}
                  // disabled={!isValid || !dirty}
                  onPress={() => {
                    console.log('VALUES:', values);
                    console.log('ERRORS', errors);
                    handleSubmit();
                  }} // handlesubmit will collect all the values and send it to onSubmit itself
                >
                  <Text style={styles.TextButtonNextPrev}>Valider</Text>
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
    .oneOf(['WeStart', 'WeTrust'], 'Offer Invalide')
    .required('Ce champ est obligatoire'),
  gender: yup
    .string()
    .oneOf(['female', 'male'], 'Invalid gender')
    .required('Ce champ est obligatoire'),
  firstName: yup.string().required('Ce champ est obligatoire'),
  lastName: yup.string().required('Ce champ est obligatoire'),
  email: yup
    .string()
    .email('Adresse e-mail invalide')
    .required('Ce champ est obligatoire'),
  emailConfirm: yup
    .string()
    .oneOf([yup.ref('email')], 'Les adresses e-mail doivent correspondre')
    .email('Adresse e-mail invalide')
    .required('Ce champ est obligatoire'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Numéro de téléphone invalide')
    .required('Ce champ est obligatoire'),
  phoneNumberConfirm: yup
    .string()
    .oneOf(
      [yup.ref('phoneNumber')],
      'Les numéros de téléphone doivent correspondre',
    )
    .matches(phoneRegExp, 'Numéro de téléphone invalide')
    .required('Ce champ est obligatoire'),
  birthday: yup.date().required('Ce champ est obligatoire'),
  adresse: yup.string().required('Ce champ est obligatoire'),
  gouvernorat: yup.string().required('Ce champ est obligatoire'),
  codePostal: yup
    .string()
    .matches(
      codePostalRegExp,
      'Code postal invalide. Doit contenir 4 chiffres.',
    )
    .required('Ce champ est obligatoire'),
  nationality: yup.string().required('Ce champ est obligatoire'),
  statusCivil: yup.string().required('Ce champ est obligatoire'),
  nombre_enfant: yup.string().required('Ce champ est obligatoire'),
  socio_professional: yup.string().required('Ce champ est obligatoire'),
  revenu: yup.string(),
  natureActivite: yup.string(),
  secteurActivite: yup.string(),
  cin: yup
    .string()
    .matches(cinRegExp, 'Format CIN invalide. Doit contenir 8 chiffres.')
    .required('Ce champ est obligatoire'),
  dateDelivrationCin: yup.date().required('Ce champ est obligatoire'),
  password: yup
    .string()
    .matches(
      passwordRegExp,
      'Le mot de passe doit contenir au moins 5 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
    )
    .min(5, 'Le mot de passe doit avoir exactement 5 caractères')
    .required('Ce champ est obligatoire'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre')
    .matches(
      passwordRegExp,
      'Le mot de passe doit contenir au moins 5 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
    )
    .min(5, 'Le mot de passe doit avoir exactement 5 caractères')
    .required('Ce champ est obligatoire'),
  hasAmericanityIndex: yup
    .boolean()
    .oneOf([true], "Aucun indice d'américanité requis.")
    .required('Ce champ est obligatoire'),
  hasOtherBank: yup
    .boolean()
    .oneOf([true], ' ?? ')
    .required('Ce champ est obligatoire'),
  hasConfirmedForPersonalData: yup
    .boolean()
    .oneOf([true], 'La confirmation des données personnelles est requis')
    .required('Ce champ est obligatoire'),
  cinRecto: yup.string().required('Ce champ est obligatoire'),
  cinVerso: yup.string().required('Ce champ est obligatoire'),
  selfie: yup.string().required('Ce champ est obligatoire'),
});

export default SignUp;

