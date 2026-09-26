import { useState } from 'react';
import type { QUBOMatrix, QAOAConfig } from '../types/quantum';
import { MathFormula } from './MathFormula';
import { Grid, Zap, ShieldAlert, TrendingUp, AlertTriangle } from 'lucide-react';

interface QUBOFormulationProps {
  qubo: QUBOMatrix;
  config: QAOAConfig;
  onConvertToIsing: () => void;
}

export const QUBOFormulation: React.FC<QUBOFormulationProps> = ({
  qubo,
  config,
  onConvertToIsing
}) => {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number; val: number } | null>(null);

  // Compute heatmap color intensity based on value
  const getCellBg = (val: number) => {
    if (val === 0) return 'bg-slate-900 text-slate-500';
    if (val > 0) {
      const intensity = Math.min(1, val / 25);
      return `rgba(56, 189, 248, ${0.15 + intensity * 0.6})`;
    } else {
      const intensity = Math.min(1, Math.abs(val) / 5);
      return `rgba(236, 72, 153, ${0.15 + intensity * 0.6})`;
    }
  };

  return (
    <section id="qubo" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 05 — Mathematical Formulation</div>
          <h2 className="text-3xl font-extrabold text-white">QUBO Formulation</h2>
          <p className="text-slate-300 max-w-3xl leading-relaxed text-sm">
            Quadratic Unconstrained Binary Optimization (QUBO) converts constrained portfolio selection into a binary energy minimization objective suitable for quantum processing.
          </p>
        </div>

        {/* Master QUBO Formula Banner */}
        <div className="glass-card p-6 border border-cyan-500/30 bg-slate-950/90 text-center space-y-3">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Master QUBO Cost Function C(x)</div>
          <div className="py-3 px-4 rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto">
            <MathFormula
              math="C(x) = \lambda x^T \Sigma x - (1-\lambda) \mu^T x + P \left(\sum_{i=1}^N x_i - K\right)^2"
              displayMode
            />
          </div>
          <p className="text-xs text-slate-400">
            Minimizing <MathFormula math="C(x)" /> simultaneously optimizes expected returns, reduces portfolio volatility, and enforces selecting exactly K assets.
          </p>
        </div>

        {/* 3 Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Term 1: Risk Term */}
          <div className="glass-card p-6 border border-cyan-500/20 hover:border-cyan-400/40 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-cyan-500/10 text-cyan-400"><ShieldAlert className="w-4 h-4" /></div>
              <h3 className="font-bold text-white text-base">1. Portfolio Risk Term</h3>
            </div>
            <div className="p-3 rounded bg-slate-950 border border-slate-800 text-center">
              <MathFormula math="\lambda x^T \Sigma x = \lambda \sum_{i,j} x_i x_j \Sigma_{ij}" displayMode />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Penalizes correlated assets and high volatility. Scaled by risk aversion factor <MathFormula math={`\\lambda = ${config.riskAversion.toFixed(2)}`} />.
            </p>
          </div>

          {/* Term 2: Return Term */}
          <div className="glass-card p-6 border border-emerald-500/20 hover:border-emerald-400/40 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-emerald-500/10 text-emerald-400"><TrendingUp className="w-4 h-4" /></div>
              <h3 className="font-bold text-white text-base">2. Expected Return Term</h3>
            </div>
            <div className="p-3 rounded bg-slate-950 border border-slate-800 text-center">
              <MathFormula math="-(1-\lambda) \mu^T x = -(1-\lambda) \sum_{i} x_i \mu_i" displayMode />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rewards selecting assets with high historical returns. Scaled by return priority <MathFormula math={`(1-\\lambda) = ${(1 - config.riskAversion).toFixed(2)}`} />.
            </p>
          </div>

          {/* Term 3: Constraint Penalty */}
          <div className="glass-card p-6 border border-purple-500/20 hover:border-purple-400/40 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-purple-500/10 text-purple-400"><AlertTriangle className="w-4 h-4" /></div>
              <h3 className="font-bold text-white text-base">3. Size Constraint Penalty</h3>
            </div>
            <div className="p-3 rounded bg-slate-950 border border-slate-800 text-center">
              <MathFormula math="P \left(\sum_{i=1}^N x_i - K\right)^2" displayMode />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Adds quadratic cost penalty <MathFormula math={`P = ${config.penalty}`} /> whenever selected portfolio size differs from target size <MathFormula math={`K = ${config.portfolioSize}`} />.
            </p>
          </div>

        </div>

        {/* QUBO Matrix Heatmap Visualizer */}
        <div className="glass-card p-6 border border-cyan-500/20 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Grid className="w-5 h-5 text-cyan-400" />
                Generated QUBO Matrix Q ({qubo.size} × {qubo.size})
              </h3>
              <p className="text-xs text-slate-400">
                Interactive Heatmap of coupling coefficients <MathFormula math="Q_{ij}" />. Diagonal terms <MathFormula math="Q_{ii}" /> represent linear single-qubit bias; off-diagonals <MathFormula math="Q_{ij}" /> represent pairwise coupling.
              </p>
            </div>

            {/* Cell Hover Tooltip Banner */}
            <div className="px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
              {hoveredCell ? (
                <span>
                  Q[{qubo.assetSymbols[hoveredCell.row]}][{qubo.assetSymbols[hoveredCell.col]}] ={' '}
                  <strong className="text-white">{hoveredCell.val.toFixed(3)}</strong>
                </span>
              ) : (
                <span className="text-slate-500">Hover over matrix cells to inspect coefficients</span>
              )}
            </div>
          </div>

          {/* Matrix Heatmap Table */}
          <div className="overflow-x-auto pt-2">
            <div className="min-w-[600px] border border-slate-800 rounded-lg p-3 bg-slate-950/80">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-xs font-mono text-slate-500">Q_ij</th>
                    {qubo.assetSymbols.map((symbol, idx) => (
                      <th key={idx} className="p-2 text-xs font-mono text-cyan-400 font-bold">
                        {symbol}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {qubo.matrix.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-xs font-mono text-cyan-400 font-bold">{qubo.assetSymbols[rIdx]}</td>
                      {row.map((val, cIdx) => (
                        <td key={cIdx} className="p-1">
                          <div
                            onMouseEnter={() => setHoveredCell({ row: rIdx, col: cIdx, val })}
                            onMouseLeave={() => setHoveredCell(null)}
                            className="heatmap-cell py-2 px-1 rounded text-white font-mono text-xs cursor-pointer border border-slate-800/40"
                            style={{ backgroundColor: getCellBg(val) }}
                          >
                            {val.toFixed(2)}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Button: Convert to Ising */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onConvertToIsing}
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Zap className="w-5 h-5" />
            Convert QUBO to Ising Hamiltonian
          </button>
        </div>

      </div>
    </section>
  );
};
