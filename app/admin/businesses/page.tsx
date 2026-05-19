"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  CircleDollarSign,
  TrendingUp,
  AlertTriangle,
  CalendarClock,
  Users,
} from 'lucide-react';
import BrandLoadingScreen from '@/app/components/BrandLoadingScreen';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import businessClient from '@/app/lib/clients/businessClient';
import DeleteConfirmationModal from '@/app/components/admin/DeleteConfirmationModal';

type BackendBusinessUser = {
  id?: string | number;
  business_id?: string | number;
  user_id?: string | number;
  role?: string;
  user?: {
    id?: string | number;
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    system_role?: string | null;
  } | null;
};

type BackendReport = {
  type?: string | null;
  data?: unknown;
};

type AdminBusinessRow = {
  id: number | string;
  businessName: string;
  legalName: string;
  tradeName: string;
  taxId: string;
  registrationNo: string;
  location: string;
  ownerName: string;
  ownerId: number | string;
  createdAt: string;
  status: string;
  userCount: number;
  accountCount: number;
  categoryCount: number;
  contactCount: number;
  productCount: number;
  purchaseCount: number;
  saleCount: number;
  reportCount: number;
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
  business_users?: BackendBusinessUser[];
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

function toNumber(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^0-9.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function toText(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return fallback;
}

function parseReportData(report: BackendReport | undefined): Record<string, any> | null {
  if (!report?.data) return null;
  if (typeof report.data === 'object') return report.data as Record<string, any>;
  if (typeof report.data !== 'string') return null;

  try {
    return JSON.parse(report.data);
  } catch {
    return null;
  }
}

function findReport(reports: BackendReport[], type: string) {
  return reports.find((report) => String(report?.type || '').toUpperCase() === type);
}

function pickSectionAmount(section: any[] | undefined, labelMatcher: RegExp): number {
  if (!Array.isArray(section)) return 0;
  const entry = section.find((item) => labelMatcher.test(String(item?.label || item?.name || '')));
  return toNumber(entry?.amount ?? entry?.value);
}

function deriveFinancials(raw: Record<string, any>) {
  const reports = Array.isArray(raw?.reports) ? (raw.reports as BackendReport[]) : [];
  const incomeData = parseReportData(findReport(reports, 'INCOME_STATEMENT'));
  const balanceData = parseReportData(findReport(reports, 'BALANCE_SHEET'));

  const revenue = toNumber(incomeData?.totals?.revenue ?? raw?.monthly_revenue ?? raw?.monthlyRevenue);
  const costOfSales = toNumber(incomeData?.totals?.costOfSales);
  const operatingExpenses = toNumber(incomeData?.totals?.operatingExpenses);
  const netProfit = toNumber(incomeData?.totals?.netProfit ?? raw?.net_profit ?? raw?.netProfit);
  const currentAssets = Array.isArray(balanceData?.currentAssets) ? balanceData.currentAssets : [];
  const currentLiabilities = Array.isArray(balanceData?.currentLiabilities) ? balanceData.currentLiabilities : [];

  return {
    monthlyRevenue: revenue,
    monthlyExpenses: costOfSales + operatingExpenses || toNumber(raw?.monthly_expenses ?? raw?.monthlyExpenses),
    netProfit,
    cashBalance: pickSectionAmount(currentAssets, /cash/i) || toNumber(raw?.cash_balance ?? raw?.cashBalance),
    receivables: pickSectionAmount(currentAssets, /receivable/i) || toNumber(raw?.receivables_balance ?? raw?.receivablesBalance),
    payables: pickSectionAmount(currentLiabilities, /payable/i) || toNumber(raw?.payables_balance ?? raw?.payablesBalance),
    assets: toNumber(balanceData?.totals?.totalAssets ?? raw?.assets),
    liabilities: toNumber(balanceData?.totals?.totalLiabilities ?? raw?.liabilities),
    equity: toNumber(balanceData?.totals?.totalEquity ?? raw?.equity),
    overdueInvoices: toNumber(raw?.overdue_invoices ?? raw?.overdueInvoices),
  };
}

function normalizeAdminBusiness(raw: Record<string, any>): AdminBusinessRow {
  const businessUsers = Array.isArray(raw?.business_users) ? (raw.business_users as BackendBusinessUser[]) : [];
  const ownerLink = businessUsers.find((item) => String(item?.role || '').toUpperCase() === 'OWNER') || businessUsers[0];
  const owner = ownerLink?.user;
  const ownerName = owner
    ? `${toText(owner.first_name).trim()} ${toText(owner.last_name).trim()}`.trim() || toText(owner.email, 'Unknown Owner')
    : 'Unknown Owner';
  const derived = deriveFinancials(raw);
  const createdAt = toText(raw?.created_at ?? raw?.createdAt);
  const locationParts = [toText(raw?.country), toText(raw?.city)].filter(Boolean);

  return {
    id: raw?.id,
    businessName: toText(raw?.name ?? raw?.businessName ?? raw?.business_name, `Business ${raw?.id}`),
    legalName: toText(raw?.legal_name ?? raw?.legalName),
    tradeName: toText(raw?.trade_name ?? raw?.tradeName),
    taxId: toText(raw?.tax_id ?? raw?.taxId),
    registrationNo: toText(raw?.registration_no ?? raw?.registrationNo),
    location: locationParts.join(', '),
    ownerName,
    ownerId: owner?.id ?? ownerLink?.user_id ?? '',
    createdAt,
    status: toText(raw?.status, 'Unknown'),
    userCount: businessUsers.length,
    accountCount: Array.isArray(raw?.accounts) ? raw.accounts.length : 0,
    categoryCount: Array.isArray(raw?.categories) ? raw.categories.length : 0,
    contactCount: Array.isArray(raw?.contacts) ? raw.contacts.length : 0,
    productCount: Array.isArray(raw?.products) ? raw.products.length : 0,
    purchaseCount: Array.isArray(raw?.purchases) ? raw.purchases.length : 0,
    saleCount: Array.isArray(raw?.sales) ? raw.sales.length : 0,
    reportCount: Array.isArray(raw?.reports) ? raw.reports.length : 0,
    business_users: businessUsers,
    ...derived,
  };
}

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<AdminBusinessRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [businessToDelete, setBusinessToDelete] = useState<AdminBusinessRow | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const apiBusinesses = await businessClient.getAll();
        const mapped = apiBusinesses.map((business: any) => normalizeAdminBusiness(business));
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

  const confirmDelete = async () => {
    if (!businessToDelete) {
      return;
    }

    try {
      await businessClient.delete(String(businessToDelete.id));
      setBusinesses((currentBusinesses) =>
        currentBusinesses.filter((item) => item.id !== businessToDelete.id)
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to delete business', err);
    } finally {
      setBusinessToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Businesses</h1>
        <p className="mt-1 text-slate-600">Portfolio-level visibility for every business and the nested data returned by the backend.</p>
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
          title="Business Directory"
          description="Complete business records, related entities, and finance snapshots from the backend response"
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
            { key: 'legalName', label: 'Legal Name' },
            { key: 'tradeName', label: 'Trade Name' },
            { key: 'taxId', label: 'Tax ID' },
            { key: 'registrationNo', label: 'Registration No.' },
            { key: 'location', label: 'Location' },
            {
              key: 'ownerName',
              label: 'Ownership',
              render: (value, row) => (
                <div className="space-y-1">
                  <Link href={`/admin/users/${row.ownerId}`} className="block font-medium text-slate-700 transition-colors hover:text-green-700">
                    {value}
                  </Link>
                  <div className="text-xs text-slate-500">{row.userCount} linked user{row.userCount === 1 ? '' : 's'}</div>
                </div>
              ),
            },
            {
              key: 'createdAt',
              label: 'Created',
              render: (value) => (value ? <span className="inline-flex items-center gap-1 text-slate-600"><CalendarClock className="h-4 w-4" />{new Date(value).toLocaleDateString()}</span> : 'N/A'),
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => (
                <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${value === 'Active' ? 'bg-green-100 text-green-700' : value === 'Under Review' ? 'bg-amber-100 text-amber-700' : value === 'Suspended' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
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
              key: 'cashBalance',
              label: 'Cash',
              align: 'right',
              render: (value) => money(value),
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
              render: (value) => <span className={`font-medium ${value >= 0 ? 'text-slate-900' : 'text-red-700'}`}>{money(value)}</span>,
            },
            {
              key: 'id',
              label: 'Records',
              align: 'right',
              render: (_, row) => (
                <div className="inline-flex flex-col items-end gap-1 text-xs text-slate-600">
                  <span>{row.accountCount} accounts</span>
                  <span>{row.productCount} products</span>
                  <span>{row.reportCount} reports</span>
                </div>
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
              key: 'status',
              label: 'Status',
              options: [
                { label: 'Active', value: 'Active' },
                { label: 'Under Review', value: 'Under Review' },
                { label: 'Suspended', value: 'Suspended' },
                { label: 'Unknown', value: 'Unknown' },
              ],
            },
            {
              key: 'location',
              label: 'Location',
              options: [
                { label: 'Rwanda, Kigali', value: 'Rwanda, Kigali' },
              ],
            },
          ]}
          searchPlaceholder="Search businesses, owners, or record counts..."
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
