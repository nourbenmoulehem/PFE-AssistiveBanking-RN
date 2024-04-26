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


const agenceItems = [
  {
      label: "succursale du siège",
      value: "24 Rue Hédi Karray, Centre Urbain Nord"
  },
  {
      label: "AGENCE AV. CARTHAGE",
      value: "13 bis, avenue de Carthage"
  },
  {
      label: "AGENCE AV.LIBERTE TUNIS",
      value: "45, AVENUE DE LA LIBERTE"
  },
  {
      label: "AGENCE BAB JEDID",
      value: "19 ET 21 RUE BAB JEDID"
  },
  {
      label: "AGENCE BAB SOUIKA",
      value: "CENTRE COMMERCIAL BAB SOUIKA - EL HALFAOUINE, PLACE BAB SOUIKA"
  },
  {
      label: "AGENCE BACH HAMBA",
      value: "56, AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE BARCELONE",
      value: "9, RUE DE HOLLANDE"
  },
  {
      label: "AGENCE BELVEDERE II 106",
      value: "95, AVENUE DE LA LIBERTE"
  },
  {
      label: "AGENCE EL HRAIRIA",
      value: "233, AVENUE HRAIRIA, EL HRAIRIA"
  },
  {
      label: "AGENCE EL MECHTEL",
      value: "10, AVENUE OULED HAFOUZ"
  },
  {
      label: "AGENCE EZZOUHOUR",
      value: "20, BIS RUE 4001, CITE EZZOUHOUR II"
  },
  {
      label: "AGENCE KHEIREDDINE PACHA",
      value: "Avenue Kheireddine Pacha, montplaisir"
  },
  {
      label: "AGENCE LA GOULETTE",
      value: "10 FRAHAT HACHED"
  },
  {
      label: "AGENCE LE BARDO",
      value: "131, BOULEVARD 20 MARS LE BARDO"
  },
  {
      label: "AGENCE LE KRAM",
      value: "165 AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE LE PASSAGE",
      value: "53, AVENUE DE PARIS"
  },
  {
      label: "AGENCE MUTUELLEVILLE",
      value: "Angle63AvenueJugurthaet2 RueMutuelleVille, 1082Tunis"
  },
  {
      label: "AGENCE PLACE M.BEY TUNIS",
      value: "89 RUE HOUSSINE BOUZAYENNE"
  },
  {
      label: "AGENCE NAFTA",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE BIR LAHMAR",
      value: "43 AVENUE HABIB BOURGUIBA - BIR LAHMAR"
  },
  {
      label: "AGENCE GHOMRASSEN",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE REMADA",
      value: "PLACE DE L'INDEPENDANCE"
  },
  {
      label: "AGENCE BOUFICHA",
      value: "AVENUE HEDI CHAKER"
  },
  {
      label: "AGENCE HAMMAM SOUSSE",
      value: "263, ANGLE GP1 ET RUE ORAN 4011 HAMMAM SOUSSE"
  },
  {
      label: "AGENCE SOUSSE ERRIADH",
      value: "RESIDENCE HELA ROUTE PERIPHERIQUE SOUSSE-MONASTIR 4023 CITE ERRIADH"
  },
  {
      label: "AGENCE SOUSSE SAHLOUL 2",
      value: "Angle de la Rue khalifa EL Karoui & Ahmed Taoufik El MADANI -SOUSSE"
  },
  {
      label: "AGENCE SOUSSE SENGHOR",
      value: "2, AVENUE LEOPOL CEDAR SENGHOR"
  },
  {
      label: "AGENCE OULED HAFFOUZ",
      value: "N°15, CITE COMMERCIALE OULED HAFFOUZ"
  },
  {
      label: "AGENCE JEBENIANA",
      value: "18 PLACE 02 MARS 3080"
  },
  {
      label: "AGENCE SFAX EL BOUSTEN",
      value: "ROUTE DE MAHDIA KM 2,5 SFAX"
  },
  {
      label: "AGENCE SFAX EL HABIB",
      value: "AV. DE LA JORDANIE CITE EL HABIB"
  },
  {
      label: "AGENCE SFAX EL JADIDA",
      value: "17, AVENUE 14 Janvier 2011"
  },
  {
      label: "AGENCE SFAX HABIB THAMEUR",
      value: "ANGLE AVENUE ABOU KACHEM ECCEHBBI ET RUE HABIB THAMEUR SFAX"
  },
  {
      label: "AGENCE SFAX HACHED",
      value: "AVENUE FARHAT HACHED SFAX"
  },
  {
      label: "AGENCE SFAX INTILAKA",
      value: "N° 61, rue Haffouz Sfax El Medina"
  },
  {
      label: "AGENCE SFAX LES JARDINS",
      value: "17, Avenue 5 août"
  },
  {
      label: "AGENCE SFAX MENZEL CHAKER",
      value: "Route Menzel chaker"
  },
  {
      label: "AGENCE SFAX ZEPHIR",
      value: "IMMEUBLE ZAPHYR , AVENUE MAJIDA BOULILA"
  },
  {
      label: "AGENCE BENI KHIAR",
      value: "Avenue Habib Bourguiba – Béni Khiar"
  },
  {
      label: "AGENCE BOU ARGOUB",
      value: "Avenue de la Révolution"
  },
  {
      label: "AGENCE MENZEL BOUZELFA",
      value: "Av Habib BOURGUIBA - Menzel Bouzelfa"
  },
  {
      label: "AGENCE MENZEL TEMIME",
      value: "50, AVENUE DE L'ENVIRONNEMENT"
  },
  {
      label: "AGENCE JEMMAL",
      value: "19, AVENUE DE LA REPUBLIQUE"
  },
  {
      label: "AGENCE ZARMDINE",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE BEN GARDANE",
      value: "AVENUE DES MARTYRS ET ROUTE DE TUNIS"
  },
  {
      label: "AGENCE JERBA EL MAY",
      value: "RUE YOUSSEF LABBASSI"
  },
  {
      label: "AGENCE JERBA MIDOUN",
      value: "ANGLE DE AVENUE HABIB BOURGUIBA & RUE DE CARTHAGE MIDOUN CENTRE"
  },
  {
      label: "AGENCE ZARZIS",
      value: "10, AVENUE MOHAMED V"
  },
  {
      label: "AGENCE DEN DEN",
      value: "AVENUE DE L'INDEPENDANCE"
  },
  {
      label: "AGENCE OUED ELLIL",
      value: "22, AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE BOUMERDES",
      value: "12, AVENUE FARHAT HACHED"
  },
  {
      label: "AGENCE EL DJEM",
      value: "AVENUE TAIEB MHIRI"
  },
  {
      label: "AGENCE KSOUR ESSAF",
      value: "Avenue Habib Thameur Route de Sfax - Ksour Essaf"
  },
  {
      label: "AGENCE DJERISSA",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE TAJEROUINE",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE DOUZ",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE GOLAA",
      value: "Avenue 20 Mars, Cité Izdihar - Golaa"
  },
  {
      label: "AGENCE SOUK EL AHAD",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE BOU SALEM",
      value: "37, Rue Salah Ben Youssef - BOU SALEM"
  },
  {
      label: "AGENCE TABARKA",
      value: "RESIDENCE PORTO CORALLO"
  },
  {
      label: "AGENCE GAFSA KSAR",
      value: "Place de la Terre - GAFSA"
  },
  {
      label: "AGENCE GAFSA PLACE DU MARCHE",
      value: "6, PLACE DU MARCHE - GAFSA"
  },
  {
      label: "AGENCE MOULARES",
      value: "RTE DE GAFSA MOULARES"
  },
  {
      label: "AGENCE REDEYEF",
      value: "16, AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE GABES EL MENZEL",
      value: "93, AVENUE DE LA REPUBLIQUE"
  },
  {
      label: "AGENCE MARETH",
      value: "Angle rue de gabès et route GP1 - Mareth"
  },
  {
      label: "AGENCE METOUIA",
      value: "5, AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE BIZERTE EL JALAA",
      value: "Avenue 14 Janvier"
  },
  {
      label: "AGENCE EL ALIA",
      value: "Avenue Habib Bourguiba –EL ALIA"
  },
  {
      label: "AGENCE MENZEL JEMIL",
      value: "AVENUE H.BOURGUIBA"
  },
  {
      label: "AGENCE BEN AROUS",
      value: "59, AVENUE DE FRANCE"
  },
  {
      label: "AGENCE BOUGARNIN",
      value: "Angle Av de la République GP1 et Rue de Monastir"
  },
  {
      label: "AGENCE FOUCHANA",
      value: "Avenue de l’Indépendance - Fouchana"
  },
  {
      label: "AGENCE HAMMAM LIF",
      value: "AVENUE HABIB BOURGUIBA HAMMAM LIF 2050"
  },
  {
      label: "AGENCE ARIANA",
      value: "9, AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE BORJ LOUZIR",
      value: "15 Rue Mustapha Mohsen Borj Louzir"
  },
  {
      label: "AGENCE INTILAKA",
      value: "10, Avenue Ibn Khaldoun, Cité Ettadhamen"
  },
  {
      label: "AGENCE MENZAH 8",
      value: "IMMEUBLE MESSAI, AVENUE OTHMAN IBN AFFANE"
  },
  {
      label: "AGENCE M'NIHLA",
      value: "Route de Bizerte – M’nihla"
  },
  {
      label: "AGENCE NOUVELLE ARIANA",
      value: "ANGLE DE L AVENUE MUSTAPHA HJAIEJ ET AVENUE EL MILAHA"
  },
  {
      label: "AGENCE RIADH EL ANDALOUS",
      value: "Résidence Omrane 10 – GP 8 Cité El Ghazela"
  },
  {
      label: "AGENCE SIDI THABET",
      value: "AVENUE H.BOURGUIBA"
  },
  {
      label: "Agence Gabes",
      value: "AVENUE HABIB BOURGUIBA GABES 6000"
  },
  {
      label: "Agence Tataouine",
      value: "21, AVENUE FARHAT HACHED"
  },
  {
      label: "Agence Tozeur",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "AGENCE AIN ZAGHOUAN",
      value: "Avenue Khaled Ibn Walid – Ain Zaghouan"
  },
  {
      label: "Agence Sidi Bouzid",
      value: "AVENUE FARHAT HACHED"
  },
  {
      label: "Agence Metlaoui",
      value: "6, PLACE 2 MARS 1934 METLAOUI"
  },
  {
      label: "Agence Mrezga",
      value: "Résidence INES route de Nabeul Hammamet MC 28 face à la clinique les violettes, Mrezga Hammamet"
  },
  {
      label: "Agence Béja",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence El Menzah 1",
      value: "10 Av. Charles Nicole, Menzah 1"
  },
  {
      label: "Agence Carthage Byrsa",
      value: "Angle  Avenue Habib Bourguiba et  Rue 2 mars 1934 - Carthage Byrsa"
  },
  {
      label: "Agence Mahdia",
      value: "12, AVENUE FARHAT HACHED"
  },
  {
      label: "Agence Kebili",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sousse Habib Bourguiba",
      value: "PLACE FARHAT HACHED"
  },
  {
      label: "Agence Moknine",
      value: "13, AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Korba",
      value: "169 Avenue Habib Bourguiba - Korba"
  },
  {
      label: "Agence Le Kef",
      value: "IMMEUBLE CTAMA, AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Menzel Bourguiba",
      value: "RUE 17, JANVIER MENZEL BOURGUIBA"
  },
  {
      label: "Agence Jendouba",
      value: "RUE ALI BELHOUANE 8100 JENDOUBA"
  },
  {
      label: "Agence M'Saken",
      value: "RUE TAHAR HCHICHA"
  },
  {
      label: "Agence El Manar 1",
      value: "Résidence Jinène Hannibal EL Manar"
  },
  {
      label: "Agence Siliana",
      value: "AVENUE HABIB BOURGUIBA - 6100 siliana"
  },
  {
      label: "Agence Habib Bourguiba Tunis",
      value: "17, Avenue Habib Bourguiba- Tunis,"
  },
  {
      label: "Agence Nabeul Les Jardins",
      value: "08 Avenue Mongi BALI, Nabeul"
  },
  {
      label: "Agence El Aghaliba Kairouan",
      value: "AVENUE BAIT EL HECKMA MANSOURA"
  },
  {
      label: "Agence Sfax Moulin Ville",
      value: "Résidence les Jasmins, Route de Tunis Km 1,5 MOULINVILLE"
  },
  {
      label: "Agence El Menzah 6",
      value: "147, Avenue Othmen Ibn Affen - El Menzah 6"
  },
  {
      label: "Agence Sakiet Ezzit",
      value: "Route de Tunis KM 7 - Sakiet Ezzit"
  },
  {
      label: "Agence Lac Marina",
      value: "AVENUE TAHAR HADDAD, IMMEUBLE LLOYD, LES BERGES DU LAC"
  },
  {
      label: "Agence Les Jardins du Lac",
      value: "Angle de l’immeuble Yesmine du lac, les Jardin du Lac, La Goulette"
  },
  {
      label: "Agence Bizerte Ville",
      value: "Angle de avenue Taieb M'hiri et rue Habib Thameur"
  },
  {
      label: "Agence La Marsa 2",
      value: "Place Moncef Bey (Angle Rue Abdelaaziz Chtioui)"
  },
  {
      label: "Agence Zaghouane",
      value: "AVENUE DE L'INDEPENDANCE"
  },
  {
      label: "Agence Monastir El Helyia",
      value: "IMMEUBLE RHIM CENTRE, AVENUE TAIEB MHIRI"
  },
  {
      label: "Agence Mannouba",
      value: "1, AVENUE HABIB BOURGUIBA MANNOUBA"
  },
  {
      label: "Agence Dar Fadhal",
      value: "Résidence SALMA, avenue Taieb MHIRI"
  },
  {
      label: "Agence Ennasr Hédi Nouira",
      value: "RESIDENCE OSALIS GARDEN, AVENUE HEDI NOUIRA"
  },
  {
      label: "Agence Megrine",
      value: "31, avenue habib Bourguiba"
  },
  {
      label: "Agence Gafsa l'Environnement",
      value: "17, Bvd de l'environnement - GAFSA"
  },
  {
      label: "Agence Kélibia",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bardo Centre",
      value: "Angle de avenue Habib Bourguiba et rue Abdelhamid Tlili,"
  },
  {
      label: "Agence Sousse Ennakhil",
      value: "Boulevard Ennakhil Khezama - Sousse"
  },
  {
      label: "Agence Boumhel",
      value: "Boulevard de l’environnement- Résidence « Nozha Gaieb », BOUMHEL El Bassatine"
  },
  {
      label: "Agence Ben Arous Ville",
      value: "42, Avenue HABIB BOURGUIBA -BEN AROUS"
  },
  {
      label: "Agence El Mourouj 3",
      value: "Rue 14 Janvier 2011 n°1"
  },
  {
      label: "Agence Zarzis El Mouensa",
      value: "Souk El Mouensa"
  },
  {
      label: "Agence Medenine Ibn Arafa",
      value: "Angle route de Tataouine et rue Ibn Arafa"
  },
  {
      label: "Agence Kasserine",
      value: "Avenue Habib Bourguiba"
  },
  {
      label: "Agence Sousse Borj EL Kantaoui",
      value: "Bd 7 Novembre, Immeuble MOHAMED ALI, KANTAOUI, SOUSSE"
  },
  {
      label: "Agence Sfax Nouvelle Medina",
      value: "Rue Des Orangers Nouvelle Médina"
  },
  {
      label: "Agence Hammamet La Medina",
      value: "IMMEUBLE HAOUARI, RUE DE LA MEDINA"
  },
  {
      label: "Agence Grombalia",
      value: "Avenue Habib Bourguiba - Grombalia"
  },
  {
      label: "Agence Rades",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Menzel Temime",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Ksar Hellal",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence El Aouina",
      value: "Avenue Taieb M'hiri Imm Jnid"
  },
  {
      label: "Agence El Omrane",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Monastir Ville",
      value: "43 AVENUE FARHAT HACHED MONASTIR"
  },
  {
      label: "Agence Djerba Midoun",
      value: "Avenue Habib Bourguiba Midoun"
  },
  {
      label: "Agence Borj El Amri",
      value: "Avenue Habib Bourguiba"
  },
  {
      label: "Agence Sfax Centre Ville",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Ghardimaou",
      value: "Avenue Habib Bourguiba"
  },
  {
      label: "Agence Monastir El Riadh",
      value: "IMMEUBLE RIADH CENTER ROUTE DE SOUSSE"
  },
  {
      label: "Agence Raoued",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence La Goulette",
      value: "10 FRAHAT HACHED"
  },
  {
      label: "Agence Ksar Gafsa",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence La Goulette 2",
      value: "Place des Martyrs"
  },
  {
      label: "Agence El Guetar",
      value: "Avenue Habib Bourguiba"
  },
  {
      label: "Agence Ouardanine",
      value: "Angle Avenue Habib Bourguiba et rue Beni Hassen"
  },
  {
      label: "Agence Moknine 2",
      value: "Avenue Habib Bourguiba"
  },
  {
      label: "Agence Grombalia 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Kasserine El Kasbah",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Medenine Sidi Mansour",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Menzel Jemil 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Hammamet 2",
      value: "Boulevard de l'environnement"
  },
  {
      label: "Agence Hammam Sousse",
      value: "Avenue Mohamed Karoui"
  },
  {
      label: "Agence Bouhajla",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sfax Maghreb Arabe",
      value: "AVENUE MAGHREB ARABE"
  },
  {
      label: "Agence Menzel Kamel",
      value: "Avenue Habib Bourguiba"
  },
  {
      label: "Agence Ras Jbel",
      value: "AVENUE 2 MARS 1934"
  },
  {
      label: "Agence El Hancha",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Feriana",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Beja Sud",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Menzel Kamel 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Tinja",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence El Jem",
      value: "AVENUE TAIEB MHIRI"
  },
  {
      label: "Agence Ras Jebel 2",
      value: "AVENUE DE LA LIBERTE"
  },
  {
      label: "Agence Le Bardo 2",
      value: "AVENUE 20 MARS"
  },
  {
      label: "Agence El Krib",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Ezzouhour",
      value: "Angle Rue 4002 et Rue 4013"
  },
  {
      label: "Agence Ariana Essoughra",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bouhajla 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Manzel Bouzelfa",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sfax El Hancha",
      value: "RUE DE KAIROUAN"
  },
  {
      label: "Agence Moknine 3",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Siliana 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Metlaoui 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Menzel Jemil 3",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Hammam Sousse 2",
      value: "Avenue de la République"
  },
  {
      label: "Agence Bouficha",
      value: "Avenue de la République"
  },
  {
      label: "Agence Tinja 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence El Mourouj 4",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sidi Bouzid 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Borj Louzir 2",
      value: "RUE MOHAMED BOUAZIZI"
  },
  {
      label: "Agence Gafsa 3",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bou Salem 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Ras Jebel 3",
      value: "AVENUE 2 MARS"
  },
  {
      label: "Agence Beni Khiar 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Tabarka 2",
      value: "AVENUE 14 JANVIER 2011"
  },
  {
      label: "Agence Zarzis 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Ras El Oued",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Medjez El Beb",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bou Arada",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Gremda",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Jammel",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sidi Ali Ben Aoun",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Dkhila",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bouhjar",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sidi Bouzid 3",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sejnane",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Menzel Temime 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Regueb",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Lala",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Haffouz",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sidi Bouzid 4",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bir Ali Ben Khelifa",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Mjez El Bab 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sidi Bouzid 5",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bir El Hafey",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Menzel El Habib",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bir Lahmar 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sidi Ali Ben Aoun 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Zriba El Kef",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sidi Ameur",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bir El Hafey 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Tazarka",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Menzel Ennour",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Menzel Salem",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Mraissa",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bir Lahmar 3",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bir Ali Ben Khelifa 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sidi Ameur 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sejnane 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence El Aroussa",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Dar Chaabane El Fehri",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Oued Ellil 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bir Mcherga",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bou Arada 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence El Batan",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sidi Ameur 3",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Lafrane",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bir El Hafey 3",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence El Akarit",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Moknine 4",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Tazarka 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Ouled Haffouz",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence El Alia 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bir Mcherga 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Oued Ellil 3",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sidi Alouane",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Medjez El Bab 3",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bir Ali Ben Khelifa 3",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Ezzouhour 2",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Bir El Hafey 4",
      value: "AVENUE HABIB BOURGUIBA"
  },
  {
      label: "Agence Sejnane 3",
      value: "AVENUE HABIB BOURGUIBA"
  },
]

const objet_reclamation = [
   {
    label: "Cartes ,TPEs et GABs",
    value: "Cartes ,TPEs et GABs"
   },
   {
    label: "Crédits",
    value: "Crédits"
   },
    {
     label: "Fonctionnement Compte",
     value: "Fonctionnement Compte"
    },
    {
     label: "Moyens de paiements (chèque,effet,Virement…)",
     value: "Moyens de paiements"
    },
    {
     label: "Produits Assurance",
     value: "Produits Assurance"
    },
    {
     label: "Qualité de service",
     value: "Qualité de services"
    },
    {
     label: "Autres",
     value: "Autres"
    },
]
export {
  status_civil,
  nombre_enfant,
  socio_professional,
  revenu_mensuel,
  secteur_activite,
  gouvernoratsOptions,
  nature_activite,
  nationalite,
  agenceItems,
    objet_reclamation
};