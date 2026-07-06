'use client';

import React from 'react';
import BrandLoadingScreen from '@/app/components/BrandLoadingScreen';
import {
  Users,
  ShieldAlert,
  Activity,
  CircleDollarSign,
  Building2,
} from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import SimpleChart from '@/app/components/dashboard/SimpleChart';
import { businessClient } from '@/app/lib/apiClients';
import type { DashboardStatCard, PortfolioDashboardDto } from '@/app/lib/clients/businessClient';

type AdminActivityRow = {
  id: string;
  type: string;
  direction: 'Income' | 'Expense';
  amount: number;
  date: string;
  description: string;
};

const defaultAdminDashboard: PortfolioDashboardDto = {
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

function toTrendValue(change: DashboardStatCard['change']) {
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

function statIcon(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes('account') || normalized.includes('user')) return Users;
  if (normalized.includes('security') || normalized.includes('alert')) return ShieldAlert;
  if (normalized.includes('uptime') || normalized.includes('health')) return Activity;
  if (normalized.includes('revenue') || normalized.includes('billing')) return CircleDollarSign;
  if (normalized.includes('business')) return Building2;
  return Activity;
}

function formatStatValue(title: string, value: number) {
  const normalized = title.toLowerCase();
  if (normalized.includes('uptime')) return `${value}%`;
  if (normalized.includes('revenue') || normalized.includes('billing')) return `$${value.toLocaleString()}`;
  return value.toLocaleString();
}

export default function AdminOverviewPage() {
  const [dashboard, setDashboard] = React.useState<PortfolioDashboardDto>(defaultAdminDashboard);
  const [loadError, setLoadError] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const response = await businessClient.getAdminDashboard();
        if (!mounted) return;
        setDashboard(response || defaultAdminDashboard);
        setLoadError('');
      } catch (error) {
        console.error('Failed to load admin dashboard', error);
        if (mounted) {
          setDashboard(defaultAdminDashboard);
          setLoadError('Unable to load live admin dashboard data right now.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return <BrandLoadingScreen title="Loading admin console" subtitle="Preparing platform controls and metrics." />;
  }

  const recentActivity: AdminActivityRow[] = dashboard.recent_transactions.map((item, index) => ({
    id: `${item.date}-${item.description}-${index}`,
    type: item.type || 'Platform Transaction',
    direction: item.sign === '-' ? 'Expense' : 'Income',
    amount: item.amount,
    date: item.date,
    description: item.description,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">System Admin Overview</h1>
        <p className="text-slate-600 mt-1">High-level control of users, access, billing, and platform health</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {dashboard.stat_cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={formatStatValue(card.title, card.value)}
            description={card.note}
            icon={statIcon(card.title)}
            trend={toTrendValue(card.change)}
          />
        ))}
      </div>

      {loadError && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {loadError}
        </div>
      )}

      {!loadError && !dashboard.stat_cards.length && !dashboard.revenue_trend.length && !dashboard.cashflow_trend.length && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          No live admin dashboard metrics were returned by the API.
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SimpleChart
          title="Revenue Trend"
          description="Monthly sales and service income"
          data={dashboard.revenue_trend}
          type="bar"
        />
        <SimpleChart
          title="Cash Flow Trend"
          description="Operating cash generated after expenses"
          data={dashboard.cashflow_trend}
          type="line"
        />
        <SimpleChart
          title="Expense Breakdown"
          description="Expense allocation by cost center"
          data={dashboard.expense_breakdown.map((item) => ({ label: item.label, value: item.amount }))}
          type="pie"
        />
      </div>

      <DataTable
        title="Recent Platform Transactions"
        description="Live transactions returned by the admin dashboard endpoint"
        data={recentActivity}
        fileName="admin-transactions"
        columns={[
          { key: 'type', label: 'Type' },
          {
            key: 'direction',
            label: 'Direction',
            render: (value) => (
              <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                value === 'Income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {value}
              </span>
            ),
          },
          {
            key: 'amount',
            label: 'Amount',
            render: (value, row) => `${row.direction === 'Expense' ? '-' : '+'}$${Number(value).toLocaleString()}`,
          },
          { key: 'date', label: 'Date' },
          { key: 'description', label: 'Description' },
        ]}
        filters={[
          {
            key: 'direction',
            label: 'Direction',
            options: [
              { label: 'Income', value: 'Income' },
              { label: 'Expense', value: 'Expense' },
            ],
          },
        ]}
        searchPlaceholder="Search transactions..."
        emptyMessage="No recent platform transactions from the API"
        itemsPerPage={8}
      />
    </div>
  );
}
