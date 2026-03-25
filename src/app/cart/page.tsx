'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatbot from '@/components/ai/AIChatbot';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const suggested = products.slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">
            Shopping Cart {items.length > 0 && <span className="text-gray-400 font-normal text-xl">({items.length} items)</span>}
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
              <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <div key={item.id} className="card p-4 flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.id}`} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-500 line-clamp-2">{item.name}</Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.brand} · {item.category}</p>
                      <p className="text-primary-600 dark:text-primary-400 font-bold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeFromCart(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1.5 transition-colors">
                  <Trash2 className="w-4 h-4" /> Clear Cart
                </button>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <div className="card p-6">
                  <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-5">Order Summary</h2>
                  <div className="space-y-3 text-sm mb-5">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Shipping</span>
                      <span className={total >= 50 ? 'text-green-500 font-medium' : ''}>{total >= 50 ? 'Free' : '$5.99'}</span>
                    </div>
                    {total < 50 && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
                        Add ${(50 - total).toFixed(2)} more for free shipping!
                      </p>
                    )}
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Tax (8%)</span>
                      <span>${(total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between font-bold text-gray-900 dark:text-white text-base">
                      <span>Total</span>
                      <span>${(total + (total < 50 ? 5.99 : 0) + total * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                  <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </Link>
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Secure, encrypted checkout
                  </div>
                </div>

                {/* Promo code */}
                <div className="card p-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Have a promo code?</p>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Enter code" className="input-field text-sm py-2" />
                    <button className="btn-outline text-sm py-2 px-4 whitespace-nowrap">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions */}
          <section className="mt-16">
            <h2 className="section-title mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggested.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}
