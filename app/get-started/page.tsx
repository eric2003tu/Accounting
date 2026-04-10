"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function GetStartedPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="h-[calc(100svh-8.5rem)] min-h-[680px] bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid h-full w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] lg:grid-cols-2">
        <div className="flex items-center px-6 py-6 sm:px-8 sm:py-8 lg:px-10">
          <div className="w-full">
            <p className="inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Get started
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Create your account</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Set up your workspace and start managing your business finances with confidence.
            </p>

            <form className="mt-6 space-y-4" action="#" method="post">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Create a strong password"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-500 transition hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-slate-600">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500" />
                I agree to the Terms of Service and Privacy Policy.
              </label>

              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Create Account
              </button>
            </form>

            <p className="mt-4 text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-green-700 hover:text-green-800">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="relative hidden h-full lg:block">
          <Image src="/images/bg3.jpg" alt="Accounting workspace" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/80" />

          <div className="absolute inset-0 flex items-end p-10">
            <div className="max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md">
              <h2 className="text-2xl font-semibold leading-tight">Launch your finance workspace in minutes</h2>
              <p className="mt-3 text-sm leading-7 text-slate-100">
                Bring invoices, expenses, reporting, and team collaboration into one streamlined platform built for growth.
              </p>
              <div className="mt-4 inline-flex items-center rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-200">
                Reliable. Simple. Powerful.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
