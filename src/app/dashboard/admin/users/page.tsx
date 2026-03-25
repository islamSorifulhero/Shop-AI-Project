'use client';
import React, { useState } from 'react';
import { Search, UserCheck, UserX, MoreVertical, Plus } from 'lucide-react';
import clsx from 'clsx';

const allUsers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'user', status: 'active', orders: 12, joined: 'Jan 15, 2024', avatar: 'SJ' },
  { id: '2', name: 'Mike Chen', email: 'mike@example.com', role: 'user', status: 'active', orders: 8, joined: 'Feb 3, 2024', avatar: 'MC' },
  { id: '3', name: 'Emily Davis', email: 'emily@example.com', role: 'user', status: 'inactive', orders: 3, joined: 'Feb 20, 2024', avatar: 'ED' },
  { id: '4', name: 'Tom Wilson', email: 'tom@example.com', role: 'admin', status: 'active', orders: 0, joined: 'Jan 1, 2024', avatar: 'TW' },
  { id: '5', name: 'Lisa Park', email: 'lisa@example.com', role: 'user', status: 'active', orders: 21, joined: 'Mar 5, 2024', avatar: 'LP' },
  { id: '6', name: 'James Brown', email: 'james@example.com', role: 'user', status: 'active', orders: 5, joined: 'Mar 10, 2024', avatar: 'JB' },
  { id: '7', name: 'Anna Kim', email: 'anna@example.com', role: 'user', status: 'inactive', orders: 0, joined: 'Mar 15, 2024', avatar: 'AK' },
  { id: 'u1', name: 'Demo User', email: 'user@example.com', role: 'user', status: 'active', orders: 4, joined: 'Jan 1, 2024', avatar: 'DU' },
  { id: 'a1', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', orders: 0, joined: 'Jan 1, 2024', avatar: 'AU' },
];

const PER_PAGE = 6;

export default function AdminUsersPage() {
  const [users, setUsers] = useState(allUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
    setOpenMenu(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Manage Users</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{users.length} total users</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4">
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search users..." className="input-field pl-10 py-2.5" />
        </div>
        <div className="flex gap-2">
          {['All', 'user', 'admin'].map(r => (
            <button key={r} onClick={() => { setRoleFilter(r); setPage(1); }} className={clsx('px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize', roleFilter === r ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400')}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr className="text-left text-xs text-gray-400 uppercase">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Orders</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {paginated.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{u.avatar}</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={clsx('badge text-xs capitalize', u.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300')}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={clsx('badge text-xs', u.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300')}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{u.orders}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{u.joined}</td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button onClick={() => setOpenMenu(openMenu === u.id ? null : u.id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      {openMenu === u.id && (
                        <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-10 overflow-hidden">
                          <button onClick={() => toggleStatus(u.id)} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                            {u.status === 'active' ? <UserX className="w-4 h-4 text-red-500" /> : <UserCheck className="w-4 h-4 text-green-500" />}
                            {u.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-40">Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)} className={clsx('w-8 h-8 rounded-lg text-sm', page === p ? 'bg-primary-500 text-white' : 'border border-gray-200 dark:border-gray-700')}>{p}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}
