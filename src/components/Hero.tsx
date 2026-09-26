import { Play, BookOpen, Cpu, ShieldCheck, Scale, Binary } from 'lucide-react';

interface HeroProps {
  onRunSimulation: () => void;
  onExploreMethodology: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRunSimulation, onExploreMethodology }) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-950/50">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Quantum Computing Capstone Project Prototype
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Maximize Returns.{' '}
            <span className="gradient-text text-glow">Minimize Risk.</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl font-medium text-cyan-400 font-mono tracking-wide">
            Portfolio Optimization Using QAOA
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed pt-2">
            An experimental quantum optimization platform that formulates portfolio selection as a{' '}
            <span className="text-cyan-300 font-semibold underline decoration-cyan-500/50 underline-offset-4">
              QUBO problem
            </span>{' '}
            and solves it using the{' '}
            <span className="text-cyan-300 font-semibold underline decoration-cyan-500/50 underline-offset-4">
              Quantum Approximate Optimization Algorithm
            </span>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <button
              onClick={onRunSimulation}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              Run QAOA Experiment
            </button>

            <button
              onClick={onExploreMethodology}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 font-medium text-sm sm:text-base shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Explore Methodology
            </button>
          </div>
        </div>

        {/* Hero Visual: Animated Abstract Quantum Circuit Canvas/SVG */}
        <div className="mt-12 max-w-5xl mx-auto glass-card p-6 sm:p-8 border border-cyan-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-white font-semibold">Parametric QAOA Circuit Ansatz (p = 2 Depth)</span>
            </div>
            <span className="text-cyan-400">8 Qubit Hilbert Space (2⁸ = 256 States)</span>
          </div>

          {/* Circuit Canvas Visual */}
          <div className="overflow-x-auto">
            <div className="min-w-[700px] space-y-4 font-mono text-xs select-none">
              
              {/* Qubit Line 0 */}
              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-400 font-bold text-right">|q₀⟩</span>
                <span className="text-slate-600">─</span>
                <span className="quantum-gate gate-h">H</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rz">RZ(γ₁)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rx">RX(β₁)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-cnot">●</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rz">RZ(γ₂)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rx">RX(β₂)</span>
                <span className="text-slate-600">──</span>
                <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300">Measure</span>
              </div>

              {/* Qubit Line 1 */}
              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-400 font-bold text-right">|q₁⟩</span>
                <span className="text-slate-600">─</span>
                <span className="quantum-gate gate-h">H</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rz">RZ(γ₁)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rx">RX(β₁)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-cnot">┼</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rz">RZ(γ₂)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rx">RX(β₂)</span>
                <span className="text-slate-600">──</span>
                <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300">Measure</span>
              </div>

              {/* Qubit Line 2 */}
              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-400 font-bold text-right">|q₂⟩</span>
                <span className="text-slate-600">─</span>
                <span className="quantum-gate gate-h">H</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rz">RZ(γ₁)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rx">RX(β₁)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-cnot">X</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rz">RZ(γ₂)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rx">RX(β₂)</span>
                <span className="text-slate-600">──</span>
                <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300">Measure</span>
              </div>

              {/* Ellipsis indicator */}
              <div className="flex items-center gap-2 pl-14 text-slate-600">
                <span>⋮</span>
                <span className="pl-6 text-slate-500 italic text-[11px]">8 Parallel Asset Qubits (AAPL, MSFT, NVDA, AMZN, GOOGL, META, TSLA, JPM)</span>
              </div>
            </div>
          </div>

          {/* Animated Quantum Particles */}
          <div className="absolute top-4 right-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-particle" />
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-particle" style={{ animationDelay: '0.6s' }} />
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-particle" style={{ animationDelay: '1.2s' }} />
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="glass-card p-4 border border-cyan-500/20 text-center hover:border-cyan-400/40 transition-all">
            <div className="inline-flex p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mb-2">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">QAOA</h3>
            <p className="text-xs text-slate-400">Quantum Optimization</p>
          </div>

          <div className="glass-card p-4 border border-blue-500/20 text-center hover:border-blue-400/40 transition-all">
            <div className="inline-flex p-2 rounded-lg bg-blue-500/10 text-blue-400 mb-2">
              <Binary className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">QUBO</h3>
            <p className="text-xs text-slate-400">Portfolio Formulation</p>
          </div>

          <div className="glass-card p-4 border border-indigo-500/20 text-center hover:border-indigo-400/40 transition-all">
            <div className="inline-flex p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">Sharpe Ratio</h3>
            <p className="text-xs text-slate-400">Risk-Adjusted Evaluation</p>
          </div>

          <div className="glass-card p-4 border border-emerald-500/20 text-center hover:border-emerald-400/40 transition-all">
            <div className="inline-flex p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mb-2">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">Classical vs Quantum</h3>
            <p className="text-xs text-slate-400">Benchmarking</p>
          </div>
        </div>

      </div>
    </section>
  );
};
