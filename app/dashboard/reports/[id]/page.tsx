import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BadgeCheck,
  BookText,
  CalendarClock,
  Download,
  Scale,
  Wallet,
  FileText,
} from 'lucide-react';
import ReportSummaryStats from '@/app/components/dashboard/ReportSummaryStats';
import { getReportById, reportTypeToSlug } from '../reportData';

const iconMap = {
  'Balance Sheet': Scale,
  'Income Statement': BadgeCheck,
  Journal: BookText,
  'Cash Book': Wallet,
  'Trial Balance': CalendarClock,
} as const;

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reportId = Number(id);
  const report = getReportById(reportId);

  if (!report) {
    notFound();
  }

  const Icon = iconMap[report.type];
  const readyForDownload = report.status === 'Ready';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <Link
            href="/dashboard/reports"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </Link>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-green-100 p-3 text-green-700">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{report.name}</h1>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">{report.summary}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${readyForDownload ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {report.status}
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {report.period}
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            Generated {report.generatedAt}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ReportSummaryStats stats={report.summaryStats} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
            <p className="mt-2 text-sm text-slate-600">{report.overview}</p>
          </section>

          {report.sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                {section.description && <p className="mt-1 text-sm text-slate-500">{section.description}</p>}
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-[0_10px_28px_rgba(15,23,42,0.16)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-2 text-emerald-300">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Report Actions</h2>
                <p className="text-sm text-slate-300">Download or review this report</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700">
                <Download className="h-4 w-4" />
                Download PDF
              </button>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                <BookText className="h-4 w-4" />
                View in Full Screen
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Report Info</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                <span>Report type</span>
                <span className="font-semibold text-slate-900">{report.type}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                <span>Report ID</span>
                <span className="font-semibold text-slate-900">{report.id}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                <span>Route slug</span>
                <span className="font-semibold text-slate-900">/{reportTypeToSlug(report.type)}</span>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Report Rows</h2>
            <p className="text-sm text-slate-500">Detailed data used in this report</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {report.rows.length} row(s)
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Reference</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Description</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Debit</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Credit</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Amount</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {report.rows.map((row) => (
                <tr key={`${row.reference}-${row.date}`}>
                  <td className="px-4 py-3 text-sm text-slate-700">{row.date}</td>
                  <td className="px-4 py-3 text-sm font-mono text-slate-700">{row.reference}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">{row.description}</td>
                  <td className="px-4 py-3 text-right text-sm text-slate-700">{row.debit || '-'}</td>
                  <td className="px-4 py-3 text-right text-sm text-slate-700">{row.credit || '-'}</td>
                  <td className="px-4 py-3 text-right text-sm text-slate-700">{row.amount || '-'}</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-green-700">{row.balance || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
