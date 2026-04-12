'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Building2, Plus, TrendingUp, BadgeCheck, Clock3 } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import SimpleChart from '@/app/components/dashboard/SimpleChart';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const currentOwnerId = 5;

const ownerBusinesses = adminBusinesses.filter((business) => business.ownerId === currentOwnerId);

type IncomeRecord = {
  id: number;
  date: string;
  source: string;
  category: string;
  amount: number;
  status: 'Completed' | 'Pending';
  invoiceNo: string;
  businessId: number;
};

const incomeDataByBusiness: Record<number, IncomeRecord[]> = {
  1: [
    {
      id: 1,
      businessId: 1,
      date: '2026-04-10',
      source: 'Cloud Platform Retainer',
      category: 'Service Income',
      amount: 18500,
      status: 'Completed',
      invoiceNo: 'ACM-INV-001',
    },
    {
      id: 2,
      businessId: 1,
      date: '2026-04-09',
      source: 'Implementation Project',
      category: 'Consulting',
      amount: 12400,
      status: 'Completed',
      invoiceNo: 'ACM-INV-002',
    },
    {
      id: 3,
      businessId: 1,
      date: '2026-04-08',
      source: 'Support Contract',
      category: 'Service Income',
      amount: 6400,
      status: 'Pending',
      invoiceNo: 'ACM-INV-003',
    },
    {
      id: 4,
      businessId: 1,
      date: '2026-04-06',
      source: 'Software Subscription',
      category: 'Sales',
      amount: 9300,
      status: 'Completed',
      invoiceNo: 'ACM-INV-004',
    },
  ],
  3: [
    {
      id: 1,
      businessId: 3,
      date: '2026-04-10',
      source: 'Fleet Contract',
      category: 'Logistics',
      amount: 15600,
      status: 'Completed',
      invoiceNo: 'KIV-INV-001',
    },
    {
      id: 2,
      businessId: 3,
      date: '2026-04-09',
      source: 'Warehouse Delivery',
      category: 'Delivery',
      amount: 10100,
      status: 'Completed',
      invoiceNo: 'KIV-INV-002',
    },
    {
      id: 3,
      businessId: 3,
      date: '2026-04-08',
      source: 'Cross-border Shipment',
      category: 'Logistics',
      amount: 8300,
      status: 'Pending',
      invoiceNo: 'KIV-INV-003',
    },
    {
      id: 4,
      businessId: 3,
      date: '2026-04-05',
      source: 'Route Optimization Service',
      category: 'Consulting',
      amount: 5700,
      status: 'Completed',
      invoiceNo: 'KIV-INV-004',
    },
  ],
};

const monthlyIncomeByBusiness: Record<number, Array<{ label: string; value: number }>> = {
  1: [
    { label: 'Nov', value: 12900 },
    { label: 'Dec', value: 13600 },
    { label: 'Jan', value: 14800 },
    { label: 'Feb', value: 15900 },
    { label: 'Mar', value: 17200 },
    { label: 'Apr', value: 30600 },
  ],
  3: [
    { label: 'Nov', value: 11800 },
    { label: 'Dec', value: 12400 },
    { label: 'Jan', value: 13100 },
    { label: 'Feb', value: 14700 },
    { label: 'Mar', value: 16100 },
    { label: 'Apr', value: 39700 },
  ],
};

function buildCategoryData(records: IncomeRecord[]) {
  const totals = new Map<string, number>();

  records.forEach((record) => {
    totals.set(record.category, (totals.get(record.category) || 0) + record.amount);
  });

  return Array.from(totals.entries()).map(([label, value]) => ({ label, value }));
}

export default function IncomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialBusinessId = Number(searchParams.get('businessId'));
  const defaultBusinessId = ownerBusinesses[0]?.id ?? 0;
  const [selectedBusinessId, setSelectedBusinessId] = React.useState(
    ownerBusinesses.some((business) => business.id === initialBusinessId) ? initialBusinessId : defaultBusinessId
  );

  React.useEffect(() => {
    const queryBusinessId = Number(searchParams.get('businessId'));
    if (ownerBusinesses.some((business) => business.id === queryBusinessId) && queryBusinessId !== selectedBusinessId) {
      setSelectedBusinessId(queryBusinessId);
    }
  }, [searchParams, selectedBusinessId]);

  const selectedBusiness = ownerBusinesses.find((business) => business.id === selectedBusinessId) ?? ownerBusinesses[0];
  const incomeData = incomeDataByBusiness[selectedBusiness?.id ?? defaultBusinessId] ?? [];
  const incomeByCategory = buildCategoryData(incomeData);
  const monthlyIncome = monthlyIncomeByBusiness[selectedBusiness?.id ?? defaultBusinessId] ?? [];

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const completedIncome = incomeData
    .filter((item) => item.status === 'Completed')
    .reduce((sum, item) => sum + item.amount, 0);
  const pendingIncome = incomeData
    .filter((item) => item.status === 'Pending')
    .reduce((sum, item) => sum + item.amount, 0);

  if (!selectedBusiness) {
    return <div className="text-slate-600">No businesses available.</div>;
  }

  const handleBusinessChange = (businessId: number) => {
    setSelectedBusinessId(businessId);
    router.replace(`/dashboard/income?businessId=${businessId}`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              Business scoped view
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Income</h1>
            <p className="mt-1 text-slate-600">Track the income sources for the selected business.</p>
          </div>

          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 lg:max-w-md">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500" htmlFor="income-business-select">
              View business
            </label>
            <select
              id="income-business-select"
              value={selectedBusiness.id}
              onChange={(event) => handleBusinessChange(Number(event.target.value))}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            >
              {ownerBusinesses.map((business) => (
                <option key={business.id} value={business.id}>
                  {business.businessName}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-slate-600">
              {selectedBusiness.legalName} · {selectedBusiness.industry}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toFixed(2)}`}
          description="All sources"
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Completed Income"
          value={`$${completedIncome.toFixed(2)}`}
          description="Received"
          icon={BadgeCheck}
        />
        <StatCard
          title="Pending Income"
          value={`$${pendingIncome.toFixed(2)}`}
          description="Awaiting payment"
          icon={Clock3}
        />
      </div>

      {/* Add Income Button */}
      <Link
        href={`/dashboard/income/add?businessId=${selectedBusiness.id}`}
        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
      >
        <Plus className="h-4 w-4" />
        Record Income
      </Link>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart
          title="Income by Category"
          description="Distribution of income sources"
          data={incomeByCategory}
          type="pie"
        />
        <SimpleChart
          title="Monthly Income Trend"
          description="Income for the past 6 months"
          data={monthlyIncome}
          type="bar"
        />
      </div>

      {/* Summary and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="lg:col-span-2">
          <DataTable
              title={`Income Records - ${selectedBusiness.businessName}`}
              description={`Showing ${incomeData.length} income transactions for the selected business`}
              data={incomeData}
              fileName={`income-records-${selectedBusiness.id}`}
              columns={[
              {
                key: 'date',
                label: 'Date',
              },
              {
                key: 'invoiceNo',
                label: 'Invoice',
                render: (value) => <span className="font-mono text-xs">{value}</span>,
              },
              {
                key: 'source',
                label: 'Source',
              },
              {
                key: 'category',
                label: 'Category',
                render: (value) => (
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
                    {value}
                  </span>
                ),
              },
              {
                key: 'amount',
                label: 'Amount',
                align: 'right',
                render: (value) => <span className="text-green-600 font-bold">+${value.toFixed(2)}</span>,
              },
              {
                key: 'status',
                label: 'Status',
                render: (value) => (
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      value === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {value}
                  </span>
                ),
              },
            ]}
            filters={[
              {
                key: 'category',
                label: 'Category',
                options: [
                  { label: 'Service Income', value: 'Service Income' },
                  { label: 'Consulting', value: 'Consulting' },
                  { label: 'Sales', value: 'Sales' },
                ],
              },
              {
                key: 'status',
                label: 'Status',
                options: [
                  { label: 'Completed', value: 'Completed' },
                  { label: 'Pending', value: 'Pending' },
                ],
              },
            ]}
            searchable={true}
            searchPlaceholder="Search income..."
            pagination={true}
            itemsPerPage={10}
          />
        </div>

        {/* Income Summary */}
        {/* <SummaryCard
          title="Income Summary"
          items={[
            { label: 'Consulting', value: '$8,500.00', color: 'text-slate-900' },
            { label: 'Sales', value: '$6,200.00', color: 'text-slate-900' },
            { label: 'Services', value: '$5,300.00', color: 'text-slate-900' },
            { label: 'Total', value: `$${totalIncome.toFixed(2)}`, color: 'text-green-600' },
          ]}
          footer="Updated today"
        /> */}
      </div>
    </div>
  );
}
