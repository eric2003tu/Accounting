'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, BadgeCheck, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { usersClient } from '@/app/lib/apiClients';
import { getCurrentUser, setCurrentUser } from '@/app/lib/clients/appClient';
import type { BusinessDto } from '@/app/lib/types';

function displayBusinessName(business: BusinessDto) {
  return business.businessName || business.business_name || business.tradeName || business.trade_name || business.name || `Business ${business.id}`;
}

function displayBusinessMeta(business: BusinessDto) {
  const parts = [business.industry, business.city, business.country].filter(Boolean);
  return parts.length ? parts.join(' · ') : 'Business profile available';
}

export default function ApplyOwnerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleApply = async () => {
    setError('');
    setSuccessMessage('');
    setSubmitting(true);

    try {
      const user = getCurrentUser();
      if (!user || !user.id) throw new Error('You must be signed in to submit an application.');

      // Update the user's system role to request OWNER role. Admins will review this.
      const updated = await usersClient.update(user.id, { system_role: 'OWNER' });
      const normalized = { ...updated, id: String((updated as any).id) };
      setCurrentUser(normalized as any);
      setSuccessMessage('Your application has been submitted. An admin will review your request.');
      router.refresh();
    } catch (err: any) {
      setError(err?.body || err?.message || 'Failed to submit owner application.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
            <BadgeCheck className="h-3.5 w-3.5" />
            Owner application
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Apply to become an owner</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-600 sm:text-base">
            Submit a request to become an owner. Admins will review and approve the application.
          </p>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {successMessage}
        </div>
      )}

      <div className="grid gap-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Request owner access</h2>
              <p className="mt-1 text-sm text-slate-600">Click the button below to request owner privileges. Admins will review your request.</p>
            </div>

            <Link href="/normal/profile" className="text-sm font-semibold text-green-700 transition hover:text-green-800">
              Review profile
            </Link>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleApply}
              disabled={submitting}
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Apply for owner access
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <h2 className="text-lg font-semibold text-slate-900">What happens next</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            <p>1. Your request is sent to admins for review.</p>
            <p>2. Admins can approve or reject owner access.</p>
            <p>3. If approved, your account will be updated with the OWNER role.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
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
  label: string;
  value: string;
};

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value || 'Not provided'}</p>
    </div>
  );
}
