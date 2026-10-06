import { useState, useEffect, useMemo } from 'react';
import type { Asset, QAOAConfig, QAOAResult } from './types/quantum';
import { LIVE_MARKET_ASSETS, fetchLiveMarketAssets, buildCovarianceMatrix, generateQUBOMatrix, convertQUBOToIsing, runQAOASimulation, generateRiskReturnCandidates, calculateAutomaticPenalty } from './utils/quantumEngine';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AssetSelection } from './components/AssetSelection';
import { StockDetailsPage } from './components/StockDetailsPage';
import { PortfolioParameters } from './components/PortfolioParameters';
import { QUBOFormulation } from './components/QUBOFormulation';
import { IsingModel as IsingModelComp } from './components/IsingModel';
import { QAOAExperiment } from './components/QAOAExperiment';
import { QAOAConvergence } from './components/QAOAConvergence';
import { MeasurementResults } from './components/MeasurementResults';
import { OptimalPortfolio } from './components/OptimalPortfolio';
import { RiskReturnLandscape } from './components/RiskReturnLandscape';
import { SharpeRatioAnalysis } from './components/SharpeRatioAnalysis';
import { ResultsDashboard } from './components/ResultsDashboard';
import { Footer } from './components/Footer';

export function App() {
  const [viewPage, setViewPage] = useState<'optimizer' | 'stocks'>('optimizer');
  const [allAssets, setAllAssets] = useState<Asset[]>(LIVE_MARKET_ASSETS);
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>(LIVE_MARKET_ASSETS.map(a => a.id));
  const [targetK, setTargetK] = useState<number>(4);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFetchingLive, setIsFetchingLive] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [matrixTab, setMatrixTab] = useState<'qubo' | 'ising'>('qubo');

  const [config, setConfig] = useState<QAOAConfig>({
    riskAversion: 0.50,
    portfolioSize: 4,
    penalty: 10.0,
    depth: 2,
    gamma: [0.35, 0.42],
    beta: [0.25, 0.18],
    shots: 1000,
    riskFreeRate: 0.035,
    optimizationMode: 'auto',
    optimizerName: 'COBYLA',
    maxIterations: 50,
    isManualPenalty: false
  });

  // Filter active asset universe
  const activeAssets = useMemo(() => {
    return allAssets.filter(a => selectedAssetIds.includes(a.id));
  }, [allAssets, selectedAssetIds]);

  // Sync targetK with config
  useEffect(() => {
    setConfig(prev => ({ ...prev, portfolioSize: targetK }));
  }, [targetK]);

  // Refresh real-time market price feed from Finnhub (.env)
  const handleRefreshLiveFeed = async () => {
    setIsFetchingLive(true);
    const updated = await fetchLiveMarketAssets();
    setAllAssets(updated);
    setIsFetchingLive(false);
  };

  // Auto-fetch live market data on initial load
  useEffect(() => {
    handleRefreshLiveFeed();
  }, []);

  // Compute live QUBO matrix and Ising model with automatic penalty calculation
  const covMatrix = useMemo(() => buildCovarianceMatrix(activeAssets), [activeAssets]);
  const autoP = useMemo(() => {
    return calculateAutomaticPenalty(activeAssets, covMatrix, config.riskAversion);
  }, [activeAssets, covMatrix, config.riskAversion]);

  const effectiveConfig = useMemo(() => {
    return {
      ...config,
      autoPenalty: autoP,
      penalty: config.isManualPenalty ? config.penalty : autoP
    };
  }, [config, autoP]);

  const quboMatrix = useMemo(() => {
    return generateQUBOMatrix(activeAssets, covMatrix, effectiveConfig.riskAversion, effectiveConfig.portfolioSize, effectiveConfig.penalty, effectiveConfig.isManualPenalty);
  }, [activeAssets, covMatrix, effectiveConfig]);

  const isingModel = useMemo(() => {
    return convertQUBOToIsing(quboMatrix);
  }, [quboMatrix]);

  // QAOA result state
  const [qaoaResult, setQaoaResult] = useState<QAOAResult | null>(null);

  // Initialize default QAOA run on mount
  useEffect(() => {
    const initialRes = runQAOASimulation(activeAssets, effectiveConfig);
    setQaoaResult(initialRes);
  }, [activeAssets, effectiveConfig]);

  // Candidate portfolios for scatter plot
  const candidatePortfolios = useMemo(() => {
    return generateRiskReturnCandidates(activeAssets, effectiveConfig, qaoaResult || undefined);
  }, [activeAssets, effectiveConfig, qaoaResult]);

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
    setViewPage('optimizer');
    setIsRunning(true);
    setActiveStep(0);

    const stepInterval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setTimeout(() => {
            const res = runQAOASimulation(activeAssets, effectiveConfig);
            setQaoaResult(res);
            setIsRunning(false);
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

  // Track active section on scroll during optimizer mode
  useEffect(() => {
    if (viewPage !== 'optimizer') return;

    const handleScroll = () => {
      const sectionIds = ['hero', 'assets-config', 'qaoa-solver', 'results'];
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
  }, [viewPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EBE0] text-[#3D0515] font-sans selection:bg-[#D45266] selection:text-white">
      
      {/* Sticky Top Navbar */}
      <Navbar 
        viewPage={viewPage}
        onSelectPage={setViewPage}
        onRunSimulation={handleRunQAOA} 
        activeSection={activeSection} 
      />

      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative">
        
        {viewPage === 'stocks' ? (
          /* Standalone Stock Market & Price Graphs Page View */
          <main className="flex-1 py-6">
            <StockDetailsPage
              assets={allAssets}
              onRefreshFeed={handleRefreshLiveFeed}
              isRefreshing={isFetchingLive}
            />
          </main>
        ) : (
          /* Standalone Quantum QAOA Optimizer Page View */
          <main className="flex-1 py-6 space-y-12">
              
              {/* Section 1: Hero Overview */}
              <section id="hero">
                <Hero
                  onRunSimulation={handleRunQAOA}
                  onExploreMethodology={() => scrollTo('assets-config')}
                />
              </section>

              {/* Section 2: Assets & Configuration */}
              <section id="assets-config" className="space-y-8 pt-6 border-t border-[#d45266]/30">
                <AssetSelection
                  assets={allAssets}
                  selectedAssetIds={selectedAssetIds}
                  targetK={targetK}
                  onToggleAsset={handleToggleAsset}
                  onSelectAll={() => setSelectedAssetIds(allAssets.map(a => a.id))}
                  onTargetKChange={(k) => setTargetK(k)}
                  onRefreshLiveFeed={() => handleRefreshLiveFeed()}
                  isFetchingLive={isFetchingLive}
                />

                <PortfolioParameters
                  config={effectiveConfig}
                  onConfigChange={handleConfigChange}
                  onGenerateQUBO={() => scrollTo('qaoa-solver')}
                />
              </section>

              {/* Section 3: QAOA Simulator & Quantum Matrices */}
              <section id="qaoa-solver" className="space-y-8 pt-6">
                <QAOAExperiment
                  config={effectiveConfig}
                  onConfigChange={handleConfigChange}
                  onRunQAOA={handleRunQAOA}
                  isRunning={isRunning}
                  activeStep={activeStep}
                  qaoaResult={qaoaResult}
                  assets={activeAssets}
                />

                <QAOAConvergence result={qaoaResult} />

                {/* Matrix & Hamiltonian Inspector Tabs */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between border-b border-[#d45266]/30 pb-2">
                    <h3 className="text-lg font-bold text-[#3D0515]">Matrix & Model Inspection</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setMatrixTab('qubo')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                          matrixTab === 'qubo'
                            ? 'bg-[#d45266] text-white shadow-sm'
                            : 'bg-[#24050e] text-[#cdaea0] hover:text-[#fffdf7]'
                        }`}
                      >
                        QUBO Matrix
                      </button>
                      <button
                        onClick={() => setMatrixTab('ising')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                          matrixTab === 'ising'
                            ? 'bg-[#d45266] text-white shadow-sm'
                            : 'bg-[#24050e] text-[#cdaea0] hover:text-[#fffdf7]'
                        }`}
                      >
                        Ising Spin Model
                      </button>
                    </div>
                  </div>

                  {matrixTab === 'qubo' ? (
                    <QUBOFormulation
                      qubo={quboMatrix}
                      config={effectiveConfig}
                      onConvertToIsing={() => setMatrixTab('ising')}
                    />
                  ) : (
                    <IsingModelComp
                      ising={isingModel}
                      onProceedToQAOA={() => scrollTo('qaoa-solver')}
                    />
                  )}
                </div>
              </section>

              {/* Section 4: Results, Risk-Return & Classical Benchmark */}
              <section id="results" className="space-y-8 pt-6 border-t border-[#d45266]/30">
                <div className="space-y-2">
                  <div className="badge-quantum">Step 04 — Solution & Benchmark</div>
                  <h2 className="text-3xl font-extrabold text-[#3D0515]">Optimization Results & Benchmarks</h2>
                  <p className="text-[#5C0820] max-w-3xl leading-relaxed text-sm">
                    Analyze state vector measurement distribution, selected optimal portfolio, and classical vs quantum performance.
                  </p>
                </div>

                <MeasurementResults result={qaoaResult} assets={activeAssets} />

                <OptimalPortfolio optimal={qaoaResult?.bestFeasibleBitstring || qaoaResult?.mostProbableBitstring || null} />

                <RiskReturnLandscape candidates={candidatePortfolios} />

                <SharpeRatioAnalysis optimal={qaoaResult?.bestFeasibleBitstring || qaoaResult?.mostProbableBitstring || null} />

                <ResultsDashboard
                  qaoaResult={qaoaResult}
                  config={effectiveConfig}
                  onRunAgain={handleRunQAOA}
                  onScrollTo={scrollTo}
                />
              </section>
            </main>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;




