'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import {
  ShoppingCart, Sun, Moon, Menu, X, ChevronDown,
  User, Settings, LogOut, LayoutDashboard, Package,
  Heart, Search, Sparkles
} from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loggedOutLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const loggedInLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/user', label: 'Dashboard' },
  ];

  const navLinks = user ? loggedInLinks : loggedOutLinks;

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="gradient-text">ShopAI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            {/* Shop dropdown */}
            <div className="relative">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all"
              >
                Categories <ChevronDown className="w-3 h-3" />
              </button>
              {shopOpen && (
                <div className="absolute top-full mt-2 left-0 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
                  {['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Beauty', 'Books'].map(cat => (
                    <Link
                      key={cat}
                      href={`/products?category=${cat}`}
                      onClick={() => setShopOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-950/20 hover:text-primary-600 transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <Link href="/products" className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link href="/cart" className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {user.displayName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.displayName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      <span className={clsx('badge mt-1 text-xs', user.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300')}>
                        {user.role}
                      </span>
                    </div>
                    <div className="py-1">
                      <Link href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'} onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link href="/dashboard/user/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <Link href="/dashboard/user/orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Package className="w-4 h-4" /> My Orders
                      </Link>
                      <Link href="/dashboard/user/wishlist" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Heart className="w-4 h-4" /> Wishlist
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 py-1">
                      <button onClick={() => { logout(); setProfileOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 w-full transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="hidden md:block btn-primary text-sm py-2 px-4">
                Sign In
              </Link>
            )}

            {/* Mobile menu */}
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-4 space-y-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="pt-2 px-4">
                <Link href="/auth/login" onClick={() => setIsOpen(false)} className="btn-primary block text-center text-sm">Sign In</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
