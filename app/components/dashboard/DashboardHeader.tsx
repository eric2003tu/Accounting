'use client';

import React from 'react';
import { Menu, Bell, Clock, User } from 'lucide-react';

type DashboardHeaderProps = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenMobileSidebar: () => void;
};

export default function DashboardHeader({
  sidebarOpen,
  onToggleSidebar,
  onOpenMobileSidebar,
}: DashboardHeaderProps) {
  return (
    <header data-dashboard-header className="flex items-center justify-between h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 sticky top-0 z-40">
      {/* Left Section */}
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
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-bold text-slate-900">Dashboard</h1>
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

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="h-5 w-5 text-slate-700" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-200">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-sm font-medium text-slate-900 font-semibold">Eric TUYISHIME</p>
            <p className="text-xs text-slate-500">Business Owner</p>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <User className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
