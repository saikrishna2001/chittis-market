import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, SunMedium, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const SeasonalBanner = () => {
  return (
    <section className="py-12 sm:py-16 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] text-white shadow-soft-xl p-8 sm:p-12 lg:p-16"
        >
          {/* Background image overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=1400&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
              <SunMedium className="w-4 h-4 text-amber-300 animate-spin-slow" />
              <span>Limited Harvest Collection</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight leading-tight">
              Enjoy the Taste of Every Season
            </h2>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-sans">
              Freshly harvested seasonal produce, carefully selected for quality and taste. From golden Alphonso mangoes to mountain strawberries, taste nature at its absolute peak.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-brand-orange hover:bg-amber-600 text-white font-extrabold shadow-lg px-8 gap-2"
              >
                <Link to="/shop?filter=seasonal">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>

              <div className="flex items-center gap-2 text-xs font-medium text-emerald-200">
                <Calendar className="w-4 h-4 text-brand-orange" />
                <span>Peak Season Harvest Ending Soon</span>
              </div>
            </div>
          </div>

          {/* Right Floating Badge Graphic */}
          <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
            <div className="w-64 h-64 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center p-4">
              <div className="w-52 h-52 rounded-full bg-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 border border-white/20">
                <Sparkles className="w-8 h-8 text-amber-300 mb-2" />
                <span className="text-3xl font-black text-white font-serif">20% OFF</span>
                <span className="text-xs text-emerald-200 uppercase tracking-widest font-bold mt-1">
                  Use: FRESH20
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SeasonalBanner;
