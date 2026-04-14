'use client';

import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { type SaleRecord } from '@/app/lib/salesData';

type SalesColumn = {
  key: keyof SaleRecord;
  label: string;
  render?: (value: any, row: SaleRecord) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
};

type SalesFilter = {
  key: keyof SaleRecord;
  label: string;
  options: Array<{ label: string; value: string }>;
};

export const buildSalesColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (sale: SaleRecord) => void;
  onDelete: (sale: SaleRecord) => void;
}): SalesColumn[] => [
  { key: 'saleDate', label: 'Sale Date', width: 'w-28' },
  {
    key: 'invoiceNo',
    label: 'Invoice',
    render: (value) => <span className="font-mono text-xs">{value}</span>,
  },
  {
    key: 'saleType',
    label: 'Type',
    render: (value) => (
      <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${value === 'Loan Sale' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
        {value}
      </span>
    ),
  },
  {
    key: 'productName',
    label: 'Product / Loan Item',
    render: (value, row) => (
      <div className="min-w-0">
        <div className="font-medium text-slate-900">{value}</div>
        <div className="text-xs text-slate-500">{row.saleType}</div>
      </div>
    ),
  },
  {
    key: 'sku',
    label: 'SKU',
    render: (value) => <span className="font-mono text-xs text-slate-600">{value}</span>,
  },
  { key: 'customer', label: 'Customer' },
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
    render: (value, row) => (
      <span>
        {row.currency} {value.toFixed(2)}
      </span>
    ),
  },
  {
    key: 'unitPrice',
    label: 'Unit Price / Principal',
    align: 'right',
    render: (value, row) => (
      <span>
        {row.currency} {value.toFixed(2)}
      </span>
    ),
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
    label: 'Total',
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
    key: 'loanPrincipal',
    label: 'Loan Principal',
    align: 'right',
    render: (value, row) => (
      <span className={row.saleType === 'Loan Sale' ? 'font-semibold text-purple-700' : 'text-slate-400'}>
        {value > 0 ? `${row.currency} ${value.toFixed(2)}` : '-'}
      </span>
    ),
  },
  {
    key: 'loanInterestRate',
    label: 'Loan Interest %',
    align: 'right',
    render: (value, row) => (row.saleType === 'Loan Sale' ? <span>{value}%</span> : <span className="text-slate-400">-</span>),
  },
  {
    key: 'loanInterestAmount',
    label: 'Loan Interest',
    align: 'right',
    render: (value, row) => (
      <span className={row.saleType === 'Loan Sale' ? 'font-semibold text-purple-700' : 'text-slate-400'}>
        {value > 0 ? `${row.currency} ${value.toFixed(2)}` : '-'}
      </span>
    ),
  },
  {
    key: 'loanTermMonths',
    label: 'Loan Term (Months)',
    align: 'right',
    render: (value, row) => (row.saleType === 'Loan Sale' ? <span>{value}</span> : <span className="text-slate-400">-</span>),
  },
  {
    key: 'collateral',
    label: 'Collateral',
    render: (value, row) => (row.saleType === 'Loan Sale' ? <span className="text-slate-700">{value}</span> : <span className="text-slate-400">-</span>),
  },
  {
    key: 'grossProfit',
    label: 'Gross Profit',
    align: 'right',
    render: (value, row) => (
      <span className={value >= 0 ? 'font-semibold text-green-700' : 'font-semibold text-red-700'}>
        {row.currency} {value.toFixed(2)}
      </span>
    ),
  },
  {
    key: 'grossMargin',
    label: 'Gross Margin',
    align: 'right',
    render: (value) => <span className="font-medium text-slate-800">{value.toFixed(2)}%</span>,
  },
  {
    key: 'deliveryStatus',
    label: 'Delivery',
    render: (value) => (
      <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
        {value}
      </span>
    ),
  },
  { key: 'salesperson', label: 'Salesperson' },
  {
    key: 'saleStatus',
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
          aria-label={`Edit sale ${row.invoiceNo}`}
          title="Edit"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(row)}
          className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 p-2 text-red-700 transition hover:bg-red-100"
          aria-label={`Delete sale ${row.invoiceNo}`}
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

export const buildSalesFilters = (sales: SaleRecord[]): SalesFilter[] => {
  const customerOptions = Array.from(new Set(sales.map((sale) => sale.customer))).map((customer) => ({
    label: customer,
    value: customer,
  }));

  const paymentMethodOptions = Array.from(new Set(sales.map((sale) => sale.paymentMethod))).map((paymentMethod) => ({
    label: paymentMethod,
    value: paymentMethod,
  }));

  return [
    {
      key: 'saleType',
      label: 'Type',
      options: [
        { label: 'Product Sale', value: 'Product Sale' },
        { label: 'Loan Sale', value: 'Loan Sale' },
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
      key: 'paymentMethod',
      label: 'Payment Method',
      options: paymentMethodOptions,
    },
    {
      key: 'customer',
      label: 'Customer',
      options: customerOptions,
    },
  ];
};
