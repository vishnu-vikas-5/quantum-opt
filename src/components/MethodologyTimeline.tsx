import { CheckCircle2 } from 'lucide-react';

export const MethodologyTimeline: React.FC = () => {
  const steps = [
    { num: '01', title: 'Data Preparation', desc: 'Pre-process 8 financial asset universe historical price vectors.' },
    { num: '02', title: 'Return & Covariance Calculation', desc: 'Calculate expected returns μ_i and covariance matrix Σ_ij.' },
    { num: '03', title: 'Portfolio Formulation', desc: 'Formulate Markowitz mean-variance objective with cardinality constraint K.' },
    { num: '04', title: 'QUBO Construction', desc: 'Convert objective into QUBO matrix Q_ij with penalty parameter P.' },
    { num: '05', title: 'Ising Hamiltonian', desc: 'Map binary variables x_i to Pauli-Z spin operators (1 - Z_i)/2.' },
    { num: '06', title: 'QAOA Circuit', desc: 'Construct p-layer parameterized quantum ansatz U(H_B, β) U(H_C, γ).' },
    { num: '07', title: 'Measurement', desc: 'Sample computational basis states (1000 shots) to extract probability P(x).' },
    { num: '08', title: 'Portfolio Evaluation', desc: 'Decode most probable bitstring into assets and compute Sharpe Ratio.' },
    { num: '09', title: 'Classical Benchmark', desc: 'Compare QAOA solution against exact classical brute-force ground truth.' }
  ];

  return (
    <section id="methodology" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 15 — Methodology</div>
          <h2 className="text-3xl font-extrabold text-white">Quantum Optimization Methodology Timeline</h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-sm">
            Step-by-step academic workflow for formulating and solving portfolio optimization on quantum processors.
          </p>
        </div>

        {/* Timeline Grid sequence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="glass-card p-6 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-mono font-extrabold text-xl text-cyan-400 group-hover:text-glow">
                  {s.num}
                </span>
                <span className="p-1.5 rounded bg-cyan-500/10 text-cyan-400">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <h3 className="font-bold text-white text-base">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
