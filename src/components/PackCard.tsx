import React from 'react';
import type { Pack } from '../models';
import { cn } from '../utils/cn';
import { Check, Users } from 'lucide-react';

interface PackCardProps {
  pack: Pack;
  isSelected: boolean;
  onSelect: (pack: Pack) => void;
}

export const PackCard: React.FC<PackCardProps> = ({ pack, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(pack)}
      className={cn(
        "relative cursor-pointer p-8 border transition-all duration-300 flex flex-col gap-4 overflow-hidden group bg-black/40 backdrop-blur-xl shadow-2xl",
        isSelected 
          ? "border-gala-gold shadow-[0_0_20px_rgba(212,175,55,0.2)] bg-black/70 scale-[1.02]" 
          : "border-white/20 hover:border-gala-gold/50 hover:scale-[1.01]"
      )}
    >
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 rounded-full opacity-20 blur-3xl transition-all duration-500 group-hover:scale-150",
        isSelected ? "bg-gala-gold" : "bg-white/10"
      )} />

      <div className="flex justify-between items-start">
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border",
          pack.color
        )}>
          {pack.name}
        </div>
        {isSelected && (
          <div className="bg-gala-gold rounded-full p-1 shadow-[0_0_10px_rgba(212,175,55,0.5)]">
            <Check className="w-4 h-4 text-black" />
          </div>
        )}
      </div>

      <div>
        <div className="border border-gala-gold/50 px-4 py-2 inline-block mb-3">
          <p className="text-[10px] text-white/70 uppercase tracking-[0.2em] mb-1">Prix du ticket</p>
          <h3 className="text-3xl font-sans font-medium text-white">
            {pack.price} <span className="text-sm font-light text-white/50">DHS</span>
          </h3>
        </div>
        <p className="text-white/70 mt-2 text-sm leading-relaxed font-sans font-light">
          {pack.description}
        </p>
      </div>

      <div className="mt-auto pt-4 flex items-center gap-2 text-white/60 font-medium text-sm font-sans">
        <Users className="w-4 h-4 text-gala-gold" />
        <span>{pack.maxPeople === 1 ? '1 personne' : `Jusqu'à ${pack.maxPeople} invités`}</span>
      </div>
    </div>
  );
};
