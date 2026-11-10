import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';

import { selectAllProducts } from '@/redux/slices/productSlice';
import { ProductCard } from '@/components/common/ProductCard';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';

export const BestSellingProducts = () => {
  const allProducts = useSelector(selectAllProducts);
  const bestSellers = allProducts.filter((p) => p.isBestSeller).slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Customer Favorites"
          title="Best Selling Produce"
          subtitle="The everyday staples and exotic delights our customers order and reorder every single week."
          action={
            <Button asChild variant="outline" className="rounded-full gap-2">
              <Link to="/shop">
                <span>Explore All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;
