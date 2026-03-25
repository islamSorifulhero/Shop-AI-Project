'use client';
import React, { useState } from 'react';
import { Package, Search, Filter } from 'lucide-react';
import clsx from 'clsx';

const allOrders = [
  { id: 'ORD-001', product: 'Premium Wireless Headphones', date: 'Mar 10, 2024', status: 'Delivered', amount: 89.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
  { id: 'ORD-002', product: 'Smart Watch Pro X', date: 'Mar 5, 2024', status: 'Shipped', amount: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' },
  { id: 'ORD-003', product: 'Yoga Mat Premium', date: 'Feb 28, 2024', status: 'Processing', amount: 45.99, image: 'https://images.unsplash.com/photo-1601925228984-f6b2c1e3c11c?w=100' },
  { id: 'ORD-004', product: 'Ceramic Coffee Mug Set', date: 'Feb 20, 2024', status: 'Delivered', amount: 28.99, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100' },
  { id: 'ORD-005', product: 'Running Shoes Pro', date: 'Feb 15, 2024', status: 'Cancelled', amount: 119.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { id: 'ORD-006', product: 'Skincare Essential Kit', date: 'Feb 8, 2024', status: 'Delivered', amount: 79.99, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=100' },
];

const statusColor: Record<string, string> = {
  Delivered: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  Shipped: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  Processing: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  Cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
};

export default function UserOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const PER_PAGE = 4;

  const filtered = allOrders.filter(o => {
    const matchSearch = o.product.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">My Orders</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{allOrders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search orders..."
            className="input-field pl-10 py-2.5"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={clsx(
                'px-3 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap',
                statusFilter === s
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-300'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders */}
      {paginated.length === 0 ? (
        <div className="card p-12 text-center">
          <Package className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
          <p className="font-medium text-gray-700 dark:text-gray-300">No orders found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="space-y-3">
          {paginated.map(order => (
            <div key={order.id} className="card p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
              <img src={order.image} alt={order.product} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{order.product}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{order.id} · {order.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-gray-900 dark:text-white">${order.amount.toFixed(2)}</p>
                <span className={clsx('badge text-xs mt-1', statusColor[order.status])}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

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
