import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

import {
  selectWishlistItems,
  clearWishlist,
} from '@/redux/slices/wishlistSlice';
import { addToCart } from '@/redux/slices/cartSlice';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProductCard } from '@/components/common/ProductCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';

export const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  const handleAddAllToCart = () => {
    wishlistItems.forEach((product) => {
      dispatch(addToCart({ product, quantity: 1 }));
    });
    toast.success(`Added all ${wishlistItems.length} items to your basket! 🧺`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] py-12 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'My Saved Wishlist' }]} />
          <EmptyState
            icon={Heart}
            title="Your Wishlist is Empty"
            description="Explore our fresh fruits, seasonal specials, and vegetables, and tap the heart icon to save your favorites."
            actionText="Discover Fresh Produce"
            actionLink="/shop"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'My Saved Wishlist' }]} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6 pb-4 border-b border-emerald-100">
          <div>
            <h1 className="text-3xl font-extrabold text-brand-dark font-serif">
              My Saved Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleAddAllToCart}
              size="sm"
              className="rounded-full gap-1.5 shadow-fresh text-xs font-bold"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add All to Basket</span>
            </Button>

            <Button
              onClick={() => dispatch(clearWishlist())}
              variant="outline"
              size="sm"
              className="rounded-full text-xs text-rose-600 border-rose-200 hover:bg-rose-50"
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Wishlist Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
