import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  ShoppingBag,
  Users,
  Tag,
  Truck,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  Check,
  ArrowUpRight,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  selectAllProducts,
  addProduct,
  deleteProduct,
  updateStockQuantity,
} from '@/redux/slices/productSlice';
import {
  selectOrders,
  updateOrderStatus,
} from '@/redux/slices/authSlice';
import { categories } from '@/data/categories';
import { formatCurrency } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const orders = useSelector(selectOrders);

  const [activeTab, setActiveTab] = useState('overview');
  const [productSearch, setProductSearch] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'fresh-fruits',
    price: '',
    originalPrice: '',
    unit: '1 kg',
    stockQuantity: 50,
    isOrganic: true,
    isSeasonal: false,
    origin: 'Local Certified Organic Farms',
    images: ['https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80'],
    description: 'Fresh organic produce directly harvested from local orchards.',
  });

  // Coupons state for admin
  const [couponsList, setCouponsList] = useState([
    { code: 'FRESH20', discount: '20% Off', type: 'Percentage', minOrder: 499, active: true },
    { code: 'CHITTI10', discount: '10% Off', type: 'Percentage', minOrder: 0, active: true },
    { code: 'HEALTHY50', discount: '₹50 Flat', type: 'Flat', minOrder: 299, active: true },
  ]);

  // Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0) + 128450;
  const totalOrdersCount = orders.length + 382;
  const totalCustomersCount = 1420;
  const lowStockProducts = allProducts.filter((p) => p.stockQuantity < 45);
  const bestSellers = allProducts.filter((p) => p.isBestSeller);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) {
      toast.error('Product name and price are required');
      return;
    }
    dispatch(
      addProduct({
        ...newProd,
        price: Number(newProd.price),
        originalPrice: newProd.originalPrice ? Number(newProd.originalPrice) : Number(newProd.price) * 1.2,
        stockQuantity: Number(newProd.stockQuantity),
        discount: newProd.originalPrice ? Math.round(((Number(newProd.originalPrice) - Number(newProd.price)) / Number(newProd.originalPrice)) * 100) : 0,
        weightOptions: [newProd.unit, '2 kg'],
      })
    );
    toast.success(`Product "${newProd.name}" added to live catalog! 🥦`);
    setIsAddProductOpen(false);
    setNewProd({
      name: '',
      category: 'fresh-fruits',
      price: '',
      originalPrice: '',
      unit: '1 kg',
      stockQuantity: 50,
      isOrganic: true,
      isSeasonal: false,
      origin: 'Local Certified Organic Farms',
      images: ['https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80'],
      description: 'Fresh organic produce directly harvested from local orchards.',
    });
  };

  const handleRestock = (id, currentStock) => {
    dispatch(updateStockQuantity({ id, stockQuantity: currentStock + 50 }));
    toast.success('Restocked +50 units!');
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
    toast.success(`Order ${orderId} updated to "${newStatus}"`);
  };

  const filteredCatalog = allProducts.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F4F7F3] text-brand-dark pb-16">
      {/* Top Admin Header */}
      <div className="bg-brand-primary text-white py-4 px-4 sm:px-8 shadow-soft-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-bold">
              🛠️
            </div>
            <div>
              <h1 className="font-serif font-black text-lg sm:text-xl text-white leading-none">
                Chitti's Market Master Control
              </h1>
              <p className="text-[11px] text-emerald-200 mt-0.5">
                Admin Management & Real-time Operations Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs font-semibold text-emerald-100">
              Live Sync Active
            </span>
            <Button
              asChild
              size="sm"
              variant="white"
              className="rounded-full text-xs font-bold gap-1.5"
            >
              <Link to="/">
                <span>Back to Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'products', label: 'Product Catalog', icon: Package, count: allProducts.length },
            { id: 'inventory', label: 'Inventory Alerts', icon: Boxes, count: lowStockProducts.length, alert: true },
            { id: 'orders', label: 'Order Dispatch', icon: ShoppingBag, count: orders.length },
            { id: 'categories', label: 'Categories', icon: Layers, count: categories.length },
            { id: 'coupons', label: 'Coupons & Promos', icon: Tag },
            { id: 'delivery', label: 'Fleet & Delivery', icon: Truck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-soft-sm'
                    : 'bg-white text-brand-dark hover:bg-brand-light border border-emerald-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                      isActive
                        ? tab.alert
                          ? 'bg-amber-400 text-black'
                          : 'bg-white/20 text-white'
                        : tab.alert
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-50 text-brand-primary'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                    Total Revenue
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-brand-primary flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-brand-dark font-sans">
                  {formatCurrency(totalRevenue)}
                </div>
                <p className="text-xs text-brand-fresh font-semibold mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% from last week</span>
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                    Total Orders
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-brand-dark font-sans">
                  {totalOrdersCount}
                </div>
                <p className="text-xs text-blue-600 font-semibold mt-2">
                  98.6% On-Time Delivery Rate
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                    Active Customers
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-brand-dark font-sans">
                  {totalCustomersCount}
                </div>
                <p className="text-xs text-amber-700 font-semibold mt-2">
                  84% Repeat Monthly Buyers
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                    Low Stock Alerts
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-brand-dark font-sans">
                  {lowStockProducts.length} items
                </div>
                <p className="text-xs text-rose-600 font-semibold mt-2">
                  Below 45 units minimum threshold
                </p>
              </div>
            </div>

            {/* Sales Chart Visual representation */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-soft-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg text-brand-dark font-serif">
                    Weekly Produce Sales Breakdown
                  </h3>
                  <p className="text-xs text-brand-muted">Revenue per product category over the last 7 days</p>
                </div>
                <Badge variant="fresh">Live Trends</Badge>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Fresh Orchard Fruits', amount: 58240, percent: 85, color: 'bg-emerald-600' },
                  { label: 'Farm Fresh Vegetables', amount: 41800, percent: 68, color: 'bg-brand-fresh' },
                  { label: 'Artisan Gift Baskets & Hampers', amount: 32400, percent: 52, color: 'bg-brand-orange' },
                  { label: 'Certified Organic Vegetables', amount: 24100, percent: 40, color: 'bg-teal-600' },
                ].map((bar) => (
                  <div key={bar.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-brand-dark">
                      <span>{bar.label}</span>
                      <span className="font-sans font-bold">{formatCurrency(bar.amount)}</span>
                    </div>
                    <div className="w-full bg-emerald-50 h-3 rounded-full overflow-hidden">
                      <div
                        className={`${bar.color} h-full rounded-full transition-all duration-700`}
                        style={{ width: `${bar.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Sellers & Recent Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Best-Selling Products */}
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft-sm space-y-4">
                <h3 className="font-bold text-base text-brand-dark font-serif">
                  Top 5 Best-Selling Produce
                </h3>
                <div className="space-y-3">
                  {bestSellers.slice(0, 5).map((p, idx) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-2xl bg-brand-bg flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-brand-muted w-4">#{idx + 1}</span>
                        <img
                          src={p.images?.[0]}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover bg-white"
                        />
                        <div>
                          <p className="font-bold text-brand-dark font-serif">{p.name}</p>
                          <p className="text-brand-muted">{p.unit} • {formatCurrency(p.price)}</p>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                        {p.reviewsCount * 4} Units Sold
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Warning Box */}
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-brand-dark font-serif">
                    Critical Inventory Watchlist
                  </h3>
                  <span className="text-xs text-rose-600 font-bold">Needs Restock</span>
                </div>
                <div className="space-y-3">
                  {lowStockProducts.slice(0, 5).map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0]}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover bg-white"
                        />
                        <div>
                          <p className="font-bold text-brand-dark font-serif">{p.name}</p>
                          <p className="text-rose-600 font-bold">Only {p.stockQuantity} left</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleRestock(p.id, p.stockQuantity)}
                        className="rounded-full text-xs h-8 bg-rose-600 hover:bg-rose-700"
                      >
                        +50 Restock
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PRODUCT MANAGEMENT ================= */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-soft-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-100">
              <div>
                <h3 className="font-bold text-xl text-brand-dark font-serif">
                  Live Produce Catalog ({allProducts.length})
                </h3>
                <p className="text-xs text-brand-muted">
                  Add, edit, or adjust pricing and organic status across the entire store
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search catalog..."
                    className="pl-9 h-10 text-xs"
                  />
                </div>
                <Button
                  onClick={() => setIsAddProductOpen(true)}
                  className="rounded-full gap-1.5 text-xs font-bold shadow-fresh"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </Button>
              </div>
            </div>

            {/* Catalog Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-emerald-100 text-brand-muted uppercase text-[10px] font-bold">
                    <th className="py-3 px-3">Produce</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Stock Units</th>
                    <th className="py-3 px-3">Purity Tag</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50">
                  {filteredCatalog.map((prod) => (
                    <tr key={prod.id} className="hover:bg-brand-bg/50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.images?.[0]}
                            alt=""
                            className="w-10 h-10 rounded-xl object-cover bg-brand-surface shrink-0"
                          />
                          <div>
                            <p className="font-bold text-brand-dark font-serif text-sm">
                              {prod.name}
                            </p>
                            <p className="text-[11px] text-brand-muted">{prod.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 capitalize font-medium text-brand-dark">
                        {prod.category.replace('-', ' ')}
                      </td>
                      <td className="py-3 px-3 font-bold font-sans text-brand-primary text-sm">
                        {formatCurrency(prod.price)}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                            prod.stockQuantity < 45
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {prod.stockQuantity} in stock
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {prod.isOrganic ? (
                          <Badge variant="organic" className="text-[9px]">
                            100% Organic
                          </Badge>
                        ) : (
                          <span className="text-[10px] text-slate-500">Conventional</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleRestock(prod.id, prod.stockQuantity)}
                            className="text-brand-primary hover:underline font-semibold text-[11px]"
                            title="Restock"
                          >
                            +50 Stock
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${prod.name}?`)) {
                                dispatch(deleteProduct(prod.id));
                                toast.info(`Deleted ${prod.name}`);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: INVENTORY ================= */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-soft-sm space-y-6">
            <div>
              <h3 className="font-bold text-xl text-brand-dark font-serif">
                Cold-Chain Inventory & Stock Levels
              </h3>
              <p className="text-xs text-brand-muted">
                Keep minimum safety stock of 45 units for high-demand fruits and vegetables
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProducts.map((p) => (
                <div
                  key={p.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between ${
                    p.stockQuantity < 45
                      ? 'border-rose-200 bg-rose-50/40'
                      : 'border-emerald-100 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images?.[0]}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover bg-brand-surface"
                    />
                    <div>
                      <p className="font-bold text-xs text-brand-dark font-serif">{p.name}</p>
                      <p className="text-[11px] text-brand-muted">{p.unit}</p>
                      <p
                        className={`text-xs font-black mt-1 ${
                          p.stockQuantity < 45 ? 'text-rose-600' : 'text-emerald-700'
                        }`}
                      >
                        {p.stockQuantity} units remaining
                      </p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant={p.stockQuantity < 45 ? 'default' : 'outline'}
                    onClick={() => handleRestock(p.id, p.stockQuantity)}
                    className="rounded-full text-xs h-8"
                  >
                    +50 Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: ORDER DISPATCH ================= */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-soft-sm space-y-6">
            <div>
              <h3 className="font-bold text-xl text-brand-dark font-serif">
                Active Orders & Dispatch Queue ({orders.length})
              </h3>
              <p className="text-xs text-brand-muted">
                Change order fulfillment status and monitor cold-chain routing
              </p>
            </div>

            <div className="space-y-4">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="p-5 rounded-3xl border border-emerald-100 bg-brand-surface space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-100">
                    <div>
                      <span className="font-bold text-base text-brand-dark font-serif">
                        {o.id}
                      </span>
                      <span className="text-xs text-brand-muted ml-3">
                        Total: <strong>{formatCurrency(o.total)}</strong> ({o.paymentMethod})
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-brand-muted font-semibold">Change Status:</span>
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className="h-9 px-3 text-xs font-bold rounded-xl border border-emerald-200 bg-white text-brand-dark focus:outline-none"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing / Packing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer and Items Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-bold text-brand-dark">
                        Customer: {o.deliveryAddress?.name} ({o.deliveryAddress?.phone})
                      </p>
                      <p className="text-brand-muted">
                        Address: {o.deliveryAddress?.street}, {o.deliveryAddress?.city}
                      </p>
                      <p className="text-emerald-800 font-semibold mt-1">Slot: {o.deliverySlot}</p>
                    </div>

                    <div>
                      <p className="font-bold text-brand-dark mb-1">
                        Produce Ordered ({o.items?.length} items):
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {o.items?.map((it, idx) => (
                          <span
                            key={idx}
                            className="bg-white px-2 py-0.5 rounded-lg border border-emerald-100 text-[11px]"
                          >
                            {it.name} ({it.quantity}x)
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: CATEGORIES ================= */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-soft-sm space-y-6">
            <h3 className="font-bold text-xl text-brand-dark font-serif">
              Store Categories ({categories.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl border border-emerald-100 flex items-center gap-3 bg-brand-surface"
                >
                  <img
                    src={c.image}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover bg-white shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-brand-dark font-serif">{c.name}</h4>
                    <p className="text-[11px] text-brand-muted">{c.itemCount}</p>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full inline-block mt-1">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: COUPONS ================= */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-soft-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-brand-dark font-serif">
                  Promotions & Discount Codes
                </h3>
                <p className="text-xs text-brand-muted">
                  Active coupons available for customers at checkout
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {couponsList.map((c) => (
                <div
                  key={c.code}
                  className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-lg text-brand-primary font-mono tracking-wider">
                      {c.code}
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm font-bold text-brand-dark">{c.discount}</p>
                  <p className="text-xs text-brand-muted">
                    Min Order: {formatCurrency(c.minOrder)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 7: DELIVERY FLEET ================= */}
        {activeTab === 'delivery' && (
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-soft-sm space-y-6">
            <h3 className="font-bold text-xl text-brand-dark font-serif">
              Cold Transit Fleet Management
            </h3>
            <p className="text-xs text-brand-muted">
              Live insulated temperature monitoring & active delivery driver roster
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { van: 'Cold Van #01 (Banjara Hills)', driver: 'Raju G.', temp: '4.2°C', status: 'Delivering', orders: 6 },
                { van: 'Cold Van #02 (Jubilee Hills)', driver: 'Kiran V.', temp: '3.8°C', status: 'On Route', orders: 4 },
                { van: 'Cold Van #03 (HITEC City)', driver: 'Mahesh K.', temp: '4.0°C', status: 'At Hub', orders: 8 },
              ].map((v) => (
                <div key={v.van} className="p-4 rounded-2xl border border-emerald-100 bg-brand-surface space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-brand-dark">{v.van}</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {v.status}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted">Driver: {v.driver}</p>
                  <p className="text-xs font-semibold text-brand-primary">Insulated Temp: {v.temp}</p>
                  <p className="text-[11px] text-brand-muted">Assigned Baskets: {v.orders}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal: Add New Product to Catalog */}
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogContent className="max-w-lg p-6 rounded-3xl">
            <DialogHeader>
              <DialogTitle>Add New Produce to Catalog</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreateProduct} className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Name *</label>
                <Input
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Organic Hill Strawberries"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category *</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full h-11 px-3 rounded-2xl border border-emerald-100 bg-white"
                  >
                    <option value="fresh-fruits">Fresh Fruits</option>
                    <option value="fresh-vegetables">Fresh Vegetables</option>
                    <option value="fruit-baskets">Fruit Baskets</option>
                    <option value="vegetable-baskets">Vegetable Baskets</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Unit / Pack Size</label>
                  <Input
                    value={newProd.unit}
                    onChange={(e) => setNewProd({ ...newProd, unit: e.target.value })}
                    placeholder="e.g. 1 kg or 500 g"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price (₹) *</label>
                  <Input
                    type="number"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    placeholder="120"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Original Price (₹)</label>
                  <Input
                    type="number"
                    value={newProd.originalPrice}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                    placeholder="150"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock Units</label>
                  <Input
                    type="number"
                    value={newProd.stockQuantity}
                    onChange={(e) => setNewProd({ ...newProd, stockQuantity: e.target.value })}
                    placeholder="50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <Input
                  value={newProd.images[0]}
                  onChange={(e) => setNewProd({ ...newProd, images: [e.target.value] })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-emerald-200 bg-white"
                />
              </div>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProd.isOrganic}
                    onChange={(e) => setNewProd({ ...newProd, isOrganic: e.target.checked })}
                    className="w-4 h-4 accent-brand-primary"
                  />
                  <span>100% Organic</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProd.isSeasonal}
                    onChange={(e) => setNewProd({ ...newProd, isSeasonal: e.target.checked })}
                    className="w-4 h-4 accent-brand-primary"
                  />
                  <span>Seasonal Harvest</span>
                </label>
              </div>

              <Button type="submit" className="w-full rounded-full mt-4 font-bold shadow-fresh">
                Publish Product to Store
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
