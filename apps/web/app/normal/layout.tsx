'use client';

import React, { useState } from 'react';
import Sidebar from '@/app/components/normal/Sidebar';
import DashboardHeader from '@/app/components/normal/DashboardHeader';
import useRequireAuth from '@/app/lib/auth/useRequireAuth';

export default function NormalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const ready = useRequireAuth(undefined, { allowedHomeRoute: '/normal' });

  if (!ready) return null;

  return (
    <div data-normal-shell className="flex h-screen overflow-hidden bg-gray-300 text-slate-900">
      <Sidebar
        isOpen={sidebarOpen}
        mobileOpen={mobileSidebarOpen}
        onCloseAction={() => setMobileSidebarOpen(false)}
      />

      <div data-normal-main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-gray-200">
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebarAction={() => setSidebarOpen(!sidebarOpen)}
          onOpenMobileSidebarAction={() => setMobileSidebarOpen(true)}
        />

        <main data-normal-scroll className="min-h-0 flex-1 overflow-y-auto bg-gray-200">
          <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}