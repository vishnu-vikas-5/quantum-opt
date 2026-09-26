import React from 'react';
import { Cpu, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const techStack = ['Python', 'Qiskit', 'QAOA', 'QUBO', 'NumPy', 'Pandas', 'React', 'TypeScript'];

  return (
    <footer className="mt-20 py-12 border-t border-slate-900 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Quantum Portfolio Optimization</h3>
              <p className="text-xs font-mono text-cyan-400">
                Academic Prototype — Quantum Computing Capstone Project
              </p>
            </div>
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Academic & Financial Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
          <div className="text-amber-400 font-bold flex items-center gap-1.5 uppercase">
            <ShieldAlert className="w-4 h-4" /> Academic Research Prototype Disclaimer
          </div>
          <p className="text-slate-400 leading-relaxed">
            This prototype is intended for academic and research demonstration purposes and does not constitute financial advice. Data values are illustrative simulation inputs for demonstrating QUBO formulation and QAOA execution.
          </p>
        </div>

        <div className="text-center text-[11px] font-mono text-slate-600 pt-2">
          Quantum Computing Capstone • QAOA Portfolio Optimization Research Demonstration
        </div>

      </div>
    </footer>
  );
};
