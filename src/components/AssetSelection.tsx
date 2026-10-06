import type { Asset } from '../types/quantum';
import { USD_TO_INR } from '../utils/quantumEngine';
import { CheckSquare, Square, RefreshCw, Activity } from 'lucide-react';
import { StockLogo } from './StockLogo';


interface AssetSelectionProps {
  assets: Asset[];
  selectedAssetIds: string[];
  targetK: number;
  onToggleAsset: (id: string) => void;
  onSelectAll: () => void;
  onTargetKChange: (k: number) => void;
  onRefreshLiveFeed?: () => void;
  isFetchingLive?: boolean;
}

export const AssetSelection: React.FC<AssetSelectionProps> = ({
  assets,
  selectedAssetIds,
  targetK,
  onToggleAsset,
  onSelectAll,
  onTargetKChange,
  onRefreshLiveFeed,
  isFetchingLive = false
}) => {
  return (
    <div className="space-y-6">
      {/* Header with Live Market Feed Tag */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="badge-quantum">Step 02 — Real-Time Financial Universe</div>
          <h3 className="text-2xl font-bold text-[#3D0515]">Real-Time Market Assets (Finnhub API)</h3>
          <p className="text-[#5C0820] max-w-2xl leading-relaxed text-xs">
            Live prices, annual returns, and variance covariance data fed directly into the QAOA optimizer.
          </p>
        </div>

        {/* Live Market Data Feed Tag & Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 text-xs font-mono font-bold shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Finnhub API (.env Configured)</span>
          </div>

          {onRefreshLiveFeed && (
            <button
              onClick={onRefreshLiveFeed}
              disabled={isFetchingLive}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d45266] to-[#7c0b2b] hover:from-[#e86070] hover:to-[#961036] text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-white ${isFetchingLive ? 'animate-spin' : ''}`} />
              <span>{isFetchingLive ? 'Refreshing...' : 'Fetch Live Quotes'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Portfolio Constraint Controls */}
      <div className="glass-card p-6 border border-[#d45266]/30 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <label className="text-xs font-mono text-[#ff6b7d] uppercase tracking-wider block font-bold">
              Selected Universe ({selectedAssetIds.length} / {assets.length} Active Qubits)
            </label>
            <button
              onClick={onSelectAll}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#24050e] hover:bg-[#380816] text-[#f4eada] border border-[#d45266]/40 transition-colors"
            >
              Select All
            </button>
          </div>
          <p className="text-xs text-[#cdaea0]">
            Each selected asset maps directly to a binary decision variable <span className="font-mono text-[#ff6b7d]">x_i ∈ &#123;0, 1&#125;</span>.
          </p>
        </div>

        {/* Target Portfolio Size Slider */}
        <div className="flex items-center gap-4 bg-[#24050e] px-4 py-3 rounded-xl border border-[#d45266]/30">
          <span className="text-xs font-mono text-[#cdaea0]">Target Size (K):</span>
          <input
            type="range"
            min="1"
            max={selectedAssetIds.length || 8}
            value={targetK}
            onChange={(e) => onTargetKChange(parseInt(e.target.value, 10))}
            className="w-32 accent-[#d45266] cursor-pointer"
          />
          <span className="px-3 py-1 rounded bg-[#d45266] text-white font-mono font-bold text-xs shadow-sm">
            K = {targetK} Assets
          </span>
        </div>
      </div>

      {/* Assets Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {assets.map((asset) => {
          const isSelected = selectedAssetIds.includes(asset.id);
          const priceINR = (asset.currentPrice || 0) * USD_TO_INR;

          return (
            <div
              key={asset.id}
              onClick={() => onToggleAsset(asset.id)}
              className={`glass-card p-5 border transition-all cursor-pointer select-none ${
                isSelected
                  ? 'border-[#ff6b7d] bg-[#700a27]/90 shadow-lg shadow-[#7c0b2b]/40 scale-[1.02]'
                  : 'border-[#d45266]/20 bg-[#4a0619]/60 hover:border-[#d45266]/50 opacity-80'
              }`}
            >
              {/* Header: Checkbox, Logo & Symbol */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  {isSelected ? (
                    <CheckSquare className="w-5 h-5 text-[#ff6b7d] shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-[#8c6759] shrink-0" />
                  )}
                  <StockLogo symbol={asset.symbol} name={asset.name} logoUrl={asset.logoUrl} size="sm" />
                  <span className="font-mono font-extrabold text-lg text-white" style={{ color: asset.color }}>
                    {asset.symbol}
                  </span>
                </div>
                {asset.currentPrice && (
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#f4eada] block">
                      ₹{priceINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-[10px] font-mono text-[#cdaea0] block">
                      (${asset.currentPrice.toFixed(2)})
                    </span>
                  </div>
                )}
              </div>


              <div className="text-xs text-[#f4eada] font-medium truncate mb-3">
                {asset.name}
              </div>

              {/* Return & Risk Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#d45266]/30 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[#cdaea0] block">Expected Return</span>
                  <span className="text-emerald-400 font-bold">
                    +{(asset.expectedReturn * 100).toFixed(1)}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#cdaea0] block">Volatility (Risk)</span>
                  <span className="text-amber-300 font-bold">
                    {(asset.volatility * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Real-time timestamp & mini trend */}
              <div className="mt-3 pt-2 flex items-center justify-between border-t border-[#3d0817] text-[10px] text-[#cdaea0] font-mono">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  {asset.lastUpdated ? asset.lastUpdated : 'Live Market'}
                </span>
                <div className="flex items-end gap-1 h-3.5">
                  {asset.history.slice(-6).map((val, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 rounded-t bg-[#ff6b7d]"
                      style={{ height: `${Math.max(4, (val / (asset.currentPrice || 400)) * 14)}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

