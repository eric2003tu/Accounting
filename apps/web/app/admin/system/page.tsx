'use client';

import React from 'react';
import { Server, Cpu, ShieldCheck } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';

const services = [
  { id: 1, service: 'API Gateway', region: 'eu-west-1', status: 'Healthy', latency: '82ms', incidents: 0 },
  { id: 2, service: 'Auth Service', region: 'eu-west-1', status: 'Healthy', latency: '65ms', incidents: 0 },
  { id: 3, service: 'Billing Worker', region: 'eu-west-1', status: 'Degraded', latency: '210ms', incidents: 2 },
  { id: 4, service: 'Queue Cluster', region: 'eu-west-1', status: 'Healthy', latency: '91ms', incidents: 0 },
  { id: 5, service: 'Reporting Engine', region: 'eu-west-1', status: 'Maintenance', latency: 'N/A', incidents: 1 },
];

export default function AdminSystemPage() {
  const healthy = services.filter((item) => item.status === 'Healthy').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">System</h1>
        <p className="text-slate-600 mt-1">Observe service health, performance, and operational risk</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Running Services" value={services.length} description="Total monitored components" icon={Server} />
        <StatCard title="Healthy Services" value={healthy} description="Within expected SLO" icon={ShieldCheck} />
        <StatCard title="Avg Latency" value="112ms" description="Across core services" icon={Cpu} trend={{ value: 7, isPositive: false }} />
      </div>

      <DataTable
        title="Service Health Board"
        description="Operational status and latency by component"
        data={services}
        fileName="admin-system-health"
        columns={[
          { key: 'service', label: 'Service' },
          { key: 'region', label: 'Region' },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${value === 'Healthy' ? 'bg-green-100 text-green-700' : value === 'Degraded' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                {value}
              </span>
            ),
          },
          { key: 'latency', label: 'Latency' },
          { key: 'incidents', label: 'Incidents', align: 'right' },
        ]}
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Healthy', value: 'Healthy' },
              { label: 'Degraded', value: 'Degraded' },
              { label: 'Maintenance', value: 'Maintenance' },
            ],
          },
        ]}
        searchPlaceholder="Search services..."
      />
    </div>
  );
}
