import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromStorage = () => {
  try {
    const saved = localStorage.getItem('chittis_market_wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveWishlistToStorage = (items) => {
  try {
    localStorage.setItem('chittis_market_wishlist', JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save wishlist to localStorage', e);
  }
};

const initialState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      saveWishlistToStorage(state.items);
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage([]);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsInWishlist = (state, productId) =>
  state.wishlist.items.some((item) => item.id === productId);

export default wishlistSlice.reducer;
