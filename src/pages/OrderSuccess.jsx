import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CheckCircle2,
  Package,
  Truck,
  Calendar,
  Printer,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';

import { selectOrders } from '@/redux/slices/authSlice';
import { formatCurrency } from '@/utils';
import { Button } from '@/components/ui/button';

export const OrderSuccess = () => {
  const orders = useSelector(selectOrders);
  const latestOrder = orders?.[0];

  return (
    <div className="min-h-screen py-12 bg-brand-bg flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2.5rem] border border-emerald-100 p-8 sm:p-12 shadow-soft-xl text-center space-y-6"
        >
          {/* Animated Success Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-brand-fresh flex items-center justify-center mx-auto shadow-fresh">
            <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-fresh bg-brand-light px-3.5 py-1 rounded-full">
              Order Confirmed & Farm Dispatched
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark font-serif">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
              We've received your order and our harvest specialists are hand-picking your produce right now.
            </p>
          </div>

          {/* Key Order Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-3xl bg-brand-bg border border-emerald-100/80 text-left text-xs">
            <div>
              <span className="text-brand-muted block text-[10px] uppercase font-bold">
                Order ID
              </span>
              <span className="font-extrabold text-brand-primary text-sm font-sans">
                {latestOrder?.id || 'CM-ORD-98421'}
              </span>
            </div>

            <div>
              <span className="text-brand-muted block text-[10px] uppercase font-bold">
                Delivery Window
              </span>
              <span className="font-bold text-brand-dark text-xs flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                <span>Today (45 mins)</span>
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-brand-muted block text-[10px] uppercase font-bold">
                Total Paid
              </span>
              <span className="font-black text-brand-dark text-sm font-sans">
                {formatCurrency(latestOrder?.total || 848)}
              </span>
            </div>
          </div>

          {/* Delivery Address Snapshot */}
          {latestOrder?.deliveryAddress && (
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-left text-xs text-brand-dark flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-brand-dark">
                  Delivering to: {latestOrder.deliveryAddress.name}
                </p>
                <p className="text-brand-muted">
                  {latestOrder.deliveryAddress.street}, {latestOrder.deliveryAddress.city} - {latestOrder.deliveryAddress.pincode}
                </p>
                <p className="text-emerald-800 font-medium mt-1">
                  Slot: {latestOrder.deliverySlot}
                </p>
              </div>
            </div>
          )}

          {/* Items Summary Preview */}
          {latestOrder?.items && (
            <div className="text-left pt-2">
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
                Included Produce ({latestOrder.items.length} items)
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {latestOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1.5 border-b border-emerald-50 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt=""
                        className="w-8 h-8 rounded-lg object-cover bg-brand-surface"
                      />
                      <span className="font-medium text-brand-dark">{item.name}</span>
                      <span className="text-[11px] text-brand-muted">
                        ({item.quantity} × {item.selectedWeight})
                      </span>
                    </div>
                    <span className="font-bold text-brand-primary">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="w-full sm:w-auto rounded-full gap-2 font-bold shadow-fresh">
              <Link to="/orders">
                <Package className="w-4 h-4" />
                <span>Track Order Live</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full font-bold border-emerald-200"
            >
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
