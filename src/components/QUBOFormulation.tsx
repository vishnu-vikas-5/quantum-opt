import { useState } from 'react';
import type { QUBOMatrix, QAOAConfig } from '../types/quantum';
import { Grid, Zap, FileCode2, Info } from 'lucide-react';
import { StockLogo } from './StockLogo';
import { MathFormula } from './MathFormula';

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
  const currentP = config.isManualPenalty ? config.penalty : (config.autoPenalty || 10.42);

  // Compute heatmap color intensity based on value
  const getCellBg = (val: number) => {
    if (val === 0) return 'rgba(30, 41, 59, 0.4)';
    if (val > 0) {
      const intensity = Math.min(1, val / 25);
      return `rgba(56, 189, 248, ${0.2 + intensity * 0.6})`;
    } else {
      const intensity = Math.min(1, Math.abs(val) / 5);
      return `rgba(236, 72, 153, ${0.2 + intensity * 0.6})`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Expanded QUBO Form Mathematical Explanation Card */}
      <div className="glass-card p-6 border border-[#d45266]/40 bg-[#24050e] space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#3d0817] pb-3">
          <h3 className="text-sm font-bold text-[#ff6b7d] uppercase tracking-wider flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-[#ff6b7d]" />
            Expanded QUBO Algebraic Form
          </h3>
          <span className="px-2.5 py-0.5 rounded bg-[#140307] text-[#ffd166] border border-[#d45266]/30 text-[11px] font-bold">
            Identity: xᵢ² = xᵢ for xᵢ ∈ ❴0, 1❵
          </span>
        </div>

        <p className="text-[#cdaea0] leading-relaxed">
          Expanding the quadratic cardinality constraint term <MathFormula math="\left(\sum_{i=1}^N x_i - K\right)^2" /> using binary idempotent property <MathFormula math="x_i^2 = x_i" />:
        </p>

        {/* Algebraic Expansion Steps */}
        <div className="p-4 rounded-xl bg-[#140307] border border-[#d45266]/30 space-y-3">
          <div className="text-center py-1">
            <MathFormula
              math="\left(\sum_{i=1}^N x_i - K\right)^2 = \sum_{i=1}^N x_i + 2 \sum_{i<j} x_i x_j - 2K \sum_{i=1}^N x_i + K^2 = (1 - 2K) \sum_{i=1}^N x_i + 2 \sum_{i<j} x_i x_j + K^2"
              displayMode
            />
          </div>

          <div className="text-center py-1 border-t border-[#3d0817] pt-2">
            <MathFormula
              math="\boxed{ C(x) = \lambda x^T \Sigma x - (1-\lambda) \mu^T x + P \left[ (1 - 2K) \sum_{i=1}^N x_i + 2 \sum_{i<j} x_i x_j + K^2 \right] }"
              displayMode
            />
          </div>

          <div className="text-[11px] text-white pt-1 text-center">
            Live Expanded Form: <span className="text-[#ff6b7d] font-bold">C(x) = {config.riskAversion.toFixed(2)} xᵀΣx - {(1 - config.riskAversion).toFixed(2)} μᵀx + {currentP.toFixed(2)} [ (1 - {2 * config.portfolioSize}) Σxᵢ + 2 Σ xᵢxⱼ + {config.portfolioSize ** 2} ]</span>
          </div>
        </div>

        {/* Matrix Convention Note */}
        <div className="p-3 rounded-lg bg-[#140307] border border-[#d45266]/30 flex items-start gap-2 text-[11px] text-[#cdaea0]">
          <Info className="w-4 h-4 text-[#ffd166] shrink-0 mt-0.5" />
          <div>
            <strong>QUBO Matrix Convention:</strong> Formulated as <MathFormula math="C(x) = x^T Q x" />. Linear terms are stored on the matrix diagonal <MathFormula math="Q_{ii} = \lambda \Sigma_{ii} - (1-\lambda)\mu_i + P(1-2K)" />, while pairwise off-diagonal terms are <MathFormula math="Q_{ij} = 2\lambda \Sigma_{ij} + 2P" /> for <MathFormula math="i < j" />.
          </div>
        </div>
      </div>
      {/* QUBO Matrix Heatmap Visualizer */}
      <div className="glass-card p-6 border border-[#d45266]/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Grid className="w-5 h-5 text-[#ff6b7d]" />
              QUBO Coupling Matrix ({qubo.size} × {qubo.size})
            </h3>
            <p className="text-xs text-[#cdaea0]">
              Heatmap of asset coupling coefficients. Diagonals represent single-qubit bias; off-diagonals represent pairwise asset interactions.
            </p>
          </div>

          {/* Cell Hover Tooltip Banner */}
          <div className="px-4 py-2 rounded-lg bg-[#24050e] border border-[#d45266]/40 text-xs font-mono text-[#ff6b7d]">
            {hoveredCell ? (
              <span>
                Q[{qubo.assetSymbols[hoveredCell.row]}][{qubo.assetSymbols[hoveredCell.col]}] ={' '}
                <strong className="text-white">{hoveredCell.val.toFixed(3)}</strong>
              </span>
            ) : (
              <span className="text-[#8c6759]">Hover over cells to inspect coupling</span>
            )}
          </div>
        </div>

        {/* Matrix Heatmap Table */}
        <div className="overflow-x-auto pt-2">
          <div className="min-w-[500px] border border-[#d45266]/30 rounded-lg p-3 bg-[#24050e]">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-xs font-mono text-[#8c6759]">Q_ij</th>
                  {qubo.assetSymbols.map((symbol, idx) => (
                    <th key={idx} className="p-2 text-xs font-mono text-[#ff6b7d] font-bold">
                      <div className="flex flex-col items-center gap-1">
                        <StockLogo symbol={symbol} size="xs" />
                        <span>{symbol}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {qubo.matrix.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td className="p-2 text-xs font-mono text-[#ff6b7d] font-bold">
                      <div className="flex items-center gap-1.5 justify-end pr-2">
                        <StockLogo symbol={qubo.assetSymbols[rIdx]} size="xs" />
                        <span>{qubo.assetSymbols[rIdx]}</span>
                      </div>
                    </td>
                    {row.map((val, cIdx) => (
                      <td key={cIdx} className="p-1">
                        <div
                          onMouseEnter={() => setHoveredCell({ row: rIdx, col: cIdx, val })}
                          onMouseLeave={() => setHoveredCell(null)}
                          className="heatmap-cell py-2 px-1 rounded text-white font-mono text-xs cursor-pointer border border-[#d45266]/20"
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

        {/* Action Button: Convert to Ising */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onConvertToIsing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#24050e] hover:bg-[#380816] text-[#f4eada] border border-[#d45266]/40 font-bold text-xs shadow-md transition-all hover:scale-105"
          >
            <Zap className="w-4 h-4 text-[#ff6b7d]" />
            Inspect Ising Spin Model
          </button>
        </div>
      </div>
    </div>
  );
};

