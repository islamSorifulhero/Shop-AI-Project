'use client';
import React, { useState } from 'react';
import { Bell, Shield, Globe, Trash2, Save } from 'lucide-react';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({ orders: true, promotions: true, news: false, sms: false });
  const [privacy, setPrivacy] = useState({ profileVisible: true, showActivity: false });

  const toggle = (key: keyof typeof notifications) =>
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  const togglePrivacy = (key: keyof typeof privacy) =>
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your preferences</p>
      </div>

      {/* Appearance */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <Globe className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Appearance</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {['light', 'dark', 'system'].map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium capitalize transition-all ${theme === t ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30 text-primary-600' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}
                >
                  {t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '💻'} {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
            <select className="input-field">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <Bell className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: 'orders' as const, label: 'Order Updates', desc: 'Status changes for your orders' },
            { key: 'promotions' as const, label: 'Promotions & Deals', desc: 'Special offers and sale alerts' },
            { key: 'news' as const, label: 'Product News', desc: 'New arrivals and features' },
            { key: 'sms' as const, label: 'SMS Notifications', desc: 'Text messages for urgent updates' },
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
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <Shield className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Privacy</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: 'profileVisible' as const, label: 'Public Profile', desc: 'Allow others to see your profile' },
            { key: 'showActivity' as const, label: 'Activity Status', desc: 'Show when you were last active' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <button
                onClick={() => togglePrivacy(item.key)}
                className={`w-11 h-6 rounded-full transition-colors relative ${privacy[item.key] ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${privacy[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => toast.success('Settings saved!')} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Settings
        </button>
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-red-500 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/20 text-sm font-medium transition-colors">
          <Trash2 className="w-4 h-4" /> Delete Account
        </button>
      </div>
    </div>
  );
}
