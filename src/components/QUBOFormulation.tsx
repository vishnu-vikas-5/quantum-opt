import { useState } from 'react';
import type { QUBOMatrix, QAOAConfig } from '../types/quantum';
import { Grid, Zap } from 'lucide-react';

interface QUBOFormulationProps {
  qubo: QUBOMatrix;
  config: QAOAConfig;
  onConvertToIsing: () => void;
}

export const QUBOFormulation: React.FC<QUBOFormulationProps> = ({
  qubo,
  onConvertToIsing
}) => {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number; val: number } | null>(null);

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
                      {symbol}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {qubo.matrix.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td className="p-2 text-xs font-mono text-[#ff6b7d] font-bold">{qubo.assetSymbols[rIdx]}</td>
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

