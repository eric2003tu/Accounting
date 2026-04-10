import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className="min-h-screen bg-white py-10 sm:py-14">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] lg:grid-cols-2">
        <div className="flex items-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
          <div className="w-full">
            <p className="inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Welcome back
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Sign in to your account</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Access reports, invoices, and your full finance workspace in seconds.
            </p>

            <form className="mt-8 space-y-5" action="#" method="post">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  Email address
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
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <Link href="#" className="text-sm font-medium text-green-700 hover:text-green-800">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500" />
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Sign In
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-600">
              New here?{' '}
              <Link href="/get-started" className="font-semibold text-green-700 hover:text-green-800">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        <div className="relative hidden min-h-[520px] lg:block">
          <Image src="/images/bg2.jpg" alt="Finance dashboard background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/80" />

          <div className="absolute inset-0 flex items-end p-10">
            <div className="max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md">
              <h2 className="text-2xl font-semibold leading-tight">Control every dollar with confidence</h2>
              <p className="mt-3 text-sm leading-7 text-slate-100">
                Track cash flow in real time, automate monthly close, and keep your team aligned with one secure accounting platform.
              </p>
              <div className="mt-4 inline-flex items-center rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-200">
                Secure. Fast. Scalable.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
