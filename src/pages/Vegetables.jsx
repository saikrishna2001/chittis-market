import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Leaf, ShieldCheck } from 'lucide-react';

import { selectAllProducts } from '@/redux/slices/productSlice';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProductCard } from '@/components/common/ProductCard';

export const Vegetables = () => {
  const allProducts = useSelector(selectAllProducts);
  const vegetables = allProducts.filter((p) => p.category === 'fresh-vegetables');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'leafy' | 'root' | 'organic'

  const filteredVegetables = vegetables.filter((v) => {
    if (filterType === 'leafy') return v.subcategory === 'leafy-vegetables';
    if (filterType === 'root') return v.subcategory === 'root-vegetables';
    if (filterType === 'organic') return v.isOrganic;
    return true;
  });

  return (
    <div className="min-h-screen py-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Fresh Vegetables Collection' }]} />

        {/* Hero Banner for Vegetables */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-700 text-white p-8 sm:p-12 my-6 shadow-soft-lg">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-emerald-200 text-xs font-bold uppercase backdrop-blur-xs">
              <Leaf className="w-3.5 h-3.5 text-emerald-300" />
              <span>Harvested at Dawn Everyday</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white">
              Farm Fresh Vegetables
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Tender hydroponic baby greens, crisp country carrots, vine tomatoes, and wholesome root veggies grown in clean, living soil.
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
            All Vegetables ({vegetables.length})
          </button>
          <button
            onClick={() => setFilterType('leafy')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterType === 'leafy'
                ? 'bg-brand-primary text-white shadow-soft-sm'
                : 'bg-white text-brand-dark hover:bg-brand-light border border-emerald-100'
            }`}
          >
            Leafy Greens ({vegetables.filter((v) => v.subcategory === 'leafy-vegetables').length})
          </button>
          <button
            onClick={() => setFilterType('root')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterType === 'root'
                ? 'bg-brand-primary text-white shadow-soft-sm'
                : 'bg-white text-brand-dark hover:bg-brand-light border border-emerald-100'
            }`}
          >
            Root Vegetables ({vegetables.filter((v) => v.subcategory === 'root-vegetables').length})
          </button>
          <button
            onClick={() => setFilterType('organic')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterType === 'organic'
                ? 'bg-brand-primary text-white shadow-soft-sm'
                : 'bg-white text-brand-dark hover:bg-brand-light border border-emerald-100'
            }`}
          >
            100% Certified Organic ({vegetables.filter((v) => v.isOrganic).length})
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVegetables.map((veg) => (
            <ProductCard key={veg.id} product={veg} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vegetables;
