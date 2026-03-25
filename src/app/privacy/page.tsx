import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  const sections = [
    { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, shipping address, payment information, and any other information you choose to provide. We also automatically collect certain information about your device and how you interact with our services, including IP address, browser type, operating system, referring URLs, and pages viewed.' },
    { title: '2. How We Use Your Information', content: 'We use the information we collect to process transactions and send you related information including purchase confirmations and invoices. We also use it to send promotional communications, such as information about products, services, and events offered by ShopAI, to respond to your comments and questions, and to personalize your experience on our platform through AI-powered recommendations.' },
    { title: '3. Information Sharing', content: 'We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described in this Privacy Policy. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.' },
    { title: '4. Data Security', content: 'We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology. We maintain physical, electronic, and procedural safeguards that comply with federal regulations to guard your nonpublic personal information.' },
    { title: '5. Cookies', content: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.' },
    { title: '6. Your Rights', content: 'You have the right to access, update, or delete the information we have on you. You can review and change your personal information by logging into our website and visiting your account profile page. You may also contact us directly to request access to, correct, or delete any personal information that you have provided to us.' },
    { title: '7. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at privacy@shopai.com or by mail to ShopAI, 123 Tech Street, Silicon Valley, CA 94025.' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="hero-gradient py-14 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-primary-500" />
            </div>
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">Privacy Policy</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Last updated: March 1, 2024</p>
          </div>
        </section>
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
          <div className="card p-6 bg-primary-50 dark:bg-primary-950/20 border-primary-100 dark:border-primary-900/30">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              At ShopAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully.
            </p>
          </div>
          {sections.map(s => (
            <div key={s.title} className="card p-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-3">{s.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{s.content}</p>
            </div>
          ))}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Have questions about our privacy practices?</p>
            <Link href="/contact" className="btn-primary text-sm py-2.5 px-6">Contact Us</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
