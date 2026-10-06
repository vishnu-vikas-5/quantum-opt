import React, { useState } from 'react';
import type { Asset } from '../types/quantum';
import { USD_TO_INR } from '../utils/quantumEngine';
import { 
  RefreshCw, 
  Search, 
  IndianRupee, 
  DollarSign, 
  Layers, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { StockLogo } from './StockLogo';
import { GoogleFinanceChart } from './GoogleFinanceChart';

interface StockDetailsProps {
  assets: Asset[];
  onRefreshFeed: () => void;
  isRefreshing: boolean;
}

export const StockDetails: React.FC<StockDetailsProps> = ({
  assets,
  onRefreshFeed,
  isRefreshing
}) => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStockId, setSelectedStockId] = useState<string>(assets[0]?.id || 'aapl');

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
          <Icon className="w-3.5 h-3.5" />
          {sign}₹{Math.abs(inrChange).toFixed(2)} ({sign}{changePercent.toFixed(2)}%)
        </span>
      );
    }
    const sign = isPositive ? '+' : '';
    return (
      <span className={`inline-flex items-center gap-0.5 font-bold font-mono ${colorClass}`}>
        <Icon className="w-3.5 h-3.5" />
        {sign}${Math.abs(changeUSD).toFixed(2)} ({sign}{changePercent.toFixed(2)}%)
      </span>
    );
  };

  return (
    <section id="stock-details" className="space-y-8 pt-6 border-t border-[#d45266]/30">
      
      {/* Section Header & Exchange Rate Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="badge-quantum">Live Market View — Finnhub API</div>
          <h2 className="text-3xl font-extrabold text-[#3D0515] flex items-center gap-3">
            <span>Stock Details & Valuation</span>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-800 border border-emerald-500/40 font-mono font-bold">
              INR ₹ & USD $
            </span>
          </h2>
          <p className="text-[#5C0820] max-w-2xl leading-relaxed text-sm">
            Detailed breakdown of real-time stock prices, day high/lows, daily returns, and market valuations in Indian Rupees (₹).
          </p>
        </div>

        {/* Currency Switcher & Live Refresh */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Exchange Rate Badge */}
          <div className="px-3.5 py-2 rounded-xl bg-[#24050e] border border-[#d45266]/40 text-xs font-mono text-[#f4eada] flex items-center gap-2 shadow-sm">
            <span className="text-[#cdaea0]">Rate:</span>
            <span className="text-[#ff6b7d] font-bold">1 USD = ₹{USD_TO_INR.toFixed(2)} INR</span>
          </div>

          {/* Currency Toggle */}
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

          {/* Refresh Feed Button */}
          <button
            onClick={onRefreshFeed}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d45266] to-[#7c0b2b] hover:from-[#e86070] hover:to-[#961036] text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Updating...' : 'Fetch Live Quotes'}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 border border-[#d45266]/30 flex flex-wrap items-center justify-between gap-4">
        
        {/* Search Field */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#8c6759] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company by name or ticker (e.g., AAPL, NVDA)..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#24050e] border border-[#d45266]/40 text-xs font-mono text-white placeholder-[#8c6759] focus:outline-none focus:border-[#ff6b7d]"
          />
        </div>

        {/* Category Pills */}
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

      {/* Interactive Google Finance Graph Component */}
      {selectedStock && (
        <GoogleFinanceChart
          asset={selectedStock}
          currency={currency}
          onCurrencyChange={setCurrency}
        />
      )}

      {/* Main Stock Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAssets.map((asset) => {
          const isSelected = selectedStockId === asset.id;
          const inrPrice = (asset.currentPrice || 0) * USD_TO_INR;
          const highINR = (asset.highPrice || asset.currentPrice || 0) * USD_TO_INR;
          const lowINR = (asset.lowPrice || asset.currentPrice || 0) * USD_TO_INR;

          return (
            <div
              key={asset.id}
              onClick={() => setSelectedStockId(asset.id)}
              className={`glass-card p-5 border transition-all cursor-pointer select-none space-y-4 shadow-xl ${
                isSelected
                  ? 'border-[#ff6b7d] bg-[#700a27]/90 shadow-lg shadow-[#7c0b2b]/40 scale-[1.02]'
                  : 'border-[#d45266]/30 bg-[#4a0619]/60 hover:border-[#d45266]/60'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <StockLogo symbol={asset.symbol} name={asset.name} logoUrl={asset.logoUrl} size="md" />
                  <div>
                    <h3 className="font-mono font-extrabold text-base text-white">{asset.symbol}</h3>
                    <p className="text-[11px] text-[#cdaea0] font-medium truncate max-w-[120px]">{asset.name}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#24050e] text-[#ff6b7d] border border-[#d45266]/30">
                  {asset.category}
                </span>
              </div>

              {/* Price Highlight Banner */}
              <div className="p-3 rounded-xl bg-[#24050e] border border-[#d45266]/30 space-y-1">
                <div className="text-[10px] font-mono text-[#cdaea0] uppercase tracking-wider">
                  Live Stock Price ({currency})
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold font-mono text-white tracking-tight">
                    {formatPrice(asset.currentPrice)}
                  </span>
                  <div>{formatChange(asset.changeUSD, asset.changePercent)}</div>
                </div>
                
                {/* Dual Currency Reference */}
                <div className="text-[11px] font-mono text-[#cdaea0] pt-1 flex justify-between border-t border-[#3d0817]">
                  <span>{currency === 'INR' ? `($${asset.currentPrice?.toFixed(2)} USD)` : `(₹${inrPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })} INR)`}</span>
                  <span className="text-emerald-400 font-bold">Finnhub Live</span>
                </div>
              </div>

              {/* Technical Day High / Low Details */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div className="p-2 rounded-lg bg-[#24050e]/60 border border-[#d45266]/20 space-y-0.5">
                  <span className="text-[10px] text-[#cdaea0] block">Day High</span>
                  <span className="text-white font-bold">
                    {currency === 'INR' ? `₹${highINR.toLocaleString('en-IN', { maximumFractionDigits: 2 })}` : `$${asset.highPrice?.toFixed(2)}`}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-[#24050e]/60 border border-[#d45266]/20 space-y-0.5">
                  <span className="text-[10px] text-[#cdaea0] block">Day Low</span>
                  <span className="text-white font-bold">
                    {currency === 'INR' ? `₹${lowINR.toLocaleString('en-IN', { maximumFractionDigits: 2 })}` : `$${asset.lowPrice?.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Return & Volatility Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1 border-t border-[#3d0817]">
                <div>
                  <span className="text-[10px] text-[#cdaea0] block">Expected Return</span>
                  <span className="text-emerald-400 font-bold">
                    +{(asset.expectedReturn * 100).toFixed(1)}% / yr
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#cdaea0] block">Volatility Risk</span>
                  <span className="text-amber-300 font-bold">
                    {(asset.volatility * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Historical Trend Sparkline */}
              <div className="pt-2 border-t border-[#3d0817] flex items-center justify-between text-[10px] font-mono text-[#cdaea0]">
                <span>10-Day Market Trend</span>
                <div className="flex items-end gap-1 h-4">
                  {asset.history.slice(-8).map((val, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 rounded-t bg-[#ff6b7d]"
                      style={{ height: `${Math.max(4, (val / (asset.currentPrice || 400)) * 16)}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comprehensive Summary Table View */}
      <div className="glass-card p-6 border border-[#d45266]/30 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#ff6b7d]" />
            Complete Universe Stock Valuation Table (Finnhub Feed)
          </h3>
          <span className="text-xs font-mono text-[#cdaea0]">
            8 Assets Tracked • Exchange Rate: ₹{USD_TO_INR.toFixed(2)} / $1
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-[#3d0817] text-[#ff6b7d]">
                <th className="p-3">Asset</th>
                <th className="p-3">Company Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price (₹ INR)</th>
                <th className="p-3">Price ($ USD)</th>
                <th className="p-3">Day Change</th>
                <th className="p-3">Day Range (₹)</th>
                <th className="p-3">Annual Return</th>
                <th className="p-3">Volatility</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => {
                const inrPrice = (asset.currentPrice || 0) * USD_TO_INR;
                const highINR = (asset.highPrice || asset.currentPrice || 0) * USD_TO_INR;
                const lowINR = (asset.lowPrice || asset.currentPrice || 0) * USD_TO_INR;

                return (
                  <tr key={asset.id} className="border-b border-[#3d0817]/60 hover:bg-[#24050e] transition-colors">
                    <td className="p-3 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <StockLogo symbol={asset.symbol} name={asset.name} logoUrl={asset.logoUrl} size="xs" />
                        <span style={{ color: asset.color }}>{asset.symbol}</span>
                      </div>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};
