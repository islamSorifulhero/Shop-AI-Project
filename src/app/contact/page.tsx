'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatbot from '@/components/ai/AIChatbot';
import toast from 'react-hot-toast';

interface ContactForm { name: string; email: string; subject: string; message: string; }

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    reset();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero */}
        <section className="hero-gradient py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">Get in Touch</h1>
            <p className="text-gray-600 dark:text-gray-300">We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Info */}
              <div className="space-y-6">
                {[
                  { icon: Mail, title: 'Email Us', info: 'islamsoriful.hero@gmail.com', sub: 'We reply within 24 hours' },
                  { icon: Phone, title: 'Call Us', info: '+88 01770-886813', sub: 'Mon–Fri, 9AM–6PM EST' },
                  { icon: MapPin, title: 'Visit Us', info: 'Mohakhali, Dhaka', sub: 'Aqua Tower 43, Mohakhali C/A, Dhaka, Bangladesh' },
                  { icon: Clock, title: 'Support Hours', info: '24/7 AI Support', sub: 'Human agents: Mon–Fri' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary-50 dark:bg-primary-950/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{item.info}</p>
                      <p className="text-gray-400 text-xs">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="lg:col-span-2 card p-8">
                {sent ? (
                  <div className="text-center py-10">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSent(false)} className="btn-primary">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">Send a Message</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Name</label>
                        <input {...register('name', { required: 'Name is required' })} placeholder="name" className="input-field" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                        <input type="email" {...register('email', { required: 'Email is required' })} placeholder="abul@gmail.com" className="input-field" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                      <select {...register('subject', { required: 'Please select a subject' })} className="input-field">
                        <option value="">Select a subject</option>
                        <option>Order Issue</option>
                        <option>Product Question</option>
                        <option>Return/Refund</option>
                        <option>Technical Support</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                      <textarea {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'At least 20 characters' } })} rows={5} placeholder="Tell us how we can help..." className="input-field resize-none" />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}
