'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookText,
  Building2,
  CalendarDays,
  ChevronDown,
  CreditCard,
  FileText,
  Landmark,
  ListChecks,
  PiggyBank,
  Scale,
  Signature,
  Sparkles,
  Wallet,
  BadgeInfo,
  Plus,
} from 'lucide-react';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const transactionKinds = [
  { value: 'income', label: 'Money received' },
  { value: 'expense', label: 'Money spent' },
  { value: 'loan_given', label: 'Money lent to someone' },
  { value: 'loan_received', label: 'Money borrowed' },
  { value: 'transfer', label: 'Money moved between accounts' },
  { value: 'adjustment', label: 'Balance correction' },
];

const paymentMethods = [
  'Cash',
  'Bank Transfer',
  'Mobile Money',
  'Credit Card',
  'Debit Card',
  'Cheque',
  'Auto Debit',
  'Other',
];

const accountCategories = [
  'Sales / Revenue',
  'Service Income',
  'Office Supplies',
  'Utilities',
  'Rent',
  'Payroll',
  'Taxes',
  'Loans Receivable',
  'Loans Payable',
  'Owner Equity',
  'Asset Purchase',
  'Other Expense',
  'Other Income',
];

const taxRates = [0, 5, 7.5, 10, 12.5, 15, 18, 20];

const managerBusinessId = 1;
const ownerBusinesses = adminBusinesses.filter((business) => business.id === managerBusinessId);

type BusinessOption = {
  id: string;
  name: string;
  legalName: string;
};

const businessOptions: BusinessOption[] = ownerBusinesses.map((business) => ({
  id: String(business.id),
  name: business.businessName,
  legalName: business.legalName,
}));

const ledgerImpactMap: Record<string, string> = {
  income: 'Increase revenue / cash / receivables',
  expense: 'Increase expense / reduce cash',
  loan_given: 'Increase loans receivable / reduce cash',
  loan_received: 'Increase cash / increase loans payable',
  transfer: 'Move between accounts without P&L impact',
  adjustment: 'Correct balances and records',
};

export default function AddTransactionPage() {
  const [selectedBusinessId, setSelectedBusinessId] = useState(businessOptions[0]?.id ?? '');
  const [transactionKind, setTransactionKind] = useState('expense');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [taxRate, setTaxRate] = useState('0');

  const selectedBusiness = businessOptions.find((business) => business.id === selectedBusinessId) ?? null;

  const shouldShowLoanTerms = transactionKind === 'loan_given' || transactionKind === 'loan_received';

  const transactionMeaning = useMemo(
    () => ledgerImpactMap[transactionKind] || 'Captured in the general ledger',
    [transactionKind]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      businessId: selectedBusinessId,
      businessName: selectedBusiness?.name ?? '',
      businessLegalName: selectedBusiness?.legalName ?? '',
      transactionKind,
      paymentMethod,
      taxRate,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] lg:flex-row lg:items-end lg:justify-between lg:p-6">
        <div className="space-y-2">
          <Link
            href="/manager/transactions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Transactions
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Add a Transaction</h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-600 sm:text-base">
              Fill in the form step by step. The fields are arranged in plain language so you can record sales,
              expenses, transfers, and loans without needing accounting knowledge.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <div className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-4 w-4" />
            What this does in the books
          </div>
          <p className="mt-1 max-w-sm text-emerald-800">{transactionMeaning}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Business context</h2>
                <p className="text-sm text-slate-500">Select the business this transaction belongs to before you continue.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Business <span className="text-red-500">*</span></span>
                <div className="relative">
                  <select
                    value={selectedBusinessId}
                    onChange={(e) => setSelectedBusinessId(e.target.value)}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option value="">Select a business</option>
                    {businessOptions.map((business) => (
                      <option key={business.id} value={business.id}>
                        {business.name} - {business.legalName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500">Every transaction should be tied to one legal entity for clean reporting.</p>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">1. What happened?</h2>
                <p className="text-sm text-slate-500">Choose the type of money movement and describe it clearly.</p>
              </div>
            </div>

            <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              Tip: if you are unsure, pick the closest match and add details in the description.
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Type of transaction</span>
                <div className="relative">
                  <select
                    value={transactionKind}
                    onChange={(e) => setTransactionKind(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {transactionKinds.map((kind) => (
                      <option key={kind.value} value={kind.value}>
                        {kind.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500">This tells the system whether it is income, expense, or a loan.</p>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Date</span>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                  <CalendarDays className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500">Use the day the money actually moved.</p>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Your reference number</span>
                <input
                  type="text"
                  placeholder="Example: TXN-000123"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <p className="text-xs text-slate-500">Any code you use to find this transaction later.</p>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Invoice / receipt number</span>
                <input
                  type="text"
                  placeholder="Example: INV-2024-001"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <p className="text-xs text-slate-500">Optional, but very helpful for records and audits.</p>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">What was it for?</span>
                <textarea
                  rows={4}
                  placeholder="Example: paid office rent for April, or received payment from Client A"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <p className="text-xs text-slate-500">Write one short sentence. This will show up in your reports.</p>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">2. Who was involved?</h2>
                <p className="text-sm text-slate-500">Tell us who you paid, received from, lent to, or borrowed from.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Person or business name</span>
                <input
                  type="text"
                  placeholder="Example: John Traders Ltd"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <p className="text-xs text-slate-500">Who gave or received the money?</p>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Category</span>
                <div className="relative">
                  <select className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200">
                    {accountCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500">Choose the closest match. You can refine later.</p>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Notes about this person or business</span>
                <input
                  type="text"
                  placeholder="Optional: customer, supplier, borrower, etc."
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">3. Money details</h2>
                <p className="text-sm text-slate-500">How much, how it was paid, and when it is due.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Amount</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Example: 2500.00"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <p className="text-xs text-slate-500">Enter the full amount before or after tax, depending on your tax setting below.</p>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Currency</span>
                <div className="relative">
                  <select className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>KES</option>
                    <option>NGN</option>
                    <option>ZAR</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500">Pick the currency used for the transaction.</p>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Payment Method</span>
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
                <p className="text-xs text-slate-500">How the money moved: cash, bank, card, cheque, and so on.</p>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Status</span>
                <div className="relative">
                  <select className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200">
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Partially Paid</option>
                    <option>Overdue</option>
                    <option>Scheduled</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500">Select whether the money is already settled or still due.</p>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Due date / settlement date</span>
                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <p className="text-xs text-slate-500">Use the date the payment is due or expected to be settled.</p>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">4. Tax details</h2>
                <p className="text-sm text-slate-500">Only fill this in if tax applies to the transaction.</p>
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
                <p className="text-xs text-slate-500">Pick 0% if no tax applies.</p>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Is tax already included?</span>
                <div className="relative">
                  <select className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500">Choose yes if the amount you entered already includes tax.</p>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Tax note</span>
                <input
                  type="text"
                  placeholder="Example: VAT, GST, withholding, or no tax"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>
            </div>
          </section>

          {shouldShowLoanTerms && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-purple-100 p-2 text-purple-700">
                  <PiggyBank className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">5. Loan details</h2>
                  <p className="text-sm text-slate-500">Only show this section when the transaction is a loan.</p>
                </div>
              </div>

              <div className="mb-5 rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-900">
                Fill this section if you lent money or borrowed money. It helps the balance sheet and loan register stay correct.
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Loan amount</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Example: 5000.00"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Interest rate</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Example: 5"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Loan start date</span>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Repayment due date</span>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Security or collateral</span>
                  <input
                    type="text"
                    placeholder="Optional: house, car, stock, invoice, etc."
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Repayment notes</span>
                  <textarea
                    rows={4}
                    placeholder="Example: repay monthly, 30-day grace period, no interest for first month"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </label>
              </div>
            </section>
          )}

          <details className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6" open>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <BookText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">6. Optional details</h2>
                <p className="text-sm text-slate-500">These help with reports, receipts, and deeper accounting later.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500" />
                <span className="text-sm font-medium text-slate-700">This happens regularly</span>
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500" />
                <span className="text-sm font-medium text-slate-700">I have a receipt or document</span>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Extra note</span>
                <textarea
                  rows={4}
                  placeholder="Anything else worth remembering about this transaction"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>
            </div>
          </details>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-[0_10px_28px_rgba(15,23,42,0.16)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-2 text-emerald-300">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Posting Preview</h2>
                <p className="text-sm text-slate-300">Simple summary of what you are recording</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Business</span>
                <span className="max-w-[160px] truncate font-semibold text-white">
                  {selectedBusiness?.name || 'Not selected'}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Transaction type</span>
                <span className="font-semibold text-white capitalize">{transactionKind.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Payment method</span>
                <span className="font-semibold text-white">{paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Tax rate</span>
                <span className="font-semibold text-white">{taxRate}%</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">Loan details</span>
                <span className="font-semibold text-white">{shouldShowLoanTerms ? 'Included' : 'Not needed'}</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Quick check</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {[
                'The date is correct',
                'The amount and currency are correct',
                'The person or business is named',
                'Loan details are filled in if needed',
                'Receipt or note is added if available',
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
                Save Entry
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Signature className="h-4 w-4" />
                Save as Draft
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <BadgeInfo className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Need help?</h2>
                <p className="text-sm text-slate-500">Use these tips to make the entry clearer</p>
              </div>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-green-500" />If you are unsure, choose the closest type and explain it in the note.</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-green-500" />Use the exact amount that moved.</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-green-500" />For loans, add the loan amount and repayment date.</li>
            </ul>
          </section>
        </aside>
      </form>
    </div>
  );
}

