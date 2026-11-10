import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5, size = 'sm', showScore = true, reviewsCount = null }) => {
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSizes[size]} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-slate-100 text-slate-300'
            }`}
          />
        ))}
      </div>
      {showScore && (
        <span className="text-xs font-bold text-brand-dark">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewsCount !== null && (
        <span className="text-xs text-brand-muted">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
