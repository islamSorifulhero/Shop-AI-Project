'use client';
import React, { useState } from 'react';
import { Plus, Trash2, Tag, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const initialCoupons = [
  { id: '1', code: 'SAVE10', discount: 10, type: 'percent', minOrder: 50, uses: 234, maxUses: 500, active: true, expires: 'Apr 30, 2024' },
  { id: '2', code: 'WELCOME20', discount: 20, type: 'percent', minOrder: 0, uses: 89, maxUses: 200, active: true, expires: 'Dec 31, 2024' },
  { id: '3', code: 'FLAT15', discount: 15, type: 'fixed', minOrder: 75, uses: 45, maxUses: 100, active: false, expires: 'Mar 31, 2024' },
  { id: '4', code: 'SUMMER25', discount: 25, type: 'percent', minOrder: 100, uses: 12, maxUses: 300, active: true, expires: 'Aug 31, 2024' },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [showForm, setShowForm] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [newType, setNewType] = useState('percent');

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied: ${code}`);
  };

  const toggleActive = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    toast.success('Coupon deleted');
  };

  const addCoupon = () => {
    if (!newCode || !newDiscount) { toast.error('Fill all fields'); return; }
    setCoupons(prev => [...prev, {
      id: Date.now().toString(), code: newCode.toUpperCase(),
      discount: Number(newDiscount), type: newType, minOrder: 0,
      uses: 0, maxUses: 100, active: true, expires: 'Dec 31, 2024'
    }]);
    setNewCode(''); setNewDiscount(''); setShowForm(false);
    toast.success('Coupon created!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Coupons</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{coupons.length} coupons</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {showForm && (
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">New Coupon</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Coupon Code</label>
              <input value={newCode} onChange={e => setNewCode(e.target.value)} placeholder="e.g. SAVE20" className="input-field uppercase" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Discount Value</label>
              <input type="number" value={newDiscount} onChange={e => setNewDiscount(e.target.value)} placeholder="e.g. 10" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Type</label>
              <select value={newType} onChange={e => setNewType(e.target.value)} className="input-field">
                <option value="percent">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addCoupon} className="btn-primary text-sm py-2.5 px-5">Create</button>
            <button onClick={() => setShowForm(false)} className="btn-secondary text-sm py-2.5 px-5">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map(coupon => (
          <div key={coupon.id} className={clsx('card p-5', !coupon.active && 'opacity-60')}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-50 dark:bg-primary-950/30 rounded-xl flex items-center justify-center">
                  <Tag className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gray-900 dark:text-white">{coupon.code}</span>
                    <button onClick={() => copyCode(coupon.code)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Copy className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Expires: {coupon.expires}</p>
                </div>
              </div>
              <button
                onClick={() => toggleActive(coupon.id)}
                className={clsx('w-10 h-5.5 rounded-full transition-colors relative flex-shrink-0', coupon.active ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600')}
                style={{ height: 22, width: 40 }}
              >
                <div className={clsx('w-4 h-4 bg-white rounded-full absolute top-[3px] transition-transform shadow', coupon.active ? 'translate-x-5' : 'translate-x-1')} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                <p className="text-sm font-bold text-primary-600 dark:text-primary-400">{coupon.discount}{coupon.type === 'percent' ? '%' : '$'}</p>
                <p className="text-xs text-gray-400">Discount</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{coupon.uses}/{coupon.maxUses}</p>
                <p className="text-xs text-gray-400">Used</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                <p className="text-sm font-bold text-gray-900 dark:text-white">${coupon.minOrder}</p>
                <p className="text-xs text-gray-400">Min Order</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-3">
              <div className="bg-primary-500 h-1.5 rounded-full transition-all" style={{ width: `${(coupon.uses / coupon.maxUses) * 100}%` }} />
            </div>
            <button onClick={() => deleteCoupon(coupon.id)} className="w-full flex items-center justify-center gap-2 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Delete Coupon
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
