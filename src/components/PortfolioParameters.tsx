import type { QAOAConfig } from '../types/quantum';
import { Sliders, Settings2, Shield, Layers, Zap } from 'lucide-react';

interface PortfolioParametersProps {
  config: QAOAConfig;
  onConfigChange: (newConfig: Partial<QAOAConfig>) => void;
  onGenerateQUBO: () => void;
}

export const PortfolioParameters: React.FC<PortfolioParametersProps> = ({
  config,
  onConfigChange,
  onGenerateQUBO
}) => {
  return (
    <section id="parameters" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 04 — Optimization Control</div>
          <h2 className="text-3xl font-extrabold text-white">Portfolio Optimization Parameters</h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-sm">
            Tune the objective weights and QAOA quantum circuit parameters before QUBO formulation.
          </p>
        </div>

        {/* Configuration Panel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Parameter 1: Risk Aversion lambda */}
          <div className="glass-card p-6 border border-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Parameter λ</span>
              <Sliders className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Risk Aversion Factor</h3>
              <p className="text-xs text-slate-400 mt-1">
                Controls the trade-off between portfolio return and risk.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={config.riskAversion}
                onChange={(e) => onConfigChange({ riskAversion: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">0.0 (Max Return)</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  λ = {config.riskAversion.toFixed(2)}
                </span>
                <span className="text-slate-500">1.0 (Min Risk)</span>
              </div>
            </div>
          </div>

          {/* Parameter 2: Portfolio Size K */}
          <div className="glass-card p-6 border border-blue-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">Parameter K</span>
              <Settings2 className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Target Portfolio Size</h3>
              <p className="text-xs text-slate-400 mt-1">
                Select exactly K assets from the universe.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <input
                type="number"
                min="1"
                max="8"
                value={config.portfolioSize}
                onChange={(e) => onConfigChange({ portfolioSize: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-sm focus:border-cyan-400 outline-none"
              />
              <div className="text-xs font-mono text-slate-400">
                Enforces hard cardinality constraint <span className="text-cyan-300">Σ xᵢ = {config.portfolioSize}</span>
              </div>
            </div>
          </div>

          {/* Parameter 3: Penalty Parameter P */}
          <div className="glass-card p-6 border border-purple-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">Parameter P</span>
              <Shield className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Constraint Penalty</h3>
              <p className="text-xs text-slate-400 mt-1">
                Penalty applied when size constraint is violated.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <input
                type="number"
                min="1"
                max="50"
                step="1"
                value={config.penalty}
                onChange={(e) => onConfigChange({ penalty: Math.max(1, parseFloat(e.target.value) || 1) })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-purple-300 font-mono text-sm focus:border-purple-400 outline-none"
              />
              <div className="text-xs font-mono text-slate-400">
                Penalty multiplier <span className="text-purple-300">P = {config.penalty}</span>
              </div>
            </div>
          </div>

          {/* Parameter 4: QAOA Depth p */}
          <div className="glass-card p-6 border border-emerald-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Depth p</span>
              <Layers className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">QAOA Circuit Depth</h3>
              <p className="text-xs text-slate-400 mt-1">
                Number of alternating QAOA layers.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <select
                value={config.depth}
                onChange={(e) => onConfigChange({ depth: parseInt(e.target.value, 10) })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-sm focus:border-emerald-400 outline-none cursor-pointer"
              >
                <option value={1}>p = 1 Layer (Fast Trial)</option>
                <option value={2}>p = 2 Layers (Standard Capstone)</option>
                <option value={3}>p = 3 Layers (High Accuracy)</option>
              </select>
              <div className="text-xs font-mono text-slate-400">
                Total variational parameters: <span className="text-emerald-300">2p = {config.depth * 2}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Trigger Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onGenerateQUBO}
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Zap className="w-5 h-5 fill-current" />
            Generate QUBO Matrix
          </button>
        </div>

      </div>
    </section>
  );
};
