"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  CircleDollarSign,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import BrandLoadingScreen from '@/app/components/BrandLoadingScreen';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import businessClient from '@/app/lib/clients/businessClient';
import usersClient from '@/app/lib/clients/usersClient';
import DeleteConfirmationModal from '@/app/components/admin/DeleteConfirmationModal';

type UiBusiness = {
  id: number | string;
  businessName: string;
  ownerId: number | string;
  ownerName: string;
  country?: string;
  plan?: string;
  status?: string;
  monthlyRevenue: number;
  monthlyExpenses: number;
  netProfit: number;
  cashBalance: number;
  receivables: number;
  payables: number;
  assets: number;
  liabilities: number;
  equity: number;
  overdueInvoices: number;
};

function money(value: number) {
  const sign = value < 0 ? '-' : '';
  return `${sign}$${Math.abs(value).toLocaleString()}`;
}

function margin(netProfit: number, revenue: number) {
  if (!revenue) {
    return '0.0%';
  }
  return `${((netProfit / revenue) * 100).toFixed(1)}%`;
}

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<UiBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [businessToDelete, setBusinessToDelete] = useState<UiBusiness | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const [apiBusinesses, apiUsers] = await Promise.all([businessClient.getAll(), usersClient.getAll()]);
        const usersMap = new Map(apiUsers.map((u) => [String(u.id), u]));
        const mapped = apiBusinesses.map((b: any) => {
          const owner = usersMap.get(String(b.owner_id)) as any;
          const financials = b.financials || {};
          return {
            id: b.id,
            businessName: b.name || b.businessName || `Business ${b.id}`,
            ownerId: b.owner_id ?? (owner?.id ?? ''),
            ownerName: owner ? `${owner.first_name ?? ''} ${owner.last_name ?? ''}`.trim() || owner.email : 'Unknown Owner',
            country: b.country || b.address || '',
            plan: b.subscription || b.plan || 'Starter',
            status: b.status || 'Active',
            monthlyRevenue: Number(financials.monthlyRevenue || 0),
            monthlyExpenses: Number(financials.monthlyExpenses || 0),
            netProfit: Number(financials.netProfit || 0),
            cashBalance: Number(financials.cashBalance || 0),
            receivables: Number(financials.receivables || 0),
            payables: Number(financials.payables || 0),
            assets: Number(financials.assets || 0),
            liabilities: Number(financials.liabilities || 0),
            equity: Number(financials.equity || 0),
            overdueInvoices: Number(financials.overdueInvoices || 0),
          } as UiBusiness;
        });
        if (!mounted) return;
        setBusinesses(mapped);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error('Failed to load businesses', err);
        if (mounted) setError(err?.message || 'Failed to load businesses');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <BrandLoadingScreen title="Loading businesses" subtitle="Preparing the admin portfolio and ownership data." />;
  }

  const totalRevenue = businesses.reduce((sum, row) => sum + (row.monthlyRevenue || 0), 0);
  const totalProfit = businesses.reduce((sum, row) => sum + (row.netProfit || 0), 0);
  const atRisk = businesses.filter((row) => row.overdueInvoices >= 5 || row.netProfit < 0).length;
  const portfolioMargin = margin(totalProfit, totalRevenue);

  const confirmDelete = () => {
    if (!businessToDelete) {
      return;
    }

    setBusinesses((currentBusinesses) =>
      currentBusinesses.filter((item) => item.id !== businessToDelete.id)
    );
    setBusinessToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Businesses</h1>
        <p className="mt-1 text-slate-600">Portfolio-level visibility for all businesses and their financial position</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Businesses"
          value={businesses.length}
          description="Active, review, and suspended entities"
          icon={Building2}
        />
        <StatCard
          title="Portfolio Revenue"
          value={money(totalRevenue)}
          description="Combined monthly revenue"
          icon={CircleDollarSign}
        />
        <StatCard
          title="Portfolio Margin"
          value={portfolioMargin}
          description={`Net profit ${money(totalProfit)}`}
          icon={TrendingUp}
        />
        <StatCard
          title="At-Risk Businesses"
          value={atRisk}
          description="Negative margin or high overdue invoices"
          icon={AlertTriangle}
          trend={{ value: atRisk > 0 ? atRisk : 1, isPositive: false }}
        />
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : (
        <DataTable
        title="Business Financial Directory"
        description="Complete financial profile across all onboarded businesses"
        data={businesses}
        fileName="admin-businesses"
        columns={[
          {
            key: 'businessName',
            label: 'Business',
            render: (value, row) => (
              <Link href={`/admin/businesses/${row.id}`} className="font-semibold text-slate-900 transition-colors hover:text-green-700">
                {value}
              </Link>
            ),
          },
          {
            key: 'ownerName',
            label: 'Owner',
            render: (value, row) => (
              <Link href={`/admin/users/${row.ownerId}`} className="font-medium text-slate-700 transition-colors hover:text-green-700">
                {value}
              </Link>
            ),
          },
          { key: 'country', label: 'Country' },
          {
            key: 'plan',
            label: 'Plan',
            render: (value) => (
              <span className="inline-block rounded bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                {value}
              </span>
            ),
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${value === 'Active' ? 'bg-green-100 text-green-700' : value === 'Under Review' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                {value}
              </span>
            ),
          },
          {
            key: 'monthlyRevenue',
            label: 'Revenue',
            align: 'right',
            render: (value) => <span className="font-semibold text-slate-900">{money(value)}</span>,
          },
          {
            key: 'monthlyExpenses',
            label: 'Expenses',
            align: 'right',
            render: (value) => <span className="font-semibold text-slate-900">{money(value)}</span>,
          },
          {
            key: 'netProfit',
            label: 'Net Profit',
            align: 'right',
            render: (value) => (
              <span className={`font-semibold ${value >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                {money(value)}
              </span>
            ),
          },
          {
            key: 'id',
            label: 'Margin',
            align: 'right',
            render: (_, row) => (
              <span className={`font-semibold ${row.netProfit >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                {margin(row.netProfit, row.monthlyRevenue)}
              </span>
            ),
          },
          {
            key: 'cashBalance',
            label: 'Cash',
            align: 'right',
            render: (value) => money(value),
          },
          {
            key: 'receivables',
            label: 'Receivables',
            align: 'right',
            render: (value) => money(value),
          },
          {
            key: 'payables',
            label: 'Payables',
            align: 'right',
            render: (value) => money(value),
          },
          {
            key: 'assets',
            label: 'Assets',
            align: 'right',
            render: (value) => <span className="font-medium text-slate-900">{money(value)}</span>,
          },
          {
            key: 'liabilities',
            label: 'Liabilities',
            align: 'right',
            render: (value) => <span className="font-medium text-slate-900">{money(value)}</span>,
          },
          {
            key: 'equity',
            label: 'Equity',
            align: 'right',
            render: (value) => (
              <span className={`font-medium ${value >= 0 ? 'text-slate-900' : 'text-red-700'}`}>
                {money(value)}
              </span>
            ),
          },
          {
            key: 'overdueInvoices',
            label: 'Overdue',
            align: 'right',
            render: (value) => (
              <span className={`font-semibold ${value >= 5 ? 'text-red-700' : 'text-slate-700'}`}>
                {value}
              </span>
            ),
          },
          {
            key: 'id',
            label: 'Actions',
            render: (_, row) => (
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/businesses/${row.id}`}
                  className="inline-flex items-center rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  View
                </Link>
                <button
                  type="button"
                  onClick={() => setBusinessToDelete(row)}
                  className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
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
              { label: 'Professional', value: 'Professional' },
              { label: 'Enterprise', value: 'Enterprise' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Active', value: 'Active' },
              { label: 'Under Review', value: 'Under Review' },
              { label: 'Suspended', value: 'Suspended' },
            ],
          },
          {
            key: 'country',
            label: 'Country',
            options: [
              { label: 'Rwanda', value: 'Rwanda' },
              { label: 'Kenya', value: 'Kenya' },
              { label: 'Uganda', value: 'Uganda' },
              { label: 'Tanzania', value: 'Tanzania' },
            ],
          },
        ]}
        searchPlaceholder="Search businesses, owners, or financial values..."
      />
      )}

      <DeleteConfirmationModal
        isOpen={!!businessToDelete}
        title="Delete business"
        message={
          businessToDelete
            ? `Are you sure you want to delete ${businessToDelete.businessName}? This action cannot be undone.`
            : ''
        }
        confirmLabel="Yes, delete"
        onCancel={() => setBusinessToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
