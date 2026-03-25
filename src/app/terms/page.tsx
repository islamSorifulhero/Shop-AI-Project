import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing and using ShopAI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.' },
    { title: '2. Use License', content: 'Permission is granted to temporarily download one copy of the materials on ShopAI for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials, use the materials for any commercial purpose, remove any copyright or other proprietary notations, or transfer the materials to another person.' },
    { title: '3. Account Responsibilities', content: 'You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password. ShopAI reserves the right to refuse service, terminate accounts, or remove content at our sole discretion.' },
    { title: '4. Product Information', content: 'We strive to display accurate product information, pricing, and availability. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. If a product offered by ShopAI is not as described, your sole remedy is to return it in unused condition.' },
    { title: '5. Pricing and Payment', content: 'All prices are listed in US Dollars and are subject to change without notice. We reserve the right to refuse or cancel any orders placed for products listed at incorrect prices. Payment must be received prior to the acceptance of an order. We accept major credit cards, PayPal, and other payment methods as listed at checkout.' },
    { title: '6. Shipping and Delivery', content: 'ShopAI ships to addresses within the United States and internationally. Shipping times and costs vary by location and are calculated at checkout. We are not responsible for delays caused by customs, weather, or other factors outside our control.' },
    { title: '7. Returns and Refunds', content: 'We offer a 30-day return policy for most items. Products must be returned in their original condition and packaging. Refunds will be processed within 5-7 business days of receiving the returned item. Certain items such as personal care products, perishables, and digital downloads are not eligible for return.' },
    { title: '8. Limitation of Liability', content: 'ShopAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) our service.' },
    { title: '9. Changes to Terms', content: 'We reserve the right to modify these terms of service at any time. We will notify users of any significant changes by posting a notice on our website. Your continued use of the service after such modifications will constitute your acknowledgment of the modified terms.' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="hero-gradient py-14 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-primary-500" />
            </div>
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">Terms & Conditions</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Last updated: March 1, 2024</p>
          </div>
        </section>
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
          <div className="card p-6 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Please read these Terms and Conditions carefully before using ShopAI. By using our platform, you agree to be bound by these terms.
            </p>
          </div>
          {sections.map(s => (
            <div key={s.title} className="card p-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-3">{s.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{s.content}</p>
            </div>
          ))}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Questions about our terms?</p>
            <Link href="/contact" className="btn-primary text-sm py-2.5 px-6">Get in Touch</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
