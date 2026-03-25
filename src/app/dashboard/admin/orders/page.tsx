'use client';
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import toast from 'react-hot-toast';

const allOrders = [
  { id: 'ORD-2401', customer: 'Sarah Johnson', email: 'sarah@example.com', product: 'Premium Wireless Headphones', date: 'Mar 15, 2024', status: 'Delivered', amount: 89.99, payment: 'Credit Card' },
  { id: 'ORD-2402', customer: 'Mike Chen', email: 'mike@example.com', product: 'Smart Watch Pro X', date: 'Mar 14, 2024', status: 'Processing', amount: 199.99, payment: 'PayPal' },
  { id: 'ORD-2403', customer: 'Emily Davis', email: 'emily@example.com', product: 'Yoga Mat Premium', date: 'Mar 13, 2024', status: 'Shipped', amount: 45.99, payment: 'Credit Card' },
  { id: 'ORD-2404', customer: 'Tom Wilson', email: 'tom@example.com', product: 'Running Shoes Pro', date: 'Mar 12, 2024', status: 'Delivered', amount: 119.99, payment: 'Crypto' },
  { id: 'ORD-2405', customer: 'Lisa Park', email: 'lisa@example.com', product: 'Skincare Essential Kit', date: 'Mar 11, 2024', status: 'Processing', amount: 79.99, payment: 'Credit Card' },
  { id: 'ORD-2406', customer: 'James Brown', email: 'james@example.com', product: 'Ceramic Coffee Mug Set', date: 'Mar 10, 2024', status: 'Cancelled', amount: 28.99, payment: 'PayPal' },
  { id: 'ORD-2407', customer: 'Anna Kim', email: 'anna@example.com', product: 'Mechanical Keyboard RGB', date: 'Mar 9, 2024', status: 'Delivered', amount: 89.99, payment: 'Credit Card' },
  { id: 'ORD-2408', customer: 'Chris Evans', email: 'chris@example.com', product: 'Portable Bluetooth Speaker', date: 'Mar 8, 2024', status: 'Shipped', amount: 59.99, payment: 'Credit Card' },
];

const statusColor: Record<string, string> = {
  Delivered: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  Shipped: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  Processing: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  Cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
};

const PER_PAGE = 6;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(allOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = orders.filter(o => {
    const ms = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === 'All' || o.status === statusFilter;
    return ms && mst;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    toast.success(`Order ${id} updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Manage Orders</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{orders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search by order ID or customer..." className="input-field pl-10 py-2.5" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
            <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }} className={clsx('px-3 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap', statusFilter === s ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400')}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr className="text-left text-xs text-gray-400 uppercase">
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Amount</th>
                <th className="px-4 py-3 font-medium">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {paginated.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 font-medium text-primary-600 dark:text-primary-400 whitespace-nowrap">{order.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 dark:text-white">{order.customer}</p>
                    <p className="text-xs text-gray-400">{order.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 max-w-[160px] truncate">{order.product}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{order.date}</td>
                  <td className="px-4 py-3"><span className={`badge text-xs ${statusColor[order.status]}`}>{order.status}</span></td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">${order.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className="text-xs py-1.5 px-2 pr-7 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500"
                      >
                        {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
