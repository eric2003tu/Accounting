'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, UserCheck, UserX } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import DeleteConfirmationModal from '@/app/components/admin/DeleteConfirmationModal';
import { adminUsers, type AdminUser } from '@/app/admin/data/adminDirectoryData';

const initialUsers: AdminUser[] = adminUsers;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

  const active = users.filter((item) => item.status === 'Active').length;
  const suspended = users.filter((item) => item.status === 'Suspended').length;

  const confirmDelete = () => {
    if (!userToDelete) {
      return;
    }

    setUsers((currentUsers) => currentUsers.filter((item) => item.id !== userToDelete.id));
    setUserToDelete(null);
  };

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
          {
            key: 'name',
            label: 'Name',
            render: (value, row) => (
              <Link
                href={`/admin/users/${row.id}`}
                className="font-medium text-slate-900 transition-colors hover:text-green-700"
              >
                {value}
              </Link>
            ),
          },
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
          {
            key: 'id',
            label: 'Actions',
            render: (_, row) => (
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/users/${row.id}`}
                  className="inline-flex items-center rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  View
                </Link>
                <button
                  type="button"
                  onClick={() => setUserToDelete(row)}
                  className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            ),
          },
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

      <DeleteConfirmationModal
        isOpen={!!userToDelete}
        title="Delete user"
        message={
          userToDelete
            ? `Are you sure you want to delete ${userToDelete.name}? This action cannot be undone.`
            : ''
        }
        confirmLabel="Yes, delete"
        onCancel={() => setUserToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
