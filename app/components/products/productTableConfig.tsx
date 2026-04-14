'use client';

import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { ProductRecord } from '@/app/lib/productsData';

type ProductColumn = {
  key: keyof ProductRecord;
  label: string;
  render?: (value: any, row: ProductRecord) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
};

type ProductFilter = {
  key: keyof ProductRecord;
  label: string;
  options: Array<{ label: string; value: string }>;
};

export const buildProductColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (product: ProductRecord) => void;
  onDelete: (product: ProductRecord) => void;
}): ProductColumn[] => [
  {
    key: 'sku',
    label: 'SKU',
    render: (value) => <span className="font-mono text-xs">{value}</span>,
  },
  {
    key: 'barcode',
    label: 'Barcode',
    render: (value) => <span className="font-mono text-xs text-slate-600">{value}</span>,
  },
  {
    key: 'productName',
    label: 'Product',
    render: (value) => <span className="font-medium text-slate-900">{value}</span>,
  },
  { key: 'category', label: 'Category' },
  { key: 'brand', label: 'Brand' },
  { key: 'supplier', label: 'Supplier' },
  {
    key: 'status',
    label: 'Stock Status',
    render: (value) => (
      <span
        className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
          value === 'In Stock'
            ? 'bg-green-100 text-green-700'
            : value === 'Low Stock'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-red-100 text-red-700'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'stockQuantity',
    label: 'Qty',
    align: 'right',
    render: (value) => <span className="font-semibold text-slate-800">{value}</span>,
  },
  {
    key: 'reorderLevel',
    label: 'Reorder',
    align: 'right',
  },
  {
    key: 'safetyStock',
    label: 'Safety Stock',
    align: 'right',
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
    label: 'Unit Price',
    align: 'right',
    render: (value, row) => (
      <span>
        {row.currency} {value.toFixed(2)}
      </span>
    ),
  },
  {
    key: 'taxRate',
    label: 'Tax',
    align: 'right',
    render: (value) => <span>{value}%</span>,
  },
  {
    key: 'discountRate',
    label: 'Discount',
    align: 'right',
    render: (value) => <span>{value}%</span>,
  },
  {
    key: 'cogsToDate',
    label: 'COGS (YTD)',
    align: 'right',
    render: (value) => <span className="font-semibold text-red-600">${value.toFixed(2)}</span>,
  },
  {
    key: 'revenueToDate',
    label: 'Revenue (YTD)',
    align: 'right',
    render: (value) => <span className="font-semibold text-green-600">${value.toFixed(2)}</span>,
  },
  {
    key: 'currency',
    label: 'Gross Profit (YTD)',
    align: 'right',
    render: (_value, row) => {
      const grossProfit = row.revenueToDate - row.cogsToDate;
      return (
        <span className={grossProfit >= 0 ? 'font-semibold text-green-600' : 'font-semibold text-red-600'}>
          ${grossProfit.toFixed(2)}
        </span>
      );
    },
  },
  {
    key: 'currency',
    label: 'Gross Margin',
    align: 'right',
    render: (_value, row) => {
      const grossProfit = row.revenueToDate - row.cogsToDate;
      const margin = row.revenueToDate > 0 ? (grossProfit / row.revenueToDate) * 100 : 0;
      return <span className="font-medium text-slate-800">{margin.toFixed(2)}%</span>;
    },
  },
  {
    key: 'currency',
    label: 'Inventory Value',
    align: 'right',
    render: (_value, row) => <span className="font-semibold text-slate-900">${(row.stockQuantity * row.unitCost).toFixed(2)}</span>,
  },
  {
    key: 'currency',
    label: 'Potential Revenue',
    align: 'right',
    render: (_value, row) => <span className="font-semibold text-green-700">${(row.stockQuantity * row.unitPrice).toFixed(2)}</span>,
  },
  { key: 'valuationMethod', label: 'Valuation' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'lastPurchaseDate', label: 'Last Purchase' },
  { key: 'lastSaleDate', label: 'Last Sale' },
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
          aria-label={`Edit ${row.productName}`}
          title="Edit"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(row)}
          className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 p-2 text-red-700 transition hover:bg-red-100"
          aria-label={`Delete ${row.productName}`}
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

export const buildProductFilters = (products: ProductRecord[]): ProductFilter[] => {
  const categoryOptions = Array.from(new Set(products.map((product) => product.category))).map((category) => ({
    label: category,
    value: category,
  }));

  const supplierOptions = Array.from(new Set(products.map((product) => product.supplier))).map((supplier) => ({
    label: supplier,
    value: supplier,
  }));

  return [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'In Stock', value: 'In Stock' },
        { label: 'Low Stock', value: 'Low Stock' },
        { label: 'Out of Stock', value: 'Out of Stock' },
      ],
    },
    {
      key: 'category',
      label: 'Category',
      options: categoryOptions,
    },
    {
      key: 'supplier',
      label: 'Supplier',
      options: supplierOptions,
    },
  ];
};
