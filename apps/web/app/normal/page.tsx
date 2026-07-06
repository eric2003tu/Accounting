'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  FileText,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import QuickActionButton from '@/app/components/dashboard/QuickActionButton';
import SimpleChart from '@/app/components/dashboard/SimpleChart';
import StatCard from '@/app/components/dashboard/StatCard';
import SummaryCard from '@/app/components/dashboard/SummaryCard';
import TransactionCard from '@/app/components/dashboard/TransactionCard';
import { useNotifications } from '@/app/notifications/useNotifications';

type ActivityItem = {
  icon: typeof ArrowUpRight;
  category: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
};

const overviewTrend = [
  { label: 'Jan', value: 1260 },
  { label: 'Feb', value: 1385 },
  { label: 'Mar', value: 1490 },
  { label: 'Apr', value: 1580 },
  { label: 'May', value: 1745 },
  { label: 'Jun', value: 1910 },
];

const activityFeed: ActivityItem[] = [
  {
    icon: ArrowUpRight,
    category: 'Salary deposit',
    description: 'Payroll transfer received into your primary account',
    amount: 2450,
    date: 'Today',
    type: 'income',
  },
  {
    icon: ArrowDownLeft,
    category: 'Rent payment',
    description: 'Monthly housing transfer completed',
    amount: 680,
    date: 'Yesterday',
    type: 'expense',
  },
  {
    icon: ArrowDownLeft,
    category: 'Subscriptions',
    description: 'Cloud storage and productivity tools',
    amount: 94,
    date: '2026-04-10',
    type: 'expense',
  },
  {
    icon: ArrowUpRight,
    category: 'Freelance income',
    description: 'Design project milestone payment',
    amount: 840,
    date: '2026-04-08',
    type: 'income',
  },
];

export default function NormalDashboardPage() {
  const router = useRouter();
  const { unreadCount } = useNotifications('normal');

  const savingsRate = 38;
  const profileCompletion = 72;
  const ownerReadiness = 64;

  const readinessItems = [
    { label: 'Identity verified', value: 'Complete', color: 'text-green-600' as const },
    { label: 'Business concept', value: 'Drafted', color: 'text-slate-900' as const },
    { label: 'Support documents', value: '2 remaining', color: 'text-amber-600' as const },
    { label: 'Application status', value: 'Not submitted', color: 'text-slate-900' as const },
  ];

  const quickActions = [
    {
      icon: BadgeCheck,
      label: 'Apply to be an owner',
      description: 'Open the guided application flow',
      action: () => router.push('/normal/apply-owner'),
      variant: 'primary' as const,
    },
    {
      icon: FileText,
      label: 'Review profile',
      description: 'Make sure your details are ready',
      action: () => router.push('/normal/profile'),
      variant: 'secondary' as const,
    },
    {
      icon: Sparkles,
      label: 'Open notifications',
      description: 'See the latest account updates',
      action: () => router.push('/normal/notifications'),
      variant: 'secondary' as const,
    },
    {
      icon: Target,
      label: 'Workspace settings',
      description: 'Tune preferences and security',
      action: () => router.push('/normal/settings'),
      variant: 'secondary' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.35fr_0.85fr] lg:p-7">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900 p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.24)] sm:p-7">
            <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">
                <Wallet className="h-3.5 w-3.5" />
                Personal workspace
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Your financial dashboard, tuned for growth.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                Track your spending, review progress, and prepare a polished application when you are ready to upgrade to an owner account.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/normal/apply-owner"
                  className="inline-flex items-center justify-center rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  Apply to become an owner
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Account snapshot</p>
              <p className="mt-2 text-xl font-bold text-slate-900">Ready for next step</p>
              <p className="mt-1 text-sm text-slate-600">
                {unreadCount} unread notifications and a {ownerReadiness}% owner readiness score.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Profile</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{profileCompletion}%</p>
                <p className="text-sm text-slate-600">completion</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Savings</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{savingsRate}%</p>
                <p className="text-sm text-slate-600">monthly rate</p>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Next best action</p>
              <p className="mt-2 text-sm leading-6 text-emerald-900">
                Finish the owner application checklist, then submit your request when your profile is complete.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <div>
          <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Key metrics</h2>
          <Link href="/normal/apply-owner" className="text-sm font-semibold text-green-700 transition hover:text-green-800">
            Continue application
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Savings Rate" value={`${savingsRate}%`} description="Above your personal target" icon={TrendingUp} trend={{ value: 6, isPositive: true }} />
          <StatCard title="Profile Completion" value={`${profileCompletion}%`} description="Complete your identity and contact details" icon={ShieldCheck} trend={{ value: 8, isPositive: true }} />
          <StatCard title="Unread Notifications" value={unreadCount} description="Items needing attention" icon={Sparkles} />
          <StatCard title="Owner Readiness" value={`${ownerReadiness}%`} description="Checklist progress" icon={BadgeCheck} trend={{ value: 4, isPositive: true }} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <SimpleChart
          title="Spending and savings trend"
          description="A six-month view of your personal cash flow growth."
          data={overviewTrend}
          type="line"
        />

        <SummaryCard
          title="Application readiness"
          items={readinessItems}
          footer="Use this checklist before submitting your owner application."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Recent activity</h2>
          </div>

          <div className="space-y-3">
            {activityFeed.map((item, index) => (
              <TransactionCard
                key={`${item.date}-${item.category}-${index}`}
                icon={item.icon}
                category={item.category}
                description={item.description}
                amount={item.amount}
                date={item.date}
                type={item.type}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Quick actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {quickActions.map((action) => (
              <QuickActionButton
                key={action.label}
                icon={action.icon}
                label={action.label}
                description={action.description}
                onClick={action.action}
                variant={action.variant}
                className="justify-start rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}