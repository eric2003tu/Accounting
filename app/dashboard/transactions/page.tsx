'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Filter, Receipt, TrendingUp, Wallet } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';

const allTransactions = [
  {
    id: 1,
    date: '2024-04-10',
    ref: 'TXN-001',
    transactionType: 'income',
    counterparty: 'Client A',
    description: 'Client Invoice #001',
    category: 'Income',
    amount: 1500.0,
    currency: 'USD',
    taxRate: 0,
    dueDate: '2024-04-15',
    status: 'Completed',
    paymentMethod: 'Bank Transfer',
    loanAmount: 0,
    notes: 'Consulting services for April',
  },
  {
    id: 2,
    date: '2024-04-10',
    ref: 'TXN-002',
    transactionType: 'expense',
    counterparty: 'Office Mart',
    description: 'Office Supplies',
    category: 'Expenses',
    amount: 245.5,
    currency: 'USD',
    taxRate: 5,
    dueDate: '2024-04-10',
    status: 'Completed',
    paymentMethod: 'Credit Card',
    loanAmount: 0,
    notes: 'Stationery and printing paper',
  },
  {
    id: 3,
    date: '2024-04-09',
    ref: 'TXN-003',
    transactionType: 'expense',
    counterparty: 'Tech Supplier Ltd',
    description: 'Equipment Purchase',
    category: 'Expenses',
    amount: 890.0,
    currency: 'USD',
    taxRate: 0,
    dueDate: '2024-04-20',
    status: 'Pending',
    paymentMethod: 'Check',
    loanAmount: 0,
    notes: 'Laptop and printer for office use',
  },
  {
    id: 4,
    date: '2024-04-09',
    ref: 'TXN-004',
    transactionType: 'loan_received',
    counterparty: 'First Capital Bank',
    description: 'Service Income',
    category: 'Income',
    amount: 2500.0,
    currency: 'USD',
    taxRate: 0,
    dueDate: '2024-05-09',
    status: 'Completed',
    paymentMethod: 'Bank Transfer',
    loanAmount: 2500.0,
    notes: 'Short-term working capital loan',
  },
  {
    id: 5,
    date: '2024-04-08',
    ref: 'TXN-005',
    transactionType: 'loan_given',
    counterparty: 'John Traders Ltd',
    description: 'Utilities Bill',
    category: 'Expenses',
    amount: 320.0,
    currency: 'USD',
    taxRate: 0,
    dueDate: '2024-05-08',
    status: 'Completed',
    paymentMethod: 'Auto Pay',
    loanAmount: 320.0,
    notes: 'Loan to be repaid next month',
  },
];

export default function TransactionsPage() {
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
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>
        <p className="text-slate-600 mt-1">Manage all your business transactions</p>
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
          href="/dashboard/transactions/add"
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Add Transaction
        </Link>
      </div>

      {/* Transactions Table */}
      <DataTable
        title="All Transactions"
        description={`Showing ${totalTransactions} transactions`}
        data={allTransactions}
        fileName="transactions"
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
