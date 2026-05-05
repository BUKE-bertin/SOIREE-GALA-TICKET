import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../api/admin';
import { Button } from '../components/ui/Button';
import { LogOut, Check, X, Clock } from 'lucide-react';

interface Order {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  pack: string;
  nombrePersonnes: number;
  status: string;
  createdAt: string;
  beneficiaires: any[];
}

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ token, onLogout }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getOrders(token);
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(token, orderId, newStatus);
      fetchOrders();
    } catch (err) {
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'VALIDE':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20"><Check className="w-3 h-3" /> Validée</span>;
      case 'ANNULE':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20"><X className="w-3 h-3" /> Annulée</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"><Clock className="w-3 h-3" /> En attente</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif text-gala-gold">Tableau de bord Admin</h2>
        <Button variant="secondary" onClick={onLogout} className="gap-2">
          <LogOut className="w-4 h-4" /> Déconnexion
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-white/50 py-12">Chargement...</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-xl font-bold text-white">{order.nom} {order.prenom}</h3>
                  {getStatusBadge(order.status)}
                </div>
                <div className="text-sm text-white/60 space-y-1">
                  <p>{order.email} • Pack: <span className="text-gala-gold font-medium">{order.pack}</span> ({order.nombrePersonnes} place{order.nombrePersonnes > 1 ? 's' : ''})</p>
                  <p className="text-xs">Date: {new Date(order.createdAt).toLocaleString('fr-FR')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {order.status !== 'VALIDE' && (
                  <Button 
                    onClick={() => handleStatusChange(order.id, 'VALIDE')}
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                  >
                    Valider
                  </Button>
                )}
                {order.status !== 'ANNULE' && (
                  <Button 
                    onClick={() => handleStatusChange(order.id, 'ANNULE')}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                  >
                    Annuler
                  </Button>
                )}
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="text-center text-white/50 py-12 glass-card rounded-2xl">
              Aucune commande trouvée.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
