import React, { useState } from 'react';

interface StockLogoProps {
  symbol: string;
  name?: string;
  logoUrl?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  showBorder?: boolean;
}

// Crisp local vector SVGs for guaranteed zero-latency, offline-safe brand logos
const BRAND_SVGS: Record<string, (color?: string) => React.ReactNode> = {
  AAPL: () => (
    <svg viewBox="0 0 170 170" fill="currentColor" className="w-full h-full text-white">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.9-14.37-6.08-3.38-2.73-7.29-7.46-11.75-14.19-7.25-11-13.01-23.86-17.27-38.58-4.26-14.72-6.39-28.53-6.39-41.44 0-16.14 3.99-29.41 11.97-39.81 7.98-10.4 17.84-15.7 29.58-15.91 4.58 0 9.8 1.18 15.66 3.54 5.86 2.36 9.87 3.54 12.04 3.54 1.95 0 6.04-1.24 12.28-3.72 6.23-2.48 11.28-3.6 15.14-3.35 12.87.52 23.16 5.3 30.87 14.35-11.47 6.94-17.1 16.71-16.89 29.3.21 9.94 4.14 18.25 11.79 24.93 5.43 4.79 11.66 8.01 18.69 9.66-2.6 7.64-6.07 15.58-10.41 23.83zM119.22 31.84c0-7.72 2.76-15.11 8.28-22.17 5.52-7.06 12.5-11.54 20.93-13.44.21.93.32 1.8.32 2.61 0 7.85-2.88 15.42-8.64 22.7-5.76 7.28-12.78 11.83-21.06 13.65-.11-.93-.16-1.71-.16-2.35z" />
    </svg>
  ),
  MSFT: () => (
    <svg viewBox="0 0 23 23" className="w-full h-full">
      <path fill="#f25022" d="M1 1h10v10H1z"/>
      <path fill="#7fba00" d="M12 1h10v10H12z"/>
      <path fill="#00a4ef" d="M1 12h10v10H1z"/>
      <path fill="#ffb900" d="M12 12h10v10H12z"/>
    </svg>
  ),
  NVDA: () => (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-[#76b900]">
      <path d="M41.7 20.3c-7.9 0-14.8 5.6-16.5 13.3-1.6 7.6 2.3 15.3 9.4 18.4 7.1 3.1 15.5.7 19.9-5.7 4.5-6.4 3.7-15.1-1.8-20.6-3-3.6-7-5.4-11-5.4zm34.1 4.5C65.5 15.2 50.8 10 35.8 10.5 20.8 11 7.1 17.2.5 27.5c-1 1.5-.7 3.5.7 4.6 1.4 1.1 3.4.8 4.5-.6C11.5 22.4 23.8 16.8 37 16.3c13.2-.5 26.1 4 34.8 12.3 8.7 8.3 12.7 20.4 10.9 33-1.8 12.6-9.6 23.2-21 28.5-11.4 5.3-24.8 4.6-35.6-1.9C15.3 81.7 8.3 70 7.7 57.2c-.1-1.8-1.6-3.2-3.4-3.1-1.8.1-3.2 1.6-3.1 3.4C2 72.8 10 86.1 22.5 93.3c12.5 7.2 27.9 8 41 2.2 13.1-5.8 22.1-18 24.2-32.5 2.1-14.5-2.5-28.4-12.5-38.2z"/>
      <path d="M48.5 35.2c-4.2 0-7.7 3.4-7.7 7.7s3.4 7.7 7.7 7.7 7.7-3.4 7.7-7.7-3.5-7.7-7.7-7.7z"/>
    </svg>
  ),
  AMZN: () => (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <path d="M68.8 63.2c-9.6 7-23.7 10.8-35.7 10.8-16.9 0-32.1-6.2-43.6-16.7-1-.9-.2-2.2 1-1.5 12.4 7.2 27.4 11.5 42.6 11.5 10.7 0 22.4-2.8 33-8.8 1.6-1 3.2 1.4 2.7 2.7z" fill="#ff9900"/>
      <path d="M72.2 57c-.6-.7-4.1-.3-5.6-.2-.4.1-.5-.3-.1-.5 2.7-1.9 7-1.3 7.8-.3.8 1.1-.3 5.4-2.1 7.6-.3.4-.6.2-.5-.2.5-1.5 1.1-5.7.5-6.4z" fill="#ff9900"/>
      <text x="50" y="45" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="36" fontFamily="sans-serif">a</text>
    </svg>
  ),
  GOOGL: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
    </svg>
  ),
  META: () => (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-[#0668e1]">
      <path d="M31.2 24C16.8 24 5 35.8 5 50.2s11.8 26.2 26.2 26.2c9.5 0 17.5-5.2 22-12.8 4.5 7.6 12.5 12.8 22 12.8C89.6 76.4 101.4 64.6 101.4 50.2S89.6 24 75.2 24c-9.5 0-17.5 5.2-22 12.8-4.5-7.6-12.5-12.8-22-12.8zm0 10.5c8.7 0 15.7 7 15.7 15.7s-7 15.7-15.7 15.7-15.7-7-15.7-15.7 7-15.7 15.7-15.7zm44 0c8.7 0 15.7 7 15.7 15.7s-7 15.7-15.7 15.7-15.7-7-15.7-15.7 7-15.7 15.7-15.7z"/>
    </svg>
  ),
  TSLA: () => (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-[#e82127]">
      <path d="M50 20c-15 0-30 3-30 3l2 8s13-2 28-2 28 2 28 2l2-8s-15-3-30-3zm-5 15v50h10V35H45zM20 23l-5 25h9l2-15s7 2 24 2 24-2 24-2l2 15h9l-5-25H20z"/>
    </svg>
  ),
  JPM: () => (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-[#00529b]">
      <path d="M50 5L5 23.6v52.8L50 95l45-18.6V23.6L50 5zm33.8 66.8L50 85.7 16.2 71.8V28.2L50 14.3l33.8 13.9v43.6z"/>
      <path d="M50 24L26 34v32l24 10 24-10V34L50 24zm14 36.8L50 66.2l-14-5.4V39.2L50 33.8l14 5.4v21.6z"/>
    </svg>
  )
};

const SIZE_MAP: Record<string, string> = {
  xs: 'w-5 h-5 text-[9px]',
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-11 h-11 text-sm',
  xl: 'w-14 h-14 text-base'
};

const ICON_SIZE_MAP: Record<string, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
};

export const StockLogo: React.FC<StockLogoProps> = ({
  symbol,
  name,
  logoUrl,
  size = 'md',
  className = '',
  showBorder = true
}) => {
  const [imgError, setImgError] = useState(false);

  const cleanSymbol = (symbol || '').toUpperCase().trim();
  const sizeClass = typeof size === 'string' ? SIZE_MAP[size] || SIZE_MAP.md : `w-[${size}px] h-[${size}px]`;
  const iconSizeClass = typeof size === 'string' ? ICON_SIZE_MAP[size] || ICON_SIZE_MAP.md : 'w-full h-full';

  // Primary CDN URL fallback order: logoUrl prop -> Parqet Logo CDN -> FinancialModelingPrep CDN
  const primaryCdnUrl = logoUrl || `https://assets.parqet.com/logos/symbol/${cleanSymbol}?format=png`;

  const renderFallback = () => {
    const BrandSvg = BRAND_SVGS[cleanSymbol];
    if (BrandSvg) {
      return <div className={iconSizeClass}>{BrandSvg()}</div>;
    }

    // Default stylized ticker badge if no SVG or image exists
    return (
      <span className="font-mono font-black tracking-tighter text-white uppercase">
        {cleanSymbol.slice(0, 3)}
      </span>
    );
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-xl bg-[#1b030b]/90 ${
        showBorder ? 'border border-[#d45266]/35 shadow-md shadow-[#3d0515]/50' : ''
      } ${sizeClass} ${className} overflow-hidden p-1.5 transition-all duration-200 hover:scale-105`}
      title={name ? `${name} (${cleanSymbol})` : cleanSymbol}
    >
      {!imgError ? (
        <img
          src={primaryCdnUrl}
          alt={`${cleanSymbol} logo`}
          className="w-full h-full object-contain rounded-lg"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        renderFallback()
      )}
    </div>
  );
};
