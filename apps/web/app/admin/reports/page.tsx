"use client";

import React, { useEffect, useState } from 'react';
import { ChartColumn, FileText, BadgeCheck } from 'lucide-react';
import BrandLoadingScreen from '@/app/components/BrandLoadingScreen';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import reportsClient from '@/app/lib/clients/reportsClient';

type UiReport = {
  id: number | string;
  name: string;
  period?: string;
  owner?: string;
  status?: string;
  generated?: string;
};
export default function AdminReportsPage() {
  const [reports, setReports] = useState<UiReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const apiReports = await reportsClient.getAll();
        if (!mounted) return;
        const mapped = apiReports.map((r: any) => ({
          id: r.id,
          name: r.name || r.title || `Report ${r.id}`,
          period: r.period || r.period_label || '',
          owner: r.owner || r.generated_by || '',
          status: r.status || 'Ready',
          generated: r.generated_at || r.created_at || '',
        }));
        setReports(mapped);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error('Failed to load reports', err);
        if (mounted) setError(err?.message || 'Failed to load reports');
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
    return <BrandLoadingScreen title="Loading reports" subtitle="Fetching governance and platform performance reports." />;
  }

  const ready = reports.filter((item) => item.status === 'Ready').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-600 mt-1">Generate governance, security, and platform performance reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Reports" value={reports.length} description="Available artifacts" icon={FileText} />
        <StatCard title="Ready to Export" value={ready} description="Immediately downloadable" icon={BadgeCheck} />
        <StatCard title="Coverage Score" value="96%" description="Scheduled report completion" icon={ChartColumn} />
      </div>

      <DataTable
        title="Report Library"
        description="All generated administrative reports"
        data={reports}
        fileName="admin-reports"
        columns={[
          { key: 'name', label: 'Report' },
          { key: 'period', label: 'Period' },
          { key: 'owner', label: 'Owner' },
          { key: 'generated', label: 'Generated' },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${value === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {value}
              </span>
            ),
          },
        ]}
        filters={[
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
      />
    </div>
  );
}
