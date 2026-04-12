'use client';

import React from 'react';
import Link from 'next/link';
import { Users, UserCheck, UserX } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';

const users = [
  { id: 1, name: 'Aline Niyonsaba', email: 'aline@acme.com', role: 'Admin', status: 'Active', mfa: 'Enabled', lastLogin: '2026-04-10 08:10' },
  { id: 2, name: 'Samuel Uwizeye', email: 'samuel@acme.com', role: 'Accountant', status: 'Active', mfa: 'Enabled', lastLogin: '2026-04-10 07:55' },
  { id: 3, name: 'Diane Mutesi', email: 'diane@acme.com', role: 'Viewer', status: 'Invited', mfa: 'Pending', lastLogin: '-' },
  { id: 4, name: 'Jean Claude', email: 'jean@acme.com', role: 'Support', status: 'Suspended', mfa: 'Disabled', lastLogin: '2026-04-06 11:45' },
  { id: 5, name: 'Eric Tuyishime', email: 'eric@acme.com', role: 'Owner', status: 'Active', mfa: 'Enabled', lastLogin: '2026-04-10 08:20' },
];

export default function AdminUsersPage() {
  const active = users.filter((item) => item.status === 'Active').length;
  const suspended = users.filter((item) => item.status === 'Suspended').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Users</h1>
          <p className="text-slate-600 mt-1">Manage identities, access posture, and account lifecycle</p>
        </div>

        <Link
          href="/admin/users/add"
          className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Add Business Owner
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={users.length} description="All managed users" icon={Users} />
        <StatCard title="Active Users" value={active} description="Currently enabled" icon={UserCheck} />
        <StatCard title="Suspended" value={suspended} description="Restricted accounts" icon={UserX} />
      </div>

      <DataTable
        title="User Directory"
        description={`${users.length} users in the admin scope`}
        data={users}
        fileName="admin-users"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          {
            key: 'role',
            label: 'Role',
            render: (value) => <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">{value}</span>,
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${value === 'Active' ? 'bg-green-100 text-green-700' : value === 'Suspended' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                {value}
              </span>
            ),
          },
          { key: 'mfa', label: 'MFA' },
          { key: 'lastLogin', label: 'Last Login' },
        ]}
        filters={[
          {
            key: 'role',
            label: 'Role',
            options: [
              { label: 'Owner', value: 'Owner' },
              { label: 'Admin', value: 'Admin' },
              { label: 'Accountant', value: 'Accountant' },
              { label: 'Viewer', value: 'Viewer' },
              { label: 'Support', value: 'Support' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Active', value: 'Active' },
              { label: 'Invited', value: 'Invited' },
              { label: 'Suspended', value: 'Suspended' },
            ],
          },
        ]}
        searchPlaceholder="Search users..."
      />
    </div>
  );
}
