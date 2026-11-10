import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  SlidersHorizontal,
  Grid3X3,
  List,
  Search,
  RotateCcw,
  Sparkles,
  Check,
  Star,
  X,
  ShoppingBag,
} from 'lucide-react';

import {
  selectAllProducts,
  selectFilteredProducts,
  selectProductFilters,
  selectViewMode,
  setCategoryFilter,
  setPriceRange,
  setOrganicFilter,
  setSeasonalFilter,
  setInStockFilter,
  setMinRatingFilter,
  setSearchQuery,
  setSortBy,
  setViewMode,
  resetFilters,
} from '@/redux/slices/productSlice';
import { categories } from '@/data/categories';
import { formatCurrency } from '@/utils';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProductCard } from '@/components/common/ProductCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const products = useSelector(selectFilteredProducts);
  const totalProducts = useSelector(selectAllProducts);
  const filters = useSelector(selectProductFilters);
  const viewMode = useSelector(selectViewMode);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL search parameters with Redux state on load
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const filterParam = searchParams.get('filter');

    if (categoryParam) {
      dispatch(setCategoryFilter(categoryParam));
    }
    if (searchParam) {
      dispatch(setSearchQuery(searchParam));
    }
    if (filterParam === 'organic') {
      dispatch(setOrganicFilter(true));
    }
    if (filterParam === 'seasonal') {
      dispatch(setSeasonalFilter(true));
    }
  }, [searchParams, dispatch]);

  const handleCategoryChange = (slug) => {
    dispatch(setCategoryFilter(slug));
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (slug === 'all') next.delete('category');
      else next.set('category', slug);
      return next;
    });
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setSearchParams({});
  };

  // Reusable Filter Sidebar Content
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">
          Categories
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              filters.category === 'all'
                ? 'bg-brand-primary text-white shadow-soft-sm'
                : 'text-brand-dark hover:bg-brand-light'
            }`}
          >
            <span>All Produce</span>
            <span className="text-[11px] opacity-80">{totalProducts.length}</span>
          </button>
          {categories.map((cat) => {
            const count = totalProducts.filter(
              (p) => p.category === cat.slug || p.subcategory === cat.slug
            ).length;
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-brand-primary text-white shadow-soft-sm'
                    : 'text-brand-dark hover:bg-brand-light'
                }`}
              >
                <span className="truncate pr-2">{cat.name}</span>
                <span className="text-[11px] opacity-80">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-4 border-t border-emerald-100">
        <div className="flex items-center justify-between text-xs font-bold text-brand-dark uppercase tracking-wider">
          <span>Max Price</span>
          <span className="text-brand-primary font-sans font-black">
            {formatCurrency(filters.priceRange[1])}
          </span>
        </div>
        <Slider
          defaultValue={[filters.priceRange[1]]}
          max={1500}
          min={30}
          step={20}
          value={[filters.priceRange[1]]}
          onValueChange={(val) => dispatch(setPriceRange([0, val[0]]))}
        />
        <div className="flex justify-between text-[11px] text-brand-muted">
          <span>₹30</span>
          <span>₹1,500</span>
        </div>
      </div>

      {/* Produce Characteristics / Checkboxes */}
      <div className="space-y-3 pt-4 border-t border-emerald-100">
        <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">
          Produce Type
        </h4>
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 text-xs font-medium text-brand-dark cursor-pointer select-none">
            <Checkbox
              checked={filters.isOrganic}
              onCheckedChange={(checked) => dispatch(setOrganicFilter(!!checked))}
            />
            <span className="flex items-center gap-1.5">
              <span>100% Certified Organic</span>
              <Badge variant="organic" className="text-[9px] py-0 px-1.5">
                Bio
              </Badge>
            </span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-medium text-brand-dark cursor-pointer select-none">
            <Checkbox
              checked={filters.isSeasonal}
              onCheckedChange={(checked) => dispatch(setSeasonalFilter(!!checked))}
            />
            <span>Seasonal Harvest Only</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-medium text-brand-dark cursor-pointer select-none">
            <Checkbox
              checked={filters.inStockOnly}
              onCheckedChange={(checked) => dispatch(setInStockFilter(!!checked))}
            />
            <span>In Stock Only</span>
          </label>
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div className="space-y-3 pt-4 border-t border-emerald-100">
        <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">
          Minimum Rating
        </h4>
        <div className="flex flex-col gap-1.5">
          {[4, 3, 0].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => dispatch(setMinRatingFilter(star))}
              className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all ${
                filters.minRating === star
                  ? 'bg-emerald-100 text-brand-primary font-bold'
                  : 'text-brand-dark hover:bg-brand-light'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {star === 0 ? (
                  <span>All Ratings</span>
                ) : (
                  <>
                    <span className="flex items-center text-amber-500">
                      {[...Array(star)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </span>
                    <span>& above</span>
                  </>
                )}
              </div>
              {filters.minRating === star && <Check className="w-3.5 h-3.5 text-brand-primary" />}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters CTA */}
      <div className="pt-4 border-t border-emerald-100">
        <Button
          onClick={handleResetFilters}
          variant="outline"
          size="sm"
          className="w-full rounded-2xl gap-2 text-xs border-emerald-200 text-brand-dark"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Shop All Fresh Produce' }]} />

        {/* Header Title & Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 my-6 pb-6 border-b border-emerald-100">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark font-serif">
              Shop Fresh Produce
            </h1>
            <p className="text-sm text-brand-muted mt-1">
              Showing <strong className="text-brand-dark">{products.length}</strong> items • 100% farm fresh guarantee
            </p>
          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.category !== 'all' && (
              <Badge variant="secondary" className="gap-1 py-1 px-3">
                <span>Category: {filters.category}</span>
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleCategoryChange('all')}
                />
              </Badge>
            )}
            {filters.isOrganic && (
              <Badge variant="organic" className="gap-1 py-1 px-3">
                <span>100% Organic</span>
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => dispatch(setOrganicFilter(false))}
                />
              </Badge>
            )}
            {filters.isSeasonal && (
              <Badge variant="seasonal" className="gap-1 py-1 px-3">
                <span>Seasonal</span>
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => dispatch(setSeasonalFilter(false))}
                />
              </Badge>
            )}
          </div>
        </div>

        {/* Toolbar: Search, Sort, View, Mobile Filter Trigger */}
        <div className="bg-white p-4 rounded-3xl border border-emerald-100/80 shadow-soft-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search by name, tag..."
              className="pl-9 h-10 text-xs rounded-xl"
            />
            {filters.searchQuery && (
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            {/* Mobile Filter Sheet Button */}
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden rounded-2xl gap-2 text-xs border-emerald-200"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-6 overflow-y-auto">
                <SheetHeader className="mb-4">
                  <SheetTitle>Filter Produce</SheetTitle>
                </SheetHeader>
                <FilterContent />
              </SheetContent>
            </Sheet>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs font-semibold text-brand-muted">
                Sort:
              </span>
              <Select
                value={filters.sortBy}
                onValueChange={(val) => dispatch(setSortBy(val))}
              >
                <SelectTrigger className="w-[170px] h-10 text-xs rounded-xl">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="newest">Newest Harvest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grid / List Switcher */}
            <div className="hidden sm:flex items-center gap-1 border border-emerald-200/80 rounded-xl p-1 bg-brand-bg">
              <button
                type="button"
                onClick={() => dispatch(setViewMode('grid'))}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-brand-primary shadow-xs'
                    : 'text-brand-muted hover:text-brand-dark'
                }`}
                aria-label="Grid View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => dispatch(setViewMode('list'))}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-brand-primary shadow-xs'
                    : 'text-brand-muted hover:text-brand-dark'
                }`}
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar (Desktop) + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar (1 Col) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-white p-6 rounded-3xl border border-emerald-100/80 shadow-soft-sm">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-100 mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
                  <h3 className="font-bold text-sm text-brand-dark">Filter Produce</h3>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-semibold text-brand-muted hover:text-brand-primary"
                >
                  Clear All
                </button>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid Section (3 Cols) */}
          <main className="lg:col-span-3">
            {products.length === 0 ? (
              <EmptyState
                icon={ShoppingBag}
                title="No Produce Matched Your Filters"
                description="Try loosening your search query, increasing your price range, or clearing applied filter tags."
                actionText="Reset Filters"
                onAction={handleResetFilters}
              />
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              // List View Mode
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="w-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
