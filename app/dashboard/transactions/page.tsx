'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Building2, Plus, Filter, Receipt, TrendingUp, Wallet } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const currentOwnerId = 5;

const ownerBusinesses = adminBusinesses.filter((business) => business.ownerId === currentOwnerId);

type TransactionRecord = {
  id: number;
  date: string;
  ref: string;
  transactionType: 'income' | 'expense' | 'loan_received' | 'loan_given';
  counterparty: string;
  description: string;
  category: 'Income' | 'Expenses';
  amount: number;
  currency: string;
  taxRate: number;
  dueDate: string;
  status: 'Completed' | 'Pending';
  paymentMethod: string;
  loanAmount: number;
  notes: string;
  businessId: number;
};

const transactionsByBusiness: Record<number, TransactionRecord[]> = {
  1: [
    {
      id: 1,
      businessId: 1,
      date: '2026-04-10',
      ref: 'ACM-TXN-001',
      transactionType: 'income',
      counterparty: 'Greenline Retail',
      description: 'Quarterly support retainer',
      category: 'Income',
      amount: 18500,
      currency: 'USD',
      taxRate: 0,
      dueDate: '2026-04-15',
      status: 'Completed',
      paymentMethod: 'Bank Transfer',
      loanAmount: 0,
      notes: 'Service revenue for April',
    },
    {
      id: 2,
      businessId: 1,
      date: '2026-04-09',
      ref: 'ACM-TXN-002',
      transactionType: 'expense',
      counterparty: 'NorthPeak Cloud',
      description: 'Hosting and infrastructure',
      category: 'Expenses',
      amount: 1680,
      currency: 'USD',
      taxRate: 5,
      dueDate: '2026-04-10',
      status: 'Completed',
      paymentMethod: 'Credit Card',
      loanAmount: 0,
      notes: 'Platform and backup services',
    },
    {
      id: 3,
      businessId: 1,
      date: '2026-04-08',
      ref: 'ACM-TXN-003',
      transactionType: 'loan_received',
      counterparty: 'First Capital Bank',
      description: 'Working capital loan',
      category: 'Income',
      amount: 25000,
      currency: 'USD',
      taxRate: 0,
      dueDate: '2026-05-08',
      status: 'Completed',
      paymentMethod: 'Bank Transfer',
      loanAmount: 25000,
      notes: 'Short-term financing for expansion',
    },
    {
      id: 4,
      businessId: 1,
      date: '2026-04-07',
      ref: 'ACM-TXN-004',
      transactionType: 'expense',
      counterparty: 'City Centre Properties',
      description: 'Office rent',
      category: 'Expenses',
      amount: 3200,
      currency: 'USD',
      taxRate: 0,
      dueDate: '2026-04-07',
      status: 'Pending',
      paymentMethod: 'Auto Pay',
      loanAmount: 0,
      notes: 'Monthly office lease',
    },
    {
      id: 5,
      businessId: 1,
      date: '2026-04-06',
      ref: 'ACM-TXN-005',
      transactionType: 'loan_given',
      counterparty: 'Partner Solutions Ltd',
      description: 'Bridge loan',
      category: 'Expenses',
      amount: 4200,
      currency: 'USD',
      taxRate: 0,
      dueDate: '2026-05-06',
      status: 'Completed',
      paymentMethod: 'Check',
      loanAmount: 4200,
      notes: 'Intercompany support loan',
    },
  ],
  3: [
    {
      id: 1,
      businessId: 3,
      date: '2026-04-10',
      ref: 'KIV-TXN-001',
      transactionType: 'income',
      counterparty: 'Rwanda Freight Partners',
      description: 'Fleet contract payment',
      category: 'Income',
      amount: 15600,
      currency: 'USD',
      taxRate: 0,
      dueDate: '2026-04-15',
      status: 'Completed',
      paymentMethod: 'Bank Transfer',
      loanAmount: 0,
      notes: 'Contract logistics services',
    },
    {
      id: 2,
      businessId: 3,
      date: '2026-04-09',
      ref: 'KIV-TXN-002',
      transactionType: 'expense',
      counterparty: 'Fleet Fuel Co',
      description: 'Fuel purchase',
      category: 'Expenses',
      amount: 3620,
      currency: 'USD',
      taxRate: 5,
      dueDate: '2026-04-09',
      status: 'Completed',
      paymentMethod: 'Credit Card',
      loanAmount: 0,
      notes: 'Route operations fuel',
    },
    {
      id: 3,
      businessId: 3,
      date: '2026-04-08',
      ref: 'KIV-TXN-003',
      transactionType: 'loan_received',
      counterparty: 'Coastal Development Bank',
      description: 'Fleet expansion loan',
      category: 'Income',
      amount: 32000,
      currency: 'USD',
      taxRate: 0,
      dueDate: '2026-05-08',
      status: 'Completed',
      paymentMethod: 'Bank Transfer',
      loanAmount: 32000,
      notes: 'Financing for additional vehicles',
    },
    {
      id: 4,
      businessId: 3,
      date: '2026-04-07',
      ref: 'KIV-TXN-004',
      transactionType: 'expense',
      counterparty: 'Rubavu Logistics Park',
      description: 'Warehouse lease',
      category: 'Expenses',
      amount: 4100,
      currency: 'USD',
      taxRate: 0,
      dueDate: '2026-04-07',
      status: 'Pending',
      paymentMethod: 'Auto Pay',
      loanAmount: 0,
      notes: 'Monthly storage facility payment',
    },
    {
      id: 5,
      businessId: 3,
      date: '2026-04-06',
      ref: 'KIV-TXN-005',
      transactionType: 'loan_given',
      counterparty: 'RouteStack Partners',
      description: 'Equipment advance',
      category: 'Expenses',
      amount: 5600,
      currency: 'USD',
      taxRate: 0,
      dueDate: '2026-05-06',
      status: 'Completed',
      paymentMethod: 'Check',
      loanAmount: 5600,
      notes: 'Advance for shared logistics tools',
    },
  ],
};

export default function TransactionsPage() {
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
  const allTransactions = transactionsByBusiness[selectedBusiness?.id ?? defaultBusinessId] ?? [];

  if (!selectedBusiness) {
    return <div className="text-slate-600">No businesses available.</div>;
  }

  const handleBusinessChange = (businessId: number) => {
    setSelectedBusinessId(businessId);
    router.replace(`/dashboard/transactions?businessId=${businessId}`);
  };

  const totalTransactions = allTransactions.length;
  const totalIncome = allTransactions
    .filter((t) => t.transactionType === 'income' || t.transactionType === 'loan_received')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = allTransactions
    .filter((t) => t.transactionType === 'expense' || t.transactionType === 'loan_given')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalMoneyBorrowed = allTransactions
    .filter((t) => t.transactionType === 'loan_received')
    .reduce((sum, t) => sum + t.loanAmount, 0);
  const totalMoneyLent = allTransactions
    .filter((t) => t.transactionType === 'loan_given')
    .reduce((sum, t) => sum + t.loanAmount, 0);
  const netLoanPosition = totalMoneyBorrowed - totalMoneyLent;

  const transactionTypeLabel = (value: string) => {
    switch (value) {
      case 'income':
        return 'Income';
      case 'expense':
        return 'Expense';
      case 'loan_given':
        return 'Loan Given';
      case 'loan_received':
        return 'Loan Received';
      default:
        return value;
    }
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
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Transactions</h1>
            <p className="mt-1 text-slate-600">Manage the transactions for the selected business.</p>
          </div>

          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 lg:max-w-md">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500" htmlFor="transactions-business-select">
              View business
            </label>
            <select
              id="transactions-business-select"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Transactions"
          value={totalTransactions}
          description="Recorded this period"
          icon={Receipt}
        />
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toFixed(2)}`}
          description="All received amounts"
          icon={TrendingUp}
        />
        {/* <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toFixed(2)}`}
          description="All outgoing amounts"
          icon={Wallet}
        /> */}
        <StatCard
          title="Money Borrowed"
          value={`$${totalMoneyBorrowed.toFixed(2)}`}
          description="Loans received"
          icon={TrendingUp}
        />
        <StatCard
          title="Money Lent"
          value={`$${totalMoneyLent.toFixed(2)}`}
          description="Loans given"
          icon={Wallet}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Net Loan Position"
          value={`$${Math.abs(netLoanPosition).toFixed(2)}`}
          description={netLoanPosition >= 0 ? 'More borrowed than lent' : 'More lent than borrowed'}
          icon={Receipt}
        />
        <StatCard
          title="Loan Transactions"
          value={allTransactions.filter((t) => t.transactionType.includes('loan')).length}
          description="Entries related to loans"
          icon={TrendingUp}
        />
      </div>

      {/* Filter & Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
        <Link
          href={`/dashboard/transactions/add?businessId=${selectedBusiness.id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Add Transaction
        </Link>
      </div>

      {/* Transactions Table */}
      <DataTable
        title={`All Transactions - ${selectedBusiness.businessName}`}
        description={`Showing ${totalTransactions} transactions for the selected business`}
        data={allTransactions}
        fileName={`transactions-${selectedBusiness.id}`}
        columns={[
          {
            key: 'date',
            label: 'Date',
            width: 'w-24',
          },
          {
            key: 'ref',
            label: 'Reference',
            render: (value) => <span className="font-mono text-xs">{value}</span>,
          },
          {
            key: 'transactionType',
            label: 'Type',
            render: (value) => (
              <span
                className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                  value === 'income' || value === 'loan_received'
                    ? 'bg-green-100 text-green-700'
                    : value === 'loan_given'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-red-100 text-red-700'
                }`}
              >
                {transactionTypeLabel(value)}
              </span>
            ),
          },
          {
            key: 'counterparty',
            label: 'Person / Business',
            render: (value) => <span className="text-sm text-slate-800">{value}</span>,
          },
          {
            key: 'description',
            label: 'Description',
          },
          {
            key: 'category',
            label: 'Category',
            render: (value) => (
              <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                {value}
              </span>
            ),
          },
          {
            key: 'paymentMethod',
            label: 'Method',
            render: (value) => <span className="text-sm">{value}</span>,
          },
          {
            key: 'dueDate',
            label: 'Due Date',
            render: (value) => <span className="text-sm text-slate-700">{value}</span>,
          },
          {
            key: 'taxRate',
            label: 'Tax',
            render: (value) => <span className="text-sm text-slate-700">{value}%</span>,
          },
          {
            key: 'currency',
            label: 'Currency',
            render: (value) => <span className="text-sm font-medium text-slate-700">{value}</span>,
          },
          {
            key: 'amount',
            label: 'Amount',
            align: 'right',
            render: (value, row) => (
              <span
                className={`font-bold ${
                  row.transactionType === 'income' || row.transactionType === 'loan_received'
                    ? 'text-green-600'
                    : row.transactionType === 'loan_given'
                      ? 'text-purple-600'
                      : 'text-red-600'
                }`}
              >
                {row.transactionType === 'income' || row.transactionType === 'loan_received' ? '+' : '-'}${value.toFixed(2)}
              </span>
            ),
          },
          {
            key: 'loanAmount',
            label: 'Loan Amount',
            align: 'right',
            render: (value) => (
              <span className={value > 0 ? 'font-semibold text-purple-700' : 'text-slate-400'}>
                {value > 0 ? `$${value.toFixed(2)}` : '-'}
              </span>
            ),
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
          {
            key: 'notes',
            label: 'Notes',
            render: (value) => (
              <span className="max-w-[220px] truncate text-sm text-slate-600" title={value}>
                {value}
              </span>
            ),
          },
        ]}
        filters={[
          {
            key: 'transactionType',
            label: 'Type',
            options: [
              { label: 'Income', value: 'income' },
              { label: 'Expense', value: 'expense' },
              { label: 'Loan Given', value: 'loan_given' },
              { label: 'Loan Received', value: 'loan_received' },
            ],
          },
          {
            key: 'category',
            label: 'Category',
            options: [
              { label: 'Income', value: 'Income' },
              { label: 'Expenses', value: 'Expenses' },
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
          {
            key: 'paymentMethod',
            label: 'Payment Method',
            options: [
              { label: 'Bank Transfer', value: 'Bank Transfer' },
              { label: 'Credit Card', value: 'Credit Card' },
              { label: 'Check', value: 'Check' },
              { label: 'Auto Pay', value: 'Auto Pay' },
            ],
          },
        ]}
        searchable={true}
        searchPlaceholder="Search by description or reference..."
        pagination={true}
        itemsPerPage={15}
      />
    </div>
  );
}
