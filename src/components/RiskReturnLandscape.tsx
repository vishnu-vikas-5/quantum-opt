import { useMemo } from 'react';
import type { CandidatePortfolio } from '../types/quantum';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ScatterChart } from 'lucide-react';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface RiskReturnLandscapeProps {
  candidates: CandidatePortfolio[];
}

export const RiskReturnLandscape: React.FC<RiskReturnLandscapeProps> = ({ candidates }) => {
  const chartData = useMemo(() => {
    // Valid candidate portfolios (matching constraint size or general candidate space)
    const validCandidates = candidates.filter(c => c.isValid);
    const otherCandidates = candidates.filter(c => !c.isValid);

    const qaoaOptimal = candidates.find(c => c.isQAOAOptimal);
    const classicalOptimal = candidates.find(c => c.isClassicalOptimal);

    return {
      datasets: [
        {
          label: 'QAOA Optimal Portfolio',
          data: qaoaOptimal ? [{ x: qaoaOptimal.riskVal * 100, y: qaoaOptimal.returnVal * 100, portfolio: qaoaOptimal }] : [],
          backgroundColor: '#ff6b7d',
          borderColor: '#fffdf7',
          borderWidth: 2,
          pointRadius: 9,
          pointHoverRadius: 13,
        },
        {
          label: 'Classical Exact Optimal',
          data: classicalOptimal ? [{ x: classicalOptimal.riskVal * 100, y: classicalOptimal.returnVal * 100, portfolio: classicalOptimal }] : [],
          backgroundColor: '#d45266',
          borderColor: '#fffdf7',
          borderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 10,
        },
        {
          label: 'Valid K-Asset Candidate Portfolios',
          data: validCandidates.map(c => ({ x: c.riskVal * 100, y: c.returnVal * 100, portfolio: c })),
          backgroundColor: 'rgba(212, 82, 102, 0.55)',
          borderColor: 'rgba(255, 107, 125, 0.9)',
          borderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 8,
        },
        {
          label: 'Other Combinations',
          data: otherCandidates.map(c => ({ x: c.riskVal * 100, y: c.returnVal * 100, portfolio: c })),
          backgroundColor: 'rgba(244, 234, 218, 0.15)',
          borderColor: 'rgba(244, 234, 218, 0.25)',
          borderWidth: 1,
          pointRadius: 3,
          pointHoverRadius: 5,
        }
      ]
    };
  }, [candidates]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#f4eada',
          font: { family: 'JetBrains Mono', size: 11 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(36, 5, 14, 0.95)',
        borderColor: 'rgba(212, 82, 102, 0.6)',
        borderWidth: 1,
        titleColor: '#ff6b7d',
        bodyColor: '#fffdf7',
        titleFont: { family: 'JetBrains Mono' },
        bodyFont: { family: 'JetBrains Mono' },
        callbacks: {
          label: (context: any) => {
            const point = context.raw;
            if (!point || !point.portfolio) return '';
            const p: CandidatePortfolio = point.portfolio;
            return [
              `Assets: [${p.selectedSymbols.join(', ')}]`,
              `Expected Return: ${(p.returnVal * 100).toFixed(2)}%`,
              `Volatility (Risk): ${(p.riskVal * 100).toFixed(2)}%`,
              `Sharpe Ratio: ${p.sharpeRatio.toFixed(2)}`,
              `QUBO Cost: ${p.cost.toFixed(2)}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(212, 82, 102, 0.15)' },
        ticks: { color: '#f4eada', font: { family: 'JetBrains Mono', size: 10 } },
        title: {
          display: true,
          text: 'Portfolio Risk / Volatility σₚ (%)',
          color: '#f4eada',
          font: { family: 'JetBrains Mono', size: 11 }
        }
      },
      y: {
        grid: { color: 'rgba(212, 82, 102, 0.15)' },
        ticks: { color: '#f4eada', font: { family: 'JetBrains Mono', size: 10 } },
        title: {
          display: true,
          text: 'Expected Portfolio Return Rₚ (%)',
          color: '#f4eada',
          font: { family: 'JetBrains Mono', size: 11 }
        }
      }
    }
  };

  return (
    <section id="landscape" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 11 — Solution Space Analysis</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515]">Risk–Return Landscape & Efficient Frontier</h2>
          <p className="text-[#5C0820] max-w-3xl leading-relaxed text-sm font-medium">
            Scatter plot visualization of candidate portfolios across the Risk–Return space, highlighting QAOA quantum optimization vs the classical ground truth.
          </p>
        </div>

        {/* Scatter Plot Container */}
        <div className="glass-card p-6 border border-[#d45266]/40 bg-[#24050e] space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#d45266]/30 text-xs font-mono text-[#f4eada]">
            <span className="flex items-center gap-2 text-[#ff6b7d] font-bold">
              <ScatterChart className="w-4 h-4" />
              Candidate Portfolios Risk-Return Space (256 Total State Combinations)
            </span>
            <span className="text-[#f4eada]/70">Hover points for detailed allocation metrics</span>
          </div>

          <div className="h-[420px] w-full">
            <Scatter data={chartData} options={options} />
          </div>
        </div>

      </div>
    </section>
  );
};
