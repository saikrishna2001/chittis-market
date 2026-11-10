import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, ArrowRight, ShoppingBag } from 'lucide-react';
import {
  toggleSearchModal,
  selectIsSearchModalOpen,
  selectAllProducts,
} from '@/redux/slices/productSlice';
import { addToCart } from '@/redux/slices/cartSlice';
import { formatCurrency } from '@/utils';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const POPULAR_SEARCHES = [
  'Alphonso Mango',
  'Organic Spinach',
  'Fruit Basket',
  'Bhagwa Pomegranate',
  'Ooty Carrots',
  'Royal Gala Apple',
  'Green Chilli',
  'Watermelon',
];

export const SearchModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsSearchModalOpen);
  const products = useSelector(selectAllProducts);

  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  const filteredProducts = searchTerm.trim()
    ? products.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tags?.some((t) => t.toLowerCase().includes(query)) ||
          p.origin.toLowerCase().includes(query)
        );
      })
    : [];

  const handleSelectProduct = (slug) => {
    dispatch(toggleSearchModal(false));
    navigate(`/product/${slug}`);
  };

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success(`Added ${product.name} to cart!`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => dispatch(toggleSearchModal(open))}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl border-0">
        <DialogTitle className="sr-only">Search Fresh Produce</DialogTitle>
        {/* Search Input Bar */}
        <div className="relative border-b border-emerald-100 p-4 sm:p-5 bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search fresh mangoes, spinach, organic baskets, apples..."
            className="w-full text-base sm:text-lg font-medium text-brand-dark placeholder:text-brand-muted/70 focus:outline-none bg-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-brand-muted hover:text-brand-dark hover:bg-brand-light"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto bg-brand-bg">
          {searchTerm.trim() ? (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-brand-muted mb-3 uppercase tracking-wider">
                <span>Matching Produce ({filteredProducts.length})</span>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={() => {
                      dispatch(toggleSearchModal(false));
                      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
                    }}
                    className="text-brand-primary hover:underline flex items-center gap-1"
                  >
                    <span>View all results</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  {filteredProducts.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-white border border-emerald-100/70 hover:border-brand-primary hover:shadow-soft-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-brand-surface shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-brand-dark group-hover:text-brand-primary transition-colors font-serif">
                            {product.name}
                          </h4>
                          <p className="text-xs text-brand-muted">
                            {product.unit} • {formatCurrency(product.price)}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="p-2 rounded-full bg-brand-light text-brand-primary hover:bg-brand-primary hover:text-white transition-colors"
                        title="Quick Add"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-sm text-brand-muted">
                    No fresh produce matched "{searchTerm}".
                  </p>
                  <p className="text-xs text-brand-muted mt-1">
                    Try searching for general terms like "Fruits", "Organic", or "Baskets".
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-muted mb-3 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-brand-fresh" />
                <span>Trending Fresh Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-emerald-100 text-brand-dark hover:border-brand-primary hover:text-brand-primary transition-colors shadow-soft-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
