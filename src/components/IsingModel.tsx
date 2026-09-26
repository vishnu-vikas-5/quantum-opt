import type { IsingModel as IsingModelType } from '../types/quantum';
import { MathFormula } from './MathFormula';
import { Cpu, Layers, Radio } from 'lucide-react';

interface IsingModelProps {
  ising: IsingModelType;
  onProceedToQAOA: () => void;
}

export const IsingModel: React.FC<IsingModelProps> = ({ ising, onProceedToQAOA }) => {
  return (
    <section id="ising" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 06 — Quantum Mapping</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515]">QUBO → Ising Hamiltonian Transformation</h2>
          <p className="text-[#5C0820] max-w-3xl leading-relaxed text-sm">
            Map classical binary decision variables <MathFormula math="x_i \in \{0, 1\}" /> into quantum spin-half operators <MathFormula math="Z_i \in \{+1, -1\}" /> acting on qubit Hilbert space.
          </p>
        </div>

        {/* Transformation Mathematical Operator Card */}
        <div className="glass-card p-6 border border-cyan-500/30 bg-slate-950/90 space-y-4">
          <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">Pauli-Z Binary Mapping Equation</h3>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <MathFormula math="x_i = \frac{I - Z_i}{2} \quad \text{where} \quad Z_i = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}" displayMode />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed text-center">
            Substituting <MathFormula math="x_i = (1 - Z_i)/2" /> into the QUBO cost expression yields the Cost Hamiltonian <MathFormula math="H_C" />:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <MathFormula math="H_C = \sum_{i=1}^N h_i Z_i + \sum_{i < j} J_{ij} Z_i Z_j + E_0 \cdot I" displayMode />
          </div>
        </div>

        {/* Visual Transformation Pipeline */}
        <div className="glass-card p-6 border border-indigo-500/20">
          <h3 className="text-sm font-mono text-indigo-400 uppercase tracking-wider mb-6 text-center">
            Operator Transformation Sequence Pipeline
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
            
            <div className="glass-card p-4 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-500 block">Step 01</span>
              <div className="font-bold text-white text-sm">QUBO Matrix</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 text-xs">
                <MathFormula math="C(x) = x^T Q x" />
              </div>
            </div>

            <div className="glass-card p-4 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-500 block">Step 02</span>
              <div className="font-bold text-cyan-300 text-sm">Binary Variables</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 text-xs">
                <MathFormula math="x_i \in \{0, 1\}" />
              </div>
            </div>

            <div className="glass-card p-4 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-500 block">Step 03</span>
              <div className="font-bold text-blue-300 text-sm">Pauli-Z Operators</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 text-xs">
                <MathFormula math="Z_i \in \{+1, -1\}" />
              </div>
            </div>

            <div className="glass-card p-4 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-500 block">Step 04</span>
              <div className="font-bold text-indigo-300 text-sm">Cost Hamiltonian</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 text-xs">
                <MathFormula math="H_C = \sum h_i Z_i + \sum J_{ij} Z_i Z_j" />
              </div>
            </div>

          </div>
        </div>

        {/* Hamiltonian Coefficients Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Single Qubit Bias Terms h_i */}
          <div className="glass-card p-6 border border-slate-800 space-y-3">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Single-Qubit Bias Vector (h_i Z_i)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              {ising.linearTerms.map((val, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">h_{idx}:</span>
                  <span className="text-cyan-300 font-bold">{val.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Qubit Coupling Terms J_ij */}
          <div className="glass-card p-6 border border-slate-800 space-y-3">
            <h3 className="text-sm font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Qubit Interaction Terms (J_ij Z_i Z_j)
            </h3>
            <div className="max-h-40 overflow-y-auto pr-2 space-y-1 font-mono text-xs">
              {ising.quadraticTerms.slice(0, 12).map((term, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">J({term.i}, {term.j}):</span>
                  <span className="text-indigo-300 font-bold">{term.value.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Action Button: Proceed to QAOA */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onProceedToQAOA}
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Cpu className="w-5 h-5 fill-current" />
            Proceed to QAOA Quantum Circuit Experiment
          </button>
        </div>

      </div>
    </section>
  );
};
