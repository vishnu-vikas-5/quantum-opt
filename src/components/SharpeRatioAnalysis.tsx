import { useState } from 'react';
import type { BitstringResult } from '../types/quantum';
import { MathFormula } from './MathFormula';
import { Award, Sliders, AlertTriangle } from 'lucide-react';

interface SharpeRatioAnalysisProps {
  optimal: BitstringResult | null;
}

export const SharpeRatioAnalysis: React.FC<SharpeRatioAnalysisProps> = ({ optimal }) => {
  const [riskFreeRate, setRiskFreeRate] = useState<number>(0.035);

  if (!optimal) return null;

  const returnVal = optimal.returnVal;
  const riskVal = optimal.riskVal;
  const customSharpe = riskVal > 0 ? (returnVal - riskFreeRate) / riskVal : 0;

  return (
    <section id="sharpe" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 12 — Performance Evaluation</div>
          <h2 className="text-3xl font-extrabold text-white">Risk-Adjusted Performance (Sharpe Ratio)</h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-sm">
            Quantifying risk-adjusted portfolio efficiency by evaluating return per unit of standard deviation volatility.
          </p>
        </div>

        {/* Master Large Sharpe Ratio Card */}
        <div className="glass-card p-8 border border-cyan-400 bg-cyan-950/20 text-center space-y-6 shadow-2xl shadow-cyan-950/60">
          <div className="inline-flex p-4 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            <Award className="w-10 h-10 text-cyan-400" />
          </div>

          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
              Optimal Portfolio Sharpe Ratio
            </span>
            <div className="text-6xl font-mono font-extrabold text-white tracking-tight text-glow">
              {customSharpe.toFixed(2)}
            </div>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mt-3">
              A higher Sharpe ratio indicates greater return relative to the portfolio's volatility for the selected assumptions.
            </p>
          </div>

          {/* Sub-Metrics Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-cyan-500/20 max-w-3xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs font-mono text-slate-400 uppercase block">Expected Return (Rₚ)</span>
              <span className="text-xl font-mono font-bold text-emerald-400">
                +{(returnVal * 100).toFixed(1)}%
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs font-mono text-slate-400 uppercase block">Portfolio Volatility (σₚ)</span>
              <span className="text-xl font-mono font-bold text-amber-400">
                {(riskVal * 100).toFixed(1)}%
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs font-mono text-slate-400 uppercase block">Risk-Free Rate (R_f)</span>
              <span className="text-xl font-mono font-bold text-cyan-300">
                {(riskFreeRate * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Risk-Free Rate Calculator Workbench */}
        <div className="glass-card p-6 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Interactive Risk-Free Rate Benchmark Calculator
              </h3>
              <p className="text-xs text-slate-400">
                Adjust baseline risk-free yield <MathFormula math="R_f" /> (e.g. US Treasury bond yields) to see impact on Sharpe ratio.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 font-mono text-xs">
              <span className="text-slate-400">R_f Yield:</span>
              <input
                type="range"
                min="0.0"
                max="0.08"
                step="0.005"
                value={riskFreeRate}
                onChange={(e) => setRiskFreeRate(parseFloat(e.target.value))}
                className="w-28 accent-cyan-400 cursor-pointer"
              />
              <span className="text-cyan-300 font-bold">{(riskFreeRate * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Academic Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <strong>Research Prototype Disclaimer:</strong> Calculated Sharpe ratios are strictly for academic demonstration and algorithm benchmarking based on synthetic asset statistics.
          </div>
        </div>

      </div>
    </section>
  );
};
