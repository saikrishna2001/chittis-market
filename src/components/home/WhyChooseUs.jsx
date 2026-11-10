import React from 'react';
import { Leaf, CheckCircle2, ShieldCheck, Truck, Coins, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/common/SectionHeading';

export const WhyChooseUs = () => {
  const points = [
    {
      icon: Leaf,
      title: 'Freshly Sourced Products',
      description:
        'Harvested directly from certified local orchards and regenerative farms early morning for peak nutrition and flavor.',
      highlight: 'Farm-to-fork in hours',
    },
    {
      icon: CheckCircle2,
      title: 'Carefully Selected Produce',
      description:
        'Every individual fruit and vegetable is hand-graded through a 5-point quality check. Zero blemishes, bruises, or artificial waxes.',
      highlight: 'Zero defect grading',
    },
    {
      icon: ShieldCheck,
      title: 'Hygienic Bio-Packaging',
      description:
        'Washed in ozonated water and packed in biodegradable, breathable food-grade containers to lock in crispness naturally.',
      highlight: '100% Eco-friendly',
    },
    {
      icon: Truck,
      title: 'Reliable Home Delivery',
      description:
        'Temperature-controlled delivery vans ensure your tender baby spinach and ripe berries never face scorching heat or spoilage.',
      highlight: 'On-time guarantee',
    },
    {
      icon: Coins,
      title: 'Affordable Transparent Prices',
      description:
        'By cutting out middlemen, mandis, and multiple brokers, we provide premium organic quality at fair, honest prices.',
      highlight: 'Best direct rates',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-brand-bg border-b border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The Chitti's Standard"
          title="Why Choose Chitti's Market?"
          subtitle="We believe real food should be clean, honest, and accessible to every family every single day."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-emerald-100/80 shadow-soft-sm hover:shadow-soft-lg hover:border-brand-fresh transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-brand-primary px-3 py-1 rounded-full border border-emerald-200">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-2 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-emerald-50 flex items-center gap-1.5 text-xs font-semibold text-brand-fresh">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Backed by 100% Satisfaction Promise</span>
                </div>
              </motion.div>
            );
          })}

          {/* 6th Tile: Community Guarantee Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white shadow-soft-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-4 backdrop-blur-xs">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white mb-2">
                40,000+ Happy Families
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Join thousands of health-focused households who get their weekly nutrition from Chitti's Market.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/20 text-xs text-amber-200 font-bold">
              ★ 4.9 Average Customer Rating Across 12,000+ Reviews
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
