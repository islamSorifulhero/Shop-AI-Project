'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowRight, Clock, User } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatbot from '@/components/ai/AIChatbot';

const categories = ['All', 'Technology', 'Fashion', 'Fitness', 'Beauty', 'Shopping', 'Sports'];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = blogPosts.filter(p => {
    const ms = p.title.toLowerCase().includes(search.toLowerCase());
    const mc = category === 'All' || p.category === category;
    return ms && mc;
  });

  const featured = blogPosts[0];
  const rest = filtered.filter(p => p.id !== '1');

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Header */}
        <section className="hero-gradient py-14">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">ShopAI Blog</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Tips, trends, and guides for smarter shopping</p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="input-field pl-12 py-3" />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap mb-10">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === c ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-950/20'}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {category === 'All' && !search && (
            <article className="card overflow-hidden mb-12 group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 badge bg-primary-500 text-white">{featured.category}</span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs text-primary-500 font-medium uppercase mb-2">Featured</span>
                  <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">{featured.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                    <div className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {featured.author}</div>
                    <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.readTime}</div>
                    <span>{featured.date}</span>
                  </div>
                  <Link href={`/blog/${featured.id}`} className="btn-primary inline-flex items-center gap-2 w-fit text-sm py-2.5 px-5">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">📝</p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(category === 'All' && !search ? rest : filtered).map(post => (
                <article key={post.id} className="card overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 badge bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs shadow-sm">{post.category}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <User className="w-3.5 h-3.5" /> {post.author}
                      </div>
                      <Link href={`/blog/${post.id}`} className="text-sm text-primary-500 font-medium hover:text-primary-600 flex items-center gap-1">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}
