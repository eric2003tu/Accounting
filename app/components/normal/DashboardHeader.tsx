'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BadgeCheck, Bell, ChevronDown, Clock3, LogOut, Menu, Settings, Sparkles, User } from 'lucide-react';
import { clearAuth, getCurrentUser, type User as AppUser } from '@/app/lib/clients/appClient';
import { useNotifications } from '@/app/notifications/useNotifications';

type DashboardHeaderProps = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenMobileSidebar: () => void;
};

function pageTitle(pathname: string) {
  if (pathname === '/normal') return 'Dashboard';
  if (pathname.startsWith('/normal/notifications')) return 'Notifications';
  if (pathname.startsWith('/normal/apply-owner')) return 'Owner Application';
  if (pathname.startsWith('/normal/profile')) return 'Profile';
  if (pathname.startsWith('/normal/settings')) return 'Settings';
  return 'Normal Workspace';
}

function displayName(user: AppUser | null) {
  if (!user) return 'Normal User';
  const fullName = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();
  return fullName || user.name || user.email || 'Normal User';
}

export default function DashboardHeader({ sidebarOpen, onToggleSidebar, onOpenMobileSidebar }: DashboardHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { unreadCount } = useNotifications('normal');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }

    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [profileMenuOpen]);

  const title = useMemo(() => pageTitle(pathname), [pathname]);

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <header data-normal-header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileSidebar}
          className="rounded-lg p-2 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
          type="button"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>
        <button
          onClick={onToggleSidebar}
          className="hidden rounded-lg p-2 transition-colors hover:bg-slate-100 lg:block"
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          type="button"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-base font-bold text-slate-900 sm:text-lg">{title}</h1>
          <p className="flex items-center gap-1 text-xs text-slate-500">
            <Clock3 className="h-3 w-3" />
            <span className="hidden sm:inline">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="sm:hidden">
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/normal/notifications"
          className="relative rounded-lg p-2 transition-colors hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-slate-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-red-600 px-1 text-center text-[11px] font-semibold leading-5 text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Link>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setProfileMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg border-l border-slate-200 p-2 pl-2 transition-colors hover:bg-slate-50 sm:gap-3 sm:pl-4"
            type="button"
          >
            <div className="hidden flex-col items-end sm:flex">
              <p className="text-sm font-semibold text-slate-900">{displayName(currentUser)}</p>
              <p className="text-xs text-slate-500">Normal user</p>
            </div>
            <User className="h-5 w-5 text-slate-700" />
            <ChevronDown className={`h-4 w-4 text-slate-700 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.15)]">
              <div className="border-b border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-900">{displayName(currentUser)}</p>
                <p className="mt-1 text-xs text-slate-600">{currentUser?.email || 'user@accplan.com'}</p>
                <p className="mt-2 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  <Sparkles className="h-3 w-3" />
                  Normal access
                </p>
              </div>

              <div className="space-y-1 p-2">
                <Link
                  href="/normal/profile"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Link
                  href="/normal/settings"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <Link
                  href="/normal/apply-owner"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <BadgeCheck className="h-4 w-4" />
                  Apply to be an owner
                </Link>
              </div>

              <div className="border-t border-slate-200 p-2">
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm text-red-700 transition-colors hover:bg-red-50"
                  type="button"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}