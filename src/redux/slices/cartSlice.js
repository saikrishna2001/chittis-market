import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('chittis_market_cart');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('chittis_market_cart', JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
};

const initialState = {
  items: loadCartFromStorage(),
  coupon: null, // { code: 'FRESH20', discountPercent: 20 }
  couponError: null,
  isCartDrawerOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedWeight } = action.payload;
      const weight = selectedWeight || product.weightOptions?.[0] || product.unit;
      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id && item.selectedWeight === weight
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.originalPrice,
          unit: product.unit,
          selectedWeight: weight,
          image: product.images?.[0],
          category: product.category,
          quantity: quantity,
          stockQuantity: product.stockQuantity,
        });
      }
      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const { id, selectedWeight } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && (!selectedWeight || item.selectedWeight === selectedWeight))
      );
      saveCartToStorage(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, selectedWeight, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.id === id && (!selectedWeight || i.selectedWeight === selectedWeight)
      );
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (i) => !(i.id === id && (!selectedWeight || i.selectedWeight === selectedWeight))
          );
        } else {
          item.quantity = quantity;
        }
      }
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      saveCartToStorage([]);
    },

    applyCoupon: (state, action) => {
      const code = action.payload.trim().toUpperCase();
      if (code === 'FRESH20') {
        state.coupon = { code, discountPercent: 20, description: '20% Off on Fresh Produce' };
        state.couponError = null;
      } else if (code === 'CHITTI10') {
        state.coupon = { code, discountPercent: 10, description: '10% Welcome Discount' };
        state.couponError = null;
      } else if (code === 'HEALTHY50') {
        state.coupon = { code, flatDiscount: 50, description: '₹50 Flat Wellness Discount' };
        state.couponError = null;
      } else {
        state.couponError = 'Invalid coupon code. Try FRESH20 or CHITTI10';
      }
    },

    removeCoupon: (state) => {
      state.coupon = null;
      state.couponError = null;
    },

    toggleCartDrawer: (state, action) => {
      state.isCartDrawerOpen = action.payload !== undefined ? action.payload : !state.isCartDrawerOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  toggleCartDrawer,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectCartDiscount = (state) => {
  const subtotal = selectCartSubtotal(state);
  const coupon = state.cart.coupon;
  if (!coupon) return 0;
  if (coupon.discountPercent) {
    return Math.round((subtotal * coupon.discountPercent) / 100);
  }
  if (coupon.flatDiscount) {
    return Math.min(coupon.flatDiscount, subtotal);
  }
  return 0;
};

export const selectDeliveryFee = (state) => {
  const subtotal = selectCartSubtotal(state);
  if (subtotal === 0) return 0;
  return subtotal >= 499 ? 0 : 40; // Free delivery threshold ₹499
};

export const selectCartTotal = (state) => {
  const subtotal = selectCartSubtotal(state);
  const discount = selectCartDiscount(state);
  const deliveryFee = selectDeliveryFee(state);
  return Math.max(0, subtotal - discount + deliveryFee);
};

export const selectAppliedCoupon = (state) => state.cart.coupon;
export const selectCouponError = (state) => state.cart.couponError;
export const selectIsCartDrawerOpen = (state) => state.cart.isCartDrawerOpen;

export default cartSlice.reducer;
