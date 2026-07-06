"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  CircleDollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
} from 'lucide-react';
import BrandLoadingScreen from '@/app/components/BrandLoadingScreen';
import StatCard from '@/app/components/manager/StatCard';
import DataTable from '@/app/components/manager/DataTable';
import DeleteConfirmationModal from '@/app/components/admin/DeleteConfirmationModal';
import businessClient from '@/app/lib/clients/businessClient';
import usersClient from '@/app/lib/clients/usersClient';

const currentOwnerId = null; // resolved from auth later

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
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [businessToDelete, setBusinessToDelete] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const apiBusinesses = await businessClient.getOwned();
        const apiUsers = await usersClient.getAll();
        const usersMap = new Map(apiUsers.map((u) => [String(u.id), u]));
        const mapped = (apiBusinesses || []).map((business: any) => {
          const ownerUser = usersMap.get(String(business.owner_id));
          const ownerName = ownerUser ? `${ownerUser.first_name ?? ''} ${ownerUser.last_name ?? ''}`.trim() : '';
          return {
          id: business.id,
          businessName: business.name || business.businessName || `Business ${business.id}`,
          legalName: business.legal_name || business.legalName || '',
          tradeName: business.trade_name || business.tradeName || '',
          taxId: business.vat_number || business.taxId || '',
          registrationNo: business.registration_no || business.registrationNo || '',
          industry: business.industry || '',
          ownerName,
          country: business.country || business.address || '',
          city: business.city || '',
          timezone: business.timezone || '',
          plan: business.subscription || business.plan || 'Starter',
          billingCycle: business.billing_cycle || business.billingCycle || '',
          nextBillingDate: business.next_billing_date || business.nextBillingDate || '',
          status: business.status || 'Active',
          monthlyRevenue: Number(business.financials?.monthlyRevenue || 0),
          monthlyExpenses: Number(business.financials?.monthlyExpenses || 0),
          netProfit: Number(business.financials?.netProfit || 0),
          cashBalance: Number(business.financials?.cashBalance || 0),
          receivables: Number(business.financials?.receivables || 0),
          payables: Number(business.financials?.payables || 0),
          assets: Number(business.financials?.assets || 0),
          liabilities: Number(business.financials?.liabilities || 0),
          equity: Number(business.financials?.equity || 0),
          overdueInvoices: Number(business.financials?.overdueInvoices || 0),
        };
        });
        if (!mounted) return;
        setBusinesses(mapped);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error('Failed to load owned businesses', err);
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
    return <BrandLoadingScreen title="Loading businesses" subtitle="Preparing your assigned business portfolio." />;
  }

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Businesses</h1>
          <p className="mt-1 text-slate-600">
            Complete financial visibility across all businesses you own.
          </p>
        </div>

        <Link
          href="/manager/businesses/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Add Business
        </Link>
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
        onRowClick={(row) => router.push(`/manager/businesses/${row.id}`)}
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
        onCancelAction={() => setBusinessToDelete(null)}
        onConfirmAction={confirmDelete}
      />
    </div>
  );
}

