'use client';

import React, { useState } from 'react';
import Sidebar from '../components/manager/Sidebar';
import DashboardHeader from '../components/manager/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div data-dashboard-shell className="flex h-screen overflow-hidden bg-gray-300 text-slate-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div data-dashboard-main className="flex flex-1 min-h-0 flex-col overflow-hidden bg-gray-200">
        {/* Dashboard Header */}
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* Main Content Area */}
        <main data-dashboard-scroll className="min-h-0 flex-1 overflow-y-auto bg-gray-200">
          <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

