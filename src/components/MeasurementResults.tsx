import type { QAOAResult, Asset } from '../types/quantum';
import { MathFormula } from './MathFormula';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { BarChart, CheckCircle2, XCircle, Info, ShieldCheck, Award } from 'lucide-react';
import { StockLogo } from './StockLogo';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MeasurementResultsProps {
  result: QAOAResult | null;
  assets: Asset[];
}

export const MeasurementResults: React.FC<MeasurementResultsProps> = ({ result, assets }) => {
  if (!result) return null;

  const bestFeasible = result.bestFeasibleBitstring || result.mostProbableBitstring;
  const mostProbable = result.mostProbableBitstring;
  const topStates = result.histogram;

  const labels = topStates.map(s => s.bitstring);
  const probabilities = topStates.map(s => (s.probability * 100));

  const data = {
    labels,
    datasets: [
      {
        label: 'Sampling Probability (%)',
        data: probabilities,
        backgroundColor: topStates.map((s) => {
          if (s.bitstring === bestFeasible.bitstring) return '#10b981'; // Emerald green for Best Feasible
          if (!s.isValidSize) return 'rgba(239, 68, 68, 0.45)'; // Red for infeasible
          return 'rgba(245, 235, 224, 0.45)';
        }),
        borderColor: topStates.map((s) => {
          if (s.bitstring === bestFeasible.bitstring) return '#34d399';
          if (!s.isValidSize) return '#ef4444';
          return 'rgba(255, 255, 255, 0.7)';
        }),
        borderWidth: 1.5,
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#3d0515',
        borderColor: '#ff6b7d',
        borderWidth: 1.5,
        titleColor: '#ffffff',
        bodyColor: '#f5ebe0',
        titleFont: { family: 'JetBrains Mono', weight: 'bold' as const },
        bodyFont: { family: 'JetBrains Mono' },
        callbacks: {
          label: (context: any) => {
            const item = topStates[context.dataIndex];
            const status = item?.isValidSize ? '✓ Feasible' : '✗ Infeasible';
            return [
              `Probability: ${Number(context.parsed.y).toFixed(2)}%`,
              `Constraint: ${status} (${item?.selectedAssets.length} Assets)`,
              `QUBO Cost: ${item?.cost.toFixed(3)}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#ffffff', font: { family: 'JetBrains Mono', size: 11, weight: 'bold' as const } }
      },
      y: {
        grid: { color: 'rgba(245, 235, 224, 0.15)' },
        ticks: {
          color: '#f5ebe0',
          font: { family: 'JetBrains Mono', size: 11, weight: 'bold' as const },
          callback: (value: any) => `${value}%`
        },
        title: {
          display: true,
          text: 'Sampling Probability P(x) (%)',
          color: '#ffffff',
          font: { family: 'JetBrains Mono', size: 12, weight: 'bold' as const }
        }
      }
    }
  };

  const bestFeasibleCount = bestFeasible.bitstring.split('').reduce((acc, bit) => acc + (bit === '1' ? 1 : 0), 0);
  const mostProbableCount = mostProbable.bitstring.split('').reduce((acc, bit) => acc + (bit === '1' ? 1 : 0), 0);

  return (
    <section id="measurement" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 09 — Quantum Measurement & Feasibility</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515]">QAOA Solution & Measurement Distribution</h2>
          <p className="text-[#5C0820] font-medium max-w-3xl leading-relaxed text-sm">
            Evaluating measured basis states for exact cardinality feasibility <MathFormula math="\sum_{i=1}^N x_i = K" /> and optimal QUBO cost <MathFormula math="C(x)" />.
          </p>
        </div>

        {/* Primary Card: BEST FEASIBLE QAOA SOLUTION */}
        <div className="glass-card p-6 border-2 border-emerald-500 bg-[#16060c] space-y-6 shadow-2xl shadow-emerald-950/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3d0817] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/50">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    BEST FEASIBLE QAOA SOLUTION
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                    ★ Selected Portfolio
                  </span>
                </div>
                <div className="font-mono font-extrabold text-3xl text-white tracking-widest text-glow mt-0.5">
                  {bestFeasible.bitstring}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <div className="px-4 py-2.5 rounded-xl bg-[#24050e] border border-emerald-500/40 text-center">
                <span className="text-[#cdaea0] block text-[10px] uppercase font-bold">Probability</span>
                <span className="text-emerald-400 font-extrabold text-base">
                  {(bestFeasible.probability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-[#24050e] border border-emerald-500/40 text-center">
                <span className="text-[#cdaea0] block text-[10px] uppercase font-bold">Selected Assets</span>
                <span className="text-white font-extrabold text-base">
                  {bestFeasibleCount} / {bestFeasible.selectedAssets.length > 0 ? (bestFeasible.isValidSize ? bestFeasibleCount : bestFeasibleCount) : 0}
                </span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-[#24050e] border border-emerald-500/40 text-center">
                <span className="text-[#cdaea0] block text-[10px] uppercase font-bold">Constraint Status</span>
                <span className={`font-extrabold text-sm block flex items-center justify-center gap-1 ${bestFeasible.isValidSize ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {bestFeasible.isValidSize ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-amber-400" />}
                  {bestFeasible.isValidSize ? '✓ Feasible' : '✗ Violated'}
                </span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-[#24050e] border border-emerald-500/40 text-center">
                <span className="text-[#cdaea0] block text-[10px] uppercase font-bold">QUBO Cost C(x)</span>
                <span className="text-white font-extrabold text-base">
                  {bestFeasible.cost.toFixed(3)}
                </span>
              </div>
            </div>
          </div>

          {/* Asset Bitstring Decoder Grid */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-[#cdaea0]">
              <span>
                Binary Qubit Mapping (<span className="font-mono text-emerald-400 font-bold">1</span> = Selected, <span className="font-mono text-[#f4eada] font-bold">0</span> = Excluded):
              </span>
              <span className="font-mono text-emerald-300 font-bold">
                Sum(x_i) = {bestFeasibleCount} Selected Assets
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 font-mono text-xs">
              {bestFeasible.bitstring.split('').map((bit, idx) => {
                const asset = assets[idx];
                const isSelected = bit === '1';
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-500 text-white font-bold shadow-lg ring-1 ring-emerald-500/50'
                        : 'bg-[#140307] border-[#3d0817] text-[#cdaea0]'
                    }`}
                  >
                    {asset && (
                      <div className="flex justify-center mb-1">
                        <StockLogo symbol={asset.symbol} name={asset.name} logoUrl={asset.logoUrl} size="xs" />
                      </div>
                    )}
                    <div className={`text-[11px] font-bold ${isSelected ? 'text-emerald-300' : 'text-[#cdaea0]'}`}>
                      {asset?.symbol || `q_${idx}`}
                    </div>
                    <div className="text-xl font-extrabold mt-0.5 text-white">{bit}</div>
                    <div className={`text-[10px] uppercase font-bold mt-1 ${isSelected ? 'text-emerald-400' : 'text-[#8c6759]'}`}>
                      {isSelected ? '1 SELECTED' : '0 EXCLUDED'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Secondary Educational Card: MOST PROBABLE MEASURED STATE vs FEASIBILITY */}
        <div className="glass-card p-6 border border-[#ff6b7d]/40 bg-[#24050e] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3d0817] pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#140307] text-[#ff6b7d] border border-[#d45266]/30">
                <Award className="w-5 h-5 text-[#ff6b7d]" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#ff6b7d] uppercase tracking-wider font-bold block">
                  Raw Quantum Measurement — Most Probable State
                </span>
                <div className="font-mono font-bold text-lg text-white">
                  Bitstring: <span className="text-[#ffd166]">{mostProbable.bitstring}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-[#140307] border border-[#d45266]/30">
                <span className="text-[#cdaea0]">Probability: </span>
                <span className="text-[#ffd166] font-bold">{(mostProbable.probability * 100).toFixed(1)}%</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#140307] border border-[#d45266]/30">
                <span className="text-[#cdaea0]">Selected: </span>
                <span className="text-white font-bold">{mostProbableCount} Assets</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#140307] border border-[#d45266]/30">
                <span className="text-[#cdaea0]">Constraint: </span>
                <span className={`font-bold ${mostProbable.isValidSize ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {mostProbable.isValidSize ? '✓ Feasible' : '✗ Infeasible'}
                </span>
              </div>
            </div>
          </div>

          {/* Academic Distinction Callout Box */}
          <div className="p-4 rounded-xl bg-[#140307] border border-[#ff6b7d]/30 text-xs font-mono space-y-1 text-[#cdaea0]">
            <div className="flex items-center gap-2 text-white font-bold">
              <Info className="w-4 h-4 text-[#ff6b7d] shrink-0" />
              <span>Academic Insight: Highest Measurement Probability ≠ Automatically Best Portfolio</span>
            </div>
            <p className="leading-relaxed text-[11px] pt-1">
              Quantum statevector measurement samples all <MathFormula math="2^N = 256" /> computational basis states in Hilbert space. Unconstrained zero states (e.g. <span className="text-white font-bold">00000000</span>) or over-selected states may carry non-zero measurement probability before perfect convergence. The application filters measured states to identify candidate portfolios satisfying <MathFormula math="\sum x_i = K" />, selecting the <strong>Best Feasible QAOA Solution</strong> with optimal QUBO cost <MathFormula math="C(x)" />.
            </p>
          </div>
        </div>

        {/* Probability Histogram Chart */}
        <div className="glass-card p-6 border-2 border-[#ff6b7d]/40 bg-[#24050e] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#3d0817] text-xs font-mono">
            <span className="flex items-center gap-2 text-white font-extrabold text-sm">
              <BarChart className="w-4 h-4 text-[#ff6b7d]" />
              Measured Computational Basis State Distribution (1000 Shots)
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Best Feasible
              </span>
              <span className="flex items-center gap-1 text-rose-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block" /> Infeasible
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <Bar data={data} options={options} />
          </div>

          {/* Top States Table */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#3d0817] text-[#cdaea0] text-[11px] uppercase">
                  <th className="py-2 px-3">Bitstring</th>
                  <th className="py-2 px-3">Probability</th>
                  <th className="py-2 px-3">Selected Assets</th>
                  <th className="py-2 px-3 text-center">Constraint Status</th>
                  <th className="py-2 px-3 text-right">QUBO Cost C(x)</th>
                </tr>
              </thead>
              <tbody>
                {topStates.map((st, idx) => {
                  const isBestFeasible = st.bitstring === bestFeasible.bitstring;
                  return (
                    <tr
                      key={idx}
                      className={`border-b border-[#3d0817]/60 transition-colors ${
                        isBestFeasible
                          ? 'bg-emerald-950/40 text-white font-bold'
                          : st.isValidSize
                          ? 'hover:bg-[#380816]/40 text-[#f4eada]'
                          : 'hover:bg-[#380816]/40 text-[#cdaea0]'
                      }`}
                    >
                      <td className="py-2.5 px-3 flex items-center gap-2">
                        <span className="font-bold">{st.bitstring}</span>
                        {isBestFeasible && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-900 text-emerald-300 text-[9px]">★ BEST</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">{(st.probability * 100).toFixed(2)}%</td>
                      <td className="py-2.5 px-3">{st.selectedAssets.length} Assets</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          st.isValidSize
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                        }`}>
                          {st.isValidSize ? '✓ Feasible' : '✗ Infeasible'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold">{st.cost.toFixed(3)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
