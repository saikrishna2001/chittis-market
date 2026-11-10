import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  Package,
  MapPin,
  Flame,
} from 'lucide-react';

import { Logo } from '@/components/common/Logo';
import { selectCartItemCount, toggleCartDrawer } from '@/redux/slices/cartSlice';
import { selectWishlistCount } from '@/redux/slices/wishlistSlice';
import { toggleSearchModal } from '@/redux/slices/productSlice';
import { selectCurrentUser, selectIsAuthenticated, logout } from '@/redux/slices/authSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItemCount = useSelector(selectCartItemCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.info('Logged out successfully');
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Fruits', path: '/fruits' },
    { name: 'Vegetables', path: '/vegetables' },
    { name: 'Organic', path: '/shop?filter=organic', badge: 'Pure' },
    { name: 'Baskets', path: '/shop?category=fruit-baskets', badge: 'Gifts' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="bg-brand-primary text-white text-[11px] sm:text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
              <span>100% Farm-To-Home Fresh Produce</span>
            </span>
            <span className="hidden md:inline text-emerald-300">•</span>
            <span className="hidden md:inline text-emerald-100">
              Free Express Delivery on orders over ₹499
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-emerald-100 font-medium">
            <div className="hidden sm:flex items-center gap-1.5 bg-brand-accent/50 px-2.5 py-0.5 rounded-full border border-emerald-600/50">
              <span className="text-amber-300 font-bold">Use Code:</span>
              <span className="font-extrabold tracking-wide text-white">FRESH20</span>
              <span className="text-[10px] text-emerald-200">(20% OFF)</span>
            </div>
            <Link
              to="/admin"
              className="text-white hover:text-brand-orange flex items-center gap-1 text-[11px] font-bold transition-colors"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        className={`w-full bg-white transition-all duration-300 border-b ${
          isScrolled
            ? 'shadow-soft-md border-emerald-100 py-2.5'
            : 'border-emerald-100/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Menu Trigger + Brand Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile Drawer Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-brand-dark hover:bg-brand-light transition-colors"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Chitti's Market Logo */}
              <Logo />
            </div>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-brand-primary bg-brand-light'
                        : 'text-brand-dark hover:text-brand-primary hover:bg-brand-light/50'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-brand-orange text-white uppercase tracking-wider">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right: Quick Actions (Search, Wishlist, Cart, Account) */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => dispatch(toggleSearchModal(true))}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-brand-dark hover:text-brand-primary hover:bg-brand-light transition-all border border-emerald-100/60 sm:border-emerald-200/60 bg-brand-bg/50"
                aria-label="Search produce"
              >
                <Search className="w-4 h-4 text-brand-primary" />
                <span className="hidden xl:inline text-xs font-medium text-brand-muted pr-2">
                  Search fresh produce...
                </span>
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-full text-brand-dark hover:text-brand-primary hover:bg-brand-light transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={() => dispatch(toggleCartDrawer(true))}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-primary text-white shadow-soft-sm hover:bg-brand-accent transition-all group"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline text-xs font-bold">Basket</span>
                {cartItemCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-brand-orange text-white text-[11px] font-extrabold flex items-center justify-center -mr-1">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* User Account Dropdown */}
              <div className="relative">
                {isAuthenticated && currentUser ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-brand-fresh/50 transition-all outline-none">
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-8 h-8 rounded-full object-cover border border-emerald-200"
                        />
                        <ChevronDown className="w-3.5 h-3.5 text-brand-muted hidden sm:inline" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl">
                      <DropdownMenuLabel className="font-normal p-2">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-bold text-brand-dark leading-none">
                            {currentUser.name}
                          </p>
                          <p className="text-xs text-brand-muted truncate">
                            {currentUser.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/orders" className="flex items-center gap-2 cursor-pointer py-2">
                          <Package className="w-4 h-4 text-brand-primary" />
                          <span>My Orders & Tracking</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/wishlist" className="flex items-center gap-2 cursor-pointer py-2">
                          <Heart className="w-4 h-4 text-rose-500" />
                          <span>My Wishlist</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2 cursor-pointer py-2">
                          <LayoutDashboard className="w-4 h-4 text-brand-orange" />
                          <span>Admin Control Panel</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-rose-600 flex items-center gap-2 cursor-pointer py-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-full text-xs font-bold gap-1 px-3.5"
                  >
                    <Link to="/login">
                      <User className="w-3.5 h-3.5" />
                      <span>Sign In</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-80 p-0 flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-emerald-100 flex items-center justify-between">
              <Logo size="sm" />
            </div>

            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-brand-primary text-white'
                        : 'text-brand-dark hover:bg-brand-light'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-orange text-white">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}

              <div className="pt-4 border-t border-emerald-100 mt-4 space-y-1">
                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-brand-dark hover:bg-brand-light"
                >
                  <Package className="w-4 h-4 text-brand-primary" />
                  <span>Track My Orders</span>
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-brand-dark hover:bg-brand-light"
                >
                  <LayoutDashboard className="w-4 h-4 text-brand-orange" />
                  <span>Admin Dashboard</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-emerald-100 bg-brand-surface space-y-3">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentUser.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-brand-dark">{currentUser.name}</p>
                    <p className="text-xs text-brand-muted">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Button asChild className="w-full rounded-full">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Sign In / Register
                </Link>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
