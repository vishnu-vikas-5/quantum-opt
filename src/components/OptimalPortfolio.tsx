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
        backgroundColor: selectedAssets.map(a => a.color || '#38bdf8'),
        borderColor: '#0f172a',
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
          color: '#f8fafc',
          font: { family: 'JetBrains Mono', size: 12 },
          padding: 12
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1,
        titleColor: '#00f2fe',
        bodyColor: '#f8fafc',
        titleFont: { family: 'JetBrains Mono' }
      }
    }
  };

  return (
    <section id="results" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="badge-quantum">Section 10 — Portfolio Synthesis</div>
            <h2 className="text-3xl font-extrabold text-white">Optimal QAOA Portfolio Selection</h2>
            <p className="text-slate-300 max-w-2xl leading-relaxed text-sm">
              Synthesized risk-balanced asset allocation derived from quantum approximate optimization.
            </p>
          </div>

          {/* Academic / Financial Disclaimer Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              <strong>Illustrative Simulation Result</strong> — Research prototype output only.
            </span>
          </div>
        </div>

        {/* Master Results Card */}
        <div className="glass-card p-6 sm:p-8 border border-cyan-400 bg-slate-950/80 space-y-8 shadow-2xl shadow-cyan-950/60">
          
          {/* Header row: Selected Assets Pills */}
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-3">
              Selected Portfolio Components ({weightPercentage}% Capital Weighting Each)
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {selectedAssets.map(asset => (
                <div
                  key={asset.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 font-mono font-bold text-sm text-white shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span style={{ color: asset.color }}>{asset.symbol}</span>
                  <span className="text-xs font-normal text-slate-400">({asset.name}) — {weightPercentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Layout: Donut Allocation Chart & Key Financial Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-4 border-t border-slate-800">
            
            {/* Left: Allocation Donut Chart */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono text-slate-400 uppercase">
                Equal-Weight Portfolio Capital Allocation
              </h3>
              <div className="h-64 w-full flex items-center justify-center">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>

            {/* Right: 3 Key Financial Metric Cards */}
            <div className="space-y-4">
              
              {/* Metric 1: Expected Return */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block uppercase">Expected Return</span>
                    <span className="text-xs text-slate-500">Annualized Rₚ</span>
                  </div>
                </div>
                <div className="text-2xl font-mono font-extrabold text-emerald-400">
                  +{(optimal.returnVal * 100).toFixed(1)}%
                </div>
              </div>

              {/* Metric 2: Portfolio Risk */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block uppercase">Portfolio Volatility (Risk)</span>
                    <span className="text-xs text-slate-500">Standard Deviation σₚ</span>
                  </div>
                </div>
                <div className="text-2xl font-mono font-extrabold text-amber-400">
                  {(optimal.riskVal * 100).toFixed(1)}%
                </div>
              </div>

              {/* Metric 3: Sharpe Ratio */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-400 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-300">
                    <Award className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-300 block uppercase tracking-wider">
                      Sharpe Ratio (R_f = 3.5%)
                    </span>
                    <span className="text-xs text-slate-400">Risk-Adjusted Performance</span>
                  </div>
                </div>
                <div className="text-3xl font-mono font-extrabold text-cyan-300 text-glow">
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
