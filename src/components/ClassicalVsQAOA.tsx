import type { QAOAResult, ClassicalBenchmark, Asset } from '../types/quantum';
import { Scale, CheckCircle2, AlertCircle } from 'lucide-react';
import { StockLogo } from './StockLogo';

interface ClassicalVsQAOAProps {
  qaoaResult: QAOAResult | null;
}

export const ClassicalVsQAOA: React.FC<ClassicalVsQAOAProps> = ({ qaoaResult }) => {
  if (!qaoaResult) return null;

  const classical: ClassicalBenchmark = qaoaResult.classicalOptimal;
  const qaoa = qaoaResult.bestFeasibleBitstring || qaoaResult.mostProbableBitstring;

  const renderAssetPills = (assets: Asset[]) => (
    <div className="flex flex-wrap items-center gap-1.5">
      {assets.map(a => (
        <span key={a.id} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#24050e] border border-[#d45266]/40 text-xs font-mono font-bold text-white">
          <StockLogo symbol={a.symbol} name={a.name} logoUrl={a.logoUrl} size="xs" />
          <span>{a.symbol}</span>
        </span>
      ))}
    </div>
  );

  const metrics = [
    {
      label: 'Selected Assets',
      classical: renderAssetPills(classical.selectedAssets),
      qaoa: renderAssetPills(qaoa.selectedAssets),
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
    <section id="comparison" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 13 — Benchmarking</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515]">Classical vs QAOA Optimization Comparison</h2>
          <p className="text-[#5C0820] font-medium max-w-3xl leading-relaxed text-sm">
            Benchmarking quantum approximate optimization results against exact classical ground-truth brute-force solver.
          </p>
        </div>

        {/* Comparison Dashboard Table */}
        <div className="glass-card p-6 border-2 border-[#ff6b7d]/40 overflow-x-auto space-y-4 bg-[#5c0820]">
          <div className="flex items-center justify-between pb-3 border-b border-[#7c0b2b] text-xs font-mono text-[#f5ebe0]">
            <span className="flex items-center gap-2 text-[#ffffff] font-bold text-sm">
              <Scale className="w-4 h-4 text-[#ff6b7d]" />
              Direct Optimization Metric Matrix
            </span>
            <span className="text-[#ffd166] font-bold">Exact Classical vs Variational QAOA</span>
          </div>

          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#7c0b2b] text-[#f5ebe0]">
                <th className="py-3 px-4 uppercase font-bold text-[#ffffff]">Metric</th>
                <th className="py-3 px-4 uppercase text-[#ffd166] font-bold">Classical Exact Brute-Force</th>
                <th className="py-3 px-4 uppercase text-[#ff6b7d] font-bold">QAOA Quantum Simulator</th>
                <th className="py-3 px-4 uppercase text-center font-bold text-[#ffffff]">Convergence Status</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, idx) => (
                <tr key={idx} className="border-b border-[#4a0619] hover:bg-[#7c0b2b]/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#ffffff]">{m.label}</td>
                  <td className="py-3.5 px-4 text-[#ffd166] font-bold">{m.classical}</td>
                  <td className="py-3.5 px-4 text-[#ffffff] font-extrabold">{m.qaoa}</td>
                  <td className="py-3.5 px-4 text-center">
                    {m.isMatch ? (
                      <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-[#7c0b2b] text-[#ffffff] border border-[#ff6b7d] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ff6b7d]" /> Ground Truth Matched
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-[#3d0515] text-[#f5ebe0] border border-[#7c0b2b]">
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
        <div className="glass-card p-6 border border-[#ff6b7d]/50 bg-[#3d0515] space-y-2">
          <div className="flex items-center gap-2 text-[#ffd166] font-bold font-mono text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-[#ff6b7d]" />
            Important Academic Requirement & Quantum Advantage Note
          </div>
          <p className="text-xs text-[#f5ebe0] leading-relaxed">
            Prototype comparison only. QAOA performance depends on problem size, simulator/hardware, optimizer, and parameter settings. This website demonstrates QAOA-based optimization formulation and comparison with classical algorithms without claiming commercial quantum supremacy on NISQ hardware.
          </p>
        </div>

      </div>
    </section>
  );
};
