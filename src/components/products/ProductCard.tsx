'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import clsx from 'clsx';

interface ProductCardProps {
  product: Product;
  loading?: boolean;
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-56 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-5 w-1/3 rounded" />
        <div className="skeleton h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="card group product-card relative flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-50 dark:bg-gray-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {/* Overlay */}
        <div className="product-overlay absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/products/${product.id}`}
            className="bg-white text-gray-900 rounded-full p-3 shadow-lg hover:bg-primary-500 hover:text-white transition-colors"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {discount && (
            <span className="badge bg-red-500 text-white text-xs">{discount}% OFF</span>
          )}
          {product.featured && (
            <span className="badge bg-primary-500 text-white text-xs">Featured</span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={clsx(
            'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200',
            wishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white'
          )}
        >
          <Heart className={clsx('w-4 h-4', wishlisted && 'fill-current')} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-1">{product.brand}</div>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={clsx('w-3.5 h-3.5', star <= Math.round(product.rating) ? 'star-filled fill-current' : 'star-empty')}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto mb-3">
          <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={() => addToCart(product)}
          className={clsx(
            'flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
            product.stock > 0
              ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-md shadow-primary-500/25 active:scale-95'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
          )}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
