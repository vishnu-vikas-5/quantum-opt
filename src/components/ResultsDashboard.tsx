import type { QAOAResult, QAOAConfig } from '../types/quantum';
import { LayoutDashboard, RefreshCw, Sliders, Grid, Cpu } from 'lucide-react';
import { MathFormula } from './MathFormula';

interface ResultsDashboardProps {
  qaoaResult: QAOAResult | null;
  config: QAOAConfig;
  onRunAgain: () => void;
  onScrollTo: (id: string) => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  qaoaResult,
  config,
  onRunAgain,
  onScrollTo
}) => {
  if (!qaoaResult) return null;

  const optimal = qaoaResult.bestFeasibleBitstring || qaoaResult.mostProbableBitstring;

  return (
    <section id="dashboard" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 17 — Executive Dashboard</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515]">Quantum Optimization Results Dashboard</h2>
          <p className="text-[#5C0820] max-w-2xl leading-relaxed text-sm">
            Comprehensive executive summary of the QAOA capstone project experiment run.
          </p>
        </div>

        {/* Master Summary Card Grid */}
        <div className="glass-card p-8 border border-[#d45266]/40 bg-[#24050e] space-y-6 shadow-2xl shadow-[#7c0b2b]/30">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3d0817] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#d45266]/20 text-[#ff6b7d]">
                <LayoutDashboard className="w-6 h-6 text-[#ff6b7d]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">QAOA Experiment Execution Summary</h3>
                <span className="text-xs font-mono text-[#cdaea0]">8 Qubits | Parametric Circuit Depth p = {config.depth}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onRunAgain}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d45266] to-[#7c0b2b] hover:from-[#e86070] hover:to-[#961036] text-[#fffdf7] font-bold text-xs shadow-md shadow-[#d45266]/30 transition-all hover:scale-105 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-white" />
                <span>Run Again</span>
              </button>

              <button
                onClick={() => onScrollTo('parameters')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#24050e] hover:bg-[#380816] text-[#f4eada] text-xs font-medium border border-[#d45266]/40 transition-all hover:scale-105"
              >
                <Sliders className="w-4 h-4 text-[#ff6b7d]" />
                <span>Change Parameters</span>
              </button>

              <button
                onClick={() => onScrollTo('qubo')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#24050e] hover:bg-[#380816] text-[#f4eada] text-xs font-medium border border-[#d45266]/40 transition-all hover:scale-105"
              >
                <Grid className="w-4 h-4 text-[#ff6b7d]" />
                <span>View QUBO</span>
              </button>

              <button
                onClick={() => onScrollTo('qaoa')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#24050e] hover:bg-[#380816] text-[#f4eada] text-xs font-medium border border-[#d45266]/40 transition-all hover:scale-105"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>View Circuit</span>
              </button>
            </div>
          </div>

          {/* Key Executive Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 font-mono text-xs text-center">
            
            <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/30 col-span-2">
              <span className="text-[#cdaea0] text-[10px] block uppercase font-bold">Selected Portfolio</span>
              <span className="text-[#ff6b7d] font-bold text-sm block truncate mt-1">
                {optimal.selectedAssets.map(a => a.symbol).join(', ')}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/30">
              <span className="text-[#cdaea0] text-[10px] block uppercase font-bold">Expected Return</span>
              <span className="text-emerald-400 font-bold text-sm block mt-1">
                +{(optimal.returnVal * 100).toFixed(1)}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/30">
              <span className="text-[#cdaea0] text-[10px] block uppercase font-bold">Volatility Risk</span>
              <span className="text-amber-300 font-bold text-sm block mt-1">
                {(optimal.riskVal * 100).toFixed(1)}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/50">
              <span className="text-[#ff6b7d] text-[10px] block uppercase font-bold">Sharpe Ratio</span>
              <span className="text-[#ff6b7d] font-extrabold text-sm block mt-1">
                {optimal.sharpeRatio.toFixed(2)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/30">
              <span className="text-[#cdaea0] text-[10px] block uppercase font-bold">QAOA Depth</span>
              <span className="text-[#f4eada] font-bold text-sm block mt-1">p = {config.depth}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/30">
              <span className="text-[#cdaea0] text-[10px] block uppercase font-bold">Active Qubits</span>
              <span className="text-[#f4eada] font-bold text-sm block mt-1">8 Qubits</span>
            </div>

            <div className="p-3 rounded-xl bg-[#24050e] border border-emerald-500/40">
              <span className="text-emerald-400 text-[10px] block uppercase font-bold">Expected Cost ⟨H_C⟩</span>
              <span className="text-white font-extrabold text-sm block mt-1">{qaoaResult.finalCost.toFixed(3)}</span>
            </div>

          </div>

          {/* Optimized QAOA Variational Parameters Output Summary */}
          <div className="p-4 rounded-xl bg-[#140307] border border-[#ff6b7d]/40 font-mono text-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3d0817] pb-2">
              <span className="text-[#ffd166] font-bold uppercase tracking-wider">
                ★ OPTIMIZED QAOA VARIATIONAL ANGLES (2p = {2 * config.depth} PARAMETERS)
              </span>
              <span className="text-[#cdaea0]">Optimizer: {config.optimizerName || 'COBYLA'} ({qaoaResult.totalIterations} Iterations)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Array.from({ length: config.depth }).map((_, idx) => {
                const lastStep = qaoaResult.convergence[qaoaResult.convergence.length - 1];
                const optG = lastStep?.gamma[idx] ?? 0.35;
                const optB = lastStep?.beta[idx] ?? 0.25;
                return (
                  <div key={idx} className="p-3 rounded-lg bg-[#24050e] border border-[#d45266]/30 flex justify-between items-center">
                    <span className="text-[#ff6b7d] font-bold">Layer {idx + 1}</span>
                    <div className="text-right">
                      <span className="text-white font-bold block">γ_{idx + 1} = {optG.toFixed(3)} rad</span>
                      <span className="text-white font-bold block">β_{idx + 1} = {optB.toFixed(3)} rad</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] text-[#cdaea0] pt-1">
              • <strong>Algorithmic Independence</strong>: QAOA parameters (γ*, β*) were optimized independently using statevector simulation of expected energy <MathFormula math="\langle \psi(\gamma, \beta)|H_C|\psi(\gamma, \beta)\rangle" /> without accessing classical brute-force ground-truth data.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

