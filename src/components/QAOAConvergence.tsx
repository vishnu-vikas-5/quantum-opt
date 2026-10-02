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
        borderColor: '#ff6b7d',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(255, 107, 125, 0.35)');
          gradient.addColorStop(1, 'rgba(255, 107, 125, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#ff6b7d'
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
          color: '#f4eada',
          font: { family: 'JetBrains Mono', size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(36, 5, 14, 0.95)',
        borderColor: 'rgba(212, 82, 102, 0.4)',
        borderWidth: 1,
        titleColor: '#ff6b7d',
        bodyColor: '#fffdf7',
        titleFont: { family: 'JetBrains Mono' },
        bodyFont: { family: 'JetBrains Mono' }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(212, 82, 102, 0.15)' },
        ticks: { color: '#f4eada', font: { family: 'JetBrains Mono', size: 10 } }
      },
      y: {
        grid: { color: 'rgba(212, 82, 102, 0.15)' },
        ticks: { color: '#f4eada', font: { family: 'JetBrains Mono', size: 10 } },
        title: {
          display: true,
          text: 'Objective Cost C(x)',
          color: '#f4eada',
          font: { family: 'JetBrains Mono', size: 11 }
        }
      }
    }
  };

  return (
    <section id="convergence" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 08 — Optimization Dynamics</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515]">QAOA Cost Function Convergence</h2>
          <p className="text-[#5C0820] max-w-2xl leading-relaxed text-sm font-medium">
            Iterative energy minimization trajectory as COBYLA classical optimizer updates variational angles <MathFormula math="(\vec{\gamma}, \vec{\beta})" />.
          </p>
        </div>

        {/* 3 Metric Display Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-card p-5 border border-[#d45266]/40 bg-[#24050e] text-center space-y-1">
            <span className="text-xs font-mono text-[#f4eada]/70 uppercase font-bold">Initial Cost</span>
            <div className="text-2xl font-mono font-extrabold text-[#f4eada]">
              {result.initialCost.toFixed(2)}
            </div>
            <span className="text-[10px] text-[#f4eada]/50 font-mono block">Uniform Superposition</span>
          </div>

          <div className="glass-card p-5 border border-[#ff6b7d] text-center space-y-1 bg-[#7c0b2b]/40">
            <span className="text-xs font-mono text-[#ff6b7d] uppercase font-bold">Final Optimized Cost</span>
            <div className="text-3xl font-mono font-extrabold text-[#ff6b7d] text-glow">
              {result.finalCost.toFixed(2)}
            </div>
            <span className="text-[10px] text-[#ff6b7d]/90 font-mono block font-bold">Converged Ground State</span>
          </div>

          <div className="glass-card p-5 border border-[#d45266]/40 bg-[#24050e] text-center space-y-1">
            <span className="text-xs font-mono text-[#f4eada]/70 uppercase font-mono font-bold">Iterations Count</span>
            <div className="text-2xl font-mono font-extrabold text-[#f4eada]">
              {result.totalIterations}
            </div>
            <span className="text-[10px] text-[#f4eada]/50 font-mono block">COBYLA Optimizer Steps</span>
          </div>
        </div>

        {/* Convergence Chart Container */}
        <div className="glass-card p-6 border border-[#d45266]/40 bg-[#24050e]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#d45266]/30 text-xs font-mono text-[#f4eada]/70">
            <span className="flex items-center gap-2 text-[#ff6b7d] font-bold">
              <TrendingDown className="w-4 h-4" />
              Variational Energy Expectation Value Trajectory
            </span>
            <span className="text-[#f4eada]/50">50 Epochs</span>
          </div>

          <div className="h-72 w-full">
            <Line data={data} options={options} />
          </div>
        </div>

      </div>
    </section>
  );
};
