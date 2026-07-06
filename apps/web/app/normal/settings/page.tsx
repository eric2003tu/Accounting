'use client';

import { useState } from 'react';
import { Bell, Lock, MoonStar, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';

const initialPreferences = {
  emailUpdates: true,
  monthlySummary: true,
  securityAlerts: true,
  productAnnouncements: false,
  appearance: 'Light',
};

const securityItems = [
  { label: 'Two-step verification', value: 'Recommended' },
  { label: 'Recovery email', value: 'Configured' },
  { label: 'Trusted device', value: 'This browser' },
  { label: 'Password age', value: 'Updated recently' },
];

export default function NormalSettingsPage() {
  const [preferences, setPreferences] = useState(initialPreferences);

  return (
    <div className="space-y-6 max-w-5xl">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
        <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Settings
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Workspace Preferences</h1>
        <p className="mt-1 text-sm text-slate-600">Customize notifications, appearance, and security before you submit your owner application.</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <h2 className="text-xl font-semibold text-slate-900">Notification Preferences</h2>
          <div className="mt-5 space-y-4">
            <ToggleRow
              icon={Bell}
              title="Email updates"
              description="Receive important account and application emails."
              checked={preferences.emailUpdates}
              onChange={() => setPreferences((current) => ({ ...current, emailUpdates: !current.emailUpdates }))}
            />
            <ToggleRow
              icon={Lock}
              title="Monthly summary"
              description="Get a concise financial summary every month."
              checked={preferences.monthlySummary}
              onChange={() => setPreferences((current) => ({ ...current, monthlySummary: !current.monthlySummary }))}
            />
            <ToggleRow
              icon={ShieldCheck}
              title="Security alerts"
              description="Enable alerts for login and credential changes."
              checked={preferences.securityAlerts}
              onChange={() => setPreferences((current) => ({ ...current, securityAlerts: !current.securityAlerts }))}
            />
            <ToggleRow
              icon={Smartphone}
              title="Product announcements"
              description="Hear about new personal workspace features."
              checked={preferences.productAnnouncements}
              onChange={() => setPreferences((current) => ({ ...current, productAnnouncements: !current.productAnnouncements }))}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Appearance</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Light', 'System'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPreferences((current) => ({ ...current, appearance: mode }))}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    preferences.appearance === mode
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-green-200 hover:bg-green-50/60'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <h2 className="text-lg font-semibold text-slate-900">Security status</h2>
            <div className="mt-4 space-y-3">
              {securityItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-700">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-900 bg-slate-900 p-6 text-white shadow-[0_12px_30px_rgba(15,23,42,0.25)]">
            <h2 className="text-lg font-semibold">Tip</h2>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              Keep security alerts enabled while you prepare the owner application so you never miss a verification step.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-200">
              <MoonStar className="h-3.5 w-3.5" aria-hidden />
              Safe by default
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

type ToggleRowProps = {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

function ToggleRow({ icon: Icon, title, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-100 p-2 text-emerald-700">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
      </div>

      <button
        type="button"
        aria-pressed={checked}
        onClick={onChange}
        className={`relative inline-flex h-10 w-20 items-center rounded-full p-1 transition ${checked ? 'bg-green-600' : 'bg-slate-300'}`}
      >
        <span className={`inline-block h-8 w-8 rounded-full bg-white shadow transition ${checked ? 'translate-x-10' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}