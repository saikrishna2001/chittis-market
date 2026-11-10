import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsSubscribed(true);
    toast.success('Welcome to Chitti’s Market Club! 🥦', {
      description: 'Your ₹100 discount coupon has been sent to your inbox.',
    });
    setEmail('');
  };

  return (
    <section className="py-16 sm:py-20 bg-brand-bg relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white to-emerald-50/70 border border-emerald-200/80 p-8 sm:p-12 lg:p-16 text-center shadow-soft-lg"
        >
          {/* Subtle Decorative Elements */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-fresh animate-pulse" />
            <span>Join Chitti's Healthy Living Circle</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark font-serif tracking-tight mb-4">
            Stay Fresh. Stay Healthy.
          </h2>

          <p className="text-sm sm:text-base text-brand-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Get fresh arrivals, seasonal offers, and exclusive discounts directly in your inbox. Plus instant ₹100 off on your first organic basket.
          </p>

          {isSubscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-100 text-brand-primary font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-brand-fresh" />
              <span>Thank you for subscribing! Check your email for your coupon code.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 h-13 px-5 rounded-full border border-emerald-200 bg-white text-sm text-brand-dark placeholder:text-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-fresh shadow-soft-sm"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="rounded-full px-8 font-bold gap-2 shadow-fresh shrink-0"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-brand-muted mt-8 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="text-brand-fresh">✓</span> Zero Spam
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-brand-fresh">✓</span> Weekly Harvest Catalog
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-brand-fresh">✓</span> One-Click Unsubscribe
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
