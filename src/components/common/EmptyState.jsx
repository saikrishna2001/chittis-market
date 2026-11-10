import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText = 'Start Shopping',
  actionLink = '/shop',
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
      {Icon && (
        <div className="w-20 h-20 rounded-3xl bg-brand-light flex items-center justify-center text-brand-primary mb-6 shadow-soft-sm">
          <Icon className="w-10 h-10 stroke-[1.5]" />
        </div>
      )}
      <h3 className="text-2xl font-bold text-brand-dark mb-2 font-serif">{title}</h3>
      <p className="text-sm text-brand-muted mb-8 leading-relaxed">{description}</p>
      {onAction ? (
        <Button onClick={onAction} className="rounded-full px-8">
          {actionText}
        </Button>
      ) : actionLink ? (
        <Button asChild className="rounded-full px-8">
          <Link to={actionLink}>{actionText}</Link>
        </Button>
      ) : null}
    </div>
  );
};

export default EmptyState;
