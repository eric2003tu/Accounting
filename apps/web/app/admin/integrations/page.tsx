'use client';

import React from 'react';
import { Plug, Link2, AlertTriangle } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';

const integrations = [
  { id: 1, service: 'Slack', environment: 'Production', status: 'Healthy', sync: '2 min ago', owner: 'Platform Team' },
  { id: 2, service: 'Paystack', environment: 'Production', status: 'Healthy', sync: '1 min ago', owner: 'Billing Team' },
  { id: 3, service: 'HubSpot', environment: 'Production', status: 'Warning', sync: '18 min ago', owner: 'Sales Ops' },
  { id: 4, service: 'Sentry', environment: 'Production', status: 'Healthy', sync: '3 min ago', owner: 'Engineering' },
  { id: 5, service: 'Data Warehouse', environment: 'Staging', status: 'Offline', sync: '47 min ago', owner: 'Data Team' },
];

export default function AdminIntegrationsPage() {
  const unhealthy = integrations.filter((item) => item.status !== 'Healthy').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Integrations</h1>
        <p className="text-slate-600 mt-1">Track third-party connectivity and synchronization reliability</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Connected Services" value={integrations.length} description="Across environments" icon={Plug} />
        <StatCard title="Healthy Links" value={integrations.length - unhealthy} description="Operational integrations" icon={Link2} />
        <StatCard title="Incidents" value={unhealthy} description="Need investigation" icon={AlertTriangle} trend={{ value: 4, isPositive: false }} />
      </div>

      <DataTable
        title="Integration Registry"
        description="Connection health and ownership details"
        data={integrations}
        fileName="admin-integrations"
        columns={[
          { key: 'service', label: 'Service' },
          { key: 'environment', label: 'Environment' },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${value === 'Healthy' ? 'bg-green-100 text-green-700' : value === 'Warning' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                {value}
              </span>
            ),
          },
          { key: 'sync', label: 'Last Sync' },
          { key: 'owner', label: 'Owner' },
        ]}
        filters={[
          {
            key: 'environment',
            label: 'Environment',
            options: [
              { label: 'Production', value: 'Production' },
              { label: 'Staging', value: 'Staging' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Healthy', value: 'Healthy' },
              { label: 'Warning', value: 'Warning' },
              { label: 'Offline', value: 'Offline' },
            ],
          },
        ]}
        searchPlaceholder="Search integrations..."
      />
    </div>
  );
}
