'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BadgeInfo,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  FileText,
  Landmark,
  Plus,
  Receipt,
  ShoppingBag,
  Store,
  Tag,
  TrendingUp,
} from 'lucide-react';

type BusinessOption = {
  id: string;
  name: string;
  legalName: string;
};

type SalesCreateFormProps = {
  role: 'owner' | 'manager';
  backHref: string;
  submitHrefBase: string;
  businesses: BusinessOption[];
  defaultBusinessId?: string;
};

const saleTypes = ['Product Sale', 'Loan Sale'] as const;
const paymentStatuses = ['Fully Paid', 'Partially Paid', 'Unpaid'] as const;
const deliveryStatuses = ['Pending', 'Packed', 'Delivered', 'Settled'] as const;
const paymentMethods = ['Cash', 'Bank Transfer', 'Mobile Money', 'Credit Card', 'Cheque', 'Credit', 'Other'];
const taxRates = [0, 5, 7.5, 10, 12.5, 15, 18, 20];

function money(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function SalesCreateForm({
  role,
  backHref,
  submitHrefBase,
  businesses,
  defaultBusinessId = '',
}: SalesCreateFormProps) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const canSelectBusiness = role === 'owner';

  const [businessId, setBusinessId] = useState(defaultBusinessId || businesses[0]?.id || '');
  const [saleDate, setSaleDate] = useState(today);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [saleType, setSaleType] = useState<(typeof saleTypes)[number]>('Product Sale');
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [customer, setCustomer] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unitCost, setUnitCost] = useState('0');
  const [unitPrice, setUnitPrice] = useState('0');
  const [subtotal, setSubtotal] = useState('0');
  const [discountRate, setDiscountRate] = useState('0');
  const [taxRate, setTaxRate] = useState('18');
  const [shippingFee, setShippingFee] = useState('0');
  const [paidAmount, setPaidAmount] = useState('0');
  const [paymentStatus, setPaymentStatus] = useState<(typeof paymentStatuses)[number]>('Partially Paid');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [dueDate, setDueDate] = useState(today);
  const [lastPaymentDate, setLastPaymentDate] = useState(today);
  const [deliveryStatus, setDeliveryStatus] = useState<(typeof deliveryStatuses)[number]>('Pending');
  const [salesperson, setSalesperson] = useState('');
  const [notes, setNotes] = useState('');
  const [loanPrincipal, setLoanPrincipal] = useState('0');
  const [loanInterestRate, setLoanInterestRate] = useState('0');
  const [loanInterestAmount, setLoanInterestAmount] = useState('0');
  const [loanTermMonths, setLoanTermMonths] = useState('0');
  const [collateral, setCollateral] = useState('');

  const selectedBusiness = businesses.find((item) => item.id === businessId) ?? null;

  const preview = useMemo(() => {
    const qty = Number(quantity || '0');
    const cost = Number(unitCost || '0');
    const price = Number(unitPrice || '0');
    const enteredSubtotal = Number(subtotal || '0');
    const discount = Number(discountRate || '0');
    const tax = Number(taxRate || '0');
    const shipping = Number(shippingFee || '0');
    const principal = Number(loanPrincipal || '0');
    const interestRate = Number(loanInterestRate || '0');
    const interestAmount = Number(loanInterestAmount || '0');
    const productSubtotal = saleType === 'Loan Sale' ? principal : (enteredSubtotal > 0 ? enteredSubtotal : qty * price);
    const discountAmount = productSubtotal * (discount / 100);
    const taxableAmount = productSubtotal - discountAmount;
    const taxAmount = saleType === 'Loan Sale' ? 0 : taxableAmount * (tax / 100);
    const computedInterest = saleType === 'Loan Sale' ? (interestAmount > 0 ? interestAmount : principal * (interestRate / 100)) : 0;
    const totalAmount = saleType === 'Loan Sale'
      ? productSubtotal + computedInterest + shipping
      : taxableAmount + taxAmount + shipping;
    const paid = Number(paidAmount || '0');
    const balanceDue = totalAmount - paid;
    const grossProfit = saleType === 'Loan Sale'
      ? computedInterest
      : productSubtotal - discountAmount - (qty * cost) - shipping;
    const grossMargin = totalAmount > 0 ? (grossProfit / totalAmount) * 100 : 0;

    return {
      productSubtotal,
      discountAmount,
      taxAmount,
      computedInterest,
      totalAmount,
      balanceDue,
      grossProfit,
      grossMargin,
    };
  }, [
    discountRate,
    loanInterestAmount,
    loanInterestRate,
    loanPrincipal,
    paidAmount,
    quantity,
    saleType,
    shippingFee,
    subtotal,
    taxRate,
    unitCost,
    unitPrice,
  ]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      businessId,
      businessName: selectedBusiness?.name ?? '',
      businessLegalName: selectedBusiness?.legalName ?? '',
      saleDate,
      invoiceNo,
      saleType,
      productName,
      sku,
      customer,
      quantity: Number(quantity || '0'),
      unitCost: Number(unitCost || '0'),
      unitPrice: Number(unitPrice || '0'),
      subtotal: preview.productSubtotal,
      discountRate: Number(discountRate || '0'),
      discountAmount: preview.discountAmount,
      taxRate: Number(taxRate || '0'),
      taxAmount: preview.taxAmount,
      shippingFee: Number(shippingFee || '0'),
      totalAmount: preview.totalAmount,
      paidAmount: Number(paidAmount || '0'),
      balanceDue: preview.balanceDue,
      paymentStatus,
      paymentMethod,
      dueDate,
      lastPaymentDate,
      deliveryStatus,
      salesperson,
      notes,
      loanPrincipal: Number(loanPrincipal || '0'),
      loanInterestRate: Number(loanInterestRate || '0'),
      loanInterestAmount: preview.computedInterest,
      loanTermMonths: Number(loanTermMonths || '0'),
      collateral,
      grossProfit: preview.grossProfit,
      grossMargin: preview.grossMargin,
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
            Back to Sales
          </Link>
          <div className="mt-3">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Add Sale</h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-600 sm:text-base">
              Create a sale or loan sale with complete payment, delivery, and financial details.
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
              <label htmlFor="businessId" className="mb-2 block text-sm font-medium text-slate-700">
                Which business is this sale for? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="businessId"
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
                {canSelectBusiness ? 'Choose the legal entity that owns this sale.' : 'Managers can only record sales for their assigned business.'}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Sale details</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm font-medium text-slate-700">
              Sale Date <span className="text-red-500">*</span>
              <input type="date" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={saleDate} onChange={(event) => setSaleDate(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Invoice Number <span className="text-red-500">*</span>
              <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={invoiceNo} onChange={(event) => setInvoiceNo(event.target.value.toUpperCase())} placeholder="e.g., ACM-S-006" required />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Sale Type
              <div className="relative mt-1">
                <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={saleType} onChange={(event) => setSaleType(event.target.value as (typeof saleTypes)[number])}>
                  {saleTypes.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Product / Loan Item <span className="text-red-500">*</span>
              <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={productName} onChange={(event) => setProductName(event.target.value)} placeholder="e.g., ApexBook Pro 14" required />
            </label>
            <label className="text-sm font-medium text-slate-700">
              SKU / Loan Code
              <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={sku} onChange={(event) => setSku(event.target.value.toUpperCase())} placeholder="e.g., ACM-LTP-14PRO" />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Customer <span className="text-red-500">*</span>
              <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={customer} onChange={(event) => setCustomer(event.target.value)} placeholder="e.g., Greenline Retail" required />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Quantity
              <input type="number" min="0" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Unit Cost
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={unitCost} onChange={(event) => setUnitCost(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Unit Price
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={unitPrice} onChange={(event) => setUnitPrice(event.target.value)} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Subtotal
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={subtotal} onChange={(event) => setSubtotal(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Discount Rate (%)
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={discountRate} onChange={(event) => setDiscountRate(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Tax Rate (%)
              <div className="relative mt-1">
                <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={taxRate} onChange={(event) => setTaxRate(event.target.value)}>
                  {taxRates.map((rate) => <option key={rate} value={rate}>{rate}%</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
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
                <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={paymentStatus} onChange={(event) => setPaymentStatus(event.target.value as (typeof paymentStatuses)[number])}>
                  {paymentStatuses.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Payment Method
              <div className="relative mt-1">
                <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                  {paymentMethods.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Due Date
              <input type="date" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Last Payment Date
              <input type="date" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={lastPaymentDate} onChange={(event) => setLastPaymentDate(event.target.value)} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Delivery Status
              <div className="relative mt-1">
                <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={deliveryStatus} onChange={(event) => setDeliveryStatus(event.target.value as (typeof deliveryStatuses)[number])}>
                  {deliveryStatuses.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Salesperson
              <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={salesperson} onChange={(event) => setSalesperson(event.target.value)} placeholder="e.g., Aline Niyonsaba" />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <Landmark className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Loan and settlement details</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm font-medium text-slate-700">
              Loan Principal
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={loanPrincipal} onChange={(event) => setLoanPrincipal(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Loan Interest Rate (%)
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={loanInterestRate} onChange={(event) => setLoanInterestRate(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Loan Interest Amount
              <input type="number" min="0" step="0.01" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={loanInterestAmount} onChange={(event) => setLoanInterestAmount(event.target.value)} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Loan Term (Months)
              <input type="number" min="0" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={loanTermMonths} onChange={(event) => setLoanTermMonths(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700 lg:col-span-2">
              Collateral
              <input className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={collateral} onChange={(event) => setCollateral(event.target.value)} placeholder="e.g., Equipment, receivables, truck logbooks" />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Additional information</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Notes
              <textarea rows={4} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add optional notes about the sale, payment plan, or delivery." />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <div className="mb-4 flex items-center gap-2">
            <BadgeInfo className="h-4 w-4 text-green-700" />
            <h3 className="text-sm font-semibold text-green-900">Financial preview</h3>
          </div>
          <div className="grid gap-3 text-sm text-green-900 sm:grid-cols-2 lg:grid-cols-3">
            <p>Subtotal: <span className="font-semibold">{money(preview.productSubtotal)}</span></p>
            <p>Discount: <span className="font-semibold">{money(preview.discountAmount)}</span></p>
            <p>Tax: <span className="font-semibold">{money(preview.taxAmount)}</span></p>
            <p>Total: <span className="font-semibold">{money(preview.totalAmount)}</span></p>
            <p>Gross Profit: <span className="font-semibold">{money(preview.grossProfit)}</span></p>
            <p>Gross Margin: <span className="font-semibold">{preview.grossMargin.toFixed(2)}%</span></p>
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2 text-xs text-slate-500">
            <Store className="h-4 w-4" />
            {selectedBusiness ? `${selectedBusiness.name} (${selectedBusiness.legalName})` : 'Select a business to continue'}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={backHref} className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Cancel
            </Link>
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700">
              <Plus className="h-4 w-4" />
              Create Sale
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
