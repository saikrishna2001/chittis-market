import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import { useSelector } from 'react-redux';

import { selectAllProducts } from '@/redux/slices/productSlice';
import { ProductCard } from '@/components/common/ProductCard';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';

export const VegetablesCollection = () => {
  const allProducts = useSelector(selectAllProducts);
  const vegetables = allProducts.filter((p) => p.category === 'fresh-vegetables');

  return (
    <section className="py-16 sm:py-24 bg-brand-bg border-b border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Harvested at Dawn"
          title="Fresh Vegetables Collection"
          subtitle="Crisp greens, earthy roots, and vibrant kitchen essentials cultivated without toxic pesticide sprays."
          action={
            <Button asChild variant="outline" className="rounded-full gap-2">
              <Link to="/vegetables">
                <span>View All Vegetables ({vegetables.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {vegetables.map((veg) => (
            <ProductCard key={veg.id} product={veg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VegetablesCollection;
