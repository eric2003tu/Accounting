'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Building2, ShieldCheck, CalendarDays, PencilLine, BadgeCheck } from 'lucide-react';

const profile = {
  fullName: 'Arielle Mukamana',
  role: 'Business Manager',
  email: 'arielle.mukamana@acme.com',
  phone: '+250 788 123 456',
  company: 'Accounting App Ltd',
  location: 'Kigali, Rwanda',
  joinedOn: '2024-01-15',
};

const accessSummary = [
  { label: 'Dashboard Access', value: 'Full' },
  { label: 'Reports', value: 'Read & Export' },
  { label: 'Transactions', value: 'Create & Manage' },
  { label: 'Billing', value: 'Owner Only' },
];

export default function DashboardProfilePage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
              Profile
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">My Profile</h1>
            <p className="mt-1 text-sm text-slate-600">Manage your account identity and business contact details.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700">
            <PencilLine className="h-4 w-4" aria-hidden />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <h2 className="text-xl font-semibold text-slate-900">Account Information</h2>
          <div className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem icon={Building2} label="Full Name" value={profile.fullName} />
              <InfoItem icon={ShieldCheck} label="Role" value={profile.role} />
              <InfoItem icon={Mail} label="Email" value={profile.email} />
              <InfoItem icon={Phone} label="Phone" value={profile.phone} />
              <InfoItem icon={Building2} label="Company" value={profile.company} />
              <InfoItem icon={MapPin} label="Location" value={profile.location} />
            </div>
            <InfoItem icon={CalendarDays} label="Joined" value={new Date(profile.joinedOn).toLocaleDateString()} />
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <h2 className="text-lg font-semibold text-slate-900">Access Summary</h2>
            <div className="mt-4 space-y-3">
              {accessSummary.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-700">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-[0_12px_30px_rgba(15,23,42,0.25)]">
            <h2 className="text-lg font-semibold">Need to update preferences?</h2>
            <p className="mt-2 text-sm leading-7 text-slate-200">Manage password, alerts, and account preferences from the settings area.</p>
            <Link
              href="/manager/settings"
              className="mt-4 inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Go to Settings
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}

type InfoItemProps = {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  label: string;
  value: string;
};

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        <Icon className="h-3.5 w-3.5 text-green-700" aria-hidden />
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

