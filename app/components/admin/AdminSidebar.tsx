'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  Users,
  Building2,
  UserCog,
  KeyRound,
  CreditCard,
  Plug,
  FileSearch,
  ChartColumn,
  Server,
  ChevronRight,
  ArrowLeftRight,
  LogOut,
} from 'lucide-react';

type AdminSidebarProps = {
  isOpen: boolean;
  mobileOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  { name: 'Overview', path: '/admin', icon: Shield },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Businesses', path: '/admin/businesses', icon: Building2 },
  { name: 'Roles', path: '/admin/roles', icon: UserCog },
  { name: 'Permissions', path: '/admin/permissions', icon: KeyRound },
  { name: 'Billing', path: '/admin/billing', icon: CreditCard },
  { name: 'Integrations', path: '/admin/integrations', icon: Plug },
  { name: 'Audit Logs', path: '/admin/audit-logs', icon: FileSearch },
  { name: 'Reports', path: '/admin/reports', icon: ChartColumn },
  { name: 'System', path: '/admin/system', icon: Server },
];

export default function AdminSidebar({ isOpen, mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close admin sidebar"
          className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 -translate-x-full flex-col overflow-hidden border-r border-slate-800 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:translate-x-0 lg:transition-all ${
          mobileOpen ? 'translate-x-0' : ''
        } ${isOpen ? 'lg:w-64' : 'lg:w-20'}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4 flex-none">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 font-bold text-white flex-shrink-0">
              SA
            </div>
            {isOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-bold">System Admin</span>
                <span className="text-xs text-slate-400">Control Plane</span>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 min-h-0">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-r-2 border-green-400'
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
          <ul className="space-y-2">
            {/* <li>
              <Link
                href="/dashboard"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-200"
                title={!isOpen ? 'Business Dashboard' : ''}
              >
                <ArrowLeftRight className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span>Business Dashboard</span>}
              </Link>
            </li> */}
            <li>
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200"
                title={!isOpen ? 'Logout' : ''}
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span>Logout</span>}
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
