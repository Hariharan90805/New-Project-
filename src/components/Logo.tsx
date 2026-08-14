import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'gold' | 'dark' | 'minimal';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'gold',
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-base', sub: 'text-[8px]' },
    md: { icon: 44, text: 'text-lg', sub: 'text-[9px]' },
    lg: { icon: 58, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 76, text: 'text-4xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="dcollaberz-brand-logo">
      {/* 3D Gold Emblem Badge */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 via-neutral-900 to-black p-1 shadow-lg shadow-amber-500/10 border border-amber-400/30 transition-transform duration-300 hover:scale-105"
        style={{
          width: currentSize.icon,
          height: currentSize.icon,
          boxShadow: '0 8px 20px -4px rgba(212, 175, 55, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Glowing Background Radial */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-amber-600/20 via-transparent to-yellow-300/20 opacity-70 pointer-events-none" />

        {/* Precision SVG Vector Emblem matching official uploaded brand asset */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGradientBrand" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF7D1" />
              <stop offset="30%" stopColor="#E6CA65" />
              <stop offset="70%" stopColor="#C59B27" />
              <stop offset="100%" stopColor="#8E6508" />
            </linearGradient>
            <linearGradient id="goldAccentBrand" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#DFB743" />
              <stop offset="100%" stopColor="#997012" />
            </linearGradient>
          </defs>

          {/* Outer Stylized 'D' Shape */}
          <path
            d="M32 25 H50 C68 25, 78 36, 78 50 C78 64, 68 75, 50 75 H32 V25 Z"
            stroke="url(#goldGradientBrand)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Inner Concentric 'C' Rings */}
          <circle
            cx="48"
            cy="50"
            r="16"
            stroke="url(#goldAccentBrand)"
            strokeWidth="4"
            strokeDasharray="75 25"
            strokeDashoffset="12"
            fill="none"
          />
          <circle
            cx="48"
            cy="50"
            r="10"
            stroke="url(#goldGradientBrand)"
            strokeWidth="3"
            fill="none"
          />

          {/* Center Play Button Triangle */}
          <polygon
            points="46,45 53,50 46,55"
            fill="url(#goldAccentBrand)"
          />

          {/* Hand Rig Handle */}
          <rect
            x="70"
            y="35"
            width="2.5"
            height="18"
            rx="1"
            fill="url(#goldGradientBrand)"
          />

          {/* Hand Fist */}
          <circle
            cx="71"
            cy="48"
            r="4.5"
            stroke="url(#goldGradientBrand)"
            strokeWidth="2"
            fill="#121212"
          />

          {/* Camera Monitor Rig at Top Right */}
          <rect
            x="60"
            y="18"
            width="25"
            height="12"
            rx="3"
            stroke="url(#goldGradientBrand)"
            strokeWidth="3"
            fill="#121212"
          />
          <path
            d="M66 18 C66 14 78 14 78 18"
            stroke="url(#goldGradientBrand)"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="72.5"
            cy="24"
            r="3"
            stroke="url(#goldAccentBrand)"
            strokeWidth="2"
            fill="#1e1e1e"
          />
        </svg>
      </div>

      {/* Brand Text Typography */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-wider">
          <span className={`font-black uppercase tracking-[0.25em] font-sans ${currentSize.text} ${
            variant === 'gold'
              ? 'bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
              : 'text-white'
          }`}>
            DC<span className="inline-block">Θ</span>LLABERZ
          </span>
        </div>
        {showTagline && (
          <span className={`font-semibold tracking-[0.28em] text-neutral-400 uppercase font-sans ${currentSize.sub}`}>
            Connect <span className="text-amber-400 font-bold mx-0.5">|</span> Create <span className="text-amber-400 font-bold mx-0.5">|</span> Grow
          </span>
        )}
      </div>
    </div>
  );
};
