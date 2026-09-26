import { useState } from 'react';
import { Cpu, Play } from 'lucide-react';

interface NavbarProps {
  onRunSimulation: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onRunSimulation, activeSection }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'problem', label: 'Problem' },
    { id: 'dataset', label: 'Assets' },
    { id: 'parameters', label: 'Config' },
    { id: 'qubo', label: 'QUBO' },
    { id: 'ising', label: 'Ising' },
    { id: 'qaoa', label: 'QAOA Circuit' },
    { id: 'convergence', label: 'Convergence' },
    { id: 'results', label: 'Portfolio' },
    { id: 'landscape', label: 'Risk-Return' },
    { id: 'comparison', label: 'Benchmark' },
    { id: 'experiment', label: 'Lab' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'concepts', label: 'Theory' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsNavOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-inner">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight text-base sm:text-lg">
                QAOA Portfolio Optimizer
              </span>
              <span className="badge-academic hidden sm:inline-flex">
                Academic Capstone
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden sm:block">
              QUBO formulation & Quantum Optimization
            </p>
          </div>
        </div>

        {/* Desktop Quick Nav */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-medium">
          {navItems.slice(0, 8).map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeSection === item.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/20 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            QAOA Simulator Ready
          </div>

          <button
            onClick={onRunSimulation}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">Run QAOA</span>
            <span className="sm:hidden">Run</span>
          </button>

          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="xl:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
          >
            <span className="font-mono text-xs font-bold">{isNavOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isNavOpen && (
        <div className="xl:hidden bg-slate-950/95 border-b border-cyan-500/30 p-4 space-y-2 font-mono text-xs animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`p-2 rounded-md text-left ${
                  activeSection === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
