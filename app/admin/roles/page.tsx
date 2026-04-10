'use client';

import React from 'react';
import { UserCog, KeyRound, ShieldCheck } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';

const roles = [
  { id: 1, role: 'Owner', members: 2, permissions: 42, risk: 'Critical', lastUpdated: '2026-04-08' },
  { id: 2, role: 'Admin', members: 6, permissions: 35, risk: 'High', lastUpdated: '2026-04-09' },
  { id: 3, role: 'Accountant', members: 12, permissions: 20, risk: 'Medium', lastUpdated: '2026-04-02' },
  { id: 4, role: 'Support', members: 8, permissions: 14, risk: 'Medium', lastUpdated: '2026-04-07' },
  { id: 5, role: 'Viewer', members: 21, permissions: 6, risk: 'Low', lastUpdated: '2026-03-30' },
];

export default function AdminRolesPage() {
  const privilegedRoles = roles.filter((item) => item.risk === 'Critical' || item.risk === 'High').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Roles</h1>
        <p className="text-slate-600 mt-1">Define operational responsibilities and least-privilege boundaries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Roles" value={roles.length} description="Active role profiles" icon={UserCog} />
        <StatCard title="Privileged Roles" value={privilegedRoles} description="High-impact access" icon={ShieldCheck} />
        <StatCard title="Permission Grants" value={roles.reduce((sum, r) => sum + r.permissions, 0)} description="Across all roles" icon={KeyRound} />
      </div>

      <DataTable
        title="Role Catalog"
        description="Current role templates and privilege footprint"
        data={roles}
        fileName="admin-roles"
        columns={[
          { key: 'role', label: 'Role' },
          { key: 'members', label: 'Members', align: 'right' },
          { key: 'permissions', label: 'Permissions', align: 'right' },
          {
            key: 'risk',
            label: 'Risk',
            render: (value) => (
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${value === 'Critical' ? 'bg-red-100 text-red-700' : value === 'High' ? 'bg-amber-100 text-amber-700' : value === 'Medium' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                {value}
              </span>
            ),
          },
          { key: 'lastUpdated', label: 'Last Updated' },
        ]}
        filters={[
          {
            key: 'risk',
            label: 'Risk',
            options: [
              { label: 'Critical', value: 'Critical' },
              { label: 'High', value: 'High' },
              { label: 'Medium', value: 'Medium' },
              { label: 'Low', value: 'Low' },
            ],
          },
        ]}
        searchPlaceholder="Search roles..."
      />
    </div>
  );
}
