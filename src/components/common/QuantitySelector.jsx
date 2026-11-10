import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({
  quantity = 1,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'default',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    default: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
  };

  const btnSizes = {
    sm: 'w-6 h-6',
    default: 'w-7 h-7',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={`inline-flex items-center justify-between rounded-full bg-brand-light/80 border border-emerald-200/80 p-0.5 text-brand-dark select-none ${sizeClasses[size]} ${className}`}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (quantity > min) onDecrease();
        }}
        disabled={quantity <= min}
        className={`${btnSizes[size]} rounded-full flex items-center justify-center bg-white text-brand-primary shadow-xs transition-all hover:bg-brand-primary hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-brand-primary`}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>

      <span className="font-bold text-center px-2 min-w-[28px]">
        {quantity}
      </span>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (quantity < max) onIncrease();
        }}
        disabled={quantity >= max}
        className={`${btnSizes[size]} rounded-full flex items-center justify-center bg-white text-brand-primary shadow-xs transition-all hover:bg-brand-primary hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-brand-primary`}
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>
    </div>
  );
};

export default QuantitySelector;
