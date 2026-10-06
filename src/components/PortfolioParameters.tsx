import type { QAOAConfig } from '../types/quantum';
import { Sliders, Settings2, Shield, Zap, Info, TrendingUp, ShieldAlert, FileText } from 'lucide-react';
import { MathFormula } from './MathFormula';

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
  const currentP = config.isManualPenalty ? config.penalty : (config.autoPenalty || 10.42);

  return (
    <section id="parameters" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 04 — Optimization Control</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515]">Portfolio Optimization Parameters</h2>
          <p className="text-[#5C0820] max-w-2xl leading-relaxed text-sm">
            Tune the objective weights and target cardinality constraint for QUBO generation.
          </p>
        </div>

        {/* Configuration Panel Grid (3 Parameters) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Parameter 1: Risk Aversion lambda */}
          <div className="glass-card p-6 border border-[#d45266]/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#ff6b7d] uppercase tracking-wider">Parameter λ</span>
              <Sliders className="w-4 h-4 text-[#ff6b7d]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Risk Aversion Factor</h3>
              <p className="text-xs text-[#cdaea0] mt-1">
                Controls the trade-off between return and risk.
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
                className="w-full accent-[#d45266] cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#cdaea0]">0.0 (Max Return)</span>
                <span className="px-2 py-0.5 rounded bg-[#d45266]/20 text-[#ff6b7d] font-bold border border-[#d45266]/40">
                  λ = {config.riskAversion.toFixed(2)}
                </span>
                <span className="text-[#cdaea0]">1.0 (Min Risk)</span>
              </div>
            </div>
          </div>

          {/* Parameter 2: Portfolio Size K */}
          <div className="glass-card p-6 border border-[#d45266]/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#ff6b7d] uppercase tracking-wider">Parameter K</span>
              <Settings2 className="w-4 h-4 text-[#ff6b7d]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Target Portfolio Size</h3>
              <p className="text-xs text-[#cdaea0] mt-1">
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
                className="w-full px-3 py-2 rounded-lg bg-[#24050e] border border-[#d45266]/40 text-[#f4eada] font-mono text-sm focus:border-[#ff6b7d] outline-none"
              />
              <div className="text-xs font-mono text-[#cdaea0]">
                Enforces constraint <span className="text-[#ff6b7d]">Σ xᵢ = {config.portfolioSize}</span>
              </div>
            </div>
          </div>

          {/* Parameter 3: Automatic Constraint Penalty P */}
          <div className="glass-card p-6 border border-[#d45266]/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#ff6b7d] uppercase tracking-wider">Parameter P</span>
              <Shield className="w-4 h-4 text-[#ff6b7d]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Constraint Penalty</h3>
              <p className="text-xs text-[#cdaea0] mt-1">
                Penalty multiplier P enforcing cardinality.
              </p>
            </div>
            <div className="space-y-2 pt-1 font-mono text-xs">
              {!config.isManualPenalty ? (
                <div className="p-2.5 rounded-lg bg-[#24050e] border border-[#d45266]/30 space-y-1">
                  <div className="text-[#ffd166] font-bold">P = Automatically Scaled</div>
                  <div className="text-white font-extrabold text-sm">P = {currentP.toFixed(2)}</div>
                  <div className="text-[10px] text-emerald-400 font-bold">✓ Scaled to enforce Σxᵢ = {config.portfolioSize}</div>
                </div>
              ) : (
                <div className="space-y-1">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    step="0.5"
                    value={config.penalty}
                    onChange={(e) => onConfigChange({ penalty: Math.max(1, parseFloat(e.target.value) || 1) })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#24050e] border border-[#d45266]/40 text-[#f4eada] font-mono text-sm focus:border-[#ff6b7d] outline-none"
                  />
                  <div className="text-[10px] text-amber-300">Manual Penalty Override Active</div>
                </div>
              )}

              {/* Advanced Manual Override Checkbox */}
              <label className="flex items-center gap-2 text-[11px] text-[#cdaea0] cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={!!config.isManualPenalty}
                  onChange={(e) => onConfigChange({ isManualPenalty: e.target.checked })}
                  className="accent-[#d45266] rounded cursor-pointer"
                />
                <span>Advanced: Manually override P</span>
              </label>
            </div>
          </div>

        </div>

        {/* Mathematical Optimization Objective Section */}
        <div className="glass-card p-6 border border-[#d45266]/40 bg-[#24050e] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3d0817] pb-3">
            <div>
              <h3 className="text-sm font-mono text-[#ff6b7d] uppercase tracking-wider font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#ff6b7d]" />
                Mathematical Optimization Objective
              </h3>
              <p className="text-xs text-[#cdaea0]">
                Dynamic Markowitz mean-variance portfolio objective formulated as a Quadratic Unconstrained Binary Optimization (QUBO) problem.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#140307] border border-[#d45266]/30 text-xs font-mono text-white">
              <span>λ = <strong>{config.riskAversion.toFixed(2)}</strong></span>
              <span className="text-[#8c6759]">|</span>
              <span>K = <strong>{config.portfolioSize}</strong></span>
              <span className="text-[#8c6759]">|</span>
              <span>P = <strong>{currentP.toFixed(2)}</strong></span>
              <span className="text-[#8c6759]">|</span>
              <span>N = <strong>8</strong></span>
            </div>
          </div>

          {/* Main Formula Box */}
          <div className="p-6 rounded-xl bg-[#140307] border-2 border-[#d45266]/40 text-center shadow-lg space-y-2">
            <span className="text-xs font-mono text-[#ffd166] font-bold block uppercase tracking-wider">
              DYNAMIC QUBO OBJECTIVE COST FUNCTION C(x)
            </span>
            <div className="py-2 overflow-x-auto">
              <MathFormula
                math="\min_{x \in \{0,1\}^N} \left[ \lambda x^T \Sigma x - (1-\lambda) \mu^T x + P \left(\sum_{i=1}^N x_i - K\right)^2 \right]"
                displayMode
              />
            </div>
            <div className="text-xs font-mono text-white pt-1">
              Live Equation: <span className="text-[#ff6b7d] font-bold">C(x) = {config.riskAversion.toFixed(2)} xᵀΣx - {(1 - config.riskAversion).toFixed(2)} μᵀx + {currentP.toFixed(2)} (Σxᵢ - {config.portfolioSize})²</span>
            </div>
          </div>

          {/* Three Components Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {/* Component 1: Risk Term */}
            <div className="p-4 rounded-xl bg-[#140307] border border-[#d45266]/30 space-y-2">
              <div className="flex items-center justify-between text-[#ff6b7d] font-bold">
                <span>1. Risk Term</span>
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="p-2.5 rounded bg-[#24050e] text-center border border-[#d45266]/20">
                <MathFormula math="\lambda x^T \Sigma x" />
              </div>
              <p className="text-[11px] text-[#cdaea0] leading-relaxed">
                Penalizes portfolios with high covariance-based risk <MathFormula math="\Sigma_{ij}" />.
              </p>
            </div>

            {/* Component 2: Return Term */}
            <div className="p-4 rounded-xl bg-[#140307] border border-[#d45266]/30 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>2. Return Term</span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="p-2.5 rounded bg-[#24050e] text-center border border-[#d45266]/20">
                <MathFormula math="-(1-\lambda) \mu^T x" />
              </div>
              <p className="text-[11px] text-[#cdaea0] leading-relaxed">
                Rewards portfolios with higher expected return <MathFormula math="\mu_i" /> (subtracted because QUBO is minimized).
              </p>
            </div>

            {/* Component 3: Constraint Term */}
            <div className="p-4 rounded-xl bg-[#140307] border border-[#d45266]/30 space-y-2">
              <div className="flex items-center justify-between text-[#ffd166] font-bold">
                <span>3. Constraint Term</span>
                <Info className="w-4 h-4" />
              </div>
              <div className="p-2.5 rounded bg-[#24050e] text-center border border-[#d45266]/20">
                <MathFormula math="P \left(\sum_{i=1}^N x_i - K\right)^2" />
              </div>
              <p className="text-[11px] text-[#cdaea0] leading-relaxed">
                Penalizes solutions that select a number of assets different from target <MathFormula math="K = {config.portfolioSize}" />.
              </p>
            </div>
          </div>
        </div>

        {/* Action Trigger Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onGenerateQUBO}
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#d45266] to-[#7c0b2b] hover:from-[#e86070] hover:to-[#961036] text-[#fffdf7] font-extrabold text-base shadow-xl shadow-[#d45266]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Zap className="w-5 h-5 fill-current text-white" />
            <span>Generate QUBO Matrix</span>
          </button>
        </div>

      </div>
    </section>
  );
};


