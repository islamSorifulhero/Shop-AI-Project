'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { products } from '@/lib/data';
import { useCart } from '@/context/CartContext';

const wishlistItems = products.slice(0, 5);

export default function WishlistPage() {
  const { addToCart } = useCart();
  const [items, setItems] = useState(wishlistItems);

  const remove = (id: string) => setItems(prev => prev.filter(p => p.id !== id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">My Wishlist</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{items.length} saved items</p>
      </div>

      {items.length === 0 ? (
        <div className="card p-16 text-center">
          <Heart className="w-14 h-14 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6 text-sm">Save products you love by clicking the heart icon.</p>
          <Link href="/products" className="btn-primary inline-flex items-center gap-2">
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="card p-4 flex gap-4">
              <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.id}`} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-500 line-clamp-2">{item.name}</Link>
                <p className="text-primary-600 dark:text-primary-400 font-bold mt-1 text-sm">${item.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => addToCart(item)} className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-primary-500 text-white text-xs rounded-lg hover:bg-primary-600 transition-colors">
                    <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                  <button onClick={() => remove(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
