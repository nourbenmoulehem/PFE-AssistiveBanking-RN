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
  ActivityIndicator,
} from 'react-native';
import {Switch, ProgressBar, MD3Colors } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import ProgressBar from 'react-native-progress/Bar';

// custom components
import InputTitle from '../../components/InputTitle';
import HelperTextInfo from '../../components/HelperTextInfo';
import CustomTextInput from '../../components/TextInput';
import OfferButton from '../../components/OfferButton';
import GenderButton from '../../components/GenderButton';
import ImagePicker from '../../components/ImagePicker';
import DatePickerInput from '../../components/DatePicker';
import CustomSwitch from '../../components/Switch';
import CustomButton from '../../components/PrevNextRegisterButtons';
import Modal from '../../components/Modal';

// constants
import {
  status_civil,
  nombre_enfant,
  socio_professional,
  revenu_mensuel,
  secteur_activite,
  gouvernoratsOptions,
  nature_activite,
  nationalite,
  agenceItems,
} from '../../constants/items';

import {signUpSchema} from '../../constants/yupValidations';

// form
import {Formik} from 'formik';

// navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {tokens} from '../../assets/palette';

// axios
import axios from 'axios';
import PickerInput from '../../components/PickerInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({navigation}: Props) => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);

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

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRedirectSignIn, setIsRedirectSignIn] = useState(false);

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
    setVisible(true);
    setLoading(true);
    let res: any;
    res = await axios
      .post(
        `${process.env.API_BASE_URL}/api/v1/auth/register`,
        {
          email: values.email.toLowerCase(),
          password: values.password,
          cin: values.cin,
          offer: values.offer,
          dateDelivrationCin: values.dateDelivrationCin,
          cinRecto: values.cinRecto,
          cinVerso: values.cinVerso,
          selfie: values.selfie,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          gender: values.gender,
          birthday: values.birthday,
          nationality: values.nationality,
          statusCivil: values.statusCivil,
          nombre_enfant: values.nombre_enfant,
          socio_professional: values.socio_professional,
          secteurActivite: values.secteurActivite,
          natureActivite: values.natureActivite,
          revenu: values.revenu,
          codePostal: values.codePostal,
          gouvernorat: values.gouvernorat,
          adresse: values.adresse,
          agence: values.agence,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      )
      .catch(err => {
        setVisible(true);
        setIsRedirectSignIn(false);
        setLoading(false);
        setMessage(err.response.data);
      });
    // .finally(() => {
    //   setLoading(false);
    // });

    if (res && res.data) {
      setLoading(false);
      const data = res.data;
      setMessage(data);
      setIsRedirectSignIn(true);
      return res;
    }
  };
  const onClose = () => setVisible(false);

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
        return ['agence'] as T[];
      case 8:
        return ['birthday'] as T[];
      case 9:
        return ['adresse'] as T[];
      case 10:
        return ['gouvernorat'] as T[];
      case 11:
        return ['codePostal'] as T[];
      case 12:
        return ['nationality'] as T[];
      case 13:
        return ['statusCivil'] as T[];
      case 14:
        return ['nombre_enfant'] as T[];
      case 15:
        return ['socio_professional'] as T[];
      case 16:
        return ['revenu'] as T[];
      case 17:
        return ['natureActivite'] as T[];
      case 18:
        return ['secteurActivite'] as T[];
      case 19:
        return ['cin'] as T[];
      case 20:
        return ['dateDelivrationCin'] as T[];
      case 21:
        return ['cinRecto'] as T[];
      case 22:
        return ['cinVerso'] as T[];
      case 23:
        return ['selfie'] as T[];
      case 24:
        return ['password', 'confirmPassword'] as T[];
      default:
        return ['secteurActivite'] as T[];
    }
  };

  const handleNext = () => {
    if (step === 15 && isEtudiant) {
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
    if (step === 19 && isEtudiant) {
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
    switchContainer: {
      flexDirection: 'row',
      width: '100%',
      padding: 30,
      alignItems: 'center',
    },
    confirmationText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: mode === 'dark' ? colors.secondary[600] : colors.secondary[100],
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
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      style={{flex: 1}}
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20,
        backgroundColor: colors.main.backgroundColor,
      }}>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema} // we're using yup
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
          dirty,
          /* and other goodies */
        }) => (
          <>
            <View style={styles.container}>
              <ProgressBar animatedValue={(step / 25)} style={{ height: hp(0.7), width: wp(80) }} color={MD3Colors.primary50} />

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
                    {errors.offer && (
                      <Text style={styles.error}>{errors.offer}</Text>
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
                      }}
                    />
                    <GenderButton
                      gender="male"
                      checkedGender={checkedGender}
                      setCheckedGender={setCheckedGender}
                      setGenderChanged={setGenderChanged}
                      handleChange={gender => () => {
                        handleChange('gender')('male');
                      }}
                    />
                    {errors.gender && (
                      <Text style={styles.error}>{errors.gender}</Text>
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
              {step === 7 && ( // AGENCE
                <>
                  <PickerInput
                    title="Sélectionnez l'agence la plus proche de vous"
                    name="Agence"
                    items={agenceItems}
                    value={values.agence}
                    onValueChange={value => handleChange('agence')(value)}
                  />
                  {errors.agence && (
                    <Text style={styles.error}>{errors.agence}</Text>
                  )}
                </>
              )}
              {step === 8 && ( // birthday
                <>
                  <DatePickerInput
                    title="Sélectionnez votre date de naissance"
                    name="date de naissance"
                    field="birthday"
                    placeholder="Date de naissance"
                    value={values.birthday}
                    handleChange={field => value => {
                      // Create a fake event object
                      const event = {
                        target: {
                          name: field,
                          value,
                        },
                      };
                      // Call Formik's handleChange with the fake event
                      handleChange(event);
                    }}
                  />
                  {errors.birthday && (
                    <Text style={styles.error}>{errors.birthday}</Text>
                  )}
                </>
              )}
              {step === 9 && ( // adresse
                <>
                  <InputTitle title="Sélectionnez votre adresse" />
                  <CustomTextInput
                    mode="flat"
                    name="adresse"
                    placeholder="Adresse"
                  />
                </>
              )}
              {step === 10 && ( // gouvernorat
                <>
                  <PickerInput
                    title="Gouvernorat"
                    name="Gouvernorat"
                    items={gouvernoratsOptions}
                    value={values.gouvernorat}
                    onValueChange={value => handleChange('gouvernorat')(value)}
                  />
                  {errors.gouvernorat && (
                    <Text style={styles.error}>{errors.gouvernorat}</Text>
                  )}
                </>
              )}
              {step === 11 && ( // code postal
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
              {step === 12 && ( // nationalite
                <>
                  <PickerInput
                    name="nationalité"
                    title="Sélectionnez votre nationalité"
                    items={nationalite}
                    value={values.nationality}
                    onValueChange={value => handleChange('nationality')(value)}
                  />
                  {errors.nationality && (
                    <Text style={styles.error}>{errors.nationality}</Text>
                  )}
                </>
              )}
              {step === 13 && ( // status civil
                <>
                  <PickerInput
                    name="Status civil"
                    title="Sélectionnez votre status civil"
                    items={status_civil}
                    value={values.statusCivil}
                    onValueChange={value => handleChange('statusCivil')(value)}
                  />
                  {errors.statusCivil && (
                    <Text style={styles.error}>{errors.statusCivil}</Text>
                  )}
                </>
              )}
              {step === 14 && ( // nombre d'enfant
                <>
                  <PickerInput
                    name="Nombre d'enfant"
                    title="Sélectionnez le nombre d'enfants que vous avez"
                    items={nombre_enfant}
                    value={values.nombre_enfant}
                    onValueChange={value =>
                      handleChange('nombre_enfant')(value)
                    }
                  />
                  {errors.nombre_enfant && (
                    <Text style={styles.error}>{errors.nombre_enfant}</Text>
                  )}
                </>
              )}
              {step === 15 && ( // socio_professional
                <>
                  <PickerInput
                    name="Statut socio-professionnel"
                    title="Sélectionnez votre statut socio-professionnel"
                    items={socio_professional}
                    value={values.socio_professional}
                    onValueChange={value => {
                      handleChange('socio_professional')(value);
                      if (value === 'Etudiant') {
                        setIsEtudiant(true);
                      } else {
                        setIsEtudiant(false);
                      }
                    }}
                  />
                  {errors.socio_professional && (
                    <Text style={styles.error}>
                      {errors.socio_professional}
                    </Text>
                  )}
                </>
              )}
              {step === 16 &&
                !isEtudiant && ( // revenu_mensuel
                  <>
                    <PickerInput
                      name="Revenu net mensuel"
                      title="Sélectionnez votre revenu net mensuel"
                      items={revenu_mensuel}
                      value={values.revenu}
                      onValueChange={value => handleChange('revenu')(value)}
                    />

                    {errors.revenu && (
                      <Text style={styles.error}>{errors.revenu}</Text>
                    )}
                  </>
                )}
              {step === 17 &&
                !isEtudiant && ( // natureActivite
                  <>
                    <PickerInput
                      name="Nature de l'activité"
                      title="Sélectionnez la nature de votre activité"
                      items={nature_activite}
                      value={values.natureActivite}
                      onValueChange={value =>
                        handleChange('natureActivite')(value)
                      }
                    />
                    {errors.natureActivite && (
                      <Text style={styles.error}>{errors.natureActivite}</Text>
                    )}
                  </>
                )}
              {step === 18 &&
                !isEtudiant && ( // secteurActivite
                  <>
                    <PickerInput
                      name="Secteur d'activité"
                      title="Sélectionnez votre secteur d'activité"
                      items={secteur_activite}
                      value={values.secteurActivite}
                      onValueChange={value =>
                        handleChange('secteurActivite')(value)
                      }
                    />
                    {errors.secteurActivite && (
                      <Text style={styles.error}>{errors.secteurActivite}</Text>
                    )}
                  </>
                )}
              {step === 19 && ( // num cin
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
              {step === 20 && ( // date de delivration
                <>
                  <DatePickerInput
                    title="Sélectionnez la date de délivrance de votre CIN"
                    name="date de délivration CIN"
                    field="dateDelivrationCin"
                    placeholder="date de délivrance de votre CIN"
                    value={values.dateDelivrationCin}
                    handleChange={field => value => {
                      const event = {
                        target: {
                          name: field,
                          value,
                        },
                      };
                      handleChange(event);
                    }}
                  />
                  {errors.dateDelivrationCin && (
                    <Text style={styles.error}>
                      {errors.dateDelivrationCin}
                    </Text>
                  )}
                </>
              )}
              {step === 21 && ( // cin recto
                <>
                  <ImagePicker
                    name="CIN recto"
                    title="Veuillez prendre en photo le recto de votre CIN ou l'importer"
                    selectedImage={selectedCinRectoImage}
                    setSelectedImage={setSelectedCinRectoImage}
                    handleChange={(uri: string | undefined) =>
                      setFieldValue('cinRecto', uri)
                    }
                    field="cinRecto"
                  />
                  {errors.cinRecto && (
                    <Text style={styles.error}>{errors.cinRecto}</Text>
                  )}
                </>
              )}
              {step === 22 && ( // cin verso
                <>
                  <ImagePicker
                    name="CIN verso"
                    title="Veuillez prendre en photo le verso de votre CIN ou l'importer"
                    selectedImage={selectedCinVersoImage}
                    setSelectedImage={setSelectedCinVersoImage}
                    handleChange={(uri: string | undefined) =>
                      setFieldValue('cinVerso', uri)
                    }
                    field="cinVerso"
                  />
                  {errors.cinVerso && (
                    <Text style={styles.error}>{errors.cinVerso}</Text>
                  )}
                </>
              )}
              {step === 23 && ( // selfie
                <>
                  <ImagePicker
                    name="Selfie"
                    title="Prenez ou importez votre photo"
                    selectedImage={selectedSelfieImage}
                    setSelectedImage={setSelectedSelfieImage}
                    handleChange={(uri: string | undefined) =>
                      setFieldValue('selfie', uri)
                    }
                    field="selfie"
                  />
                  {errors.selfie && (
                    <Text style={styles.error}>{errors.selfie}</Text>
                  )}
                </>
              )}
              {step === 24 && ( // password
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
              {step === 25 && ( // confirmation
                <>
                  <CustomSwitch
                    value={values.hasAmericanityIndex}
                    onValueChange={value => {
                      setFieldValue('hasAmericanityIndex', value);
                    }}
                    text="Je confirme que je n'ai pas d'indice d'américanité."
                  />

                  <CustomSwitch
                    value={values.hasOtherBank}
                    onValueChange={value => {
                      setFieldValue('hasOtherBank', value);
                    }}
                    text=" Je suis client dans une autre banque"
                  />

                  <View style={styles.switchContainer}>
                    <Switch
                      value={values.hasConfirmedForPersonalData}
                      onValueChange={value => {
                        setFieldValue('hasConfirmedForPersonalData', value);
                      }}
                      accessible={true}
                      accessibilityRole="switch"
                      accessibilityLabel="J'accepte les mentions légales relatives à la protection des données personnelles."
                      accessibilityState={{
                        checked: values.hasConfirmedForPersonalData,
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
                  {errors.hasAmericanityIndex && (
                    <Text style={styles.error}>
                      <Text>{errors.hasAmericanityIndex}</Text>
                    </Text>
                  )}
                  {errors.hasConfirmedForPersonalData && (
                    <Text style={styles.error}>
                      {errors.hasConfirmedForPersonalData}
                    </Text>
                  )}
                </>
              )}
              <View style={styles.prevNextButtonsContainer}>
                {step > 1 && (
                  <CustomButton onPress={handlePrevious} text="Précédent" />
                )}
                {step < 25 ? (
                  <CustomButton
                    onPress={() => {
                      handleNext();
                    }}
                    text="Suivant"
                    values={values}
                    errors={errors}
                    getFieldName={getFieldName}
                    step={step}
                    // disabled={getFieldName(step).some(
                    //   fieldName =>
                    //     values[fieldName] === '' || !!errors[fieldName],
                    // )}
                  />
                ) : (
                  <CustomButton
                    onPress={() => {
                      // console.log('ERRORS', errors);
                      handleSubmit();
                    }}
                    text="Valider"
                  />
                )}
              </View>
            </View>
          </>
        )}
      </Formik>

      <Modal
        visible={visible}
        isRedirectSignIn={isRedirectSignIn}
        isLoading={loading}
        error={message}
        onClose={onClose}
        navigation={navigation}
      />
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
