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

const nature_activite = [
  {label: 'Public', value: 'Public'},
  {label: 'Privé', value: 'Privé'},
]

const nationalite = [
  {label: 'Tunisienne', value: 'Tunisienne'},
  {label: 'Etrangère', value: 'Etrangère'},
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

export {
  status_civil,
  nombre_enfant,
  socio_professional,
  revenu_mensuel,
  secteur_activite,
  gouvernoratsOptions,
  nature_activite,
  nationalite
};