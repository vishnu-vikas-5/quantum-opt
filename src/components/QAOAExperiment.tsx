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
    <section id="qaoa" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header & Simulator Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="badge-quantum">Section 07 — Variational Quantum Circuit</div>
            <h2 className="text-3xl font-extrabold text-white">QAOA Experiment Execution</h2>
            <p className="text-slate-300 max-w-2xl leading-relaxed text-sm">
              Execute parameterized quantum circuit layers <MathFormula math="|\gamma, \beta\rangle = \prod_{k=1}^p U(H_B, \beta_k) U(H_C, \gamma_k) |+\rangle^{\otimes N}" /> to find ground state.
            </p>
          </div>

          {/* Prototype Simulator Disclaimer Label */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <strong className="text-white">QAOA Simulator / Demonstration</strong> — Frontend statevector & shot simulation.
            </div>
          </div>
        </div>

        {/* Experiment Configuration & Parameter Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Circuit System Specifications */}
          <div className="glass-card p-6 border border-cyan-500/20 space-y-4">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Circuit Specifications
            </h3>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">QAOA Depth (p):</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  p = {config.depth}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Qubits (N):</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                  8 Qubits
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Hilbert State Space:</span>
                <span className="text-white font-bold">2⁸ = 256 States</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Shots Count:</span>
                <span className="text-emerald-300 font-bold">{config.shots || 1000} Shots</span>
              </div>

              {qaoaResult && (
                <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-center">
                  <span className="text-cyan-400 text-[10px] block uppercase">Last Execution Result</span>
                  <span className="text-white font-bold">Cost: {qaoaResult.finalCost.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Parameter Angles Controls gamma & beta */}
          <div className="lg:col-span-2 glass-card p-6 border border-indigo-500/20 space-y-4">
            <h3 className="text-sm font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              Variational Angles Control (γ, β)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: config.depth }).map((_, idx) => {
                const gammaVal = config.gamma[idx] ?? 0.35;
                const betaVal = config.beta[idx] ?? 0.25;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                    <div className="text-xs font-mono text-cyan-400 font-bold border-b border-slate-800 pb-2">
                      QAOA Layer {idx + 1} Parameters
                    </div>

                    {/* Cost Angle gamma */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Cost Angle γ_{idx + 1}:</span>
                        <span className="text-cyan-300 font-bold">{gammaVal.toFixed(2)} rad</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="3.14"
                        step="0.02"
                        value={gammaVal}
                        onChange={(e) => handleGammaChange(idx, parseFloat(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    {/* Mixer Angle beta */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Mixer Angle β_{idx + 1}:</span>
                        <span className="text-indigo-300 font-bold">{betaVal.toFixed(2)} rad</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1.57"
                        step="0.02"
                        value={betaVal}
                        onChange={(e) => handleBetaChange(idx, parseFloat(e.target.value))}
                        className="w-full accent-indigo-400 cursor-pointer"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Polished Visual Quantum Circuit Board */}
        <div className="glass-card p-6 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">
              Parametric Quantum Circuit Schematic
            </h3>
            <span className="text-xs font-mono text-slate-500">
              Alternating Problem Unitary U(H_C, γ) and Mixer Unitary U(H_B, β)
            </span>
          </div>

          {/* Interactive Circuit Canvas */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px] p-4 bg-slate-950/90 rounded-xl border border-slate-800 space-y-4 font-mono text-xs select-none">
              
              <div className="flex items-center gap-2">
                <span className="w-14 text-slate-400 font-bold text-right">|q₀⟩</span>
                <span className="text-slate-600">─</span>
                <span className="quantum-gate gate-h">H</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rz">RZ(2γ₁)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rx">RX(2β₁)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-cnot">●</span>
                <span className="text-slate-600">──</span>
                {config.depth >= 2 && (
                  <>
                    <span className="quantum-gate gate-rz">RZ(2γ₂)</span>
                    <span className="text-slate-600">──</span>
                    <span className="quantum-gate gate-rx">RX(2β₂)</span>
                    <span className="text-slate-600">──</span>
                  </>
                )}
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold">
                  [M]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-14 text-slate-400 font-bold text-right">|q₁⟩</span>
                <span className="text-slate-600">─</span>
                <span className="quantum-gate gate-h">H</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rz">RZ(2γ₁)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rx">RX(2β₁)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-cnot">┼</span>
                <span className="text-slate-600">──</span>
                {config.depth >= 2 && (
                  <>
                    <span className="quantum-gate gate-rz">RZ(2γ₂)</span>
                    <span className="text-slate-600">──</span>
                    <span className="quantum-gate gate-rx">RX(2β₂)</span>
                    <span className="text-slate-600">──</span>
                  </>
                )}
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold">
                  [M]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-14 text-slate-400 font-bold text-right">|q₂⟩</span>
                <span className="text-slate-600">─</span>
                <span className="quantum-gate gate-h">H</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rz">RZ(2γ₁)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-rx">RX(2β₁)</span>
                <span className="text-slate-600">──</span>
                <span className="quantum-gate gate-cnot">X</span>
                <span className="text-slate-600">──</span>
                {config.depth >= 2 && (
                  <>
                    <span className="quantum-gate gate-rz">RZ(2γ₂)</span>
                    <span className="text-slate-600">──</span>
                    <span className="quantum-gate gate-rx">RX(2β₂)</span>
                    <span className="text-slate-600">──</span>
                  </>
                )}
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold">
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
            className="flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-lg shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin text-slate-950" />
                <span>Simulating QAOA Circuit...</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-current text-slate-950" />
                <span>Run QAOA Experiment</span>
              </>
            )}
          </button>
        </div>

        {/* Execution Step Progress Modal Overlay / Card */}
        {isRunning && (
          <div className="glass-card p-6 border border-cyan-400 bg-slate-950/95 space-y-4 animate-fade-in shadow-2xl shadow-cyan-500/20">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
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
                        ? 'bg-cyan-950/60 border border-cyan-500/50 text-cyan-200 animate-pulse'
                        : 'bg-slate-900/40 text-slate-600 border border-slate-800'
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-700 block shrink-0" />
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
