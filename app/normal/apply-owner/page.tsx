'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, BadgeCheck, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { usersClient } from '@/app/lib/apiClients';
import { getCurrentUser, setCurrentUser, applyToBeOwner } from '@/app/lib/clients/appClient';
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
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleApply = async () => {
    setConfirmOpen(false);
    setError('');
    setSuccessMessage('');
    setSubmitting(true);

    try {
      const user = getCurrentUser();
      if (!user || !user.id) throw new Error('You must be signed in to submit an application.');

      // Call backend endpoint to apply to be owner (uses auth token only)
      await applyToBeOwner();
      setSuccessMessage('Your application has been submitted. An admin will review your request.');
      // refresh to reflect any server-side changes
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
              onClick={() => setConfirmOpen(true)}
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

      {confirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-slate-950/45"
            onClick={() => setConfirmOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.22)] sm:p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-slate-900">Confirm application</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Are you sure you want to apply for owner access? This request will be sent to admins for review.
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Yes, apply'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
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
