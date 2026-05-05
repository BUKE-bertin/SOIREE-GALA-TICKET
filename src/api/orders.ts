import axios from 'axios';
import type { OrderData } from '../models';

// Utilisation de la variable d'environnement, avec fallback de sécurité
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const createOrder = async (orderData: OrderData) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    throw error;
  }
};
