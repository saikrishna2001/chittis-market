import React from 'react';
import { Quote, Star, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import { testimonials } from '@/data/testimonials';
import { SectionHeading } from '@/components/common/SectionHeading';

export const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-emerald-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Voices of Trust"
          title="What Our Customers Say"
          subtitle="Real reviews from moms, home chefs, and wellness lovers who trust Chitti's Market daily."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col justify-between p-6 rounded-3xl bg-brand-bg/70 border border-emerald-100/80 hover:bg-white hover:shadow-soft-lg hover:border-emerald-200 transition-all duration-300"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-emerald-200" />
                </div>

                <h4 className="font-bold text-sm text-brand-dark font-serif mb-2 leading-snug">
                  "{t.title}"
                </h4>

                <p className="text-xs text-brand-muted leading-relaxed mb-6">
                  {t.content}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-emerald-100/70">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-brand-dark truncate">{t.name}</p>
                    {t.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-brand-fresh shrink-0" title="Verified Customer" />
                    )}
                  </div>
                  <p className="text-[10px] text-brand-muted truncate">{t.role}</p>
                  <p className="text-[10px] text-emerald-700 font-medium truncate">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
