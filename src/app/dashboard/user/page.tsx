'use client';
import React from 'react';
import Link from 'next/link';
import { Package, Heart, ShoppingCart, Star, ArrowRight, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const spendingData = [
  { month: 'Jan', spent: 45 },
  { month: 'Feb', spent: 120 },
  { month: 'Mar', spent: 89 },
  { month: 'Apr', spent: 200 },
  { month: 'May', spent: 156 },
  { month: 'Jun', spent: 78 },
];

const recentOrders = [
  { id: 'ORD-001', product: 'Premium Wireless Headphones', date: 'Mar 10, 2024', status: 'Delivered', amount: 89.99 },
  { id: 'ORD-002', product: 'Smart Watch Pro X', date: 'Mar 5, 2024', status: 'Shipped', amount: 199.99 },
  { id: 'ORD-003', product: 'Yoga Mat Premium', date: 'Feb 28, 2024', status: 'Processing', amount: 45.99 },
];

const statusColor: Record<string, string> = {
  Delivered: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  Shipped: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  Processing: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  Cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
};

export default function UserDashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Orders', value: '12', icon: Package, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', trend: '+2 this month' },
    { label: 'Wishlist Items', value: '8', icon: Heart, color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400', trend: '3 on sale' },
    { label: 'Cart Items', value: '3', icon: ShoppingCart, color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400', trend: '$234.97 total' },
    { label: 'Reviews Given', value: '5', icon: Star, color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400', trend: 'Avg 4.8 stars' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-display font-bold mb-1">Welcome back, {user?.displayName?.split(' ')[0]}! 👋</h1>
        <p className="text-white/80 text-sm">Here's what's happening with your account.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Chart */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-900 dark:text-white">Monthly Spending</h2>
            <span className="text-xs text-gray-400">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.2)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`$${v}`, 'Spent']} />
              <Line type="monotone" dataKey="spent" stroke="#f97316" strokeWidth={2.5} dot={{ fill: '#f97316', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: 'Track your orders', href: '/dashboard/user/orders', icon: Package },
              { label: 'View wishlist', href: '/dashboard/user/wishlist', icon: Heart },
              { label: 'Edit profile', href: '/dashboard/user/profile', icon: Star },
              { label: 'Browse products', href: '/products', icon: ShoppingCart },
            ].map(action => (
              <Link key={action.label} href={action.href} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-50 dark:bg-primary-950/30 rounded-lg flex items-center justify-center">
                    <action.icon className="w-4 h-4 text-primary-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
          <Link href="/dashboard/user/orders" className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b border-gray-100 dark:border-gray-800">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 font-medium text-primary-600 dark:text-primary-400">{order.id}</td>
                  <td className="py-3 text-gray-700 dark:text-gray-300 max-w-xs truncate">{order.product}</td>
                  <td className="py-3 text-gray-500 dark:text-gray-400">{order.date}</td>
                  <td className="py-3"><span className={`badge ${statusColor[order.status]}`}>{order.status}</span></td>
                  <td className="py-3 text-right font-semibold text-gray-900 dark:text-white">${order.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
