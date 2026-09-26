import type { Asset } from '../types/quantum';
import { CheckSquare, Square, Info } from 'lucide-react';

interface AssetSelectionProps {
  assets: Asset[];
  selectedAssetIds: string[];
  targetK: number;
  onToggleAsset: (id: string) => void;
  onSelectAll: () => void;
  onTargetKChange: (k: number) => void;
}

export const AssetSelection: React.FC<AssetSelectionProps> = ({
  assets,
  selectedAssetIds,
  targetK,
  onToggleAsset,
  onSelectAll,
  onTargetKChange
}) => {
  return (
    <section id="dataset" className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with Demo Dataset Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="badge-quantum">Section 03 — Financial Asset Universe</div>
            <h2 className="text-3xl font-extrabold text-white">Interactive Asset Selection Panel</h2>
            <p className="text-slate-300 max-w-2xl leading-relaxed text-sm">
              Select assets from the research universe to construct the QUBO optimization matrix.
            </p>
          </div>

          {/* Prominent Demo Dataset Disclaimer Tag */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Info className="w-4 h-4 shrink-0" />
            <div>
              <span className="font-bold">Demo Dataset</span> — Illustrative mock asset statistics for quantum research demonstration. Not real-time market prices.
            </div>
          </div>
        </div>

        {/* Portfolio Constraint Controls */}
        <div className="glass-card p-6 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-6">
          
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Selected Universe ({selectedAssetIds.length} / {assets.length} Active Qubits)
              </label>
              <button
                onClick={onSelectAll}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
              >
                Select All
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Each selected asset maps directly to a binary qubit variable <span className="font-mono text-cyan-300">xᵢ ∈ &#123;0, 1&#125;</span>.
            </p>
          </div>

          {/* Target Portfolio Size Slider */}
          <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-3 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-300">Target Portfolio Size (K):</span>
            <input
              type="range"
              min="1"
              max={selectedAssetIds.length || 8}
              value={targetK}
              onChange={(e) => onTargetKChange(parseInt(e.target.value, 10))}
              className="w-32 accent-cyan-400 cursor-pointer"
            />
            <span className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold text-sm border border-cyan-500/40">
              K = {targetK} Assets
            </span>
          </div>
        </div>

        {/* Assets Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {assets.map((asset) => {
            const isSelected = selectedAssetIds.includes(asset.id);
            return (
              <div
                key={asset.id}
                onClick={() => onToggleAsset(asset.id)}
                className={`glass-card p-5 border transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-lg shadow-cyan-950/40 scale-[1.02]'
                    : 'border-slate-800 hover:border-slate-700 opacity-70'
                }`}
              >
                {/* Header: Checkbox & Symbol */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5 text-cyan-400 shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-600 shrink-0" />
                    )}
                    <span className="font-mono font-extrabold text-lg text-white" style={{ color: asset.color }}>
                      {asset.symbol}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {asset.category}
                  </span>
                </div>

                <div className="text-xs text-slate-300 font-medium truncate mb-4">
                  {asset.name}
                </div>

                {/* Return & Risk Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Expected Return</span>
                    <span className="text-emerald-400 font-bold">
                      +{(asset.expectedReturn * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Volatility (Risk)</span>
                    <span className="text-amber-400 font-bold">
                      {(asset.volatility * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Mini Historical Sparkline Visual */}
                <div className="mt-3 pt-2 flex items-center justify-between border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                  <span>12M Trend</span>
                  <div className="flex items-end gap-1 h-4">
                    {asset.history.slice(-6).map((val, idx) => (
                      <div
                        key={idx}
                        className="w-1.5 rounded-t bg-cyan-500/40"
                        style={{ height: `${Math.max(4, (val / 450) * 16)}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
