import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav className="flex items-center space-x-1.5 text-xs sm:text-sm text-brand-muted py-3">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-brand-primary transition-colors font-medium"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-semibold text-brand-dark truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="hover:text-brand-primary transition-colors font-medium truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
