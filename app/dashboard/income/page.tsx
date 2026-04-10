'use client';

import React from 'react';
import { Plus, TrendingUp, BadgeCheck, Clock3 } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import SimpleChart from '@/app/components/dashboard/SimpleChart';
import SummaryCard from '@/app/components/dashboard/SummaryCard';
import QuickActionButton from '@/app/components/dashboard/QuickActionButton';

const incomeData = [
  {
    id: 1,
    date: '2024-04-10',
    source: 'Client Invoice #001',
    category: 'Service Income',
    amount: 1500.0,
    status: 'Completed',
    invoiceNo: 'INV-001',
  },
  {
    id: 2,
    date: '2024-04-09',
    source: 'Consulting Project',
    category: 'Consulting',
    amount: 2500.0,
    status: 'Completed',
    invoiceNo: 'INV-002',
  },
  {
    id: 3,
    date: '2024-04-08',
    source: 'Product Sales',
    category: 'Sales',
    amount: 3200.0,
    status: 'Pending',
    invoiceNo: 'INV-003',
  },
  {
    id: 4,
    date: '2024-04-07',
    source: 'Monthly Retainer',
    category: 'Service Income',
    amount: 5000.0,
    status: 'Completed',
    invoiceNo: 'INV-004',
  },
];

const incomeByCategory = [
  { label: 'Consulting', value: 8500 },
  { label: 'Sales', value: 6200 },
  { label: 'Services', value: 5300 },
  { label: 'Other', value: 2150 },
];

const monthlyIncome = [
  { label: 'Jan', value: 10500 },
  { label: 'Feb', value: 12800 },
  { label: 'Mar', value: 11200 },
  { label: 'Apr', value: 15500 },
  { label: 'May', value: 13800 },
  { label: 'Jun', value: 18200 },
];

export default function IncomePage() {
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const completedIncome = incomeData
    .filter((item) => item.status === 'Completed')
    .reduce((sum, item) => sum + item.amount, 0);
  const pendingIncome = incomeData
    .filter((item) => item.status === 'Pending')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Income</h1>
        <p className="text-slate-600 mt-1">Track all your income sources</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toFixed(2)}`}
          description="All sources"
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Completed Income"
          value={`$${completedIncome.toFixed(2)}`}
          description="Received"
          icon={BadgeCheck}
        />
        <StatCard
          title="Pending Income"
          value={`$${pendingIncome.toFixed(2)}`}
          description="Awaiting payment"
          icon={Clock3}
        />
      </div>

      {/* Quick Action */}
      <QuickActionButton
        icon={Plus}
        label="Record Income"
        variant="primary"
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart
          title="Income by Category"
          description="Distribution of income sources"
          data={incomeByCategory}
          type="pie"
        />
        <SimpleChart
          title="Monthly Income Trend"
          description="Income for the past 6 months"
          data={monthlyIncome}
          type="bar"
        />
      </div>

      {/* Summary and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="lg:col-span-2">
          <DataTable
            title="Income Records"
            description={`Showing ${incomeData.length} income transactions`}
            data={incomeData}
            fileName="income-records"
            columns={[
              {
                key: 'date',
                label: 'Date',
              },
              {
                key: 'invoiceNo',
                label: 'Invoice',
                render: (value) => <span className="font-mono text-xs">{value}</span>,
              },
              {
                key: 'source',
                label: 'Source',
              },
              {
                key: 'category',
                label: 'Category',
                render: (value) => (
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
                    {value}
                  </span>
                ),
              },
              {
                key: 'amount',
                label: 'Amount',
                align: 'right',
                render: (value) => <span className="text-green-600 font-bold">+${value.toFixed(2)}</span>,
              },
              {
                key: 'status',
                label: 'Status',
                render: (value) => (
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      value === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {value}
                  </span>
                ),
              },
            ]}
            filters={[
              {
                key: 'category',
                label: 'Category',
                options: [
                  { label: 'Service Income', value: 'Service Income' },
                  { label: 'Consulting', value: 'Consulting' },
                  { label: 'Sales', value: 'Sales' },
                ],
              },
              {
                key: 'status',
                label: 'Status',
                options: [
                  { label: 'Completed', value: 'Completed' },
                  { label: 'Pending', value: 'Pending' },
                ],
              },
            ]}
            searchable={true}
            searchPlaceholder="Search income..."
            pagination={true}
            itemsPerPage={10}
          />
        </div>

        {/* Income Summary */}
        {/* <SummaryCard
          title="Income Summary"
          items={[
            { label: 'Consulting', value: '$8,500.00', color: 'text-slate-900' },
            { label: 'Sales', value: '$6,200.00', color: 'text-slate-900' },
            { label: 'Services', value: '$5,300.00', color: 'text-slate-900' },
            { label: 'Total', value: `$${totalIncome.toFixed(2)}`, color: 'text-green-600' },
          ]}
          footer="Updated today"
        /> */}
      </div>
    </div>
  );
}
