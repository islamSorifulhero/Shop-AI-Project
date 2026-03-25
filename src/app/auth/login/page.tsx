'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, Loader2, Chrome } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login, googleLogin } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      router.push('/');
    } catch {
      // Error handled in context
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role: 'user' | 'admin') => {
    setValue('email', role === 'admin' ? 'admin@example.com' : 'user@example.com');
    setValue('password', '123456');
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await googleLogin();
      router.push('/');
    } catch {
      // handled
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-display font-bold text-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="gradient-text">ShopAI</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-1">Welcome back!</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Sign in to continue shopping</p>
        </div>

        <div className="card p-8">
          {/* Demo Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-primary-50 dark:bg-primary-950/30 rounded-xl">
            <p className="col-span-2 text-xs font-semibold text-primary-700 dark:text-primary-300 mb-1">🎯 Demo Login</p>
            <button onClick={() => fillDemo('user')} className="text-xs py-2 px-3 bg-white dark:bg-gray-800 border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors font-medium">
              👤 User Demo
            </button>
            <button onClick={() => fillDemo('admin')} className="text-xs py-2 px-3 bg-white dark:bg-gray-800 border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors font-medium">
              🛡️ Admin Demo
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' }
                })}
                placeholder="you@example.com"
                className="input-field"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <Link href="#" className="text-xs text-primary-500 hover:text-primary-600">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' }
                  })}
                  placeholder="••••••••"
                  className="input-field pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
            <div className="relative flex justify-center text-xs text-gray-400 bg-white dark:bg-gray-900 px-3">OR</div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Chrome className="w-4 h-4 text-blue-500" />}
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-primary-500 hover:text-primary-600 font-medium">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
