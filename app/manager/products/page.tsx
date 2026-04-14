'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Boxes, Package, AlertTriangle, TrendingUp, DollarSign, Plus } from 'lucide-react';
import StatCard from '@/app/components/manager/StatCard';
import DataTable from '@/app/components/manager/DataTable';
import DeleteConfirmationModal from '@/app/components/admin/DeleteConfirmationModal';
import ProductEditModal from '@/app/components/products/ProductEditModal';
import { buildProductColumns, buildProductFilters } from '@/app/components/products/productTableConfig';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';
import { productsByBusiness, ProductRecord } from '@/app/lib/productsData';

const managerBusinessId = 1;
const managerBusiness = adminBusinesses.find((business) => business.id === managerBusinessId);

function money(value: number) {
  return `$${value.toFixed(2)}`;
}

function percent(value: number) {
  return `${value.toFixed(2)}%`;
}

export default function ManagerProductsPage() {
  if (!managerBusiness) {
    return <div className="text-slate-600">Manager business assignment is missing.</div>;
  }

  const [products, setProducts] = React.useState<ProductRecord[]>(productsByBusiness[managerBusinessId] ?? []);
  const [productToDelete, setProductToDelete] = React.useState<ProductRecord | null>(null);
  const [productToEdit, setProductToEdit] = React.useState<ProductRecord | null>(null);

  const totalSkus = products.length;
  const totalUnits = products.reduce((sum, product) => sum + product.stockQuantity, 0);
  const inventoryValue = products.reduce((sum, product) => sum + product.stockQuantity * product.unitCost, 0);
  const projectedRevenue = products.reduce((sum, product) => sum + product.stockQuantity * product.unitPrice, 0);
  const projectedProfit = products.reduce(
    (sum, product) => sum + product.stockQuantity * (product.unitPrice - product.unitCost),
    0
  );
  const grossMargin = projectedRevenue > 0 ? (projectedProfit / projectedRevenue) * 100 : 0;
  const lowStockCount = products.filter(
    (product) => product.status === 'Low Stock' || product.status === 'Out of Stock'
  ).length;

  const handleConfirmDelete = () => {
    if (!productToDelete) {
      return;
    }

    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== productToDelete.id));
    setProductToDelete(null);
  };

  const handleSaveProduct = (updatedProduct: ProductRecord) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
    setProductToEdit(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              Manager stock workspace
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Products in Stock</h1>
            <p className="mt-1 text-slate-600">Inventory and financial performance for your assigned business.</p>
          </div>

          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 lg:max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Active business</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{managerBusiness.businessName}</p>
            <p className="mt-1 text-sm text-slate-600">{managerBusiness.legalName}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total SKUs" value={totalSkus} description="Distinct products" icon={Package} />
        <StatCard title="Units on Hand" value={totalUnits} description="Current stock quantity" icon={Boxes} />
        <StatCard title="Inventory Value" value={money(inventoryValue)} description="At unit cost" icon={DollarSign} />
        <StatCard
          title="Low/Out Stock"
          value={lowStockCount}
          description="Needs replenishment"
          icon={AlertTriangle}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Projected Revenue"
          value={money(projectedRevenue)}
          description="If current stock sells at list price"
          icon={TrendingUp}
        />
        <StatCard
          title="Projected Gross Profit"
          value={money(projectedProfit)}
          description="Projected revenue minus inventory cost"
          icon={TrendingUp}
        />
        <StatCard title="Projected Margin" value={percent(grossMargin)} description="Gross profit percentage" icon={DollarSign} />
      </div>

      <div className="flex justify-end">
        <Link
          href="/manager/products/add"
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <DataTable<ProductRecord>
        title={`Products - ${managerBusiness.businessName}`}
        description={`Showing ${totalSkus} products with full stock and financial details`}
        data={products}
        fileName={`manager-products-${managerBusinessId}`}
        columns={buildProductColumns({
          onEdit: (product) => setProductToEdit(product),
          onDelete: (product) => setProductToDelete(product),
        })}
        filters={buildProductFilters(products)}
        searchable={true}
        searchPlaceholder="Search by SKU, product name, category, or supplier..."
        pagination={true}
        itemsPerPage={15}
      />

      <DeleteConfirmationModal
        isOpen={!!productToDelete}
        title="Delete product"
        message={
          productToDelete
            ? `Are you sure you want to delete ${productToDelete.productName} (${productToDelete.sku})? This action cannot be undone.`
            : ''
        }
        confirmLabel="Yes, delete"
        onCancel={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      <ProductEditModal
        isOpen={!!productToEdit}
        product={productToEdit}
        onCancel={() => setProductToEdit(null)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
