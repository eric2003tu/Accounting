'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  CircleDollarSign,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';

type BusinessRecord = {
  id: number;
  businessName: string;
  ownerId: number;
  ownerName: string;
  country: string;
  plan: 'Starter' | 'Growth' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Under Review' | 'Suspended';
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

const businesses: BusinessRecord[] = [
  {
    id: 1,
    businessName: 'Acme Holdings Ltd',
    ownerId: 5,
    ownerName: 'Eric Tuyishime',
    country: 'Rwanda',
    plan: 'Professional',
    status: 'Active',
    monthlyRevenue: 168400,
    monthlyExpenses: 113700,
    netProfit: 54700,
    cashBalance: 204300,
    receivables: 58800,
    payables: 31600,
    assets: 641500,
    liabilities: 212000,
    equity: 429500,
    overdueInvoices: 4,
  },
  {
    id: 2,
    businessName: 'Nexa Retail Group Ltd',
    ownerId: 1,
    ownerName: 'Aline Niyonsaba',
    country: 'Rwanda',
    plan: 'Growth',
    status: 'Active',
    monthlyRevenue: 93200,
    monthlyExpenses: 71800,
    netProfit: 21400,
    cashBalance: 121600,
    receivables: 26500,
    payables: 14200,
    assets: 386200,
    liabilities: 154400,
    equity: 231800,
    overdueInvoices: 2,
  },
  {
    id: 3,
    businessName: 'Kivu Logistics Co',
    ownerId: 5,
    ownerName: 'Eric Tuyishime',
    country: 'Rwanda',
    plan: 'Enterprise',
    status: 'Under Review',
    monthlyRevenue: 126500,
    monthlyExpenses: 108900,
    netProfit: 17600,
    cashBalance: 84700,
    receivables: 46800,
    payables: 39500,
    assets: 493400,
    liabilities: 272900,
    equity: 220500,
    overdueInvoices: 6,
  },
  {
    id: 4,
    businessName: 'BlueStone Manufacturing',
    ownerId: 2,
    ownerName: 'Samuel Uwizeye',
    country: 'Kenya',
    plan: 'Enterprise',
    status: 'Active',
    monthlyRevenue: 209800,
    monthlyExpenses: 164200,
    netProfit: 45600,
    cashBalance: 174900,
    receivables: 73400,
    payables: 58900,
    assets: 890500,
    liabilities: 401700,
    equity: 488800,
    overdueInvoices: 3,
  },
  {
    id: 5,
    businessName: 'Peak Foods Distributors',
    ownerId: 3,
    ownerName: 'Diane Mutesi',
    country: 'Uganda',
    plan: 'Starter',
    status: 'Suspended',
    monthlyRevenue: 41200,
    monthlyExpenses: 49800,
    netProfit: -8600,
    cashBalance: 21400,
    receivables: 15200,
    payables: 29100,
    assets: 139500,
    liabilities: 162200,
    equity: -22700,
    overdueInvoices: 9,
  },
  {
    id: 6,
    businessName: 'Nova Health Services',
    ownerId: 4,
    ownerName: 'Jean Claude',
    country: 'Tanzania',
    plan: 'Growth',
    status: 'Active',
    monthlyRevenue: 102300,
    monthlyExpenses: 75200,
    netProfit: 27100,
    cashBalance: 96400,
    receivables: 28900,
    payables: 19700,
    assets: 341100,
    liabilities: 138600,
    equity: 202500,
    overdueInvoices: 1,
  },
];

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
  const totalRevenue = businesses.reduce((sum, row) => sum + row.monthlyRevenue, 0);
  const totalProfit = businesses.reduce((sum, row) => sum + row.netProfit, 0);
  const atRisk = businesses.filter((row) => row.overdueInvoices >= 5 || row.netProfit < 0).length;
  const portfolioMargin = margin(totalProfit, totalRevenue);

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

      <DataTable
        title="Business Financial Directory"
        description="Complete financial profile across all onboarded businesses"
        data={businesses}
        fileName="admin-businesses"
        columns={[
          {
            key: 'businessName',
            label: 'Business',
            render: (value) => <span className="font-semibold text-slate-900">{value}</span>,
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
    </div>
  );
}
