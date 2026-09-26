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
          idx === 0 ? '#ff6b7d' : 'rgba(245, 235, 224, 0.45)'
        ),
        borderColor: topStates.map((_, idx) =>
          idx === 0 ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'
        ),
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
        bodyFont: { family: 'JetBrains Mono' }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#ffffff', font: { family: 'JetBrains Mono', size: 12, weight: 'bold' as const } }
      },
      y: {
        grid: { color: 'rgba(245, 235, 224, 0.15)' },
        ticks: { color: '#f5ebe0', font: { family: 'JetBrains Mono', size: 11, weight: 'bold' as const } },
        title: {
          display: true,
          text: 'Sampling Probability P(x) %',
          color: '#ffffff',
          font: { family: 'JetBrains Mono', size: 12, weight: 'bold' as const }
        }
      }
    }
  };

  const mostProbable = result.mostProbableBitstring;

  return (
    <section id="measurement" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header - High Contrast Dark Wine on Almond Cream */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 09 — Quantum Measurement</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515]">Measurement Probability Distribution</h2>
          <p className="text-[#5C0820] font-medium max-w-3xl leading-relaxed text-sm">
            Sampling quantum state measurements yields the computational basis bitstring distribution.
          </p>
        </div>

        {/* Highlight Card: Most Probable Bitstring */}
        <div className="glass-card p-6 border-2 border-[#ff6b7d] bg-[#5c0820] space-y-4 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#7c0b2b] text-[#ffffff] border border-[#ff6b7d]">
                <CheckCircle2 className="w-6 h-6 text-[#ff6b7d]" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#ffd166] uppercase tracking-widest block font-bold">
                  MOST PROBABLE QAOA QUANTUM SOLUTION
                </span>
                <div className="font-mono font-extrabold text-3xl text-[#ffffff] tracking-widest text-glow">
                  {mostProbable.bitstring}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="px-4 py-2 rounded-xl bg-[#3d0515] border border-[#ff6b7d]/50 text-center">
                <span className="text-[#f5ebe0] block text-[10px] font-bold">Probability</span>
                <span className="text-[#ffd166] font-extrabold text-base">
                  {(mostProbable.probability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#3d0515] border border-[#ff6b7d]/50 text-center">
                <span className="text-[#f5ebe0] block text-[10px] font-bold">Sample Shots</span>
                <span className="text-[#ffffff] font-extrabold text-base">
                  {mostProbable.shots} / 1000
                </span>
              </div>
            </div>
          </div>

          {/* Bitstring Asset Decoder */}
          <div className="pt-3 border-t border-[#ff6b7d]/30">
            <p className="text-xs text-[#ffffff] font-medium mb-3">
              The measured bitstring maps binary bits directly to asset selection (<span className="font-mono text-[#ffd166] font-bold">1</span> = Selected, <span className="font-mono text-[#f5ebe0] font-bold">0</span> = Unselected):
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-xs">
              {mostProbable.bitstring.split('').map((bit, idx) => {
                const asset = assets[idx];
                const isSelected = bit === '1';
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-[#7c0b2b] border-[#ff6b7d] text-[#ffffff] font-bold shadow-lg ring-2 ring-[#ff6b7d]/40'
                        : 'bg-[#3d0515] border-[#7c0b2b] text-[#f5ebe0] font-semibold'
                    }`}
                  >
                    <div className={`text-[11px] font-bold ${isSelected ? 'text-[#ffd166]' : 'text-[#f5ebe0]'}`}>
                      {asset?.symbol}
                    </div>
                    <div className="text-lg font-extrabold mt-0.5 text-[#ffffff]">{bit}</div>
                    <div className={`text-[10px] uppercase font-bold mt-1 ${isSelected ? 'text-[#ff6b7d]' : 'text-[#e6d0c0]'}`}>
                      {isSelected ? '✓ SELECTED' : 'EXCLUDED'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Probability Histogram Chart */}
        <div className="glass-card p-6 border-2 border-[#ff6b7d]/40 bg-[#5c0820]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#7c0b2b] text-xs font-mono">
            <span className="flex items-center gap-2 text-[#ffffff] font-extrabold text-sm">
              <BarChart className="w-4 h-4 text-[#ff6b7d]" />
              Top 8 Measured Computational Basis Bitstrings
            </span>
            <span className="text-[#f5ebe0] font-bold">1000 Total Shots</span>
          </div>

          <div className="h-72 w-full">
            <Bar data={data} options={options} />
          </div>
        </div>

      </div>
    </section>
  );
};
