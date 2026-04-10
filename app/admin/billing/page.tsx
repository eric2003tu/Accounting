'use client';

import React from 'react';
import { CircleDollarSign, ReceiptText, AlertTriangle } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';

const billingItems = [
  { id: 1, tenant: 'Acme Holdings', plan: 'Enterprise', amount: 3200, cycle: 'Monthly', status: 'Paid', dueDate: '2026-04-01' },
  { id: 2, tenant: 'Nova Retail', plan: 'Growth', amount: 980, cycle: 'Monthly', status: 'Due', dueDate: '2026-04-12' },
  { id: 3, tenant: 'Kivu Logistics', plan: 'Starter', amount: 320, cycle: 'Monthly', status: 'Paid', dueDate: '2026-04-02' },
  { id: 4, tenant: 'Peak Foods', plan: 'Growth', amount: 980, cycle: 'Monthly', status: 'Overdue', dueDate: '2026-04-04' },
  { id: 5, tenant: 'BlueStone Ltd', plan: 'Enterprise', amount: 3200, cycle: 'Monthly', status: 'Paid', dueDate: '2026-04-03' },
];

export default function AdminBillingPage() {
  const mrr = billingItems.reduce((sum, item) => sum + item.amount, 0);
  const overdue = billingItems.filter((item) => item.status === 'Overdue').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Billing</h1>
        <p className="text-slate-600 mt-1">Monitor tenant invoices, plan tiers, and receivables</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Monthly Recurring Revenue" value={`$${mrr.toLocaleString()}`} description="Current cycle" icon={CircleDollarSign} />
        <StatCard title="Issued Invoices" value={billingItems.length} description="For this period" icon={ReceiptText} />
        <StatCard title="Overdue Accounts" value={overdue} description="Follow-up required" icon={AlertTriangle} trend={{ value: 3, isPositive: false }} />
      </div>

      <DataTable
        title="Billing Ledger"
        description="Subscription and invoice status by tenant"
        data={billingItems}
        fileName="admin-billing"
        columns={[
          { key: 'tenant', label: 'Tenant' },
          {
            key: 'plan',
            label: 'Plan',
            render: (value) => <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700">{value}</span>,
          },
          { key: 'cycle', label: 'Cycle' },
          { key: 'dueDate', label: 'Due Date' },
          {
            key: 'amount',
            label: 'Amount',
            align: 'right',
            render: (value) => <span className="font-bold text-slate-900">${value.toLocaleString()}</span>,
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${value === 'Paid' ? 'bg-green-100 text-green-700' : value === 'Due' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                {value}
              </span>
            ),
          },
        ]}
        filters={[
          {
            key: 'plan',
            label: 'Plan',
            options: [
              { label: 'Starter', value: 'Starter' },
              { label: 'Growth', value: 'Growth' },
              { label: 'Enterprise', value: 'Enterprise' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Paid', value: 'Paid' },
              { label: 'Due', value: 'Due' },
              { label: 'Overdue', value: 'Overdue' },
            ],
          },
        ]}
        searchPlaceholder="Search billing records..."
      />
    </div>
  );
}
