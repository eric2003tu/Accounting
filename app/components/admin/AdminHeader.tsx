"use client";
import Link from 'next/link';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Clock, ShieldCheck, LogOut, Settings, ChevronDown } from 'lucide-react';

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
  const router = useRouter();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
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

  const handleLogout = () => {
    localStorage.removeItem('mockAuthUser');
    router.push('/login');
  };

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

        {/* Admin Profile with Dropdown */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-200 hover:bg-slate-50 rounded-lg p-2 transition-colors"
          >
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-sm font-semibold text-slate-900">Eric TUYISHIME</p>
              <p className="text-xs text-slate-500">System Administrator</p>
            </div>
            <ShieldCheck className="h-5 w-5 text-slate-700" />
            <ChevronDown className={`h-4 w-4 text-slate-700 transition-transform ${
              profileMenuOpen ? 'rotate-180' : ''
            }`} />
          </button>

          {/* Dropdown Menu */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.15)] z-50">
              {/* User Info */}
              <div className="border-b border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-900">Eric TUYISHIME</p>
                <p className="text-xs text-slate-600 mt-1">eric.tuyishime@company.com</p>
                <p className="text-xs text-blue-700 font-medium mt-2">System Administrator</p>
              </div>

              {/* Menu Items */}
              <div className="p-2 space-y-1">
                <Link
                  href="/admin/profile"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Profile
                </Link>
                <Link
                  href="/admin/profile"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-slate-200 p-2">
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50 rounded-lg transition-colors"
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
