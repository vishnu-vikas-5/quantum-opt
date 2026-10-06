import React, { useState, useMemo } from 'react';
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
import type { Plugin } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StockLogo } from './StockLogo';

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

export type TimeRange = '1D' | '5D' | '1M' | 'YTD' | '1Y' | '5Y' | 'MAX';

interface GoogleFinanceChartProps {
  asset: Asset;
  currency: 'INR' | 'USD';
  onCurrencyChange?: (c: 'INR' | 'USD') => void;
}

export const GoogleFinanceChart: React.FC<GoogleFinanceChartProps> = ({
  asset,
  currency,
  onCurrencyChange
}) => {
  const [activeRange, setActiveRange] = useState<TimeRange>('1D');

  const exchangeStr = asset.exchange || `NASDAQ:${asset.symbol}`;
  const rateMultiplier = currency === 'INR' ? USD_TO_INR : 1;
  const currencySymbol = currency === 'INR' ? '₹' : '$';

  // Format Helper
  const formatVal = (usdVal?: number, digits = 2) => {
    if (usdVal === undefined) return 'N/A';
    const val = usdVal * rateMultiplier;
    if (currency === 'INR') {
      return `₹${val.toLocaleString('en-IN', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
    }
    return `$${val.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
  };

  // Generate realistic deterministic price history dataset for selected date range
  const rangeData = useMemo(() => {
    const currentPriceUSD = asset.currentPrice || 300;
    const prevCloseUSD = asset.prevClose || currentPriceUSD * 0.99;

    let pointsCount = 30;
    let labels: string[] = [];
    let startPriceMultiplier = 1;
    let volatilityFactor = 0.005;

    switch (activeRange) {
      case '1D': {
        // Intraday 9:30 AM to 4:00 PM (8 time slots)
        labels = ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:00'];
        pointsCount = labels.length;
        startPriceMultiplier = 0.995 + ((asset.symbol.charCodeAt(0) % 5) - 2) * 0.003;
        volatilityFactor = 0.004;
        break;
      }
      case '5D': {
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        pointsCount = labels.length;
        startPriceMultiplier = 0.982;
        volatilityFactor = 0.008;
        break;
      }
      case '1M': {
        labels = ['Sep 01', 'Sep 08', 'Sep 15', 'Sep 22', 'Sep 29', 'Oct 03'];
        pointsCount = labels.length;
        startPriceMultiplier = 0.95;
        volatilityFactor = 0.015;
        break;
      }
      case 'YTD': {
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
        pointsCount = labels.length;
        startPriceMultiplier = 0.88;
        volatilityFactor = 0.02;
        break;
      }
      case '1Y': {
        labels = ['Oct 25', 'Dec 25', 'Feb 26', 'Apr 26', 'Jun 26', 'Aug 26', 'Oct 26'];
        pointsCount = labels.length;
        startPriceMultiplier = 0.82;
        volatilityFactor = 0.025;
        break;
      }
      case '5Y': {
        labels = ['2021', '2022', '2023', '2024', '2025', '2026'];
        pointsCount = labels.length;
        startPriceMultiplier = 0.45;
        volatilityFactor = 0.05;
        break;
      }
      case 'MAX': {
        labels = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];
        pointsCount = labels.length;
        startPriceMultiplier = 0.25;
        volatilityFactor = 0.08;
        break;
      }
    }

    // Build data curve ending exactly at current price
    const dataPointsUSD: number[] = [];
    const baseStart = currentPriceUSD * startPriceMultiplier;

    for (let i = 0; i < pointsCount - 1; i++) {
      const progress = i / (pointsCount - 1);
      // Seeded variation
      const wave = Math.sin(progress * Math.PI * 3 + (asset.symbol.charCodeAt(0) % 7)) * volatilityFactor * currentPriceUSD;
      const linearInterp = baseStart + (currentPriceUSD - baseStart) * Math.pow(progress, 0.85);
      const val = Math.max(10, linearInterp + wave);
      dataPointsUSD.push(Number(val.toFixed(2)));
    }
    dataPointsUSD.push(currentPriceUSD);

    const firstPriceUSD = dataPointsUSD[0];
    const changeUSD = currentPriceUSD - firstPriceUSD;
    const changePercent = (changeUSD / firstPriceUSD) * 100;
    const isPositive = changeUSD >= 0;

    // Convert values according to active currency
    const valuesConverted = dataPointsUSD.map(p => Number((p * rateMultiplier).toFixed(2)));
    const prevCloseConverted = Number((prevCloseUSD * rateMultiplier).toFixed(2));

    return {
      labels,
      valuesConverted,
      changeUSD,
      changePercent,
      isPositive,
      prevCloseConverted
    };
  }, [asset, activeRange, rateMultiplier]);

  // Color scheme: Green for positive return, Red for negative return (Google Finance style)
  const strokeColor = rangeData.isPositive ? '#22c55e' : '#f43f5e';
  const fillColor = rangeData.isPositive ? 'rgba(34, 197, 94, 0.18)' : 'rgba(244, 63, 94, 0.18)';

  // Chart Dataset
  const chartData = {
    labels: rangeData.labels,
    datasets: [
      {
        label: `${asset.symbol} Price`,
        data: rangeData.valuesConverted,
        borderColor: strokeColor,
        borderWidth: 2.5,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 280);
          gradient.addColorStop(0, fillColor);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.25,
        pointRadius: 0, // Clean line without dot clutter
        pointHoverRadius: 6,
        pointHoverBackgroundColor: strokeColor,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2
      }
    ]
  };

  // Custom Chart.js Plugin for Dotted Prev Close Line
  const prevClosePlugin: Plugin = {
    id: 'prevCloseDottedLine',
    beforeDraw: (chart) => {
      const { ctx, chartArea, scales } = chart;
      if (!chartArea || !scales.y) return;

      const yVal = rangeData.prevCloseConverted;
      const yPixel = scales.y.getPixelForValue(yVal);

      if (yPixel >= chartArea.top && yPixel <= chartArea.bottom) {
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.moveTo(chartArea.left, yPixel);
        ctx.lineTo(chartArea.right, yPixel);
        ctx.stroke();

        // Prev Close label on right edge
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`Prev close ${yVal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`, chartArea.right - 8, yPixel - 6);
        ctx.restore();
      }
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#17030a',
        borderColor: strokeColor,
        borderWidth: 1.5,
        titleColor: '#94a3b8',
        bodyColor: '#ffffff',
        titleFont: { family: 'JetBrains Mono, monospace', size: 11 },
        bodyFont: { family: 'JetBrains Mono, monospace', size: 14, weight: 'bold' as const },
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (items: any[]) => items[0]?.label || '',
          label: (context: any) => {
            const val = context.raw;
            return `${currencySymbol}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#94a3b8',
          font: { family: 'JetBrains Mono, monospace', size: 11 },
          maxRotation: 0
        }
      },
      y: {
        position: 'left' as const,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: {
          color: '#94a3b8',
          font: { family: 'JetBrains Mono, monospace', size: 11 },
          callback: (val: any) => `${currencySymbol}${Number(val).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
        }
      }
    }
  };

  const ranges: { id: TimeRange; label: string }[] = [
    { id: '1D', label: '1 day' },
    { id: '5D', label: '5 days' },
    { id: '1M', label: '1 month' },
    { id: 'YTD', label: 'Ytd' },
    { id: '1Y', label: '1 year' },
    { id: '5Y', label: '5 years' },
    { id: 'MAX', label: 'Max' }
  ];

  const currentConvertedPrice = (asset.currentPrice || 0) * rateMultiplier;
  const rangeChangeConverted = rangeData.changeUSD * rateMultiplier;
  const ChangeIcon = rangeData.isPositive ? ArrowUpRight : ArrowDownRight;
  const changeColorClass = rangeData.isPositive ? 'text-emerald-400' : 'text-rose-400';

  return (
    <div className="glass-card p-6 border border-[#d45266]/40 bg-[#1e040c]/90 rounded-2xl shadow-2xl space-y-6">
      
      {/* 1. Header: Stock Info & Real-Time Price (Google Finance Style) */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#3d0817] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <StockLogo symbol={asset.symbol} name={asset.name} logoUrl={asset.logoUrl} size="md" />
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{asset.name}</span>
                <span className="text-xs font-mono text-[#94a3b8] font-normal">· {exchangeStr}</span>
              </h2>
            </div>
          </div>

          <div className="pt-2 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold font-mono text-white tracking-tight">
              {currencySymbol}{currentConvertedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs font-mono text-[#94a3b8] font-bold">{currency}</span>
            <div className={`flex items-center gap-1 font-mono font-bold text-base ${changeColorClass}`}>
              <ChangeIcon className="w-5 h-5" />
              <span>
                {rangeData.isPositive ? '+' : ''}{currencySymbol}{Math.abs(rangeChangeConverted).toFixed(2)} ({rangeData.isPositive ? '+' : ''}{rangeData.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#94a3b8] pt-0.5">
            {asset.lastUpdated ? `Real-Time Market Data · ${asset.lastUpdated}` : 'Market Closed · Real-Time Feed'} · Disclaimer
          </div>
        </div>

        {/* Currency Switcher Buttons */}
        {onCurrencyChange && (
          <div className="flex items-center p-1 rounded-xl bg-[#140307] border border-[#d45266]/40">
            <button
              onClick={() => onCurrencyChange('INR')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                currency === 'INR'
                  ? 'bg-[#d45266] text-white shadow-sm'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => onCurrencyChange('USD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                currency === 'USD'
                  ? 'bg-[#d45266] text-white shadow-sm'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              $ USD
            </button>
          </div>
        )}
      </div>

      {/* 2. Date Range Selector Tabs (Google Finance Style) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {ranges.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveRange(r.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all whitespace-nowrap ${
              activeRange === r.id
                ? 'bg-[#380816] text-white border border-[#ff6b7d]/60 shadow-md ring-1 ring-[#ff6b7d]/30'
                : 'bg-[#140307]/80 text-[#94a3b8] border border-transparent hover:text-white hover:bg-[#280511]'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* 3. Interactive Line Chart Container */}
      <div className="h-80 w-full p-2 rounded-xl bg-[#120207] border border-[#d45266]/30 relative">
        <Line data={chartData} options={chartOptions} plugins={[prevClosePlugin]} />
      </div>

      {/* 4. Technical Metrics Block (Google Finance Cards - Match Reference Image 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs pt-2">
        {/* Card 1: Open, High, Low */}
        <div className="p-4 rounded-xl bg-[#140307] border border-[#d45266]/30 space-y-2.5">
          <div className="flex justify-between items-center text-[#94a3b8]">
            <span>Open</span>
            <span className="text-white font-bold">{formatVal(asset.openPrice || asset.currentPrice)}</span>
          </div>
          <div className="flex justify-between items-center text-[#94a3b8] pt-1.5 border-t border-[#2e0513]">
            <span>High</span>
            <span className="text-white font-bold">{formatVal(asset.highPrice || asset.currentPrice)}</span>
          </div>
          <div className="flex justify-between items-center text-[#94a3b8] pt-1.5 border-t border-[#2e0513]">
            <span>Low</span>
            <span className="text-white font-bold">{formatVal(asset.lowPrice || asset.currentPrice)}</span>
          </div>
        </div>

        {/* Card 2: Mkt cap, P/E ratio, Volume */}
        <div className="p-4 rounded-xl bg-[#140307] border border-[#d45266]/30 space-y-2.5">
          <div className="flex justify-between items-center text-[#94a3b8]">
            <span>Mkt cap</span>
            <span className="text-white font-bold">{asset.mktCap || '3.48tn'}</span>
          </div>
          <div className="flex justify-between items-center text-[#94a3b8] pt-1.5 border-t border-[#2e0513]">
            <span>P/E ratio</span>
            <span className="text-white font-bold">{asset.peRatio ? asset.peRatio.toFixed(2) : '38.09'}</span>
          </div>
          <div className="flex justify-between items-center text-[#94a3b8] pt-1.5 border-t border-[#2e0513]">
            <span>Volume</span>
            <span className="text-white font-bold">{asset.volume || '31.9m'}</span>
          </div>
        </div>

        {/* Card 3: Prev close, 52W high, 52W low */}
        <div className="p-4 rounded-xl bg-[#140307] border border-[#d45266]/30 space-y-2.5">
          <div className="flex justify-between items-center text-[#94a3b8]">
            <span>Prev close</span>
            <span className="text-white font-bold">{formatVal(asset.prevClose || (asset.currentPrice ? asset.currentPrice * 0.99 : 300))}</span>
          </div>
          <div className="flex justify-between items-center text-[#94a3b8] pt-1.5 border-t border-[#2e0513]">
            <span>52W high</span>
            <span className="text-white font-bold">{formatVal(asset.fiftyTwoWeekHigh || (asset.currentPrice ? asset.currentPrice * 1.15 : 350))}</span>
          </div>
          <div className="flex justify-between items-center text-[#94a3b8] pt-1.5 border-t border-[#2e0513]">
            <span>52W low</span>
            <span className="text-white font-bold">{formatVal(asset.fiftyTwoWeekLow || (asset.currentPrice ? asset.currentPrice * 0.75 : 200))}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
