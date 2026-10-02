import type { BitstringResult } from '../types/quantum';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CheckCircle2, Award, TrendingUp, ShieldAlert, AlertTriangle } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface OptimalPortfolioProps {
  optimal: BitstringResult | null;
}

export const OptimalPortfolio: React.FC<OptimalPortfolioProps> = ({ optimal }) => {
  if (!optimal) return null;

  const selectedAssets = optimal.selectedAssets;
  const numSelected = selectedAssets.length || 1;
  const weightPercentage = (100 / numSelected).toFixed(1);

  const doughnutData = {
    labels: selectedAssets.map(a => a.symbol),
    datasets: [
      {
        data: selectedAssets.map(() => 100 / numSelected),
        backgroundColor: ['#ff6b7d', '#d45266', '#7c0b2b', '#e86070', '#f4eada'].slice(0, numSelected),
        borderColor: '#140307',
        borderWidth: 2,
        hoverOffset: 6
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#fffdf7',
          font: { family: 'JetBrains Mono', size: 12 },
          padding: 12
        }
      },
      tooltip: {
        backgroundColor: 'rgba(36, 5, 14, 0.95)',
        borderColor: 'rgba(212, 82, 102, 0.4)',
        borderWidth: 1,
        titleColor: '#ff6b7d',
        bodyColor: '#fffdf7',
        titleFont: { family: 'JetBrains Mono' }
      }
    }
  };

  return (
    <section id="results" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="badge-quantum">Section 10 — Portfolio Synthesis</div>
            <h2 className="text-3xl font-extrabold text-[#3D0515]">Optimal QAOA Portfolio Selection</h2>
            <p className="text-[#5C0820] max-w-2xl leading-relaxed text-sm font-medium">
              Synthesized risk-balanced asset allocation derived from quantum approximate optimization.
            </p>
          </div>

          {/* Academic / Financial Disclaimer Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7c0b2b]/40 border border-[#d45266]/40 text-[#ff6b7d] text-xs font-mono">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              <strong>Illustrative Simulation Result</strong> — Research prototype output only.
            </span>
          </div>
        </div>

        {/* Master Results Card */}
        <div className="glass-card p-6 sm:p-8 border border-[#d45266]/40 bg-[#24050e] space-y-8 shadow-2xl">
          
          {/* Header row: Selected Assets Pills */}
          <div>
            <span className="text-xs font-mono text-[#ff6b7d] uppercase tracking-widest block mb-3 font-bold">
              Selected Portfolio Components ({weightPercentage}% Capital Weighting Each)
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {selectedAssets.map(asset => (
                <div
                  key={asset.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#140307] border border-[#d45266]/40 font-mono font-bold text-sm text-[#fffdf7] shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b7d]" />
                  <span className="text-[#ff6b7d] font-bold">{asset.symbol}</span>
                  <span className="text-xs font-normal text-[#f4eada]/70">({asset.name}) — {weightPercentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Layout: Donut Allocation Chart & Key Financial Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-4 border-t border-[#d45266]/30">
            
            {/* Left: Allocation Donut Chart */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono text-[#f4eada] uppercase font-bold">
                Equal-Weight Portfolio Capital Allocation
              </h3>
              <div className="h-64 w-full flex items-center justify-center">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>

            {/* Right: 3 Key Financial Metric Cards */}
            <div className="space-y-4">
              
              {/* Metric 1: Expected Return */}
              <div className="p-4 rounded-xl bg-[#140307] border border-[#d45266]/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#7c0b2b]/40 text-[#ff6b7d]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#f4eada]/80 block uppercase font-bold">Expected Return</span>
                    <span className="text-xs text-[#f4eada]/60">Annualized Rₚ</span>
                  </div>
                </div>
                <div className="text-2xl font-mono font-extrabold text-[#ff6b7d]">
                  +{(optimal.returnVal * 100).toFixed(1)}%
                </div>
              </div>

              {/* Metric 2: Portfolio Risk */}
              <div className="p-4 rounded-xl bg-[#140307] border border-[#d45266]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#7c0b2b]/40 text-[#f4eada]">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#f4eada]/80 block uppercase font-bold">Portfolio Volatility (Risk)</span>
                    <span className="text-xs text-[#f4eada]/60">Standard Deviation σₚ</span>
                  </div>
                </div>
                <div className="text-2xl font-mono font-extrabold text-[#f4eada]">
                  {(optimal.riskVal * 100).toFixed(1)}%
                </div>
              </div>

              {/* Metric 3: Sharpe Ratio */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-[#7c0b2b] to-[#3D0515] border border-[#d45266] flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-[#d45266]/30 text-[#ff6b7d]">
                    <Award className="w-6 h-6 text-[#ff6b7d]" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#ff6b7d] block uppercase tracking-wider font-bold">
                      Sharpe Ratio (R_f = 3.5%)
                    </span>
                    <span className="text-xs text-[#f4eada]/80">Risk-Adjusted Performance</span>
                  </div>
                </div>
                <div className="text-3xl font-mono font-extrabold text-[#ff6b7d] text-glow">
                  {optimal.sharpeRatio.toFixed(2)}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
