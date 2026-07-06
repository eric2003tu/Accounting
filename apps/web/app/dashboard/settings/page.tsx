'use client';

import React from 'react';
import { User, Lock, Bell, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your account and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Profile Settings */}
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
          <button className="w-full flex items-center gap-4 p-6 hover:bg-slate-50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-slate-900">Profile Settings</h3>
              <p className="text-sm text-slate-500 mt-1">Manage your account information</p>
            </div>
            <div className="text-slate-400">→</div>
          </button>
        </div>

        {/* Security Settings */}
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
          <button className="w-full flex items-center gap-4 p-6 hover:bg-slate-50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <Lock className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-slate-900">Security</h3>
              <p className="text-sm text-slate-500 mt-1">Change password and authentication settings</p>
            </div>
            <div className="text-slate-400">→</div>
          </button>
        </div>

        {/* Notification Settings */}
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
          <button className="w-full flex items-center gap-4 p-6 hover:bg-slate-50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Bell className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
              <p className="text-sm text-slate-500 mt-1">Manage email and alert preferences</p>
            </div>
            <div className="text-slate-400">→</div>
          </button>
        </div>

        {/* Billing Settings */}
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
          <button className="w-full flex items-center gap-4 p-6 hover:bg-slate-50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-slate-900">Billing</h3>
              <p className="text-sm text-slate-500 mt-1">Manage subscription and payment methods</p>
            </div>
            <div className="text-slate-400">→</div>
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Need Help?</h3>
        <p className="text-slate-600 mb-4">
          If you need assistance with your account or have questions, please contact our support team.
        </p>
        <button className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}
