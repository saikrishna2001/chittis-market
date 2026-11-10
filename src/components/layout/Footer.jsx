import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  Leaf,
  Heart,
} from 'lucide-react';
import { toast } from 'sonner';

import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Welcome to the Chitti’s Market family! 🌱', {
      description: 'Your 20% discount code FRESH20 has been activated.',
    });
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-emerald-100/80 pt-16 pb-10 text-brand-dark">
      {/* Top Value Assurance Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-emerald-100/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary shrink-0">
              <Leaf className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-brand-dark">100% Farm Fresh</h5>
              <p className="text-xs text-brand-muted">Harvested at 5 AM daily</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary shrink-0">
              <Truck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-brand-dark">Express Cold Delivery</h5>
              <p className="text-xs text-brand-muted">Under 60 minutes in insulated bags</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-brand-dark">Certified Organic</h5>
              <p className="text-xs text-brand-muted">Zero artificial pesticides</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary shrink-0">
              <Heart className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-brand-dark">100% Happiness Policy</h5>
              <p className="text-xs text-brand-muted">Instant replacement guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Story & Socials (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="default" />
            <p className="text-sm text-brand-muted leading-relaxed max-w-sm pt-2">
              Chitti's Market is your trusted neighborhood organic grocer. We bridge the gap between conscientious local farmers and health-conscious families with the sweetest fruits, crispest greens, and artisanal baskets.
            </p>

            <div className="space-y-2 pt-2 text-xs text-brand-muted">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Road No 36, Jubilee Hills, Hyderabad, TS 500033</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                <span>+91 (040) 8000-CHITTI (244884)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                <span>care@chittismarket.com</span>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-3">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-brand-light text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-brand-light text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-brand-light text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                className="w-9 h-9 rounded-full bg-brand-light text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-bold text-brand-dark font-serif tracking-tight">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/fruits" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Fresh Orchard Fruits
                </Link>
              </li>
              <li>
                <Link to="/vegetables" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Farm Fresh Vegetables
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=organic" className="text-brand-muted hover:text-brand-primary transition-colors">
                  100% Organic Produce
                </Link>
              </li>
              <li>
                <Link to="/shop?category=fruit-baskets" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Luxury Fruit Baskets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=vegetable-baskets" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Weekly Pantry Crates
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=seasonal" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Seasonal Harvest
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-bold text-brand-dark font-serif tracking-tight">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/contact" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Track My Order
                </Link>
              </li>
              <li>
                <Link to="/contact#faqs" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Help Center & FAQs
                </Link>
              </li>
              <li>
                <Link to="/about#shipping" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/about#returns" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Freshness Guarantee & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Company (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-base font-bold text-brand-dark font-serif tracking-tight">
              Stay Fresh. Stay Healthy.
            </h4>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Join 40,000+ conscious families receiving morning harvest alerts, seasonal specials, and VIP coupons directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full h-12 pl-4 pr-12 rounded-full border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-fresh bg-brand-bg"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-accent transition-colors shadow-soft-sm"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4 -ml-0.5" />
              </button>
            </form>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-muted pt-2">
              <Link to="/about" className="hover:text-brand-primary transition-colors">
                About Us
              </Link>
              <span>•</span>
              <Link to="/about#privacy" className="hover:text-brand-primary transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/about#terms" className="hover:text-brand-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-emerald-100/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
        <p>
          © {new Date().getFullYear()} Chitti's Market Private Limited. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            🌱 FSSAI License: 10022047000189
          </span>
          <span className="text-brand-muted">
            100% Secure Checkout with 256-Bit SSL
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
