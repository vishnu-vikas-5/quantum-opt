export type ApiProvider = 'finnhub' | 'alphavantage' | 'polygon' | 'fmp' | 'coingecko' | 'simulated';

export interface ApiConfig {
  provider: ApiProvider;
  apiKey: string;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  expectedReturn: number; // e.g. 0.165 (16.5%)
  volatility: number;     // e.g. 0.220 (22.0%)
  category: string;
  color: string;
  logoUrl?: string;       // Stock brand logo URL
  history: number[];      // 12-month normalized price trend for visual cards
  currentPrice?: number;  // Real-time market price ($ USD)
  priceInINR?: number;    // Real-time market price (₹ INR)
  changeUSD?: number;     // Daily price change ($ USD)
  changeINR?: number;     // Daily price change (₹ INR)
  changePercent?: number; // Daily price change (%)
  highPrice?: number;     // Day High ($ USD)
  lowPrice?: number;      // Day Low ($ USD)
  openPrice?: number;     // Day Open ($ USD)
  prevClose?: number;     // Previous Close ($ USD)
  mktCap?: string;        // Market capitalization (e.g. "4.9tn")
  peRatio?: number;       // Price-to-earnings ratio (e.g. 38.09)
  volume?: string;        // Daily trading volume (e.g. "31.9m")
  fiftyTwoWeekHigh?: number; // 52-Week High ($ USD)
  fiftyTwoWeekLow?: number;  // 52-Week Low ($ USD)
  exchange?: string;      // Stock exchange & symbol string (e.g. "NASDAQ:AAPL")
  lastUpdated?: string;   // Real-time timestamp
  isLive?: boolean;       // Flag indicating live market data feed
  providerName?: string;  // Name of financial provider used
}




export interface QUBOMatrix {
  size: number;
  matrix: number[][];    // Q_ij matrix values
  assetSymbols: string[];
}

export interface IsingModel {
  linearTerms: number[];    // h_i values
  quadraticTerms: { i: number; j: number; value: number }[]; // J_ij values
  offset: number;
}

export interface QAOAConfig {
  riskAversion: number;  // lambda (0 to 1)
  portfolioSize: number; // K (number of assets to select)
  penalty: number;       // P constraint penalty parameter
  depth: number;         // p (1, 2, or 3)
  gamma: number[];       // cost unitary parameters [gamma_1, gamma_2, ...]
  beta: number[];        // mixer unitary parameters [beta_1, beta_2, ...]
  shots: number;         // measurement shots (default 1000)
  riskFreeRate: number;  // R_f (default 0.035 / 3.5%)
  optimizationMode?: 'auto' | 'manual'; // Default 'auto'
  optimizerName?: string; // Default 'COBYLA'
  maxIterations?: number; // Default 50
  isManualPenalty?: boolean; // Default false (auto calculated P)
  autoPenalty?: number; // Computed automatic P value
}

export interface ConvergenceStep {
  iteration: number;
  cost: number;
  gamma: number[];
  beta: number[];
}

export interface BitstringResult {
  bitstring: string;
  probability: number;
  shots: number;
  cost: number;
  returnVal: number;
  riskVal: number;
  sharpeRatio: number;
  selectedAssets: Asset[];
  isValidSize: boolean;
}

export interface ClassicalBenchmark {
  bitstring: string;
  selectedAssets: Asset[];
  returnVal: number;
  riskVal: number;
  sharpeRatio: number;
  cost: number;
  executionTimeMs: number;
  totalEvaluations: number;
}

export interface QAOAResult {
  convergence: ConvergenceStep[];
  initialCost: number;
  finalCost: number;
  totalIterations: number;
  histogram: BitstringResult[];
  mostProbableBitstring: BitstringResult;
  bestFeasibleBitstring: BitstringResult;
  bestCostBitstring: BitstringResult;
  classicalOptimal: ClassicalBenchmark;
  qubo: QUBOMatrix;
  ising: IsingModel;
  executionTimeMs: number;
  initialProbabilities?: { bitstring: string; probability: number }[];
  finalProbabilities?: { bitstring: string; probability: number }[];
  statevectorSize?: number;
  unitTestResults?: { name: string; passed: boolean; details: string }[];
}

export interface CandidatePortfolio {
  bitstring: string;
  selectedSymbols: string[];
  returnVal: number;
  riskVal: number;
  sharpeRatio: number;
  cost: number;
  isValid: boolean;
  isQAOAOptimal?: boolean;
  isClassicalOptimal?: boolean;
}
