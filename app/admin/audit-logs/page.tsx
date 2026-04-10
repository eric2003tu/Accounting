'use client';

import React from 'react';
import { FileSearch, ShieldAlert, CheckCircle2 } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';

const logs = [
  { id: 1, timestamp: '2026-04-10 08:24', actor: 'Eric T.', event: 'Updated role policy', source: 'Admin Console', severity: 'Info' },
  { id: 2, timestamp: '2026-04-10 08:18', actor: 'System', event: 'Rate limit exceeded', source: 'Auth Service', severity: 'Warning' },
  { id: 3, timestamp: '2026-04-10 08:09', actor: 'Aline N.', event: 'Revoked API key', source: 'Integrations', severity: 'Info' },
  { id: 4, timestamp: '2026-04-10 07:58', actor: 'System', event: 'Failed login threshold reached', source: 'Identity', severity: 'High' },
  { id: 5, timestamp: '2026-04-10 07:45', actor: 'Ops Bot', event: 'Worker restarted', source: 'Queue Cluster', severity: 'Info' },
];

export default function AdminAuditLogsPage() {
  const highSeverity = logs.filter((item) => item.severity === 'High').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Audit Logs</h1>
        <p className="text-slate-600 mt-1">Trace platform events and security-sensitive actions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Events Today" value={logs.length} description="Captured in audit trail" icon={FileSearch} />
        <StatCard title="High Severity" value={highSeverity} description="Immediate review needed" icon={ShieldAlert} trend={{ value: 1, isPositive: false }} />
        <StatCard title="Verified Entries" value={logs.length - highSeverity} description="No critical concern" icon={CheckCircle2} />
      </div>

      <DataTable
        title="Audit Stream"
        description="Chronological event record for compliance and investigations"
        data={logs}
        fileName="admin-audit-logs"
        columns={[
          { key: 'timestamp', label: 'Timestamp' },
          { key: 'actor', label: 'Actor' },
          { key: 'event', label: 'Event' },
          { key: 'source', label: 'Source' },
          {
            key: 'severity',
            label: 'Severity',
            render: (value) => (
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${value === 'High' ? 'bg-red-100 text-red-700' : value === 'Warning' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                {value}
              </span>
            ),
          },
        ]}
        filters={[
          {
            key: 'severity',
            label: 'Severity',
            options: [
              { label: 'High', value: 'High' },
              { label: 'Warning', value: 'Warning' },
              { label: 'Info', value: 'Info' },
            ],
          },
          {
            key: 'source',
            label: 'Source',
            options: [
              { label: 'Admin Console', value: 'Admin Console' },
              { label: 'Auth Service', value: 'Auth Service' },
              { label: 'Integrations', value: 'Integrations' },
              { label: 'Identity', value: 'Identity' },
              { label: 'Queue Cluster', value: 'Queue Cluster' },
            ],
          },
        ]}
        searchPlaceholder="Search logs..."
      />
    </div>
  );
}
