'use client';
import React from 'react';
import { Users, Package, ShoppingBag, DollarSign, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 12400, orders: 89 },
  { month: 'Feb', revenue: 18200, orders: 134 },
  { month: 'Mar', revenue: 15800, orders: 112 },
  { month: 'Apr', revenue: 22100, orders: 167 },
  { month: 'May', revenue: 19600, orders: 148 },
  { month: 'Jun', revenue: 25400, orders: 189 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#f97316' },
  { name: 'Fashion', value: 25, color: '#8b5cf6' },
  { name: 'Home & Garden', value: 18, color: '#06b6d4' },
  { name: 'Sports', value: 12, color: '#10b981' },
  { name: 'Beauty', value: 10, color: '#f43f5e' },
];

const recentOrders = [
  { id: 'ORD-2401', customer: 'Sarah Johnson', product: 'Premium Headphones', amount: 89.99, status: 'Delivered' },
  { id: 'ORD-2402', customer: 'Mike Chen', product: 'Smart Watch Pro', amount: 199.99, status: 'Processing' },
  { id: 'ORD-2403', customer: 'Emily Davis', product: 'Yoga Mat Premium', amount: 45.99, status: 'Shipped' },
  { id: 'ORD-2404', customer: 'Tom Wilson', product: 'Running Shoes Pro', amount: 119.99, status: 'Delivered' },
  { id: 'ORD-2405', customer: 'Lisa Park', product: 'Skincare Kit', amount: 79.99, status: 'Processing' },
];

const statusColor: Record<string, string> = {
  Delivered: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  Shipped: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  Processing: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
};

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Revenue', value: '$113,500', change: '+18.2%', up: true, icon: DollarSign, color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
    { label: 'Total Orders', value: '839', change: '+12.5%', up: true, icon: ShoppingBag, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
    { label: 'Total Customers', value: '4,231', change: '+8.1%', up: true, icon: Users, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
    { label: 'Products Listed', value: '312', change: '-2.3%', up: false, icon: Package, color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Admin Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <span className="badge bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">Admin</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Line Chart */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900 dark:text-white">Revenue & Orders</h2>
            <span className="text-xs text-gray-400">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.15)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4, fill: '#f97316' }} />
              <Line yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4, fill: '#8b5cf6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${value}%`} labelLine={false}>
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {categoryData.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-gray-600 dark:text-gray-400">{cat.name}</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-900 dark:text-white">Monthly Revenue Bar Chart</h2>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.15)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => [`$${v}`, 'Revenue']} />
            <Bar dataKey="revenue" fill="#f97316" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
          <Link href="/dashboard/admin/orders" className="text-sm text-primary-500 flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b border-gray-100 dark:border-gray-800">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 font-medium text-primary-600 dark:text-primary-400">{order.id}</td>
                  <td className="py-3 text-gray-900 dark:text-white">{order.customer}</td>
                  <td className="py-3 text-gray-500 dark:text-gray-400 truncate max-w-[180px]">{order.product}</td>
                  <td className="py-3"><span className={`badge text-xs ${statusColor[order.status]}`}>{order.status}</span></td>
                  <td className="py-3 text-right font-semibold">${order.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
