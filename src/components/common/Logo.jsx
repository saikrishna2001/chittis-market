import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'default', showTagline = true, className = '' }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    default: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    default: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group select-none transition-transform hover:scale-[1.02] ${className}`}
    >
      {/* Brand Icon SVG */}
      <div className={`relative ${iconSizes[size]} shrink-0 transition-transform duration-300 group-hover:rotate-6`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Gentle background glow */}
          <circle cx="50" cy="50" r="48" fill="#E8F5E9" />
          {/* Market basket */}
          <path d="M26 44L32 74C32.5 76.5 34.5 78 37 78H63C65.5 78 67.5 76.5 68 74L74 44H26Z" fill="#1B5E20" />
          <path d="M34 52H66M36 62H64M39 71H61" stroke="#E8F5E9" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sun-ripened orange */}
          <circle cx="44" cy="40" r="14" fill="#FF9800" />
          <circle cx="41" cy="36" r="3.5" fill="#FFE0B2" />
          {/* Fresh Organic Green Leaves */}
          <path d="M54 44C54 34 62 27 70 26C70 34 64 42 54 44Z" fill="#4CAF50" />
          <path d="M48 30C46 22 41 18 34 19C35 27 41 31 48 30Z" fill="#2E7D32" />
          {/* Basket handle */}
          <path d="M35 44C35 32 40 24 50 24C60 24 65 32 65 44" stroke="#1B5E20" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col">
        <div className={`font-serif font-black tracking-tight leading-none text-brand-dark flex items-baseline ${textSizes[size]}`}>
          <span className="text-brand-primary">Chitti's</span>
          <span className="ml-1.5 text-brand-orange font-sans font-extrabold tracking-normal">Market</span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-bold tracking-widest text-brand-fresh uppercase mt-0.5 font-sans">
            Fresh • Organic • Pure
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
