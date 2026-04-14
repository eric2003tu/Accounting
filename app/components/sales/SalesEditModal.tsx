'use client';

import React from 'react';
import { X } from 'lucide-react';
import { type SaleRecord } from '@/app/lib/salesData';

type SalesEditModalProps = {
  isOpen: boolean;
  sale: SaleRecord | null;
  onCancel: () => void;
  onSave: (sale: SaleRecord) => void;
};

type SaleDraft = {
  saleDate: string;
  invoiceNo: string;
  saleType: SaleRecord['saleType'];
  productName: string;
  sku: string;
  customer: string;
  quantity: string;
  unitCost: string;
  unitPrice: string;
  subtotal: string;
  discountRate: string;
  taxRate: string;
  shippingFee: string;
  totalAmount: string;
  paidAmount: string;
  paymentStatus: SaleRecord['paymentStatus'];
  paymentMethod: string;
  dueDate: string;
  lastPaymentDate: string;
  deliveryStatus: SaleRecord['deliveryStatus'];
  salesperson: string;
  notes: string;
  loanPrincipal: string;
  loanInterestRate: string;
  loanInterestAmount: string;
  loanTermMonths: string;
  collateral: string;
  grossProfit: string;
  grossMargin: string;
  saleStatus: SaleRecord['saleStatus'];
};

const toDraft = (sale: SaleRecord): SaleDraft => ({
  saleDate: sale.saleDate,
  invoiceNo: sale.invoiceNo,
  saleType: sale.saleType,
  productName: sale.productName,
  sku: sale.sku,
  customer: sale.customer,
  quantity: String(sale.quantity),
  unitCost: String(sale.unitCost),
  unitPrice: String(sale.unitPrice),
  subtotal: String(sale.subtotal),
  discountRate: String(sale.discountRate),
  taxRate: String(sale.taxRate),
  shippingFee: String(sale.shippingFee),
  totalAmount: String(sale.totalAmount),
  paidAmount: String(sale.paidAmount),
  paymentStatus: sale.paymentStatus,
  paymentMethod: sale.paymentMethod,
  dueDate: sale.dueDate,
  lastPaymentDate: sale.lastPaymentDate,
  deliveryStatus: sale.deliveryStatus,
  salesperson: sale.salesperson,
  notes: sale.notes,
  loanPrincipal: String(sale.loanPrincipal),
  loanInterestRate: String(sale.loanInterestRate),
  loanInterestAmount: String(sale.loanInterestAmount),
  loanTermMonths: String(sale.loanTermMonths),
  collateral: sale.collateral,
  grossProfit: String(sale.grossProfit),
  grossMargin: String(sale.grossMargin),
  saleStatus: sale.saleStatus,
});

const toNumber = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const fieldClassName =
  'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200';

export default function SalesEditModal({ isOpen, sale, onCancel, onSave }: SalesEditModalProps) {
  const [draft, setDraft] = React.useState<SaleDraft | null>(null);

  React.useEffect(() => {
    if (sale) {
      setDraft(toDraft(sale));
    } else {
      setDraft(null);
    }
  }, [sale]);

  if (!isOpen || !sale || !draft) {
    return null;
  }

  const updateField = <K extends keyof SaleDraft>(key: K, value: SaleDraft[K]) => {
    setDraft((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        [key]: value,
      };
    });
  };

  const handleSave = () => {
    const nextQuantity = toNumber(draft.quantity);
    const nextUnitCost = toNumber(draft.unitCost);
    const nextUnitPrice = toNumber(draft.unitPrice);
    const nextSubtotal = toNumber(draft.subtotal);
    const nextDiscountRate = toNumber(draft.discountRate);
    const nextTaxRate = toNumber(draft.taxRate);
    const nextShippingFee = toNumber(draft.shippingFee);
    const nextLoanPrincipal = toNumber(draft.loanPrincipal);
    const nextLoanInterestRate = toNumber(draft.loanInterestRate);
    const nextLoanInterestAmount = toNumber(draft.loanInterestAmount);
    const nextComputedDiscount = Math.max(0, nextSubtotal * (nextDiscountRate / 100));
    const nextComputedTax = draft.saleType === 'Loan Sale' ? 0 : Math.max(0, (nextSubtotal - nextComputedDiscount) * (nextTaxRate / 100));
    const nextComputedLoanInterest = draft.saleType === 'Loan Sale'
      ? Math.max(0, nextLoanInterestAmount || (nextLoanPrincipal * (nextLoanInterestRate / 100)))
      : 0;
    const nextTotalAmount = draft.saleType === 'Loan Sale'
      ? Math.max(0, nextSubtotal + nextComputedLoanInterest + nextShippingFee)
      : Math.max(0, nextSubtotal - nextComputedDiscount + nextComputedTax + nextShippingFee);
    const nextPaidAmount = toNumber(draft.paidAmount);
    const nextBalanceDue = Math.max(0, nextTotalAmount - nextPaidAmount);
    const nextGrossProfit = draft.saleType === 'Loan Sale'
      ? nextComputedLoanInterest
      : Math.max(0, nextSubtotal - nextComputedDiscount - (nextQuantity * nextUnitCost) - nextShippingFee);
    const nextGrossMargin = nextTotalAmount > 0 ? (nextGrossProfit / nextTotalAmount) * 100 : 0;

    onSave({
      ...sale,
      saleDate: draft.saleDate,
      invoiceNo: draft.invoiceNo,
      saleType: draft.saleType,
      productName: draft.productName,
      sku: draft.sku,
      customer: draft.customer,
      quantity: nextQuantity,
      unitCost: nextUnitCost,
      unitPrice: nextUnitPrice,
      subtotal: nextSubtotal,
      discountRate: nextDiscountRate,
      discountAmount: nextComputedDiscount,
      taxRate: nextTaxRate,
      taxAmount: nextComputedTax,
      shippingFee: nextShippingFee,
      totalAmount: nextTotalAmount,
      paidAmount: nextPaidAmount,
      balanceDue: nextBalanceDue,
      paymentStatus: draft.paymentStatus,
      paymentMethod: draft.paymentMethod,
      dueDate: draft.dueDate,
      lastPaymentDate: draft.lastPaymentDate,
      deliveryStatus: draft.deliveryStatus,
      salesperson: draft.salesperson,
      notes: draft.notes,
      loanPrincipal: nextLoanPrincipal,
      loanInterestRate: nextLoanInterestRate,
      loanInterestAmount: nextComputedLoanInterest,
      loanTermMonths: toNumber(draft.loanTermMonths),
      collateral: draft.collateral,
      grossProfit: nextGrossProfit,
      grossMargin: nextGrossMargin,
      saleStatus: nextBalanceDue > 0 ? 'Open' : 'Closed',
    });
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-slate-950/45"
        onClick={onCancel}
      />

      <div className="relative flex min-h-full items-center justify-center p-4 lg:pl-64">
        <div className="relative my-auto flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.22)]">
          <div className="flex items-start justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Edit Sale</h2>
              <p className="mt-1 text-sm text-slate-600">Update sale, payment, loan, and delivery details.</p>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-50"
              aria-label="Close edit sale modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-y-auto px-4 py-4 sm:px-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <label className="text-sm font-medium text-slate-700">
                Sale Date
                <input type="date" className={fieldClassName} value={draft.saleDate} onChange={(event) => updateField('saleDate', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Invoice No
                <input className={fieldClassName} value={draft.invoiceNo} onChange={(event) => updateField('invoiceNo', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Sale Type
                <select className={fieldClassName} value={draft.saleType} onChange={(event) => updateField('saleType', event.target.value as SaleRecord['saleType'])}>
                  <option value="Product Sale">Product Sale</option>
                  <option value="Loan Sale">Loan Sale</option>
                </select>
              </label>

              <label className="text-sm font-medium text-slate-700">
                Product / Loan Item
                <input className={fieldClassName} value={draft.productName} onChange={(event) => updateField('productName', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                SKU
                <input className={fieldClassName} value={draft.sku} onChange={(event) => updateField('sku', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Customer
                <input className={fieldClassName} value={draft.customer} onChange={(event) => updateField('customer', event.target.value)} />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Quantity
                <input type="number" min="0" className={fieldClassName} value={draft.quantity} onChange={(event) => updateField('quantity', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Unit Cost
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.unitCost} onChange={(event) => updateField('unitCost', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Unit Price / Principal
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.unitPrice} onChange={(event) => updateField('unitPrice', event.target.value)} />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Subtotal
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.subtotal} onChange={(event) => updateField('subtotal', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Discount Rate (%)
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.discountRate} onChange={(event) => updateField('discountRate', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Tax Rate (%)
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.taxRate} onChange={(event) => updateField('taxRate', event.target.value)} />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Shipping Fee
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.shippingFee} onChange={(event) => updateField('shippingFee', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Total Amount
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.totalAmount} onChange={(event) => updateField('totalAmount', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Paid Amount
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.paidAmount} onChange={(event) => updateField('paidAmount', event.target.value)} />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Payment Status
                <select className={fieldClassName} value={draft.paymentStatus} onChange={(event) => updateField('paymentStatus', event.target.value as SaleRecord['paymentStatus'])}>
                  <option value="Fully Paid">Fully Paid</option>
                  <option value="Partially Paid">Partially Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700">
                Payment Method
                <input className={fieldClassName} value={draft.paymentMethod} onChange={(event) => updateField('paymentMethod', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Due Date
                <input type="date" className={fieldClassName} value={draft.dueDate} onChange={(event) => updateField('dueDate', event.target.value)} />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Last Payment Date
                <input type="date" className={fieldClassName} value={draft.lastPaymentDate} onChange={(event) => updateField('lastPaymentDate', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Delivery Status
                <select className={fieldClassName} value={draft.deliveryStatus} onChange={(event) => updateField('deliveryStatus', event.target.value as SaleRecord['deliveryStatus'])}>
                  <option value="Pending">Pending</option>
                  <option value="Packed">Packed</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Settled">Settled</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700">
                Salesperson
                <input className={fieldClassName} value={draft.salesperson} onChange={(event) => updateField('salesperson', event.target.value)} />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Loan Principal
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.loanPrincipal} onChange={(event) => updateField('loanPrincipal', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Loan Interest Rate (%)
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.loanInterestRate} onChange={(event) => updateField('loanInterestRate', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Loan Interest Amount
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.loanInterestAmount} onChange={(event) => updateField('loanInterestAmount', event.target.value)} />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Loan Term (Months)
                <input type="number" min="0" className={fieldClassName} value={draft.loanTermMonths} onChange={(event) => updateField('loanTermMonths', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Collateral
                <input className={fieldClassName} value={draft.collateral} onChange={(event) => updateField('collateral', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Sale Status
                <select className={fieldClassName} value={draft.saleStatus} onChange={(event) => updateField('saleStatus', event.target.value as SaleRecord['saleStatus'])}>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </label>

              <label className="text-sm font-medium text-slate-700 md:col-span-2 lg:col-span-3">
                Notes
                <textarea rows={3} className={fieldClassName} value={draft.notes} onChange={(event) => updateField('notes', event.target.value)} />
              </label>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-slate-200 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
