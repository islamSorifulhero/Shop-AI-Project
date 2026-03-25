import React from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">ShopAI</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Your AI-powered shopping destination. Discover products you'll love with smart recommendations and 24/7 AI assistance.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2.5 text-sm">
              {['All Products', 'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Beauty', 'Deals & Offers'].map(item => (
                <li key={item}>
                  <Link href={`/products${item !== 'All Products' && item !== 'Deals & Offers' ? `?category=${item}` : ''}`}
                    className="hover:text-primary-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-white mb-4">Help & Info</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Help Center', href: '/help' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms & Conditions', href: '/terms' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-primary-400 transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <span>123 Tech Street, Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="tel:+11234567890" className="hover:text-primary-400 transition-colors">+1 (123) 456-7890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="mailto:hello@shopai.com" className="hover:text-primary-400 transition-colors">hello@shopai.com</a>
              </li>
            </ul>
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium text-white mb-3">Subscribe to newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-500"
                />
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-medium text-white transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2024 ShopAI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary-400 transition-colors">Terms</Link>
            <Link href="/help" className="hover:text-primary-400 transition-colors">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
