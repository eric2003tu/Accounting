'use client';

import React from 'react';
import { ChartColumn, FileText, BadgeCheck } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';

const reports = [
  { id: 1, name: 'Access Review', period: 'Q1 2026', owner: 'Security Team', status: 'Ready', generated: '2026-04-01' },
  { id: 2, name: 'Subscription Health', period: 'Mar 2026', owner: 'Billing Team', status: 'Ready', generated: '2026-04-02' },
  { id: 3, name: 'Incident Summary', period: 'Week 14', owner: 'Ops Team', status: 'Processing', generated: '2026-04-10' },
  { id: 4, name: 'Integration Drift', period: 'Apr 2026', owner: 'Platform Team', status: 'Ready', generated: '2026-04-08' },
  { id: 5, name: 'Role Assignment Delta', period: 'Q1 2026', owner: 'IAM Team', status: 'Ready', generated: '2026-04-04' },
];

export default function AdminReportsPage() {
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
