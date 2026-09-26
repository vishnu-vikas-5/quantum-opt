import type { QAOAResult, Asset } from '../types/quantum';
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
import { BarChart, CheckCircle2 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MeasurementResultsProps {
  result: QAOAResult | null;
  assets: Asset[];
}

export const MeasurementResults: React.FC<MeasurementResultsProps> = ({ result, assets }) => {
  if (!result) return null;

  const topStates = result.histogram;
  const labels = topStates.map(s => s.bitstring);
  const probabilities = topStates.map(s => (s.probability * 100));

  const data = {
    labels,
    datasets: [
      {
        label: 'Measurement Probability (%)',
        data: probabilities,
        backgroundColor: topStates.map((_, idx) =>
          idx === 0 ? 'rgba(0, 242, 254, 0.85)' : 'rgba(56, 189, 248, 0.35)'
        ),
        borderColor: topStates.map((_, idx) =>
          idx === 0 ? '#00f2fe' : 'rgba(56, 189, 248, 0.6)'
        ),
        borderWidth: 1,
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
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderColor: 'rgba(56, 189, 248, 0.4)',
        borderWidth: 1,
        titleColor: '#00f2fe',
        bodyColor: '#f8fafc',
        titleFont: { family: 'JetBrains Mono' },
        bodyFont: { family: 'JetBrains Mono' }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#00f2fe', font: { family: 'JetBrains Mono', size: 11, weight: 'bold' as const } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } },
        title: {
          display: true,
          text: 'Sampling Probability P(x) %',
          color: '#94a3b8',
          font: { family: 'JetBrains Mono', size: 11 }
        }
      }
    }
  };

  const mostProbable = result.mostProbableBitstring;

  return (
    <section id="measurement" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 09 — Quantum Measurement</div>
          <h2 className="text-3xl font-extrabold text-white">Measurement Probability Distribution</h2>
          <p className="text-slate-300 max-w-3xl leading-relaxed text-sm">
            Sampling quantum state measurements yields the computational basis bitstring distribution.
          </p>
        </div>

        {/* Highlight Card: Most Probable Bitstring */}
        <div className="glass-card p-6 border border-cyan-400 bg-cyan-950/20 space-y-4 shadow-xl shadow-cyan-950/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                <CheckCircle2 className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
                  Most Probable QAOA Quantum Solution
                </span>
                <div className="font-mono font-extrabold text-2xl text-white tracking-widest text-glow">
                  {mostProbable.bitstring}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-slate-400 block text-[10px]">Probability</span>
                <span className="text-cyan-300 font-bold text-sm">
                  {(mostProbable.probability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-slate-400 block text-[10px]">Sample Shots</span>
                <span className="text-white font-bold text-sm">
                  {mostProbable.shots} / 1000
                </span>
              </div>
            </div>
          </div>

          {/* Bitstring Asset Decoder */}
          <div className="pt-2 border-t border-cyan-500/20">
            <p className="text-xs text-slate-300 mb-3">
              The measured bitstring maps binary bits directly to asset selection (<span className="font-mono text-cyan-300 font-bold">1</span> = Selected, <span className="font-mono text-slate-500">0</span> = Unselected):
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-xs">
              {mostProbable.bitstring.split('').map((bit, idx) => {
                const asset = assets[idx];
                const isSelected = bit === '1';
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-600'
                    }`}
                  >
                    <div className="text-[10px] opacity-75">{asset?.symbol}</div>
                    <div className="text-base font-extrabold mt-0.5">{bit}</div>
                    <div className="text-[9px] uppercase mt-0.5">
                      {isSelected ? '✓ Selected' : 'Excluded'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Probability Histogram Chart */}
        <div className="glass-card p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2 text-cyan-400 font-bold">
              <BarChart className="w-4 h-4" />
              Top 8 Measured Computational Basis Bitstrings
            </span>
            <span>1000 Total Shots</span>
          </div>

          <div className="h-72 w-full">
            <Bar data={data} options={options} />
          </div>
        </div>

      </div>
    </section>
  );
};
