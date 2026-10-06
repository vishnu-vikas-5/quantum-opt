import React from 'react';
import { Cpu, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 py-12 border-t border-[#d45266]/30 bg-[#24050e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#7c0b2b]/40 border border-[#d45266]/40 text-[#ff6b7d]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#fffdf7] tracking-tight">Quantum Portfolio Optimization</h3>
              <p className="text-xs font-mono text-[#ff6b7d] font-bold">
                Academic Prototype — Quantum Computing Capstone Project
              </p>
            </div>
          </div>
        </div>

        {/* Academic & Financial Disclaimer */}
        <div className="p-4 rounded-xl bg-[#140307] border border-[#d45266]/30 text-xs font-mono text-[#f4eada]/80 space-y-1">
          <div className="text-[#ff6b7d] font-bold flex items-center gap-1.5 uppercase">
            <ShieldAlert className="w-4 h-4" /> Academic Research Prototype Disclaimer
          </div>
          <p className="text-[#f4eada]/70 leading-relaxed">
            This prototype is intended for academic and research demonstration purposes and does not constitute financial advice. Data values are illustrative simulation inputs for demonstrating QUBO formulation and QAOA execution.
          </p>
        </div>

        <div className="text-center text-[11px] font-mono text-[#f4eada]/50 pt-2 font-bold">
          Quantum Computing Capstone • QAOA Portfolio Optimization Research Demonstration
        </div>

      </div>
    </footer>
  );
};
