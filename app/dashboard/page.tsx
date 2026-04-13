'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  TrendingUp,
  DollarSign,
  Wallet,
  FileText,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
} from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import SimpleChart from '@/app/components/dashboard/SimpleChart';
import TransactionCard from '@/app/components/dashboard/TransactionCard';
import SummaryCard from '@/app/components/dashboard/SummaryCard';
import QuickActionButton from '@/app/components/dashboard/QuickActionButton';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const currentOwnerId = 5;

const ownerBusinesses = adminBusinesses.filter((business) => business.ownerId === currentOwnerId);

type BusinessOption = {
  id: string;
  name: string;
  legalName: string;
};

const businessOptions: BusinessOption[] = [
  { id: 'all', name: 'All Businesses', legalName: 'Portfolio Overview' },
  ...ownerBusinesses.map((business) => ({
    id: String(business.id),
    name: business.businessName,
    legalName: business.legalName,
  })),
];

const recentTransactionsByBusiness: Record<string, Array<{
  icon: typeof ArrowUpRight;
  category: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}>> = {
  all: [
    {
      icon: ArrowUpRight,
      category: 'Portfolio Revenue',
      description: 'Combined payment across all businesses',
      amount: 31200,
      date: 'Today',
      type: 'income',
    },
    {
      icon: ArrowDownLeft,
      category: 'Portfolio Expenses',
      description: 'Shared operating and payroll costs',
      amount: 12450,
      date: 'Yesterday',
      type: 'expense',
    },
    {
      icon: ArrowUpRight,
      category: 'Loan Received',
      description: 'Portfolio working capital funding',
      amount: 57000,
      date: '2026-04-08',
      type: 'income',
    },
    {
      icon: ArrowDownLeft,
      category: 'Investments',
      description: 'Capital allocated to operations',
      amount: 8200,
      date: '2026-04-05',
      type: 'expense',
    },
  ],
  '1': [
    {
      icon: ArrowUpRight,
      category: 'Acme Retainer',
      description: 'Quarterly support payment',
      amount: 18500,
      date: 'Today',
      type: 'income',
    },
    {
      icon: ArrowDownLeft,
      category: 'Cloud Infrastructure',
      description: 'Hosting and backup services',
      amount: 1680,
      date: 'Yesterday',
      type: 'expense',
    },
    {
      icon: ArrowUpRight,
      category: 'Implementation Project',
      description: 'Milestone invoice payment',
      amount: 12400,
      date: '2026-04-08',
      type: 'income',
    },
    {
      icon: ArrowDownLeft,
      category: 'Payroll Run',
      description: 'Monthly staff payroll',
      amount: 19800,
      date: '2026-04-06',
      type: 'expense',
    },
  ],
  '3': [
    {
      icon: ArrowUpRight,
      category: 'Fleet Contract',
      description: 'Logistics services payment',
      amount: 15600,
      date: 'Today',
      type: 'income',
    },
    {
      icon: ArrowDownLeft,
      category: 'Fuel Purchase',
      description: 'Route operations fuel',
      amount: 3620,
      date: 'Yesterday',
      type: 'expense',
    },
    {
      icon: ArrowUpRight,
      category: 'Expansion Loan',
      description: 'Fleet growth financing',
      amount: 32000,
      date: '2026-04-08',
      type: 'income',
    },
    {
      icon: ArrowDownLeft,
      category: 'Warehouse Lease',
      description: 'Storage facility payment',
      amount: 4100,
      date: '2026-04-07',
      type: 'expense',
    },
  ],
};

function money(value: number) {
  const sign = value < 0 ? '-' : '';
  return `${sign}$${Math.abs(value).toLocaleString()}.00`;
}

function percent(numerator: number, denominator: number) {
  if (!denominator) {
    return '0%';
  }

  return `${Math.round((numerator / denominator) * 100)}%`;
}

export default function DashboardPage() {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('all');

  const selectedBusiness =
    businessOptions.find((business) => business.id === selectedBusinessId) ?? businessOptions[0];

  const selectedBusinessRecord = selectedBusinessId === 'all'
    ? null
    : ownerBusinesses.find((business) => String(business.id) === selectedBusinessId) ?? null;

  const portfolioStats = ownerBusinesses.reduce(
    (totals, business) => {
      totals.income += business.financials.monthlyRevenue;
      totals.expenses += business.financials.monthlyExpenses;
      totals.balance += business.financials.cashBalance;
      totals.pending += business.financials.overdueInvoices;
      return totals;
    },
    { income: 0, expenses: 0, balance: 0, pending: 0 }
  );

  const businessStats = selectedBusinessRecord
    ? {
        income: selectedBusinessRecord.financials.monthlyRevenue,
        expenses: selectedBusinessRecord.financials.monthlyExpenses,
        balance: selectedBusinessRecord.financials.cashBalance,
        pending: selectedBusinessRecord.financials.overdueInvoices,
        profit: selectedBusinessRecord.financials.netProfit,
        profitMargin: percent(selectedBusinessRecord.financials.netProfit, selectedBusinessRecord.financials.monthlyRevenue),
        revenueTrend: selectedBusinessRecord.financials.revenueTrend,
        cashFlowTrend: selectedBusinessRecord.financials.revenueTrend.map((item) => ({ label: item.label, value: Math.round(item.value * 0.62) })),
        expenseBreakdown: selectedBusinessRecord.financials.expenseBreakdown,
      }
    : {
        income: portfolioStats.income,
        expenses: portfolioStats.expenses,
        balance: portfolioStats.balance,
        pending: portfolioStats.pending,
        profit: portfolioStats.income - portfolioStats.expenses,
        profitMargin: percent(portfolioStats.income - portfolioStats.expenses, portfolioStats.income),
        revenueTrend: [
          { label: 'Jan', value: 24800 },
          { label: 'Feb', value: 27600 },
          { label: 'Mar', value: 26400 },
          { label: 'Apr', value: 31000 },
          { label: 'May', value: 28900 },
          { label: 'Jun', value: 34700 },
        ],
        cashFlowTrend: [
          { label: 'Jan', value: 16700 },
          { label: 'Feb', value: 18200 },
          { label: 'Mar', value: 17400 },
          { label: 'Apr', value: 21100 },
          { label: 'May', value: 19400 },
          { label: 'Jun', value: 23800 },
        ],
        expenseBreakdown: [
          { label: 'Salaries', value: 35000 },
          { label: 'Utilities', value: 5200 },
          { label: 'Rent', value: 7300 },
          { label: 'Marketing', value: 6300 },
          { label: 'Other', value: 4200 },
        ],
      };

  const recentTransactions = recentTransactionsByBusiness[selectedBusinessId] ?? recentTransactionsByBusiness.all;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              Owner dashboard
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">Overview</h2>
            <p className="mt-1 text-sm text-slate-600">
              {selectedBusinessId === 'all'
                ? 'Portfolio-wide snapshot across all of your businesses.'
                : `Working view for ${selectedBusiness.name}.`}
            </p>
          </div>

          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 lg:max-w-md">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500" htmlFor="dashboard-business-select">
              Active business
            </label>
            <select
              id="dashboard-business-select"
              value={selectedBusinessId}
              onChange={(event) => setSelectedBusinessId(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            >
              {businessOptions.map((business) => (
                <option key={business.id} value={business.id}>
                  {business.name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-slate-600">{selectedBusiness.legalName}</p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Key Metrics</h2>
          {selectedBusinessRecord && (
            <Link
              href={`/dashboard/businesses/${selectedBusinessRecord.id}`}
              className="text-sm font-semibold text-green-700 transition hover:text-green-800"
            >
              Open business profile
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Income"
            value={money(businessStats.income)}
            description={selectedBusinessId === 'all' ? 'This month across portfolio' : 'This month for selected business'}
            icon={TrendingUp}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Expenses"
            value={money(businessStats.expenses)}
            description={selectedBusinessId === 'all' ? 'This month across portfolio' : 'This month for selected business'}
            icon={DollarSign}
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Account Balance"
            value={money(businessStats.balance)}
            description={selectedBusinessId === 'all' ? 'Combined cash balance' : 'Current cash balance'}
            icon={Wallet}
          />
          <StatCard
            title="Pending Invoices"
            value={businessStats.pending}
            description="Open items requiring action"
            icon={FileText}
          />
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div>
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
      </div> */}

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
              value: money(businessStats.income),
              color: 'text-green-600',
            },
            {
              label: 'Total Expenses',
              value: money(businessStats.expenses),
              color: 'text-red-600',
            },
            {
              label: 'Net Profit',
              value: money(businessStats.profit),
              color: 'text-green-600',
            },
            {
              label: 'Profit Margin',
              value: businessStats.profitMargin,
              color: 'text-slate-900',
            },
          ]}
          footer={`Updated today for ${selectedBusiness.name}`}
        />
      </div>

      {/* Financial Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SimpleChart
          title="Revenue Trend"
          description={selectedBusinessId === 'all' ? 'Portfolio revenue trend' : 'Selected business revenue trend'}
          data={businessStats.revenueTrend}
          type="bar"
        />
        <SimpleChart
          title="Cash Flow Trend"
          description={selectedBusinessId === 'all' ? 'Portfolio operating cash generated after expenses' : 'Selected business operating cash generated after expenses'}
          data={businessStats.cashFlowTrend}
          type="line"
        />
        <SimpleChart
          title="Expense Breakdown"
          description={selectedBusinessId === 'all' ? 'Portfolio expense allocation by cost center' : 'Selected business expense allocation by cost center'}
          data={businessStats.expenseBreakdown}
          type="pie"
        />
      </div>
    </div>
  );
}
