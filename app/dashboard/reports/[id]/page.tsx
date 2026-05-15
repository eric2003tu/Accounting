import { notFound } from 'next/navigation';
import ReportDetailView from '@/app/components/dashboard/ReportDetailView';
import { reportsClient, businessClient } from '@/app/lib/apiClients';

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const reportId = Number(id);

  // Fetch reports and find the requested report
  const reports = await reportsClient.getAll();
  const report = (reports || []).find((r: any) => Number(r.id) === reportId) || null;

  if (!report) {
    notFound();
  }

  let businessName = '';
  try {
    if (report.business_id) {
      const b = await businessClient.getById(String(report.business_id));
      businessName = b?.businessName ?? b?.business_name ?? '';
    }
  } catch (e) {
    // ignore business name resolution failure, keep template
    console.error('Failed to resolve business for report', e);
  }

  return <ReportDetailView report={report as any} businessName={businessName} />;
}
