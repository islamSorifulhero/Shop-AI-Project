'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from 'next-themes';
import {
  LayoutDashboard, Users, Package, ShoppingBag,
  BarChart2, Settings, LogOut, Menu, Bell, Sun, Moon,
  ChevronDown, Sparkles, Tag
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
  { href: '/dashboard/admin/products', label: 'Manage Products', icon: Package },
  { href: '/dashboard/admin/orders', label: 'Manage Orders', icon: ShoppingBag },
  { href: '/dashboard/admin/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/dashboard/admin/coupons', label: 'Coupons', icon: Tag },
  { href: '/dashboard/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => { await logout(); router.push('/'); };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <aside className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 bg-gray-950 text-gray-300 flex flex-col transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="p-5 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-white">ShopAI</span>
          </Link>
          <span className="badge bg-purple-500/20 text-purple-400 text-xs mt-2">Admin Panel</span>
        </div>

        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {user?.displayName?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.displayName || 'Admin'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                pathname === item.href
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white text-sm transition-colors">
            <Sparkles className="w-4 h-4" /> View Store
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-950/30 w-full text-sm transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 h-16 flex items-center px-4 sm:px-6 gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                {user?.displayName?.[0]?.toUpperCase() || 'A'}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
                <Link href="/dashboard/admin/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Settings className="w-4 h-4" /> Settings
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 w-full">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
