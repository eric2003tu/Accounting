'use client';

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
} from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import SimpleChart from '@/app/components/dashboard/SimpleChart';
import TransactionCard from '@/app/components/dashboard/TransactionCard';
import SummaryCard from '@/app/components/dashboard/SummaryCard';
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

const defaultPortfolioDashboard: PortfolioDashboardDto = {
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

function money(value: number) {
  const sign = value < 0 ? '-' : '';
  return `${sign}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function mapPortfolioTransactions(transactions: PortfolioDashboardDto['recent_transactions']): UiTransaction[] {
  return transactions.map((transaction) => ({
    icon: transaction.sign === '-' ? ArrowDownLeft : ArrowUpRight,
    category: transaction.type || (transaction.sign === '-' ? 'Expense' : 'Income'),
    description: transaction.description || 'Portfolio transaction',
    amount: transaction.amount,
    date: transaction.date,
    type: transaction.sign === '-' ? 'expense' : 'income',
  }));
}

function percent(numerator: number, denominator: number) {
  if (!denominator) {
    return '0%';
  }

  return `${Math.round((numerator / denominator) * 100)}%`;
}

function dashboardStatIcon(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes('income') || normalized.includes('revenue')) return TrendingUp;
  if (normalized.includes('expense') || normalized.includes('cost')) return DollarSign;
  if (normalized.includes('balance') || normalized.includes('cash')) return Wallet;
  if (normalized.includes('invoice') || normalized.includes('payment')) return FileText;
  return Building2;
}

function formatStatValue(title: string, value: number) {
  const normalized = title.toLowerCase();
  if (normalized.includes('balance') || normalized.includes('income') || normalized.includes('expense')) {
    return money(value);
  }

  return value.toLocaleString();
}

function toTrendValue(change: unknown) {
  if (typeof change === 'number') {
    return { value: Math.abs(change), isPositive: change >= 0 };
  }

  if (typeof change === 'string') {
    const numeric = Number(change.replace(/[^0-9.-]/g, ''));
    if (Number.isFinite(numeric) && numeric !== 0) {
      return { value: Math.abs(numeric), isPositive: numeric >= 0 };
    }
  }

  return undefined;
}

function toNumber(value: unknown) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^0-9.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function defaultSeries(labels: string[]) {
  return labels.map((label) => ({ label, value: 0 }));
}

function buildCashFlowSeries(revenueSeries: Array<{ label: string; value: number }>, expenses: number) {
  if (!revenueSeries.length) return defaultSeries(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']);

  const monthlyExpenseShare = revenueSeries.length ? expenses / revenueSeries.length : 0;
  return revenueSeries.map((point) => ({
    label: point.label,
    value: Math.max(0, Math.round(point.value - monthlyExpenseShare)),
  }));
}

export default function DashboardPage() {
  const [ownedDashboardState, setOwnedDashboardState] = React.useState<PortfolioDashboardDto>(defaultPortfolioDashboard);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const dashboard = await businessClient.getOwnedDashboard();
        if (!mounted) return;
        setOwnedDashboardState(dashboard || defaultPortfolioDashboard);
      } catch (err) {
        console.error('Failed to load owner dashboard', err);
        if (mounted) {
          setOwnedDashboardState(defaultPortfolioDashboard);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const statCards: PortfolioDashboardDto['stat_cards'] = ownedDashboardState.stat_cards.length
    ? ownedDashboardState.stat_cards
    : [
        {
          title: 'Total Income',
          value: ownedDashboardState.total_income,
          change: ownedDashboardState.total_income_change_pct,
          note: 'All owned businesses',
        },
        {
          title: 'Total Expenses',
          value: ownedDashboardState.total_expenses,
          change: ownedDashboardState.total_expenses_change_pct,
          note: 'All owned businesses',
        },
        {
          title: 'Account Balance',
          value: ownedDashboardState.account_balance,
          note: 'Combined cash balance',
        },
        {
          title: 'Pending Invoices',
          value: ownedDashboardState.pending_invoices,
          note: 'Open or overdue invoices',
        },
      ];

  const revenueTrend = ownedDashboardState.revenue_trend?.length
    ? ownedDashboardState.revenue_trend
    : defaultSeries(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']);

  const cashFlowTrend = ownedDashboardState.cashflow_trend?.length
    ? ownedDashboardState.cashflow_trend
    : buildCashFlowSeries(revenueTrend, ownedDashboardState.total_expenses);

  const expenseBreakdown = ownedDashboardState.expense_breakdown?.length
    ? ownedDashboardState.expense_breakdown.map((item: PortfolioDashboardDto['expense_breakdown'][number]) => ({ label: item.label, value: item.amount }))
    : [
        { label: 'Salaries', value: 0 },
        { label: 'Utilities', value: 0 },
        { label: 'Rent', value: 0 },
        { label: 'Marketing', value: 0 },
        { label: 'Other', value: 0 },
      ];

  const recentTransactions: UiTransaction[] = ownedDashboardState.recent_transactions?.length
    ? mapPortfolioTransactions(ownedDashboardState.recent_transactions)
    : [];

  if (loading) {
    return <BrandLoadingScreen title="Loading dashboard" subtitle="Preparing your business workspace and synchronizing records." />;
  }

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
            <p className="mt-1 text-sm text-slate-600">Portfolio-wide snapshot across all of your owned businesses.</p>
          </div>

          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 lg:max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Live portfolio feed</p>
            <p className="mt-2 text-sm text-slate-700">
              Metrics, cash flow, and recent transactions are pulled from the owner dashboard endpoint.
            </p>
            <Link
              href="/dashboard/businesses"
              className="mt-3 inline-flex text-sm font-semibold text-green-700 transition hover:text-green-800"
            >
              View owned businesses
            </Link>
          </div>
        </div>
      </section>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Key Metrics</h2>
          <span className="text-sm text-slate-500">Updated from /business/owned/dashboard</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card: PortfolioDashboardDto['stat_cards'][number]) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={formatStatValue(card.title, toNumber(card.value))}
              description={card.note}
              icon={dashboardStatIcon(card.title)}
              trend={toTrendValue(card.change)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Recent Transactions</h2>
          {recentTransactions.length ? (
            recentTransactions.map((transaction: UiTransaction, idx: number) => (
              <TransactionCard
                key={`${transaction.date}-${transaction.description}-${idx}`}
                icon={transaction.icon}
                category={transaction.category}
                description={transaction.description}
                amount={transaction.amount}
                date={transaction.date}
                type={transaction.type}
              />
            ))
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              No recent portfolio transactions were returned by the API.
            </div>
          )}
        </div>

        <SummaryCard
          title="Financial Summary"
          items={[
            {
              label: 'Gross Income',
              value: money(toNumber(ownedDashboardState.gross_income || ownedDashboardState.total_income)),
              color: 'text-green-600',
            },
            {
              label: 'Net Profit',
              value: money(toNumber(ownedDashboardState.net_profit)),
              color: 'text-red-600',
            },
            {
              label: 'Account Balance',
              value: money(toNumber(ownedDashboardState.account_balance)),
              color: 'text-slate-900',
            },
            { label: 'Profit Margin', value: percent(toNumber(ownedDashboardState.net_profit), toNumber(ownedDashboardState.total_income)), color: 'text-green-600' },
          ]}
          footer="Updated live from the owner's portfolio dashboard"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SimpleChart
          title="Revenue Trend"
          description="Portfolio revenue trend"
          data={revenueTrend}
          type="bar"
        />
        <SimpleChart
          title="Cash Flow Trend"
          description="Portfolio operating cash generated after expenses"
          data={cashFlowTrend}
          type="line"
        />
        <SimpleChart
          title="Expense Breakdown"
          description="Portfolio expense allocation by cost center"
          data={expenseBreakdown}
          type="pie"
        />
      </div>
    </div>
  );
}
