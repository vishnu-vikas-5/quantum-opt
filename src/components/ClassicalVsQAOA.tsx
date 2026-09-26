import type { QAOAResult, ClassicalBenchmark } from '../types/quantum';
import { Scale, CheckCircle2, AlertCircle } from 'lucide-react';

interface ClassicalVsQAOAProps {
  qaoaResult: QAOAResult | null;
}

export const ClassicalVsQAOA: React.FC<ClassicalVsQAOAProps> = ({ qaoaResult }) => {
  if (!qaoaResult) return null;

  const classical: ClassicalBenchmark = qaoaResult.classicalOptimal;
  const qaoa = qaoaResult.mostProbableBitstring;

  const metrics = [
    {
      label: 'Selected Assets',
      classical: classical.selectedAssets.map(a => a.symbol).join(', '),
      qaoa: qaoa.selectedAssets.map(a => a.symbol).join(', '),
      isMatch: classical.bitstring === qaoa.bitstring
    },
    {
      label: 'Expected Return (Rₚ)',
      classical: `+${(classical.returnVal * 100).toFixed(2)}%`,
      qaoa: `+${(qaoa.returnVal * 100).toFixed(2)}%`,
      isMatch: Math.abs(classical.returnVal - qaoa.returnVal) < 0.001
    },
    {
      label: 'Portfolio Risk (σₚ)',
      classical: `${(classical.riskVal * 100).toFixed(2)}%`,
      qaoa: `${(qaoa.riskVal * 100).toFixed(2)}%`,
      isMatch: Math.abs(classical.riskVal - qaoa.riskVal) < 0.001
    },
    {
      label: 'Sharpe Ratio',
      classical: classical.sharpeRatio.toFixed(2),
      qaoa: qaoa.sharpeRatio.toFixed(2),
      isMatch: Math.abs(classical.sharpeRatio - qaoa.sharpeRatio) < 0.05
    },
    {
      label: 'QUBO Objective Cost C(x)',
      classical: classical.cost.toFixed(3),
      qaoa: qaoa.cost.toFixed(3),
      isMatch: Math.abs(classical.cost - qaoa.cost) < 0.05
    },
    {
      label: 'Execution Time',
      classical: `${classical.executionTimeMs} ms`,
      qaoa: `${qaoaResult.executionTimeMs} ms`,
      isMatch: false
    },
    {
      label: 'Evaluations / Iterations',
      classical: `${classical.totalEvaluations} States (2⁸)`,
      qaoa: `${qaoaResult.totalIterations} COBYLA Iterations`,
      isMatch: false
    }
  ];

  return (
    <section id="comparison" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 13 — Benchmarking</div>
          <h2 className="text-3xl font-extrabold text-white">Classical vs QAOA Optimization Comparison</h2>
          <p className="text-slate-300 max-w-3xl leading-relaxed text-sm">
            Benchmarking quantum approximate optimization results against exact classical ground-truth brute-force solver.
          </p>
        </div>

        {/* Comparison Dashboard Table */}
        <div className="glass-card p-6 border border-cyan-500/20 overflow-x-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2 text-cyan-400 font-bold">
              <Scale className="w-4 h-4" />
              Direct Optimization Metric Matrix
            </span>
            <span className="text-slate-500">Exact Classical vs Variational QAOA</span>
          </div>

          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 uppercase">Metric</th>
                <th className="py-3 px-4 uppercase text-indigo-400">Classical Exact Brute-Force</th>
                <th className="py-3 px-4 uppercase text-cyan-400">QAOA Quantum Simulator</th>
                <th className="py-3 px-4 uppercase text-center">Convergence Status</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, idx) => (
                <tr key={idx} className="border-b border-slate-900 hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{m.label}</td>
                  <td className="py-3.5 px-4 text-indigo-300">{m.classical}</td>
                  <td className="py-3.5 px-4 text-cyan-300 font-bold">{m.qaoa}</td>
                  <td className="py-3.5 px-4 text-center">
                    {m.isMatch ? (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Ground Truth Matched
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        Methodology Variant
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Academic Quantum Advantage Disclaimer Banner */}
        <div className="glass-card p-6 border border-amber-500/30 bg-amber-950/10 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            Important Academic Requirement & Quantum Advantage Note
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Prototype comparison only. QAOA performance depends on problem size, simulator/hardware, optimizer, and parameter settings. This website demonstrates QAOA-based optimization formulation and comparison with classical algorithms without claiming commercial quantum supremacy on NISQ hardware.
          </p>
        </div>

      </div>
    </section>
  );
};
