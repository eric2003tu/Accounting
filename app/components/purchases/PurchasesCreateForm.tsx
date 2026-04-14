'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  FileText,
  HandCoins,
  Plus,
  Receipt,
  Truck,
} from 'lucide-react';
import { type PurchasePaymentStatus, type PurchaseType, type ReceiveStatus } from '@/app/lib/purchasesData';

type BusinessOption = {
  id: string;
  name: string;
  legalName: string;
};

type PurchasesCreateFormProps = {
  role: 'owner' | 'manager';
  backHref: string;
  submitHrefBase: string;
  businesses: BusinessOption[];
  defaultBusinessId?: string;
};

const purchaseTypes: PurchaseType[] = ['Inventory Purchase', 'Asset Purchase', 'Service Purchase'];
const paymentStatuses: PurchasePaymentStatus[] = ['Fully Paid', 'Partially Paid', 'Unpaid'];
const receiveStatuses: ReceiveStatus[] = ['Pending', 'Partially Received', 'Received'];
const paymentMethods = ['Cash', 'Bank Transfer', 'Mobile Money', 'Credit Card', 'Cheque', 'Credit', 'Other'];

function money(value: number) {
  return `$${value.toFixed(2)}`;
}

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function PurchasesCreateForm({
  role,
  backHref,
  submitHrefBase,
  businesses,
  defaultBusinessId = '',
}: PurchasesCreateFormProps) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const canSelectBusiness = role === 'owner';

  const [businessId, setBusinessId] = useState(defaultBusinessId || businesses[0]?.id || '');
  const [purchaseDate, setPurchaseDate] = useState(today);
  const [billNo, setBillNo] = useState('');
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('Inventory Purchase');
  const [supplier, setSupplier] = useState('');
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unitCost, setUnitCost] = useState('0');
  const [discountRate, setDiscountRate] = useState('0');
  const [taxRate, setTaxRate] = useState('18');
  const [shippingFee, setShippingFee] = useState('0');
  const [paidAmount, setPaidAmount] = useState('0');
  const [paymentStatus, setPaymentStatus] = useState<PurchasePaymentStatus>('Partially Paid');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [dueDate, setDueDate] = useState(today);
  const [lastPaymentDate, setLastPaymentDate] = useState(today);
  const [receiveStatus, setReceiveStatus] = useState<ReceiveStatus>('Pending');
  const [purchaser, setPurchaser] = useState('');
  const [expectedRevenue, setExpectedRevenue] = useState('0');
  const [notes, setNotes] = useState('');

  const selectedBusiness = businesses.find((item) => item.id === businessId) ?? null;

  const preview = useMemo(() => {
    const qty = toNumber(quantity);
    const cost = toNumber(unitCost);
    const discount = toNumber(discountRate);
    const tax = toNumber(taxRate);
    const shipping = toNumber(shippingFee);
    const paid = toNumber(paidAmount);
    const expectedRevenueValue = toNumber(expectedRevenue);

    const subtotal = qty * cost;
    const discountAmount = subtotal * (discount / 100);
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (tax / 100);
    const totalAmount = taxableAmount + taxAmount + shipping;
    const balanceDue = totalAmount - paid;
    const expectedGrossProfit = expectedRevenueValue - totalAmount;
    const expectedMargin = expectedRevenueValue > 0 ? (expectedGrossProfit / expectedRevenueValue) * 100 : 0;

    return {
      subtotal,
      discountAmount,
      taxAmount,
      totalAmount,
      balanceDue,
      expectedGrossProfit,
      expectedMargin,
    };
  }, [discountRate, expectedRevenue, paidAmount, quantity, shippingFee, taxRate, unitCost]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      businessId,
      businessName: selectedBusiness?.name ?? '',
      businessLegalName: selectedBusiness?.legalName ?? '',
      purchaseDate,
      billNo,
      purchaseType,
      supplier,
      productName,
      sku,
      quantity: toNumber(quantity),
      unitCost: toNumber(unitCost),
      subtotal: preview.subtotal,
      discountRate: toNumber(discountRate),
      discountAmount: preview.discountAmount,
      taxRate: toNumber(taxRate),
      taxAmount: preview.taxAmount,
      shippingFee: toNumber(shippingFee),
      totalAmount: preview.totalAmount,
      paidAmount: toNumber(paidAmount),
      balanceDue: preview.balanceDue,
      paymentStatus,
      paymentMethod,
      dueDate,
      lastPaymentDate,
      receiveStatus,
      purchaser,
      notes,
      expectedRevenue: toNumber(expectedRevenue),
      expectedGrossProfit: preview.expectedGrossProfit,
      expectedMargin: preview.expectedMargin,
      purchaseStatus: preview.balanceDue > 0 ? 'Open' : 'Closed',
    };

    console.log(payload);
    router.push(`${submitHrefBase}?businessId=${businessId}`);
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] lg:p-6">
        <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-green-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-36 w-36 rounded-full bg-emerald-100/50 blur-2xl" />
        <div className="relative">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Purchases
          </Link>
          <div className="mt-3">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Add Purchase</h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-600 sm:text-base">
              Create a purchase with full cost, payment, receiving, and profitability details.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Business context</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="purchase-business-id" className="mb-2 block text-sm font-medium text-slate-700">
                Which business is this purchase for? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="purchase-business-id"
                  value={businessId}
                  onChange={(event) => setBusinessId(event.target.value)}
                  required
                  disabled={!canSelectBusiness}
                  className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200 disabled:cursor-not-allowed disabled:bg-slate-100"
                >
                  <option value="">Select a business</option>
                  {businesses.map((business) => (
                    <option key={business.id} value={business.id}>
                      {business.name} - {business.legalName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {canSelectBusiness
                  ? 'Choose the legal entity that owns this purchase.'
                  : 'Managers can only add purchases for their assigned business.'}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Purchase details</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm font-medium text-slate-700">
              Purchase Date <span className="text-red-500">*</span>
              <input type="date" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={purchaseDate} onChange={(event) => setPurchaseDate(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Bill Number <span className="text-red-500">*</span>
              <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={billNo} onChange={(event) => setBillNo(event.target.value.toUpperCase())} placeholder="e.g., ACM-P-006" required />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Purchase Type
              <div className="relative mt-1">
                <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={purchaseType} onChange={(event) => setPurchaseType(event.target.value as PurchaseType)}>
                  {purchaseTypes.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Supplier <span className="text-red-500">*</span>
              <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={supplier} onChange={(event) => setSupplier(event.target.value)} placeholder="e.g., Global Devices Ltd" required />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Item / Service <span className="text-red-500">*</span>
              <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={productName} onChange={(event) => setProductName(event.target.value)} placeholder="e.g., ApexBook Pro 14" required />
            </label>
            <label className="text-sm font-medium text-slate-700">
              SKU / Code
              <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={sku} onChange={(event) => setSku(event.target.value.toUpperCase())} placeholder="e.g., ACM-LTP-14PRO" />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Cost and payment</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm font-medium text-slate-700">
              Quantity
              <input type="number" min="0" step="1" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Unit Cost
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={unitCost} onChange={(event) => setUnitCost(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Subtotal (Auto)
              <input type="text" readOnly value={money(preview.subtotal)} className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900" />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Discount Rate (%)
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={discountRate} onChange={(event) => setDiscountRate(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Tax Rate (%)
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={taxRate} onChange={(event) => setTaxRate(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Shipping Fee
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={shippingFee} onChange={(event) => setShippingFee(event.target.value)} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Paid Amount
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={paidAmount} onChange={(event) => setPaidAmount(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Payment Status
              <div className="relative mt-1">
                <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={paymentStatus} onChange={(event) => setPaymentStatus(event.target.value as PurchasePaymentStatus)}>
                  {paymentStatuses.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Payment Method
              <div className="relative mt-1">
                <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                  {paymentMethods.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <Truck className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Fulfillment and accountability</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm font-medium text-slate-700">
              Due Date
              <div className="relative mt-1">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input type="date" className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
              </div>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Last Payment Date
              <div className="relative mt-1">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input type="date" className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={lastPaymentDate} onChange={(event) => setLastPaymentDate(event.target.value)} />
              </div>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Receiving Status
              <div className="relative mt-1">
                <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={receiveStatus} onChange={(event) => setReceiveStatus(event.target.value as ReceiveStatus)}>
                  {receiveStatuses.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Purchaser <span className="text-red-500">*</span>
              <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={purchaser} onChange={(event) => setPurchaser(event.target.value)} placeholder="e.g., Samuel Uwizeye" required />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Expected Revenue
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={expectedRevenue} onChange={(event) => setExpectedRevenue(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Balance Due (Auto)
              <input type="text" readOnly value={money(preview.balanceDue)} className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900" />
            </label>

            <label className="text-sm font-medium text-slate-700 sm:col-span-2 lg:col-span-3">
              Notes
              <textarea rows={3} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Any delivery terms, supplier commitments, or internal references..." />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-green-200 bg-green-50/70 p-6 shadow-[0_10px_24px_rgba(34,197,94,0.12)]">
          <div className="mb-4 flex items-center gap-2">
            <Receipt className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Financial preview</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-green-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Discount</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{money(preview.discountAmount)}</p>
            </div>
            <div className="rounded-xl border border-green-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Tax</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{money(preview.taxAmount)}</p>
            </div>
            <div className="rounded-xl border border-green-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Total Purchase Cost</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{money(preview.totalAmount)}</p>
            </div>
            <div className="rounded-xl border border-green-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Expected Margin</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{preview.expectedMargin.toFixed(2)}%</p>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <div className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-white px-3 py-2 text-sm text-slate-700">
              <HandCoins className="h-4 w-4 text-green-700" />
              Expected Gross Profit: <span className="font-semibold text-slate-900">{money(preview.expectedGrossProfit)}</span>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              Create Purchase
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
