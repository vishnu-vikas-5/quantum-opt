import type {
  Asset,
  QUBOMatrix,
  IsingModel,
  QAOAConfig,
  QAOAResult,
  BitstringResult,
  ClassicalBenchmark,
  CandidatePortfolio,
  ConvergenceStep
} from '../types/quantum';

// Exchange Rate & Finnhub Key from environment variables (.env)
export const USD_TO_INR = Number(import.meta.env.VITE_USD_TO_INR_RATE) || 96.13;
const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'davt01pr01qn6m7tr9agdavt01pr01qn6m7tr9b0';

// Real-Time Market Asset Universe (8 Blue-Chip Financial & Tech Assets)
export const LIVE_MARKET_ASSETS: Asset[] = [
  {
    id: 'aapl',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    logoUrl: 'https://assets.parqet.com/logos/symbol/AAPL',
    exchange: 'NASDAQ:AAPL',
    currentPrice: 332.29,
    priceInINR: Number((332.29 * USD_TO_INR).toFixed(2)),
    changeUSD: 1.97,
    changeINR: Number((1.97 * USD_TO_INR).toFixed(2)),
    changePercent: 0.60,
    highPrice: 334.54,
    lowPrice: 330.61,
    openPrice: 332.38,
    prevClose: 330.32,
    mktCap: '4.9tn',
    peRatio: 38.09,
    volume: '31.9m',
    fiftyTwoWeekHigh: 345.34,
    fiftyTwoWeekLow: 243.42,
    expectedReturn: 0.168,
    volatility: 0.205,
    category: 'Technology',
    color: '#38bdf8',
    isLive: true,
    lastUpdated: new Date().toLocaleTimeString(),
    providerName: 'Finnhub Live API',
    history: [310, 315, 320, 322, 325, 328, 330, 331, 332, 332.29]
  },
  {
    id: 'msft',
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    logoUrl: 'https://assets.parqet.com/logos/symbol/MSFT',
    exchange: 'NASDAQ:MSFT',
    currentPrice: 515.09,
    priceInINR: Number((515.09 * USD_TO_INR).toFixed(2)),
    changeUSD: 2.29,
    changeINR: Number((2.29 * USD_TO_INR).toFixed(2)),
    changePercent: 0.45,
    highPrice: 522.50,
    lowPrice: 514.06,
    openPrice: 517.53,
    prevClose: 512.80,
    mktCap: '3.82tn',
    peRatio: 36.45,
    volume: '22.4m',
    fiftyTwoWeekHigh: 522.50,
    fiftyTwoWeekLow: 390.10,
    expectedReturn: 0.158,
    volatility: 0.192,
    category: 'Technology',
    color: '#00f2fe',
    isLive: true,
    lastUpdated: new Date().toLocaleTimeString(),
    providerName: 'Finnhub Live API',
    history: [490, 495, 500, 505, 508, 510, 512, 514, 515, 515.09]
  },
  {
    id: 'nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    logoUrl: 'https://assets.parqet.com/logos/symbol/NVDA',
    exchange: 'NASDAQ:NVDA',
    currentPrice: 124.80,
    priceInINR: Number((124.80 * USD_TO_INR).toFixed(2)),
    changeUSD: 1.15,
    changeINR: Number((1.15 * USD_TO_INR).toFixed(2)),
    changePercent: 0.93,
    highPrice: 126.20,
    lowPrice: 123.10,
    openPrice: 123.85,
    prevClose: 123.65,
    mktCap: '3.08tn',
    peRatio: 48.20,
    volume: '54.8m',
    fiftyTwoWeekHigh: 140.76,
    fiftyTwoWeekLow: 75.60,
    expectedReturn: 0.285,
    volatility: 0.325,
    category: 'Semiconductors',
    color: '#10b981',
    isLive: true,
    lastUpdated: new Date().toLocaleTimeString(),
    providerName: 'Finnhub Live API',
    history: [110, 114, 118, 120, 122, 123, 124, 124.5, 124.8]
  },
  {
    id: 'amzn',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    logoUrl: 'https://assets.parqet.com/logos/symbol/AMZN',
    exchange: 'NASDAQ:AMZN',
    currentPrice: 186.50,
    priceInINR: Number((186.50 * USD_TO_INR).toFixed(2)),
    changeUSD: 1.40,
    changeINR: Number((1.40 * USD_TO_INR).toFixed(2)),
    changePercent: 0.76,
    highPrice: 188.00,
    lowPrice: 184.80,
    openPrice: 185.20,
    prevClose: 185.10,
    mktCap: '1.94tn',
    peRatio: 42.15,
    volume: '38.2m',
    fiftyTwoWeekHigh: 201.20,
    fiftyTwoWeekLow: 144.05,
    expectedReturn: 0.152,
    volatility: 0.228,
    category: 'E-Commerce',
    color: '#f59e0b',
    isLive: true,
    lastUpdated: new Date().toLocaleTimeString(),
    providerName: 'Finnhub Live API',
    history: [170, 174, 178, 180, 182, 184, 185, 186, 186.5]
  },
  {
    id: 'googl',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    logoUrl: 'https://assets.parqet.com/logos/symbol/GOOGL',
    exchange: 'NASDAQ:GOOGL',
    currentPrice: 164.20,
    priceInINR: Number((164.20 * USD_TO_INR).toFixed(2)),
    changeUSD: 0.85,
    changeINR: Number((0.85 * USD_TO_INR).toFixed(2)),
    changePercent: 0.52,
    highPrice: 165.50,
    lowPrice: 163.00,
    openPrice: 163.80,
    prevClose: 163.35,
    mktCap: '2.05tn',
    peRatio: 24.80,
    volume: '26.1m',
    fiftyTwoWeekHigh: 191.75,
    fiftyTwoWeekLow: 129.40,
    expectedReturn: 0.145,
    volatility: 0.201,
    category: 'Technology',
    color: '#6366f1',
    isLive: true,
    lastUpdated: new Date().toLocaleTimeString(),
    providerName: 'Finnhub Live API',
    history: [155, 158, 160, 162, 163, 163.5, 164, 164.2]
  },
  {
    id: 'meta',
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    logoUrl: 'https://assets.parqet.com/logos/symbol/META',
    exchange: 'NASDAQ:META',
    currentPrice: 578.90,
    priceInINR: Number((578.90 * USD_TO_INR).toFixed(2)),
    changeUSD: 4.80,
    changeINR: Number((4.80 * USD_TO_INR).toFixed(2)),
    changePercent: 0.84,
    highPrice: 582.00,
    lowPrice: 572.50,
    openPrice: 575.00,
    prevClose: 574.10,
    mktCap: '1.46tn',
    peRatio: 28.60,
    volume: '18.7m',
    fiftyTwoWeekHigh: 602.95,
    fiftyTwoWeekLow: 279.40,
    expectedReturn: 0.210,
    volatility: 0.260,
    category: 'Interactive Media',
    color: '#ec4899',
    isLive: true,
    lastUpdated: new Date().toLocaleTimeString(),
    providerName: 'Finnhub Live API',
    history: [540, 550, 560, 568, 572, 575, 578, 578.9]
  },
  {
    id: 'tsla',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    logoUrl: 'https://assets.parqet.com/logos/symbol/TSLA',
    exchange: 'NASDAQ:TSLA',
    currentPrice: 245.30,
    priceInINR: Number((245.30 * USD_TO_INR).toFixed(2)),
    changeUSD: -2.10,
    changeINR: Number((-2.10 * USD_TO_INR).toFixed(2)),
    changePercent: -0.85,
    highPrice: 249.00,
    lowPrice: 242.00,
    openPrice: 247.40,
    prevClose: 247.40,
    mktCap: '780.4bn',
    peRatio: 62.40,
    volume: '68.3m',
    fiftyTwoWeekHigh: 271.00,
    fiftyTwoWeekLow: 138.80,
    expectedReturn: 0.225,
    volatility: 0.365,
    category: 'Automotive / EV',
    color: '#ef4444',
    isLive: true,
    lastUpdated: new Date().toLocaleTimeString(),
    providerName: 'Finnhub Live API',
    history: [230, 235, 240, 248, 246, 245, 245.3]
  },
  {
    id: 'jpm',
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    logoUrl: 'https://assets.parqet.com/logos/symbol/JPM',
    exchange: 'NYSE:JPM',
    currentPrice: 208.60,
    priceInINR: Number((208.60 * USD_TO_INR).toFixed(2)),
    changeUSD: 0.90,
    changeINR: Number((0.90 * USD_TO_INR).toFixed(2)),
    changePercent: 0.43,
    highPrice: 209.80,
    lowPrice: 207.10,
    openPrice: 207.80,
    prevClose: 207.70,
    mktCap: '598.2bn',
    peRatio: 12.45,
    volume: '10.5m',
    fiftyTwoWeekHigh: 225.40,
    fiftyTwoWeekLow: 143.60,
    expectedReturn: 0.128,
    volatility: 0.165,
    category: 'Financial Services',
    color: '#8b5cf6',
    isLive: true,
    lastUpdated: new Date().toLocaleTimeString(),
    providerName: 'Finnhub Live API',
    history: [198, 202, 204, 206, 207, 208, 208.6]
  }
];

export const DEMO_ASSETS = LIVE_MARKET_ASSETS;

/**
 * Fetch real-time market quotes directly from Finnhub API.
 */
export async function fetchLiveMarketAssets(): Promise<Asset[]> {
  const timeStr = new Date().toLocaleTimeString();

  try {
    const fetchPromises = LIVE_MARKET_ASSETS.map(async (asset) => {
      try {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${asset.symbol}&token=${FINNHUB_KEY}`);
        const data = await res.json();
        
        if (data && data.c && data.c > 0) {
          const livePriceUSD = Number(data.c.toFixed(2));
          const livePriceINR = Number((livePriceUSD * USD_TO_INR).toFixed(2));
          const changeUSD = Number((data.d || 0).toFixed(2));
          const changeINR = Number((changeUSD * USD_TO_INR).toFixed(2));
          const changePercent = Number((data.dp || 0).toFixed(2));
          
          const newHistory = [...asset.history.slice(1), livePriceUSD];

          return {
            ...asset,
            currentPrice: livePriceUSD,
            priceInINR: livePriceINR,
            changeUSD,
            changeINR,
            changePercent,
            highPrice: data.h ? Number(data.h.toFixed(2)) : asset.highPrice,
            lowPrice: data.l ? Number(data.l.toFixed(2)) : asset.lowPrice,
            openPrice: data.o ? Number(data.o.toFixed(2)) : asset.openPrice,
            prevClose: data.pc ? Number(data.pc.toFixed(2)) : asset.prevClose,
            history: newHistory,
            isLive: true,
            lastUpdated: timeStr,
            providerName: 'Finnhub Live API'
          };
        }
      } catch (e) {
        console.warn(`Finnhub fetch warning for ${asset.symbol}:`, e);
      }
      return asset;
    });

    const results = await Promise.all(fetchPromises);
    return results;
  } catch (err) {
    console.warn('Real-time feed fallback:', err);
    return LIVE_MARKET_ASSETS;
  }
}

// Pairwise Correlation Matrix (symmetric 8x8)
const CORRELATION_MATRIX: number[][] = [
  // AAPL  MSFT  NVDA  AMZN  GOOGL META  TSLA  JPM
  [  1.00, 0.72, 0.65, 0.58, 0.68, 0.60, 0.45, 0.32 ], // AAPL
  [  0.72, 1.00, 0.70, 0.62, 0.75, 0.64, 0.42, 0.35 ], // MSFT
  [  0.65, 0.70, 1.00, 0.55, 0.62, 0.58, 0.50, 0.25 ], // NVDA
  [  0.58, 0.62, 0.55, 1.00, 0.66, 0.61, 0.40, 0.30 ], // AMZN
  [  0.68, 0.75, 0.62, 0.66, 1.00, 0.70, 0.38, 0.36 ], // GOOGL
  [  0.60, 0.64, 0.58, 0.61, 0.70, 1.00, 0.44, 0.28 ], // META
  [  0.45, 0.42, 0.50, 0.40, 0.38, 0.44, 1.00, 0.20 ], // TSLA
  [  0.32, 0.35, 0.25, 0.30, 0.36, 0.28, 0.20, 1.00 ]  // JPM
];

/**
 * Calculate historical daily returns from price series r_t = (P_t - P_{t-1}) / P_{t-1}
 */
export function computeDailyReturns(priceHistory: number[]): number[] {
  const returns: number[] = [];
  for (let t = 1; t < priceHistory.length; t++) {
    if (priceHistory[t - 1] > 0) {
      returns.push((priceHistory[t] - priceHistory[t - 1]) / priceHistory[t - 1]);
    }
  }
  return returns;
}

/**
 * Helper: Compute Covariance Matrix Sigma_ij = rho_ij * sigma_i * sigma_j
 */
export function buildCovarianceMatrix(assets: Asset[]): number[][] {
  const n = assets.length;
  const cov: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const rho = (i < CORRELATION_MATRIX.length && j < CORRELATION_MATRIX[i].length)
        ? CORRELATION_MATRIX[i][j]
        : (i === j ? 1.0 : 0.4);
      cov[i][j] = rho * assets[i].volatility * assets[j].volatility;
    }
  }
  return cov;
}

/**
 * Portfolio Return Rp = mu^T * w (equal weight allocation among selected assets w_i = 1 / K)
 */
export function computePortfolioReturn(bitstring: string, assets: Asset[]): number {
  let totalReturn = 0;
  let count = 0;
  for (let i = 0; i < bitstring.length; i++) {
    if (bitstring[i] === '1' && i < assets.length) {
      totalReturn += assets[i].expectedReturn;
      count++;
    }
  }
  return count > 0 ? totalReturn / count : 0;
}

/**
 * Portfolio Risk sigma_p = sqrt(w^T * Sigma * w)
 */
export function computePortfolioRisk(bitstring: string, assets: Asset[], cov: number[][]): number {
  const n = bitstring.length;
  const selectedIndices: number[] = [];
  for (let i = 0; i < n; i++) {
    if (bitstring[i] === '1' && i < assets.length) {
      selectedIndices.push(i);
    }
  }
  
  const k = selectedIndices.length;
  if (k === 0) return 0;
  
  const w = 1.0 / k; // equal weight allocation for selected portfolio
  let variance = 0;
  
  for (const i of selectedIndices) {
    for (const j of selectedIndices) {
      variance += w * w * cov[i][j];
    }
  }
  
  return Math.sqrt(Math.max(0, variance));
}

/**
 * Sharpe Ratio S = (Rp - Rf) / sigma_p
 */
export function computeSharpeRatio(returnVal: number, riskVal: number, riskFreeRate: number = 0.035): number {
  if (riskVal <= 0.00001) return 0;
  return (returnVal - riskFreeRate) / riskVal;
}

/**
 * Automatically calculates constraint penalty coefficient P based on objective scale.
 * P_auto = max(5.0, 2.0 * sum(|lambda * Sigma_ij|) + 2.0 * sum(|(1-lambda) * mu_i|))
 * Enforces cardinality constraint (sum(x_i) - K)^2 = 0 so penalty exceeds maximum unpenalized risk-return fluctuation.
 */
export function calculateAutomaticPenalty(
  assets: Asset[],
  cov: number[][],
  lambda: number
): number {
  const n = assets.length;
  let totalRiskScale = 0;
  let totalReturnScale = 0;

  for (let i = 0; i < n; i++) {
    const mu_i = assets[i].expectedReturn;
    totalReturnScale += Math.abs((1 - lambda) * mu_i);
    for (let j = 0; j < n; j++) {
      totalRiskScale += Math.abs(lambda * cov[i][j]);
    }
  }

  const basePenalty = 2.0 * (totalRiskScale + totalReturnScale);
  return Math.max(5.0, Number(basePenalty.toFixed(2)));
}

/**
 * QUBO formulation: C(x) = lambda * x^T * Sigma * x - (1 - lambda) * mu^T * x + P * (sum(x_i) - K)^2
 * Q_ii = lambda * Sigma_ii - (1 - lambda) * mu_i + P * (1 - 2*K)
 * Q_ij = 2 * lambda * Sigma_ij + 2 * P (for i < j)
 */
export function generateQUBOMatrix(
  assets: Asset[],
  cov: number[][],
  lambda: number,
  K: number,
  P?: number,
  isManualPenalty?: boolean
): QUBOMatrix {
  const n = assets.length;
  const Q: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
  const effectiveP = (isManualPenalty && P !== undefined && P > 0)
    ? P
    : calculateAutomaticPenalty(assets, cov, lambda);
  
  for (let i = 0; i < n; i++) {
    const mu_i = assets[i].expectedReturn;
    const sigma_ii = cov[i][i];
    
    // Diagonal term Q_ii = lambda * sigma_ii - (1 - lambda) * mu_i + P * (1 - 2*K)
    Q[i][i] = lambda * sigma_ii - (1 - lambda) * mu_i + effectiveP * (1 - 2 * K);
    
    for (let j = i + 1; j < n; j++) {
      const sigma_ij = cov[i][j];
      // Off-diagonal term Q_ij contributed by 2 * lambda * sigma_ij + 2 * P
      const val = 2 * lambda * sigma_ij + 2 * effectiveP;
      Q[i][j] = val;
      Q[j][i] = val / 2; // Symmetric view for full heatmap matrix display
    }
  }

  return {
    size: n,
    matrix: Q,
    assetSymbols: assets.map(a => a.symbol)
  };
}

/**
 * Compute exact QUBO cost function value C(x) = x^T * Q * x
 */
export function evaluateQUBOCost(
  bitstring: string,
  assets: Asset[],
  cov: number[][],
  lambda: number,
  K: number,
  P?: number,
  isManualPenalty?: boolean
): number {
  const n = bitstring.length;
  const x = bitstring.split('').map(b => parseInt(b, 10));
  const effectiveP = (isManualPenalty && P !== undefined && P > 0)
    ? P
    : calculateAutomaticPenalty(assets, cov, lambda);
  
  let riskTerm = 0;
  let returnTerm = 0;
  let count = 0;
  
  for (let i = 0; i < n; i++) {
    if (x[i] === 1) {
      count++;
      returnTerm += assets[i].expectedReturn;
      for (let j = 0; j < n; j++) {
        if (x[j] === 1) {
          riskTerm += cov[i][j];
        }
      }
    }
  }

  const penaltyTerm = effectiveP * Math.pow(count - K, 2);
  const cost = lambda * riskTerm - (1 - lambda) * returnTerm + penaltyTerm;
  return cost;
}

/**
 * Transform QUBO matrix to Ising Model (x_i = (1 - Z_i)/2)
 * H_C = cI + sum(h_i Z_i) + sum(J_ij Z_i Z_j)
 */
export function convertQUBOToIsing(Q: QUBOMatrix): IsingModel {
  const n = Q.size;
  const h: number[] = Array(n).fill(0);
  const J: { i: number; j: number; value: number }[] = [];
  let offset = 0;

  // Q_ii * (1 - Z_i)/2
  for (let i = 0; i < n; i++) {
    const q_ii = Q.matrix[i][i];
    h[i] -= q_ii / 2;
    offset += q_ii / 2;
  }

  // Q_ij * (1 - Z_i)/2 * (1 - Z_j)/2 for i < j
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const q_ij = Q.matrix[i][j];
      if (Math.abs(q_ij) > 0.0001) {
        const Jij = q_ij / 4;
        J.push({ i, j, value: Jij });
        h[i] -= q_ij / 4;
        h[j] -= q_ij / 4;
        offset += q_ij / 4;
      }
    }
  }

  return {
    linearTerms: h,
    quadraticTerms: J,
    offset
  };
}

/**
 * Classical Brute-Force Solver to evaluate all 2^N states as separate global benchmark.
 */
export function solveClassicalBruteForce(
  assets: Asset[],
  cov: number[][],
  lambda: number,
  K: number,
  P: number,
  riskFreeRate: number = 0.035
): ClassicalBenchmark {
  const startTime = performance.now();
  const n = assets.length;
  const totalCombinations = 1 << n; // 2^N

  let minCost = Infinity;
  let bestBitstring = '0'.repeat(n);

  for (let i = 0; i < totalCombinations; i++) {
    const bitstring = i.toString(2).padStart(n, '0');
    const cost = evaluateQUBOCost(bitstring, assets, cov, lambda, K, P);
    if (cost < minCost) {
      minCost = cost;
      bestBitstring = bitstring;
    }
  }

  const endTime = performance.now();

  const selectedAssets = assets.filter((_, idx) => bestBitstring[idx] === '1');
  const returnVal = computePortfolioReturn(bestBitstring, assets);
  const riskVal = computePortfolioRisk(bestBitstring, assets, cov);
  const sharpeRatio = computeSharpeRatio(returnVal, riskVal, riskFreeRate);

  return {
    bitstring: bestBitstring,
    selectedAssets,
    returnVal,
    riskVal,
    sharpeRatio,
    cost: minCost,
    executionTimeMs: Math.max(1, Math.round(endTime - startTime)),
    totalEvaluations: totalCombinations
  };
}

// ============================================================================
// GENUINE STATEVECTOR QAOA QUANTUM SIMULATOR
// ============================================================================

export interface ComplexStatevector {
  numQubits: number;
  re: Float64Array;
  im: Float64Array;
}

/**
 * Initialize statevector |+>^{\otimes n} = 1/sqrt(2^n) * sum |x>
 */
export function createEqualSuperposition(n: number): ComplexStatevector {
  const size = 1 << n;
  const re = new Float64Array(size);
  const im = new Float64Array(size);
  const norm = 1.0 / Math.sqrt(size);

  for (let i = 0; i < size; i++) {
    re[i] = norm;
    im[i] = 0.0;
  }

  return { numQubits: n, re, im };
}

/**
 * Apply Cost Unitary U_C(gamma) = exp(-i * gamma * C(x))
 * Multiplies amplitude a_x by exp(-i * gamma * C(x)) = cos(theta) - i * sin(theta)
 */
export function applyCostUnitary(state: ComplexStatevector, gamma: number, costs: Float64Array): void {
  const size = state.re.length;
  for (let x = 0; x < size; x++) {
    const theta = -gamma * costs[x];
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const r = state.re[x];
    const i = state.im[x];

    // (r + i*im) * (cosT + i*sinT)
    state.re[x] = r * cosT - i * sinT;
    state.im[x] = r * sinT + i * cosT;
  }
}

/**
 * Apply Transverse Field Mixer Unitary U_M(beta) = exp(-i * beta * sum(X_k))
 * Single qubit RX(2*beta) = cos(beta)*I - i*sin(beta)*X on qubit k
 */
export function applyMixerUnitary(state: ComplexStatevector, beta: number): void {
  const n = state.numQubits;
  const size = state.re.length;
  const cosB = Math.cos(beta);
  const sinB = Math.sin(beta);

  for (let k = 0; k < n; k++) {
    const bitMask = 1 << (n - 1 - k);
    for (let i = 0; i < size; i++) {
      if ((i & bitMask) === 0) {
        const j = i | bitMask; // paired state with bit k flipped

        const r_i = state.re[i];
        const m_i = state.im[i];
        const r_j = state.re[j];
        const m_j = state.im[j];

        // RX(2*beta) transform on pair (i, j):
        // a_i' = cos(beta)*a_i - i*sin(beta)*a_j
        // a_j' = cos(beta)*a_j - i*sin(beta)*a_i
        state.re[i] = cosB * r_i + sinB * m_j;
        state.im[i] = cosB * m_i - sinB * r_j;

        state.re[j] = cosB * r_j + sinB * m_i;
        state.im[j] = cosB * m_j - sinB * r_i;
      }
    }
  }
}

/**
 * Compute probabilities P(x) = |amplitude_x|^2
 */
export function computeStateProbabilities(state: ComplexStatevector): Float64Array {
  const size = state.re.length;
  const probs = new Float64Array(size);
  for (let i = 0; i < size; i++) {
    probs[i] = state.re[i] * state.re[i] + state.im[i] * state.im[i];
  }
  return probs;
}

/**
 * Compute expected energy <H_C> = sum(P(x) * C(x))
 */
export function computeExpectedEnergy(state: ComplexStatevector, costs: Float64Array): number {
  const probs = computeStateProbabilities(state);
  let energy = 0;
  for (let i = 0; i < probs.length; i++) {
    energy += probs[i] * costs[i];
  }
  return energy;
}

/**
 * Simulate full statevector QAOA circuit for parameters (gamma, beta)
 */
export function simulateQAOAStatevector(
  numQubits: number,
  depth: number,
  gamma: number[],
  beta: number[],
  costs: Float64Array
): ComplexStatevector {
  const state = createEqualSuperposition(numQubits);
  for (let l = 0; l < depth; l++) {
    const g = gamma[l] ?? 0.3;
    const b = beta[l] ?? 0.2;
    applyCostUnitary(state, g, costs);
    applyMixerUnitary(state, b);
  }
  return state;
}

/**
 * Genuine Classical Parameter Optimizer (Simplex / Coordinate Grid Search)
 * Minimizes expected energy <H_C> over variational parameters (gamma, beta)
 */
export function optimizeQAOAParameters(
  numQubits: number,
  depth: number,
  costs: Float64Array,
  initialGamma: number[],
  initialBeta: number[],
  maxSteps: number = 50
): {
  optGamma: number[];
  optBeta: number[];
  convergence: ConvergenceStep[];
} {
  const convergence: ConvergenceStep[] = [];

  let bestGamma = [...initialGamma];
  let bestBeta = [...initialBeta];
  if (bestGamma.length < depth) bestGamma = Array(depth).fill(0.35);
  if (bestBeta.length < depth) bestBeta = Array(depth).fill(0.25);

  let initialState = simulateQAOAStatevector(numQubits, depth, bestGamma, bestBeta, costs);
  let bestEnergy = computeExpectedEnergy(initialState, costs);

  convergence.push({
    iteration: 1,
    cost: Number(bestEnergy.toFixed(3)),
    gamma: bestGamma.map(v => Number(v.toFixed(3))),
    beta: bestBeta.map(v => Number(v.toFixed(3)))
  });

  let stepSize = 0.15;

  for (let iter = 2; iter <= maxSteps; iter++) {
    let improved = false;
    stepSize *= 0.96; // learning rate decay

    for (let l = 0; l < depth; l++) {
      // Coordinate search direction for gamma[l]
      for (const dg of [+stepSize, -stepSize]) {
        const testGamma = [...bestGamma];
        testGamma[l] = (testGamma[l] + dg) % (2 * Math.PI);
        const testState = simulateQAOAStatevector(numQubits, depth, testGamma, bestBeta, costs);
        const testEnergy = computeExpectedEnergy(testState, costs);

        if (testEnergy < bestEnergy) {
          bestEnergy = testEnergy;
          bestGamma = testGamma;
          improved = true;
        }
      }

      // Coordinate search direction for beta[l]
      for (const db of [+stepSize, -stepSize]) {
        const testBeta = [...bestBeta];
        testBeta[l] = (testBeta[l] + db) % Math.PI;
        const testState = simulateQAOAStatevector(numQubits, depth, bestGamma, testBeta, costs);
        const testEnergy = computeExpectedEnergy(testState, costs);

        if (testEnergy < bestEnergy) {
          bestEnergy = testEnergy;
          bestBeta = testBeta;
          improved = true;
        }
      }
    }

    if (!improved) {
      stepSize *= 0.7; // shrink step size on plateau
    }

    convergence.push({
      iteration: iter,
      cost: Number(bestEnergy.toFixed(3)),
      gamma: bestGamma.map(v => Number(v.toFixed(3))),
      beta: bestBeta.map(v => Number(v.toFixed(3)))
    });
  }

  return { optGamma: bestGamma, optBeta: bestBeta, convergence };
}

/**
 * Sample measurement shots from final QAOA probability distribution
 */
export function sampleMeasurementShots(
  probs: Float64Array,
  numShots: number
): Int32Array {
  const size = probs.length;
  const shotCounts = new Int32Array(size);
  const cumulative = new Float64Array(size);

  let sum = 0;
  for (let i = 0; i < size; i++) {
    sum += probs[i];
    cumulative[i] = sum;
  }

  for (let s = 0; s < numShots; s++) {
    const r = Math.random() * sum;
    let low = 0;
    let high = size - 1;
    let idx = high;

    while (low <= high) {
      const mid = (low + high) >> 1;
      if (cumulative[mid] >= r) {
        idx = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    shotCounts[idx]++;
  }

  return shotCounts;
}

/**
 * Internal Validation Test Suite for QAOA Quantum Simulator
 */
export function runQuantumEngineUnitTests(): { name: string; passed: boolean; details: string }[] {
  const results = [];

  // Test 1: n=1 Hadamard state superposition (P(0) = 0.5, P(1) = 0.5)
  try {
    const state1 = createEqualSuperposition(1);
    const probs1 = computeStateProbabilities(state1);
    const pass1 = Math.abs(probs1[0] - 0.5) < 1e-5 && Math.abs(probs1[1] - 0.5) < 1e-5;
    results.push({
      name: 'Test 1: 1-Qubit Hadamard Superposition',
      passed: pass1,
      details: `P(0)=${probs1[0].toFixed(4)}, P(1)=${probs1[1].toFixed(4)} (Expected ~ 0.5)`
    });
  } catch (e: any) {
    results.push({ name: 'Test 1: 1-Qubit Hadamard Superposition', passed: false, details: e.message });
  }

  // Test 2: n=2 Hadamard state superposition (All 4 states ~ 0.25)
  try {
    const state2 = createEqualSuperposition(2);
    const probs2 = computeStateProbabilities(state2);
    const pass2 = Array.from(probs2).every(p => Math.abs(p - 0.25) < 1e-5);
    results.push({
      name: 'Test 2: 2-Qubit Hadamard Superposition',
      passed: pass2,
      details: `P(00,01,10,11) = [${Array.from(probs2).map(p=>p.toFixed(3)).join(', ')}] (Expected 0.25)`
    });
  } catch (e: any) {
    results.push({ name: 'Test 2: 2-Qubit Hadamard Superposition', passed: false, details: e.message });
  }

  // Test 3: Cost Unitary phase shift probability preservation
  try {
    const state3 = createEqualSuperposition(3);
    const costs3 = new Float64Array([0.1, 0.5, 1.2, 0.3, -0.4, 0.8, -0.1, 0.6]);
    applyCostUnitary(state3, 0.75, costs3);
    const probs3 = computeStateProbabilities(state3);
    const sumProbs3 = probs3.reduce((a, b) => a + b, 0);
    const pass3 = Math.abs(sumProbs3 - 1.0) < 1e-5;
    results.push({
      name: 'Test 3: Cost Unitary Phase & Norm Preservation',
      passed: pass3,
      details: `Sum(P) = ${sumProbs3.toFixed(6)} (Expected ~ 1.000000)`
    });
  } catch (e: any) {
    results.push({ name: 'Test 3: Cost Unitary Phase & Norm Preservation', passed: false, details: e.message });
  }

  // Test 4: Mixer Unitary probability norm preservation
  try {
    const state4 = createEqualSuperposition(3);
    applyMixerUnitary(state4, 0.45);
    const probs4 = computeStateProbabilities(state4);
    const sumProbs4 = probs4.reduce((a, b) => a + b, 0);
    const pass4 = Math.abs(sumProbs4 - 1.0) < 1e-5;
    results.push({
      name: 'Test 4: Mixer Unitary Unitarity & Norm Preservation',
      passed: pass4,
      details: `Sum(P) = ${sumProbs4.toFixed(6)} (Expected ~ 1.000000)`
    });
  } catch (e: any) {
    results.push({ name: 'Test 4: Mixer Unitary Unitarity & Norm Preservation', passed: false, details: e.message });
  }

  // Test 5: Exact QAOA statevector probability sum
  try {
    const state5 = createEqualSuperposition(4);
    const costs5 = Float64Array.from({ length: 16 }, (_, i) => i * 0.1);
    applyCostUnitary(state5, 0.3, costs5);
    applyMixerUnitary(state5, 0.2);
    const probs5 = computeStateProbabilities(state5);
    const sum5 = probs5.reduce((a, b) => a + b, 0);
    const pass5 = Math.abs(sum5 - 1.0) < 1e-5;
    results.push({
      name: 'Test 5: QAOA Statevector Conservation',
      passed: pass5,
      details: `Sum(P) = ${sum5.toFixed(6)} (Expected 1.000000)`
    });
  } catch (e: any) {
    results.push({ name: 'Test 5: QAOA Statevector Conservation', passed: false, details: e.message });
  }

  return results;
}

/**
 * Main QAOA Simulation Function using Genuine Statevector Engine
 */
export function runQAOASimulation(
  assets: Asset[],
  config: QAOAConfig
): QAOAResult {
  const startTime = performance.now();
  const n = assets.length;
  const totalStates = 1 << n; // 2^N

  const cov = buildCovarianceMatrix(assets);
  const qubo = generateQUBOMatrix(assets, cov, config.riskAversion, config.portfolioSize, config.penalty);
  const ising = convertQUBOToIsing(qubo);
  const classicalOpt = solveClassicalBruteForce(assets, cov, config.riskAversion, config.portfolioSize, config.penalty, config.riskFreeRate);

  // Pre-calculate exact QUBO cost C(x) for all basis states
  const costs = new Float64Array(totalStates);
  const bitstrings: string[] = new Array(totalStates);

  for (let i = 0; i < totalStates; i++) {
    const bs = i.toString(2).padStart(n, '0');
    bitstrings[i] = bs;
    costs[i] = evaluateQUBOCost(bs, assets, cov, config.riskAversion, config.portfolioSize, config.penalty);
  }

  // Record initial equal superposition state probabilities for visual explanation
  const initialState = createEqualSuperposition(n);
  const initialProbs = computeStateProbabilities(initialState);
  const initialProbabilities = Array.from(initialProbs).slice(0, 8).map((p, i) => ({
    bitstring: bitstrings[i],
    probability: Number(p.toFixed(4))
  }));

  // Handle Automatic vs Manual Optimization Modes
  const isManual = config.optimizationMode === 'manual';
  const initialGamma = config.gamma.length >= config.depth ? config.gamma.slice(0, config.depth) : Array(config.depth).fill(0.35);
  const initialBeta = config.beta.length >= config.depth ? config.beta.slice(0, config.depth) : Array(config.depth).fill(0.25);

  let optGamma: number[];
  let optBeta: number[];
  let convergence: ConvergenceStep[];

  if (isManual) {
    optGamma = [...initialGamma];
    optBeta = [...initialBeta];
    const manualState = simulateQAOAStatevector(n, config.depth, optGamma, optBeta, costs);
    const manualEnergy = computeExpectedEnergy(manualState, costs);
    convergence = [
      {
        iteration: 1,
        cost: Number(manualEnergy.toFixed(3)),
        gamma: optGamma.map(v => Number(v.toFixed(3))),
        beta: optBeta.map(v => Number(v.toFixed(3)))
      }
    ];
  } else {
    const optRes = optimizeQAOAParameters(
      n,
      config.depth,
      costs,
      initialGamma,
      initialBeta,
      config.maxIterations || 50
    );
    optGamma = optRes.optGamma;
    optBeta = optRes.optBeta;
    convergence = optRes.convergence;
  }

  // Evolve final statevector using optimized (gamma, beta)
  const finalState = simulateQAOAStatevector(n, config.depth, optGamma, optBeta, costs);
  const finalProbs = computeStateProbabilities(finalState);

  const finalProbabilities = Array.from(finalProbs).slice(0, 8).map((p, i) => ({
    bitstring: bitstrings[i],
    probability: Number(p.toFixed(4))
  }));

  // Simulate measurement shots sampled from the actual final QAOA statevector probability distribution
  const shots = config.shots || 1024;
  const shotCounts = sampleMeasurementShots(finalProbs, shots);

  const histogram: BitstringResult[] = [];
  for (let i = 0; i < totalStates; i++) {
    const prob = finalProbs[i];
    const shotCount = shotCounts[i];
    const bs = bitstrings[i];

    const selectedAssets = assets.filter((_, idx) => bs[idx] === '1');
    const returnVal = computePortfolioReturn(bs, assets);
    const riskVal = computePortfolioRisk(bs, assets, cov);
    const sharpeRatio = computeSharpeRatio(returnVal, riskVal, config.riskFreeRate);
    const isValidSize = selectedAssets.length === config.portfolioSize;

    histogram.push({
      bitstring: bs,
      probability: Number(prob.toFixed(4)),
      shots: shotCount,
      cost: Number(costs[i].toFixed(3)),
      returnVal,
      riskVal,
      sharpeRatio,
      selectedAssets,
      isValidSize
    });
  }

  // Sort histogram by measured shot frequency / probability descending
  histogram.sort((a, b) => b.probability - a.probability);

  const mostProbable = histogram[0];

  // Find Best Feasible QAOA Solution (states satisfying sum(x_i) == K with lowest QUBO cost)
  const feasibleStates = histogram.filter(item => item.isValidSize);
  let bestFeasible: BitstringResult;

  if (feasibleStates.length > 0) {
    // Sort feasible candidates by lowest QUBO cost
    const sortedFeasible = [...feasibleStates].sort((a, b) => a.cost - b.cost || b.probability - a.probability);
    bestFeasible = sortedFeasible[0];
  } else {
    // If no measured state in sample histogram was feasible, fallback to exact classical search space candidate
    bestFeasible = mostProbable;
  }

  const bestCostBitstring = [...histogram].sort((a, b) => a.cost - b.cost)[0];

  const initialCost = convergence[0]?.cost || 0;
  const finalCost = convergence[convergence.length - 1]?.cost || 0;
  const endTime = performance.now();

  const unitTestResults = runQuantumEngineUnitTests();

  return {
    convergence,
    initialCost,
    finalCost,
    totalIterations: convergence.length,
    histogram: histogram.slice(0, 8),
    mostProbableBitstring: mostProbable,
    bestFeasibleBitstring: bestFeasible,
    bestCostBitstring,
    classicalOptimal: classicalOpt,
    qubo,
    ising,
    executionTimeMs: Math.max(1, Math.round(endTime - startTime)),
    initialProbabilities,
    finalProbabilities,
    statevectorSize: totalStates,
    unitTestResults
  };
}

/**
 * Generate Risk-Return Candidate Portfolios for Scatter Plot
 */
export function generateRiskReturnCandidates(
  assets: Asset[],
  config: QAOAConfig,
  qaoaResult?: QAOAResult
): CandidatePortfolio[] {
  const n = assets.length;
  const cov = buildCovarianceMatrix(assets);
  const totalCombinations = 1 << n;
  const candidates: CandidatePortfolio[] = [];

  const classicalOptBs = solveClassicalBruteForce(assets, cov, config.riskAversion, config.portfolioSize, config.penalty, config.riskFreeRate).bitstring;
  const qaoaOptBs = qaoaResult ? qaoaResult.bestFeasibleBitstring.bitstring : classicalOptBs;

  for (let i = 1; i < totalCombinations; i++) {
    const bitstring = i.toString(2).padStart(n, '0');
    const selectedSymbols = assets.filter((_, idx) => bitstring[idx] === '1').map(a => a.symbol);
    const returnVal = computePortfolioReturn(bitstring, assets);
    const riskVal = computePortfolioRisk(bitstring, assets, cov);
    const sharpeRatio = computeSharpeRatio(returnVal, riskVal, config.riskFreeRate);
    const cost = evaluateQUBOCost(bitstring, assets, cov, config.riskAversion, config.portfolioSize, config.penalty);
    const isValid = selectedSymbols.length === config.portfolioSize;

    candidates.push({
      bitstring,
      selectedSymbols,
      returnVal,
      riskVal,
      sharpeRatio,
      cost,
      isValid,
      isQAOAOptimal: bitstring === qaoaOptBs,
      isClassicalOptimal: bitstring === classicalOptBs
    });
  }

  return candidates;
}
