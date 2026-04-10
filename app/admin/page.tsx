'use client';

import React from 'react';
import {
  Users,
  ShieldAlert,
  Activity,
  CircleDollarSign,
} from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import SimpleChart from '@/app/components/dashboard/SimpleChart';

const activityItems = [
  {
    id: 1,
    actor: 'Aline N.',
    action: 'Created role',
    target: 'Support Manager',
    area: 'RBAC',
    status: 'Success',
    time: '2026-04-10 08:22',
  },
  {
    id: 2,
    actor: 'System',
    action: 'Blocked login',
    target: 'User #8452',
    area: 'Security',
    status: 'Warning',
    time: '2026-04-10 08:11',
  },
  {
    id: 3,
    actor: 'Eric T.',
    action: 'Updated limits',
    target: 'Starter Plan',
    area: 'Billing',
    status: 'Success',
    time: '2026-04-10 07:55',
  },
  {
    id: 4,
    actor: 'Ops Bot',
    action: 'Restarted service',
    target: 'Queue Worker',
    area: 'System',
    status: 'Info',
    time: '2026-04-10 07:40',
  },
  {
    id: 5,
    actor: 'Irene M.',
    action: 'Revoked token',
    target: 'Slack Integration',
    area: 'Integrations',
    status: 'Success',
    time: '2026-04-10 07:10',
  },
];

const monthlyData = [
  { label: 'Jan', value: 12500 },
  { label: 'Feb', value: 15800 },
  { label: 'Mar', value: 14200 },
  { label: 'Apr', value: 18500 },
  { label: 'May', value: 16800 },
  { label: 'Jun', value: 21200 },
];

const cashFlowTrend = [
  { label: 'Jan', value: 8200 },
  { label: 'Feb', value: 9600 },
  { label: 'Mar', value: 9100 },
  { label: 'Apr', value: 11400 },
  { label: 'May', value: 10300 },
  { label: 'Jun', value: 12850 },
];

const expenseCategoryData = [
  { label: 'Salaries', value: 15000 },
  { label: 'Utilities', value: 2500 },
  { label: 'Rent', value: 5000 },
  { label: 'Marketing', value: 3500 },
  { label: 'Other', value: 2000 },
];

export default function AdminOverviewPage() {
  const warningCount = activityItems.filter((item) => item.status === 'Warning').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">System Admin Overview</h1>
        <p className="text-slate-600 mt-1">High-level control of users, access, billing, and platform health</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Managed Accounts"
          value="12,482"
          description="Across all tenants"
          icon={Users}
          trend={{ value: 6, isPositive: true }}
        />
        <StatCard
          title="Security Alerts"
          value={warningCount}
          description="Require review"
          icon={ShieldAlert}
          trend={{ value: 2, isPositive: false }}
        />
        <StatCard
          title="Platform Uptime"
          value="99.98%"
          description="Last 30 days"
          icon={Activity}
        />
        <StatCard
          title="Monthly Admin Revenue"
          value="$84,300"
          description="Subscriptions and addons"
          icon={CircleDollarSign}
          trend={{ value: 9, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SimpleChart
          title="Revenue Trend"
          description="Monthly sales and service income"
          data={monthlyData}
          type="bar"
        />
        <SimpleChart
          title="Cash Flow Trend"
          description="Operating cash generated after expenses"
          data={cashFlowTrend}
          type="line"
        />
        <SimpleChart
          title="Expense Breakdown"
          description="Expense allocation by cost center"
          data={expenseCategoryData}
          type="pie"
        />
      </div>

      <DataTable
        title="Recent Admin Activity"
        description="Latest system-admin operations"
        data={activityItems}
        fileName="admin-activity"
        columns={[
          { key: 'actor', label: 'Actor' },
          { key: 'action', label: 'Action' },
          { key: 'target', label: 'Target' },
          {
            key: 'area',
            label: 'Area',
            render: (value) => (
              <span className="inline-block rounded px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700">
                {value}
              </span>
            ),
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span
                className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                  value === 'Success'
                    ? 'bg-green-100 text-green-700'
                    : value === 'Warning'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                }`}
              >
                {value}
              </span>
            ),
          },
          { key: 'time', label: 'Time' },
        ]}
        filters={[
          {
            key: 'area',
            label: 'Area',
            options: [
              { label: 'RBAC', value: 'RBAC' },
              { label: 'Security', value: 'Security' },
              { label: 'Billing', value: 'Billing' },
              { label: 'System', value: 'System' },
              { label: 'Integrations', value: 'Integrations' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Success', value: 'Success' },
              { label: 'Warning', value: 'Warning' },
              { label: 'Info', value: 'Info' },
            ],
          },
        ]}
        searchPlaceholder="Search activity..."
        itemsPerPage={8}
      />
    </div>
  );
}
