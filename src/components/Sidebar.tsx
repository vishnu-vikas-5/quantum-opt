import { 
  Sparkles, 
  HelpCircle, 
  PieChart, 
  Sliders, 
  Grid, 
  GitMerge, 
  Cpu, 
  TrendingDown, 
  BarChart, 
  CheckCircle2, 
  ScatterChart, 
  ShieldCheck, 
  Scale, 
  FlaskConical, 
  Clock, 
  BookOpen, 
  LayoutDashboard 
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const sections = [
    { id: 'hero', label: '1. Landing Hero', icon: Sparkles },
    { id: 'problem', label: '2. Problem Definition', icon: HelpCircle },
    { id: 'dataset', label: '3. Asset Selection', icon: PieChart },
    { id: 'parameters', label: '4. Portfolio Parameters', icon: Sliders },
    { id: 'qubo', label: '5. QUBO Formulation', icon: Grid },
    { id: 'ising', label: '6. Ising Model', icon: GitMerge },
    { id: 'qaoa', label: '7. QAOA Experiment', icon: Cpu },
    { id: 'convergence', label: '8. QAOA Convergence', icon: TrendingDown },
    { id: 'measurement', label: '9. Measurement Distribution', icon: BarChart },
    { id: 'results', label: '10. Optimal Portfolio', icon: CheckCircle2 },
    { id: 'landscape', label: '11. Risk-Return Landscape', icon: ScatterChart },
    { id: 'sharpe', label: '12. Sharpe Ratio Analysis', icon: ShieldCheck },
    { id: 'comparison', label: '13. Classical vs QAOA', icon: Scale },
    { id: 'experiment', label: '14. Parameter Lab', icon: FlaskConical },
    { id: 'methodology', label: '15. Methodology', icon: Clock },
    { id: 'concepts', label: '16. Quantum Concepts', icon: BookOpen },
    { id: 'dashboard', label: '17. Executive Summary', icon: LayoutDashboard },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden lg:block fixed left-4 top-24 z-40 w-60 glass-card p-3 max-h-[calc(100vh-7rem)] overflow-y-auto border border-[#d45266]/30">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3d0817] text-xs font-mono text-[#cdaea0]">
        <span className="text-[#f4eada] font-bold uppercase tracking-wider">Navigation Index</span>
        <span className="text-[#d45266]">18 Sections</span>
      </div>

      <nav className="space-y-1">
        {sections.map(section => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-all text-left font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-[#d45266]/30 to-[#7c0b2b]/20 text-[#fffdf7] border border-[#d45266]/60 font-semibold shadow-sm'
                  : 'text-[#cdaea0] hover:text-[#fffdf7] hover:bg-[#24050e]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#d45266]' : 'text-[#8c6759]'}`} />
              <span className="truncate">{section.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
