'use client';

import React, { useState } from 'react';
import {
  Plus,
  TrendingUp,
  DollarSign,
  Wallet,
  FileText,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import SimpleChart from '@/app/components/dashboard/SimpleChart';
import TransactionCard from '@/app/components/dashboard/TransactionCard';
import SummaryCard from '@/app/components/dashboard/SummaryCard';
import QuickActionButton from '@/app/components/dashboard/QuickActionButton';

const recentTransactions: Array<{
  icon: typeof ArrowUpRight;
  category: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}> = [
  {
    icon: ArrowUpRight,
    category: 'Client Invoice',
    description: 'Payment for Project #12',
    amount: 1200,
    date: 'Today',
    type: 'income',
  },
  {
    icon: ArrowDownLeft,
    category: 'Office Supplies',
    description: 'Stationery & Equipment',
    amount: 155.75,
    date: 'Yesterday',
    type: 'expense',
  },
  {
    icon: ArrowDownLeft,
    category: 'Utilities',
    description: 'Monthly electricity bill',
    amount: 320,
    date: '2024-04-08',
    type: 'expense',
  },
  {
    icon: ArrowUpRight,
    category: 'Consulting Income',
    description: 'Monthly retainer',
    amount: 3000,
    date: '2024-04-05',
    type: 'income',
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

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Income"
            value="$28,450.00"
            description="This month"
            icon={TrendingUp}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Expenses"
            value="$8,240.00"
            description="This month"
            icon={DollarSign}
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Account Balance"
            value="$47,890.50"
            description="Current balance"
            icon={Wallet}
          />
          <StatCard
            title="Pending Invoices"
            value="42"
            description="Amount: $12,500"
            icon={FileText}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionButton
            icon={Plus}
            label="New Transaction"
            description="Record a new transaction"
            variant="primary"
          />
          <QuickActionButton
            icon={FileText}
            label="Create Invoice"
            description="Generate a new invoice"
          />
          <QuickActionButton
            icon={TrendingUp}
            label="View Reports"
            description="Financial reports"
          />
          <QuickActionButton
            icon={Wallet}
            label="View Ledger"
            description="Account ledger"
          />
        </div>
      </div>

      {/* Recent Transactions & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Recent Transactions</h2>
          {recentTransactions.map((transaction, idx) => (
            <TransactionCard
              key={idx}
              icon={transaction.icon}
              category={transaction.category}
              description={transaction.description}
              amount={transaction.amount}
              date={transaction.date}
              type={transaction.type}
            />
          ))}
        </div>

        {/* Financial Summary */}
        <SummaryCard
          title="Financial Summary"
          items={[
            {
              label: 'Gross Income',
              value: '$28,450.00',
              color: 'text-green-600',
            },
            {
              label: 'Total Expenses',
              value: '$8,240.00',
              color: 'text-red-600',
            },
            {
              label: 'Net Profit',
              value: '$20,210.00',
              color: 'text-green-600',
            },
            {
              label: 'Profit Margin',
              value: '71%',
              color: 'text-slate-900',
            },
          ]}
          footer="Updated today at 2:30 PM"
        />
      </div>

      {/* Financial Analytics */}
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
    </div>
  );
}
