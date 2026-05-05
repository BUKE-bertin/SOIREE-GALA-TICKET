import { z } from 'zod';

export const beneficiarySchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  cin: z.string().min(4, "Le CIN est requis"),
});

export const orderSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  cin: z.string().min(4, "Le CIN est requis"),
  idAsebem: z.string().min(1, "L'ID ASEBEM est requis"),
  pack: z.enum(['Cuivre', 'Bronze', 'Argent', 'Or', 'Diamant']),
  nombrePersonnes: z.number().min(1).max(6),
  beneficiaires: z.array(beneficiarySchema),
});

export type OrderSchemaType = z.infer<typeof orderSchema>;
