'use client';

import { Loader2 } from 'lucide-react';

type BrandLoadingScreenProps = {
  businessName?: string;
  title?: string;
  subtitle?: string;
};

export default function BrandLoadingScreen({
  businessName = 'AccPlan',
  title = 'Loading',
  subtitle = 'Preparing your workspace...',
}: BrandLoadingScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      
      {/* Small centered card */}
      <div className="relative w-full max-w-xs rounded-2xl border border-slate-200 bg-white/80 p-5 text-center shadow-[0_12px_40px_rgba(15,23,42,0.10)] backdrop-blur">

        {/* Glow */}
        <div className="pointer-events-none absolute -top-6 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-emerald-200/40 blur-2xl" />

        {/* Brand */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-xs font-bold text-white">
            AC
          </div>

          <p className="text-sm font-semibold text-slate-900">
            {businessName}
          </p>
        </div>

        {/* Spinner */}
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl border border-emerald-100 bg-emerald-50">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
        </div>

        {/* Text */}
        <h1 className="text-sm font-semibold text-slate-900">
          {title}
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          {subtitle}
        </p>

        {/* Dot loader */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        </div>
      </div>
    </div>
  );
}