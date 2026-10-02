import type { QAOAConfig, QAOAResult } from '../types/quantum';
import { MathFormula } from './MathFormula';
import { Cpu, Play, Sliders, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface QAOAExperimentProps {
  config: QAOAConfig;
  onConfigChange: (newConfig: Partial<QAOAConfig>) => void;
  onRunQAOA: () => void;
  isRunning: boolean;
  activeStep: number;
  qaoaResult: QAOAResult | null;
}

export const QAOAExperiment: React.FC<QAOAExperimentProps> = ({
  config,
  onConfigChange,
  onRunQAOA,
  isRunning,
  activeStep,
  qaoaResult
}) => {
  const steps = [
    'Initializing quantum state |+⟩ⁿ...',
    'Applying cost Hamiltonian U(H_C, γ)...',
    'Applying mixer Hamiltonian U(H_B, β)...',
    'Optimizing parameters (COBYLA)...',
    'Measuring quantum states (1000 shots)...',
    'Optimal portfolio synthesized!'
  ];

  // Parametric angle controls
  const handleGammaChange = (index: number, val: number) => {
    const updated = [...(config.gamma.length ? config.gamma : Array(config.depth).fill(0.35))];
    updated[index] = val;
    onConfigChange({ gamma: updated });
  };

  const handleBetaChange = (index: number, val: number) => {
    const updated = [...(config.beta.length ? config.beta : Array(config.depth).fill(0.25))];
    updated[index] = val;
    onConfigChange({ beta: updated });
  };

  return (
    <section id="qaoa" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header & Simulator Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="badge-quantum">Section 07 — Variational Quantum Circuit</div>
            <h2 className="text-3xl font-extrabold text-[#3D0515]">QAOA Experiment Execution</h2>
            <p className="text-[#5C0820] max-w-2xl leading-relaxed text-sm">
              Execute parameterized quantum circuit layers <MathFormula math="|\gamma, \beta\rangle = \prod_{k=1}^p U(H_B, \beta_k) U(H_C, \gamma_k) |+\rangle^{\otimes N}" /> to find ground state.
            </p>
          </div>

          {/* Prototype Simulator Disclaimer Label */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#24050e] border border-[#d45266]/40 text-[#f4eada] text-xs font-mono">
            <AlertCircle className="w-4 h-4 text-[#ff6b7d] shrink-0" />
            <div>
              <strong className="text-white">QAOA Simulator / Demonstration</strong> — Frontend statevector & shot simulation.
            </div>
          </div>
        </div>

        {/* Experiment Configuration & Parameter Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Circuit System Specifications */}
          <div className="glass-card p-6 border border-[#d45266]/40 space-y-4">
            <h3 className="text-sm font-mono text-[#ff6b7d] uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Circuit Specifications
            </h3>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#24050e] border border-[#d45266]/30 flex justify-between items-center">
                <span className="text-[#cdaea0]">QAOA Depth (p):</span>
                <span className="px-2 py-0.5 rounded bg-[#d45266]/20 text-[#ff6b7d] font-bold border border-[#d45266]/40">
                  p = {config.depth}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#24050e] border border-[#d45266]/30 flex justify-between items-center">
                <span className="text-[#cdaea0]">Qubits (N):</span>
                <span className="px-2 py-0.5 rounded bg-[#d45266]/20 text-[#f4eada] font-bold border border-[#d45266]/40">
                  8 Qubits
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#24050e] border border-[#d45266]/30 flex justify-between items-center">
                <span className="text-[#cdaea0]">Hilbert State Space:</span>
                <span className="text-white font-bold">2⁸ = 256 States</span>
              </div>

              <div className="p-3 rounded-lg bg-[#24050e] border border-[#d45266]/30 flex justify-between items-center">
                <span className="text-[#cdaea0]">Shots Count:</span>
                <span className="text-emerald-400 font-bold">{config.shots || 1000} Shots</span>
              </div>

              {qaoaResult && (
                <div className="p-3 rounded-lg bg-[#24050e] border border-[#d45266]/40 text-center">
                  <span className="text-[#ff6b7d] text-[10px] block uppercase">Last Execution Result</span>
                  <span className="text-white font-bold">Cost: {qaoaResult.finalCost.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Parameter Angles Controls gamma & beta */}
          <div className="lg:col-span-2 glass-card p-6 border border-[#d45266]/40 space-y-4">
            <h3 className="text-sm font-mono text-[#ff6b7d] uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              Variational Angles Control (γ, β)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: config.depth }).map((_, idx) => {
                const gammaVal = config.gamma[idx] ?? 0.35;
                const betaVal = config.beta[idx] ?? 0.25;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-[#24050e] border border-[#d45266]/30 space-y-3">
                    <div className="text-xs font-mono text-[#ff6b7d] font-bold border-b border-[#3d0817] pb-2">
                      QAOA Layer {idx + 1} Parameters
                    </div>

                    {/* Cost Angle gamma */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#cdaea0]">Cost Angle γ_{idx + 1}:</span>
                        <span className="text-[#f4eada] font-bold">{gammaVal.toFixed(2)} rad</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="3.14"
                        step="0.02"
                        value={gammaVal}
                        onChange={(e) => handleGammaChange(idx, parseFloat(e.target.value))}
                        className="w-full accent-[#d45266] cursor-pointer"
                      />
                    </div>

                    {/* Mixer Angle beta */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#cdaea0]">Mixer Angle β_{idx + 1}:</span>
                        <span className="text-[#f4eada] font-bold">{betaVal.toFixed(2)} rad</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1.57"
                        step="0.02"
                        value={betaVal}
                        onChange={(e) => handleBetaChange(idx, parseFloat(e.target.value))}
                        className="w-full accent-[#ff6b7d] cursor-pointer"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Polished Visual Quantum Circuit Board */}
        <div className="glass-card p-6 border border-[#d45266]/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-[#ff6b7d] uppercase tracking-wider">
              Parametric Quantum Circuit Schematic
            </h3>
            <span className="text-xs font-mono text-[#cdaea0]">
              Alternating Problem Unitary U(H_C, γ) and Mixer Unitary U(H_B, β)
            </span>
          </div>

          {/* Interactive Circuit Canvas */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px] p-4 bg-[#24050e] rounded-xl border border-[#d45266]/30 space-y-4 font-mono text-xs select-none">
              
              <div className="flex items-center gap-2">
                <span className="w-14 text-[#f4eada] font-bold text-right">|q₀⟩</span>
                <span className="text-[#8c6759]">─</span>
                <span className="quantum-gate gate-h">H</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rz">RZ(2γ₁)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rx">RX(2β₁)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-cnot">●</span>
                <span className="text-[#8c6759]">──</span>
                {config.depth >= 2 && (
                  <>
                    <span className="quantum-gate gate-rz">RZ(2γ₂)</span>
                    <span className="text-[#8c6759]">──</span>
                    <span className="quantum-gate gate-rx">RX(2β₂)</span>
                    <span className="text-[#8c6759]">──</span>
                  </>
                )}
                <span className="px-2.5 py-1 rounded bg-[#24050e] border border-[#d45266]/50 text-[#ff6b7d] font-bold">
                  [M]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-14 text-[#f4eada] font-bold text-right">|q₁⟩</span>
                <span className="text-[#8c6759]">─</span>
                <span className="quantum-gate gate-h">H</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rz">RZ(2γ₁)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rx">RX(2β₁)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-cnot">┼</span>
                <span className="text-[#8c6759]">──</span>
                {config.depth >= 2 && (
                  <>
                    <span className="quantum-gate gate-rz">RZ(2γ₂)</span>
                    <span className="text-[#8c6759]">──</span>
                    <span className="quantum-gate gate-rx">RX(2β₂)</span>
                    <span className="text-[#8c6759]">──</span>
                  </>
                )}
                <span className="px-2.5 py-1 rounded bg-[#24050e] border border-[#d45266]/50 text-[#ff6b7d] font-bold">
                  [M]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-14 text-[#f4eada] font-bold text-right">|q₂⟩</span>
                <span className="text-[#8c6759]">─</span>
                <span className="quantum-gate gate-h">H</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rz">RZ(2γ₁)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-rx">RX(2β₁)</span>
                <span className="text-[#8c6759]">──</span>
                <span className="quantum-gate gate-cnot">X</span>
                <span className="text-[#8c6759]">──</span>
                {config.depth >= 2 && (
                  <>
                    <span className="quantum-gate gate-rz">RZ(2γ₂)</span>
                    <span className="text-[#8c6759]">──</span>
                    <span className="quantum-gate gate-rx">RX(2β₂)</span>
                    <span className="text-[#8c6759]">──</span>
                  </>
                )}
                <span className="px-2.5 py-1 rounded bg-[#24050e] border border-[#d45266]/50 text-[#ff6b7d] font-bold">
                  [M]
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Action Button: Run QAOA */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onRunQAOA}
            disabled={isRunning}
            className="flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-[#d45266] to-[#7c0b2b] hover:from-[#e86070] hover:to-[#961036] text-[#fffdf7] font-extrabold text-lg shadow-2xl shadow-[#d45266]/40 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin text-white" />
                <span>Simulating QAOA Circuit...</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-current text-white" />
                <span>Run QAOA Experiment</span>
              </>
            )}
          </button>
        </div>

        {/* Execution Step Progress Modal Overlay / Card */}
        {isRunning && (
          <div className="glass-card p-6 border border-[#d45266]/50 bg-[#24050e] space-y-4 animate-fade-in shadow-2xl shadow-[#7c0b2b]/40">
            <div className="flex items-center gap-3 border-b border-[#3d0817] pb-3">
              <Loader2 className="w-5 h-5 text-[#ff6b7d] animate-spin" />
              <h3 className="font-bold text-white text-base">Quantum Circuit Simulator Execution in Progress</h3>
            </div>
            
            <div className="space-y-2">
              {steps.slice(0, 5).map((stepText, idx) => {
                const isComplete = activeStep > idx;
                const isCurrent = activeStep === idx;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-lg font-mono text-xs transition-all ${
                      isComplete
                        ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                        : isCurrent
                        ? 'bg-[#380816] border border-[#d45266]/60 text-[#ff6b7d] animate-pulse'
                        : 'bg-[#140307] text-[#cdaea0] border border-[#3d0817]'
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-[#ff6b7d] animate-spin shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-[#3d0817] block shrink-0" />
                    )}
                    <span>{stepText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

