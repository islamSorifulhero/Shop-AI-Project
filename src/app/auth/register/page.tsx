'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, Loader2, Chrome, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

export default function RegisterPage() {
  const { register: registerUser, googleLogin } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await registerUser(data.email, data.password, data.name);
      router.push('/');
    } catch {
      // handled in context
    } finally {
      setLoading(false);
    }
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

  const passwordStrength = (pw: string) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };
  const strength = passwordStrength(password || '');
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-display font-bold text-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="gradient-text">ShopAI</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-1">Create your account</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Join 50,000+ smart shoppers today</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
                placeholder="John Doe"
                className="input-field"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
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
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor[strength] : 'bg-gray-200 dark:bg-gray-700'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{strengthLabel[strength]} password</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                placeholder="••••••••"
                className="input-field"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agree"
                {...register('agree', { required: 'You must agree to terms' })}
                className="mt-0.5 w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="agree" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-500 hover:text-primary-600">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary-500 hover:text-primary-600">Privacy Policy</Link>
              </label>
            </div>
            {errors.agree && <p className="text-red-500 text-xs -mt-2">{errors.agree.message}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              {loading ? 'Creating account...' : 'Create Account'}
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
            Sign up with Google
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary-500 hover:text-primary-600 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
