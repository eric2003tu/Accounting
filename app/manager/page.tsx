'use client';

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
  Target,
} from 'lucide-react';
import StatCard from '@/app/components/manager/StatCard';
import SimpleChart from '@/app/components/manager/SimpleChart';
import TransactionCard from '@/app/components/manager/TransactionCard';
import SummaryCard from '@/app/components/manager/SummaryCard';
import QuickActionButton from '@/app/components/manager/QuickActionButton';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const managerBusinessId = 1;
const managerBusiness = adminBusinesses.find((business) => business.id === managerBusinessId);

const recentTransactions = [
  {
    icon: ArrowUpRight,
    category: 'Enterprise Retainer',
    description: 'Quarterly support payment - Greenline Retail',
    amount: 18500,
    date: 'Today',
    type: 'income' as const,
  },
  {
    icon: ArrowDownLeft,
    category: 'Cloud Infrastructure',
    description: 'Hosting, monitoring, and backups',
    amount: 1680,
    date: 'Yesterday',
    type: 'expense' as const,
  },
  {
    icon: ArrowUpRight,
    category: 'Implementation Project',
    description: 'Milestone invoice settled',
    amount: 12400,
    date: '2026-04-08',
    type: 'income' as const,
  },
  {
    icon: ArrowDownLeft,
    category: 'Monthly Payroll',
    description: 'Operations and finance staff payout',
    amount: 19800,
    date: '2026-04-06',
    type: 'expense' as const,
  },
];

function money(value: number) {
  return `$${Math.abs(value).toLocaleString()}.00`;
}

function percent(numerator: number, denominator: number) {
  if (!denominator) {
    return '0%';
  }

  return `${Math.round((numerator / denominator) * 100)}%`;
}

export default function ManagerDashboardPage() {
  if (!managerBusiness) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-700">
        Manager business assignment is missing.
      </div>
    );
  }

  const stats = {
    income: managerBusiness.financials.monthlyRevenue,
    expenses: managerBusiness.financials.monthlyExpenses,
    balance: managerBusiness.financials.cashBalance,
    pending: managerBusiness.financials.overdueInvoices,
    profit: managerBusiness.financials.netProfit,
    profitMargin: percent(managerBusiness.financials.netProfit, managerBusiness.financials.monthlyRevenue),
    revenueTrend: managerBusiness.financials.revenueTrend,
    cashFlowTrend: managerBusiness.financials.revenueTrend.map((item) => ({
      label: item.label,
      value: Math.round(item.value * 0.64),
    })),
    expenseBreakdown: managerBusiness.financials.expenseBreakdown,
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              Manager workspace
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">{managerBusiness.businessName}</h2>
            <p className="mt-1 text-sm text-slate-600">{managerBusiness.legalName}</p>
          </div>

          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 lg:max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Assigned focus</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">Single-business financial operations</p>
            <p className="mt-1 text-sm text-slate-600">You are viewing only your assigned business data.</p>
          </div>
        </div>
      </section>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Key Metrics</h2>
          <Link href={`/manager/businesses/${managerBusiness.id}`} className="text-sm font-semibold text-green-700 transition hover:text-green-800">
            Open business profile
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Income"
            value={money(stats.income)}
            description="This month"
            icon={TrendingUp}
            trend={{ value: 10, isPositive: true }}
          />
          <StatCard
            title="Total Expenses"
            value={money(stats.expenses)}
            description="This month"
            icon={DollarSign}
            trend={{ value: 4, isPositive: false }}
          />
          <StatCard
            title="Account Balance"
            value={money(stats.balance)}
            description="Current cash position"
            icon={Wallet}
          />
          <StatCard
            title="Pending Invoices"
            value={stats.pending}
            description="Open items requiring action"
            icon={FileText}
          />
        </div>
      </div>

      {/* <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionButton icon={Plus} label="New Transaction" description="Record a transaction" variant="primary" />
          <QuickActionButton icon={FileText} label="New Report" description="Generate report snapshot" />
          <QuickActionButton icon={TrendingUp} label="Income Entry" description="Log new revenue" />
          <QuickActionButton icon={Target} label="Expense Entry" description="Capture operating costs" />
        </div>
      </div> */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
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

        <SummaryCard
          title="Financial Summary"
          items={[
            { label: 'Gross Income', value: money(stats.income), color: 'text-green-600' },
            { label: 'Total Expenses', value: money(stats.expenses), color: 'text-red-600' },
            { label: 'Net Profit', value: money(stats.profit), color: 'text-green-600' },
            { label: 'Profit Margin', value: stats.profitMargin, color: 'text-slate-900' },
          ]}
          footer={`Updated today for ${managerBusiness.businessName}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SimpleChart
          title="Revenue Trend"
          description="Monthly revenue trend for your assigned business"
          data={stats.revenueTrend}
          type="bar"
        />
        <SimpleChart
          title="Cash Flow Trend"
          description="Operating cash generated after expenses"
          data={stats.cashFlowTrend}
          type="line"
        />
        <SimpleChart
          title="Expense Breakdown"
          description="Expense allocation by cost center"
          data={stats.expenseBreakdown}
          type="pie"
        />
      </div>
    </div>
  );
}
