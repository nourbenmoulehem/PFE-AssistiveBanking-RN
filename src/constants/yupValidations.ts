import * as yup from 'yup';

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
const cinRegExp = /^[0-9]{8}$/;
const codePostalRegExp = /^\d{4}$/;

const loginSchema = yup.object().shape({
  email: yup.string().email('Adresse e-mail invalide').required('Ce champ est obligatoire'), 
  password: yup.string().required('Ce champ est obligatoire'),
});

const signUpSchema = yup.object().shape({
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

export { signUpSchema, loginSchema };