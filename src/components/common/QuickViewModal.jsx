import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Heart, Check, Sparkles, ShieldCheck, MapPin } from 'lucide-react';
import { toast } from 'sonner';

import { formatCurrency } from '@/utils';
import {
  closeQuickView,
  selectIsQuickViewOpen,
  selectQuickViewProduct,
} from '@/redux/slices/productSlice';
import { addToCart } from '@/redux/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/redux/slices/wishlistSlice';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RatingStars } from './RatingStars';
import { QuantitySelector } from './QuantitySelector';

export const QuickViewModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsQuickViewOpen);
  const product = useSelector(selectQuickViewProduct);

  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isInWishlist = useSelector((state) =>
    product ? selectIsInWishlist(state, product.id) : false
  );

  useEffect(() => {
    if (product) {
      setSelectedWeight(product.weightOptions?.[0] || product.unit);
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity, selectedWeight }));
    toast.success(`Added ${quantity} × ${product.name} to cart!`);
    dispatch(closeQuickView());
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.info(`Removed ${product.name} from wishlist`);
    } else {
      toast.success(`Added ${product.name} to wishlist ❤️`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && dispatch(closeQuickView())}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-3xl border-0">
        <DialogTitle className="sr-only">{product.name} Quick View</DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Left: Gallery */}
          <div className="bg-brand-surface p-6 flex flex-col justify-between">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-soft-sm mb-4">
              <img
                src={product.images?.[activeImageIndex] || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.discount > 0 && (
                  <Badge variant="discount">{product.discount}% OFF</Badge>
                )}
                {product.isOrganic && (
                  <Badge variant="organic">100% Organic</Badge>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-brand-primary scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-fresh">
                  {product.category.replace('-', ' ')}
                </span>
                <span className="text-slate-300">•</span>
                <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
              </div>

              <h2 className="text-2xl font-bold text-brand-dark font-serif mb-2">
                {product.name}
              </h2>

              <p className="text-xs text-brand-muted flex items-center gap-1 mb-4">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{product.origin}</span>
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-black text-brand-primary">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Inclusive of all taxes
                </span>
              </div>

              <p className="text-sm text-brand-dark/80 line-clamp-3 mb-5 leading-relaxed">
                {product.description}
              </p>

              {/* Weight Options */}
              {product.weightOptions && product.weightOptions.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wide">
                    Select Pack Size / Weight:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.weightOptions.map((weight) => (
                      <button
                        key={weight}
                        type="button"
                        onClick={() => setSelectedWeight(weight)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                          selectedWeight === weight
                            ? 'bg-brand-primary border-brand-primary text-white shadow-soft-sm'
                            : 'border-emerald-200 bg-white text-brand-dark hover:bg-brand-light'
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quality Guarantee Pill */}
              <div className="p-3 rounded-2xl bg-brand-light/70 border border-emerald-100 flex items-center gap-2.5 mb-6 text-xs text-brand-dark">
                <ShieldCheck className="w-4 h-4 text-brand-fresh shrink-0" />
                <span>Harvested at 5 AM & delivered in climate-controlled packs.</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-emerald-100">
              <div className="flex items-center gap-3">
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                  size="default"
                />

                <Button
                  onClick={handleAddToCart}
                  className="flex-1 rounded-full gap-2 font-bold shadow-fresh"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart • {formatCurrency(product.price * quantity)}</span>
                </Button>

                <button
                  type="button"
                  onClick={handleWishlist}
                  className={`w-11 h-11 rounded-full border border-emerald-200 flex items-center justify-center transition-colors ${
                    isInWishlist
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-white text-brand-dark hover:bg-brand-light'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <div className="text-center">
                <Link
                  to={`/product/${product.slug}`}
                  onClick={() => dispatch(closeQuickView())}
                  className="text-xs font-bold text-brand-primary hover:underline"
                >
                  View Full Product Details & Nutritional Facts →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
