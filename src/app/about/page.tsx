import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Heart, Zap, Users, Award, Globe } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatbot from '@/components/ai/AIChatbot';

const team = [
  { name: 'Alex Morgan', role: 'CEO & Co-Founder', avatar: 'https://i.pravatar.cc/200?img=15', bio: '10+ years in e-commerce and retail technology.' },
  { name: 'Priya Sharma', role: 'CTO & Co-Founder', avatar: 'https://i.pravatar.cc/200?img=16', bio: 'AI researcher and full-stack engineer.' },
  { name: 'David Chen', role: 'Head of Product', avatar: 'https://i.pravatar.cc/200?img=17', bio: 'UX expert focused on customer delight.' },
  { name: 'Sophia Williams', role: 'Head of Marketing', avatar: 'https://i.pravatar.cc/200?img=18', bio: 'Digital marketing strategist with 8 years experience.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero */}
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="badge bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 mb-4 inline-flex">About ShopAI</span>
            <h1 className="font-display text-5xl font-bold text-gray-900 dark:text-white mb-5">
              Shopping Reimagined with <span className="gradient-text">Artificial Intelligence</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              ShopAI was founded in 2016 with a simple mission: make online shopping smarter, faster, and more personal using the power of AI.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-title mb-5">Our Mission</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We believe shopping should be effortless. By combining cutting-edge AI technology with a curated product selection, we've created a platform where finding exactly what you need feels intuitive and even fun.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Our AI assistant analyzes your preferences, browsing history, and real-time trends to surface products you'll genuinely love — before you even know you want them.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Target, label: 'Precision', desc: 'AI-powered recommendations' },
                    { icon: Heart, label: 'Customer First', desc: 'Your satisfaction is priority' },
                    { icon: Zap, label: 'Fast & Easy', desc: 'Seamless checkout experience' },
                    { icon: Globe, label: 'Global Reach', desc: 'Serving 45+ countries' },
                  ].map(v => (
                    <div key={v.label} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <v.icon className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">{v.label}</p>
                        <p className="text-xs text-gray-400">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden h-80">
                  <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" alt="Team" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-14 bg-gradient-to-r from-primary-500 to-accent-600">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { icon: Users, value: '50K+', label: 'Happy Customers' },
                { icon: Award, value: '8+', label: 'Years of Excellence' },
                { icon: Globe, value: '45+', label: 'Countries Served' },
                { icon: Zap, value: '10K+', label: 'Products Available' },
              ].map(s => (
                <div key={s.label}>
                  <s.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <p className="text-4xl font-bold font-display">{s.value}</p>
                  <p className="text-white/80 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">Meet Our Team</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-3">The passionate people behind ShopAI</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map(member => (
                <div key={member.name} className="card p-6 text-center hover:shadow-lg transition-shadow">
                  <Image src={member.avatar} alt={member.name} width={80} height={80} className="rounded-2xl mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-primary-500 mb-2">{member.role}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-white dark:bg-gray-950 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="section-title mb-4">Ready to Experience Smarter Shopping?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Join thousands of satisfied customers who shop smarter with ShopAI.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/products" className="btn-primary">Start Shopping</Link>
              <Link href="/contact" className="btn-secondary">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}
