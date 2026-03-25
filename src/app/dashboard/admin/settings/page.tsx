'use client';
import React, { useState } from 'react';
import { Save, Store, CreditCard, Bell, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [store, setStore] = useState({ name: 'ShopAI', email: 'hello@shopai.com', phone: '+1 (123) 456-7890', currency: 'USD', taxRate: '8', freeShippingMin: '50' });
  const [notifications, setNotifications] = useState({ newOrders: true, lowStock: true, newUsers: false, reviews: true });

  const toggle = (key: keyof typeof notifications) =>
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Admin Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Configure your store settings</p>
      </div>

      {/* Store Info */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <Store className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Store Information</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Store Name</label>
            <input value={store.name} onChange={e => setStore(p => ({ ...p, name: e.target.value }))} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Contact Email</label>
            <input value={store.email} onChange={e => setStore(p => ({ ...p, email: e.target.value }))} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
            <input value={store.phone} onChange={e => setStore(p => ({ ...p, phone: e.target.value }))} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Currency</label>
            <select value={store.currency} onChange={e => setStore(p => ({ ...p, currency: e.target.value }))} className="input-field">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="BDT">BDT (৳)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment & Shipping */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <CreditCard className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Payment & Shipping</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tax Rate (%)</label>
            <input type="number" value={store.taxRate} onChange={e => setStore(p => ({ ...p, taxRate: e.target.value }))} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Free Shipping Min ($)</label>
            <input type="number" value={store.freeShippingMin} onChange={e => setStore(p => ({ ...p, freeShippingMin: e.target.value }))} className="input-field" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Methods</p>
          {['Credit/Debit Cards', 'PayPal', 'Cryptocurrency'].map(method => (
            <label key={method} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Admin Notifications */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <Bell className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Admin Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: 'newOrders' as const, label: 'New Orders', desc: 'Get notified for every new order' },
            { key: 'lowStock' as const, label: 'Low Stock Alerts', desc: 'Alert when product stock < 10' },
            { key: 'newUsers' as const, label: 'New User Registrations', desc: 'Alert on new sign-ups' },
            { key: 'reviews' as const, label: 'New Reviews', desc: 'Alert on new product reviews' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <button
                onClick={() => toggle(item.key)}
                className={`w-11 h-6 rounded-full transition-colors relative ${notifications[item.key] ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => toast.success('Settings saved!')} className="btn-primary flex items-center gap-2">
        <Save className="w-4 h-4" /> Save All Settings
      </button>
    </div>
  );
}
