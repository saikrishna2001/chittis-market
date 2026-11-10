import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Sparkles, Sun, ShieldCheck } from 'lucide-react';

import { selectAllProducts } from '@/redux/slices/productSlice';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProductCard } from '@/components/common/ProductCard';
import { Badge } from '@/components/ui/badge';

export const Fruits = () => {
  const allProducts = useSelector(selectAllProducts);
  const fruits = allProducts.filter((p) => p.category === 'fresh-fruits');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'seasonal' | 'organic' | 'exotic'

  const filteredFruits = fruits.filter((f) => {
    if (filterType === 'seasonal') return f.isSeasonal;
    if (filterType === 'organic') return f.isOrganic;
    if (filterType === 'exotic') return f.subcategory === 'exotic-fruits';
    return true;
  });

  return (
    <div className="min-h-screen py-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Fresh Fruits Collection' }]} />

        {/* Hero Banner for Fruits */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-700 text-white p-8 sm:p-12 my-6 shadow-soft-lg">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-amber-200 text-xs font-bold uppercase backdrop-blur-xs">
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span>Sun-Ripened Orchard Harvest</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white">
              Fresh Orchard Fruits
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Naturally ripened without calcium carbide. Bursting with authentic sweetness, natural enzymes, and high vitamin vitality.
            </p>
          </div>
        </div>

        {/* Sub-Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-emerald-100">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-brand-primary text-white shadow-soft-sm'
                : 'bg-white text-brand-dark hover:bg-brand-light border border-emerald-100'
            }`}
          >
            All Fruits ({fruits.length})
          </button>
          <button
            onClick={() => setFilterType('seasonal')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterType === 'seasonal'
                ? 'bg-brand-primary text-white shadow-soft-sm'
                : 'bg-white text-brand-dark hover:bg-brand-light border border-emerald-100'
            }`}
          >
            Seasonal Specials ({fruits.filter((f) => f.isSeasonal).length})
          </button>
          <button
            onClick={() => setFilterType('organic')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterType === 'organic'
                ? 'bg-brand-primary text-white shadow-soft-sm'
                : 'bg-white text-brand-dark hover:bg-brand-light border border-emerald-100'
            }`}
          >
            100% Certified Organic ({fruits.filter((f) => f.isOrganic).length})
          </button>
          <button
            onClick={() => setFilterType('exotic')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterType === 'exotic'
                ? 'bg-brand-primary text-white shadow-soft-sm'
                : 'bg-white text-brand-dark hover:bg-brand-light border border-emerald-100'
            }`}
          >
            Exotic Delights ({fruits.filter((f) => f.subcategory === 'exotic-fruits').length})
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFruits.map((fruit) => (
            <ProductCard key={fruit.id} product={fruit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fruits;
