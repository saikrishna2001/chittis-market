import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center bg-brand-bg">
      <div className="w-24 h-24 rounded-3xl bg-brand-light flex items-center justify-center text-brand-primary mb-6 shadow-soft-sm">
        <span className="text-5xl">🥑</span>
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full mb-3">
        404 Page Not Found
      </span>

      <h1 className="text-3xl sm:text-5xl font-black text-brand-dark font-serif tracking-tight mb-3">
        Oops! This Harvest Doesn't Exist
      </h1>

      <p className="text-sm sm:text-base text-brand-muted max-w-md mx-auto mb-8 leading-relaxed">
        The page or product you were looking for seems to have been harvested already or moved to a new section.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg" className="rounded-full gap-2 font-bold shadow-fresh">
          <Link to="/">
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </Button>

        <Button asChild size="lg" variant="outline" className="rounded-full gap-2 border-emerald-200">
          <Link to="/shop">
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Fresh Produce</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
