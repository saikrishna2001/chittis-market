import React from 'react';
import { Sparkles } from 'lucide-react';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  center = true,
  className = '',
  action,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 ${
        center ? 'text-center md:text-left' : ''
      } ${className}`}
    >
      <div className={`space-y-2.5 ${center ? 'mx-auto md:mx-0 max-w-2xl' : 'max-w-2xl'}`}>
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-fresh animate-pulse" />
            <span>{badge}</span>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight font-serif">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0 self-center md:self-end">{action}</div>}
    </div>
  );
};

export default SectionHeading;
