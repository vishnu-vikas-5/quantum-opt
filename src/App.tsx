import { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import type { QAOAConfig, QAOAResult } from './types/quantum';
import { DEMO_ASSETS, buildCovarianceMatrix, generateQUBOMatrix, convertQUBOToIsing, runQAOASimulation, generateRiskReturnCandidates } from './utils/quantumEngine';

// Components
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { ProblemDefinition } from './components/ProblemDefinition';
import { AssetSelection } from './components/AssetSelection';
import { PortfolioParameters } from './components/PortfolioParameters';
import { QUBOFormulation } from './components/QUBOFormulation';
import { IsingModel as IsingModelComp } from './components/IsingModel';
import { QAOAExperiment } from './components/QAOAExperiment';
import { QAOAConvergence } from './components/QAOAConvergence';
import { MeasurementResults } from './components/MeasurementResults';
import { OptimalPortfolio } from './components/OptimalPortfolio';
import { RiskReturnLandscape } from './components/RiskReturnLandscape';
import { SharpeRatioAnalysis } from './components/SharpeRatioAnalysis';
import { ClassicalVsQAOA } from './components/ClassicalVsQAOA';
import { ParameterExperiment } from './components/ParameterExperiment';
import { MethodologyTimeline } from './components/MethodologyTimeline';
import { QuantumConcepts } from './components/QuantumConcepts';
import { ResultsDashboard } from './components/ResultsDashboard';
import { Footer } from './components/Footer';

export function App() {
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>(DEMO_ASSETS.map(a => a.id));
  const [targetK, setTargetK] = useState<number>(4);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const [config, setConfig] = useState<QAOAConfig>({
    riskAversion: 0.50,
    portfolioSize: 4,
    penalty: 10.0,
    depth: 2,
    gamma: [0.35, 0.42],
    beta: [0.25, 0.18],
    shots: 1000,
    riskFreeRate: 0.035
  });

  // Filter active asset universe
  const activeAssets = useMemo(() => {
    return DEMO_ASSETS.filter(a => selectedAssetIds.includes(a.id));
  }, [selectedAssetIds]);

  // Sync targetK with config
  useEffect(() => {
    setConfig(prev => ({ ...prev, portfolioSize: targetK }));
  }, [targetK]);

  // Compute live QUBO matrix and Ising model
  const covMatrix = useMemo(() => buildCovarianceMatrix(activeAssets), [activeAssets]);
  const quboMatrix = useMemo(() => {
    return generateQUBOMatrix(activeAssets, covMatrix, config.riskAversion, config.portfolioSize, config.penalty);
  }, [activeAssets, covMatrix, config.riskAversion, config.portfolioSize, config.penalty]);

  const isingModel = useMemo(() => {
    return convertQUBOToIsing(quboMatrix);
  }, [quboMatrix]);

  // QAOA result state
  const [qaoaResult, setQaoaResult] = useState<QAOAResult | null>(null);

  // Initialize default QAOA run on mount
  useEffect(() => {
    const initialRes = runQAOASimulation(activeAssets, config);
    setQaoaResult(initialRes);
  }, [activeAssets, config]);

  // Candidate portfolios for scatter plot
  const candidatePortfolios = useMemo(() => {
    return generateRiskReturnCandidates(activeAssets, config, qaoaResult || undefined);
  }, [activeAssets, config, qaoaResult]);

  // Toggle asset selection
  const handleToggleAsset = (id: string) => {
    if (selectedAssetIds.includes(id)) {
      if (selectedAssetIds.length > 2) {
        setSelectedAssetIds(selectedAssetIds.filter(aId => aId !== id));
      }
    } else {
      setSelectedAssetIds([...selectedAssetIds, id]);
    }
  };

  const handleConfigChange = (newConfig: Partial<QAOAConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  // Run QAOA Simulation sequence with progress animation
  const handleRunQAOA = () => {
    setIsRunning(true);
    setActiveStep(0);

    const stepInterval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setTimeout(() => {
            const res = runQAOASimulation(activeAssets, config);
            setQaoaResult(res);
            setIsRunning(false);

            // Trigger celebration confetti
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#00f2fe', '#38bdf8', '#6366f1']
            });

            // Scroll smoothly to results
            const element = document.getElementById('results');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 600);
          return 5;
        }
        return prev + 1;
      });
    }, 500);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'hero', 'problem', 'dataset', 'parameters', 'qubo', 'ising',
        'qaoa', 'convergence', 'measurement', 'results', 'landscape',
        'sharpe', 'comparison', 'experiment', 'methodology', 'concepts', 'dashboard'
      ];
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Sticky Top Navbar */}
      <Navbar onRunSimulation={handleRunQAOA} activeSection={activeSection} />

      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative">
        
        {/* Floating Sidebar Navigation */}
        <Sidebar activeSection={activeSection} />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-64 py-6 space-y-12">
          <Hero
            onRunSimulation={handleRunQAOA}
            onExploreMethodology={() => scrollTo('methodology')}
          />

          <ProblemDefinition />

          <AssetSelection
            assets={DEMO_ASSETS}
            selectedAssetIds={selectedAssetIds}
            targetK={targetK}
            onToggleAsset={handleToggleAsset}
            onSelectAll={() => setSelectedAssetIds(DEMO_ASSETS.map(a => a.id))}
            onTargetKChange={(k) => setTargetK(k)}
          />

          <PortfolioParameters
            config={config}
            onConfigChange={handleConfigChange}
            onGenerateQUBO={() => scrollTo('qubo')}
          />

          <QUBOFormulation
            qubo={quboMatrix}
            config={config}
            onConvertToIsing={() => scrollTo('ising')}
          />

          <IsingModelComp
            ising={isingModel}
            onProceedToQAOA={() => scrollTo('qaoa')}
          />

          <QAOAExperiment
            config={config}
            onConfigChange={handleConfigChange}
            onRunQAOA={handleRunQAOA}
            isRunning={isRunning}
            activeStep={activeStep}
            qaoaResult={qaoaResult}
          />

          <QAOAConvergence result={qaoaResult} />

          <MeasurementResults result={qaoaResult} assets={activeAssets} />

          <OptimalPortfolio optimal={qaoaResult?.mostProbableBitstring || null} />

          <RiskReturnLandscape candidates={candidatePortfolios} />

          <SharpeRatioAnalysis optimal={qaoaResult?.mostProbableBitstring || null} />

          <ClassicalVsQAOA qaoaResult={qaoaResult} />

          <ParameterExperiment assets={activeAssets} />

          <MethodologyTimeline />

          <QuantumConcepts />

          <ResultsDashboard
            qaoaResult={qaoaResult}
            config={config}
            onRunAgain={handleRunQAOA}
            onScrollTo={scrollTo}
          />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
