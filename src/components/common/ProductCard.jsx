import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { formatCurrency } from '@/utils';
import { addToCart, selectCartItems, updateQuantity } from '@/redux/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/redux/slices/wishlistSlice';
import { openQuickView } from '@/redux/slices/productSlice';
import { Badge } from '@/components/ui/badge';
import { RatingStars } from './RatingStars';
import { QuantitySelector } from './QuantitySelector';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedWeight, setSelectedWeight] = useState(
    product.weightOptions?.[0] || product.unit
  );

  const isInWishlist = useSelector((state) => selectIsInWishlist(state, product.id));
  const cartItems = useSelector(selectCartItems);

  // Check if this item with this selected weight is in cart
  const cartItem = cartItems.find(
    (item) => item.id === product.id && item.selectedWeight === selectedWeight
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1, selectedWeight }));
    toast.success(`Added ${product.name} to basket!`, {
      description: `${selectedWeight} • ${formatCurrency(product.price)}`,
    });
  };

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      dispatch(
        updateQuantity({
          id: product.id,
          selectedWeight,
          quantity: cartItem.quantity + 1,
        })
      );
    } else {
      dispatch(addToCart({ product, quantity: 1, selectedWeight }));
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem) {
      dispatch(
        updateQuantity({
          id: product.id,
          selectedWeight,
          quantity: cartItem.quantity - 1,
        })
      );
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.info(`Removed ${product.name} from wishlist`);
    } else {
      toast.success(`Saved ${product.name} to your wishlist ❤️`);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(openQuickView(product));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col rounded-3xl border border-emerald-100/70 bg-white p-3.5 sm:p-4 shadow-soft-sm hover:shadow-soft-xl hover:border-emerald-200 transition-all duration-300"
    >
      {/* Image Container with Badges & Actions */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-brand-surface">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
            loading="lazy"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.discount > 0 && (
            <Badge variant="discount" className="text-[10px] px-2 py-0.5">
              {product.discount}% OFF
            </Badge>
          )}
          {product.isOrganic && (
            <Badge variant="organic" className="text-[10px] px-2 py-0.5">
              Organic
            </Badge>
          )}
          {product.badge && (
            <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-brand-primary/90 text-white px-2 py-0.5 rounded-full shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Top Right Quick Action Buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={handleWishlist}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
              isInWishlist
                ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                : 'bg-white/90 text-brand-dark hover:bg-white hover:text-rose-600'
            }`}
            aria-label="Add to Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${
                isInWishlist ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
          </button>

          <button
            onClick={handleQuickView}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 text-brand-dark flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:bg-white hover:text-brand-primary shadow-sm"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Out of Stock Overlay */}
        {(!product.inStock || product.stockQuantity <= 0) && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="font-bold text-xs uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 pt-3">
        {/* Rating & Unit */}
        <div className="flex items-center justify-between text-xs text-brand-muted mb-1">
          <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size="xs" />
          <span className="font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
            {product.unit}
          </span>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.slug}`}
          className="font-bold text-brand-dark text-sm sm:text-base line-clamp-1 hover:text-brand-primary transition-colors my-1 font-serif"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Farm & Origin snippet */}
        <p className="text-[11px] text-brand-muted truncate mb-2">
          {product.origin}
        </p>

        {/* Weight options picker if multiple */}
        {product.weightOptions && product.weightOptions.length > 1 && (
          <div className="flex items-center gap-1 overflow-x-auto pb-1 mb-2.5 no-scrollbar">
            {product.weightOptions.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setSelectedWeight(w)}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedWeight === w
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'bg-brand-light text-brand-dark hover:bg-emerald-200/50'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        )}

        {/* Price & Action row */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2 border-t border-emerald-50">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-brand-primary font-sans">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold block">
              In Stock: {product.stockQuantity}
            </span>
          </div>

          {/* Cart Interaction: Add or Stepper */}
          {cartItem ? (
            <QuantitySelector
              quantity={cartItem.quantity}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
              size="sm"
            />
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || product.stockQuantity <= 0}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-3 sm:px-4 py-2 text-xs font-bold text-white shadow-soft-sm transition-all hover:bg-brand-accent hover:shadow-fresh active:scale-95 disabled:opacity-50"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
