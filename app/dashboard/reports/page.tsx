'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, BadgeCheck, CalendarClock, BookText, Scale, Wallet } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import { reports as reportItems, reportButtons } from './reportData';

export default function ReportsPage() {
  const [activeView, setActiveView] = useState<'all' | 'balance-sheet' | 'income-statement' | 'journal' | 'cash-book'>('all');

  const readyReports = reportItems.filter((r) => r.status === 'Ready').length;

  const visibleReports = reportItems.filter((report) => {
    switch (activeView) {
      case 'balance-sheet':
        return report.type === 'Balance Sheet';
      case 'income-statement':
        return report.type === 'Income Statement';
      case 'journal':
        return report.type === 'Journal';
      case 'cash-book':
        return report.type === 'Cash Book';
      default:
        return true;
    }
  });

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    FileText,
    Scale,
    BadgeCheck,
    BookText,
    Wallet,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-600 mt-1">Generate and view financial reports</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Reports"
          value={reportItems.length}
          description="Generated documents"
          icon={FileText}
        />
        <StatCard
          title="Ready Reports"
          value={readyReports}
          description="Available to download"
          icon={BadgeCheck}
        />
        <StatCard
          title="This Quarter"
          value={Math.floor(reportItems.length / 1.5)}
          description="Generated"
          icon={CalendarClock}
        />
      </div>

      {/* Report Views */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
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

      {/* Reports Table */}
      <DataTable
        title="Available Reports"
        description={`${visibleReports.length} report(s) currently shown`}
        data={visibleReports}
        fileName="financial-reports"
        columns={[
          {
            key: 'name',
            label: 'Report Name',
          },
          {
            key: 'type',
            label: 'Type',
            render: (value) => (
              <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
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
                className={`inline-block px-2 py-1 rounded text-xs font-medium ${
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
                <Link href={`/dashboard/reports/${value}`} className="p-1 rounded transition-colors hover:bg-slate-100" title="View">
                  <FileText className="h-4 w-4 text-slate-600" />
                </Link>
                <button className="p-1 hover:bg-slate-100 rounded transition-colors" title="Download">
                  <Download className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            ),
          },
        ]}
        filters={[
          {
            key: 'type',
            label: 'Type',
            options: [
              { label: 'Balance Sheet', value: 'Balance Sheet' },
              { label: 'Income Statement', value: 'Income Statement' },
              { label: 'Journal', value: 'Journal' },
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
