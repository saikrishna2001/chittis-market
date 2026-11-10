import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { selectAllProducts } from '@/redux/slices/productSlice';
import { addToCart } from '@/redux/slices/cartSlice';
import { formatCurrency } from '@/utils';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const PremiumBaskets = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const baskets = allProducts.filter((p) => p.category.includes('baskets')).slice(0, 4);

  const handleQuickAdd = (basket) => {
    dispatch(addToCart({ product: basket, quantity: 1 }));
    toast.success(`Added ${basket.name} to basket! 🧺`);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Curated With Love"
          title="Handcrafted Baskets & Hampers"
          subtitle="Artisan wicker hampers and weekly farm-to-kitchen boxes packed with supreme-grade organic produce."
          action={
            <Button asChild variant="outline" className="rounded-full gap-2">
              <Link to="/shop?category=fruit-baskets">
                <span>Explore All Hampers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {baskets.map((basket, index) => (
            <motion.div
              key={basket.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex flex-col rounded-3xl border border-emerald-100/80 bg-white overflow-hidden shadow-soft-sm hover:shadow-soft-xl hover:border-emerald-300 transition-all duration-300"
            >
              {/* Basket Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-surface">
                <img
                  src={basket.images?.[0]}
                  alt={basket.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <Badge variant="seasonal" className="text-[10px] font-bold">
                    {basket.badge || 'Artisan Hamper'}
                  </Badge>
                  {basket.discount > 0 && (
                    <Badge variant="discount" className="text-[10px]">
                      Save {basket.discount}%
                    </Badge>
                  )}
                </div>

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-500 flex items-center gap-1 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>5.0</span>
                </div>
              </div>

              {/* Basket Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full w-fit mb-2">
                    <Gift className="w-3 h-3 text-brand-orange" />
                    <span>{basket.unit}</span>
                  </div>

                  <Link
                    to={`/product/${basket.slug}`}
                    className="font-bold text-lg text-brand-dark group-hover:text-brand-primary transition-colors font-serif line-clamp-1 block"
                  >
                    {basket.name}
                  </Link>

                  <p className="text-xs text-brand-muted line-clamp-2 mt-1.5 leading-relaxed">
                    {basket.description}
                  </p>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-3 border-t border-emerald-50 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-brand-primary font-sans">
                        {formatCurrency(basket.price)}
                      </span>
                      {basket.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatCurrency(basket.originalPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-medium">
                      Free Ribbon & Gift Card
                    </span>
                  </div>

                  <Button
                    onClick={() => handleQuickAdd(basket)}
                    size="sm"
                    className="rounded-full gap-1.5 shadow-fresh font-bold text-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumBaskets;
