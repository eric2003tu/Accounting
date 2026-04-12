'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  FileText,
  Landmark,
  Plus,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { getAdminUserById } from '@/app/admin/data/adminDirectoryData';

const currentOwnerId = 5;

const subscriptionPlans = ['Starter', 'Growth', 'Professional', 'Enterprise'] as const;
const billingCycles = ['Monthly', 'Quarterly', 'Yearly'] as const;
const businessStatuses = ['Active', 'Under Review', 'Suspended'] as const;
const countries = ['Rwanda', 'Kenya', 'Uganda', 'Tanzania', 'Other'] as const;
const industries = [
  'Technology Services',
  'Retail',
  'Logistics',
  'Manufacturing',
  'Food Distribution',
  'Healthcare',
  'Education',
  'Construction',
  'Finance',
  'Hospitality',
  'Professional Services',
  'Other',
] as const;
const timezones = [
  'Africa/Kigali',
  'Africa/Nairobi',
  'Africa/Kampala',
  'Africa/Dar_es_Salaam',
  'Africa/Johannesburg',
  'UTC',
] as const;

type TrendRow = {
  label: string;
  value: string;
};

type BreakdownRow = {
  label: string;
  value: string;
};

const defaultRevenueTrend: TrendRow[] = [
  { label: 'Nov', value: '' },
  { label: 'Dec', value: '' },
  { label: 'Jan', value: '' },
  { label: 'Feb', value: '' },
  { label: 'Mar', value: '' },
  { label: 'Apr', value: '' },
];

const defaultExpenseBreakdown: BreakdownRow[] = [
  { label: 'Payroll', value: '' },
  { label: 'Rent', value: '' },
  { label: 'Operations', value: '' },
  { label: 'Marketing', value: '' },
  { label: 'Admin', value: '' },
];

function money(value: number) {
  return `$${value.toLocaleString()}`;
}

export default function AddBusinessPage() {
  const owner = getAdminUserById(currentOwnerId);

  const [businessName, setBusinessName] = useState('');
  const [legalName, setLegalName] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [industry, setIndustry] = useState<(typeof industries)[number]>(industries[0]);
  const [taxId, setTaxId] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [country, setCountry] = useState<(typeof countries)[number]>(countries[0]);
  const [city, setCity] = useState('');
  const [timezone, setTimezone] = useState<(typeof timezones)[number]>(timezones[0]);
  const [subscription, setSubscription] = useState<(typeof subscriptionPlans)[number]>(subscriptionPlans[0]);
  const [billingCycle, setBillingCycle] = useState<(typeof billingCycles)[number]>(billingCycles[0]);
  const [nextBillingDate, setNextBillingDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<(typeof businessStatuses)[number]>('Active');
  const [monthlyRevenue, setMonthlyRevenue] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [cashBalance, setCashBalance] = useState('');
  const [receivables, setReceivables] = useState('');
  const [payables, setPayables] = useState('');
  const [assets, setAssets] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [overdueInvoices, setOverdueInvoices] = useState('0');
  const [revenueTrend, setRevenueTrend] = useState<TrendRow[]>(defaultRevenueTrend);
  const [expenseBreakdown, setExpenseBreakdown] = useState<BreakdownRow[]>(defaultExpenseBreakdown);

  const parsedRevenue = Number.parseFloat(monthlyRevenue || '0');
  const parsedExpenses = Number.parseFloat(monthlyExpenses || '0');
  const parsedCashBalance = Number.parseFloat(cashBalance || '0');
  const parsedReceivables = Number.parseFloat(receivables || '0');
  const parsedPayables = Number.parseFloat(payables || '0');
  const parsedAssets = Number.parseFloat(assets || '0');
  const parsedLiabilities = Number.parseFloat(liabilities || '0');
  const parsedOverdueInvoices = Number.parseInt(overdueInvoices || '0', 10);

  const netProfit = useMemo(() => parsedRevenue - parsedExpenses, [parsedRevenue, parsedExpenses]);
  const equity = useMemo(() => parsedAssets - parsedLiabilities, [parsedAssets, parsedLiabilities]);

  const ownerName = owner?.name || 'Current owner';

  const handleTrendChange = (index: number, field: keyof TrendRow, value: string) => {
    setRevenueTrend((current) => current.map((row, currentIndex) => (currentIndex === index ? { ...row, [field]: value } : row)));
  };

  const handleBreakdownChange = (index: number, field: keyof BreakdownRow, value: string) => {
    setExpenseBreakdown((current) => current.map((row, currentIndex) => (currentIndex === index ? { ...row, [field]: value } : row)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id: Date.now(),
      businessName,
      legalName,
      tradeName,
      taxId,
      registrationNo,
      industry,
      country,
      city,
      timezone,
      subscription,
      billingCycle,
      nextBillingDate,
      status,
      ownerId: currentOwnerId,
      financials: {
        monthlyRevenue: parsedRevenue,
        monthlyExpenses: parsedExpenses,
        netProfit,
        cashBalance: parsedCashBalance,
        receivables: parsedReceivables,
        payables: parsedPayables,
        assets: parsedAssets,
        liabilities: parsedLiabilities,
        equity,
        overdueInvoices: parsedOverdueInvoices,
        revenueTrend: revenueTrend
          .filter((row) => row.label.trim() !== '' || row.value.trim() !== '')
          .map((row) => ({ label: row.label.trim(), value: Number.parseFloat(row.value || '0') })),
        expenseBreakdown: expenseBreakdown
          .filter((row) => row.label.trim() !== '' || row.value.trim() !== '')
          .map((row) => ({ label: row.label.trim(), value: Number.parseFloat(row.value || '0') })),
      },
    };

    console.log(payload);
  };

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] lg:p-6">
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
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Create a New Business</h1>
              <p className="mt-1 max-w-3xl text-sm text-slate-600 sm:text-base">
                Set up a complete business profile, including registration details, operating location, subscription plan, and opening financial balances.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Owner assignment
            </div>
            <p className="mt-1 max-w-sm text-emerald-800">This business will be created under {ownerName}.</p>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">1. Business identity</h2>
                <p className="text-sm text-slate-500">Give the company its full and public-facing identity.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Business name <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Example: Acme Holdings"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Legal name <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  placeholder="Example: Acme Holdings Ltd"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Trade name</span>
                <input
                  type="text"
                  value={tradeName}
                  onChange={(e) => setTradeName(e.target.value)}
                  placeholder="Example: Acme"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Industry <span className="text-red-500">*</span></span>
                <div className="relative">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value as (typeof industries)[number])}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {industries.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Tax ID / TIN <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  placeholder="Example: TIN-12345678"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Registration number <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  value={registrationNo}
                  onChange={(e) => setRegistrationNo(e.target.value)}
                  placeholder="Example: RDB-2026-000001"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">2. Location and operations</h2>
                <p className="text-sm text-slate-500">Tell us where the business operates and which timezone it follows.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Country <span className="text-red-500">*</span></span>
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value as (typeof countries)[number])}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {countries.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">City <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Example: Kigali"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Timezone <span className="text-red-500">*</span></span>
                <div className="relative">
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value as (typeof timezones)[number])}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {timezones.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Status <span className="text-red-500">*</span></span>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as (typeof businessStatuses)[number])}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {businessStatuses.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                <CircleDollarSign className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">3. Subscription and billing</h2>
                <p className="text-sm text-slate-500">Set the plan and billing cadence for the new business.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Subscription plan <span className="text-red-500">*</span></span>
                <div className="relative">
                  <select
                    value={subscription}
                    onChange={(e) => setSubscription(e.target.value as (typeof subscriptionPlans)[number])}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {subscriptionPlans.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Billing cycle <span className="text-red-500">*</span></span>
                <div className="relative">
                  <select
                    value={billingCycle}
                    onChange={(e) => setBillingCycle(e.target.value as (typeof billingCycles)[number])}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {billingCycles.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Next billing date <span className="text-red-500">*</span></span>
                <div className="relative">
                  <input
                    type="date"
                    value={nextBillingDate}
                    onChange={(e) => setNextBillingDate(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                  <CalendarDays className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                <div className="flex items-center gap-2 font-semibold">
                  <BadgeCheck className="h-4 w-4" />
                  Ownership
                </div>
                <p className="mt-1 text-emerald-800">This record will be assigned to the signed-in owner automatically.</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">4. Opening financials</h2>
                <p className="text-sm text-slate-500">Enter the current month baseline so dashboards and ratios start with real values.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Monthly revenue <span className="text-red-500">*</span></span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Monthly expenses <span className="text-red-500">*</span></span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Cash balance <span className="text-red-500">*</span></span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={cashBalance}
                  onChange={(e) => setCashBalance(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Receivables <span className="text-red-500">*</span></span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={receivables}
                  onChange={(e) => setReceivables(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Payables <span className="text-red-500">*</span></span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={payables}
                  onChange={(e) => setPayables(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Assets <span className="text-red-500">*</span></span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={assets}
                  onChange={(e) => setAssets(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Liabilities <span className="text-red-500">*</span></span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={liabilities}
                  onChange={(e) => setLiabilities(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Overdue invoices</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={overdueInvoices}
                  onChange={(e) => setOverdueInvoices(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>
            </div>

            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              Net profit will be calculated from revenue minus expenses. Equity is calculated from assets minus liabilities.
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">5. Revenue trend</h2>
                <p className="text-sm text-slate-500">Optional historical monthly values for charts and comparisons.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {revenueTrend.map((row, index) => (
                <div key={`${row.label}-${index}`} className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 p-4">
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Month</span>
                    <input
                      type="text"
                      value={row.label}
                      onChange={(e) => handleTrendChange(index, 'label', e.target.value)}
                      placeholder="Jan"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Revenue</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={row.value}
                      onChange={(e) => handleTrendChange(index, 'value', e.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                  </label>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">6. Expense breakdown</h2>
                <p className="text-sm text-slate-500">Optional category breakdown for dashboards and monthly analysis.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {expenseBreakdown.map((row, index) => (
                <div key={`${row.label}-${index}`} className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 p-4">
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Category</span>
                    <input
                      type="text"
                      value={row.label}
                      onChange={(e) => handleBreakdownChange(index, 'label', e.target.value)}
                      placeholder="Payroll"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Amount</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={row.value}
                      onChange={(e) => handleBreakdownChange(index, 'value', e.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                  </label>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-[0_10px_28px_rgba(15,23,42,0.16)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-2 text-emerald-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Business Preview</h2>
                <p className="text-sm text-slate-300">Live summary of the profile you are creating</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Business</span>
                <span className="max-w-[160px] truncate font-semibold text-white">{businessName || 'Not set'}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Industry</span>
                <span className="font-semibold text-white">{industry}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Plan</span>
                <span className="font-semibold text-white">{subscription}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Net profit</span>
                <span className="font-semibold text-white">{money(netProfit)}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Equity</span>
                <span className="font-semibold text-white">{money(equity)}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Overdue invoices</span>
                <span className="font-semibold text-white">{parsedOverdueInvoices}</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Submission checklist</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {[
                'Legal identity matches registration documents',
                'Location and timezone are correct',
                'Plan, billing cycle, and next billing date are set',
                'Opening balances are realistic and complete',
                'Revenue and expense trend values are entered if available',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 px-4 py-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                Create Business
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Wallet className="h-4 w-4" />
                Save as Draft
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <CircleDollarSign className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Pro tips</h2>
                <p className="text-sm text-slate-500">Start the record clean so reports stay accurate later</p>
              </div>
            </div>

            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                Use the legal name exactly as it appears on registration papers.
              </li>
              <li className="flex gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                Keep the trade name short and consistent with invoices or signage.
              </li>
              <li className="flex gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                Enter opening balances from the latest bank statement or management accounts.
              </li>
            </ul>
          </section>
        </aside>
      </form>
    </div>
  );
}