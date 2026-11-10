import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  RotateCcw,
  ChevronRight,
  ExternalLink,
  MapPin,
  ShoppingBag,
} from 'lucide-react';
import { toast } from 'sonner';

import { selectOrders } from '@/redux/slices/authSlice';
import { addToCart } from '@/redux/slices/cartSlice';
import { formatCurrency } from '@/utils';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      dispatch(
        addToCart({
          product: {
            id: item.id,
            name: item.name,
            price: item.price,
            images: [item.image],
            unit: item.selectedWeight,
          },
          quantity: item.quantity,
          selectedWeight: item.selectedWeight,
        })
      );
    });
    toast.success(`Re-ordered ${order.items.length} items to your basket! 🧺`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Out for Delivery':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Confirmed':
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen py-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'My Orders & Tracking' }]} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6 pb-4 border-b border-emerald-100">
          <div>
            <h1 className="text-3xl font-extrabold text-brand-dark font-serif">
              Order History & Tracking
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
              Live status of your farm deliveries and invoice summaries
            </p>
          </div>

          {/* Filter Status Buttons */}
          <div className="flex flex-wrap gap-2">
            {['all', 'confirmed', 'out for delivery', 'delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize transition-all ${
                  filterStatus === st
                    ? 'bg-brand-primary text-white shadow-soft-sm'
                    : 'bg-white text-brand-dark border border-emerald-100 hover:bg-brand-light'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No Orders Found"
            description="You don't have any orders matching the selected status."
            actionText="Shop Fresh Produce"
            actionLink="/shop"
          />
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-soft-sm space-y-6"
              >
                {/* Header row: Order ID, Date, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-100">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-serif font-black text-lg text-brand-dark">
                      {order.id}
                    </span>
                    <span className="text-xs text-brand-muted">
                      Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-full text-xs border-emerald-200"
                    >
                      <span>View Invoice</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>

                {/* Tracking Progress Steps */}
                <div className="bg-brand-bg p-4 rounded-2xl border border-emerald-100/70">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-muted mb-3">
                    Delivery Progression: {order.deliverySlot}
                  </p>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mb-1 shadow-xs">
                        ✓
                      </div>
                      <span className="font-bold text-brand-dark">Harvested</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mb-1 shadow-xs">
                        ✓
                      </div>
                      <span className="font-bold text-brand-dark">Quality Checked</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1 shadow-xs ${
                          order.status === 'Out for Delivery' || order.status === 'Delivered'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-emerald-100 text-brand-primary'
                        }`}
                      >
                        {order.status === 'Delivered' ? '✓' : '⚡'}
                      </div>
                      <span className="font-bold text-brand-dark">Cold Transit</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1 shadow-xs ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {order.status === 'Delivered' ? '✓' : '4'}
                      </div>
                      <span className="font-bold text-brand-dark">Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Items summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-brand-surface border border-emerald-100/60 flex items-center gap-3"
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover bg-white shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-brand-dark truncate">{item.name}</p>
                        <p className="text-[11px] text-brand-muted">
                          {item.quantity} × {item.selectedWeight}
                        </p>
                        <p className="text-xs font-extrabold text-brand-primary font-sans mt-0.5">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-emerald-100">
                  <div className="text-xs text-brand-muted">
                    Total: <strong className="text-brand-dark text-base font-sans font-black">{formatCurrency(order.total)}</strong>{' '}
                    via {order.paymentMethod}
                  </div>

                  <Button
                    onClick={() => handleReorder(order)}
                    size="sm"
                    className="rounded-full gap-2 font-bold text-xs shadow-soft-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-Order Basket</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Invoice Modal */}
        {selectedOrder && (
          <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
            <DialogContent className="max-w-xl p-6 sm:p-8 rounded-3xl">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>Tax Invoice & Summary</DialogTitle>
                  <span className="text-xs text-brand-primary font-mono font-bold">
                    {selectedOrder.id}
                  </span>
                </div>
              </DialogHeader>

              <div className="space-y-4 text-xs text-brand-dark pt-3">
                <div className="p-3.5 rounded-2xl bg-brand-bg space-y-1">
                  <p className="font-bold">Chitti's Market Private Limited</p>
                  <p className="text-brand-muted">FSSAI Lic: 10022047000189 • GSTIN: 36AAACC1208D1Z2</p>
                  <p className="text-brand-muted">Delivering to: {selectedOrder.deliveryAddress?.name}</p>
                  <p className="text-brand-muted">
                    {selectedOrder.deliveryAddress?.street}, {selectedOrder.deliveryAddress?.city}
                  </p>
                </div>

                {/* Itemized Table */}
                <div className="border border-emerald-100 rounded-2xl overflow-hidden divide-y divide-emerald-50">
                  <div className="bg-brand-surface p-2.5 font-bold flex justify-between">
                    <span>Item</span>
                    <span>Amount</span>
                  </div>
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="p-2.5 flex justify-between">
                      <span>
                        {it.name} ({it.quantity} × {it.selectedWeight})
                      </span>
                      <span className="font-bold font-sans">
                        {formatCurrency(it.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-1 text-right pt-2">
                  <p className="text-brand-muted">Subtotal: {formatCurrency(selectedOrder.subtotal)}</p>
                  {selectedOrder.discount > 0 && (
                    <p className="text-brand-fresh">Discount: -{formatCurrency(selectedOrder.discount)}</p>
                  )}
                  <p className="text-brand-muted">Delivery: {formatCurrency(selectedOrder.deliveryFee)}</p>
                  <p className="text-base font-black text-brand-primary pt-1 border-t border-emerald-100 font-sans">
                    Final Paid: {formatCurrency(selectedOrder.total)}
                  </p>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <Button
                    onClick={() => {
                      window.print();
                    }}
                    variant="outline"
                    className="rounded-full text-xs"
                  >
                    Print Receipt
                  </Button>
                  <Button onClick={() => setSelectedOrder(null)} className="rounded-full text-xs">
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Orders;
