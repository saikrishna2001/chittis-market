import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  QrCode,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Clock,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  selectCartItems,
  selectCartSubtotal,
  selectCartDiscount,
  selectDeliveryFee,
  selectCartTotal,
  clearCart,
  selectAppliedCoupon,
} from '@/redux/slices/cartSlice';
import {
  selectCurrentUser,
  selectAddresses,
  placeOrder,
} from '@/redux/slices/authSlice';
import { formatCurrency } from '@/utils';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  street: z.string().min(5, 'Delivery address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  deliverySlot: z.string().min(1, 'Please select a delivery slot'),
  instructions: z.string().optional(),
  paymentMethod: z.string().min(1, 'Select a payment method'),
});

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectCartDiscount);
  const deliveryFee = useSelector(selectDeliveryFee);
  const total = useSelector(selectCartTotal);
  const appliedCoupon = useSelector(selectAppliedCoupon);
  const currentUser = useSelector(selectCurrentUser);
  const savedAddresses = useSelector(selectAddresses);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSavedAddr, setSelectedSavedAddr] = useState(savedAddresses?.[0]?.id || null);

  const defaultAddress = savedAddresses?.[0] || {};

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: currentUser?.name || defaultAddress.name || '',
      email: currentUser?.email || 'customer@example.com',
      phone: currentUser?.phone || defaultAddress.phone || '+91 98765 43210',
      street: defaultAddress.street || 'Flat 402, Green Meadows, Road No 12, Banjara Hills',
      city: defaultAddress.city || 'Hyderabad',
      state: defaultAddress.state || 'Telangana',
      pincode: defaultAddress.pincode || '500034',
      deliverySlot: 'Morning Slot (7:00 AM - 10:00 AM)',
      instructions: 'Please ring the doorbell and leave near the door if not answered.',
      paymentMethod: 'upi',
    },
  });

  const selectedPayment = watch('paymentMethod');
  const selectedSlot = watch('deliverySlot');

  const handleSelectSavedAddress = (addr) => {
    setSelectedSavedAddr(addr.id);
    setValue('fullName', addr.name);
    setValue('phone', addr.phone);
    setValue('street', addr.street);
    setValue('city', addr.city);
    setValue('state', addr.state);
    setValue('pincode', addr.pincode);
  };

  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Add items before placing an order.');
      navigate('/shop');
      return;
    }

    setIsSubmitting(true);
    // Simulate payment & order dispatching latency
    setTimeout(() => {
      const orderPayload = {
        deliveryAddress: {
          name: data.fullName,
          phone: data.phone,
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        },
        deliverySlot: data.deliverySlot,
        instructions: data.instructions,
        paymentMethod:
          data.paymentMethod === 'upi'
            ? 'UPI / Instant Pay'
            : data.paymentMethod === 'cod'
            ? 'Cash on Delivery'
            : 'Credit / Debit Card',
        items: [...cartItems],
        subtotal,
        discount,
        deliveryFee,
        total,
      };

      dispatch(placeOrder(orderPayload));
      dispatch(clearCart());
      setIsSubmitting(false);
      toast.success('Order placed successfully! 🎉', {
        description: 'Your fresh produce will arrive in insulated cold boxes.',
      });
      navigate('/order-success');
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] py-16 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold font-serif mb-2">No Items in Basket</h2>
        <p className="text-sm text-brand-muted mb-6">
          You don't have any produce to checkout with.
        </p>
        <Button asChild className="rounded-full">
          <Link to="/shop">Shop Fresh Produce</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Basket', href: '/cart' },
            { label: 'Express Checkout' },
          ]}
        />

        <div className="my-6">
          <h1 className="text-3xl font-extrabold text-brand-dark font-serif">
            Express Checkout
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
            Safe 256-bit encrypted fresh grocery order placement
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Delivery & Payment Details (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Saved Addresses quick picker */}
              {savedAddresses && savedAddresses.length > 0 && (
                <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-sm text-brand-dark font-serif flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-primary" />
                      <span>Select Saved Delivery Address</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => handleSelectSavedAddress(addr)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          selectedSavedAddr === addr.id
                            ? 'border-brand-primary bg-emerald-50/60 ring-1 ring-brand-primary'
                            : 'border-emerald-100 bg-white hover:bg-brand-bg'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-brand-dark">
                            {addr.name} ({addr.type})
                          </span>
                          {addr.isDefault && (
                            <span className="text-[9px] bg-brand-primary text-white font-bold px-1.5 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-brand-muted line-clamp-2">
                          {addr.street}, {addr.city} - {addr.pincode}
                        </p>
                        <p className="text-[11px] text-brand-muted mt-1">{addr.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Contact & Address Form */}
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft-sm space-y-4">
                <h3 className="font-bold text-base text-brand-dark font-serif pb-2 border-b border-emerald-100">
                  1. Delivery Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      Full Name *
                    </label>
                    <Input {...register('fullName')} placeholder="e.g. Sravan Kumar" />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      Phone Number *
                    </label>
                    <Input {...register('phone')} placeholder="+91 98765 43210" />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Email Address *
                  </label>
                  <Input {...register('email')} type="email" placeholder="for harvest receipts" />
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Flat / House No., Apartment, Street *
                  </label>
                  <Input {...register('street')} placeholder="e.g. Flat 402, Green View Meadows, Banjara Hills" />
                  {errors.street && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.street.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      City *
                    </label>
                    <Input {...register('city')} placeholder="Hyderabad" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      State *
                    </label>
                    <Input {...register('state')} placeholder="Telangana" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      Pincode *
                    </label>
                    <Input {...register('pincode')} placeholder="500034" />
                  </div>
                </div>
              </div>

              {/* Delivery Slot Selection */}
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft-sm space-y-4">
                <h3 className="font-bold text-base text-brand-dark font-serif pb-2 border-b border-emerald-100">
                  2. Preferred Delivery Slot
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      label: 'Morning Slot',
                      time: '7:00 AM - 10:00 AM',
                      tag: 'Fresh Dawn Harvest',
                    },
                    {
                      label: 'Afternoon Slot',
                      time: '1:00 PM - 4:00 PM',
                      tag: 'Mid-Day Delivery',
                    },
                    {
                      label: 'Evening Slot',
                      time: '5:00 PM - 8:00 PM',
                      tag: 'Dinner Prep',
                    },
                  ].map((slot) => {
                    const value = `${slot.label} (${slot.time})`;
                    const isSelected = selectedSlot === value;
                    return (
                      <div
                        key={slot.label}
                        onClick={() => setValue('deliverySlot', value)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-brand-primary bg-emerald-50/70 shadow-soft-sm ring-1 ring-brand-primary'
                            : 'border-emerald-100 bg-white hover:bg-brand-bg'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-brand-dark">{slot.label}</span>
                          <Clock className="w-3.5 h-3.5 text-brand-fresh" />
                        </div>
                        <p className="text-xs font-semibold text-brand-primary">{slot.time}</p>
                        <span className="text-[10px] text-brand-muted block mt-1">
                          {slot.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <Input
                    {...register('instructions')}
                    placeholder="e.g. Leave with security guard, don't ring bell if sleeping toddler"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft-sm space-y-4">
                <h3 className="font-bold text-base text-brand-dark font-serif pb-2 border-b border-emerald-100">
                  3. Payment Options
                </h3>

                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    onClick={() => setValue('paymentMethod', 'upi')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedPayment === 'upi'
                        ? 'border-brand-primary bg-emerald-50/60 ring-1 ring-brand-primary'
                        : 'border-emerald-100 bg-white hover:bg-brand-bg'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-brand-primary flex items-center justify-center">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-dark">
                          UPI / QR Code / Net Banking
                        </p>
                        <p className="text-[11px] text-brand-muted">
                          Google Pay, PhonePe, Paytm & BHIM
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    onClick={() => setValue('paymentMethod', 'cod')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedPayment === 'cod'
                        ? 'border-brand-primary bg-emerald-50/60 ring-1 ring-brand-primary'
                        : 'border-emerald-100 bg-white hover:bg-brand-bg'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-dark">
                          Cash on Delivery (COD)
                        </p>
                        <p className="text-[11px] text-brand-muted">
                          Pay cash or scan QR when your cold basket arrives
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Cards */}
                  <label
                    onClick={() => setValue('paymentMethod', 'card')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedPayment === 'card'
                        ? 'border-brand-primary bg-emerald-50/60 ring-1 ring-brand-primary'
                        : 'border-emerald-100 bg-white hover:bg-brand-bg'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-dark">
                          Credit or Debit Card
                        </p>
                        <p className="text-[11px] text-brand-muted">
                          Visa, MasterCard, RuPay with OTP verification
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 bg-white rounded-3xl border border-emerald-100 p-6 shadow-soft-sm space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                  <h3 className="font-bold text-lg text-brand-dark font-serif">
                    Basket Summary ({cartItems.length} items)
                  </h3>
                  <Link to="/cart" className="text-xs font-bold text-brand-primary hover:underline">
                    Edit Cart
                  </Link>
                </div>

                {/* Items preview list */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-emerald-50">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedWeight}`}
                      className="pt-2 first:pt-0 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover bg-brand-surface shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-brand-dark truncate">{item.name}</p>
                          <p className="text-[11px] text-brand-muted">
                            {item.quantity} × {item.selectedWeight}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-brand-dark font-sans">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="space-y-2 pt-3 border-t border-emerald-100 text-xs sm:text-sm text-brand-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-brand-dark">{formatCurrency(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-brand-fresh font-semibold">
                      <span>Promo Savings ({appliedCoupon?.code})</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Express Delivery</span>
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

                  <div className="flex justify-between text-xl font-black text-brand-dark pt-3 border-t border-emerald-100">
                    <span>Total Amount</span>
                    <span className="text-brand-primary font-sans">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full rounded-full gap-2 text-base font-bold shadow-fresh"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Placing Fresh Order...' : `Place Order • ${formatCurrency(total)}`}
                  </span>
                </Button>

                <div className="p-3 bg-brand-light/60 rounded-2xl flex items-center justify-center gap-2 text-[11px] text-brand-primary font-semibold">
                  <ShieldCheck className="w-4 h-4 text-brand-fresh" />
                  <span>256-Bit Bank-Grade Encryption Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
