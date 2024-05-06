import { Float } from "react-native/Libraries/Types/CodegenTypes";

interface Operation {
  op_id: number;
  date_valeur: string;
  date_operation: string;
  op_type: string;
  op_canal: string;
  op_marchant: string;
  op_emplacement: string;
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
  operations: Operation[];
  virements: Virement[];
  rib: string;
}

interface getLastMonthExpenses{
  lme: Float;
}
interface getCurrentMonthExpenses{
  cme: Float;
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

export type {GetClientsResponse, CompteBancaire, Carte, Operation, Virement, GetIntentResponse, getLastMonthExpenses, getCurrentMonthExpenses};