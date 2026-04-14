'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, BadgeCheck, CalendarClock, BookText, Scale, Wallet, Building2, BookOpen } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import { reports as reportItems, reportButtons } from './reportData';

type BusinessOption = {
  id: string;
  name: string;
  legalName: string;
};

const businessOptions: BusinessOption[] = [
  { id: 'all', name: 'All Businesses', legalName: 'Portfolio Overview' },
  { id: 'acme', name: 'Acme Holdings Ltd', legalName: 'Primary Investment Company' },
  { id: 'nexa', name: 'Nexa Retail Group Ltd', legalName: 'Retail & Distribution' },
  { id: 'peak', name: 'Peak Foods Distributors', legalName: 'Food Wholesale Operations' },
];

const reportBusinessMap: Record<number, string> = {
  1: 'acme',
  2: 'acme',
  3: 'acme',
  4: 'acme',
  5: 'acme',
  6: 'nexa',
  7: 'nexa',
  8: 'nexa',
  9: 'peak',
  10: 'peak',
  11: 'acme',
  12: 'acme',
  13: 'nexa',
  14: 'peak',
};

export default function ReportsPage() {
  const [activeView, setActiveView] = useState<'all' | 'balance-sheet' | 'income-statement' | 'journal' | 'ledger' | 'cash-book'>('all');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('all');

  const selectedBusiness =
    businessOptions.find((business) => business.id === selectedBusinessId) ?? businessOptions[0];

  const reportsWithBusiness = reportItems.map((report) => {
    const businessId = reportBusinessMap[report.id] ?? 'acme';
    const business = businessOptions.find((item) => item.id === businessId) ?? businessOptions[1];

    return {
      ...report,
      businessId,
      businessName: business.name,
    };
  });

  const scopedReports =
    selectedBusinessId === 'all'
      ? reportsWithBusiness
      : reportsWithBusiness.filter((report) => report.businessId === selectedBusinessId);

  const readyReports = scopedReports.filter((r) => r.status === 'Ready').length;

  const visibleReports = scopedReports.filter((report) => {
    switch (activeView) {
      case 'balance-sheet':
        return report.type === 'Balance Sheet';
      case 'income-statement':
        return report.type === 'Income Statement';
      case 'journal':
        return report.type === 'Journal';
      case 'ledger':
        return report.type === 'Ledger';
      case 'cash-book':
        return report.type === 'Cash Book';
      default:
        return true;
    }
  });

  const processingReports = scopedReports.filter((report) => report.status === 'Processing').length;

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    FileText,
    Scale,
    BadgeCheck,
    BookText,
    BookOpen,
    Wallet,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-600 mt-1">Generate and view financial reports by business</p>
      </div>

      {/* Business Selector */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-green-700">
              <Building2 className="h-3.5 w-3.5" />
              Business Context
            </p>
            <h2 className="mt-3 text-xl font-bold text-slate-900">Select business to view reports</h2>
            <p className="mt-1 text-sm text-slate-600">{selectedBusiness.legalName}</p>
          </div>

          <div className="w-full max-w-md">
            <label htmlFor="business-select" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Active Business
            </label>
            <select
              id="business-select"
              value={selectedBusinessId}
              onChange={(event) => setSelectedBusinessId(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            >
              {businessOptions.map((business) => (
                <option key={business.id} value={business.id}>
                  {business.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {businessOptions.map((business) => {
            const isActive = selectedBusinessId === business.id;

            return (
              <button
                key={business.id}
                type="button"
                onClick={() => setSelectedBusinessId(business.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-green-200 hover:bg-green-50/60'
                }`}
              >
                {business.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {reportButtons.map((button) => {
          const Icon = iconMap[button.icon];
          const active = activeView === button.key;

          return (
            <button
              key={button.key}
              type="button"
              onClick={() => setActiveView(button.key)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
                active
                  ? 'border-green-500 bg-green-50 text-green-900 shadow-[0_10px_24px_rgba(34,197,94,0.12)]'
                  : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-green-200 hover:bg-slate-50'
              }`}
            >
              <div className={`rounded-xl p-2 ${active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{button.label}</p>
                <p className="text-xs text-slate-500">Click to view this report</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Reports"
          value={scopedReports.length}
          description={selectedBusinessId === 'all' ? 'Generated documents across your portfolio' : `Generated for ${selectedBusiness.name}`}
          icon={FileText}
        />
        <StatCard
          title="Ready Reports"
          value={readyReports}
          description="Available to download"
          icon={BadgeCheck}
        />
        <StatCard
          title="In Progress"
          value={processingReports}
          description="Still processing"
          icon={CalendarClock}
        />
      </div>

      <DataTable
        title="Available Reports"
        description={`${visibleReports.length} report(s) currently shown for ${selectedBusiness.name}`}
        data={visibleReports}
        fileName={`financial-reports-${selectedBusinessId}`}
        columns={[
          {
            key: 'businessName',
            label: 'Business',
            render: (value) => (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                <Building2 className="h-3.5 w-3.5 text-green-700" />
                {value}
              </span>
            ),
          },
          {
            key: 'name',
            label: 'Report Name',
          },
          {
            key: 'type',
            label: 'Type',
            render: (value) => (
              <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                {value}
              </span>
            ),
          },
          {
            key: 'period',
            label: 'Period',
          },
          {
            key: 'generatedAt',
            label: 'Generated',
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span
                className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                  value === 'Ready'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {value}
              </span>
            ),
          },
          {
            key: 'id',
            label: 'Actions',
            render: (value) => (
              <div className="flex gap-2">
                <Link href={`/dashboard/reports/${value}`} className="rounded p-1 transition-colors hover:bg-slate-100" title="View">
                  <FileText className="h-4 w-4 text-slate-600" />
                </Link>
                <button className="rounded p-1 transition-colors hover:bg-slate-100" title="Download">
                  <Download className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            ),
          },
        ]}
        filters={[
          {
            key: 'businessName',
            label: 'Business',
            options: businessOptions
              .filter((business) => business.id !== 'all')
              .map((business) => ({ label: business.name, value: business.name })),
          },
          {
            key: 'type',
            label: 'Type',
            options: [
              { label: 'Balance Sheet', value: 'Balance Sheet' },
              { label: 'Income Statement', value: 'Income Statement' },
              { label: 'Journal', value: 'Journal' },
              { label: 'Ledger', value: 'Ledger' },
              { label: 'Cash Book', value: 'Cash Book' },
              { label: 'Trial Balance', value: 'Trial Balance' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Ready', value: 'Ready' },
              { label: 'Processing', value: 'Processing' },
            ],
          },
        ]}
        searchable={true}
        searchPlaceholder="Search reports..."
        pagination={true}
        itemsPerPage={10}
      />
    </div>
  );
}
