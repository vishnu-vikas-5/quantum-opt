import { Play, BookOpen, Cpu, ShieldCheck, Scale, Binary } from 'lucide-react';

interface HeroProps {
  onRunSimulation: () => void;
  onExploreMethodology: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRunSimulation, onExploreMethodology }) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d45266]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-[#7c0b2b]/25 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24050e] border border-[#d45266]/40 text-[#f4eada] text-xs font-mono uppercase tracking-wider shadow-lg shadow-[#7c0b2b]/40">
            <span className="w-2 h-2 rounded-full bg-[#d45266] animate-ping" />
            Quantum Computing Capstone Project Prototype
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#3D0515] tracking-tight leading-tight">
            Maximize Returns.{' '}
            <span className="gradient-dark-text text-glow">Minimize Risk.</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl font-bold text-[#7C0B2B] font-mono tracking-wide">
            Portfolio Optimization Using QAOA
          </h2>

          <p className="text-base sm:text-lg text-[#5C0820] max-w-3xl mx-auto leading-relaxed pt-2">
            An experimental quantum optimization platform that formulates portfolio selection as a{' '}
            <span className="text-[#7C0B2B] font-semibold underline decoration-[#D45266] underline-offset-4">
              QUBO problem
            </span>{' '}
            and solves it using the{' '}
            <span className="text-[#7C0B2B] font-semibold underline decoration-[#D45266] underline-offset-4">
              Quantum Approximate Optimization Algorithm
            </span>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <button
              onClick={onRunSimulation}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d45266] to-[#7c0b2b] hover:from-[#e86070] hover:to-[#961036] text-[#fffdf7] font-bold text-sm sm:text-base shadow-xl shadow-[#d45266]/30 transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-current text-[#fffdf7]" />
              Run QAOA Experiment
            </button>

            <button
              onClick={onExploreMethodology}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#24050e] hover:bg-[#380816] text-[#f4eada] border border-[#d45266]/40 font-medium text-sm sm:text-base shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <BookOpen className="w-5 h-5 text-[#d45266]" />
              Explore Methodology
            </button>
          </div>
        </div>

        {/* Hero Visual: Animated Abstract Quantum Circuit Canvas/SVG */}
        <div className="mt-12 max-w-5xl mx-auto glass-card p-6 sm:p-8 border border-[#d45266]/40 relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#3d0817] text-xs font-mono text-[#cdaea0]">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#d45266] animate-pulse" />
              <span className="text-[#fffdf7] font-semibold">Parametric QAOA Circuit Ansatz (p = 2 Depth)</span>
            </div>
            <span className="text-[#f4eada]">8 Qubit Hilbert Space (2⁸ = 256 States)</span>
          </div>

          {/* Circuit Canvas Visual */}
          <div className="overflow-x-auto">
            <div className="min-w-[700px] space-y-4 font-mono text-xs select-none">
              
              {/* Qubit Line 0 */}
              <div className="flex items-center gap-2">
                <span className="w-12 text-[#f4eada] font-bold text-right">|q₀⟩</span>
                <span className="text-[#8c6759]">─</span>
                <span className="quantum-gate gate-h">H</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rz">RZ(γ₁)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rx">RX(β₁)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-cnot">●</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rz">RZ(γ₂)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rx">RX(β₂)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="px-2 py-1 rounded bg-[#24050e] border border-[#d45266]/40 text-[#f4eada]">Measure</span>
              </div>

              {/* Qubit Line 1 */}
              <div className="flex items-center gap-2">
                <span className="w-12 text-[#f4eada] font-bold text-right">|q₁⟩</span>
                <span className="text-[#8c6759]">─</span>
                <span className="quantum-gate gate-h">H</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rz">RZ(γ₁)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rx">RX(β₁)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-cnot">┼</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rz">RZ(γ₂)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rx">RX(β₂)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="px-2 py-1 rounded bg-[#24050e] border border-[#d45266]/40 text-[#f4eada]">Measure</span>
              </div>

              {/* Qubit Line 2 */}
              <div className="flex items-center gap-2">
                <span className="w-12 text-[#f4eada] font-bold text-right">|q₂⟩</span>
                <span className="text-[#8c6759]">─</span>
                <span className="quantum-gate gate-h">H</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rz">RZ(γ₁)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rx">RX(β₁)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-cnot">X</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rz">RZ(γ₂)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rx">RX(β₂)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="px-2 py-1 rounded bg-[#24050e] border border-[#d45266]/40 text-[#f4eada]">Measure</span>
              </div>

              {/* Ellipsis indicator */}
              <div className="flex items-center gap-2 pl-14 text-[#8c6759]">
                <span>⋮</span>
                <span className="pl-6 text-[#cdaea0] italic text-[11px]">8 Parallel Asset Qubits (AAPL, MSFT, NVDA, AMZN, GOOGL, META, TSLA, JPM)</span>
              </div>
            </div>
          </div>

          {/* Animated Quantum Particles */}
          <div className="absolute top-4 right-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d45266] animate-particle" />
            <span className="w-2 h-2 rounded-full bg-[#f4eada] animate-particle" style={{ animationDelay: '0.6s' }} />
            <span className="w-2 h-2 rounded-full bg-[#7c0b2b] animate-particle" style={{ animationDelay: '1.2s' }} />
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="glass-card p-4 border border-[#d45266]/30 text-center hover:border-[#d45266]/60 transition-all">
            <div className="inline-flex p-2 rounded-lg bg-[#d45266]/15 text-[#f4eada] mb-2">
              <Cpu className="w-5 h-5 text-[#d45266]" />
            </div>
            <h3 className="text-lg font-bold text-[#fffdf7] font-mono">QAOA</h3>
            <p className="text-xs text-[#cdaea0]">Quantum Optimization</p>
          </div>

          <div className="glass-card p-4 border border-[#d45266]/30 text-center hover:border-[#d45266]/60 transition-all">
            <div className="inline-flex p-2 rounded-lg bg-[#d45266]/15 text-[#f4eada] mb-2">
              <Binary className="w-5 h-5 text-[#d45266]" />
            </div>
            <h3 className="text-lg font-bold text-[#fffdf7] font-mono">QUBO</h3>
            <p className="text-xs text-[#cdaea0]">Portfolio Formulation</p>
          </div>

          <div className="glass-card p-4 border border-[#d45266]/30 text-center hover:border-[#d45266]/60 transition-all">
            <div className="inline-flex p-2 rounded-lg bg-[#d45266]/15 text-[#f4eada] mb-2">
              <ShieldCheck className="w-5 h-5 text-[#d45266]" />
            </div>
            <h3 className="text-lg font-bold text-[#fffdf7] font-mono">Sharpe Ratio</h3>
            <p className="text-xs text-[#cdaea0]">Risk-Adjusted Evaluation</p>
          </div>

          <div className="glass-card p-4 border border-[#d45266]/30 text-center hover:border-[#d45266]/60 transition-all">
            <div className="inline-flex p-2 rounded-lg bg-[#d45266]/15 text-[#f4eada] mb-2">
              <Scale className="w-5 h-5 text-[#d45266]" />
            </div>
            <h3 className="text-lg font-bold text-[#fffdf7] font-mono">Classical vs Quantum</h3>
            <p className="text-xs text-[#cdaea0]">Benchmarking</p>
          </div>
        </div>

      </div>
    </section>
  );
};
