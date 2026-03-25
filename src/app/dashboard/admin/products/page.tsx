'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Plus, Edit2, Trash2, Star } from 'lucide-react';
import { products } from '@/lib/data';
import clsx from 'clsx';

const PER_PAGE = 6;

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Beauty', 'Toys', 'Automotive'];
  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Manage Products</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{products.length} total products</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search products..." className="input-field pl-10 py-2.5" />
        </div>
        <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }} className="input-field py-2.5 min-w-40">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map(p => (
          <div key={p.id} className="card p-4 flex gap-3">
            <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
              <Image src={p.image} alt={p.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{p.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{p.category} · {p.brand}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-primary-600 dark:text-primary-400 text-sm">${p.price}</span>
                <div className="flex items-center gap-0.5 text-xs text-gray-400">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {p.rating}
                </div>
                <span className={clsx('text-xs px-1.5 py-0.5 rounded-full', p.stock > 10 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : p.stock > 0 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700' : 'bg-red-100 dark:bg-red-900/30 text-red-700')}>
                  {p.stock > 0 ? `${p.stock} left` : 'Out'}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <button className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 text-blue-500 transition-colors">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-40">Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)} className={clsx('w-8 h-8 rounded-lg text-sm', page === p ? 'bg-primary-500 text-white' : 'border border-gray-200 dark:border-gray-700')}>{p}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}
