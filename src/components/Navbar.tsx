import { Cpu, Play, LineChart } from 'lucide-react';
import RubberSegment from './RubberSegment';

interface NavbarProps {
  viewPage: 'optimizer' | 'stocks';
  onSelectPage: (page: 'optimizer' | 'stocks') => void;
  onRunSimulation: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  viewPage, 
  onSelectPage, 
  onRunSimulation, 
  activeSection 
}) => {
  const scrollToSection = (id: string) => {
    if (viewPage !== 'optimizer') {
      onSelectPage('optimizer');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const mainPageItems = [
    { value: 'stocks', label: 'Stock Market (₹)', icon: <LineChart className="w-4 h-4 text-[#ff6b7d]" /> },
    { value: 'optimizer', label: 'QAOA Optimizer', icon: <Cpu className="w-4 h-4 text-[#ff6b7d]" /> }
  ];

  const sectionItems = [
    { value: 'hero', label: 'Overview' },
    { value: 'assets-config', label: 'Assets & Config' },
    { value: 'qaoa-solver', label: 'Simulator' },
    { value: 'results', label: 'Results' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#140307]/95 backdrop-blur-xl border-b border-[#d45266]/30 shadow-lg shadow-[#7c0b2b]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Brand Header */}
        <div 
          className="flex items-center gap-3 cursor-pointer group shrink-0" 
          onClick={() => onSelectPage('optimizer')}
        >
          <div className="p-2 rounded-lg bg-[#d45266]/20 border border-[#d45266]/50 text-[#f4eada] shadow-inner group-hover:scale-105 transition-all shrink-0">
            <Cpu className="w-5 h-5 text-[#ff6b7d] animate-pulse" />
          </div>
          <div className="whitespace-nowrap flex flex-col justify-center">
            <span className="font-extrabold text-[#fffdf7] tracking-tight text-base sm:text-lg leading-tight block">
              Quantum FinTech
            </span>
            <p className="text-[11px] text-[#cdaea0] font-mono hidden sm:block leading-tight mt-0.5">
              1 USD = ₹96.13 INR
            </p>
          </div>
        </div>

        {/* React Bits RubberSegment Physics Animated Navigation */}
        <div className="flex-1 flex items-center justify-center gap-3 min-w-0">
          <RubberSegment
            items={mainPageItems}
            value={viewPage}
            onChange={(val) => onSelectPage(val as 'optimizer' | 'stocks')}
            trackColor="#24050e"
            thumbColor="#d45266"
            textColor="#f4eada"
            activeTextColor="#ffffff"
            size="md"
            radius={12}
            inset={3}
            stretch={100}
            squash={3}
            speed={1}
            glide={75}
            draggable={true}
          />

          {viewPage === 'optimizer' && (
            <div className="hidden lg:block">
              <RubberSegment
                items={sectionItems}
                value={activeSection}
                onChange={(val) => scrollToSection(val)}
                trackColor="#1c030b"
                thumbColor="#7c0b2b"
                textColor="#cdaea0"
                activeTextColor="#ffffff"
                size="sm"
                radius={10}
                inset={2}
                stretch={80}
                squash={2}
                speed={1.1}
                glide={50}
                draggable={true}
              />
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {viewPage === 'optimizer' && (
            <button
              onClick={onRunSimulation}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d45266] to-[#7c0b2b] hover:from-[#e86070] hover:to-[#961036] text-[#fffdf7] font-bold text-xs shadow-lg shadow-[#d45266]/30 transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current text-[#fffdf7]" />
              <span className="hidden sm:inline">Run QAOA</span>
            </button>
          )}

          {viewPage === 'stocks' && (
            <button
              onClick={() => onSelectPage('optimizer')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d45266] to-[#7c0b2b] hover:from-[#e86070] hover:to-[#961036] text-[#fffdf7] font-bold text-xs shadow-lg shadow-[#d45266]/30 transition-all hover:scale-105 active:scale-95"
            >
              <Cpu className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Quantum Optimizer</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};




