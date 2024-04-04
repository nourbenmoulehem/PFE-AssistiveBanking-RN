interface Transaction {
  tran_id: number;
  date_valeur: string;
  date_operation: string;
  tran_type: string;
  tran_canal: string;
  tran_marchant: string;
  tran_emplacement: string;
  montant: number;
  compteBancaire: number;
}

interface Virement {
  vir_id: number;
  date_valeur: string;
  date_operation: string;
  libelle: string;
  bank: string;
  montant: number;
  motif: string;
  etat: string;
  compteBancaire: number;
}

interface Carte {
  id_produit: number;
  code_offre: string;
  numero_carte: string;
  status: string;
  date_expiration: string | null;
  plafond: number;
  compteBancaire: number;
}

interface CompteBancaire {
  id_compteBancaire: number;
  solde: number;
  date_ouverture: string;
  client: number;
  carte: Carte;
  transactions: Transaction[];
  virements: Virement[];
  rib: string;
}

interface GetClientsResponse {
  clientId: number;
  cin: string;
  offer: string;
  dateDelivrationCin: string;
  cinRecto: string;
  cinVerso: string;
  selfie: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  birthday: string;
  nationality: string;
  statusCivil: string;
  nombre_enfant: number;
  socio_professional: string;
  secteurActivite: string;
  natureActivite: string;
  revenu: string;
  codePostal: string;
  gouvernorat: string;
  hasOtherBank: boolean;
  agence: string;
  adresse: string | null;
  compteBancaire: CompteBancaire;
}

interface GetIntentResponse {
  feedback: string;
}

export type {GetClientsResponse, CompteBancaire, Carte, Transaction, Virement, GetIntentResponse};