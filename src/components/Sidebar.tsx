import { 
  Sparkles, 
  PieChart, 
  Cpu, 
  CheckCircle2,
  LineChart
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSelectPage: (page: 'optimizer' | 'stocks') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSelectPage }) => {
  const sections = [
    { id: 'hero', label: '1. Overview', icon: Sparkles },
    { id: 'assets-config', label: '2. Assets & Config', icon: PieChart },
    { id: 'qaoa-solver', label: '3. QAOA Simulator', icon: Cpu },
    { id: 'results', label: '4. Results & Benchmark', icon: CheckCircle2 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden lg:block fixed left-4 top-24 z-40 w-52 glass-card p-3 border border-[#d45266]/30">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3d0817] text-xs font-mono text-[#cdaea0]">
        <span className="text-[#f4eada] font-bold uppercase tracking-wider">Optimizer Workflow</span>
        <span className="text-[#d45266] font-bold">4 Steps</span>
      </div>

      <nav className="space-y-1.5">
        {sections.map(section => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all text-left font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-[#d45266] to-[#7c0b2b] text-[#fffdf7] font-bold shadow-md shadow-[#d45266]/30'
                  : 'text-[#cdaea0] hover:text-[#fffdf7] hover:bg-[#24050e]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#fffdf7]' : 'text-[#d45266]'}`} />
              <span className="truncate">{section.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick link to Stock Details page */}
      <div className="pt-3 mt-3 border-t border-[#3d0817]">
        <button
          onClick={() => onSelectPage('stocks')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#24050e] hover:bg-[#380816] text-[#ff6b7d] border border-[#d45266]/40 text-xs font-mono font-bold transition-all"
        >
          <LineChart className="w-4 h-4" />
          <span>Stock Market (₹)</span>
        </button>
      </div>
    </aside>
  );
};


