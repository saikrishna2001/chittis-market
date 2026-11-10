import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';

import { selectAllProducts } from '@/redux/slices/productSlice';
import { ProductCard } from '@/components/common/ProductCard';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';

export const FruitsCollection = () => {
  const allProducts = useSelector(selectAllProducts);
  // Get all fresh fruits collection items
  const fruits = allProducts.filter((p) => p.category === 'fresh-fruits');

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Sun-Ripened Goodness"
          title="Fresh Fruits Collection"
          subtitle="From Ratnagiri Alphonso mangoes to Mahabaleshwar strawberries, naturally sweetened by sunlight."
          action={
            <Button asChild variant="outline" className="rounded-full gap-2">
              <Link to="/fruits">
                <span>View All Fruits ({fruits.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {fruits.map((fruit) => (
            <ProductCard key={fruit.id} product={fruit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FruitsCollection;
