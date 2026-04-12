'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  ChevronDown,
  Mail,
  Phone,
  ShieldCheck,
  UserPlus,
  UserRound,
} from 'lucide-react';

const industries = [
  'Retail',
  'Manufacturing',
  'Technology',
  'Healthcare',
  'Hospitality',
  'Education',
  'Logistics',
  'Professional Services',
  'Other',
];

const countries = ['Rwanda', 'Kenya', 'Uganda', 'Tanzania', 'Nigeria', 'South Africa', 'Other'];

const subscriptionPlans = ['Starter', 'Growth', 'Professional', 'Enterprise'];

export default function AddBusinessOwnerPage() {
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');

  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState(industries[0]);
  const [country, setCountry] = useState(countries[0]);
  const [taxId, setTaxId] = useState('');

  const [plan, setPlan] = useState(subscriptionPlans[1]);
  const [timezone, setTimezone] = useState('Africa/Kigali');
  const [requireMfa, setRequireMfa] = useState(true);
  const [sendInvite, setSendInvite] = useState(true);
  const [status, setStatus] = useState('Invited');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      ownerName,
      ownerEmail,
      ownerPhone,
      businessName,
      industry,
      country,
      taxId,
      plan,
      timezone,
      requireMfa,
      sendInvite,
      status,
      role: 'Owner',
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] lg:p-6">
        <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-green-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-36 w-36 rounded-full bg-emerald-100/50 blur-2xl" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Users
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Add Business Owner</h1>
              <p className="mt-1 max-w-3xl text-sm text-slate-600 sm:text-base">
                Create a new owner account and provision an organization profile with the right plan,
                access controls, and onboarding settings.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Security baseline
            </div>
            <p className="mt-1 max-w-sm text-emerald-800">
              Owners are granted full business access. Enable MFA and invite verification by default.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">1. Owner profile</h2>
                <p className="text-sm text-slate-500">Primary contact details for the business owner.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Full name</span>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(event) => setOwnerName(event.target.value)}
                  placeholder="Example: Eric Tuyishime"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Email address</span>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={ownerEmail}
                    onChange={(event) => setOwnerEmail(event.target.value)}
                    placeholder="owner@business.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                  <Mail className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Phone number</span>
                <div className="relative">
                  <input
                    type="tel"
                    value={ownerPhone}
                    onChange={(event) => setOwnerPhone(event.target.value)}
                    placeholder="+250 7XX XXX XXX"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                  <Phone className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">2. Business profile</h2>
                <p className="text-sm text-slate-500">Core organization information and legal identifiers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Business name</span>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(event) => setBusinessName(event.target.value)}
                  placeholder="Example: Acme Holdings Ltd"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Industry</span>
                <div className="relative">
                  <select
                    value={industry}
                    onChange={(event) => setIndustry(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {industries.map((industryOption) => (
                      <option key={industryOption} value={industryOption}>
                        {industryOption}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Country</span>
                <div className="relative">
                  <select
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {countries.map((countryOption) => (
                      <option key={countryOption} value={countryOption}>
                        {countryOption}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Tax registration ID</span>
                <input
                  type="text"
                  value={taxId}
                  onChange={(event) => setTaxId(event.target.value)}
                  placeholder="Optional"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Access setup</h2>
                <p className="text-sm text-slate-500">Configure onboarding and authentication defaults.</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Subscription plan</span>
                <div className="relative">
                  <select
                    value={plan}
                    onChange={(event) => setPlan(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {subscriptionPlans.map((planOption) => (
                      <option key={planOption} value={planOption}>
                        {planOption}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Timezone</span>
                <input
                  type="text"
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Initial status</span>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option value="Invited">Invited</option>
                    <option value="Active">Active</option>
                    <option value="Pending Verification">Pending Verification</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <input
                  type="checkbox"
                  checked={requireMfa}
                  onChange={(event) => setRequireMfa(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-slate-700">Require multi-factor authentication on first login</span>
              </label>

              <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <input
                  type="checkbox"
                  checked={sendInvite}
                  onChange={(event) => setSendInvite(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-slate-700">Send invitation email immediately after account creation</span>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <h3 className="text-base font-semibold text-slate-900">Review</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Role</dt>
                <dd className="font-medium text-slate-900">Owner</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Business</dt>
                <dd className="font-medium text-slate-900">{businessName || 'Not set'}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Email</dt>
                <dd className="font-medium text-slate-900">{ownerEmail || 'Not set'}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Plan</dt>
                <dd className="font-medium text-slate-900">{plan}</dd>
              </div>
            </dl>

            <div className="mt-5 space-y-3">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Create Business Owner
              </button>
              <Link
                href="/admin/users"
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>
            </div>
          </section>
        </aside>
      </form>
    </div>
  );
}
