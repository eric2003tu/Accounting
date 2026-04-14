'use client';

import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { type PurchaseRecord } from '@/app/lib/purchasesData';

type PurchaseColumn = {
  key: keyof PurchaseRecord;
  label: string;
  render?: (value: any, row: PurchaseRecord) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
};

type PurchaseFilter = {
  key: keyof PurchaseRecord;
  label: string;
  options: Array<{ label: string; value: string }>;
};

export const buildPurchaseColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (purchase: PurchaseRecord) => void;
  onDelete: (purchase: PurchaseRecord) => void;
}): PurchaseColumn[] => [
  { key: 'purchaseDate', label: 'Purchase Date', width: 'w-28' },
  {
    key: 'billNo',
    label: 'Bill No',
    render: (value) => <span className="font-mono text-xs">{value}</span>,
  },
  {
    key: 'purchaseType',
    label: 'Type',
    render: (value) => (
      <span
        className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
          value === 'Inventory Purchase'
            ? 'bg-green-100 text-green-700'
            : value === 'Asset Purchase'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-amber-100 text-amber-700'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'productName',
    label: 'Item / Service',
    render: (value, row) => (
      <div className="min-w-0">
        <div className="font-medium text-slate-900">{value}</div>
        <div className="text-xs text-slate-500">{row.sku}</div>
      </div>
    ),
  },
  { key: 'supplier', label: 'Supplier' },
  {
    key: 'quantity',
    label: 'Qty',
    align: 'right',
    render: (value) => <span className="font-semibold text-slate-800">{value}</span>,
  },
  {
    key: 'unitCost',
    label: 'Unit Cost',
    align: 'right',
    render: (value, row) => <span>{row.currency} {value.toFixed(2)}</span>,
  },
  {
    key: 'subtotal',
    label: 'Subtotal',
    align: 'right',
    render: (value, row) => <span className="font-semibold text-slate-900">{row.currency} {value.toFixed(2)}</span>,
  },
  {
    key: 'discountRate',
    label: 'Discount %',
    align: 'right',
    render: (value) => <span>{value}%</span>,
  },
  {
    key: 'discountAmount',
    label: 'Discount',
    align: 'right',
    render: (value, row) => <span>{row.currency} {value.toFixed(2)}</span>,
  },
  {
    key: 'taxRate',
    label: 'Tax %',
    align: 'right',
    render: (value) => <span>{value}%</span>,
  },
  {
    key: 'taxAmount',
    label: 'Tax',
    align: 'right',
    render: (value, row) => <span>{row.currency} {value.toFixed(2)}</span>,
  },
  {
    key: 'shippingFee',
    label: 'Shipping',
    align: 'right',
    render: (value, row) => <span>{row.currency} {value.toFixed(2)}</span>,
  },
  {
    key: 'totalAmount',
    label: 'Total Purchase Cost',
    align: 'right',
    render: (value, row) => <span className="font-semibold text-slate-900">{row.currency} {value.toFixed(2)}</span>,
  },
  {
    key: 'paidAmount',
    label: 'Paid',
    align: 'right',
    render: (value, row) => <span className="font-semibold text-emerald-700">{row.currency} {value.toFixed(2)}</span>,
  },
  {
    key: 'balanceDue',
    label: 'Balance Due',
    align: 'right',
    render: (value, row) => (
      <span className={value > 0 ? 'font-semibold text-amber-700' : 'font-semibold text-emerald-700'}>
        {row.currency} {value.toFixed(2)}
      </span>
    ),
  },
  {
    key: 'paymentStatus',
    label: 'Payment Status',
    render: (value) => (
      <span
        className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
          value === 'Fully Paid'
            ? 'bg-green-100 text-green-700'
            : value === 'Partially Paid'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-red-100 text-red-700'
        }`}
      >
        {value}
      </span>
    ),
  },
  { key: 'paymentMethod', label: 'Payment Method' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'lastPaymentDate', label: 'Last Payment' },
  {
    key: 'receiveStatus',
    label: 'Receiving',
    render: (value) => (
      <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
        {value}
      </span>
    ),
  },
  {
    key: 'expectedRevenue',
    label: 'Expected Revenue',
    align: 'right',
    render: (value, row) => (
      <span className={value > 0 ? 'font-semibold text-green-700' : 'text-slate-400'}>
        {value > 0 ? `${row.currency} ${value.toFixed(2)}` : '-'}
      </span>
    ),
  },
  {
    key: 'expectedGrossProfit',
    label: 'Expected Gross Profit',
    align: 'right',
    render: (value, row) => (
      <span className={value >= 0 ? 'font-semibold text-green-700' : 'font-semibold text-red-700'}>
        {row.currency} {value.toFixed(2)}
      </span>
    ),
  },
  {
    key: 'expectedMargin',
    label: 'Expected Margin',
    align: 'right',
    render: (value, row) => <span className={row.expectedRevenue > 0 ? 'font-medium text-slate-800' : 'text-slate-400'}>{row.expectedRevenue > 0 ? `${value.toFixed(2)}%` : '-'}</span>,
  },
  { key: 'purchaser', label: 'Purchaser' },
  {
    key: 'purchaseStatus',
    label: 'Status',
    render: (value) => (
      <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${value === 'Closed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
        {value}
      </span>
    ),
  },
  {
    key: 'id',
    label: 'Actions',
    width: 'w-28',
    render: (_value, row) => (
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(row)}
          className="inline-flex items-center rounded-lg border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50"
          aria-label={`Edit purchase ${row.billNo}`}
          title="Edit"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(row)}
          className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 p-2 text-red-700 transition hover:bg-red-100"
          aria-label={`Delete purchase ${row.billNo}`}
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

export const buildPurchaseFilters = (purchases: PurchaseRecord[]): PurchaseFilter[] => {
  const supplierOptions = Array.from(new Set(purchases.map((purchase) => purchase.supplier))).map((supplier) => ({
    label: supplier,
    value: supplier,
  }));

  const paymentMethodOptions = Array.from(new Set(purchases.map((purchase) => purchase.paymentMethod))).map((paymentMethod) => ({
    label: paymentMethod,
    value: paymentMethod,
  }));

  return [
    {
      key: 'purchaseType',
      label: 'Type',
      options: [
        { label: 'Inventory Purchase', value: 'Inventory Purchase' },
        { label: 'Asset Purchase', value: 'Asset Purchase' },
        { label: 'Service Purchase', value: 'Service Purchase' },
      ],
    },
    {
      key: 'paymentStatus',
      label: 'Payment Status',
      options: [
        { label: 'Fully Paid', value: 'Fully Paid' },
        { label: 'Partially Paid', value: 'Partially Paid' },
        { label: 'Unpaid', value: 'Unpaid' },
      ],
    },
    {
      key: 'receiveStatus',
      label: 'Receiving',
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Partially Received', value: 'Partially Received' },
        { label: 'Received', value: 'Received' },
      ],
    },
    {
      key: 'paymentMethod',
      label: 'Payment Method',
      options: paymentMethodOptions,
    },
    {
      key: 'supplier',
      label: 'Supplier',
      options: supplierOptions,
    },
  ];
};
