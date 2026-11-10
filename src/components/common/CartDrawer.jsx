import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Trash2, ArrowRight, Tag, Truck } from 'lucide-react';
import { toast } from 'sonner';

import {
  selectCartItems,
  selectCartSubtotal,
  selectCartDiscount,
  selectDeliveryFee,
  selectCartTotal,
  selectCartItemCount,
  selectIsCartDrawerOpen,
  toggleCartDrawer,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  selectAppliedCoupon,
  selectCouponError,
} from '@/redux/slices/cartSlice';
import { formatCurrency } from '@/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from './QuantitySelector';

export const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOpen = useSelector(selectIsCartDrawerOpen);
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

  const handleCheckout = () => {
    dispatch(toggleCartDrawer(false));
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => dispatch(toggleCartDrawer(open))}>
      <SheetContent side="right" className="flex flex-col p-0 w-full sm:max-w-md">
        {/* Header */}
        <SheetHeader className="p-5 border-b border-emerald-100 flex-row items-center justify-between text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-primary">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <SheetTitle className="text-lg">Fresh Basket</SheetTitle>
              <p className="text-xs text-brand-muted">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>
        </SheetHeader>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-brand-surface px-5 py-3 border-b border-emerald-100/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-dark mb-1.5">
            <Truck className="w-4 h-4 text-brand-fresh shrink-0" />
            <span>
              {amountNeeded === 0 ? (
                <span className="text-brand-primary font-bold">
                  🎉 You unlocked FREE Express Delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="text-brand-primary">{formatCurrency(amountNeeded)}</strong> more for FREE Delivery!
                </span>
              )}
            </span>
          </div>
          <div className="w-full bg-emerald-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-brand-fresh h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Basket Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-emerald-50">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-brand-muted mb-4">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h4 className="text-lg font-bold text-brand-dark font-serif mb-1">
                Your basket is empty
              </h4>
              <p className="text-xs text-brand-muted max-w-xs mb-6">
                Explore our crisp orchard fruits, daily kitchen vegetables, and handcrafted baskets.
              </p>
              <Button
                onClick={() => dispatch(toggleCartDrawer(false))}
                asChild
                className="rounded-full px-6"
              >
                <Link to="/shop">Shop Fresh Produce</Link>
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.selectedWeight}`} className="py-3.5 flex gap-3.5 items-center group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-2xl object-cover bg-brand-surface shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-sm text-brand-dark truncate font-serif">
                    {item.name}
                  </h5>
                  <p className="text-xs text-brand-muted mb-1.5">
                    {item.selectedWeight} • {formatCurrency(item.price)}
                  </p>

                  <div className="flex items-center justify-between">
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
                      size="sm"
                    />

                    <span className="font-black text-sm text-brand-primary">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
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
                  className="text-slate-300 hover:text-rose-500 p-1.5 rounded-lg transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-emerald-100 p-5 bg-white space-y-4">
            {/* Quick Coupon Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
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
                    className="text-rose-600 hover:underline font-semibold"
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
                    placeholder="Enter coupon (e.g. FRESH20)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-emerald-100 uppercase focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                  <Button type="submit" size="sm" variant="outline" className="rounded-xl px-4 text-xs">
                    Apply
                  </Button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-500 mt-1">{couponError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-brand-muted">
              <div className="flex justify-between">
                <span>Produce Subtotal</span>
                <span className="font-semibold text-brand-dark">{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-brand-fresh font-semibold">
                  <span>Fresh Coupon Savings</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Farm Delivery</span>
                <span className="font-semibold text-brand-dark">
                  {deliveryFee === 0 ? (
                    <span className="text-brand-fresh uppercase font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
                      Free
                    </span>
                  ) : (
                    formatCurrency(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-brand-dark pt-2 border-t border-emerald-100">
                <span>Total Amount</span>
                <span className="text-brand-primary font-sans">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  dispatch(toggleCartDrawer(false));
                  navigate('/cart');
                }}
              >
                View Full Cart
              </Button>
              <Button
                onClick={handleCheckout}
                className="rounded-full gap-1.5 shadow-fresh font-bold"
              >
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
