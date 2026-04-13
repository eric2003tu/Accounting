'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Building2, Plus, DollarSign, BadgeCheck, Clock3 } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import SimpleChart from '@/app/components/dashboard/SimpleChart';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const currentOwnerId = 5;

const ownerBusinesses = adminBusinesses.filter((business) => business.ownerId === currentOwnerId);

type ExpenseRecord = {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: 'Completed' | 'Pending';
  vendor: string;
  businessId: number;
};

const expensesByBusiness: Record<number, ExpenseRecord[]> = {
  1: [
    {
      id: 1,
      businessId: 1,
      date: '2026-04-10',
      description: 'Cloud hosting and infrastructure',
      category: 'Infrastructure',
      amount: 1680,
      status: 'Completed',
      vendor: 'NorthPeak Cloud',
    },
    {
      id: 2,
      businessId: 1,
      date: '2026-04-09',
      description: 'Product design contract',
      category: 'Professional Services',
      amount: 2450,
      status: 'Completed',
      vendor: 'Studio Atlas',
    },
    {
      id: 3,
      businessId: 1,
      date: '2026-04-08',
      description: 'Office rent',
      category: 'Rent',
      amount: 3200,
      status: 'Pending',
      vendor: 'City Centre Properties',
    },
    {
      id: 4,
      businessId: 1,
      date: '2026-04-07',
      description: 'Team payroll run',
      category: 'Salaries',
      amount: 19800,
      status: 'Completed',
      vendor: 'Payroll Service',
    },
    {
      id: 5,
      businessId: 1,
      date: '2026-04-06',
      description: 'Client acquisition ads',
      category: 'Marketing',
      amount: 2750,
      status: 'Completed',
      vendor: 'Digital Ads Inc',
    },
  ],
  3: [
    {
      id: 1,
      businessId: 3,
      date: '2026-04-10',
      description: 'Fuel and route support',
      category: 'Transport',
      amount: 3620,
      status: 'Completed',
      vendor: 'Fleet Fuel Co',
    },
    {
      id: 2,
      businessId: 3,
      date: '2026-04-09',
      description: 'Vehicle maintenance',
      category: 'Maintenance',
      amount: 1840,
      status: 'Completed',
      vendor: 'Garage Pro',
    },
    {
      id: 3,
      businessId: 3,
      date: '2026-04-08',
      description: 'Warehouse lease',
      category: 'Rent',
      amount: 4100,
      status: 'Pending',
      vendor: 'Rubavu Logistics Park',
    },
    {
      id: 4,
      businessId: 3,
      date: '2026-04-07',
      description: 'Driver payroll run',
      category: 'Salaries',
      amount: 15200,
      status: 'Completed',
      vendor: 'Payroll Service',
    },
    {
      id: 5,
      businessId: 3,
      date: '2026-04-06',
      description: 'Dispatch software license',
      category: 'Technology',
      amount: 1340,
      status: 'Completed',
      vendor: 'RouteStack',
    },
  ],
};

const monthlyExpensesByBusiness: Record<number, Array<{ label: string; value: number }>> = {
  1: [
    { label: 'Nov', value: 22100 },
    { label: 'Dec', value: 22800 },
    { label: 'Jan', value: 23600 },
    { label: 'Feb', value: 24100 },
    { label: 'Mar', value: 25300 },
    { label: 'Apr', value: 29880 },
  ],
  3: [
    { label: 'Nov', value: 18600 },
    { label: 'Dec', value: 19100 },
    { label: 'Jan', value: 20400 },
    { label: 'Feb', value: 21300 },
    { label: 'Mar', value: 22800 },
    { label: 'Apr', value: 36100 },
  ],
};

function buildCategoryData(records: ExpenseRecord[]) {
  const totals = new Map<string, number>();

  records.forEach((record) => {
    totals.set(record.category, (totals.get(record.category) || 0) + record.amount);
  });

  return Array.from(totals.entries()).map(([label, value]) => ({ label, value }));
}

function ExpensesPageContent() {
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
  const expensesData = expensesByBusiness[selectedBusiness?.id ?? defaultBusinessId] ?? [];
  const expensesByCategory = buildCategoryData(expensesData);
  const monthlyExpenses = monthlyExpensesByBusiness[selectedBusiness?.id ?? defaultBusinessId] ?? [];

  const totalExpenses = expensesData.reduce((sum, item) => sum + item.amount, 0);
  const completedExpenses = expensesData
    .filter((item) => item.status === 'Completed')
    .reduce((sum, item) => sum + item.amount, 0);
  const pendingExpenses = expensesData
    .filter((item) => item.status === 'Pending')
    .reduce((sum, item) => sum + item.amount, 0);

  if (!selectedBusiness) {
    return <div className="text-slate-600">No businesses available.</div>;
  }

  const handleBusinessChange = (businessId: number) => {
    setSelectedBusinessId(businessId);
    router.replace(`/dashboard/expenses?businessId=${businessId}`);
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
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Expenses</h1>
            <p className="mt-1 text-slate-600">Monitor and manage the expenses for the selected business.</p>
          </div>

          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 lg:max-w-md">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500" htmlFor="expenses-business-select">
              View business
            </label>
            <select
              id="expenses-business-select"
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
          title="Total Expenses"
          value={`$${totalExpenses.toFixed(2)}`}
          description="This period"
          icon={DollarSign}
          trend={{ value: 8, isPositive: false }}
        />
        <StatCard
          title="Completed"
          value={`$${completedExpenses.toFixed(2)}`}
          description="Paid"
          icon={BadgeCheck}
        />
        <StatCard
          title="Pending"
          value={`$${pendingExpenses.toFixed(2)}`}
          description="Due soon"
          icon={Clock3}
        />
      </div>

      {/* Quick Action */}
      <div className="flex justify-start">
        <Link
          href={`/dashboard/expenses/add?businessId=${selectedBusiness.id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Record Expense
        </Link>
      </div>

      {/* Charts */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart
          title="Expenses by Category"
          description="Breakdown of spending"
          data={expensesByCategory}
          type="pie"
        />
        <SimpleChart
          title="Monthly Expenses Trend"
          description="Expenses for the past 6 months"
          data={monthlyExpenses}
          type="bar"
        />
      </div> */}

      {/* Summary and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="lg:col-span-2">
          <DataTable
            title={`Expense Records - ${selectedBusiness.businessName}`}
            description={`Showing ${expensesData.length} expense transactions for the selected business`}
            data={expensesData}
            fileName={`expense-records-${selectedBusiness.id}`}
            columns={[
              {
                key: 'date',
                label: 'Date',
              },
              {
                key: 'description',
                label: 'Description',
              },
              {
                key: 'category',
                label: 'Category',
                render: (value) => (
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-700">
                    {value}
                  </span>
                ),
              },
              {
                key: 'vendor',
                label: 'Vendor',
              },
              {
                key: 'amount',
                label: 'Amount',
                align: 'right',
                render: (value) => <span className="text-red-600 font-bold">-${value.toFixed(2)}</span>,
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
                  { label: 'Supplies', value: 'Supplies' },
                  { label: 'Equipment', value: 'Equipment' },
                  { label: 'Utilities', value: 'Utilities' },
                  { label: 'Rent', value: 'Rent' },
                  { label: 'Marketing', value: 'Marketing' },
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
            searchPlaceholder="Search expenses..."
            pagination={true}
            itemsPerPage={10}
          />
        </div>

        {/* Expenses Summary */}
        {/* <SummaryCard
          title="Expenses Summary"
          items={[
            { label: 'Highest', value: '$2,500.00', color: 'text-red-600' },
            { label: 'Average', value: '$591.70', color: 'text-slate-900' },
            { label: 'Pending', value: `$${pendingExpenses.toFixed(2)}`, color: 'text-amber-600' },
            { label: 'Total', value: `$${totalExpenses.toFixed(2)}`, color: 'text-red-600' },
          ]}
          footer="Updated today"
        /> */}
      </div>
    </div>
  );
}

export default function ExpensesPage() {
  return (
    <Suspense fallback={<div className="text-slate-600">Loading expenses...</div>}>
      <ExpensesPageContent />
    </Suspense>
  );
}
