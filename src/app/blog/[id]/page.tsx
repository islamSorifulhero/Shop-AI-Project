import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatbot from '@/components/ai/AIChatbot';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id === params.id) || blogPosts[0];
  const related = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  const articleContent = [
    `Shopping in the modern era has transformed dramatically with the integration of artificial intelligence and machine learning. ${post.excerpt}`,
    `Whether you're a casual shopper or a dedicated deal-hunter, understanding current trends can help you make smarter purchasing decisions. The landscape of online retail has shifted considerably, with personalization and convenience now at the forefront of the shopping experience.`,
    `Experts in the field consistently point to data-driven approaches as the key differentiator between successful and unsuccessful shopping strategies. By leveraging AI-powered recommendations, consumers can discover products they never knew they needed while staying within budget.`,
    `The intersection of technology and retail creates unique opportunities for savings and discovery. Smart shoppers use multiple tools and strategies, combining traditional comparison shopping with modern AI assistants to find the best value for their money.`,
    `As we look ahead, the trend toward personalized shopping experiences will only accelerate. Platforms that successfully integrate AI recommendations with human-curated selections will lead the next wave of e-commerce innovation. The future of shopping is intelligent, personal, and incredibly convenient.`,
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero image */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
            <span className="badge bg-primary-500 text-white mb-3">{post.category}</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">{post.title}</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {/* Back */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <User className="w-4 h-4" /> {post.author}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" /> {post.readTime}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Tag className="w-4 h-4" /> {post.date}
            </div>
          </div>

          {/* Article Body */}
          <article className="prose dark:prose-invert max-w-none mb-12">
            {articleContent.map((para, i) => (
              <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5 text-base">{para}</p>
            ))}

            <div className="my-8 p-6 border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-950/20 rounded-r-xl">
              <p className="text-gray-800 dark:text-gray-200 italic font-medium leading-relaxed">
                "The best shopping experiences combine AI intelligence with human intuition. At ShopAI, we believe technology should empower shoppers, not overwhelm them."
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">— ShopAI Editorial Team</p>
            </div>

            <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">Key Takeaways</h2>
            <ul className="space-y-2">
              {['Use AI-powered tools to discover products that match your preferences', 'Always compare prices across multiple platforms before purchasing', 'Read reviews carefully — look for verified purchases and detailed feedback', 'Take advantage of free shipping thresholds to maximize savings', 'Set up price alerts for items on your wishlist'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {['Shopping', 'AI', post.category, 'Tips'].map(tag => (
              <span key={tag} className="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm">{tag}</span>
            ))}
          </div>

          {/* Related */}
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(rpost => (
                <article key={rpost.id} className="card overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="relative h-36 overflow-hidden">
                    <Image src={rpost.image} alt={rpost.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-primary-500 mb-1">{rpost.category}</p>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2 group-hover:text-primary-500 transition-colors">{rpost.title}</h3>
                    <Link href={`/blog/${rpost.id}`} className="text-xs text-primary-500 flex items-center gap-1">
                      Read More <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}
