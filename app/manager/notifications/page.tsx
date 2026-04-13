'use client';

import Link from 'next/link';
import {
  Bell,
  Building2,
  CheckCircle2,
  Clock3,
  Sparkles,
  TriangleAlert,
} from 'lucide-react';
import { useNotifications } from '@/app/notifications/useNotifications';

function severityStyles(severity: string) {
  switch (severity) {
    case 'success':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'warning':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'critical':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

function severityIcon(severity: string) {
  switch (severity) {
    case 'success':
      return CheckCircle2;
    case 'warning':
      return TriangleAlert;
    case 'critical':
      return TriangleAlert;
    default:
      return Sparkles;
  }
}

export default function DashboardNotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications('dashboard');

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-green-700">
              <Bell className="h-3.5 w-3.5" />
              Notifications
            </div>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Notification Center</h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-600 sm:text-base">
              Track daily financial statements, billing updates, and operational alerts for your assigned business.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Unread</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">{unreadCount}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Total</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">{notifications.length}</div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center justify-center rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Mark all as read
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {notifications.map((notification) => {
          const Icon = severityIcon(notification.severity);

          return (
            <article key={notification.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
              <div className="flex items-start justify-between gap-3">
                <div className={`rounded-xl border p-2 ${severityStyles(notification.severity)}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                    notification.status === 'Unread' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {notification.status}
                </span>
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900">{notification.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{notification.message}</p>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  <span>{notification.businessName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-slate-400" />
                  <span>{notification.createdAt}</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${severityStyles(notification.severity)}`}>
                  {notification.category}
                </span>
                <div className="flex items-center gap-2">
                  {notification.status === 'Unread' && (
                    <button
                      type="button"
                      onClick={() => markAsRead(notification.id)}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Mark as read
                    </button>
                  )}
                  <Link
                    href={notification.link.replace('/admin/businesses', '/manager/businesses')}
                    className="inline-flex items-center justify-center rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    {notification.actionLabel}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
