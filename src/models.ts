export type PackType = 'Cuivre' | 'Bronze' | 'Argent' | 'Or' | 'Diamant';

export type Pack = {
  id: PackType;
  name: string;
  price: number;
  maxPeople: number;
  description: string;
  color: string;
};

export type Beneficiary = {
  nom: string;
  prenom: string;
  cin: string;
};

export type OrderData = {
  nom: string;
  prenom: string;
  email: string;
  cin: string;
  idAsebem: string;
  pack: PackType;
  nombrePersonnes: number;
  beneficiaires: Beneficiary[];
};

export const PACKS: Pack[] = [
  {
    id: 'Cuivre',
    name: 'Cuivre',
    price: 200,
    maxPeople: 1,
    description: 'Accès standard pour une personne.',
    color: 'border-[#CD7F32] bg-[#CD7F32]/10 text-[#CD7F32]',
  },
  {
    id: 'Bronze',
    name: 'Bronze',
    price: 300,
    maxPeople: 1,
    description: 'Accès privilégié pour une personne.',
    color: 'border-[#b87333] bg-[#b87333]/10 text-[#b87333]',
  },
  {
    id: 'Or',
    name: 'Or',
    price: 500,
    maxPeople: 1,
    description: 'Expérience premium pour une personne.',
    color: 'border-[#FFD700] bg-[#FFD700]/10 text-[#FFD700]',
  },
  {
    id: 'Argent',
    name: 'Argent (VIP)',
    price: 1500,
    maxPeople: 6,
    description: 'Table VIP pour jusqu\'à 6 personnes.',
    color: 'border-[#C0C0C0] bg-[#C0C0C0]/10 text-[#C0C0C0]',
  },
  {
    id: 'Diamant',
    name: 'Diamant (VIP Prestige)',
    price: 3000,
    maxPeople: 6,
    description: 'L\'expérience ultime pour jusqu\'à 6 personnes.',
    color: 'border-[#B9F2FF] bg-[#B9F2FF]/10 text-[#B9F2FF]',
  },
];
