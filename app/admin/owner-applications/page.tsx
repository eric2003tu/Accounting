'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock3,
  RefreshCw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import BrandLoadingScreen from '@/app/components/BrandLoadingScreen';
import DataTable, { type Column, type TableFilter } from '@/app/components/dashboard/DataTable';
import StatCard from '@/app/components/dashboard/StatCard';
import { businessClient } from '@/app/lib/apiClients';
import type { OwnerApplicationDto } from '@/app/lib/clients/businessClient';

type ApplicationState = 'pending' | 'approved' | 'rejected';

function normalizeStatus(raw: string | undefined | null): ApplicationState {
  const normalized = String(raw || '').trim().toLowerCase();
  if (normalized.includes('approve')) return 'approved';
  if (normalized.includes('reject')) return 'rejected';
  return 'pending';
}

function displayStatus(status: ApplicationState) {
  if (status === 'approved') return 'Approved';
  if (status === 'rejected') return 'Rejected';
  return 'Pending Review';
}

function displayBusinessName(application: OwnerApplicationDto) {
  const business = application.business;
  return business?.name || business?.tradeName || business?.trade_name || business?.legalName || business?.legal_name || `Business ${application.business_id}`;
}

function displayApplicantName(application: OwnerApplicationDto) {
  const user = application.user;
  const fullName = `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
  return fullName || user?.email || `User ${application.user_id}`;
}

function statusBadge(status: ApplicationState) {
  if (status === 'approved') return 'bg-emerald-50 text-emerald-700';
  if (status === 'rejected') return 'bg-red-50 text-red-700';
  return 'bg-amber-50 text-amber-700';
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleString() : 'Not provided';
}

export default function OwnerApplicationsPage() {
  const [applications, setApplications] = useState<OwnerApplicationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [approvingId, setApprovingId] = useState<string>('');
  const [rejectingId, setRejectingId] = useState<string>('');

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const response = await businessClient.getOwnerApplications(0, 100);
        if (!mounted) return;

        const normalized = Array.isArray(response.data)
          ? response.data.map((application) => ({
              ...application,
              status: normalizeStatus(application.status),
            }))
          : [];

        setApplications(normalized);
        setListError('');
      } catch (error: any) {
        if (!mounted) return;
        setListError(error?.message || 'Unable to load owner applications.');
        setApplications([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const counts = useMemo(() => {
    const mapped = applications.map((application) => normalizeStatus(application.status));
    return {
      total: applications.length,
      pending: mapped.filter((status) => status === 'pending').length,
      approved: mapped.filter((status) => status === 'approved').length,
      rejected: mapped.filter((status) => status === 'rejected').length,
    };
  }, [applications]);

  const refreshApplications = async () => {
    setActionError('');
    setActionMessage('');
    try {
      const response = await businessClient.getOwnerApplications(0, 100);
      const normalized = Array.isArray(response.data)
        ? response.data.map((application) => ({
            ...application,
            status: normalizeStatus(application.status),
          }))
        : [];

      setApplications(normalized);
    } catch (error: any) {
      setActionError(error?.message || 'Failed to refresh applications.');
    }
  };

  const approveApplication = async (application: OwnerApplicationDto) => {
    setActionError('');
    setActionMessage('');
    setApprovingId(String(application.id));

    try {
      await businessClient.approveOwnerApplication(application.id);
      setActionMessage(`Approved ${displayApplicantName(application)} for ${displayBusinessName(application)}.`);
      await refreshApplications();
    } catch (error: any) {
      setActionError(error?.body || error?.message || 'Failed to approve the selected application.');
    } finally {
      setApprovingId('');
    }
  };

  const rejectApplication = async (application: OwnerApplicationDto) => {
    setActionError('');
    setActionMessage('');
    setRejectingId(String(application.id));

    try {
      await businessClient.rejectOwnerApplication(application.id);
      setActionMessage(`Rejected ${displayApplicantName(application)} for ${displayBusinessName(application)}.`);
      await refreshApplications();
    } catch (error: any) {
      setActionError(error?.body || error?.message || 'Failed to reject the selected application.');
    } finally {
      setRejectingId('');
    }
  };

  const filters: TableFilter<OwnerApplicationDto>[] = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Pending review', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
  ];

  const columns: Column<OwnerApplicationDto>[] = [
    {
      key: 'business_id',
      label: 'Business',
      render: (_value, application) => (
        <div>
          <p className="font-semibold text-slate-900">{displayBusinessName(application)}</p>
          <p className="mt-1 text-xs text-slate-500">{application.business?.industry || application.business?.city || application.business?.country || 'Business profile available'}</p>
        </div>
      ),
    },
    {
      key: 'user_id',
      label: 'Applicant',
      render: (_value, application) => (
        <div>
          <p className="font-medium text-slate-900">{displayApplicantName(application)}</p>
          <p className="mt-1 text-xs text-slate-500">{application.user?.email || 'Not provided'}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const status = normalizeStatus(value);
        return (
          <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusBadge(status)}`}>
            {displayStatus(status)}
          </span>
        );
      },
    },
    {
      key: 'created_at',
      label: 'Applied on',
      render: (value) => <span className="text-sm text-slate-600">{formatDate(value)}</span>,
    },
    {
      key: 'id',
      label: 'Actions',
      align: 'right',
      render: (_value, application) => {
        const status = normalizeStatus(application.status);
        const approving = approvingId === String(application.id);
        const rejecting = rejectingId === String(application.id);

        if (status !== 'pending') {
          return null;
        }

        return (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                void approveApplication(application);
              }}
              disabled={approving || rejecting}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {approving ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
              Approve
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                void rejectApplication(application);
              }}
              disabled={approving || rejecting}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {rejecting ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <ThumbsDown className="h-3.5 w-3.5" />}
              Reject
            </button>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return <BrandLoadingScreen title="Loading owner applications" subtitle="Fetching the approval queue from the backend." />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total" value={counts.total} description="Applications received" icon={Building2} />
        <StatCard title="Pending" value={counts.pending} description="Need review" icon={Clock3} />
        <StatCard title="Approved" value={counts.approved} description="Accepted requests" icon={ThumbsUp} />
        <StatCard title="Rejected" value={counts.rejected} description="Closed requests" icon={ThumbsDown} />
      </div>

      {listError && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{listError}</div>}
      {actionError && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{actionError}</div>}
      {actionMessage && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{actionMessage}</div>}

      <DataTable<OwnerApplicationDto>
        title="Applications"
        description="Use the search and status filter to narrow the queue. Approve and reject buttons live inside each row."
        columns={columns}
        data={applications}
        filters={filters}
        searchable
        searchPlaceholder="Search business, applicant, or email"
        pagination
        itemsPerPage={8}
        selectableRows={false}
        exportable={false}
        emptyMessage="No owner applications available"
      />
    </div>
  );
}
