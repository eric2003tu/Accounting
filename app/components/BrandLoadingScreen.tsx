'use client';

import { Loader2, Sparkles } from 'lucide-react';

type BrandLoadingScreenProps = {
  businessName?: string;
  title?: string;
  subtitle?: string;
};

export default function BrandLoadingScreen({
  businessName = 'AccPlan',
  title = 'Loading workspace',
  subtitle = 'Fetching the latest data and preparing your view.',
}: BrandLoadingScreenProps) {
  return (
    <div className="relative min-h-[60vh] overflow-hidden rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.14),_transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-6 py-10 shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:px-8 sm:py-12">
      <div className="pointer-events-none absolute -left-12 top-0 h-44 w-44 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-lime-200/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[42vh] max-w-3xl flex-col items-center justify-center text-center">
        <div className="mb-8 flex items-center gap-3 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-950 text-sm font-bold text-white shadow-[0_8px_24px_rgba(15,23,42,0.16)]">
            AC
          </span>
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">{businessName}</p>
            <p className="text-sm font-medium text-slate-600">Accounting platform</p>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-300/30 blur-2xl" />
          <div className="relative grid h-24 w-24 place-items-center rounded-[28px] border border-emerald-200 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
            <Loader2 className="h-10 w-10 animate-spin text-emerald-700" />
          </div>
          <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-lime-500" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">{subtitle}</p>

        <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
          {['Loading records', 'Syncing business data', 'Preparing template'].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-left shadow-sm backdrop-blur">
              <div className="mb-2 h-2 w-16 rounded-full bg-emerald-100" />
              <p className="text-sm font-semibold text-slate-900">{item}</p>
              <p className="mt-1 text-xs text-slate-500">Please wait a moment.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
