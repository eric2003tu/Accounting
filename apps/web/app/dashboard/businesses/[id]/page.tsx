"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarClock,
  ShieldCheck,
  UserRound,
  Mail,
  Phone,
} from 'lucide-react';

import BrandLoadingScreen from '@/app/components/BrandLoadingScreen';
import SimpleChart from '@/app/components/dashboard/SimpleChart';
import { businessClient, usersClient } from '@/app/lib/apiClients';

function money(value: number) {
  const sign = value < 0 ? '-' : '';
  return `${sign}$${Math.abs(value).toLocaleString()}`;
}

function ratio(numerator: number, denominator: number) {
  if (!denominator) return '0.0%';
  return `${((numerator / denominator) * 100).toFixed(1)}%`;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 last:border-b-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-900 sm:text-right">
        {value}
      </span>
    </div>
  );
}

export default function DashboardBusinessDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const [business, setBusiness] = useState<any | null>(null);
  const [owner, setOwner] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    let mounted = true;

    async function loadBusiness() {
      try {
        console.log('Business ID:', id);

        if (!id) {
          console.error('No business ID found');
          return;
        }

        const ownedBusinesses = await businessClient.getOwned();
        const ownedMatch = (ownedBusinesses || []).find((business: any) => String(business.id) === String(id));
        const b = ownedMatch || await businessClient.getById(id);

        console.log('Business Data:', b);

        if (!mounted) return;

        if (!b) {
          console.error('Business not found');
          return;
        }

        setBusiness(b);

        const ownerId = b.owner_id || b.ownerId;

        if (ownerId) {
          try {
            const u = await usersClient.getById(String(ownerId));

            if (mounted) {
              setOwner(u);
            }
          } catch (err) {
            console.error('Failed to load owner', err);
          }
        }
      } catch (err) {
        console.error('Failed to load business', err);

        if (mounted) {
          // keep the user on the detail page and show the error state instead of redirecting away
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadBusiness();

    return function () {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <BrandLoadingScreen
        title="Loading business"
        subtitle="Fetching business profile and related records."
      />
    );
  }

  if (!business) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Business not found.
      </div>
    );
  }

  const fin = business.financials || {
    monthlyRevenue: 0,
    monthlyExpenses: 0,
    netProfit: 0,
    cashBalance: 0,
    receivables: 0,
    payables: 0,
    assets: 0,
    liabilities: 0,
    equity: 0,
    overdueInvoices: 0,
    revenueTrend: [],
    expenseBreakdown: [],
  };

  const profitMargin = ratio(fin.netProfit, fin.monthlyRevenue);
  const currentRatio = ratio(fin.assets, fin.liabilities);

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
        <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-green-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-36 w-36 rounded-full bg-emerald-100/50 blur-2xl" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Link
              href="/dashboard/businesses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to My Businesses
            </Link>

            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
                <BadgeCheck className="h-3.5 w-3.5" />
                Owner View
              </p>

              <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                My Business Financial Profile
              </h1>

              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                Complete operating, registration, ownership, and financial
                performance view for your business.
              </p>
            </div>
          </div>

          <div className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 lg:w-auto lg:max-w-md">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Ownership snapshot
            </div>

            <p className="mt-1 break-words text-emerald-800">
              Status: {business.status || 'Active'} · Plan:{' '}
              {business.subscription || 'Starter'} · Next billing:{' '}
              {business.next_billing_date || ''}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
        <div className="space-y-4 sm:space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                <Building2 className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Business details
                </h2>

                <p className="text-sm text-slate-500">
                  Registration, footprint, and subscription profile.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
              <InfoRow
                label="Business name"
                value={business.name || business.businessName || ''}
              />

              <InfoRow
                label="Legal name"
                value={business.legal_name || ''}
              />

              <InfoRow
                label="Industry"
                value={business.industry || ''}
              />

              <InfoRow
                label="Country"
                value={business.country || ''}
              />

              <InfoRow
                label="City"
                value={business.city || ''}
              />

              <InfoRow
                label="Timezone"
                value={business.timezone || ''}
              />

              <InfoRow
                label="Plan"
                value={business.subscription || 'Starter'}
              />

              <InfoRow
                label="Billing cycle"
                value={business.billing_cycle || 'Monthly'}
              />

              <InfoRow
                label="Next billing"
                value={business.next_billing_date || ''}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <UserRound className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Owner account details
                </h2>

                <p className="text-sm text-slate-500">
                  Your identity and account controls.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
              <InfoRow
                label="Full name"
                value={owner?.name || 'You'}
              />

              <InfoRow
                label="Email"
                value={owner?.email || ''}
              />

              <InfoRow
                label="Phone"
                value={owner?.phone || ''}
              />
            </div>
          </section>
        </div>

        <aside className="space-y-4 sm:space-y-6 xl:sticky xl:top-6 xl:self-start">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
            <h3 className="text-base font-semibold text-slate-900">
              Account quick actions
            </h3>

            <div className="mt-4 space-y-3">
              <Link
                href={`/dashboard/businesses/${id}/assign-leader`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-4 text-sm font-bold text-white transition hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl"
              >
                <UserRound className="h-5 w-5" />
                Assign Manager/Accountant
              </Link>

              <Link
                href="/dashboard/profile"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Open my profile
              </Link>

              <a
                href={`mailto:${owner?.email ?? ''}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Mail className="h-4 w-4" />
                Email me
              </a>

              <a
                href={`tel:${owner?.phone ?? ''}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" />
                Call me
              </a>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
            <h3 className="text-base font-semibold text-slate-900">
              Finance health summary
            </h3>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Cash balance</dt>
                <dd className="font-semibold text-slate-900">
                  {money(fin.cashBalance)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Receivables</dt>
                <dd className="font-semibold text-slate-900">
                  {money(fin.receivables)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Payables</dt>
                <dd className="font-semibold text-slate-900">
                  {money(fin.payables)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Current ratio</dt>
                <dd className="font-semibold text-slate-900">
                  {currentRatio}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Profit margin</dt>
                <dd className="font-semibold text-slate-900">
                  {profitMargin}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Overdue invoices</dt>
                <dd className="font-semibold text-amber-700">
                  {fin.overdueInvoices}
                </dd>
              </div>
            </dl>
          </section>
        </aside>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        <SimpleChart
          title="Revenue Trend"
          description="Last 6 months performance"
          data={fin.revenueTrend}
          type="line"
        />

        <SimpleChart
          title="Expense Allocation"
          description="Monthly spend by major category"
          data={fin.expenseBreakdown}
          type="pie"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
        <div className="mb-4 flex items-center gap-2 text-slate-900">
          <CalendarClock className="h-5 w-5 text-green-700" />

          <h2 className="text-lg font-semibold">
            Business finance statement snapshot
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Assets
            </h3>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {money(fin.assets)}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Cash + receivables + operating assets
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Liabilities
            </h3>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {money(fin.liabilities)}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Payables + debt obligations
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Equity
            </h3>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {money(fin.equity)}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Net position after liabilities
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}