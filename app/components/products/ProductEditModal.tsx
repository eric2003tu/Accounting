'use client';

import React from 'react';
import { X } from 'lucide-react';
import { ProductRecord } from '@/app/lib/productsData';

type ProductEditModalProps = {
  isOpen: boolean;
  product: ProductRecord | null;
  onCancel: () => void;
  onSave: (product: ProductRecord) => void;
};

type ProductDraft = {
  sku: string;
  barcode: string;
  productName: string;
  category: string;
  brand: string;
  supplier: string;
  currency: ProductRecord['currency'];
  unitCost: string;
  unitPrice: string;
  taxRate: string;
  discountRate: string;
  stockQuantity: string;
  reorderLevel: string;
  safetyStock: string;
  valuationMethod: ProductRecord['valuationMethod'];
  warehouse: string;
  cogsToDate: string;
  revenueToDate: string;
  lastPurchaseDate: string;
  lastSaleDate: string;
  status: ProductRecord['status'];
};

const toDraft = (product: ProductRecord): ProductDraft => ({
  sku: product.sku,
  barcode: product.barcode,
  productName: product.productName,
  category: product.category,
  brand: product.brand,
  supplier: product.supplier,
  currency: product.currency,
  unitCost: String(product.unitCost),
  unitPrice: String(product.unitPrice),
  taxRate: String(product.taxRate),
  discountRate: String(product.discountRate),
  stockQuantity: String(product.stockQuantity),
  reorderLevel: String(product.reorderLevel),
  safetyStock: String(product.safetyStock),
  valuationMethod: product.valuationMethod,
  warehouse: product.warehouse,
  cogsToDate: String(product.cogsToDate),
  revenueToDate: String(product.revenueToDate),
  lastPurchaseDate: product.lastPurchaseDate,
  lastSaleDate: product.lastSaleDate,
  status: product.status,
});

const toNumber = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export default function ProductEditModal({ isOpen, product, onCancel, onSave }: ProductEditModalProps) {
  const [draft, setDraft] = React.useState<ProductDraft | null>(null);

  React.useEffect(() => {
    if (product) {
      setDraft(toDraft(product));
    } else {
      setDraft(null);
    }
  }, [product]);

  if (!isOpen || !product || !draft) {
    return null;
  }

  const updateField = <K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) => {
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
    onSave({
      ...product,
      sku: draft.sku,
      barcode: draft.barcode,
      productName: draft.productName,
      category: draft.category,
      brand: draft.brand,
      supplier: draft.supplier,
      currency: draft.currency,
      unitCost: toNumber(draft.unitCost),
      unitPrice: toNumber(draft.unitPrice),
      taxRate: toNumber(draft.taxRate),
      discountRate: toNumber(draft.discountRate),
      stockQuantity: toNumber(draft.stockQuantity),
      reorderLevel: toNumber(draft.reorderLevel),
      safetyStock: toNumber(draft.safetyStock),
      valuationMethod: draft.valuationMethod,
      warehouse: draft.warehouse,
      cogsToDate: toNumber(draft.cogsToDate),
      revenueToDate: toNumber(draft.revenueToDate),
      lastPurchaseDate: draft.lastPurchaseDate,
      lastSaleDate: draft.lastSaleDate,
      status: draft.status,
    });
  };

  const inputClassName =
    'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200';

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-slate-950/45"
        onClick={onCancel}
      />

      <div className="relative flex min-h-full items-center justify-center p-4 lg:pl-64">
        <div className="relative my-auto flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.22)]">
          <div className="flex items-start justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Edit Product</h2>
              <p className="mt-1 text-sm text-slate-600">Update product inventory and financial details.</p>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-50"
              aria-label="Close edit product modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-y-auto px-4 py-4 sm:px-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm font-medium text-slate-700">
              Product Name
              <input className={inputClassName} value={draft.productName} onChange={(event) => updateField('productName', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              SKU
              <input className={inputClassName} value={draft.sku} onChange={(event) => updateField('sku', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Barcode
              <input className={inputClassName} value={draft.barcode} onChange={(event) => updateField('barcode', event.target.value)} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Category
              <input className={inputClassName} value={draft.category} onChange={(event) => updateField('category', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Brand
              <input className={inputClassName} value={draft.brand} onChange={(event) => updateField('brand', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Supplier
              <input className={inputClassName} value={draft.supplier} onChange={(event) => updateField('supplier', event.target.value)} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Currency
              <select className={inputClassName} value={draft.currency} onChange={(event) => updateField('currency', event.target.value as ProductRecord['currency'])}>
                <option value="USD">USD</option>
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Unit Cost
              <input type="number" step="0.01" className={inputClassName} value={draft.unitCost} onChange={(event) => updateField('unitCost', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Unit Price
              <input type="number" step="0.01" className={inputClassName} value={draft.unitPrice} onChange={(event) => updateField('unitPrice', event.target.value)} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Tax Rate (%)
              <input type="number" step="0.01" className={inputClassName} value={draft.taxRate} onChange={(event) => updateField('taxRate', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Discount Rate (%)
              <input type="number" step="0.01" className={inputClassName} value={draft.discountRate} onChange={(event) => updateField('discountRate', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Stock Quantity
              <input type="number" className={inputClassName} value={draft.stockQuantity} onChange={(event) => updateField('stockQuantity', event.target.value)} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Reorder Level
              <input type="number" className={inputClassName} value={draft.reorderLevel} onChange={(event) => updateField('reorderLevel', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Safety Stock
              <input type="number" className={inputClassName} value={draft.safetyStock} onChange={(event) => updateField('safetyStock', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Stock Status
              <select className={inputClassName} value={draft.status} onChange={(event) => updateField('status', event.target.value as ProductRecord['status'])}>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700">
              COGS (YTD)
              <input type="number" step="0.01" className={inputClassName} value={draft.cogsToDate} onChange={(event) => updateField('cogsToDate', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Revenue (YTD)
              <input type="number" step="0.01" className={inputClassName} value={draft.revenueToDate} onChange={(event) => updateField('revenueToDate', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Valuation Method
              <select className={inputClassName} value={draft.valuationMethod} onChange={(event) => updateField('valuationMethod', event.target.value as ProductRecord['valuationMethod'])}>
                <option value="FIFO">FIFO</option>
                <option value="Weighted Average">Weighted Average</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Warehouse
              <input className={inputClassName} value={draft.warehouse} onChange={(event) => updateField('warehouse', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Last Purchase Date
              <input type="date" className={inputClassName} value={draft.lastPurchaseDate} onChange={(event) => updateField('lastPurchaseDate', event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Last Sale Date
              <input type="date" className={inputClassName} value={draft.lastSaleDate} onChange={(event) => updateField('lastSaleDate', event.target.value)} />
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
