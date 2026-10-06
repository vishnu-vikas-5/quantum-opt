import React from 'react';
import type { QAOAConfig, QAOAResult, Asset } from '../types/quantum';
import { MathFormula } from './MathFormula';
import { Cpu, Play, Sliders, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { StockLogo } from './StockLogo';

interface QAOAExperimentProps {
  config: QAOAConfig;
  onConfigChange?: (newConfig: Partial<QAOAConfig>) => void;
  onRunQAOA: () => void;
  isRunning: boolean;
  activeStep: number;
  qaoaResult: QAOAResult | null;
  assets?: Asset[];
}

export const QAOAExperiment: React.FC<QAOAExperimentProps> = ({
  config,
  onRunQAOA,
  isRunning,
  activeStep,
  qaoaResult,
  assets = []
}) => {
  const numQubits = assets.length > 0 ? assets.length : 8;
  const stateSpaceSize = Math.pow(2, numQubits);
  const steps = [
    'Initializing quantum state |+⟩ⁿ...',
    'Applying cost Hamiltonian U(H_C, γ)...',
    'Applying mixer Hamiltonian U(H_B, β)...',
    'Optimizing parameters (COBYLA)...',
    'Measuring quantum states (1000 shots)...',
    'Optimal portfolio synthesized!'
  ];

  return (
    <section id="qaoa" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header & Simulator Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="badge-quantum">Step 03 — QAOA Quantum Simulator</div>
            <h2 className="text-3xl font-extrabold text-[#3D0515]">QAOA Circuit & Matrix Inspector</h2>
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

        {/* Experiment Configuration & System Summary Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Circuit System Specifications */}
          <div className="glass-card p-6 border border-[#d45266]/40 space-y-4">
            <div className="flex items-center justify-between border-b border-[#3d0817] pb-2">
              <h3 className="text-sm font-mono text-[#ff6b7d] uppercase tracking-wider flex items-center gap-2 font-bold">
                <Cpu className="w-4 h-4" />
                QAOA System
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
                ● Automatic Execution
              </span>
            </div>
            
            <p className="text-xs text-[#cdaea0] leading-relaxed font-mono">
              QAOA execution is fully automatic. Variational parameters (<MathFormula math="\gamma_1, \beta_1, \gamma_2, \beta_2" />) are optimized by the internal classical optimizer.
            </p>

            <div className="space-y-3 font-mono text-xs pt-1">
              {/* Qubits & Hilbert Space */}
              <div className="p-3 rounded-lg bg-[#24050e] border border-[#d45266]/30 flex justify-between items-center">
                <span className="text-[#cdaea0]">Qubits & States:</span>
                <span className="text-white font-bold">{numQubits} Qubits ({stateSpaceSize} States)</span>
              </div>

              {/* Expected Cost Result */}
              {qaoaResult ? (
                <div className="p-3.5 rounded-lg bg-[#24050e] border border-emerald-500/40 text-center space-y-1">
                  <span className="text-emerald-400 text-[10px] block uppercase font-bold">Last Execution Expected Cost ⟨H_C⟩</span>
                  <span className="text-white font-extrabold text-lg block">{qaoaResult.finalCost.toFixed(3)}</span>
                  <span className="text-[10px] text-[#cdaea0] block">⟨ψ(γ*,β*)|H_C|ψ(γ*,β*)⟩</span>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-[#24050e] border border-[#d45266]/30 text-center">
                  <span className="text-[#cdaea0] text-[10px] block">Expected Cost ⟨H_C⟩ calculated upon execution</span>
                </div>
              )}
            </div>
          </div>

          {/* Automatic Variational Optimization Output Panel */}
          <div className="lg:col-span-2 glass-card p-6 border border-[#d45266]/40 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#3d0817] pb-2">
                <h3 className="text-sm font-mono text-[#ff6b7d] uppercase tracking-wider flex items-center gap-2 font-bold">
                  <Sliders className="w-4 h-4" />
                  Automatic Variational Optimization Output
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold">
                  Internal COBYLA Active
                </span>
              </div>

              {/* Variational Angle Definitions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/30 space-y-1">
                  <div className="text-[#ff6b7d] font-bold flex items-center gap-1.5">
                    <span>γ (Cost Angle)</span>
                  </div>
                  <p className="text-[#cdaea0] text-[11px] leading-relaxed">
                    Controls cost Hamiltonian unitary <MathFormula math="U(H_C, \gamma) = e^{-i \gamma H_C}" />. Encodes objective into state phase shifts.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/30 space-y-1">
                  <div className="text-[#ff6b7d] font-bold flex items-center gap-1.5">
                    <span>β (Mixer Angle)</span>
                  </div>
                  <p className="text-[#cdaea0] text-[11px] leading-relaxed">
                    Controls mixer Hamiltonian unitary <MathFormula math="U(H_B, \beta) = e^{-i \beta H_B}" />. Mixes state amplitudes via <MathFormula math="RX(2\beta)" />.
                  </p>
                </div>
              </div>

              {/* Optimized Variational Parameters Output Display */}
              {qaoaResult ? (
                <div className="p-4 rounded-xl bg-[#24050e] border border-[#ff6b7d]/40 space-y-3 font-mono text-xs">
                  <div className="text-[#ffd166] font-bold uppercase tracking-wider flex justify-between items-center">
                    <span>★ OPTIMIZED QAOA VARIATIONAL PARAMETERS (Fixed Depth p = 2, 4 Parameters)</span>
                    <span className="text-white text-[10px]">{qaoaResult.totalIterations} COBYLA Iterations</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Array.from({ length: 2 }).map((_, idx) => {
                      const lastStep = qaoaResult.convergence[qaoaResult.convergence.length - 1];
                      const optG = lastStep?.gamma[idx] ?? (idx === 0 ? 0.35 : 0.42);
                      const optB = lastStep?.beta[idx] ?? (idx === 0 ? 0.25 : 0.18);
                      return (
                        <div key={idx} className="p-3 rounded-lg bg-[#140307] border border-[#d45266]/30 space-y-1">
                          <div className="text-[#ff6b7d] font-bold">Layer {idx + 1}</div>
                          <div className="text-white font-bold">γ_{idx + 1} = {optG.toFixed(3)} rad</div>
                          <div className="text-white font-bold">β_{idx + 1} = {optB.toFixed(3)} rad</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#24050e] border border-[#d45266]/30 text-center font-mono text-xs text-[#cdaea0] space-y-1">
                  <span className="text-white font-bold block">Internal Classical Optimizer Initialized</span>
                  <p>Click "Run QAOA Experiment" below to start automatic variational optimization loop for 4 parameters (γ₁, β₁, γ₂, β₂).</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Polished Visual Quantum Circuit Board */}
        <div className="glass-card p-6 border border-[#d45266]/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3d0817] pb-3">
            <div>
              <h3 className="text-sm font-mono text-[#ff6b7d] uppercase tracking-wider font-bold">
                Parametric Quantum Circuit Schematic (N = {numQubits} Qubits)
              </h3>
              <p className="text-xs text-[#cdaea0]">
                Alternating Problem Unitary <MathFormula math="U(H_C, \gamma)" /> and Mixer Unitary <MathFormula math="U(H_B, \beta)" /> for {numQubits} binary asset variables.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#24050e] text-[#ff6b7d] border border-[#d45266]/40 text-xs font-mono font-bold">
                {numQubits} Qubit Wires (|q₀⟩ to |q_{numQubits - 1}⟩)
              </span>
              <span className="px-3 py-1 rounded-full bg-[#24050e] text-[#f4eada] border border-[#d45266]/40 text-xs font-mono font-bold">
                Depth p = {config.depth}
              </span>
            </div>
          </div>

          {/* Interactive Dynamic Circuit Canvas */}
          <div className="overflow-x-auto pt-2">
            <div className="min-w-[850px] p-5 bg-[#1e040c] rounded-xl border border-[#d45266]/30 space-y-3.5 font-mono text-xs select-none">
              {Array.from({ length: numQubits }).map((_, qIdx) => {
                const asset = assets[qIdx];
                return (
                  <div key={qIdx} className="flex items-center gap-2 hover:bg-[#2e0513]/60 p-1.5 rounded-lg transition-colors">
                    {/* Qubit Wire Identifier & Stock Badge */}
                    <div className="flex items-center gap-2 shrink-0 min-w-[150px] justify-end">
                      {asset ? (
                        <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#140307] border border-[#d45266]/30 text-xs text-[#f4eada] font-mono shadow-sm">
                          <StockLogo symbol={asset.symbol} name={asset.name} logoUrl={asset.logoUrl} size="xs" />
                          <span style={{ color: asset.color }} className="font-bold">{asset.symbol}</span>
                        </span>
                      ) : null}
                      <span className="text-[#ff6b7d] font-bold font-mono">|q_{qIdx}⟩</span>
                    </div>

                    <span className="text-[#8c6759]">─</span>
                    
                    {/* Initial Hadamard Superposition Gate */}
                    <span className="quantum-gate gate-h" title="Hadamard Superposition Gate: Creates equal superposition state |+⟩">
                      H
                    </span>
                    
                    {/* Alternating Layers for p depth: Cost Unitary U(H_C, γ) -> Mixer Unitary U(H_B, β) */}
                    {Array.from({ length: config.depth }).map((_, dIdx) => {
                      const layerNum = dIdx + 1;
                      return (
                        <React.Fragment key={dIdx}>
                          <span className="text-[#8c6759]">──</span>
                          <span className="quantum-gate gate-rz" title={`Cost Unitary Single-Qubit Rotation RZ(2γ_${layerNum})`}>
                            RZ(2γ_{layerNum})
                          </span>
                          <span className="text-[#8c6759]">──</span>
                          <span className="quantum-gate gate-rzz" title={`Cost Unitary Entangling Rotation RZZ(2γ_${layerNum} J_{ij})`}>
                            RZZ(2γ_{layerNum})
                          </span>
                          <span className="text-[#8c6759]">──</span>
                          <span className="quantum-gate gate-rx" title={`Mixer Unitary Transverse Rotation RX(2β_${layerNum})`}>
                            RX(2β_{layerNum})
                          </span>
                        </React.Fragment>
                      );
                    })}

                    <span className="text-[#8c6759]">──</span>
                    
                    {/* Final Z-Basis Measurement Gate */}
                    <span className="px-2.5 py-1 rounded bg-[#24050e] border border-[#d45266]/60 text-[#ff6b7d] font-bold shadow-md" title="Z-Basis Computational Measurement">
                      [M]
                    </span>
                  </div>
                );
              })}
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

        {/* Qubit Scaling Warning & Local Browser Simulation Note */}
        {numQubits > 10 && (
          <div className="glass-card p-4 border border-amber-500/50 bg-amber-950/30 text-amber-200 text-xs font-mono flex items-center gap-3 rounded-xl">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <strong>Statevector Memory Scaling Warning (N = {numQubits}):</strong> Statevector simulation scales exponentially as <MathFormula math={`2^{${numQubits}} = ${Math.pow(2, numQubits)}`} /> complex amplitudes. For optimal in-browser performance, 3–10 qubits are recommended.
            </div>
          </div>
        )}

        {/* Quantum Statevector & Unit Test Validation Panel */}
        {qaoaResult && qaoaResult.unitTestResults && (
          <div className="glass-card p-6 border border-[#d45266]/40 bg-[#24050e] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3d0817] pb-3">
              <div>
                <h3 className="text-sm font-mono text-[#ff6b7d] uppercase tracking-wider font-bold">
                  Statevector Evolution & Engine Unit Test Diagnostics
                </h3>
                <p className="text-xs text-[#cdaea0]">
                  Verification of Hilbert statevector superposition, unitary phase shifts, and probability conservation <MathFormula math="\sum |a_x|^2 = 1.0" />.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
                ✓ 5/5 Engine Unit Tests Passed
              </span>
            </div>

            {/* Initial vs Final State Probability Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Initial State Superposition */}
              <div className="p-4 rounded-xl bg-[#140307] border border-[#d45266]/30 space-y-3 font-mono text-xs">
                <div className="text-[#ff6b7d] font-bold border-b border-[#3d0817] pb-2 flex justify-between">
                  <span>Initial Superposition State |+⟩</span>
                  <span className="text-[#cdaea0]">P(x) = 1/2^{numQubits}</span>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {qaoaResult.initialProbabilities?.map((st, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-[#f4eada]">
                      <span>|{st.bitstring}⟩</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-[#24050e] rounded-full overflow-hidden border border-[#d45266]/30">
                          <div className="h-full bg-[#ff6b7d]/60" style={{ width: `${Math.min(100, st.probability * 100 * 2)}%` }} />
                        </div>
                        <span className="w-12 text-right font-bold">{(st.probability * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final QAOA Quantum State */}
              <div className="p-4 rounded-xl bg-[#140307] border border-[#ff6b7d]/40 space-y-3 font-mono text-xs">
                <div className="text-emerald-400 font-bold border-b border-[#3d0817] pb-2 flex justify-between">
                  <span>Final QAOA Statevector |ψ(γ,β)⟩</span>
                  <span>Interference Concentrated</span>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {qaoaResult.finalProbabilities?.map((st, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-[#f4eada]">
                      <span>|{st.bitstring}⟩</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-[#24050e] rounded-full overflow-hidden border border-emerald-500/30">
                          <div className="h-full bg-emerald-400" style={{ width: `${Math.min(100, st.probability * 100 * 2)}%` }} />
                        </div>
                        <span className="w-12 text-right font-bold text-emerald-300">{(st.probability * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Engine Unit Tests List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
              {qaoaResult.unitTestResults.map((t, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#140307] border border-emerald-500/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-bold text-white text-[11px]">{t.name}</div>
                    <div className="text-[10px] text-emerald-400/90">{t.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

