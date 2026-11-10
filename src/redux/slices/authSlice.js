import { createSlice } from '@reduxjs/toolkit';

const initialDemoUser = {
  id: 'usr-chitti-101',
  name: 'Sravan Kumar',
  email: 'sravan@example.com',
  phone: '+91 98765 43210',
  role: 'customer', // 'customer' | 'admin'
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  memberSince: 'March 2024',
  loyaltyPoints: 340,
};

const initialAddresses = [
  {
    id: 'addr-1',
    name: 'Sravan Kumar',
    type: 'Home',
    street: 'Flat 402, Green View Meadows, Road No 12, Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034',
    phone: '+91 98765 43210',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: 'Sravan Kumar (Office)',
    type: 'Work',
    street: 'Level 5, Cyber Gateway, HITEC City',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
    phone: '+91 98765 43210',
    isDefault: false,
  },
];

const initialOrders = [
  {
    id: 'CM-ORD-98421',
    date: '2026-11-08T09:30:00Z',
    status: 'Delivered', // 'Confirmed', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'
    deliverySlot: 'Morning Slot (7:00 AM - 10:00 AM)',
    paymentMethod: 'UPI / Online',
    deliveryAddress: initialAddresses[0],
    subtotal: 948,
    discount: 100,
    deliveryFee: 0,
    total: 848,
    items: [
      {
        id: 'fruit-1',
        name: 'Ratnagiri Alphonso Mango',
        price: 649,
        quantity: 1,
        selectedWeight: '1 Dozen',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'veg-1',
        name: 'Farm Fresh Country & Hybrid Tomatoes',
        price: 38,
        quantity: 2,
        selectedWeight: '1 kg',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'veg-4',
        name: 'Ooty Sweet Orange & Red Carrots',
        price: 58,
        quantity: 1,
        selectedWeight: '500 g',
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'veg-9',
        name: 'Tender Baby Spinach (Palak)',
        price: 29,
        quantity: 2,
        selectedWeight: '250 g bunch',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'CM-ORD-98310',
    date: '2026-11-02T14:15:00Z',
    status: 'Delivered',
    deliverySlot: 'Evening Slot (5:00 PM - 8:00 PM)',
    paymentMethod: 'Cash on Delivery',
    deliveryAddress: initialAddresses[0],
    subtotal: 1199,
    discount: 240,
    deliveryFee: 0,
    total: 959,
    items: [
      {
        id: 'basket-1',
        name: 'Royal Celebration Fresh Fruit Basket',
        price: 1199,
        quantity: 1,
        selectedWeight: 'Classic (5 kg)',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
];

const loadAuthFromStorage = () => {
  try {
    const saved = localStorage.getItem('chittis_market_auth');
    return saved ? JSON.parse(saved) : initialDemoUser;
  } catch (e) {
    return initialDemoUser;
  }
};

const loadOrdersFromStorage = () => {
  try {
    const saved = localStorage.getItem('chittis_market_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  } catch (e) {
    return initialOrders;
  }
};

const loadAddressesFromStorage = () => {
  try {
    const saved = localStorage.getItem('chittis_market_addresses');
    return saved ? JSON.parse(saved) : initialAddresses;
  } catch (e) {
    return initialAddresses;
  }
};

const initialState = {
  user: loadAuthFromStorage(),
  isAuthenticated: !!loadAuthFromStorage(),
  addresses: loadAddressesFromStorage(),
  orders: loadOrdersFromStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('chittis_market_auth', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('chittis_market_auth');
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('chittis_market_auth', JSON.stringify(state.user));
    },
    addAddress: (state, action) => {
      const newAddress = {
        ...action.payload,
        id: `addr-${Date.now()}`,
      };
      if (newAddress.isDefault) {
        state.addresses.forEach((a) => (a.isDefault = false));
      }
      state.addresses.push(newAddress);
      localStorage.setItem('chittis_market_addresses', JSON.stringify(state.addresses));
    },
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
      localStorage.setItem('chittis_market_addresses', JSON.stringify(state.addresses));
    },
    setDefaultAddress: (state, action) => {
      state.addresses.forEach((a) => {
        a.isDefault = a.id === action.payload;
      });
      localStorage.setItem('chittis_market_addresses', JSON.stringify(state.addresses));
    },
    placeOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        id: `CM-ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toISOString(),
        status: 'Confirmed',
      };
      state.orders.unshift(newOrder);
      localStorage.setItem('chittis_market_orders', JSON.stringify(state.orders));
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = status;
        localStorage.setItem('chittis_market_orders', JSON.stringify(state.orders));
      }
    },
  },
});

export const {
  login,
  logout,
  updateProfile,
  addAddress,
  deleteAddress,
  setDefaultAddress,
  placeOrder,
  updateOrderStatus,
} = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';
export const selectAddresses = (state) => state.auth.addresses;
export const selectOrders = (state) => state.auth.orders;

export default authSlice.reducer;
