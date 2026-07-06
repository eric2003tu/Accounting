'use client';

import React from 'react';
import { KeyRound, ShieldCheck, ShieldAlert } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';

const permissions = [
  { id: 1, name: 'users.manage', module: 'Users', assignedRoles: 2, level: 'Critical', reviewedAt: '2026-04-01' },
  { id: 2, name: 'billing.refund', module: 'Billing', assignedRoles: 2, level: 'High', reviewedAt: '2026-03-29' },
  { id: 3, name: 'audit.view', module: 'Audit', assignedRoles: 4, level: 'Medium', reviewedAt: '2026-04-05' },
  { id: 4, name: 'reports.export', module: 'Reports', assignedRoles: 3, level: 'Medium', reviewedAt: '2026-04-03' },
  { id: 5, name: 'integrations.rotate_keys', module: 'Integrations', assignedRoles: 1, level: 'Critical', reviewedAt: '2026-04-02' },
  { id: 6, name: 'system.read', module: 'System', assignedRoles: 5, level: 'Low', reviewedAt: '2026-03-25' },
];

export default function AdminPermissionsPage() {
  const critical = permissions.filter((item) => item.level === 'Critical').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Permissions</h1>
        <p className="text-slate-600 mt-1">Track granular capability grants and privilege risk</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Permission Keys" value={permissions.length} description="Total distinct privileges" icon={KeyRound} />
        <StatCard title="Critical Permissions" value={critical} description="Need strict controls" icon={ShieldAlert} />
        <StatCard title="Reviewed This Week" value={4} description="RBAC hardening progress" icon={ShieldCheck} />
      </div>

      <DataTable
        title="Permission Matrix"
        description="Permission catalog with role assignment footprint"
        data={permissions}
        fileName="admin-permissions"
        columns={[
          { key: 'name', label: 'Permission' },
          { key: 'module', label: 'Module' },
          { key: 'assignedRoles', label: 'Assigned Roles', align: 'right' },
          {
            key: 'level',
            label: 'Level',
            render: (value) => (
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${value === 'Critical' ? 'bg-red-100 text-red-700' : value === 'High' ? 'bg-amber-100 text-amber-700' : value === 'Medium' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                {value}
              </span>
            ),
          },
          { key: 'reviewedAt', label: 'Last Reviewed' },
        ]}
        filters={[
          {
            key: 'module',
            label: 'Module',
            options: [
              { label: 'Users', value: 'Users' },
              { label: 'Billing', value: 'Billing' },
              { label: 'Audit', value: 'Audit' },
              { label: 'Reports', value: 'Reports' },
              { label: 'Integrations', value: 'Integrations' },
              { label: 'System', value: 'System' },
            ],
          },
          {
            key: 'level',
            label: 'Level',
            options: [
              { label: 'Critical', value: 'Critical' },
              { label: 'High', value: 'High' },
              { label: 'Medium', value: 'Medium' },
              { label: 'Low', value: 'Low' },
            ],
          },
        ]}
        searchPlaceholder="Search permissions..."
      />
    </div>
  );
}
