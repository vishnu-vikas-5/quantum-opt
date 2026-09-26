import type { QAOAResult } from '../types/quantum';
import { MathFormula } from './MathFormula';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { TrendingDown } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface QAOAConvergenceProps {
  result: QAOAResult | null;
}

export const QAOAConvergence: React.FC<QAOAConvergenceProps> = ({ result }) => {
  if (!result) return null;

  const iterations = result.convergence.map(c => `Iter ${c.iteration}`);
  const costs = result.convergence.map(c => c.cost);

  const data = {
    labels: iterations,
    datasets: [
      {
        label: 'QAOA Cost Function <H_C>',
        data: costs,
        borderColor: '#00f2fe',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
          gradient.addColorStop(1, 'rgba(0, 242, 254, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 6,
        pointBackgroundColor: '#00f2fe'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#94a3b8',
          font: { family: 'JetBrains Mono', size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1,
        titleColor: '#00f2fe',
        bodyColor: '#f8fafc',
        titleFont: { family: 'JetBrains Mono' },
        bodyFont: { family: 'JetBrains Mono' }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } },
        title: {
          display: true,
          text: 'Objective Cost C(x)',
          color: '#94a3b8',
          font: { family: 'JetBrains Mono', size: 11 }
        }
      }
    }
  };

  return (
    <section id="convergence" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 08 — Optimization Dynamics</div>
          <h2 className="text-3xl font-extrabold text-white">QAOA Cost Function Convergence</h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-sm">
            Iterative energy minimization trajectory as COBYLA classical optimizer updates variational angles <MathFormula math="(\vec{\gamma}, \vec{\beta})" />.
          </p>
        </div>

        {/* 3 Metric Display Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-card p-5 border border-slate-800 text-center space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase">Initial Cost</span>
            <div className="text-2xl font-mono font-extrabold text-amber-400">
              {result.initialCost.toFixed(2)}
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">Uniform Superposition</span>
          </div>

          <div className="glass-card p-5 border border-cyan-500/30 text-center space-y-1 bg-cyan-950/20">
            <span className="text-xs font-mono text-cyan-400 uppercase">Final Optimized Cost</span>
            <div className="text-3xl font-mono font-extrabold text-cyan-300 text-glow">
              {result.finalCost.toFixed(2)}
            </div>
            <span className="text-[10px] text-cyan-400/80 font-mono block">Converged Ground State</span>
          </div>

          <div className="glass-card p-5 border border-slate-800 text-center space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase font-mono">Iterations Count</span>
            <div className="text-2xl font-mono font-extrabold text-indigo-400">
              {result.totalIterations}
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">COBYLA Optimizer Steps</span>
          </div>
        </div>

        {/* Convergence Chart Container */}
        <div className="glass-card p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2 text-cyan-300 font-bold">
              <TrendingDown className="w-4 h-4" />
              Variational Energy Expectation Value Trajectory
            </span>
            <span className="text-slate-500">50 Epochs</span>
          </div>

          <div className="h-72 w-full">
            <Line data={data} options={options} />
          </div>
        </div>

      </div>
    </section>
  );
};
