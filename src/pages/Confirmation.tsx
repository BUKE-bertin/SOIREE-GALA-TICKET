import React from 'react';
import { useOrder } from '../context/OrderContext';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Download, Home, Mail, QrCode } from 'lucide-react';

interface ConfirmationProps {
  onReset: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ onReset }) => {
  const { orderResult, lastOrderData } = useOrder();

  if (!lastOrderData) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-20 text-center">
      <div className="w-24 h-24 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>

      <h1 className="text-4xl font-serif text-white mb-4">
        Commande Confirmée !
      </h1>
      
      <p className="text-slate-400 text-lg mb-12">
        Merci {lastOrderData.prenom}. Votre réservation pour le <span className="text-white font-semibold">Gala ASEBEM 2026</span> a été enregistrée avec succès.
      </p>

      <div className="glass-card p-8 rounded-3xl text-left mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gala-gold/10 -mr-16 -mt-16 rounded-full blur-2xl" />
        
        <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
          <QrCode className="w-6 h-6 text-gala-gold" />
          Résumé de la commande
        </h3>

        <div className="space-y-4 relative z-10">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Numéro de commande</p>
              <p className="text-white font-mono text-lg">{orderResult?.orderId || "ASEBEM-7782"}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Pack</p>
              <p className="text-white font-bold text-lg">{lastOrderData.pack}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Places</p>
              <p className="text-white font-bold text-lg">{lastOrderData.nombrePersonnes} Personne(s)</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Statut</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                Confirmé
              </span>
            </div>
          </div>

          {lastOrderData.beneficiaires.length > 0 && (
            <div className="pt-4 mt-4 border-t border-slate-700/50">
              <p className="text-slate-500 uppercase tracking-wider text-[10px] font-bold mb-3">Bénéficiaires</p>
              <div className="space-y-2">
                <p className="text-sm text-slate-300">• {lastOrderData.nom} {lastOrderData.prenom} (Vous)</p>
                {lastOrderData.beneficiaires.map((b, i) => (
                  <p key={i} className="text-sm text-slate-300">• {b.nom} {b.prenom}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-black/50 border border-white/5 p-4 rounded-2xl mb-12 flex items-center gap-4 text-left">
        <div className="bg-gala-gold/10 p-3 rounded-xl">
          <Mail className="w-6 h-6 text-gala-gold" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">Email de confirmation envoyé</p>
          <p className="text-slate-400 text-xs">Vérifiez votre boîte mail à {lastOrderData.email}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="w-full sm:w-auto px-10 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#C5A059] text-black font-bold border-0">
          <Download className="w-5 h-5" />
          Télécharger mon billet
        </Button>
        <Button variant="secondary" size="lg" onClick={onReset} className="w-full sm:w-auto px-10">
          <Home className="w-5 h-5" />
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};
