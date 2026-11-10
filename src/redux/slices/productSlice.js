import { createSlice } from '@reduxjs/toolkit';
import { products as initialProducts } from '@/data/products';

const loadProductsFromStorage = () => {
  try {
    const saved = localStorage.getItem('chittis_market_products');
    return saved ? JSON.parse(saved) : initialProducts;
  } catch (e) {
    return initialProducts;
  }
};

const saveProductsToStorage = (items) => {
  try {
    localStorage.setItem('chittis_market_products', JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save products to localStorage', e);
  }
};

const initialState = {
  items: loadProductsFromStorage(),
  filters: {
    category: 'all',
    subCategory: 'all',
    priceRange: [0, 1500],
    isOrganic: false,
    isSeasonal: false,
    inStockOnly: false,
    minRating: 0,
    searchQuery: '',
    sortBy: 'popularity', // 'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest'
  },
  viewMode: 'grid', // 'grid' | 'list'
  selectedProduct: null, // For quick view modal
  isQuickViewOpen: false,
  isSearchModalOpen: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setOrganicFilter: (state, action) => {
      state.filters.isOrganic = action.payload;
    },
    setSeasonalFilter: (state, action) => {
      state.filters.isSeasonal = action.payload;
    },
    setInStockFilter: (state, action) => {
      state.filters.inStockOnly = action.payload;
    },
    setMinRatingFilter: (state, action) => {
      state.filters.minRating = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        category: 'all',
        subCategory: 'all',
        priceRange: [0, 1500],
        isOrganic: false,
        isSeasonal: false,
        inStockOnly: false,
        minRating: 0,
        searchQuery: '',
        sortBy: 'popularity',
      };
    },
    openQuickView: (state, action) => {
      state.selectedProduct = action.payload;
      state.isQuickViewOpen = true;
    },
    closeQuickView: (state) => {
      state.selectedProduct = null;
      state.isQuickViewOpen = false;
    },
    toggleSearchModal: (state, action) => {
      state.isSearchModalOpen = action.payload !== undefined ? action.payload : !state.isSearchModalOpen;
    },
    // Admin product management actions
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: `prod-${Date.now()}`,
        slug: action.payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        rating: 4.8,
        reviewsCount: 1,
        inStock: true,
      };
      state.items.unshift(newProduct);
      saveProductsToStorage(state.items);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = { ...state.items[index], ...action.payload };
        saveProductsToStorage(state.items);
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      saveProductsToStorage(state.items);
    },
    updateStockQuantity: (state, action) => {
      const { id, stockQuantity } = action.payload;
      const product = state.items.find((p) => p.id === id);
      if (product) {
        product.stockQuantity = stockQuantity;
        product.inStock = stockQuantity > 0;
        saveProductsToStorage(state.items);
      }
    },
  },
});

export const {
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
  openQuickView,
  closeQuickView,
  toggleSearchModal,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStockQuantity,
} = productSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductFilters = (state) => state.products.filters;
export const selectViewMode = (state) => state.products.viewMode;
export const selectQuickViewProduct = (state) => state.products.selectedProduct;
export const selectIsQuickViewOpen = (state) => state.products.isQuickViewOpen;
export const selectIsSearchModalOpen = (state) => state.products.isSearchModalOpen;

export const selectFilteredProducts = (state) => {
  const { items, filters } = state.products;
  const {
    category,
    priceRange,
    isOrganic,
    isSeasonal,
    inStockOnly,
    minRating,
    searchQuery,
    sortBy,
  } = filters;

  return items
    .filter((product) => {
      // Category filter
      if (category !== 'all' && product.category !== category && product.subcategory !== category) {
        return false;
      }
      // Price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      // Organic
      if (isOrganic && !product.isOrganic) {
        return false;
      }
      // Seasonal
      if (isSeasonal && !product.isSeasonal) {
        return false;
      }
      // Stock
      if (inStockOnly && (!product.inStock || product.stockQuantity <= 0)) {
        return false;
      }
      // Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description?.toLowerCase().includes(query);
        const matchesTags = product.tags?.some((t) => t.toLowerCase().includes(query));
        const matchesOrigin = product.origin?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTags && !matchesOrigin) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      // default: popularity / bestSeller
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return b.reviewsCount - a.reviewsCount;
    });
};

export default productSlice.reducer;
