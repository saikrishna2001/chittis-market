import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '@/components/common/CartDrawer';
import { SearchModal } from '@/components/common/SearchModal';
import { QuickViewModal } from '@/components/common/QuickViewModal';

export const Layout = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-dark selection:bg-brand-light selection:text-brand-primary">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Global Interactive Drawers & Overlays */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />

      {/* Sonner Toast Notifications */}
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: '1rem',
            fontFamily: 'inherit',
          },
        }}
      />
    </div>
  );
};

export default Layout;
