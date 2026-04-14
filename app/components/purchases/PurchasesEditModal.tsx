'use client';

import React from 'react';
import { X } from 'lucide-react';
import { type PurchasePaymentStatus, type PurchaseRecord, type PurchaseType, type ReceiveStatus } from '@/app/lib/purchasesData';

type PurchasesEditModalProps = {
  isOpen: boolean;
  purchase: PurchaseRecord | null;
  onCancel: () => void;
  onSave: (purchase: PurchaseRecord) => void;
};

type PurchaseDraft = {
  purchaseDate: string;
  billNo: string;
  purchaseType: PurchaseType;
  supplier: string;
  productName: string;
  sku: string;
  quantity: string;
  unitCost: string;
  subtotal: string;
  discountRate: string;
  taxRate: string;
  shippingFee: string;
  totalAmount: string;
  paidAmount: string;
  paymentStatus: PurchasePaymentStatus;
  paymentMethod: string;
  dueDate: string;
  lastPaymentDate: string;
  receiveStatus: ReceiveStatus;
  purchaser: string;
  notes: string;
  expectedRevenue: string;
  expectedGrossProfit: string;
  expectedMargin: string;
  purchaseStatus: PurchaseRecord['purchaseStatus'];
};

const toDraft = (purchase: PurchaseRecord): PurchaseDraft => ({
  purchaseDate: purchase.purchaseDate,
  billNo: purchase.billNo,
  purchaseType: purchase.purchaseType,
  supplier: purchase.supplier,
  productName: purchase.productName,
  sku: purchase.sku,
  quantity: String(purchase.quantity),
  unitCost: String(purchase.unitCost),
  subtotal: String(purchase.subtotal),
  discountRate: String(purchase.discountRate),
  taxRate: String(purchase.taxRate),
  shippingFee: String(purchase.shippingFee),
  totalAmount: String(purchase.totalAmount),
  paidAmount: String(purchase.paidAmount),
  paymentStatus: purchase.paymentStatus,
  paymentMethod: purchase.paymentMethod,
  dueDate: purchase.dueDate,
  lastPaymentDate: purchase.lastPaymentDate === '-' ? '' : purchase.lastPaymentDate,
  receiveStatus: purchase.receiveStatus,
  purchaser: purchase.purchaser,
  notes: purchase.notes,
  expectedRevenue: String(purchase.expectedRevenue),
  expectedGrossProfit: String(purchase.expectedGrossProfit),
  expectedMargin: String(purchase.expectedMargin),
  purchaseStatus: purchase.purchaseStatus,
});

const toNumber = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const fieldClassName =
  'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200';

export default function PurchasesEditModal({ isOpen, purchase, onCancel, onSave }: PurchasesEditModalProps) {
  const [draft, setDraft] = React.useState<PurchaseDraft | null>(null);

  React.useEffect(() => {
    if (purchase) {
      setDraft(toDraft(purchase));
    } else {
      setDraft(null);
    }
  }, [purchase]);

  if (!isOpen || !purchase || !draft) {
    return null;
  }

  const updateField = <K extends keyof PurchaseDraft>(key: K, value: PurchaseDraft[K]) => {
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
    const nextSubtotal = nextQuantity * nextUnitCost;
    const nextDiscountRate = toNumber(draft.discountRate);
    const nextTaxRate = toNumber(draft.taxRate);
    const nextDiscountAmount = Math.max(0, nextSubtotal * (nextDiscountRate / 100));
    const nextTaxAmount = Math.max(0, (nextSubtotal - nextDiscountAmount) * (nextTaxRate / 100));
    const nextShippingFee = toNumber(draft.shippingFee);
    const nextTotalAmount = Math.max(0, nextSubtotal - nextDiscountAmount + nextTaxAmount + nextShippingFee);
    const nextPaidAmount = toNumber(draft.paidAmount);
    const nextBalanceDue = Math.max(0, nextTotalAmount - nextPaidAmount);
    const nextExpectedRevenue = Math.max(0, toNumber(draft.expectedRevenue));
    const nextExpectedGrossProfit = nextExpectedRevenue - nextTotalAmount;
    const nextExpectedMargin = nextExpectedRevenue > 0 ? (nextExpectedGrossProfit / nextExpectedRevenue) * 100 : 0;

    onSave({
      ...purchase,
      purchaseDate: draft.purchaseDate,
      billNo: draft.billNo,
      purchaseType: draft.purchaseType,
      supplier: draft.supplier,
      productName: draft.productName,
      sku: draft.sku,
      quantity: nextQuantity,
      unitCost: nextUnitCost,
      subtotal: nextSubtotal,
      discountRate: nextDiscountRate,
      discountAmount: nextDiscountAmount,
      taxRate: nextTaxRate,
      taxAmount: nextTaxAmount,
      shippingFee: nextShippingFee,
      totalAmount: nextTotalAmount,
      paidAmount: nextPaidAmount,
      balanceDue: nextBalanceDue,
      paymentStatus: draft.paymentStatus,
      paymentMethod: draft.paymentMethod,
      dueDate: draft.dueDate,
      lastPaymentDate: draft.lastPaymentDate,
      receiveStatus: draft.receiveStatus,
      purchaser: draft.purchaser,
      notes: draft.notes,
      expectedRevenue: nextExpectedRevenue,
      expectedGrossProfit: nextExpectedGrossProfit,
      expectedMargin: nextExpectedMargin,
      purchaseStatus: nextBalanceDue > 0 ? 'Open' : 'Closed',
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
              <h2 className="text-xl font-semibold text-slate-900">Edit Purchase</h2>
              <p className="mt-1 text-sm text-slate-600">Update purchase, payment, receiving, and financial details.</p>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-50"
              aria-label="Close edit purchase modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-y-auto px-4 py-4 sm:px-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <label className="text-sm font-medium text-slate-700">
                Purchase Date
                <input type="date" className={fieldClassName} value={draft.purchaseDate} onChange={(event) => updateField('purchaseDate', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Bill No
                <input className={fieldClassName} value={draft.billNo} onChange={(event) => updateField('billNo', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Type
                <select className={fieldClassName} value={draft.purchaseType} onChange={(event) => updateField('purchaseType', event.target.value as PurchaseType)}>
                  <option value="Inventory Purchase">Inventory Purchase</option>
                  <option value="Asset Purchase">Asset Purchase</option>
                  <option value="Service Purchase">Service Purchase</option>
                </select>
              </label>

              <label className="text-sm font-medium text-slate-700">
                Supplier
                <input className={fieldClassName} value={draft.supplier} onChange={(event) => updateField('supplier', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Item / Service
                <input className={fieldClassName} value={draft.productName} onChange={(event) => updateField('productName', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                SKU / Code
                <input className={fieldClassName} value={draft.sku} onChange={(event) => updateField('sku', event.target.value)} />
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
                Subtotal (Auto)
                <input type="number" step="0.01" min="0" className={fieldClassName} value={(toNumber(draft.quantity) * toNumber(draft.unitCost)).toFixed(2)} readOnly />
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
                Paid Amount
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.paidAmount} onChange={(event) => updateField('paidAmount', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Payment Status
                <select className={fieldClassName} value={draft.paymentStatus} onChange={(event) => updateField('paymentStatus', event.target.value as PurchasePaymentStatus)}>
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
                Receiving Status
                <select className={fieldClassName} value={draft.receiveStatus} onChange={(event) => updateField('receiveStatus', event.target.value as ReceiveStatus)}>
                  <option value="Pending">Pending</option>
                  <option value="Partially Received">Partially Received</option>
                  <option value="Received">Received</option>
                </select>
              </label>

              <label className="text-sm font-medium text-slate-700">
                Purchaser
                <input className={fieldClassName} value={draft.purchaser} onChange={(event) => updateField('purchaser', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Expected Revenue
                <input type="number" step="0.01" min="0" className={fieldClassName} value={draft.expectedRevenue} onChange={(event) => updateField('expectedRevenue', event.target.value)} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Total Purchase Cost (Auto)
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className={fieldClassName}
                  value={Math.max(
                    0,
                    toNumber(draft.quantity) * toNumber(draft.unitCost)
                    - (toNumber(draft.quantity) * toNumber(draft.unitCost) * (toNumber(draft.discountRate) / 100))
                    + ((toNumber(draft.quantity) * toNumber(draft.unitCost)
                      - (toNumber(draft.quantity) * toNumber(draft.unitCost) * (toNumber(draft.discountRate) / 100)))
                      * (toNumber(draft.taxRate) / 100))
                    + toNumber(draft.shippingFee)
                  ).toFixed(2)}
                  readOnly
                />
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
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
