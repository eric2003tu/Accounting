'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Mail,
  Phone,
  RefreshCw,
  Sparkles,
  Target,
  ThumbsDown,
  ThumbsUp,
  User,
} from 'lucide-react';
import BrandLoadingScreen from '@/app/components/BrandLoadingScreen';
import StatCard from '@/app/components/dashboard/StatCard';
import SummaryCard from '@/app/components/dashboard/SummaryCard';
import { businessClient } from '@/app/lib/apiClients';
import type { OwnerApplicationDto } from '@/app/lib/clients/businessClient';

function applicationStatus(raw: string | undefined | null): 'Pending Review' | 'Approved' | 'Rejected' {
  const normalized = String(raw || '').trim().toLowerCase();
  if (normalized.includes('approve')) return 'Approved';
  if (normalized.includes('reject')) return 'Rejected';
  return 'Pending Review';
}

function displayBusinessName(application: OwnerApplicationDto) {
  const business = application.business;
  return (
    business?.name ||
    business?.tradeName ||
    business?.trade_name ||
    business?.legalName ||
    business?.legal_name ||
    `Business ${application.business_id}`
  );
}

function displayApplicantName(application: OwnerApplicationDto) {
  const user = application.user;
  const fullName = `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
  return fullName || user?.email || `User ${application.user_id}`;
}

function displayBusinessMeta(application: OwnerApplicationDto) {
  const business = application.business;
  const parts = [business?.industry, business?.city, business?.country].filter(Boolean);
  return parts.length ? parts.join(' · ') : 'Business profile available';
}

export default function OwnerApplicationsPage() {
  const [applications, setApplications] = useState<OwnerApplicationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending Review' | 'Approved' | 'Rejected'>('All');
  const [selectedApplicationId, setSelectedApplicationId] = useState<string>('');
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
              status: application.status || 'pending',
            }))
          : [];

        setApplications(normalized);
        setSelectedApplicationId(normalized[0] ? String(normalized[0].id) : '');
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

  const selectedApplication =
    applications.find((application) => String(application.id) === selectedApplicationId) ?? applications[0] ?? null;

  const filteredApplications = useMemo(() => {
    if (activeFilter === 'All') return applications;
    return applications.filter((application) => applicationStatus(application.status) === activeFilter);
  }, [applications, activeFilter]);

  const counts = useMemo(() => {
    const mapped = applications.map((application) => applicationStatus(application.status));
    return {
      total: applications.length,
      pending: mapped.filter((status) => status === 'Pending Review').length,
      approved: mapped.filter((status) => status === 'Approved').length,
      rejected: mapped.filter((status) => status === 'Rejected').length,
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
            status: application.status || 'pending',
          }))
        : [];
      setApplications(normalized);
      if (!selectedApplicationId && normalized[0]) {
        setSelectedApplicationId(String(normalized[0].id));
      }
    } catch (error: any) {
      setActionError(error?.message || 'Failed to refresh applications.');
    }
  };

  const approveSelected = async () => {
    if (!selectedApplication) return;
    setActionError('');
    setActionMessage('');
    setApprovingId(String(selectedApplication.id));

    try {
      await businessClient.approveOwner(selectedApplication.business_id, selectedApplication.user_id);
      setActionMessage(`Approved ${displayApplicantName(selectedApplication)} for ${displayBusinessName(selectedApplication)}.`);
      await refreshApplications();
    } catch (error: any) {
      setActionError(error?.body || error?.message || 'Failed to approve the selected application.');
    } finally {
      setApprovingId('');
    }
  };

  const rejectSelected = async () => {
    if (!selectedApplication) return;
    setActionError('');
    setActionMessage('');
    setRejectingId(String(selectedApplication.id));

    try {
      setApplications((current) =>
        current.map((application) =>
          String(application.id) === String(selectedApplication.id)
            ? { ...application, status: 'rejected' }
            : application
        )
      );
      setActionMessage(`Marked ${displayApplicantName(selectedApplication)} as rejected in the review queue.`);
    } finally {
      setRejectingId('');
    }
  };

  if (loading) {
    return <BrandLoadingScreen title="Loading owner applications" subtitle="Fetching the approval queue from the backend." />;
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-7">
          <div className="relative overflow-hidden rounded-2xl border border-slate-900 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900 p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.24)] sm:p-7">
            <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">
                <BadgeCheck className="h-3.5 w-3.5" />
                Owner applications
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Review every owner request from one place.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                The queue is powered by the backend admin listing endpoint, and approve actions are sent directly to the approval API.
              </p>
            </div>
          </div>

          <aside className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Review snapshot</p>
            <div className="grid grid-cols-2 gap-3">
              <StatCard title="Total" value={counts.total} description="Applications received" icon={FileText} />
              <StatCard title="Pending" value={counts.pending} description="Need review" icon={Clock3} />
              <StatCard title="Approved" value={counts.approved} description="Accepted requests" icon={ThumbsUp} />
              <StatCard title="Rejected" value={counts.rejected} description="Closed requests" icon={ThumbsDown} />
            </div>
          </aside>
        </div>
      </section>

      {listError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{listError}</div>
      )}

      {actionError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{actionError}</div>
      )}

      {actionMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{actionMessage}</div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Applications</h2>
              <p className="mt-1 text-sm text-slate-600">Select a request to review the backend data and approve it.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['All', 'Pending Review', 'Approved', 'Rejected'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    activeFilter === filter
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-green-200 hover:bg-green-50/60'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredApplications.map((application) => {
              const normalizedStatus = applicationStatus(application.status);
              const isSelected = String(application.id) === String(selectedApplication?.id);

              return (
                <button
                  key={application.id}
                  type="button"
                  onClick={() => setSelectedApplicationId(String(application.id))}
                  className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-green-500 bg-green-50 shadow-[0_10px_24px_rgba(34,197,94,0.12)]'
                      : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-green-200 hover:shadow-[0_10px_20px_rgba(15,23,42,0.06)]'
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-slate-900">{displayBusinessName(application)}</h3>
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusBadge(normalizedStatus)}`}>
                          {normalizedStatus}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">Applicant: {displayApplicantName(application)}</p>
                      <p className="mt-1 text-sm text-slate-600">{displayBusinessMeta(application)}</p>

                      <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                        <InfoRow icon={Mail} value={application.user?.email || ''} />
                        <InfoRow icon={Phone} value={application.business?.phone || ''} />
                        <InfoRow icon={Building2} value={String(application.business_id)} />
                        <InfoRow icon={CalendarDays} value={application.created_at ? new Date(application.created_at).toLocaleString() : ''} />
                      </div>
                    </div>

                    <div className={`shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold ${statusTone(normalizedStatus)}`}>
                      {normalizedStatus === 'Pending Review' ? 'Awaiting decision' : normalizedStatus}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-green-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Selected application
                </p>
                <h2 className="mt-3 text-2xl font-bold text-slate-900">{selectedApplication ? displayBusinessName(selectedApplication) : 'No application selected'}</h2>
                <p className="mt-1 text-sm text-slate-600">{selectedApplication ? displayBusinessMeta(selectedApplication) : 'Choose a row to inspect the payload.'}</p>
              </div>

              {selectedApplication && (
                <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge(applicationStatus(selectedApplication.status))}`}>
                  {applicationStatus(selectedApplication.status)}
                </span>
              )}
            </div>

            {selectedApplication && (
              <div className="mt-5 space-y-3">
                <DetailItem icon={User} label="Applicant" value={displayApplicantName(selectedApplication)} />
                <DetailItem icon={Mail} label="Email" value={selectedApplication.user?.email || ''} />
                <DetailItem icon={Phone} label="Phone" value={selectedApplication.business?.phone || ''} />
                <DetailItem icon={Building2} label="Business ID" value={String(selectedApplication.business_id)} />
                <DetailItem icon={Target} label="Status" value={applicationStatus(selectedApplication.status)} />
                <DetailItem icon={Clock3} label="Applied on" value={selectedApplication.created_at ? new Date(selectedApplication.created_at).toLocaleString() : ''} />
              </div>
            )}

            {selectedApplication && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Business details</p>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p>Business: {displayBusinessName(selectedApplication)}</p>
                  <p>Contact email: {selectedApplication.business?.contact_email || 'Not provided'}</p>
                  <p>Phone: {selectedApplication.business?.phone || 'Not provided'}</p>
                  <p>Address: {selectedApplication.business?.address || 'Not provided'}</p>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={approveSelected}
                disabled={!selectedApplication || approvingId === String(selectedApplication.id)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {approvingId === String(selectedApplication?.id || '') ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Approving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Approve
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={rejectSelected}
                disabled={!selectedApplication || rejectingId === String(selectedApplication.id)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {rejectingId === String(selectedApplication?.id || '') ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <ThumbsDown className="h-4 w-4" />
                    Reject
                  </>
                )}
              </button>
            </div>
          </section>

          <SummaryCard
            title="Approval guidance"
            items={[
              { label: 'Review documents and profile', value: 'First', color: 'text-slate-900' },
              { label: 'Approve with backend request', value: 'Second', color: 'text-green-600' },
              { label: 'Reject locally if needed', value: 'Third', color: 'text-red-600' },
            ]}
            footer="The backend contract only defines approve; reject is currently a local queue action."
          />
        </aside>
      </div>
    </div>
  );
}

function statusTone(status: 'Pending Review' | 'Approved' | 'Rejected') {
  if (status === 'Approved') return 'text-emerald-700 bg-emerald-100 border-emerald-200';
  if (status === 'Rejected') return 'text-red-700 bg-red-100 border-red-200';
  return 'text-amber-700 bg-amber-100 border-amber-200';
}

function statusBadge(status: 'Pending Review' | 'Approved' | 'Rejected') {
  if (status === 'Approved') return 'bg-emerald-50 text-emerald-700';
  if (status === 'Rejected') return 'bg-red-50 text-red-700';
  return 'bg-amber-50 text-amber-700';
}

type InfoRowProps = {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
};

function InfoRow({ icon: Icon, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-slate-400" />
      <span className="truncate">{value || 'Not provided'}</span>
    </div>
  );
}

type DetailItemProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
};

function DetailItem({ icon: Icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="rounded-lg border border-emerald-200 bg-emerald-100 p-2 text-emerald-700">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-medium text-slate-900">{value || 'Not provided'}</p>
      </div>
    </div>
  );
}
