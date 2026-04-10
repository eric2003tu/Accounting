'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, DollarSign, BadgeCheck, Clock3 } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import SimpleChart from '@/app/components/dashboard/SimpleChart';
import SummaryCard from '@/app/components/dashboard/SummaryCard';

const expensesData = [
  {
    id: 1,
    date: '2024-04-10',
    description: 'Office Supplies',
    category: 'Supplies',
    amount: 245.5,
    status: 'Completed',
    vendor: 'Staples',
  },
  {
    id: 2,
    date: '2024-04-09',
    description: 'Equipment Purchase',
    category: 'Equipment',
    amount: 890.0,
    status: 'Pending',
    vendor: 'TechCorp',
  },
  {
    id: 3,
    date: '2024-04-08',
    description: 'Utilities Bill',
    category: 'Utilities',
    amount: 320.0,
    status: 'Completed',
    vendor: 'Power Co',
  },
  {
    id: 4,
    date: '2024-04-07',
    description: 'Office Rent',
    category: 'Rent',
    amount: 2500.0,
    status: 'Completed',
    vendor: 'Building Management',
  },
  {
    id: 5,
    date: '2024-04-06',
    description: 'Marketing Campaign',
    category: 'Marketing',
    amount: 500.0,
    status: 'Completed',
    vendor: 'Digital Ads Inc',
  },
];

const expensesByCategory = [
  { label: 'Salaries', value: 15000 },
  { label: 'Rent', value: 5000 },
  { label: 'Utilities', value: 2500 },
  { label: 'Marketing', value: 3500 },
  { label: 'Supplies', value: 1200 },
];

const monthlyExpenses = [
  { label: 'Jan', value: 12500 },
  { label: 'Feb', value: 13200 },
  { label: 'Mar', value: 14800 },
  { label: 'Apr', value: 11500 },
  { label: 'May', value: 15300 },
  { label: 'Jun', value: 13800 },
];

export default function ExpensesPage() {
  const totalExpenses = expensesData.reduce((sum, item) => sum + item.amount, 0);
  const completedExpenses = expensesData
    .filter((item) => item.status === 'Completed')
    .reduce((sum, item) => sum + item.amount, 0);
  const pendingExpenses = expensesData
    .filter((item) => item.status === 'Pending')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Expenses</h1>
        <p className="text-slate-600 mt-1">Monitor and manage your business expenses</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toFixed(2)}`}
          description="This period"
          icon={DollarSign}
          trend={{ value: 8, isPositive: false }}
        />
        <StatCard
          title="Completed"
          value={`$${completedExpenses.toFixed(2)}`}
          description="Paid"
          icon={BadgeCheck}
        />
        <StatCard
          title="Pending"
          value={`$${pendingExpenses.toFixed(2)}`}
          description="Due soon"
          icon={Clock3}
        />
      </div>

      {/* Quick Action */}
      <div className="flex justify-start">
        <Link
          href="/dashboard/expenses/add"
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Record Expense
        </Link>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart
          title="Expenses by Category"
          description="Breakdown of spending"
          data={expensesByCategory}
          type="pie"
        />
        <SimpleChart
          title="Monthly Expenses Trend"
          description="Expenses for the past 6 months"
          data={monthlyExpenses}
          type="bar"
        />
      </div>

      {/* Summary and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="lg:col-span-2">
          <DataTable
            title="Expense Records"
            description={`Showing ${expensesData.length} expense transactions`}
            data={expensesData}
            fileName="expense-records"
            columns={[
              {
                key: 'date',
                label: 'Date',
              },
              {
                key: 'description',
                label: 'Description',
              },
              {
                key: 'category',
                label: 'Category',
                render: (value) => (
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-700">
                    {value}
                  </span>
                ),
              },
              {
                key: 'vendor',
                label: 'Vendor',
              },
              {
                key: 'amount',
                label: 'Amount',
                align: 'right',
                render: (value) => <span className="text-red-600 font-bold">-${value.toFixed(2)}</span>,
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
                  { label: 'Supplies', value: 'Supplies' },
                  { label: 'Equipment', value: 'Equipment' },
                  { label: 'Utilities', value: 'Utilities' },
                  { label: 'Rent', value: 'Rent' },
                  { label: 'Marketing', value: 'Marketing' },
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
            searchPlaceholder="Search expenses..."
            pagination={true}
            itemsPerPage={10}
          />
        </div>

        {/* Expenses Summary */}
        {/* <SummaryCard
          title="Expenses Summary"
          items={[
            { label: 'Highest', value: '$2,500.00', color: 'text-red-600' },
            { label: 'Average', value: '$591.70', color: 'text-slate-900' },
            { label: 'Pending', value: `$${pendingExpenses.toFixed(2)}`, color: 'text-amber-600' },
            { label: 'Total', value: `$${totalExpenses.toFixed(2)}`, color: 'text-red-600' },
          ]}
          footer="Updated today"
        /> */}
      </div>
    </div>
  );
}
