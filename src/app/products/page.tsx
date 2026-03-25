'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products } from '@/lib/data';
import ProductCard, { ProductCardSkeleton } from '@/components/products/ProductCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatbot from '@/components/ai/AIChatbot';

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Beauty', 'Books', 'Toys', 'Automotive'];

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
    if (category && category !== 'All') list = list.filter(p => p.category === category);
    if (minPrice) list = list.filter(p => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter(p => p.price <= Number(maxPrice));
    if (minRating) list = list.filter(p => p.rating >= Number(minRating));
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'newest') list.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
    return list;
  }, [search, category, sort, minPrice, maxPrice, minRating]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSearch(''); setCategory(''); setSort('default');
    setMinPrice(''); setMaxPrice(''); setMinRating('');
    setPage(1);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-1">All Products</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{filtered.length} products found</p>
          </div>

          {/* Search + Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search products..."
                className="input-field pl-12"
              />
            </div>
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="input-field pr-10 cursor-pointer appearance-none min-w-44"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 btn-secondary"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
                <button onClick={clearFilters} className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }} className="input-field text-sm">
                    {categories.map(c => <option key={c} value={c === 'All' ? '' : c}>{c}</option>)}
                  </select>
                </div>
                {/* Min Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min Price ($)</label>
                  <input type="number" value={minPrice} onChange={e => { setMinPrice(e.target.value); setPage(1); }} placeholder="0" className="input-field text-sm" />
                </div>
                {/* Max Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Price ($)</label>
                  <input type="number" value={maxPrice} onChange={e => { setMaxPrice(e.target.value); setPage(1); }} placeholder="500" className="input-field text-sm" />
                </div>
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min Rating</label>
                  <select value={minRating} onChange={e => { setMinRating(e.target.value); setPage(1); }} className="input-field text-sm">
                    <option value="">Any Rating</option>
                    <option value="3">3★ & above</option>
                    <option value="4">4★ & above</option>
                    <option value="4.5">4.5★ & above</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap mb-6">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => { setCategory(c === 'All' ? '' : c); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  (c === 'All' && !category) || category === c
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-950/20 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search or filters</p>
              <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginated.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                    page === p
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                      : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}
