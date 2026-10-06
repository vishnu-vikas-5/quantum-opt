import { useState, useMemo } from 'react';
import type { Asset } from '../types/quantum';
import { buildCovarianceMatrix, solveClassicalBruteForce } from '../utils/quantumEngine';
import { MathFormula } from './MathFormula';
import { Line } from 'react-chartjs-2';
import { FlaskConical } from 'lucide-react';

interface ParameterExperimentProps {
  assets: Asset[];
}

export const ParameterExperiment: React.FC<ParameterExperimentProps> = ({ assets }) => {
  const [lambda, setLambda] = useState<number>(0.5);
  const [kSize, setKSize] = useState<number>(4);
  const [depthP, setDepthP] = useState<number>(2);

  const cov = useMemo(() => buildCovarianceMatrix(assets), [assets]);

  // Compute live solution for current experiment parameters
  const currentSolution = useMemo(() => {
    return solveClassicalBruteForce(assets, cov, lambda, kSize, 10.0, 0.035);
  }, [assets, cov, lambda, kSize]);

  // Compute Risk-Return Tradeoff curve across lambda values 0.0 to 1.0
  const tradeoffCurve = useMemo(() => {
    const lambdas = [0.0, 0.15, 0.30, 0.45, 0.60, 0.75, 0.90, 1.0];
    return lambdas.map(l => {
      const sol = solveClassicalBruteForce(assets, cov, l, kSize, 10.0, 0.035);
      return {
        lambda: l,
        returnVal: sol.returnVal * 100,
        riskVal: sol.riskVal * 100,
        sharpe: sol.sharpeRatio
      };
    });
  }, [assets, cov, kSize]);

  const chartData = {
    labels: tradeoffCurve.map(t => `λ = ${t.lambda.toFixed(2)}`),
    datasets: [
      {
        label: 'Expected Return Rₚ (%)',
        data: tradeoffCurve.map(t => t.returnVal),
        borderColor: '#ff6b7d',
        backgroundColor: '#ff6b7d',
        yAxisID: 'y'
      },
      {
        label: 'Portfolio Risk σₚ (%)',
        data: tradeoffCurve.map(t => t.riskVal),
        borderColor: '#f4eada',
        backgroundColor: '#f4eada',
        yAxisID: 'y'
      },
      {
        label: 'Sharpe Ratio',
        data: tradeoffCurve.map(t => t.sharpe),
        borderColor: '#d45266',
        backgroundColor: '#d45266',
        borderDash: [5, 5],
        yAxisID: 'y1'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#f4eada', font: { family: 'JetBrains Mono', size: 11 } }
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
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: { color: 'rgba(212, 82, 102, 0.15)' },
        ticks: { color: '#ff6b7d', font: { family: 'JetBrains Mono', size: 10 } },
        title: { display: true, text: 'Return / Risk (%)', color: '#f4eada', font: { family: 'JetBrains Mono' } }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: { color: '#f4eada', font: { family: 'JetBrains Mono', size: 10 } },
        title: { display: true, text: 'Sharpe Ratio', color: '#f4eada', font: { family: 'JetBrains Mono' } }
      }
    }
  };

  return (
    <section id="experiment" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 14 — Interactive Laboratory</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515]">Parameter Experimentation Workbench</h2>
          <p className="text-[#5C0820] max-w-3xl leading-relaxed text-sm font-medium">
            Experiment with objective weights <MathFormula math="\lambda" />, portfolio cardinality <MathFormula math="K" />, and circuit depth <MathFormula math="p" /> to analyze the Risk–Return tradeoff curve.
          </p>
        </div>

        {/* Live Controls Grid */}
        <div className="glass-card p-6 border border-[#d45266]/40 bg-[#24050e] space-y-6">
          <div className="flex items-center gap-2 text-[#ff6b7d] font-bold font-mono text-xs uppercase tracking-wider">
            <FlaskConical className="w-4 h-4" />
            Live Sensitivity Parameter Sliders
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Slider 1: Risk Aversion lambda */}
            <div className="space-y-2 p-4 rounded-xl bg-[#140307] border border-[#d45266]/30">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f4eada]/70">Risk Aversion λ:</span>
                <span className="text-[#ff6b7d] font-bold">{lambda.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={lambda}
                onChange={(e) => setLambda(parseFloat(e.target.value))}
                className="w-full accent-[#ff6b7d] cursor-pointer"
              />
            </div>

            {/* Slider 2: Portfolio Size K */}
            <div className="space-y-2 p-4 rounded-xl bg-[#140307] border border-[#d45266]/30">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f4eada]/70">Target Size K:</span>
                <span className="text-[#f4eada] font-bold">{kSize} Assets</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={kSize}
                onChange={(e) => setKSize(parseInt(e.target.value, 10))}
                className="w-full accent-[#ff6b7d] cursor-pointer"
              />
            </div>

            {/* Selector 3: QAOA Depth p */}
            <div className="space-y-2 p-4 rounded-xl bg-[#140307] border border-[#d45266]/30">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f4eada]/70">QAOA Depth p:</span>
                <span className="text-[#ff6b7d] font-bold">p = {depthP}</span>
              </div>
              <select
                value={depthP}
                onChange={(e) => setDepthP(parseInt(e.target.value, 10))}
                className="w-full px-2 py-1 rounded bg-[#24050e] text-[#ff6b7d] font-mono text-xs border border-[#d45266]/40 outline-none font-bold"
              >
                <option value={1}>p = 1 Layer</option>
                <option value={2}>p = 2 Layers</option>
                <option value={3}>p = 3 Layers</option>
              </select>
            </div>

          </div>

          {/* Live Outcome Metrics Card */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-4 border-t border-[#d45266]/30 font-mono text-xs">
            <div className="p-3 rounded-lg bg-[#140307] border border-[#d45266]/30">
              <span className="text-[#f4eada]/60 block text-[10px]">Selected Portfolio</span>
              <span className="text-[#fffdf7] font-bold">
                {currentSolution.selectedAssets.map(a => a.symbol).join(', ')}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#140307] border border-[#d45266]/30">
              <span className="text-[#f4eada]/60 block text-[10px]">Expected Return</span>
              <span className="text-[#ff6b7d] font-bold">
                +{(currentSolution.returnVal * 100).toFixed(2)}%
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#140307] border border-[#d45266]/30">
              <span className="text-[#f4eada]/60 block text-[10px]">Volatility (Risk)</span>
              <span className="text-[#f4eada] font-bold">
                {(currentSolution.riskVal * 100).toFixed(2)}%
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#7c0b2b]/40 border border-[#d45266]">
              <span className="text-[#ff6b7d] block text-[10px] font-bold">Sharpe Ratio</span>
              <span className="text-[#ff6b7d] font-extrabold text-sm">
                {currentSolution.sharpeRatio.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Sensitivity Tradeoff Chart */}
        <div className="glass-card p-6 border border-[#d45266]/40 bg-[#24050e]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#d45266]/30 text-xs font-mono text-[#f4eada]/70">
            <span className="text-[#ff6b7d] font-bold">
              Risk–Return Tradeoff Sensitivity Curve across λ ∈ [0.0, 1.0]
            </span>
            <span className="text-[#f4eada]">Target Size K = {kSize}</span>
          </div>

          <div className="h-72 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

      </div>
    </section>
  );
};
