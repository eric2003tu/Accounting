'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  CircleDollarSign,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import DeleteConfirmationModal from '@/app/components/admin/DeleteConfirmationModal';
import {
  adminBusinesses,
  getAdminUserById,
} from '@/app/admin/data/adminDirectoryData';

const currentOwnerId = 5;

const initialBusinesses = adminBusinesses
  .filter((business) => business.ownerId === currentOwnerId)
  .map((business) => ({
    id: business.id,
    businessName: business.businessName,
    legalName: business.legalName,
    tradeName: business.tradeName,
    taxId: business.taxId,
    registrationNo: business.registrationNo,
    industry: business.industry,
    ownerName: getAdminUserById(business.ownerId)?.name || 'Unknown Owner',
    country: business.country,
    city: business.city,
    timezone: business.timezone,
    plan: business.subscription,
    billingCycle: business.billingCycle,
    nextBillingDate: business.nextBillingDate,
    status: business.status,
    monthlyRevenue: business.financials.monthlyRevenue,
    monthlyExpenses: business.financials.monthlyExpenses,
    netProfit: business.financials.netProfit,
    cashBalance: business.financials.cashBalance,
    receivables: business.financials.receivables,
    payables: business.financials.payables,
    assets: business.financials.assets,
    liabilities: business.financials.liabilities,
    equity: business.financials.equity,
    overdueInvoices: business.financials.overdueInvoices,
  }));

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

export default function DashboardBusinessesPage() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [businessToDelete, setBusinessToDelete] = useState<(typeof initialBusinesses)[number] | null>(null);

  const totalRevenue = businesses.reduce((sum, row) => sum + row.monthlyRevenue, 0);
  const totalProfit = businesses.reduce((sum, row) => sum + row.netProfit, 0);
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
        <h1 className="text-3xl font-bold text-slate-900">My Businesses</h1>
        <p className="mt-1 text-slate-600">
          Complete financial visibility across all businesses you own.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Businesses"
          value={businesses.length}
          description="Businesses currently in your portfolio"
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
        description="Full profile and financial position for your businesses"
        data={businesses}
        fileName="owner-businesses"
        columns={[
          { key: 'businessName', label: 'Business' },
          { key: 'legalName', label: 'Legal Name' },
          { key: 'tradeName', label: 'Trade Name' },
          { key: 'taxId', label: 'Tax ID' },
          { key: 'registrationNo', label: 'Registration No.' },
          { key: 'industry', label: 'Industry' },
          { key: 'ownerName', label: 'Owner' },
          { key: 'country', label: 'Country' },
          { key: 'city', label: 'City' },
          { key: 'timezone', label: 'Timezone' },
          {
            key: 'plan',
            label: 'Plan',
            render: (value) => (
              <span className="inline-block rounded bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                {value}
              </span>
            ),
          },
          { key: 'billingCycle', label: 'Billing Cycle' },
          {
            key: 'nextBillingDate',
            label: 'Next Billing',
            render: (value) => new Date(value).toLocaleDateString(),
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
        onRowClick={(row) => router.push(`/dashboard/businesses/${row.id}`)}
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
        searchPlaceholder="Search businesses or financial values..."
      />

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
