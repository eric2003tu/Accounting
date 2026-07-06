'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  FileText,
  HandCoins,
  Landmark,
  ListChecks,
  Plus,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const managerBusinessId = 1;
const managerBusiness = adminBusinesses.find((business) => business.id === managerBusinessId);

const currencies = ['USD', 'RWF', 'EUR', 'KES'];
const receivedFacilityTypes = ['Term Loan', 'Working Capital', 'Asset Finance', 'Overdraft', 'Bridge Facility'];
const offeredProducts = ['Inventory Financing', 'Equipment Credit', 'Service Installments', 'Invoice Financing', 'Bridge Advance'];
const repaymentFrequencies = ['Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly'];
const methods = ['Bank Transfer', 'Mobile Money', 'Cheque', 'Cash', 'Card', 'Auto Debit'];

type LoanDirection = 'received' | 'offered';

function roundMoney(value: number) {
  return Number.isFinite(value) ? Number(value.toFixed(2)) : 0;
}

export default function AddManagerLoanPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [direction, setDirection] = useState<LoanDirection>('received');
  const [reference, setReference] = useState('');
  const [counterpartyName, setCounterpartyName] = useState('');
  const [borrowerPhone, setBorrowerPhone] = useState('');
  const [counterpartyType, setCounterpartyType] = useState('Bank');
  const [purpose, setPurpose] = useState('');
  const [productName, setProductName] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('12');
  const [tenorMonths, setTenorMonths] = useState('12');
  const [repaymentFrequency, setRepaymentFrequency] = useState('Monthly');
  const [disbursementDate, setDisbursementDate] = useState(today);
  const [firstPaymentDate, setFirstPaymentDate] = useState(today);
  const [maturityDate, setMaturityDate] = useState(today);
  const [gracePeriodMonths, setGracePeriodMonths] = useState('0');
  const [arrangementFee, setArrangementFee] = useState('0');
  const [processingFee, setProcessingFee] = useState('0');
  const [insuranceFee, setInsuranceFee] = useState('0');
  const [taxRate, setTaxRate] = useState('0');
  const [latePenaltyRate, setLatePenaltyRate] = useState('0');
  const [openingBalance, setOpeningBalance] = useState('');
  const [collateral, setCollateral] = useState('');
  const [guarantor, setGuarantor] = useState('');
  const [status, setStatus] = useState('Pending Approval');
  const [creditScore, setCreditScore] = useState('');
  const [expectedLossRate, setExpectedLossRate] = useState('0');
  const [paymentMethod, setPaymentMethod] = useState(methods[0]);
  const [notes, setNotes] = useState('');

  if (!managerBusiness) {
    return <div className="text-slate-600">No business assigned.</div>;
  }

  const parsedPrincipal = Number(principal || 0);
  const parsedRate = Number(interestRate || 0);
  const parsedTenor = Number(tenorMonths || 0);
  const parsedArrangementFee = Number(arrangementFee || 0);
  const parsedProcessingFee = Number(processingFee || 0);
  const parsedInsuranceFee = Number(insuranceFee || 0);
  const parsedTaxRate = Number(taxRate || 0);
  const parsedOpeningBalance = Number(openingBalance || 0);
  const parsedExpectedLossRate = Number(expectedLossRate || 0);

  const metrics = useMemo(() => {
    const annualInterest = roundMoney((parsedPrincipal * parsedRate) / 100);
    const tenorInterest = parsedTenor > 0 ? roundMoney((annualInterest * parsedTenor) / 12) : 0;
    const feesSubtotal = roundMoney(parsedArrangementFee + parsedProcessingFee + parsedInsuranceFee);
    const taxOnFees = roundMoney((feesSubtotal * parsedTaxRate) / 100);
    const totalCost = roundMoney(parsedPrincipal + tenorInterest + feesSubtotal + taxOnFees);
    const installmentCount = parsedTenor > 0 ? parsedTenor : 0;
    const estimatedInstallment = installmentCount > 0 ? roundMoney(totalCost / installmentCount) : 0;
    const expectedLoss = direction === 'offered' ? roundMoney((parsedPrincipal * parsedExpectedLossRate) / 100) : 0;

    return {
      annualInterest,
      tenorInterest,
      feesSubtotal,
      taxOnFees,
      totalCost,
      estimatedInstallment,
      expectedLoss,
    };
  }, [
    direction,
    parsedArrangementFee,
    parsedExpectedLossRate,
    parsedInsuranceFee,
    parsedPrincipal,
    parsedProcessingFee,
    parsedRate,
    parsedTaxRate,
    parsedTenor,
  ]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log({
      businessId: managerBusiness.id,
      businessName: managerBusiness.businessName,
      direction,
      reference,
      counterpartyName,
      borrowerPhone,
      counterpartyType,
      purpose,
      productName,
      currency,
      principal: parsedPrincipal,
      interestRate: parsedRate,
      tenorMonths: parsedTenor,
      repaymentFrequency,
      disbursementDate,
      firstPaymentDate,
      maturityDate,
      gracePeriodMonths: Number(gracePeriodMonths || 0),
      arrangementFee: parsedArrangementFee,
      processingFee: parsedProcessingFee,
      insuranceFee: parsedInsuranceFee,
      taxRate: parsedTaxRate,
      latePenaltyRate: Number(latePenaltyRate || 0),
      openingBalance: parsedOpeningBalance,
      collateral,
      guarantor,
      status,
      paymentMethod,
      creditScore,
      expectedLossRate: parsedExpectedLossRate,
      notes,
      calculated: metrics,
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] lg:p-6">
        <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-green-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 left-1/3 h-36 w-36 rounded-full bg-emerald-100/60 blur-2xl" />

        <div className="relative space-y-3">
          <Link
            href="/manager/loans"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Loans
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Add New Loan</h1>
          <p className="max-w-3xl text-sm text-slate-600 sm:text-base">
            Create a new received or offered loan record for your assigned business with complete terms, fees, and risk data.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] xl:items-start">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Business and loan type</h2>
                <p className="text-sm text-slate-500">Your assigned business is fixed. Choose the loan direction for this record.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Assigned business</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{managerBusiness.businessName}</p>
                <p className="text-xs text-slate-600">{managerBusiness.legalName}</p>
              </div>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Loan direction <span className="text-red-500">*</span></span>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setDirection('received')}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      direction === 'received'
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-green-200'
                    }`}
                  >
                    <Landmark className="mb-1 h-4 w-4" />
                    Loan Received
                    <p className="mt-1 text-xs font-normal text-slate-500">Debt facility from external lender.</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirection('offered')}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      direction === 'offered'
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-green-200'
                    }`}
                  >
                    <HandCoins className="mb-1 h-4 w-4" />
                    Loan Offered
                    <p className="mt-1 text-xs font-normal text-slate-500">Credit given to customer or partner.</p>
                  </button>
                </div>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Counterparty and instrument</h2>
                <p className="text-sm text-slate-500">Capture legal identifiers and what this facility is for.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Reference / Facility No.</span>
                <input
                  type="text"
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  placeholder="Example: TL-ACM-2026-01"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">{direction === 'received' ? 'Lender Name' : 'Borrower / Customer'} <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  value={counterpartyName}
                  onChange={(event) => setCounterpartyName(event.target.value)}
                  required
                  placeholder={direction === 'received' ? 'Example: BK Capital Bank' : 'Example: Vertex Retail'}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              {direction === 'offered' && (
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Customer Phone Number <span className="text-red-500">*</span></span>
                  <input
                    type="tel"
                    value={borrowerPhone}
                    onChange={(event) => setBorrowerPhone(event.target.value)}
                    required={direction === 'offered'}
                    placeholder="Example: +250788123456"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                  <p className="text-xs text-slate-500">Used for repayment reminders and due-date notifications.</p>
                </label>
              )}

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">{direction === 'received' ? 'Lender Type' : 'Borrower Type'}</span>
                <div className="relative">
                  <select
                    value={counterpartyType}
                    onChange={(event) => setCounterpartyType(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {direction === 'received' ? (
                      <>
                        <option value="Bank">Bank</option>
                        <option value="Microfinance">Microfinance</option>
                        <option value="Fintech">Fintech</option>
                        <option value="Private Lender">Private Lender</option>
                      </>
                    ) : (
                      <>
                        <option value="Retailer">Retailer</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Individual">Individual</option>
                      </>
                    )}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Facility / Product</span>
                <div className="relative">
                  <select
                    value={purpose}
                    onChange={(event) => setPurpose(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option value="">Select option</option>
                    {(direction === 'received' ? receivedFacilityTypes : offeredProducts).map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">
                  {direction === 'offered' ? 'Product Name' : 'Use of Funds'} <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                  required
                  placeholder={direction === 'offered' ? 'Example: POS Equipment Bundle' : 'Example: Working capital support'}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <CircleDollarSign className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Core financial terms</h2>
                <p className="text-sm text-slate-500">Enter principal, cost of funds, tenure, and repayment mechanics.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Principal Amount <span className="text-red-500">*</span></span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={principal}
                  onChange={(event) => setPrincipal(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Currency</span>
                <div className="relative">
                  <select
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {currencies.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Interest Rate (%) <span className="text-red-500">*</span></span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={interestRate}
                  onChange={(event) => setInterestRate(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Tenor (months) <span className="text-red-500">*</span></span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={tenorMonths}
                  onChange={(event) => setTenorMonths(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Repayment Frequency</span>
                <div className="relative">
                  <select
                    value={repaymentFrequency}
                    onChange={(event) => setRepaymentFrequency(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {repaymentFrequencies.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Opening Outstanding Balance</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={openingBalance}
                  onChange={(event) => setOpeningBalance(event.target.value)}
                  placeholder="Optional opening carrying amount"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Schedule and risk controls</h2>
                <p className="text-sm text-slate-500">Capture timing, fees, collateral, and compliance-related fields.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Disbursement / Issue Date</span>
                <input
                  type="date"
                  value={disbursementDate}
                  onChange={(event) => setDisbursementDate(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">First Repayment Date</span>
                <input
                  type="date"
                  value={firstPaymentDate}
                  onChange={(event) => setFirstPaymentDate(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Maturity Date</span>
                <input
                  type="date"
                  value={maturityDate}
                  onChange={(event) => setMaturityDate(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Grace Period (months)</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={gracePeriodMonths}
                  onChange={(event) => setGracePeriodMonths(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Arrangement Fee</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={arrangementFee}
                  onChange={(event) => setArrangementFee(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Processing Fee</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={processingFee}
                  onChange={(event) => setProcessingFee(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Insurance / Credit Cover Fee</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={insuranceFee}
                  onChange={(event) => setInsuranceFee(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Tax on Fees (%)</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={taxRate}
                  onChange={(event) => setTaxRate(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Late Penalty Rate (%)</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={latePenaltyRate}
                  onChange={(event) => setLatePenaltyRate(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Collateral / Security</span>
                <input
                  type="text"
                  value={collateral}
                  onChange={(event) => setCollateral(event.target.value)}
                  placeholder="Example: Fleet lien, receivables assignment, personal guarantee"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Guarantor</span>
                <input
                  type="text"
                  value={guarantor}
                  onChange={(event) => setGuarantor(event.target.value)}
                  placeholder="Individual or institution"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>

              {direction === 'offered' && (
                <>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Credit Score</span>
                    <input
                      type="text"
                      value={creditScore}
                      onChange={(event) => setCreditScore(event.target.value)}
                      placeholder="Internal or bureau score"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Expected Loss Rate (%)</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={expectedLossRate}
                      onChange={(event) => setExpectedLossRate(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                  </label>
                </>
              )}

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Loan Status</span>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Active">Active</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Preferred Payment Channel</span>
                <div className="relative">
                  <select
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    {methods.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Notes</span>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  placeholder="Add covenant highlights, repayment assumptions, or risk remarks"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </label>
            </div>
          </section>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-4 flex items-center gap-2 text-slate-900">
              <ListChecks className="h-5 w-5 text-green-700" />
              <h3 className="text-base font-semibold">Financial Summary</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Principal</span>
                <span className="font-semibold text-slate-900">{currency} {roundMoney(parsedPrincipal).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Tenor Interest</span>
                <span className="font-semibold text-slate-900">{currency} {metrics.tenorInterest.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Fees (Subtotal)</span>
                <span className="font-semibold text-slate-900">{currency} {metrics.feesSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Tax on Fees</span>
                <span className="font-semibold text-slate-900">{currency} {metrics.taxOnFees.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="font-medium text-slate-700">Estimated Total</span>
                <span className="text-base font-bold text-slate-900">{currency} {metrics.totalCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Estimated Installment</span>
                <span className="font-semibold text-slate-900">{currency} {metrics.estimatedInstallment.toLocaleString()}</span>
              </div>
              {direction === 'offered' && (
                <div className="flex items-center justify-between text-amber-700">
                  <span>Expected Credit Loss</span>
                  <span className="font-semibold">{currency} {metrics.expectedLoss.toLocaleString()}</span>
                </div>
              )}
              {parsedOpeningBalance > 0 && (
                <div className="flex items-center justify-between text-slate-700">
                  <span>Opening Balance</span>
                  <span className="font-semibold">{currency} {parsedOpeningBalance.toLocaleString()}</span>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900 shadow-[0_10px_28px_rgba(16,185,129,0.15)] sm:p-6">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Data quality checklist
            </div>
            <ul className="mt-3 space-y-2 text-emerald-800">
              <li className="flex items-start gap-2"><Plus className="mt-0.5 h-3.5 w-3.5" />Confirm principal, rate, and tenor from signed termsheet.</li>
              <li className="flex items-start gap-2"><Plus className="mt-0.5 h-3.5 w-3.5" />Capture all fees separately for accurate effective cost reporting.</li>
              <li className="flex items-start gap-2"><Plus className="mt-0.5 h-3.5 w-3.5" />Record collateral and guarantor for risk and audit traceability.</li>
              <li className="flex items-start gap-2"><Plus className="mt-0.5 h-3.5 w-3.5" />Use expected loss for offered loans to support provisioning.</li>
            </ul>
          </section>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <Wallet className="h-4 w-4" />
              Save Loan Record
            </button>
            <p className="mt-2 text-center text-xs text-slate-500">This demo form logs data in the browser console for now.</p>
          </div>
        </aside>
      </form>
    </div>
  );
}
