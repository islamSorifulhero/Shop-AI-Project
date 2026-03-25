import React from 'react';
import Link from 'next/link';
import { MessageCircle, Package, CreditCard, RefreshCw, Shield, Truck, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatbot from '@/components/ai/AIChatbot';

const helpCategories = [
  { icon: Package, title: 'Orders & Tracking', desc: 'Track orders, modify or cancel', href: '#orders' },
  { icon: Truck, title: 'Shipping & Delivery', desc: 'Delivery times and options', href: '#shipping' },
  { icon: RefreshCw, title: 'Returns & Refunds', desc: 'Return policy and process', href: '#returns' },
  { icon: CreditCard, title: 'Payments', desc: 'Payment methods and billing', href: '#payments' },
  { icon: Shield, title: 'Account & Security', desc: 'Account settings and privacy', href: '#account' },
  { icon: MessageCircle, title: 'Contact Support', desc: 'Chat, email, or call us', href: '/contact' },
];

const faqs = [
  {
    category: 'Orders',
    id: 'orders',
    items: [
      { q: 'How can I track my order?', a: 'After your order ships, you will receive a confirmation email with a tracking number. You can also track orders from your Dashboard under My Orders.' },
      { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and changes may not be possible. Contact support immediately.' },
      { q: 'What if I received a wrong item?', a: 'We apologize for the error. Please contact support within 48 hours with photos and your order number. We will ship the correct item and arrange return pickup at no cost.' },
    ]
  },
  {
    category: 'Shipping',
    id: 'shipping',
    items: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee. International orders take 7-14 business days.' },
      { q: 'Do you offer free shipping?', a: 'Yes! We offer free standard shipping on all orders over $50. Orders below $50 have a flat $5.99 shipping fee.' },
      { q: 'Do you ship internationally?', a: 'We ship to 45+ countries worldwide. International shipping rates and times vary by destination. Check the checkout page for specific rates to your country.' },
    ]
  },
  {
    category: 'Returns',
    id: 'returns',
    items: [
      { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. Items must be in original, unused condition with all original packaging and tags attached.' },
      { q: 'How do I start a return?', a: 'Go to My Orders in your dashboard, select the order, and click Return Item. You\'ll receive a prepaid return label by email within 24 hours.' },
      { q: 'When will I receive my refund?', a: 'Once we receive and inspect the returned item (3-5 business days), your refund will be processed within 5-7 business days to your original payment method.' },
    ]
  },
];

export default function HelpPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="hero-gradient py-14 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">Help Center</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Find answers to common questions or get in touch with our support team.</p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Contact Support
            </Link>
          </div>
        </section>

        <section className="py-12 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
              {helpCategories.map(cat => (
                <Link key={cat.title} href={cat.href} className="card p-4 text-center hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-950/30 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-500 transition-colors">
                    <cat.icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white mb-1">{cat.title}</p>
                  <p className="text-xs text-gray-400 hidden md:block">{cat.desc}</p>
                </Link>
              ))}
            </div>

            {faqs.map(section => (
              <div key={section.id} id={section.id} className="mb-10">
                <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-4">{section.category}</h2>
                <div className="space-y-3">
                  {section.items.map((item, i) => (
                    <details key={i} className="card p-5 group cursor-pointer">
                      <summary className="flex justify-between items-center font-medium text-gray-900 dark:text-white list-none text-sm">
                        {item.q}
                        <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                      </summary>
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}
