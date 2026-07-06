"use client";

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Download, BadgeCheck, CalendarClock, BookText, Scale, Wallet, Building2, BookOpen } from 'lucide-react';
import BrandLoadingScreen from '@/app/components/BrandLoadingScreen';
import StatCard from '@/app/components/manager/StatCard';
import DataTable from '@/app/components/manager/DataTable';
import { reportButtons } from './reportData';
import reportsClient from '@/app/lib/clients/reportsClient';

const managerBusiness = {
  id: '1',
  name: 'Kigali Tech Solutions',
  legalName: 'Kigali Tech Solutions Ltd',
};

export default function ManagerReportsPage() {
  const [activeView, setActiveView] = useState<'all' | 'balance-sheet' | 'income-statement' | 'journal' | 'ledger' | 'cash-book'>('all');
  const [reportItems, setReportItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const items = await reportsClient.getAll(String(managerBusiness.id));
        if (!mounted) return;
        setReportItems(items || []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load manager reports', err);
        if (mounted) setReportItems([]);
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
    return <BrandLoadingScreen title="Loading reports" subtitle="Preparing report data for your assigned business." />;
  }

  const scopedReports = useMemo(() => {
    return reportItems.filter((report) => {
      const bid = String(report.businessId ?? report.business_id ?? '');
      return bid === managerBusiness.id;
    });
  }, [reportItems]);

  const readyReports = scopedReports.filter((report) => report.status === 'Ready').length;
  const processingReports = scopedReports.filter((report) => report.status === 'Processing').length;
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

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    FileText,
    Scale,
    BadgeCheck,
    BookText,
    BookOpen,
    Wallet,
  };

  const reportsWithBusiness = visibleReports.map((report) => ({
    ...report,
    businessName: managerBusiness.name,
  }));

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-green-700">
              <Building2 className="h-3.5 w-3.5" />
              Report center
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Financial Reports</h1>
            <p className="mt-1 text-sm text-slate-600">{managerBusiness.name} · {managerBusiness.legalName}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Access scope</div>
            <div className="mt-1 text-sm font-semibold text-slate-900">Single assigned business</div>
          </div>
        </div>
      </section>

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
                <p className="text-xs text-slate-500">Filtered for your business</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Total Reports"
          value={scopedReports.length}
          description={`Generated for ${managerBusiness.name}`}
          icon={FileText}
        />
        <StatCard title="Ready Reports" value={readyReports} description="Available to download" icon={BadgeCheck} />
        <StatCard title="In Progress" value={processingReports} description="Still processing" icon={CalendarClock} />
      </div>

      <DataTable
        title="Available Reports"
        description={`${reportsWithBusiness.length} report(s) currently shown for ${managerBusiness.name}`}
        data={reportsWithBusiness}
        fileName="manager-financial-reports"
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
          { key: 'name', label: 'Report Name' },
          {
            key: 'type',
            label: 'Type',
            render: (value) => <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">{value}</span>,
          },
          { key: 'period', label: 'Period' },
          { key: 'generatedAt', label: 'Generated' },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span
                className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                  value === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
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
                <Link href={`/manager/reports/${value}`} className="rounded p-1 transition-colors hover:bg-slate-100" title="View">
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
        searchPlaceholder="Search reports..."
        itemsPerPage={10}
      />
    </div>
  );
}
