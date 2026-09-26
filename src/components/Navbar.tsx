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
    <header className="sticky top-0 z-50 bg-[#140307]/90 backdrop-blur-xl border-b border-[#d45266]/30 shadow-lg shadow-[#7c0b2b]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <div className="p-2 rounded-lg bg-[#d45266]/15 border border-[#d45266]/40 text-[#f4eada] shadow-inner">
            <Cpu className="w-5 h-5 text-[#d45266] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#fffdf7] tracking-tight text-base sm:text-lg">
                QAOA Portfolio Optimizer
              </span>
              <span className="badge-academic hidden sm:inline-flex">
                Academic Capstone
              </span>
            </div>
            <p className="text-xs text-[#cdaea0] font-mono hidden sm:block">
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
                  ? 'bg-[#d45266]/25 text-[#f4eada] border border-[#d45266]/50 shadow-sm font-semibold'
                  : 'text-[#cdaea0] hover:text-[#fffdf7] hover:bg-[#24050e]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#24050e] border border-[#d45266]/30 text-xs font-mono text-[#f4eada]">
            <span className="w-2 h-2 rounded-full bg-[#d45266] animate-ping" />
            QAOA Simulator Ready
          </div>

          <button
            onClick={onRunSimulation}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#d45266] to-[#7c0b2b] hover:from-[#e86070] hover:to-[#961036] text-[#fffdf7] font-bold text-xs sm:text-sm shadow-lg shadow-[#d45266]/30 transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-current text-[#fffdf7]" />
            <span className="hidden sm:inline">Run QAOA</span>
            <span className="sm:hidden">Run</span>
          </button>

          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="xl:hidden p-2 rounded-lg bg-[#24050e] text-[#f4eada] border border-[#d45266]/30"
          >
            <span className="font-mono text-xs font-bold">{isNavOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isNavOpen && (
        <div className="xl:hidden bg-[#140307]/95 border-b border-[#d45266]/40 p-4 space-y-2 font-mono text-xs animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`p-2 rounded-md text-left ${
                  activeSection === item.id
                    ? 'bg-[#d45266]/25 text-[#f4eada] border border-[#d45266]/50 font-bold'
                    : 'text-[#cdaea0] hover:bg-[#24050e]'
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
