'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  Check,
  ChevronRight,
  Mail,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';
import { getAdminBusinessById, getAdminUserById, adminUsers } from '@/app/admin/data/adminDirectoryData';

const currentOwnerId = 5;

interface AssignmentState {
  selectedUserId: number | null;
  searchQuery: string;
  isSubmitting: boolean;
  successMessage: string;
  errorMessage: string;
  showCreateForm: boolean;
}

interface CreateAccountantForm {
  name: string;
  email: string;
  phone: string;
  department: string;
}

export default function AssignLeaderPage() {
  const params = useParams();
  const router = useRouter();
  
  const [state, setState] = useState<AssignmentState>({
    selectedUserId: null,
    searchQuery: '',
    isSubmitting: false,
    successMessage: '',
    errorMessage: '',
    showCreateForm: false,
  });

  const [createForm, setCreateForm] = useState<CreateAccountantForm>({
    name: '',
    email: '',
    phone: '',
    department: 'Finance',
  });

  const [createdAccountants, setCreatedAccountants] = useState<any[]>([]);

  const id = params.id as string;
  const businessId = Number(id);
  const business = getAdminBusinessById(businessId);
  const owner = getAdminUserById(currentOwnerId);

  // Validation - redirect if unauthorized or not found
  React.useEffect(() => {
    if (!business || business.ownerId !== currentOwnerId || !owner) {
      router.push('/manager/businesses');
    }
  }, [business, owner, router]);

  // Filter available accountants (active status, Accountant role)
  const availableAccountants = useMemo(() => {
    const allAccountants = [...adminUsers, ...createdAccountants].filter(
      (user) =>
        user.role === 'Accountant' &&
        user.status === 'Active' &&
        (state.searchQuery === '' ||
          user.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(state.searchQuery.toLowerCase()))
    );
    return allAccountants;
  }, [state.searchQuery, createdAccountants]);

  // Get selected user from both original and created accountants
  const selectedUser = state.selectedUserId 
    ? getAdminUserById(state.selectedUserId) || createdAccountants.find(u => u.id === state.selectedUserId)
    : null;

  // Guard: Don't render if business or owner is invalid
  if (!business || business.ownerId !== currentOwnerId || !owner) {
    return null;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      searchQuery: e.target.value,
      errorMessage: '',
    }));
  };

  const handleSelectUser = (userId: number) => {
    setState((prev) => ({
      ...prev,
      selectedUserId: userId,
      errorMessage: '',
    }));
  };

  const handleCreateAccountant = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!createForm.name.trim() || !createForm.email.trim() || !createForm.phone.trim()) {
      setState((prev) => ({
        ...prev,
        errorMessage: 'Please fill in all fields.',
      }));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(createForm.email)) {
      setState((prev) => ({
        ...prev,
        errorMessage: 'Please enter a valid email address.',
      }));
      return;
    }

    // Create new accountant
    const newAccountant = {
      id: Math.max(...adminUsers.map(u => u.id), ...createdAccountants.map(u => u.id), 0) + 1,
      name: createForm.name.trim(),
      email: createForm.email.trim(),
      phone: createForm.phone.trim(),
      role: 'Accountant' as const,
      status: 'Active' as const,
      mfa: 'Pending' as const,
      lastLogin: '-',
      joinedAt: new Date().toISOString().split('T')[0],
      department: createForm.department,
      isNewlyCreated: true,
    };

    // Add to created accountants
    setCreatedAccountants((prev) => [...prev, newAccountant]);

    // Auto-select the newly created accountant
    setState((prev) => ({
      ...prev,
      selectedUserId: newAccountant.id,
      showCreateForm: false,
      successMessage: `${newAccountant.name} has been created successfully! Ready to assign.`,
    }));

    // Reset form
    setCreateForm({
      name: '',
      email: '',
      phone: '',
      department: 'Finance',
    });

    // Clear success message after 3 seconds
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        successMessage: '',
      }));
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) {
      setState((prev) => ({
        ...prev,
        errorMessage: 'Please select an accountant to assign.',
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isSubmitting: true,
      errorMessage: '',
    }));

    // Simulate API call
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        successMessage: `${selectedUser.name} has been successfully assigned as the manager/accountant for ${business.businessName}!`,
      }));

      // Reset form after 2 seconds
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          selectedUserId: null,
          searchQuery: '',
          successMessage: '',
        }));
      }, 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] lg:p-6">
        <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-green-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-36 w-36 rounded-full bg-emerald-100/50 blur-2xl" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Link
              href={`/manager/businesses/${businessId}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Business Profile
            </Link>

            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700 mb-3">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                Manager Assignment
              </p>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Assign Business Manager</h1>
              <p className="mt-1 max-w-3xl text-sm text-slate-600 sm:text-base">
                Assign a qualified accountant as the manager/leader for <span className="font-semibold text-slate-900">{business.businessName}</span>. They will have full access to manage financial records and operations.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <div className="flex items-center gap-2 font-semibold">
              <Briefcase className="h-4 w-4" />
              Business details
            </div>
            <p className="mt-1 max-w-sm text-emerald-800">
              {business.businessName} • Subscription: {business.subscription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Assignment Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Search Section */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-green-100 p-2 text-green-700">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Find an Accountant</h2>
                  <p className="text-sm text-slate-500">Search and select a qualified accountant from your organization.</p>
                </div>
              </div>

              {/* Search Input */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
                  Search by name or email
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden />
                  <input
                    id="search"
                    type="text"
                    value={state.searchQuery}
                    onChange={handleSearch}
                    placeholder="Type name or email..."
                    className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>

              {/* Accountants Dropdown */}
              <div>
                <label htmlFor="accountant-select" className="block text-sm font-medium text-slate-700 mb-2">
                  Select an Accountant <span className="text-red-500">*</span>
                </label>
                <select
                  id="accountant-select"
                  value={state.selectedUserId || ''}
                  onChange={(e) => handleSelectUser(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                >
                  <option value="">
                    {availableAccountants.length === 0 
                      ? (state.searchQuery ? 'No accountants found' : 'No active accountants available')
                      : 'Choose an accountant...'}
                  </option>
                  {availableAccountants.map((accountant) => (
                    <option key={accountant.id} value={accountant.id}>
                      {accountant.name} ({accountant.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Accountant Details Card */}
              {selectedUser && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
                  <h3 className="mb-4 text-base font-semibold text-slate-900">Accountant Details</h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 rounded-lg bg-white p-4 border border-green-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <User className="h-6 w-6 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-slate-900">{selectedUser.name}</p>
                          {selectedUser.isNewlyCreated && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                              <Plus className="h-3 w-3" />
                              New
                            </span>
                          )}
                          {selectedUser.mfa === 'Enabled' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                              <BadgeCheck className="h-3 w-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{selectedUser.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-lg bg-white p-3 border border-slate-200">
                        <span className="block text-slate-600 text-xs font-medium">Phone</span>
                        <span className="font-semibold text-slate-900">{selectedUser.phone}</span>
                      </div>
                      <div className="rounded-lg bg-white p-3 border border-slate-200">
                        <span className="block text-slate-600 text-xs font-medium">Department</span>
                        <span className="font-semibold text-slate-900">{selectedUser.department}</span>
                      </div>
                      <div className="rounded-lg bg-white p-3 border border-slate-200">
                        <span className="block text-slate-600 text-xs font-medium">Status</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 font-semibold text-xs">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          {selectedUser.status}
                        </span>
                      </div>
                      <div className="rounded-lg bg-white p-3 border border-slate-200">
                        <span className="block text-slate-600 text-xs font-medium">MFA Status</span>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          selectedUser.mfa === 'Enabled' 
                            ? 'bg-green-100 text-green-700' 
                            : selectedUser.mfa === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {selectedUser.mfa}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Create New Accountant Toggle */}
              <button
                type="button"
                onClick={() => setState((prev) => ({ ...prev, showCreateForm: !prev.showCreateForm, errorMessage: '' }))}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                <Plus className="h-4 w-4" />
                {state.showCreateForm ? 'Cancel' : 'Create New Accountant'}
              </button>

              {/* Create Accountant Form */}
              {state.showCreateForm && (
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                  <h3 className="mb-4 text-base font-semibold text-slate-900">Create New Accountant</h3>

                  <div className="space-y-4">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></span>
                      <input
                        type="text"
                        value={createForm.name}
                        onChange={(e) => setCreateForm((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="E.g. John Doe"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-700">Email Address <span className="text-red-500">*</span></span>
                      <input
                        type="email"
                        value={createForm.email}
                        onChange={(e) => setCreateForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="E.g. john@company.com"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-700">Phone Number <span className="text-red-500">*</span></span>
                      <input
                        type="tel"
                        value={createForm.phone}
                        onChange={(e) => setCreateForm((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="E.g. +250 721 234 567"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-700">Department</span>
                      <select
                        value={createForm.department}
                        onChange={(e) => setCreateForm((prev) => ({ ...prev, department: e.target.value }))}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      >
                        <option>Finance</option>
                        <option>Accounting</option>
                        <option>Operations</option>
                        <option>Other</option>
                      </select>
                    </label>

                    <button
                      type="button"
                      onClick={handleCreateAccountant}
                      className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Create & Select Accountant
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* Error Message */}
            {state.errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-900">{state.errorMessage}</p>
              </div>
            )}

            {/* Success Message */}
            {state.successMessage && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <p className="text-sm font-semibold text-green-900">{state.successMessage}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                type="submit"
                disabled={!selectedUser || state.isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <Check className="h-4 w-4" />
                {state.isSubmitting ? 'Assigning...' : 'Assign Manager'}
              </button>
              <Link
                href={`/manager/businesses/${businessId}`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Sidebar - Summary */}
        <div className="h-fit space-y-4">
          {/* New Accountant Info Card */}
          {selectedUser && selectedUser.isNewlyCreated && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                  <Plus className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-900">New Account</p>
                  <p className="mt-1 text-xs text-blue-800">
                    This is a newly created account. The accountant will need to set up MFA authentication after assignment for enhanced security.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Business Info Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Business Info</h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Business Name</span>
                <span className="font-semibold text-slate-900">{business.businessName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Industry</span>
                <span className="font-semibold text-slate-900">{business.industry}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Country</span>
                <span className="font-semibold text-slate-900">{business.country}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Status</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700 font-semibold text-xs">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  {business.status}
                </span>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-900">About Assignment</p>
                <p className="mt-1 text-xs text-blue-800">
                  The assigned manager will have full access to all financial records, reports, and operational settings for this business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

