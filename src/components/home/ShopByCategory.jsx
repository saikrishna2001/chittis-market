import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { categories } from '@/data/categories';
import { SectionHeading } from '@/components/common/SectionHeading';

export const ShopByCategory = () => {
  return (
    <section className="py-16 sm:py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Nature's Bounty"
          title="Shop by Category"
          subtitle="Explore our handpicked curation of pesticide-free fruits, wholesome vegetables, and artisanal gift baskets."
          action={
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:text-brand-fresh transition-colors"
            >
              <span>View All Categories</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <Link
                to={`/shop?category=${category.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-100/70 bg-white p-5 shadow-soft-sm hover:shadow-soft-xl hover:border-emerald-300 transition-all duration-300 h-[280px]"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:via-black/50 transition-colors" />
                </div>

                {/* Top Tag & Item Count */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 text-brand-primary px-3 py-1 rounded-full backdrop-blur-xs">
                    {category.tag}
                  </span>
                  <span className="text-xs font-semibold text-white/90 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    {category.itemCount}
                  </span>
                </div>

                {/* Bottom Content & CTA */}
                <div className="relative z-10 text-white space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white group-hover:text-amber-200 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                    <span>Shop Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
