import React from 'react';
import { Leaf, Truck, ShieldCheck, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export const ShoppingBenefits = () => {
  const benefits = [
    {
      icon: Leaf,
      title: '100% Fresh Produce',
      description: 'Handpicked daily at dawn from certified pesticide-free farms.',
      color: 'bg-emerald-50 text-brand-primary',
    },
    {
      icon: Truck,
      title: 'Farm-to-Home Delivery',
      description: 'Chilled express delivery ensuring zero heat exposure and zero bruising.',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Guaranteed',
      description: 'Not delighted? Instant no-questions-asked refund or produce replacement.',
      color: 'bg-amber-50 text-amber-700',
    },
    {
      icon: CreditCard,
      title: 'Safe & Secure Payments',
      description: 'Pay safely with UPI, cards, Net Banking, or Cash on Delivery.',
      color: 'bg-emerald-50 text-emerald-700',
    },
  ];

  return (
    <section id="benefits-section" className="py-12 bg-white border-y border-emerald-100/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-3xl bg-brand-bg/60 border border-emerald-100/60 hover:bg-white hover:shadow-soft-md hover:border-emerald-200 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl ${b.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-brand-dark mb-1 font-serif">
                    {b.title}
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShoppingBenefits;
