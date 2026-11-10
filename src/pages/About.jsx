import React from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  Heart,
  ShieldCheck,
  Truck,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Button } from '@/components/ui/button';

export const About = () => {
  return (
    <div className="min-h-screen py-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'About Chitti’s Market' }]} />

        {/* Hero Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-800 text-white p-8 sm:p-14 my-6 shadow-soft-xl">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-amber-300 text-xs font-bold uppercase backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Organic Farming Heritage</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight leading-tight">
              Reconnecting Families with the True Flavor of the Earth
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-sans">
              Founded on the simple belief that everyone deserves produce that tastes like it was picked from their own grandmother's backyard garden. Fresh, nutrient-dense, and zero synthetic shortcuts.
            </p>
          </div>
        </div>

        {/* The Chitti's Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center my-16">
          <div className="space-y-4">
            <span className="text-xs font-bold text-brand-fresh uppercase tracking-wider">
              The Chitti's Market Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark font-serif">
              From a Tiny Family Orchard to Your Neighborhood Grocer
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed">
              In 2021, our founder Chitti set out to solve a painful reality: the produce available in metropolitan supermarkets had spent weeks in dusty mandis, lost its natural vitamins, and was coated in artificial ripening agents.
            </p>
            <p className="text-sm text-brand-muted leading-relaxed">
              We partnered directly with multi-generation farmers in Ratnagiri, Ooty, Solapur, and the Deccan Plateau. By setting up our own micro-cold-chain network, we cut delivery times down from 6 days to under 6 hours from dawn harvest.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-soft-sm">
                <span className="text-2xl font-black text-brand-primary font-sans">150+</span>
                <p className="text-xs font-bold text-brand-dark mt-0.5">Partner Bio-Farms</p>
                <p className="text-[10px] text-brand-muted">Cultivating chemical-free soil</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-soft-sm">
                <span className="text-2xl font-black text-brand-primary font-sans">40,000+</span>
                <p className="text-xs font-bold text-brand-dark mt-0.5">Healthy Families</p>
                <p className="text-[10px] text-brand-muted">Receiving weekly harvest crates</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[2.5rem] overflow-hidden shadow-soft-xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
              alt="Fresh harvest sorting"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars of Freshness */}
        <div className="my-16 bg-white p-8 sm:p-12 rounded-[2.5rem] border border-emerald-100 shadow-soft-sm">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark font-serif">
              Our 4 Pillars of Uncompromising Quality
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted">
              How we guarantee the crispiest greens and sweetest fruits every single morning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Leaf,
                title: 'Living Soil First',
                desc: 'We only partner with farmers who nurture rich biological soil with organic compost and earthworms.',
              },
              {
                icon: ShieldCheck,
                title: 'Zero Chemical Ripening',
                desc: 'Our Alphonso mangoes and bananas ripen under natural sunlight and air circulation, never carbide chambers.',
              },
              {
                icon: Truck,
                title: 'Sub-60 Minute Transit',
                desc: 'Insulated cold delivery ensures optimal relative humidity from our central packhouse to your doorstep.',
              },
              {
                icon: Heart,
                title: '100% Happiness Policy',
                desc: 'If an apple isn’t crisp or a berry is bruised, tell us on WhatsApp for an immediate credit or refund.',
              },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-brand-bg border border-emerald-100/70 space-y-2 text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h4 className="font-bold text-base text-brand-dark font-serif">{p.title}</h4>
                  <p className="text-xs text-brand-muted leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="my-16 text-center bg-emerald-50 rounded-[2.5rem] border border-emerald-200 p-8 sm:p-12 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-brand-dark">
            Taste the Difference Today
          </h3>
          <p className="text-sm text-brand-muted max-w-md mx-auto">
            Experience what real, sun-ripened organic fruits and vegetables taste like.
          </p>
          <Button asChild size="lg" className="rounded-full px-8 font-bold shadow-fresh">
            <Link to="/shop">Shop Fresh Produce</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
