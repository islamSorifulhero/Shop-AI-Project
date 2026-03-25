'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Star, Shield, Truck, RefreshCw, Headphones, TrendingUp, ChevronRight, Quote } from 'lucide-react';
import { products, categories, stats, testimonials, blogPosts } from '@/lib/data';
import ProductCard, { ProductCardSkeleton } from '@/components/products/ProductCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatbot from '@/components/ai/AIChatbot';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const popularProducts = products.slice(0, 8);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* 1. HERO SECTION */}
        <section className="hero-gradient min-h-[65vh] flex items-center pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-in slide-in-from-left-10 duration-700">
                <span className="badge bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 mb-4 inline-flex">
                  ✨ AI-Powered Shopping
                </span>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                  Shop Smarter with{' '}
                  <span className="gradient-text">AI Assistance</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg">
                  Discover thousands of premium products with personalized AI recommendations. Get instant answers, smart suggestions, and the best deals — all in one place.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/products" className="btn-primary flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Shop Now
                  </Link>
                  <Link href="/products" className="btn-secondary flex items-center gap-2">
                    Explore Deals
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                {/* Trust badges */}
                <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                  {[
                    { icon: Shield, text: 'Secure Payments' },
                    { icon: Truck, text: 'Free Shipping $50+' },
                    { icon: RefreshCw, text: '30-Day Returns' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Icon className="w-4 h-4 text-primary-500" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
              {/* Hero visual */}
              <div className="relative hidden lg:block">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800"
                    alt="Shopping"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Floating card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100" alt="" width={48} height={48} className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Premium Headphones</p>
                        <p className="text-xs text-gray-500">Just added to trending</p>
                      </div>
                      <span className="font-bold text-primary-600">$89.99</span>
                    </div>
                  </div>
                </div>
                {/* Stats card */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700">
                  <TrendingUp className="w-6 h-6 text-green-500 mb-1" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">50K+</p>
                  <p className="text-xs text-gray-500">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CATEGORIES */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-primary-500 font-medium text-sm mb-1">Browse by Category</p>
                <h2 className="section-title">Shop by Category</h2>
              </div>
              <Link href="/products" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center gap-1">
                All Categories <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.name}`}
                  className="group flex flex-col items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 hover:bg-primary-50 dark:hover:bg-primary-950/30 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">{cat.name}</span>
                  <span className="text-xs text-gray-400">{cat.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. FEATURED PRODUCTS */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-primary-500 font-medium text-sm mb-1">Handpicked for You</p>
                <h2 className="section-title">Featured Products</h2>
              </div>
              <Link href="/products?featured=true" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading
                ? Array(4).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
                : featuredProducts.map(p => <ProductCard key={p.id} product={p} />)
              }
            </div>
          </div>
        </section>

        {/* 4. PROMO BANNER */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-500 to-primary-700 p-8 flex flex-col justify-end" style={{ minHeight: 200 }}>
                <Image src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" alt="" fill className="object-cover opacity-20" />
                <div className="relative">
                  <span className="badge bg-white/20 text-white mb-2">Limited Time</span>
                  <h3 className="text-2xl font-bold text-white font-display mb-1">New Arrivals</h3>
                  <p className="text-white/80 text-sm mb-4">Fresh tech gear just dropped</p>
                  <Link href="/products?category=Electronics" className="inline-flex items-center gap-2 bg-white text-primary-600 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-50 transition-colors">
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-accent-500 to-accent-600 p-8 flex flex-col justify-end" style={{ minHeight: 200 }}>
                <Image src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600" alt="" fill className="object-cover opacity-20" />
                <div className="relative">
                  <span className="badge bg-white/20 text-white mb-2">Up to 40% Off</span>
                  <h3 className="text-2xl font-bold text-white font-display mb-1">Fashion Sale</h3>
                  <p className="text-white/80 text-sm mb-4">Style at unbeatable prices</p>
                  <Link href="/products?category=Fashion" className="inline-flex items-center gap-2 bg-white text-accent-600 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors">
                    Explore <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. POPULAR PRODUCTS */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-primary-500 font-medium text-sm mb-1">Top Rated</p>
                <h2 className="section-title">Popular Products</h2>
              </div>
              <Link href="/products" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center gap-1">
                See All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading
                ? Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
                : popularProducts.map(p => <ProductCard key={p.id} product={p} />)
              }
            </div>
          </div>
        </section>

        {/* 6. STATISTICS */}
        <section className="py-16 bg-gradient-to-br from-primary-500 to-accent-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map(stat => (
                <div key={stat.label}>
                  <div className="text-5xl mb-3">{stat.icon}</div>
                  <div className="text-4xl font-bold font-display text-white mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. SERVICES */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary-500 font-medium text-sm mb-1">Why Choose Us</p>
              <h2 className="section-title">Our Services</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'Free delivery on all orders over $50. Express options available.', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
                { icon: RefreshCw, title: 'Easy Returns', desc: 'Not satisfied? Return within 30 days, no questions asked.', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
                { icon: Shield, title: 'Secure Payments', desc: 'Your payment info is 100% secure with end-to-end encryption.', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
                { icon: Headphones, title: 'AI Support 24/7', desc: 'Our AI assistant is always ready to help you find what you need.', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
              ].map(service => (
                <div key={service.title} className="card p-6 text-center hover:shadow-lg transition-shadow">
                  <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mx-auto mb-4`}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary-500 font-medium text-sm mb-1">What Customers Say</p>
              <h2 className="section-title">Testimonials</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map(t => (
                <div key={t.id} className="card p-6 hover:shadow-lg transition-shadow">
                  <Quote className="w-8 h-8 text-primary-200 dark:text-primary-900 mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">"{t.comment}"</p>
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`w-4 h-4 ${s <= t.rating ? 'star-filled fill-current' : 'star-empty'}`} />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src={t.avatar} alt={t.name} width={36} height={36} className="rounded-full" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. BLOG */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-primary-500 font-medium text-sm mb-1">Latest Updates</p>
                <h2 className="section-title">From Our Blog</h2>
              </div>
              <Link href="/blog" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center gap-1">
                All Posts <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map(post => (
                <article key={post.id} className="card overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 badge bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs shadow-sm">{post.category}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{post.excerpt}</p>
                    <Link href={`/blog/${post.id}`} className="text-sm text-primary-500 font-medium hover:text-primary-600 flex items-center gap-1">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FAQ */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary-500 font-medium text-sm mb-1">Got Questions?</p>
              <h2 className="section-title">FAQ</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: 'How does the AI chatbot help me?', a: 'Our AI assistant helps you find products, compare options, track orders, and get instant answers to any shopping-related questions 24/7.' },
                { q: 'What is your shipping policy?', a: 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days. Express shipping (1-2 days) is available for a small fee.' },
                { q: 'Can I return a product?', a: 'Yes! We have a hassle-free 30-day return policy. Items must be in original condition. Defective items get free return shipping.' },
                { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive a tracking number by email. You can also track your order in your dashboard under "My Orders".' },
                { q: 'Is my payment information secure?', a: 'Absolutely. We use 256-bit SSL encryption and never store your card details. All payments are processed through secure, certified payment gateways.' },
              ].map((item, i) => (
                <details key={i} className="card p-5 group cursor-pointer">
                  <summary className="flex justify-between items-center font-medium text-gray-900 dark:text-white list-none">
                    {item.q}
                    <span className="text-primary-500 group-open:rotate-45 transition-transform duration-200 text-xl">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 11. NEWSLETTER */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-3">Stay in the Loop</h2>
            <p className="text-gray-400 mb-8">Get the latest deals, new arrivals, and shopping tips delivered to your inbox.</p>
            {subscribed ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6">
                <p className="text-green-400 font-medium">🎉 Thanks for subscribing! Check your inbox for a welcome offer.</p>
              </div>
            ) : (
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={() => { if (email) { setSubscribed(true); } }}
                  className="btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 12. CTA SECTION */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-accent-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Ready to Shop Smarter?</h2>
            <p className="text-white/85 text-lg mb-8">Join 50,000+ shoppers who save time and money with AI-powered recommendations.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/auth/register" className="bg-white text-primary-600 font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-50 transition-colors shadow-xl">
                Get Started Free
              </Link>
              <Link href="/products" className="bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/30 transition-colors border border-white/30">
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}
