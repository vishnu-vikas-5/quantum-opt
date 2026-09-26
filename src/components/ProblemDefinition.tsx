import React from 'react';
import { MathFormula } from './MathFormula';
import { ArrowRight, PieChart, TrendingUp, ShieldAlert, Award, FileText } from 'lucide-react';

export const ProblemDefinition: React.FC = () => {
  const steps = [
    { label: 'Financial Assets', desc: 'AAPL, MSFT, NVDA, JPM...', icon: PieChart, color: 'text-cyan-400' },
    { label: 'Asset Returns (μ)', desc: 'Historical vector', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Covariance Matrix (Σ)', desc: 'Pairwise risks', icon: ShieldAlert, color: 'text-amber-400' },
    { label: 'QUBO Matrix (Q)', desc: 'Penalty formulation', icon: FileText, color: 'text-purple-400' },
    { label: 'QAOA Circuit', desc: 'Cost & Mixer gates', icon: Award, color: 'text-blue-400' },
    { label: 'Optimal Portfolio', desc: 'Max Sharpe Ratio', icon: Award, color: 'text-cyan-300' }
  ];

  return (
    <section id="problem" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 02 — Mathematical Model</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515]">The Portfolio Optimization Problem</h2>
          <p className="text-[#5C0820] max-w-3xl leading-relaxed">
            Given a collection of financial assets, the objective is to select an optimal portfolio that balances expected return and risk.
          </p>
        </div>

        {/* Math Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Portfolio Return */}
          <div className="glass-card p-6 border border-cyan-500/20 hover:border-cyan-400/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Objective 1</span>
              <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400"><TrendingUp className="w-4 h-4" /></span>
            </div>
            <h3 className="text-lg font-bold text-white">Portfolio Expected Return</h3>
            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
              <MathFormula math="R_p = \mu^T w = \sum_{i=1}^N \mu_i w_i" displayMode />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Weighted linear sum of individual expected asset returns <MathFormula math="\mu_i" />.
            </p>
          </div>

          {/* Card 2: Portfolio Risk */}
          <div className="glass-card p-6 border border-blue-500/20 hover:border-blue-400/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">Objective 2</span>
              <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><ShieldAlert className="w-4 h-4" /></span>
            </div>
            <h3 className="text-lg font-bold text-white">Portfolio Risk (Variance)</h3>
            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
              <MathFormula math="\sigma_p^2 = w^T \Sigma w = \sum_{i,j} w_i w_j \Sigma_{ij}" displayMode />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quadratic form capturing individual asset variances and pairwise covariances <MathFormula math="\Sigma_{ij}" />.
            </p>
          </div>

          {/* Card 3: Sharpe Ratio */}
          <div className="glass-card p-6 border border-emerald-500/20 hover:border-emerald-400/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Evaluation Metric</span>
              <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><Award className="w-4 h-4" /></span>
            </div>
            <h3 className="text-lg font-bold text-white">Sharpe Ratio Evaluation</h3>
            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
              <MathFormula math="S = \frac{R_p - R_f}{\sigma_p}" displayMode />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Measures excess return earned per unit of risk above the risk-free rate <MathFormula math="R_f" />.
            </p>
          </div>

        </div>

        {/* Variables Glossary Table */}
        <div className="glass-card p-6 border border-slate-800">
          <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-4">Mathematical Notation & Variable Definitions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold"><MathFormula math="\mu" /></div>
              <div className="text-slate-400">Expected asset returns vector</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold"><MathFormula math="w" /></div>
              <div className="text-slate-400">Portfolio weights allocation</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold"><MathFormula math="\Sigma" /></div>
              <div className="text-slate-400">Asset covariance matrix</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold"><MathFormula math="R_f" /></div>
              <div className="text-slate-400">Risk-free interest rate</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold"><MathFormula math="\sigma_p" /></div>
              <div className="text-slate-400">Portfolio total volatility</div>
            </div>
          </div>
        </div>

        {/* Visual Workflow Diagram */}
        <div className="glass-card p-6 border border-cyan-500/20">
          <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-6 text-center">
            End-to-End Quantum Optimization Pipeline Diagram
          </h3>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={idx}>
                  <div className="flex-1 min-w-[140px] glass-card p-4 text-center border border-slate-800 hover:border-cyan-500/40 transition-all">
                    <div className={`inline-flex p-2 rounded-lg bg-slate-900 mb-2 ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-white text-xs">{step.label}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{step.desc}</div>
                  </div>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-cyan-500/50 hidden md:block shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
