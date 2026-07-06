'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  History,
  LayoutDashboard,
  Settings,
  Sparkles,
  User,
} from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  mobileOpen: boolean;
  onCloseAction: () => void;
};

const menuItems = [
  { name: 'Dashboard', path: '/normal', icon: LayoutDashboard },
  { name: 'Notifications', path: '/normal/notifications', icon: Bell },
  { name: 'Apply to be an Owner', path: '/normal/apply-owner', icon: BadgeCheck },
  { name: 'Profile', path: '/normal/profile', icon: User },
  { name: 'Settings', path: '/normal/settings', icon: Settings },
];

export default function Sidebar({ isOpen, mobileOpen, onCloseAction }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/normal') {
      return pathname === '/normal';
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close normal sidebar"
          className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden"
          onClick={onCloseAction}
        />
      )}

      <aside
        data-normal-sidebar
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 -translate-x-full flex-col overflow-hidden border-r border-slate-800 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:translate-x-0 lg:transition-all ${
          mobileOpen ? 'translate-x-0' : ''
        } ${isOpen ? 'lg:w-64' : 'lg:w-20'}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4 flex-none">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 font-bold text-white flex-shrink-0">
              NU
            </div>
            {isOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-bold">Normal Workspace</span>
                <span className="text-xs text-slate-400">Personal access</span>
              </div>
            )}
          </div>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4 lg:overflow-y-visible">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={onCloseAction}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'border-r-2 border-green-400 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }`}
                    title={!isOpen ? item.name : ''}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {isOpen && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        {active && <ChevronRight className="h-4 w-4" />}
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-800 p-3 flex-none">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              Upgrade path
            </div>
            {isOpen && (
              <>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  Apply to become an owner and unlock portfolio tracking, business tools, and advanced reporting.
                </p>
                <Link
                  href="/normal/apply-owner"
                  onClick={onCloseAction}
                  className="mt-4 inline-flex items-center justify-center rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  Start application
                </Link>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}