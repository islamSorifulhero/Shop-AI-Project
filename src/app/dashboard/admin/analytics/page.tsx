'use client';
import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 12400, orders: 89, customers: 234 },
  { month: 'Feb', revenue: 18200, orders: 134, customers: 312 },
  { month: 'Mar', revenue: 15800, orders: 112, customers: 289 },
  { month: 'Apr', revenue: 22100, orders: 167, customers: 401 },
  { month: 'May', revenue: 19600, orders: 148, customers: 356 },
  { month: 'Jun', revenue: 25400, orders: 189, customers: 478 },
  { month: 'Jul', revenue: 28900, orders: 212, customers: 521 },
];

const topProducts = [
  { name: 'Headphones', sales: 89, revenue: 8021 },
  { name: 'Smart Watch', sales: 67, revenue: 13397 },
  { name: 'Running Shoes', sales: 54, revenue: 6479 },
  { name: 'Yoga Mat', sales: 92, revenue: 4231 },
  { name: 'Skincare Kit', sales: 78, revenue: 6239 },
];

const categoryPie = [
  { name: 'Electronics', value: 38, color: '#f97316' },
  { name: 'Fashion', value: 22, color: '#8b5cf6' },
  { name: 'Sports', value: 18, color: '#10b981' },
  { name: 'Beauty', value: 13, color: '#f43f5e' },
  { name: 'Home', value: 9, color: '#06b6d4' },
];

export default function AdminAnalyticsPage() {
  const kpis = [
    { label: 'Total Revenue', value: '$142,200', change: '+18.2%', icon: DollarSign, color: 'text-green-500' },
    { label: 'Total Orders', value: '1,051', change: '+12.5%', icon: ShoppingBag, color: 'text-blue-500' },
    { label: 'New Customers', value: '2,591', change: '+8.3%', icon: Users, color: 'text-purple-500' },
    { label: 'Avg Order Value', value: '$135.30', change: '+5.1%', icon: TrendingUp, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Performance overview — last 7 months</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              <span className="text-xs text-green-500 font-medium">{kpi.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Area Chart */}
      <div className="card p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.15)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => [`$${v}`, 'Revenue']} />
            <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2.5} fill="url(#revenueGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders vs Customers */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Orders vs New Customers</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.15)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" name="Orders" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="customers" name="Customers" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Revenue by Category</h2>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie data={categoryPie} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                  {categoryPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {categoryPie.map(c => (
                <div key={c.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-gray-600 dark:text-gray-400">{c.name}</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Bar */}
      <div className="card p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Top Products by Sales</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={topProducts} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.15)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={80} />
            <Tooltip />
            <Bar dataKey="sales" name="Units Sold" fill="#f97316" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
