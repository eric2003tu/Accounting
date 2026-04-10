'use client';

import React from 'react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import { BookOpen, ArrowDownToLine, Wallet } from 'lucide-react';

const ledgerEntries = [
  {
    id: 1,
    date: '2024-04-10',
    account: 'Income - Services',
    description: 'Service Invoice #001',
    debit: 1500.0,
    credit: 0,
    balance: 15000.0,
  },
  {
    id: 2,
    date: '2024-04-09',
    account: 'Expenses - Supplies',
    description: 'Office Supplies Purchase',
    debit: 0,
    credit: 245.5,
    balance: 14754.5,
  },
  {
    id: 3,
    date: '2024-04-08',
    account: 'Fixed Assets',
    description: 'Equipment Purchase',
    debit: 0,
    credit: 890.0,
    balance: 13864.5,
  },
  {
    id: 4,
    date: '2024-04-07',
    account: 'Bank Account',
    description: 'Deposit',
    debit: 5000.0,
    credit: 0,
    balance: 18864.5,
  },
];

export default function LedgerPage() {
  const totalDebit = ledgerEntries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = ledgerEntries.reduce((sum, entry) => sum + entry.credit, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">General Ledger</h1>
        <p className="text-slate-600 mt-1">View all account transactions and balances</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Debits"
          value={`$${totalDebit.toFixed(2)}`}
          description="Incoming entries"
          icon={BookOpen}
        />
        <StatCard
          title="Total Credits"
          value={`$${totalCredit.toFixed(2)}`}
          description="Outgoing entries"
          icon={ArrowDownToLine}
        />
        <StatCard
          title="Current Balance"
          value="$18,864.50"
          description="Ledger running balance"
          icon={Wallet}
        />
      </div>

      {/* Ledger Table */}
      <DataTable
        title="Ledger Entries"
        description="All transactions recorded in the general ledger"
        data={ledgerEntries}
        fileName="ledger-entries"
        columns={[
          {
            key: 'date',
            label: 'Date',
            width: 'w-24',
          },
          {
            key: 'account',
            label: 'Account',
          },
          {
            key: 'description',
            label: 'Description',
          },
          {
            key: 'debit',
            label: 'Debit',
            align: 'right',
            render: (value) => (value > 0 ? `$${value.toFixed(2)}` : '-'),
          },
          {
            key: 'credit',
            label: 'Credit',
            align: 'right',
            render: (value) => (value > 0 ? `$${value.toFixed(2)}` : '-'),
          },
          {
            key: 'balance',
            label: 'Balance',
            align: 'right',
            render: (value) => (
              <span className="font-bold text-blue-600">${value.toFixed(2)}</span>
            ),
          },
        ]}
        filters={[
          {
            key: 'account',
            label: 'Account',
            options: [
              { label: 'Income - Services', value: 'Income - Services' },
              { label: 'Expenses - Supplies', value: 'Expenses - Supplies' },
              { label: 'Fixed Assets', value: 'Fixed Assets' },
              { label: 'Bank Account', value: 'Bank Account' },
            ],
          },
        ]}
        searchable={true}
        searchPlaceholder="Search ledger entries..."
        pagination={true}
        itemsPerPage={15}
      />
    </div>
  );
}
