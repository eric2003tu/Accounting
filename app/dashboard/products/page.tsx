'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Building2, Boxes, Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import DeleteConfirmationModal from '@/app/components/admin/DeleteConfirmationModal';
import ProductEditModal from '@/app/components/products/ProductEditModal';
import { buildProductColumns, buildProductFilters } from '@/app/components/products/productTableConfig';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';
import { productsByBusiness, ProductRecord } from '@/app/lib/productsData';

const currentOwnerId = 5;

const ownerBusinesses = adminBusinesses.filter((business) => business.ownerId === currentOwnerId);

function money(value: number) {
  return `$${value.toFixed(2)}`;
}

function percent(value: number) {
  return `${value.toFixed(2)}%`;
}

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialBusinessId = Number(searchParams.get('businessId'));
  const defaultBusinessId = ownerBusinesses[0]?.id ?? 0;

  const [selectedBusinessId, setSelectedBusinessId] = React.useState(
    ownerBusinesses.some((business) => business.id === initialBusinessId) ? initialBusinessId : defaultBusinessId
  );

  React.useEffect(() => {
    const queryBusinessId = Number(searchParams.get('businessId'));
    if (ownerBusinesses.some((business) => business.id === queryBusinessId) && queryBusinessId !== selectedBusinessId) {
      setSelectedBusinessId(queryBusinessId);
    }
  }, [searchParams, selectedBusinessId]);

  const selectedBusiness = ownerBusinesses.find((business) => business.id === selectedBusinessId) ?? ownerBusinesses[0];
  const [products, setProducts] = React.useState<ProductRecord[]>([]);
  const [productToDelete, setProductToDelete] = React.useState<ProductRecord | null>(null);
  const [productToEdit, setProductToEdit] = React.useState<ProductRecord | null>(null);

  React.useEffect(() => {
    setProducts(productsByBusiness[selectedBusiness?.id ?? defaultBusinessId] ?? []);
  }, [selectedBusiness, defaultBusinessId]);

  if (!selectedBusiness) {
    return <div className="text-slate-600">No businesses available.</div>;
  }

  const handleBusinessChange = (businessId: number) => {
    setSelectedBusinessId(businessId);
    router.replace(`/dashboard/products?businessId=${businessId}`);
  };

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
              Business scoped stock
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Products in Stock</h1>
            <p className="mt-1 text-slate-600">Track inventory quantities, valuation, and profitability by product.</p>
          </div>

          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 lg:max-w-md">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500" htmlFor="products-business-select">
              View business
            </label>
            <select
              id="products-business-select"
              value={selectedBusiness.id}
              onChange={(event) => handleBusinessChange(Number(event.target.value))}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            >
              {ownerBusinesses.map((business) => (
                <option key={business.id} value={business.id}>
                  {business.businessName}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-slate-600">
              {selectedBusiness.legalName} · {selectedBusiness.industry}
            </p>
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

      <DataTable<ProductRecord>
        title={`Products - ${selectedBusiness.businessName}`}
        description={`Showing ${totalSkus} products with full stock and financial details`}
        data={products}
        fileName={`products-${selectedBusiness.id}`}
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-slate-600">Loading products...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
