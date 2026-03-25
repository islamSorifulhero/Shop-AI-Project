'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronRight, CreditCard, Truck, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useForm } from 'react-hook-form';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import toast from 'react-hot-toast';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  paymentMethod: string;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>();

  const shipping = total >= 50 ? 0 : 5.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const onSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setOrderPlaced(true);
    clearCart();
    toast.success('Order placed successfully! 🎉');
  };

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">Order Placed!</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-2">Thank you for your purchase.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">Order #ORD-{Math.random().toString(36).substr(2,9).toUpperCase()} • Confirmation sent to your email</p>
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard/user/orders" className="btn-primary">Track Order</Link>
              <Link href="/products" className="btn-secondary">Keep Shopping</Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-5xl mb-4">🛒</p>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Link href="/products" className="btn-primary">Shop Now</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/cart" className="hover:text-primary-500">Cart</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step >= 1 ? 'text-primary-500 font-medium' : ''}>Shipping</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step >= 2 ? 'text-primary-500 font-medium' : ''}>Payment</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step >= 3 ? 'text-primary-500 font-medium' : ''}>Review</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Step 1: Shipping */}
                <div className="card p-6 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary-500" /> Shipping Information
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
                      <input {...register('firstName', { required: 'Required' })} placeholder="John" className="input-field" />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
                      <input {...register('lastName', { required: 'Required' })} placeholder="Doe" className="input-field" />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                      <input type="email" {...register('email', { required: 'Required' })} placeholder="john@example.com" className="input-field" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                      <input {...register('phone', { required: 'Required' })} placeholder="+1 234 567 8900" className="input-field" />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Street Address</label>
                      <input {...register('address', { required: 'Required' })} placeholder="123 Main Street, Apt 4B" className="input-field" />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">City</label>
                      <input {...register('city', { required: 'Required' })} placeholder="New York" className="input-field" />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">State</label>
                      <input {...register('state', { required: 'Required' })} placeholder="NY" className="input-field" />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">ZIP Code</label>
                      <input {...register('zip', { required: 'Required' })} placeholder="10001" className="input-field" />
                      {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Country</label>
                      <select {...register('country', { required: 'Required' })} className="input-field">
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 2: Payment */}
                <div className="card p-6 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary-500" /> Payment Method
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { id: 'card', label: 'Credit Card', icon: '💳' },
                      { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                      { id: 'crypto', label: 'Crypto', icon: '₿' },
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-3 rounded-xl border-2 text-center text-sm font-medium transition-all ${
                          paymentMethod === method.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <div className="text-2xl mb-1">{method.icon}</div>
                        {method.label}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Card Number</label>
                        <input {...register('cardNumber', { required: paymentMethod === 'card' ? 'Required' : false })} placeholder="1234 5678 9012 3456" className="input-field" maxLength={19} />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Cardholder Name</label>
                        <input {...register('cardName', { required: paymentMethod === 'card' ? 'Required' : false })} placeholder="John Doe" className="input-field" />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName.message}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Expiry Date</label>
                          <input {...register('expiry', { required: paymentMethod === 'card' ? 'Required' : false })} placeholder="MM/YY" className="input-field" maxLength={5} />
                          {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CVV</label>
                          <input {...register('cvv', { required: paymentMethod === 'card' ? 'Required' : false })} placeholder="123" className="input-field" maxLength={4} />
                          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv.message}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-6 bg-blue-50 dark:bg-blue-950/20 rounded-xl">
                      <p className="text-blue-600 dark:text-blue-400">You will be redirected to PayPal to complete payment.</p>
                    </div>
                  )}
                  {paymentMethod === 'crypto' && (
                    <div className="text-center py-6 bg-orange-50 dark:bg-orange-950/20 rounded-xl">
                      <p className="text-orange-600 dark:text-orange-400">Pay with Bitcoin, Ethereum, or USDC.</p>
                    </div>
                  )}
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                  {loading ? 'Processing order...' : `Place Order • $${grandTotal.toFixed(2)}`}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="card p-6 sticky top-24">
                <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-5">Order Summary</h2>
                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-14 h-14 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 dark:text-white line-clamp-2">{item.name}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span><span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span><span className={shipping === 0 ? 'text-green-500' : ''}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span>Total</span><span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
