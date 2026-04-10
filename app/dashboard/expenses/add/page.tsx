'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BadgeInfo,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  FileText,
  Landmark,
  ListChecks,
  Plus,
  Repeat,
  ShieldCheck,
  Store,
  Tag,
} from 'lucide-react';

const expenseCategories = [
  'Office Supplies',
  'Utilities',
  'Rent',
  'Payroll',
  'Software',
  'Travel',
  'Marketing',
  'Professional Services',
  'Maintenance',
  'Insurance',
  'Taxes',
  'Other',
];

const paymentMethods = [
  'Bank Transfer',
  'Cash',
  'Credit Card',
  'Debit Card',
  'Mobile Money',
  'Cheque',
  'Auto Debit',
  'Other',
];

const taxRates = [0, 5, 7.5, 10, 12.5, 15, 18, 20];

export default function AddExpensePage() {
  const today = new Date().toISOString().slice(0, 10);

  const [description, setDescription] = useState('');
  const [vendor, setVendor] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState(expenseCategories[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [taxRate, setTaxRate] = useState('0');
  const [date, setDate] = useState(today);
  const [dueDate, setDueDate] = useState(today);
  const [status, setStatus] = useState('Completed');
  const [isTaxIncluded, setIsTaxIncluded] = useState('Yes');
  const [isRecurring, setIsRecurring] = useState(false);
  const [isReimbursable, setIsReimbursable] = useState(false);

  const parsedAmount = Number.parseFloat(amount || '0');
  const parsedTaxRate = Number.parseFloat(taxRate || '0');

  const { taxAmount, netAmount } = useMemo(() => {
    if (!parsedAmount || !parsedTaxRate) {
      return {
        taxAmount: 0,
        netAmount: parsedAmount,
      };
    }

    if (isTaxIncluded === 'Yes') {
      const net = parsedAmount / (1 + parsedTaxRate / 100);
      return {
        taxAmount: parsedAmount - net,
        netAmount: net,
      };
    }

    const tax = (parsedAmount * parsedTaxRate) / 100;
    return {
      taxAmount: tax,
      netAmount: parsedAmount,
    };
  }, [isTaxIncluded, parsedAmount, parsedTaxRate]);

  const totalWithTax = isTaxIncluded === 'Yes' ? parsedAmount : parsedAmount + taxAmount;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] lg:p-6">
        <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-green-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-36 w-36 rounded-full bg-amber-100/50 blur-2xl" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Link
              href="/dashboard/expenses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Expenses
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Add Expense</h1>
              <p className="mt-1 max-w-3xl text-sm text-slate-600 sm:text-base">
                Capture every outgoing payment with tax, due date, and vendor context so your reports stay accurate and audit-ready.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Bookkeeping impact
            </div>
            <p className="mt-1 max-w-sm text-emerald-800">Increases expense accounts and reduces cash or payables depending on payment status.</p>
          </div>
        </div>
      </div>

      <form className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">1. Expense details</h2>
                <p className="text-sm text-slate-500">Define what was paid, for who, and why.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Description</span>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example: April cloud hosting invoice"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Category</span>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {expenseCategories.map((expenseCategory) => (
                      <option key={expenseCategory} value={expenseCategory}>
                        {expenseCategory}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Vendor / Payee</span>
                <input
                  type="text"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  placeholder="Example: AWS"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Expense date</span>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                  <CalendarDays className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Status</span>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Partially Paid</option>
                    <option>Scheduled</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                <CircleDollarSign className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">2. Amount and payment</h2>
                <p className="text-sm text-slate-500">Capture value, payment source, and settlement timeline.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Amount</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Currency</span>
                <div className="relative">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>KES</option>
                    <option>NGN</option>
                    <option>ZAR</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Payment method</span>
                <div className="relative">
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Due / settlement date</span>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">3. Tax and policy flags</h2>
                <p className="text-sm text-slate-500">Keep VAT/GST accurate and prepare for reimbursements.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Tax rate</span>
                <div className="relative">
                  <select
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {taxRates.map((rate) => (
                      <option key={rate} value={rate}>
                        {rate}%
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Tax already included?</span>
                <div className="relative">
                  <select
                    value={isTaxIncluded}
                    onChange={(e) => setIsTaxIncluded(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-slate-700">Recurring expense</span>
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isReimbursable}
                  onChange={(e) => setIsReimbursable(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-slate-700">Reimbursable</span>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Internal note</span>
                <textarea
                  rows={4}
                  placeholder="Add approvals, policy notes, or receipt details"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-[0_10px_28px_rgba(15,23,42,0.16)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-2 text-emerald-300">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Expense Preview</h2>
                <p className="text-sm text-slate-300">Real-time accounting summary</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Category</span>
                <span className="font-semibold text-white">{category}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Vendor</span>
                <span className="max-w-[160px] truncate font-semibold text-white">{vendor || 'Not set'}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Net amount</span>
                <span className="font-semibold text-white">
                  {currency} {netAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Tax amount</span>
                <span className="font-semibold text-white">
                  {currency} {taxAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-emerald-500/20 px-4 py-3">
                <span className="text-emerald-100">Total expense</span>
                <span className="font-bold text-emerald-50">
                  {currency} {totalWithTax.toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Validation checklist</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {[
                'Description clearly explains the expense',
                'Amount, currency, and tax are correct',
                'Vendor and category are selected',
                'Due date matches invoice terms',
                'Receipt and notes are attached externally',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 px-4 py-3">
                  <ListChecks className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                Save Expense
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Repeat className="h-4 w-4" />
                Save as Recurring Template
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <BadgeInfo className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Pro tips</h2>
                <p className="text-sm text-slate-500">Keep your expense book clean and searchable</p>
              </div>
            </div>

            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <Tag className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                Use a consistent vendor name format to simplify filtering.
              </li>
              <li className="flex gap-2">
                <Store className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                Split mixed invoices into multiple categories for better reports.
              </li>
              <li className="flex gap-2">
                <Landmark className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                Keep tax-inclusive setting aligned with the actual invoice format.
              </li>
            </ul>
          </section>
        </aside>
      </form>
    </div>
  );
}