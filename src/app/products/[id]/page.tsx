'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, RefreshCw, ChevronRight, Minus, Plus } from 'lucide-react';
import { products } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/products/ProductCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatbot from '@/components/ai/AIChatbot';
import clsx from 'clsx';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <p className="text-5xl mb-4">😕</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Product Not Found</h2>
            <Link href="/products" className="btn-primary">Browse Products</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const images = product.images || [product.image];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const mockReviews = [
    { id: '1', name: 'John D.', rating: 5, comment: 'Absolutely love this product! Exceeded my expectations in every way. The quality is top-notch.', date: '2 weeks ago', avatar: 'https://i.pravatar.cc/40?img=10' },
    { id: '2', name: 'Sarah M.', rating: 4, comment: 'Great product overall. Delivery was fast and packaging was excellent. Would recommend!', date: '1 month ago', avatar: 'https://i.pravatar.cc/40?img=11' },
    { id: '3', name: 'Mike R.', rating: 5, comment: 'Best purchase I\'ve made this year. Exactly as described and works perfectly.', date: '3 weeks ago', avatar: 'https://i.pravatar.cc/40?img=12' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Link href="/" className="hover:text-primary-500">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-primary-500">Products</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/products?category=${product.category}`} className="hover:text-primary-500">{product.category}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 dark:text-white truncate max-w-32">{product.name}</span>
          </nav>

          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative h-96 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <Image src={images[selectedImage]} alt={product.name} fill className="object-contain p-4" />
                {product.originalPrice && (
                  <span className="absolute top-4 left-4 badge bg-red-500 text-white">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={clsx(
                        'w-20 h-20 rounded-xl overflow-hidden border-2 transition-all',
                        i === selectedImage ? 'border-primary-500' : 'border-gray-200 dark:border-gray-700'
                      )}
                    >
                      <Image src={img} alt="" width={80} height={80} className="object-cover w-full h-full" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">{product.brand} · {product.category}</div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={clsx('w-5 h-5', s <= Math.round(product.rating) ? 'star-filled fill-current' : 'star-empty')} />
                  ))}
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{product.rating}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-primary-50 dark:bg-primary-950/30 rounded-2xl">
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                    <span className="badge bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-5">
                <div className={clsx('w-2 h-2 rounded-full', product.stock > 0 ? 'bg-green-500' : 'bg-red-500')} />
                <span className={clsx('text-sm font-medium', product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => { for(let i = 0; i < quantity; i++) addToCart(product); }}
                  disabled={product.stock === 0}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 hover:text-red-500 transition-all">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-500 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, text: 'Secure Payment' },
                  { icon: Truck, text: 'Free Shipping $50+' },
                  { icon: RefreshCw, text: '30-Day Returns' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                    <Icon className="w-5 h-5 text-primary-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 mb-16">
            <div className="flex border-b border-gray-100 dark:border-gray-800">
              {['description', 'specifications', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    'px-6 py-4 text-sm font-medium capitalize transition-colors',
                    activeTab === tab
                      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  )}
                >
                  {tab} {tab === 'reviews' && `(${product.reviewCount})`}
                </button>
              ))}
            </div>
            <div className="p-6">
              {activeTab === 'description' && (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
              )}
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Brand', value: product.brand },
                    { label: 'Category', value: product.category },
                    { label: 'Rating', value: `${product.rating}/5 (${product.reviewCount} reviews)` },
                    { label: 'Stock', value: `${product.stock} units` },
                    { label: 'SKU', value: `SKU-${product.id.padStart(6, '0')}` },
                    { label: 'Tags', value: product.tags?.join(', ') || 'N/A' },
                  ].map(spec => (
                    <div key={spec.label} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{spec.label}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {mockReviews.map(review => (
                    <div key={review.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Image src={review.avatar} alt={review.name} width={36} height={36} className="rounded-full" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.name}</p>
                          <p className="text-xs text-gray-400">{review.date}</p>
                        </div>
                        <div className="ml-auto flex">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} className={clsx('w-3.5 h-3.5', s <= review.rating ? 'star-filled fill-current' : 'star-empty')} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>


          {/* Related Products */}
          {related.length > 0 && (
            <section>
              <h2 className="section-title mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}