import React, { useState } from 'react';
import type { Asset } from '../types/quantum';
import { USD_TO_INR } from '../utils/quantumEngine';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { 
  RefreshCw, 
  Search, 
  IndianRupee, 
  DollarSign, 
  Layers, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart3,
  Globe
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StockDetailsPageProps {
  assets: Asset[];
  onRefreshFeed: () => void;
  isRefreshing: boolean;
}

export const StockDetailsPage: React.FC<StockDetailsPageProps> = ({
  assets,
  onRefreshFeed,
  isRefreshing
}) => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [selectedStockId, setSelectedStockId] = useState<string>(assets[0]?.id || 'aapl');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const selectedStock = assets.find(a => a.id === selectedStockId) || assets[0];

  const categories = ['ALL', ...Array.from(new Set(assets.map(a => a.category)))];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (priceUSD?: number) => {
    if (priceUSD === undefined) return 'N/A';
    if (currency === 'INR') {
      const inrVal = priceUSD * USD_TO_INR;
      return `₹${inrVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${priceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatChange = (changeUSD?: number, changePercent?: number) => {
    if (changeUSD === undefined || changePercent === undefined) return null;
    const isPositive = changeUSD >= 0;
    const Icon = isPositive ? ArrowUpRight : ArrowDownRight;
    const colorClass = isPositive ? 'text-emerald-400' : 'text-rose-400';

    if (currency === 'INR') {
      const inrChange = changeUSD * USD_TO_INR;
      const sign = isPositive ? '+' : '';
      return (
        <span className={`inline-flex items-center gap-0.5 font-bold font-mono ${colorClass}`}>
          <Icon className="w-4 h-4" />
          {sign}₹{Math.abs(inrChange).toFixed(2)} ({sign}{changePercent.toFixed(2)}%)
        </span>
      );
    }
    const sign = isPositive ? '+' : '';
    return (
      <span className={`inline-flex items-center gap-0.5 font-bold font-mono ${colorClass}`}>
        <Icon className="w-4 h-4" />
        {sign}${Math.abs(changeUSD).toFixed(2)} ({sign}{changePercent.toFixed(2)}%)
      </span>
    );
  };

  // Prepare Chart.js Dataset for Selected Stock History
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const chartLabels = months.slice(0, selectedStock?.history.length || 10);
  const chartValues = (selectedStock?.history || []).map(val => 
    currency === 'INR' ? Number((val * USD_TO_INR).toFixed(2)) : val
  );

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: `${selectedStock?.symbol || ''} Price (${currency === 'INR' ? '₹ INR' : '$ USD'})`,
        data: chartValues,
        borderColor: selectedStock?.color || '#ff6b7d',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(212, 82, 102, 0.45)');
          gradient.addColorStop(1, 'rgba(212, 82, 102, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: selectedStock?.color || '#ff6b7d',
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#140307',
        borderColor: '#d45266',
        borderWidth: 1,
        titleColor: '#ffffff',
        bodyColor: '#f4eada',
        titleFont: { family: 'JetBrains Mono, monospace', size: 13 },
        bodyFont: { family: 'JetBrains Mono, monospace', size: 12 },
        padding: 12,
        callbacks: {
          label: (context: any) => {
            const val = context.raw;
            return currency === 'INR'
              ? ` Price: ₹${val.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
              : ` Price: $${val.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(212, 82, 102, 0.1)' },
        ticks: { color: '#cdaea0', font: { family: 'JetBrains Mono, monospace', size: 11 } }
      },
      y: {
        grid: { color: 'rgba(212, 82, 102, 0.1)' },
        ticks: {
          color: '#cdaea0',
          font: { family: 'JetBrains Mono, monospace', size: 11 },
          callback: (value: any) => currency === 'INR' ? `₹${value}` : `$${value}`
        }
      }
    }
  };

  return (
    <div className="space-y-8 py-6 animate-fade-in">
      
      {/* Top Banner & Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="badge-quantum flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>Standalone Market Analytics Page</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#3D0515] flex items-center gap-3">
            <span>Stock Details & Real-Time Price Graphs</span>
          </h1>
          <p className="text-[#5C0820] max-w-2xl leading-relaxed text-sm">
            Comprehensive real-time stock analysis powered by Finnhub API with live valuations in Indian Rupees (₹ INR).
          </p>
        </div>

        {/* Currency Toggle & Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Live Rate Badge */}
          <div className="px-3.5 py-2 rounded-xl bg-[#24050e] border border-[#d45266]/40 text-xs font-mono text-[#f4eada] shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>1 USD = ₹{USD_TO_INR.toFixed(2)} INR</span>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center p-1 rounded-xl bg-[#24050e] border border-[#d45266]/40">
            <button
              onClick={() => setCurrency('INR')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                currency === 'INR'
                  ? 'bg-gradient-to-r from-[#d45266] to-[#7c0b2b] text-white shadow-sm'
                  : 'text-[#cdaea0] hover:text-white'
              }`}
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Rupees (₹)</span>
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                currency === 'USD'
                  ? 'bg-gradient-to-r from-[#d45266] to-[#7c0b2b] text-white shadow-sm'
                  : 'text-[#cdaea0] hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Dollars ($)</span>
            </button>
          </div>

          {/* Refresh Live API */}
          <button
            onClick={onRefreshFeed}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d45266] to-[#7c0b2b] hover:from-[#e86070] hover:to-[#961036] text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Fetching Quotes...' : 'Fetch Finnhub API'}</span>
          </button>
        </div>
      </div>

      {/* Main Feature 1: Standalone Stock Price Chart Component */}
      {selectedStock && (
        <div className="glass-card p-6 border border-[#d45266]/50 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3d0817] pb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-extrabold text-xl text-white shadow-lg"
                style={{ backgroundColor: selectedStock.color }}
              >
                {selectedStock.symbol.slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-extrabold text-white font-mono">{selectedStock.symbol}</h2>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#24050e] text-[#ff6b7d] border border-[#d45266]/40 font-bold">
                    {selectedStock.category}
                  </span>
                </div>
                <p className="text-xs text-[#cdaea0]">{selectedStock.name}</p>
              </div>
            </div>

            {/* Price & Change Banner */}
            <div className="text-right space-y-0.5">
              <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
                {formatPrice(selectedStock.currentPrice)}
              </div>
              <div>{formatChange(selectedStock.changeUSD, selectedStock.changePercent)}</div>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#cdaea0]">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <BarChart3 className="w-4 h-4 text-[#ff6b7d]" />
                12-Month Price Trend Chart ({currency === 'INR' ? '₹ INR' : '$ USD'})
              </span>
              <span>Updated: {selectedStock.lastUpdated || 'Live Finnhub Feed'}</span>
            </div>

            <div className="h-72 w-full p-4 rounded-2xl bg-[#24050e]/80 border border-[#d45266]/30">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Technical Market Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono pt-2">
            <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/30 space-y-1">
              <span className="text-[10px] text-[#cdaea0] block">Day High</span>
              <span className="text-white font-bold text-sm">
                {formatPrice(selectedStock.highPrice)}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/30 space-y-1">
              <span className="text-[10px] text-[#cdaea0] block">Day Low</span>
              <span className="text-white font-bold text-sm">
                {formatPrice(selectedStock.lowPrice)}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/30 space-y-1">
              <span className="text-[10px] text-[#cdaea0] block">Expected Annual Return</span>
              <span className="text-emerald-400 font-bold text-sm">
                +{(selectedStock.expectedReturn * 100).toFixed(1)}% / yr
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/30 space-y-1">
              <span className="text-[10px] text-[#cdaea0] block">Annual Volatility (Risk)</span>
              <span className="text-amber-300 font-bold text-sm">
                {(selectedStock.volatility * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Feature 2: All Stock Cards Grid with Selection */}
      <div className="space-y-4">
        <div className="glass-card p-4 border border-[#d45266]/30 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-[#8c6759] absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company name or symbol (AAPL, NVDA, TSLA)..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#24050e] border border-[#d45266]/40 text-xs font-mono text-white placeholder-[#8c6759] focus:outline-none focus:border-[#ff6b7d]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#d45266] text-white shadow-sm'
                    : 'bg-[#24050e] text-[#cdaea0] hover:text-white hover:bg-[#380816]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stock Cards Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => {
            const isSelectedChart = selectedStockId === asset.id;
            const inrPrice = (asset.currentPrice || 0) * USD_TO_INR;

            return (
              <div
                key={asset.id}
                onClick={() => setSelectedStockId(asset.id)}
                className={`glass-card p-5 border transition-all cursor-pointer select-none ${
                  isSelectedChart
                    ? 'border-[#ff6b7d] bg-[#700a27] shadow-xl shadow-[#7c0b2b]/50 scale-[1.02]'
                    : 'border-[#d45266]/30 bg-[#4a0619]/70 hover:border-[#d45266]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-lg text-white" style={{ color: asset.color }}>
                      {asset.symbol}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#24050e] text-[#cdaea0]">
                      {asset.category}
                    </span>
                  </div>
                  {isSelectedChart && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff6b7d] text-white font-bold">
                      Viewing Graph
                    </span>
                  )}
                </div>

                <div className="text-xs text-white font-medium truncate mb-3">
                  {asset.name}
                </div>

                <div className="p-2.5 rounded-xl bg-[#24050e] border border-[#d45266]/30 space-y-1">
                  <div className="text-lg font-extrabold font-mono text-white">
                    {currency === 'INR'
                      ? `₹${inrPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
                      : `$${asset.currentPrice?.toFixed(2)}`}
                  </div>
                  <div>{formatChange(asset.changeUSD, asset.changePercent)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Feature 3: Full Market Data Table */}
      <div className="glass-card p-6 border border-[#d45266]/40 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#ff6b7d]" />
            Complete Universe Finnhub Real-Time Valuation Table
          </h3>
          <span className="text-xs font-mono text-[#cdaea0]">
            8 Assets Active • 1 USD = ₹{USD_TO_INR.toFixed(2)} INR
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-[#3d0817] text-[#ff6b7d]">
                <th className="p-3">Ticker</th>
                <th className="p-3">Company Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price (₹ INR)</th>
                <th className="p-3">Price ($ USD)</th>
                <th className="p-3">Day Change</th>
                <th className="p-3">Day High / Low (₹)</th>
                <th className="p-3">Expected Return</th>
                <th className="p-3">Risk</th>
                <th className="p-3">Graph</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => {
                const inrPrice = (asset.currentPrice || 0) * USD_TO_INR;
                const highINR = (asset.highPrice || asset.currentPrice || 0) * USD_TO_INR;
                const lowINR = (asset.lowPrice || asset.currentPrice || 0) * USD_TO_INR;
                const isSelected = selectedStockId === asset.id;

                return (
                  <tr
                    key={asset.id}
                    onClick={() => setSelectedStockId(asset.id)}
                    className={`border-b border-[#3d0817]/60 cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#700a27]/60 font-bold' : 'hover:bg-[#24050e]'
                    }`}
                  >
                    <td className="p-3 font-bold text-white" style={{ color: asset.color }}>
                      {asset.symbol}
                    </td>
                    <td className="p-3 text-[#f4eada] font-semibold">{asset.name}</td>
                    <td className="p-3 text-[#cdaea0]">{asset.category}</td>
                    <td className="p-3 font-bold text-white">
                      ₹{inrPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-[#f4eada]">
                      ${asset.currentPrice?.toFixed(2)}
                    </td>
                    <td className="p-3">
                      {formatChange(asset.changeUSD, asset.changePercent)}
                    </td>
                    <td className="p-3 text-[#cdaea0]">
                      ₹{lowINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })} - ₹{highINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </td>
                    <td className="p-3 text-emerald-400 font-bold">
                      +{(asset.expectedReturn * 100).toFixed(1)}%
                    </td>
                    <td className="p-3 text-amber-300 font-bold">
                      {(asset.volatility * 100).toFixed(1)}%
                    </td>
                    <td className="p-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStockId(asset.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-2.5 py-1 rounded bg-[#24050e] hover:bg-[#d45266] text-white border border-[#d45266]/40 text-[10px] font-bold transition-all"
                      >
                        View Graph
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
