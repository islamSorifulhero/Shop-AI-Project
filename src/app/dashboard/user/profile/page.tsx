'use client';
import React, { useState } from 'react';
import { Camera, Save, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ProfileForm {
  displayName: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

export default function UserProfilePage() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    defaultValues: {
      displayName: user?.displayName || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      bio: 'Avid shopper and tech enthusiast. Love finding great deals!',
    }
  });

  const onSubmit = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1500));
    setSaving(false);
    setSaved(true);
    toast.success('Profile updated successfully!');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your personal information</p>
      </div>

      {/* Avatar */}
      <div className="card p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
              {user?.displayName?.[0]?.toUpperCase() || 'U'}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors shadow-md">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-lg">{user?.displayName}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>
            <span className="badge bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 mt-1">Verified Account</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">Personal Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
            <input {...register('displayName', { required: 'Name is required' })} className="input-field" />
            {errors.displayName && <p className="text-red-500 text-xs mt-1">{errors.displayName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <input {...register('email')} disabled className="input-field opacity-60 cursor-not-allowed" />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
            <input {...register('phone')} placeholder="+1 234 567 8900" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Address</label>
            <input {...register('address')} placeholder="Your address" className="input-field" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
            <textarea {...register('bio')} rows={3} placeholder="Tell us about yourself..." className="input-field resize-none" />
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </form>

      {/* Password */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">Change Password</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Current Password</label>
            <input type="password" placeholder="••••••••" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Password</label>
            <input type="password" placeholder="••••••••" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm New Password</label>
            <input type="password" placeholder="••••••••" className="input-field" />
          </div>
        </div>
        <button className="btn-outline text-sm py-2.5 px-5">Update Password</button>
      </div>
    </div>
  );
}
