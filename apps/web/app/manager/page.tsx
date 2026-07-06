"use client";

import React from 'react';
import Link from 'next/link';
import {
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
import { businessClient } from '@/app/lib/apiClients';
import type { PortfolioDashboardDto } from '@/app/lib/clients/businessClient';
import BrandLoadingScreen from '@/app/components/BrandLoadingScreen';

type UiTransaction = {
  icon: typeof ArrowUpRight;
  category: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
};

const defaultManagerDashboard: PortfolioDashboardDto = {
  stat_cards: [],
  total_income: 0,
  total_income_month: 0,
  total_income_change_pct: 0,
  total_expenses: 0,
  total_expenses_month: 0,
  total_expenses_change_pct: 0,
  account_balance: 0,
  pending_invoices: 0,
  recent_transactions: [],
  gross_income: 0,
  net_profit: 0,
  revenue_trend: [],
  cashflow_trend: [],
  expense_breakdown: [],
};

const fallbackRecentTransactions: UiTransaction[] = [
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

function toNumber(value: unknown) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^0-9.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function mapDashboardTransactions(transactions: PortfolioDashboardDto['recent_transactions']): UiTransaction[] {
  return transactions.map((transaction) => ({
    icon: transaction.sign === '-' ? ArrowDownLeft : ArrowUpRight,
    category: transaction.type || (transaction.sign === '-' ? 'Expense' : 'Income'),
    description: transaction.description || 'Transaction',
    amount: toNumber(transaction.amount),
    date: transaction.date,
    type: transaction.sign === '-' ? 'expense' : 'income',
  }));
}

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
  const [managerBusiness, setManagerBusiness] = React.useState<any | null>(null);
  const [managerDashboard, setManagerDashboard] = React.useState<PortfolioDashboardDto>(defaultManagerDashboard);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const [list, dashboard] = await Promise.all([
          businessClient.getManaged(),
          businessClient.getManagedDashboard(),
        ]);
        if (!mounted) return;
        setManagerBusiness((list || [])[0] ?? null);
        setManagerDashboard(dashboard || defaultManagerDashboard);
      } catch (err) {
        console.error('Failed to load manager business', err);
        if (mounted) {
          setManagerBusiness(null);
          setManagerDashboard(defaultManagerDashboard);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (!managerBusiness) {
    if (loading) {
      return <BrandLoadingScreen title="Loading manager workspace" subtitle="Syncing the assigned business and reports." />;
    }

    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-700">
        Manager business assignment is missing or loading.
      </div>
    );
  }

  const stats = {
    income: toNumber(managerDashboard.total_income || managerBusiness.financials?.monthlyRevenue),
    expenses: toNumber(managerDashboard.total_expenses || managerBusiness.financials?.monthlyExpenses),
    balance: toNumber(managerDashboard.account_balance || managerBusiness.financials?.cashBalance),
    pending: toNumber(managerDashboard.pending_invoices || managerBusiness.financials?.overdueInvoices),
    profit: toNumber(managerDashboard.net_profit || managerBusiness.financials?.netProfit),
    profitMargin: percent(
      toNumber(managerDashboard.net_profit || managerBusiness.financials?.netProfit),
      toNumber(managerDashboard.total_income || managerBusiness.financials?.monthlyRevenue)
    ),
    revenueTrend: managerDashboard.revenue_trend?.length ? managerDashboard.revenue_trend : (managerBusiness.financials?.revenueTrend ?? []),
    cashFlowTrend: managerDashboard.cashflow_trend?.length
      ? managerDashboard.cashflow_trend
      : (managerBusiness.financials?.revenueTrend ?? []).map((item: any) => ({
          label: item.label,
          value: Math.round(item.value * 0.64),
        })),
    expenseBreakdown: managerDashboard.expense_breakdown?.length
      ? managerDashboard.expense_breakdown.map((item) => ({ label: item.label, value: item.amount }))
      : (managerBusiness.financials?.expenseBreakdown ?? []),
  };

  const recentTransactions = managerDashboard.recent_transactions?.length
    ? mapDashboardTransactions(managerDashboard.recent_transactions)
    : fallbackRecentTransactions;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              Manager workspace
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">{managerBusiness.businessName || managerBusiness.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{managerBusiness.legalName || managerBusiness.legal_name}</p>
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
          footer={`Updated today for ${managerBusiness.businessName || managerBusiness.name}`}
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
