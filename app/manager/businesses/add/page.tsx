'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus } from 'lucide-react';
import { businessClient } from '@/app/lib/apiClients';
import type { CreateBusinessPayload } from '@/app/lib/clients/businessClient';

export default function AddBusinessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [fiscalYearStart, setFiscalYearStart] = useState(`${new Date().getFullYear()}-01-01`);
  const [startingMoney, setStartingMoney] = useState('0');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload: CreateBusinessPayload = {
        name: name.trim(),
        contact_email: contactEmail.trim() || undefined,
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
        fiscal_year_start: fiscalYearStart,
        starting_money: Number.parseFloat(startingMoney || '0'),
        loans: [],
        loans_offered: [],
      };

      await businessClient.create(payload);
      router.push('/manager/businesses');
    } catch (err: any) {
      setError(err?.body || err?.message || 'Failed to create business.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] lg:p-6">
        <div className="space-y-2">
          <Link
            href="/manager/businesses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Businesses
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Create a New Business</h1>
          <p className="text-sm text-slate-600 sm:text-base">Only CreateBusinessDto fields are accepted by this form.</p>
        </div>
      </section>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Business name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Umusingi"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Contact email</span>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="eric@gmail.com"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Phone</span>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0783687408"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Address</span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Kigali - Rwanda"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Fiscal year start</span>
            <input
              type="date"
              value={fiscalYearStart}
              onChange={(e) => setFiscalYearStart(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Starting money</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={startingMoney}
              onChange={(e) => setStartingMoney(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </label>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {loading ? 'Creating...' : 'Create Business'}
          </button>
        </div>
      </form>
    </div>
  );
}
