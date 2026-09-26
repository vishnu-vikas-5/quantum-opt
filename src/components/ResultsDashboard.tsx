import type { QAOAResult, QAOAConfig } from '../types/quantum';
import { LayoutDashboard, RefreshCw, Sliders, Grid, Cpu } from 'lucide-react';

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

  const optimal = qaoaResult.mostProbableBitstring;

  return (
    <section id="dashboard" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 17 — Executive Dashboard</div>
          <h2 className="text-3xl font-extrabold text-white">Quantum Optimization Results Dashboard</h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-sm">
            Comprehensive executive summary of the QAOA capstone project experiment run.
          </p>
        </div>

        {/* Master Summary Card Grid */}
        <div className="glass-card p-8 border border-cyan-400 bg-slate-950/90 space-y-6 shadow-2xl shadow-cyan-950/50">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300">
                <LayoutDashboard className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">QAOA Experiment Execution Summary</h3>
                <span className="text-xs font-mono text-slate-400">8 Qubits | Parametric Circuit Depth p = {config.depth}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onRunAgain}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-105"
              >
                <RefreshCw className="w-4 h-4" />
                Run Again
              </button>

              <button
                onClick={() => onScrollTo('parameters')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                Change Parameters
              </button>

              <button
                onClick={() => onScrollTo('qubo')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
              >
                <Grid className="w-4 h-4 text-purple-400" />
                View QUBO
              </button>

              <button
                onClick={() => onScrollTo('qaoa')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                View Circuit
              </button>
            </div>
          </div>

          {/* Key Executive Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 font-mono text-xs text-center">
            
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 col-span-2">
              <span className="text-slate-400 text-[10px] block uppercase">Selected Assets</span>
              <span className="text-cyan-300 font-bold text-sm block truncate mt-1">
                {optimal.selectedAssets.map(a => a.symbol).join(', ')}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block uppercase">Expected Return</span>
              <span className="text-emerald-400 font-bold text-sm block mt-1">
                +{(optimal.returnVal * 100).toFixed(1)}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block uppercase">Volatility Risk</span>
              <span className="text-amber-400 font-bold text-sm block mt-1">
                {(optimal.riskVal * 100).toFixed(1)}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40">
              <span className="text-cyan-300 text-[10px] block uppercase">Sharpe Ratio</span>
              <span className="text-cyan-300 font-extrabold text-sm block mt-1 text-glow">
                {optimal.sharpeRatio.toFixed(2)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block uppercase">QAOA Depth</span>
              <span className="text-indigo-300 font-bold text-sm block mt-1">p = {config.depth}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block uppercase">Active Qubits</span>
              <span className="text-blue-300 font-bold text-sm block mt-1">8 Qubits</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block uppercase">Final Objective</span>
              <span className="text-purple-300 font-bold text-sm block mt-1">{qaoaResult.finalCost.toFixed(2)}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
