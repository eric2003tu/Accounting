"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type MockUser = {
  email: string;
  password: string;
  role: 'admin' | 'business_owner';
  label: string;
};

const mockUsers: MockUser[] = [
  {
    email: 'admin@accounting.app',
    password: 'Admin@123',
    role: 'admin',
    label: 'System Admin',
  },
  {
    email: 'owner@accounting.app',
    password: 'Owner@123',
    role: 'business_owner',
    label: 'Business Owner',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const defaultRole: 'admin' | 'business_owner' = 'business_owner';
  const defaultUser = mockUsers.find((user) => user.role === defaultRole)!;

  const [selectedRole, setSelectedRole] = useState<'admin' | 'business_owner'>(defaultRole);
  const [email, setEmail] = useState(defaultUser.email);
  const [password, setPassword] = useState(defaultUser.password);
  const [error, setError] = useState('');

  const applyRoleCredentials = (role: 'admin' | 'business_owner') => {
    const user = mockUsers.find((item) => item.role === role);
    if (!user) {
      return;
    }

    setSelectedRole(role);
    setEmail(user.email);
    setPassword(user.password);
    setError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const match = mockUsers.find(
      (user) =>
        user.role === selectedRole &&
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (!match) {
      setError('Invalid credentials for selected role. Use the matching mock account.');
      return;
    }

    localStorage.setItem(
      'mockAuthUser',
      JSON.stringify({
        email: match.email,
        role: match.role,
        label: match.label,
      })
    );

    if (match.role === 'admin') {
      router.push('/admin');
      return;
    }

    router.push('/dashboard');
  };

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

            <div className="mt-6 rounded-xl border border-green-200 bg-green-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-800">Mock Credentials</p>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">System Admin:</span> admin@accounting.app / Admin@123
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Business Owner:</span> owner@accounting.app / Owner@123
                </p>
              </div>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <p className="mb-2 block text-sm font-medium text-slate-700">Login as</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition ${selectedRole === 'business_owner' ? 'border-green-500 bg-green-50 text-green-800' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="business_owner"
                      checked={selectedRole === 'business_owner'}
                      onChange={() => applyRoleCredentials('business_owner')}
                      className="h-4 w-4 border-slate-300 text-green-600 focus:ring-green-500"
                    />
                    Business Owner
                  </label>
                  <label className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition ${selectedRole === 'admin' ? 'border-green-500 bg-green-50 text-green-800' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={selectedRole === 'admin'}
                      onChange={() => applyRoleCredentials('admin')}
                      className="h-4 w-4 border-slate-300 text-green-600 focus:ring-green-500"
                    />
                    System Admin
                  </label>
                </div>
              </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                />
              </div>

              {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                  {error}
                </p>
              )}

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
