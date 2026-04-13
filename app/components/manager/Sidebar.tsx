'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Send,
  TrendingUp,
  DollarSign,
  Landmark,
  Building2,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  mobileOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  {
    name: 'Dashboard',
    path: '/manager',
    icon: LayoutDashboard,
    badge: undefined,
  },
  {
    name: 'Transactions',
    path: '/manager/transactions',
    icon: Send,
    badge: undefined,
  },
  {
    name: 'Income',
    path: '/manager/income',
    icon: TrendingUp,
    badge: undefined,
  },
  {
    name: 'Expenses',
    path: '/manager/expenses',
    icon: DollarSign,
    badge: undefined,
  },
  {
    name: 'Loans',
    path: '/manager/loans',
    icon: Landmark,
    badge: undefined,
  },
  {
    name: 'Business Profile',
    path: '/manager/businesses/1',
    icon: Building2,
    badge: undefined,
  },
  {
    name: 'Ledger',
    path: '/manager/ledger',
    icon: BookOpen,
    badge: undefined,
  },
  {
    name: 'Reports',
    path: '/manager/reports',
    icon: BarChart3,
    badge: undefined,
  },
];

export default function Sidebar({ isOpen, mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/manager') {
      return pathname === '/manager';
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        data-dashboard-sidebar
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 -translate-x-full flex-col overflow-hidden border-r border-slate-800 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:translate-x-0 lg:transition-all ${
          mobileOpen ? 'translate-x-0' : ''
        } ${isOpen ? 'lg:w-64' : 'lg:w-20'}`}
      >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4 flex-none">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 font-bold text-white flex-shrink-0">
            AC
          </div>
          {isOpen && (
            <div className="flex flex-col">
              <span className="text-sm font-bold">Accounting</span>
              <span className="text-xs text-slate-400">Manager Console</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
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

      {/* Sidebar Footer */}
      <div className="border-t border-slate-800 p-3 flex-none">
        <ul className="space-y-2">
          <li>
            <Link
              href="/manager/settings"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-200"
              title={!isOpen ? 'Settings' : ''}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>Settings</span>}
            </Link>
          </li>
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

