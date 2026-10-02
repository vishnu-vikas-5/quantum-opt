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
    <section id="methodology" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 15 — Methodology</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515]">Quantum Optimization Methodology Timeline</h2>
          <p className="text-[#5C0820] max-w-2xl leading-relaxed text-sm font-medium">
            Step-by-step academic workflow for formulating and solving portfolio optimization on quantum processors.
          </p>
        </div>

        {/* Timeline Grid sequence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="glass-card p-6 border border-[#d45266]/40 bg-[#24050e] hover:border-[#ff6b7d] transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between border-b border-[#d45266]/30 pb-2">
                <span className="font-mono font-extrabold text-xl text-[#ff6b7d] group-hover:text-glow">
                  {s.num}
                </span>
                <span className="p-1.5 rounded bg-[#7c0b2b]/40 text-[#ff6b7d]">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <h3 className="font-bold text-[#fffdf7] text-base">{s.title}</h3>
              <p className="text-xs text-[#f4eada]/80 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
