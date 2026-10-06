import React, { useState } from 'react';
import { MathFormula } from './MathFormula';
import { BookOpen, Cpu, Sparkles, Layers, RefreshCw, Atom, ChevronDown, ChevronUp } from 'lucide-react';

export const QuantumConcepts: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const concepts = [
    {
      id: 'qubit',
      title: 'Qubit (Quantum Bit)',
      summary: 'Basic unit of quantum information in quantum computing.',
      icon: Atom,
      color: 'text-[#ff6b7d]',
      math: '|\\psi\\rangle = \\alpha |0\\rangle + \\beta |1\\rangle',
      details: 'Unlike a classical binary bit (0 or 1), a qubit exists as a two-level quantum mechanical system represented on the Bloch sphere where |α|² + |β|² = 1.'
    },
    {
      id: 'superposition',
      title: 'Superposition',
      summary: 'Allows quantum states to represent linear combinations of all possibilities.',
      icon: Sparkles,
      color: 'text-[#ff6b7d]',
      math: '|+\\rangle^{\\otimes N} = \\frac{1}{\\sqrt{2^N}} \\sum_{x \\in \\{0,1\\}^N} |x\\rangle',
      details: 'Initial Hadamard gates put all N asset qubits into equal superposition, evaluating all 2^N candidate portfolio combinations simultaneously.'
    },
    {
      id: 'entanglement',
      title: 'Entanglement',
      summary: 'Creates non-classical quantum correlations between qubits.',
      icon: Layers,
      color: 'text-[#f4eada]',
      math: '|\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}',
      details: 'Controlled-NOT entangling gates map pairwise asset covariances Σ_ij, allowing QAOA to account for correlated asset risks.'
    },
    {
      id: 'cost_h',
      title: 'Cost Hamiltonian (H_C)',
      summary: 'Encodes the portfolio optimization problem into energy eigenvalues.',
      icon: Cpu,
      color: 'text-[#ff6b7d]',
      math: 'H_C = \\sum h_i Z_i + \\sum J_{ij} Z_i Z_j',
      details: 'Problem unitary U(H_C, γ) = e^(-i γ H_C) applies phase shifts proportional to the portfolio cost function C(x).'
    },
    {
      id: 'mixer_h',
      title: 'Mixer Hamiltonian (H_B)',
      summary: 'Drives transverse transitions to explore candidate solution space.',
      icon: RefreshCw,
      color: 'text-[#f4eada]',
      math: 'H_B = \\sum_{i=1}^N X_i',
      details: 'Mixer unitary U(H_B, β) = e^(-i β H_B) applies Pauli-X rotations, allowing quantum interference between computational basis bitstrings.'
    },
    {
      id: 'qaoa',
      title: 'QAOA Algorithm',
      summary: 'Alternates between cost and mixer Hamiltonians to search for low-cost solutions.',
      icon: BookOpen,
      color: 'text-[#ff6b7d]',
      math: '|\\gamma, \\beta\\rangle = \\prod_{k=1}^p U(H_B, \\beta_k) U(H_C, \\gamma_k) |+\\rangle^{\\otimes N}',
      details: 'A hybrid quantum-classical algorithm where a quantum processor prepares parametric states and a classical optimizer (COBYLA) tunes angles (γ, β).'
    }
  ];

  return (
    <section id="concepts" className="py-12 border-t border-[#d45266]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="badge-quantum">Section 16 — Theory & Concepts</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515]">Quantum Computing Educational Modules</h2>
          <p className="text-[#5C0820] max-w-2xl leading-relaxed text-sm font-medium">
            Core theoretical foundations behind variational quantum algorithms and QUBO optimization.
          </p>
        </div>

        {/* Concept Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((c) => {
            const Icon = c.icon;
            const isExpanded = expandedId === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setExpandedId(isExpanded ? null : c.id)}
                className="glass-card p-6 border border-[#d45266]/40 bg-[#24050e] hover:border-[#ff6b7d] cursor-pointer transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg bg-[#140307] border border-[#d45266]/30 ${c.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-[#fffdf7] text-base">{c.title}</h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#ff6b7d]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#f4eada]/60" />
                  )}
                </div>

                <p className="text-xs text-[#f4eada]/80">{c.summary}</p>

                <div className="p-3 rounded-lg bg-[#140307] border border-[#d45266]/30 text-center">
                  <MathFormula math={c.math} displayMode />
                </div>

                {isExpanded && (
                  <div className="pt-3 border-t border-[#d45266]/30 text-xs text-[#f4eada] leading-relaxed animate-fade-in">
                    {c.details}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
