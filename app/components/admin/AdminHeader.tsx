'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Bell, Clock, ShieldCheck } from 'lucide-react';

type AdminHeaderProps = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenMobileSidebar: () => void;
};

const pageTitleByPath: Record<string, string> = {
  '/admin': 'Admin Overview',
  '/admin/users': 'User Management',
  '/admin/roles': 'Role Management',
  '/admin/permissions': 'Permission Center',
  '/admin/billing': 'Billing Control',
  '/admin/integrations': 'Integrations',
  '/admin/audit-logs': 'Audit Logs',
  '/admin/reports': 'Admin Reports',
  '/admin/system': 'System Health',
};

export default function AdminHeader({
  sidebarOpen,
  onToggleSidebar,
  onOpenMobileSidebar,
}: AdminHeaderProps) {
  const pathname = usePathname();

  const title =
    pageTitleByPath[pathname] ||
    Object.entries(pageTitleByPath).find(([path]) => path !== '/admin' && pathname.startsWith(`${path}/`))?.[1] ||
    'System Admin';

  return (
    <header className="flex items-center justify-between h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden"
          aria-label="Open Sidebar"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>
        <button
          onClick={onToggleSidebar}
          className="hidden lg:block p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-bold text-slate-900">{title}</h1>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
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
        <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors" aria-label="Notifications">
          <Bell className="h-5 w-5 text-slate-700" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-200">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-sm font-semibold text-slate-900">Eric TUYISHIME</p>
            <p className="text-xs text-slate-500">System Administrator</p>
          </div>
          <button className="inline-flex items-center justify-center p-2 hover:bg-slate-100 rounded-lg transition-colors" aria-label="Admin profile">
            <ShieldCheck className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
