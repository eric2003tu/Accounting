import { notFound } from 'next/navigation';
import ReportDetailView from '@/app/components/manager/ReportDetailView';
import { getReportById, getReportBusinessName } from '../reportData';

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reportId = Number(id);
  const report = getReportById(reportId);
  const businessName = getReportBusinessName(reportId);

  if (!report) {
    notFound();
  }
  return <ReportDetailView report={report} businessName={businessName} />;
}

