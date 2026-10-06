import type { IsingModel as IsingModelType } from '../types/quantum';
import { Cpu, Layers, Radio } from 'lucide-react';

interface IsingModelProps {
  ising: IsingModelType;
  onProceedToQAOA: () => void;
}

export const IsingModel: React.FC<IsingModelProps> = ({ ising, onProceedToQAOA }) => {
  return (
    <div className="space-y-6">
      {/* Hamiltonian Coefficients Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Single Qubit Bias Terms h_i */}
        <div className="glass-card p-6 border border-[#d45266]/30 space-y-3">
          <h3 className="text-sm font-mono text-[#ff6b7d] uppercase tracking-wider flex items-center gap-2 font-bold">
            <Radio className="w-4 h-4" />
            Single-Qubit Bias Terms (h_i)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
            {ising.linearTerms.map((val, idx) => (
              <div key={idx} className="p-2 rounded bg-[#24050e] border border-[#d45266]/30 flex justify-between">
                <span className="text-[#8c6759]">h_{idx}:</span>
                <span className="text-[#f4eada] font-bold">{val.toFixed(3)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Qubit Coupling Terms J_ij */}
        <div className="glass-card p-6 border border-[#d45266]/30 space-y-3">
          <h3 className="text-sm font-mono text-[#ff6b7d] uppercase tracking-wider flex items-center gap-2 font-bold">
            <Layers className="w-4 h-4" />
            Qubit Interaction Terms (J_ij)
          </h3>
          <div className="max-h-40 overflow-y-auto pr-2 space-y-1 font-mono text-xs">
            {ising.quadraticTerms.slice(0, 12).map((term, idx) => (
              <div key={idx} className="p-2 rounded bg-[#24050e] border border-[#d45266]/30 flex justify-between">
                <span className="text-[#8c6759]">J({term.i}, {term.j}):</span>
                <span className="text-[#f4eada] font-bold">{term.value.toFixed(3)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Action Button: Proceed to QAOA */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onProceedToQAOA}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d45266] to-[#7c0b2b] hover:from-[#e86070] hover:to-[#961036] text-[#fffdf7] font-bold text-xs shadow-md transition-all hover:scale-105"
        >
          <Cpu className="w-4 h-4 fill-current" />
          Go to QAOA Simulator
        </button>
      </div>
    </div>
  );
};

