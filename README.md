# Chitti's Market 🍏 – Premium Fresh Fruits & Vegetables E-Commerce Platform

A production-grade, responsive online grocery and produce shopping platform designed with fresh organic aesthetics, micro-interactions, rich product details, Redux state management, and full administration capabilities.

---

## 🌿 Brand Identity & Design System

- **Brand Name**: Chitti's Market
- **Tagline**: Fresh • Organic • Pure
- **Primary Green**: `#1B5E20` (Forest Green)
- **Fresh Green**: `#4CAF50` (Leaf Green)
- **Light Green**: `#E8F5E9` (Mint Green)
- **Premium Orange**: `#FF9800` (Warm Citrus)
- **Background**: `#FAFCF8` (Organic Linen)
- **Typography**: Playfair Display (Serif Headings) + Plus Jakarta Sans (UI & Body)

---

## 🚀 Tech Stack

- **Frontend Framework**: React.js (JavaScript JSX, React 18, Functional Components with Arrow Functions)
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 with custom brand color tokens & shadows
- **Component Primitives**: Radix UI (Dialog, Dropdown Menu, Select, Slider, Checkbox, Tabs)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6
- **Global State Management**: Redux Toolkit & React-Redux (Cart, Wishlist, Products & Auth with LocalStorage Persistence)
- **Forms & Validation**: React Hook Form & Zod
- **API Client**: Axios with structured Service Layer
- **Notifications**: Sonner

---

## 📦 Project Structure

```text
chittis-market/
├── public/
│   ├── images/
│   │   ├── fruits/
│   │   ├── vegetables/
│   │   ├── baskets/
│   │   ├── banners/
│   │   └── logo/
│   ├── favicon.ico
│   └── logo-icon.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Breadcrumbs.jsx
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── QuantitySelector.jsx
│   │   │   ├── QuickViewModal.jsx
│   │   │   ├── RatingStars.jsx
│   │   │   ├── SearchModal.jsx
│   │   │   └── SectionHeading.jsx
│   │   ├── home/
│   │   │   ├── BestSellingProducts.jsx
│   │   │   ├── FruitsCollection.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   ├── PremiumBaskets.jsx
│   │   │   ├── SeasonalBanner.jsx
│   │   │   ├── ShopByCategory.jsx
│   │   │   ├── ShoppingBenefits.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── VegetablesCollection.jsx
│   │   │   └── WhyChooseUs.jsx
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Navbar.jsx
│   │   └── ui/
│   │       ├── badge.jsx
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── checkbox.jsx
│   │       ├── dialog.jsx
│   │       ├── dropdown-menu.jsx
│   │       ├── input.jsx
│   │       ├── select.jsx
│   │       ├── sheet.jsx
│   │       ├── slider.jsx
│   │       └── tabs.jsx
│   ├── data/
│   │   ├── categories.js
│   │   ├── products.js
│   │   └── testimonials.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Contact.jsx
│   │   ├── Fruits.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── Orders.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── Shop.jsx
│   │   ├── Vegetables.jsx
│   │   └── Wishlist.jsx
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── cartSlice.js
│   │   │   ├── productSlice.js
│   │   │   └── wishlistSlice.js
│   │   └── store.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   ├── cn.js
│   │   └── index.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── components.json
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🛒 Features & Pages Walkthrough

1. **Top Announcement & Sticky Navbar**:
   - Active promotion banner with promo code `FRESH20`.
   - Custom SVG brand logo for Chitti's Market.
   - Quick navigation (Shop, Fruits, Vegetables, Organic, Baskets, About, Contact).
   - Live Search Drawer with popular trending search tags.
   - Wishlist indicator with count badge.
   - Slide-over Quick Cart Drawer with free delivery progress calculation.
   - User account dropdown with quick access to Orders, Profile, and Admin Portal.
   - Mobile responsive navigation drawer.

2. **Homepage**:
   - **Hero Section**: "Freshness Delivered to Your Doorstep" with dual CTAs, floating purity badges, and customer trust proof.
   - **Shopping Benefits**: 4 benefit cards (100% Fresh Produce, Farm-to-Home Delivery, Quality Guaranteed, Safe Payments).
   - **Shop by Category**: 9 curated categories with high-resolution imagery and instant filters.
   - **Best Selling Products**: Cards featuring Ratnagiri Alphonso mangoes, Bhagwa pomegranates, baby spinach, and sweet carrots.
   - **Seasonal Collection Banner**: "Enjoy the Taste of Every Season" promo banner.
   - **Fruits & Vegetables Showcase**: 10 fresh fruits and 10 fresh vegetables.
   - **Premium Baskets**: 4 handcrafted fruit & vegetable gift hampers.
   - **Why Choose Chitti's Market**: 5 core value pillars.
   - **Customer Testimonials**: Verified customer reviews from doctors, chefs, and moms.
   - **Newsletter**: Instant subscription with toast confirmation.

3. **Product Listing Page (`/shop`, `/fruits`, `/vegetables`)**:
   - Multi-criteria filtering: Categories, Max Price Slider, 100% Organic, Seasonal Harvest, In-Stock Only, and Minimum Rating.
   - Sorting by Price (Low/High), Popularity, Rating, and Newest.
   - Grid and List view switcher.
   - Responsive Mobile filter drawer.

4. **Product Details Page (`/product/:slug`)**:
   - High-res image gallery with thumbnail navigation.
   - Weight selection chips (500g, 1kg, 2kg, combo crates).
   - Quantity selector with instant subtotal calculation.
   - Pincode delivery estimator.
   - Tabbed sections: Nutritional breakdown per 100g, Farm origin and traceability story, Storage tips, and Customer Reviews with a "Write a Review" form.
   - Related products carousel.

5. **Shopping Basket & Slide-over Drawer (`/cart`)**:
   - Full cart table & Quick slide-over drawer.
   - Free delivery threshold bar (Free delivery over ₹499).
   - Coupon promo code system (supporting `FRESH20`, `CHITTI10`, `HEALTHY50`).
   - Redux Toolkit state with LocalStorage synchronization.

6. **Checkout & Order Success (`/checkout`, `/order-success`)**:
   - Form handling and validation with React Hook Form & Zod.
   - Saved address selector or custom delivery address entry.
   - Delivery time-slot picker (Morning, Afternoon, Evening).
   - Payment method selection (UPI/QR, Cash on Delivery, Card).
   - Order Success page with itemized summary and Print Receipt function.

7. **Customer Account & Tracking (`/orders`, `/profile`, `/wishlist`)**:
   - Live order progression tracking (Harvested -> Quality Checked -> Cold Transit -> Delivered).
   - Instant 1-click re-order function.
   - Saved delivery address book with Add/Edit/Delete.
   - Saved Wishlist with "Add All to Basket" option.

8. **Admin Control Hub (`/admin`)**:
   - Real-time Analytics: Total Revenue, Total Orders, Active Customers, Low-Stock items.
   - Product Catalog Management: Add New Product modal, restock +50 units, delete produce.
   - Critical Inventory Alerts with stock warnings.
   - Order Dispatch queue with status updates (Confirmed, Processing, Out for Delivery, Delivered).
   - Categories and Active Coupons manager.
   - Temperature-controlled fleet tracking.

---

## 🏃‍♂️ How to Run Locally

```bash
# Navigate to project directory
cd chittis-market

# Install dependencies (already installed)
npm install

# Start Vite local development server
npm run dev

# Create optimized production build
npm run build

# Preview production build
npm run preview
```
