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
  Receipt,
  ShieldCheck,
  Store,
  Tag,
  TrendingUp,
} from 'lucide-react';

const incomeCategories = [
  'Service Income',
  'Product Sales',
  'Consulting',
  'Subscription Revenue',
  'Licensing Fees',
  'Professional Fees',
  'Contract Work',
  'Asset Sales',
  'Interest Income',
  'Other Income',
];

const paymentMethods = [
  'Bank Transfer',
  'Cash',
  'Credit Card',
  'Mobile Payment',
  'Cheque',
  'Direct Deposit',
  'Cryptocurrency',
  'Other',
];

const taxRates = [0, 5, 7.5, 10, 12.5, 15, 18, 20];

export default function AddIncomePage() {
  const today = new Date().toISOString().slice(0, 10);

  // Form state
  const [incomeSource, setIncomeSource] = useState('');
  const [clientName, setClientName] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState(incomeCategories[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [taxRate, setTaxRate] = useState('0');
  const [date, setDate] = useState(today);
  const [dueDate, setDueDate] = useState(today);
  const [receivedDate, setReceivedDate] = useState(today);
  const [status, setStatus] = useState('Received');
  const [isTaxIncluded, setIsTaxIncluded] = useState('No');
  const [isRecurring, setIsRecurring] = useState(false);
  const [notes, setNotes] = useState('');
  const [referenceNo, setReferenceNo] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      incomeSource,
      clientName,
      invoiceNo,
      description,
      amount: parsedAmount,
      currency,
      category,
      paymentMethod,
      taxRate: parsedTaxRate,
      date,
      dueDate,
      receivedDate,
      status,
      isTaxIncluded,
      isRecurring,
      notes,
      referenceNo,
      netAmount,
      taxAmount,
      totalWithTax,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] lg:p-6">
        <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-green-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-36 w-36 rounded-full bg-emerald-100/50 blur-2xl" />
        <div className="relative">
          <Link
            href="/dashboard/income"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Income
          </Link>
          <div className="mt-3">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Record Income</h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-600 sm:text-base">
              Document all income sources with complete details for accurate financial statements and tax reporting. Include invoice numbers and payment details for audit trails.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Income Details Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Income Details</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Income Source */}
            <div>
              <label htmlFor="incomeSource" className="mb-2 block text-sm font-medium text-slate-700">
                Income Source <span className="text-red-500">*</span>
              </label>
              <input
                id="incomeSource"
                type="text"
                placeholder="e.g., Client Project, Product Sales"
                value={incomeSource}
                onChange={(e) => setIncomeSource(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Client Name */}
            <div>
              <label htmlFor="clientName" className="mb-2 block text-sm font-medium text-slate-700">
                Client / Customer Name
              </label>
              <input
                id="clientName"
                type="text"
                placeholder="e.g., ABC Corporation"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-700">
                Income Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                >
                  {incomeCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            {/* Invoice Number */}
            <div>
              <label htmlFor="invoiceNo" className="mb-2 block text-sm font-medium text-slate-700">
                Invoice / Reference Number
              </label>
              <input
                id="invoiceNo"
                type="text"
                placeholder="e.g., INV-2024-001"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>
              <input
                id="description"
                type="text"
                placeholder="e.g., Website development services"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>
        </div>

        {/* Amount Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <Tag className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Amount & Tax</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Amount */}
            <div className="sm:col-span-2">
              <label htmlFor="amount" className="mb-2 block text-sm font-medium text-slate-700">
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Currency */}
            <div>
              <label htmlFor="currency" className="mb-2 block text-sm font-medium text-slate-700">
                Currency
              </label>
              <input
                id="currency"
                type="text"
                placeholder="USD"
                value={currency}
                onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                maxLength={3}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Tax Rate */}
            <div>
              <label htmlFor="taxRate" className="mb-2 block text-sm font-medium text-slate-700">
                Tax Rate (%)
              </label>
              <div className="relative">
                <select
                  id="taxRate"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                >
                  {taxRates.map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}%
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            {/* Tax Included */}
            <div>
              <label htmlFor="isTaxIncluded" className="mb-2 block text-sm font-medium text-slate-700">
                Tax Included in Amount?
              </label>
              <div className="relative">
                <select
                  id="isTaxIncluded"
                  value={isTaxIncluded}
                  onChange={(e) => setIsTaxIncluded(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
          </div>

          {/* Tax Breakdown */}
          {parsedTaxRate > 0 && (
            <div className="mt-5 rounded-xl border border-green-100 bg-green-50 p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Net Amount</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    {netAmount.toFixed(2)} {currency}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Tax Amount</p>
                  <p className="mt-1 text-base font-semibold text-green-700">
                    {taxAmount.toFixed(2)} {currency}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Total</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    {totalWithTax.toFixed(2)} {currency}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Details Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Payment Details</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Payment Method */}
            <div>
              <label htmlFor="paymentMethod" className="mb-2 block text-sm font-medium text-slate-700">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            {/* Reference Number */}
            <div>
              <label htmlFor="referenceNo" className="mb-2 block text-sm font-medium text-slate-700">
                Transaction Reference (Receipt/Check #)
              </label>
              <input
                id="referenceNo"
                type="text"
                placeholder="e.g., TXN-12345"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Invoice Date */}
            <div>
              <label htmlFor="date" className="mb-2 block text-sm font-medium text-slate-700">
                Invoice Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="mb-2 block text-sm font-medium text-slate-700">
                Due Date
              </label>
              <div className="relative">
                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            {/* Received Date */}
            <div>
              <label htmlFor="receivedDate" className="mb-2 block text-sm font-medium text-slate-700">
                Received Date (Payment Cleared)
              </label>
              <div className="relative">
                <input
                  id="receivedDate"
                  type="date"
                  value={receivedDate}
                  onChange={(e) => setReceivedDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="mb-2 block text-sm font-medium text-slate-700">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                >
                  <option value="Pending">Pending</option>
                  <option value="Received">Received</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Options Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Additional Options</h2>
          </div>

          <div className="space-y-4">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
              />
              <div>
                <p className="text-sm font-medium text-slate-900">Recurring Income</p>
                <p className="text-xs text-slate-600">Mark if this income is expected to repeat (e.g., monthly subscription)</p>
              </div>
            </label>

            <div>
              <label htmlFor="notes" className="mb-2 block text-sm font-medium text-slate-700">
                Notes / Memo
              </label>
              <textarea
                id="notes"
                placeholder="Add any additional details for record-keeping and audit trail..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex gap-3">
            <BadgeInfo className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div>
              <p className="text-sm font-semibold text-blue-900">Financial Statement Impact</p>
              <p className="mt-1 text-sm leading-6 text-blue-800">
                This income will be recorded as revenue in your Profit & Loss statement under the selected category. Tax amounts are tracked separately for tax reporting. Payment dates affect your cash flow projection.
              </p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 sm:flex-none"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Record Income
          </button>
          <Link
            href="/dashboard/income"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
