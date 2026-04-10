'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, CalendarDays, PencilLine, BadgeCheck, KeyRound, UserCog } from 'lucide-react';

const adminProfile = {
  fullName: 'Eric TUYISHIME',
  title: 'System Administrator',
  email: 'eric.tuyishime@company.com',
  phone: '+250 788 123 456',
  department: 'Platform Operations',
  location: 'Kigali, Rwanda',
  joinedOn: '2023-06-10',
};

const adminPrivileges = [
  'User and role management',
  'Permissions and policy enforcement',
  'Billing and subscription controls',
  'Audit log and incident review',
];

export default function AdminProfilePage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Admin Profile
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Administrator Profile</h1>
            <p className="mt-1 text-sm text-slate-600">Review identity, access scope, and administrator responsibilities.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            <PencilLine className="h-4 w-4" aria-hidden="true" />
            Edit Admin Profile
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <h2 className="text-xl font-semibold text-slate-900">Administrator Details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <InfoItem icon={UserCog} label="Full Name" value={adminProfile.fullName} />
            <InfoItem icon={ShieldCheck} label="Title" value={adminProfile.title} />
            <InfoItem icon={Mail} label="Email" value={adminProfile.email} />
            <InfoItem icon={Phone} label="Phone" value={adminProfile.phone} />
            <InfoItem icon={ShieldCheck} label="Department" value={adminProfile.department} />
            <InfoItem icon={MapPin} label="Location" value={adminProfile.location} />
            <div className="sm:col-span-2">
              <InfoItem icon={CalendarDays} label="Admin Since" value={new Date(adminProfile.joinedOn).toLocaleDateString()} />
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <h2 className="text-lg font-semibold text-slate-900">Privilege Scope</h2>
            <ul className="mt-4 space-y-3">
              {adminPrivileges.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-[0_12px_30px_rgba(15,23,42,0.25)]">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-blue-300" aria-hidden="true" />
              <h2 className="text-lg font-semibold">Security Controls</h2>
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-200">Review system hardening, policy checks, and operational controls in the system panel.</p>
            <Link
              href="/admin/system"
              className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Open System Settings
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
        <Icon className="h-3.5 w-3.5 text-blue-700" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}
