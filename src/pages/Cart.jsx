import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  selectCartItems,
  selectCartSubtotal,
  selectCartDiscount,
  selectDeliveryFee,
  selectCartTotal,
  selectCartItemCount,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  selectAppliedCoupon,
  selectCouponError,
} from '@/redux/slices/cartSlice';
import { formatCurrency } from '@/utils';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { QuantitySelector } from '@/components/common/QuantitySelector';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartItemCount);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectCartDiscount);
  const deliveryFee = useSelector(selectDeliveryFee);
  const total = useSelector(selectCartTotal);
  const appliedCoupon = useSelector(selectAppliedCoupon);
  const couponError = useSelector(selectCouponError);

  const [couponCode, setCouponCode] = useState('');

  const freeDeliveryThreshold = 499;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    dispatch(applyCoupon(couponCode));
    setCouponCode('');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] py-12 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Your Shopping Basket' }]} />
          <EmptyState
            icon={ShoppingBag}
            title="Your Basket is Currently Empty"
            description="Explore our orchard-fresh fruits, crisp kitchen vegetables, and handcrafted organic gift hampers."
            actionText="Explore Fresh Produce"
            actionLink="/shop"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Your Shopping Basket' }]} />

        <div className="flex items-center justify-between my-6 pb-4 border-b border-emerald-100">
          <div>
            <h1 className="text-3xl font-extrabold text-brand-dark font-serif">
              Shopping Basket
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
              Review your fresh harvest selections before checkout
            </p>
          </div>

          <Button
            onClick={() => dispatch(clearCart())}
            variant="ghost"
            size="sm"
            className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Basket</span>
          </Button>
        </div>

        {/* Free Shipping Alert Banner */}
        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-soft-sm mb-8">
          <div className="flex items-center justify-between text-xs font-bold text-brand-dark mb-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-fresh" />
              <span>
                {amountNeeded === 0
                  ? '🎉 Congratulations! You unlocked FREE Express Delivery.'
                  : `Add ${formatCurrency(amountNeeded)} more for FREE Express Delivery!`}
              </span>
            </div>
            <span className="text-brand-primary">{progressPercent}%</span>
          </div>
          <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-brand-fresh h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2-Column Cart Layout: Table (8 cols) + Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Produce Items List (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-emerald-100/80 p-5 sm:p-6 shadow-soft-sm divide-y divide-emerald-50">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedWeight}`}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Left: Image & Title */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-brand-surface border border-emerald-100 shrink-0"
                    />
                    <div>
                      <Link
                        to={`/product/${item.slug}`}
                        className="font-bold text-base text-brand-dark hover:text-brand-primary transition-colors font-serif line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-brand-muted mt-0.5">
                        Selected Pack: <strong className="text-brand-dark">{item.selectedWeight}</strong>
                      </p>
                      <p className="text-xs text-brand-primary font-bold mt-1">
                        {formatCurrency(item.price)} each
                      </p>
                    </div>
                  </div>

                  {/* Right: Quantity + Total + Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrease={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            selectedWeight: item.selectedWeight,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      onDecrease={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            selectedWeight: item.selectedWeight,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      size="default"
                    />

                    <div className="text-right min-w-[80px]">
                      <span className="text-base sm:text-lg font-black text-brand-dark font-sans">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            id: item.id,
                            selectedWeight: item.selectedWeight,
                          })
                        )
                      }
                      className="text-slate-300 hover:text-rose-500 p-2 rounded-xl hover:bg-rose-50 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quality Promise Pill */}
            <div className="p-4 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3 text-xs text-brand-dark">
              <ShieldCheck className="w-5 h-5 text-brand-fresh shrink-0" />
              <span>
                <strong>100% Quality & Freshness Guarantee:</strong> If any fruit or vegetable fails to meet your high standard, we will replace or refund it immediately with zero hassle.
              </span>
            </div>
          </div>

          {/* Order Summary & Coupon (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-3xl border border-emerald-100/80 p-6 shadow-soft-sm space-y-6">
              <h3 className="font-bold text-lg text-brand-dark font-serif pb-3 border-b border-emerald-100">
                Order Summary
              </h3>

              {/* Coupon Bar */}
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
                  Have a Promo Code?
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-brand-primary" />
                      <div>
                        <span className="font-bold text-brand-primary uppercase">
                          {appliedCoupon.code}
                        </span>{' '}
                        applied ({appliedCoupon.description})
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(removeCoupon())}
                      className="text-rose-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. FRESH20 or CHITTI10"
                      className="flex-1 px-4 py-2.5 text-xs rounded-2xl border border-emerald-200 uppercase focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    />
                    <Button type="submit" size="sm" variant="outline" className="rounded-2xl px-5 text-xs">
                      Apply
                    </Button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-500 mt-1">{couponError}</p>
                )}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-3 pt-3 border-t border-emerald-100 text-xs sm:text-sm text-brand-muted">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-semibold text-brand-dark">{formatCurrency(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-brand-fresh font-semibold">
                    <span>Coupon Savings</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Cold Delivery</span>
                  <span className="font-semibold text-brand-dark">
                    {deliveryFee === 0 ? (
                      <span className="text-brand-fresh uppercase font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded">
                        FREE
                      </span>
                    ) : (
                      formatCurrency(deliveryFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-black text-brand-dark pt-3 border-t border-emerald-100">
                  <span>Estimated Total</span>
                  <span className="text-brand-primary font-sans">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => navigate('/checkout')}
                size="lg"
                className="w-full rounded-full gap-2 text-base font-bold shadow-fresh"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="text-center pt-2">
                <Link
                  to="/shop"
                  className="text-xs font-semibold text-brand-muted hover:text-brand-primary transition-colors"
                >
                  ← Continue Shopping for Fresh Produce
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
