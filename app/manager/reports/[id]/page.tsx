'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReportDetailView from '@/app/components/manager/ReportDetailView';
import { reportsClient, businessClient } from '@/app/lib/apiClients';

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const reportId = Array.isArray(id) ? id[0] : id;

  const [report, setReport] = useState<any | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!reportId) {
        router.push('/manager/reports');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const foundReport = await reportsClient.getById(reportId);
        if (!mounted) return;

        if (!foundReport) {
          setReport(null);
          setError('Report not found.');
          return;
        }

        setReport(foundReport);

        if (foundReport.business_id) {
          try {
            const business = await businessClient.getById(String(foundReport.business_id));
            if (!mounted) return;
            setBusinessName(business?.businessName ?? business?.business_name ?? '');
          } catch (businessError) {
            console.error('Failed to resolve business for report', businessError);
          }
        } else {
          setBusinessName('');
        }
      } catch (fetchError: any) {
        console.error('Failed to load manager report detail', fetchError);
        if (mounted) setError(fetchError?.message || 'Failed to load report.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [reportId, router]);

  if (loading) {
    return <div className="text-slate-600">Loading report...</div>;
  }

  if (error || !report) {
    return <div className="text-slate-600">{error || 'Report not found.'}</div>;
  }

  return <ReportDetailView report={report as any} businessName={businessName} />;
}

