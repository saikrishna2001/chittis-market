import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  Leaf,
  Clock,
  MapPin,
  ChevronRight,
  Star,
  Check,
  Send,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

import { selectAllProducts } from '@/redux/slices/productSlice';
import { addToCart } from '@/redux/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/redux/slices/wishlistSlice';
import { formatCurrency } from '@/utils';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RatingStars } from '@/components/common/RatingStars';
import { QuantitySelector } from '@/components/common/QuantitySelector';
import { ProductCard } from '@/components/common/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allProducts = useSelector(selectAllProducts);
  const product = allProducts.find((p) => p.slug === slug || p.id === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('500034');
  const [pincodeChecked, setPincodeChecked] = useState(false);

  // New review state
  const [userReview, setUserReview] = useState({ name: '', rating: 5, comment: '' });
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Sunita Reddy',
      rating: 5,
      date: '3 days ago',
      verified: true,
      comment: 'Arrived firm and cool inside insulated jute bags. Tasted absolutely authentic, zero chemical aftertaste.',
    },
    {
      id: 2,
      author: 'Arjun Mehta',
      rating: 5,
      date: '1 week ago',
      verified: true,
      comment: 'Super fast delivery. Clean, sorted, and weighed accurately down to the gram. Very impressed with Chitti’s Market!',
    },
  ]);

  const isInWishlist = useSelector((state) =>
    product ? selectIsInWishlist(state, product.id) : false
  );

  useEffect(() => {
    if (product) {
      setSelectedWeight(product.weightOptions?.[0] || product.unit);
      setQuantity(1);
      setActiveImageIndex(0);
      window.scrollTo(0, 0);
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold text-brand-dark mb-4">Produce Not Found</h2>
        <p className="text-brand-muted mb-6">The requested fresh item is currently unavailable.</p>
        <Button asChild className="rounded-full">
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity, selectedWeight }));
    toast.success(`Added ${quantity} × ${product.name} to basket!`);
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ product, quantity, selectedWeight }));
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.info(`Removed ${product.name} from wishlist`);
    } else {
      toast.success(`Saved ${product.name} to wishlist ❤️`);
    }
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeChecked(true);
      toast.success('Express delivery available for pincode ' + pincode);
    } else {
      toast.error('Please enter a valid 6-digit postal code');
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!userReview.name.trim() || !userReview.comment.trim()) {
      toast.error('Please fill in your name and review');
      return;
    }
    setReviewsList([
      {
        id: Date.now(),
        author: userReview.name,
        rating: Number(userReview.rating),
        date: 'Just now',
        verified: true,
        comment: userReview.comment,
      },
      ...reviewsList,
    ]);
    toast.success('Thank you! Your verified review has been published.');
    setUserReview({ name: '', rating: 5, comment: '' });
  };

  // Related products from the same category
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen py-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            {
              label: product.category.replace('-', ' '),
              href: `/shop?category=${product.category}`,
            },
            { label: product.name },
          ]}
        />

        {/* Master Product Showcase: Left Gallery + Right Purchase Panel */}
        <div className="bg-white rounded-[2.5rem] border border-emerald-100/80 p-6 sm:p-10 shadow-soft-sm my-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-brand-surface border border-emerald-100/60 shadow-soft-sm">
              <img
                src={product.images?.[activeImageIndex] || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-108"
              />

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount > 0 && (
                  <Badge variant="discount" className="text-xs px-3 py-1 font-bold">
                    {product.discount}% DISCOUNT
                  </Badge>
                )}
                {product.isOrganic && (
                  <Badge variant="organic" className="text-xs px-3 py-1 font-bold">
                    100% Certified Organic
                  </Badge>
                )}
                {product.badge && (
                  <Badge variant="default" className="text-xs px-3 py-1 font-bold">
                    {product.badge}
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-brand-primary scale-105 shadow-soft-sm'
                        : 'border-emerald-100 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Interactive Buy Box (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Category, Rating, Stock Status */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-fresh uppercase tracking-wider">
                    {product.category.replace('-', ' ')}
                  </span>
                  <span className="text-slate-300">•</span>
                  <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size="sm" />
                </div>

                {product.inStock && product.stockQuantity > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>In Stock ({product.stockQuantity} available)</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    Currently Out of Stock
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark font-serif tracking-tight">
                {product.name}
              </h1>

              {/* Origin badge */}
              <p className="text-xs sm:text-sm text-brand-muted flex items-center gap-1.5 mt-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Origin: <strong className="text-brand-dark">{product.origin}</strong>
                </span>
                {product.farm?.name && (
                  <span className="hidden sm:inline text-brand-muted">
                    ({product.farm.name})
                  </span>
                )}
              </p>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 my-4 py-3 border-y border-emerald-100">
                <span className="text-3xl sm:text-4xl font-black text-brand-primary font-sans">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-slate-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                    You save {formatCurrency(product.originalPrice - product.price)} ({product.discount}%)
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm text-brand-dark/80 leading-relaxed mb-6 font-sans">
                {product.description}
              </p>

              {/* Weight Options Selection */}
              {product.weightOptions && product.weightOptions.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2.5">
                    Select Packaging Size / Weight:
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {product.weightOptions.map((weight) => (
                      <button
                        key={weight}
                        type="button"
                        onClick={() => setSelectedWeight(weight)}
                        className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-2xl border transition-all ${
                          selectedWeight === weight
                            ? 'bg-brand-primary border-brand-primary text-white shadow-soft-sm'
                            : 'bg-white border-emerald-200 text-brand-dark hover:bg-brand-light'
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pincode Delivery Estimation */}
              <div className="bg-brand-surface p-4 rounded-2xl border border-emerald-100 mb-6">
                <form onSubmit={handlePincodeCheck} className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-dark">
                    <Truck className="w-4 h-4 text-brand-fresh shrink-0" />
                    <span>Check Delivery Slot:</span>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter Pincode"
                      className="h-9 px-3 text-xs rounded-xl border border-emerald-200 w-32 focus:outline-none focus:ring-1 focus:ring-brand-fresh"
                    />
                    <Button type="submit" size="sm" variant="outline" className="h-9 text-xs rounded-xl">
                      Verify
                    </Button>
                  </div>
                </form>
                {pincodeChecked && (
                  <p className="text-[11px] text-emerald-800 font-medium mt-2 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-brand-fresh" />
                    <span>Express 45-minute cold delivery available in your neighborhood!</span>
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Actions: Stepper + Add to Cart + Buy Now + Wishlist */}
            <div className="space-y-3 pt-4 border-t border-emerald-100">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                  size="lg"
                  className="w-full sm:w-auto justify-center"
                />

                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full sm:flex-1 rounded-full gap-2 text-base font-bold shadow-fresh"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Basket • {formatCurrency(product.price * quantity)}</span>
                </Button>

                <Button
                  onClick={handleBuyNow}
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-brand-orange hover:bg-amber-600 text-white font-extrabold px-6 gap-2"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Buy Now</span>
                </Button>

                <button
                  type="button"
                  onClick={handleWishlistToggle}
                  className={`w-13 h-13 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                    isInWishlist
                      ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-soft-sm'
                      : 'bg-white border-emerald-200 text-brand-dark hover:bg-brand-light'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Nutritional Info, Farm Origin, Storage, Reviews */}
        <div className="bg-white rounded-[2.5rem] border border-emerald-100/80 p-6 sm:p-10 shadow-soft-sm mb-12">
          <Tabs defaultValue="nutrition" className="w-full">
            <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex gap-1.5 h-auto p-1.5 bg-brand-light/70 rounded-2xl mb-8">
              <TabsTrigger value="nutrition" className="rounded-xl text-xs sm:text-sm py-2 px-4">
                Nutritional Facts
              </TabsTrigger>
              <TabsTrigger value="origin" className="rounded-xl text-xs sm:text-sm py-2 px-4">
                Farm & Traceability
              </TabsTrigger>
              <TabsTrigger value="storage" className="rounded-xl text-xs sm:text-sm py-2 px-4">
                Storage Instructions
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-xl text-xs sm:text-sm py-2 px-4">
                Reviews ({reviewsList.length})
              </TabsTrigger>
            </TabsList>

            {/* Nutritional Info */}
            <TabsContent value="nutrition">
              <div className="max-w-2xl space-y-4">
                <h3 className="text-xl font-bold font-serif text-brand-dark">
                  Nutritional Breakdown per 100g
                </h3>
                <p className="text-xs text-brand-muted">
                  Laboratory verified values based on certified organic harvest.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {Object.entries(product.nutritionalInfo || {}).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-3.5 rounded-2xl bg-brand-bg border border-emerald-100/70"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </p>
                      <p className="text-sm font-black text-brand-primary mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Farm Origin */}
            <TabsContent value="origin">
              <div className="max-w-2xl space-y-4">
                <h3 className="text-xl font-bold font-serif text-brand-dark">
                  Farm Story & Seed Provenance
                </h3>
                <div className="p-5 rounded-3xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold">
                      🌱
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark text-base">
                        {product.farm?.name || 'Local Farmer Collective'}
                      </h4>
                      <p className="text-xs text-brand-muted">
                        Location: {product.farm?.location || product.origin}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed">
                    Sourced directly from our partner bio-farms that adhere to strict zero-synthetic chemical cultivation. Enriched with cow dung compost, neem oil sprays, and drip irrigation from fresh rainwater reservoirs.
                  </p>
                  <div className="flex items-center gap-2 pt-2 text-xs font-bold text-brand-primary">
                    <Check className="w-4 h-4 text-brand-fresh" />
                    <span>NPOP Accredited Organic Certification Verified</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Storage Instructions */}
            <TabsContent value="storage">
              <div className="max-w-2xl space-y-4">
                <h3 className="text-xl font-bold font-serif text-brand-dark">
                  How to Store for Optimal Freshness
                </h3>
                <div className="p-5 rounded-3xl bg-brand-bg border border-emerald-100 space-y-3">
                  <p className="text-sm text-brand-dark leading-relaxed">
                    {product.storageInstructions ||
                      'Store in a cool, dry place. For extended shelf-life, refrigerate in breathable paper bags or crisper drawers.'}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs text-brand-muted font-medium">
                    <Clock className="w-4 h-4 text-brand-orange" />
                    <span>Typical crispness duration: 5–10 days when stored properly</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Existing Reviews List (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xl font-bold font-serif text-brand-dark">
                    Verified Customer Reviews
                  </h3>

                  <div className="space-y-3">
                    {reviewsList.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-2xl bg-brand-bg border border-emerald-100/70 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-brand-dark">
                              {rev.author}
                            </span>
                            {rev.verified && (
                              <span className="text-[10px] text-brand-fresh font-semibold flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-brand-muted">{rev.date}</span>
                        </div>
                        <RatingStars rating={rev.rating} size="xs" showScore={false} />
                        <p className="text-xs text-brand-dark leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Write a Review Box (5 Cols) */}
                <div className="lg:col-span-5 bg-brand-surface p-6 rounded-3xl border border-emerald-100 space-y-4">
                  <h4 className="font-bold text-base text-brand-dark font-serif">
                    Write a Review
                  </h4>
                  <form onSubmit={handleAddReview} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-brand-dark mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={userReview.name}
                        onChange={(e) =>
                          setUserReview({ ...userReview, name: e.target.value })
                        }
                        placeholder="e.g. Priya Sharma"
                        className="w-full h-10 px-3 text-xs rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-1 focus:ring-brand-fresh"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-dark mb-1">
                        Rating (1 to 5 Stars)
                      </label>
                      <select
                        value={userReview.rating}
                        onChange={(e) =>
                          setUserReview({ ...userReview, rating: Number(e.target.value) })
                        }
                        className="w-full h-10 px-3 text-xs rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-1 focus:ring-brand-fresh"
                      >
                        <option value={5}>★★★★★ 5 Stars - Exceptional</option>
                        <option value={4}>★★★★☆ 4 Stars - Very Fresh</option>
                        <option value={3}>★★★☆☆ 3 Stars - Average</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-dark mb-1">
                        Your Review Comments
                      </label>
                      <textarea
                        rows={3}
                        value={userReview.comment}
                        onChange={(e) =>
                          setUserReview({ ...userReview, comment: e.target.value })
                        }
                        placeholder="Share details of the freshness, texture, and taste..."
                        className="w-full p-3 text-xs rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-1 focus:ring-brand-fresh"
                        required
                      />
                    </div>

                    <Button type="submit" size="sm" className="w-full rounded-full gap-2">
                      <span>Submit Review</span>
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="my-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold font-serif text-brand-dark">
                You May Also Like
              </h3>
              <Link
                to={`/shop?category=${product.category}`}
                className="text-xs font-bold text-brand-primary hover:underline"
              >
                View Category →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
