'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Building2,
  CircleDollarSign,
  CreditCard,
  DollarSign,
  Landmark,
  Receipt,
  TrendingUp,
  Truck,
  Plus,
} from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import DeleteConfirmationModal from '@/app/components/admin/DeleteConfirmationModal';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';
import { purchasesByBusiness, type PurchaseRecord } from '@/app/lib/purchasesData';
import { buildPurchaseColumns, buildPurchaseFilters } from './purchasesTableConfig';
import PurchasesEditModal from './PurchasesEditModal';

type BusinessOption = {
  id: string;
  name: string;
  legalName: string;
};

type PurchasesBoardProps = {
  role: 'owner' | 'manager';
  routeBase: string;
  businesses: BusinessOption[];
  defaultBusinessId?: string;
};

function money(value: number) {
  return `$${value.toFixed(2)}`;
}

function percent(value: number) {
  return `${value.toFixed(2)}%`;
}

export default function PurchasesBoard({ role, routeBase, businesses, defaultBusinessId = '' }: PurchasesBoardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryBusinessId = searchParams.get('businessId') ?? '';

  const [selectedBusinessId, setSelectedBusinessId] = React.useState(
    role === 'owner' && businesses.some((business) => business.id === queryBusinessId)
      ? queryBusinessId
      : defaultBusinessId || businesses[0]?.id || ''
  );
  const [purchases, setPurchases] = React.useState<PurchaseRecord[]>([]);
  const [purchaseToDelete, setPurchaseToDelete] = React.useState<PurchaseRecord | null>(null);
  const [purchaseToEdit, setPurchaseToEdit] = React.useState<PurchaseRecord | null>(null);

  React.useEffect(() => {
    if (role !== 'owner') {
      return;
    }

    if (businesses.some((business) => business.id === queryBusinessId) && queryBusinessId !== selectedBusinessId) {
      setSelectedBusinessId(queryBusinessId);
    }
  }, [businesses, queryBusinessId, role, selectedBusinessId]);

  const selectedBusiness = businesses.find((business) => business.id === selectedBusinessId) ?? businesses[0];

  React.useEffect(() => {
    const selectedBusinessNumericId = selectedBusiness?.id ? Number(selectedBusiness.id) : 0;
    setPurchases(purchasesByBusiness[selectedBusinessNumericId] ?? []);
  }, [selectedBusiness]);

  const handleBusinessChange = (businessId: string) => {
    setSelectedBusinessId(businessId);
    router.replace(`${routeBase}?businessId=${businessId}`);
  };

  const totalPurchases = purchases.length;
  const totalPurchaseCost = purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
  const totalPaid = purchases.reduce((sum, purchase) => sum + purchase.paidAmount, 0);
  const totalOutstanding = purchases.reduce((sum, purchase) => sum + purchase.balanceDue, 0);
  const inventoryPurchasesCount = purchases.filter((purchase) => purchase.purchaseType === 'Inventory Purchase').length;
  const assetPurchasesCount = purchases.filter((purchase) => purchase.purchaseType === 'Asset Purchase').length;
  const servicePurchasesCount = purchases.filter((purchase) => purchase.purchaseType === 'Service Purchase').length;
  const expectedRevenue = purchases.reduce((sum, purchase) => sum + purchase.expectedRevenue, 0);
  const expectedGrossProfit = purchases.reduce((sum, purchase) => sum + purchase.expectedGrossProfit, 0);
  const expectedMargin = expectedRevenue > 0 ? (expectedGrossProfit / expectedRevenue) * 100 : 0;
  const unpaidCount = purchases.filter((purchase) => purchase.paymentStatus === 'Unpaid').length;
  const receivingPendingCount = purchases.filter((purchase) => purchase.receiveStatus !== 'Received').length;

  const activeBusinessRecord =
    selectedBusiness && selectedBusiness.id !== 'all'
      ? adminBusinesses.find((business) => String(business.id) === selectedBusiness.id) ?? null
      : null;

  if (!selectedBusiness) {
    return <div className="text-slate-600">No businesses available.</div>;
  }

  const handleConfirmDelete = () => {
    if (!purchaseToDelete) {
      return;
    }

    setPurchases((currentPurchases) => currentPurchases.filter((purchase) => purchase.id !== purchaseToDelete.id));
    setPurchaseToDelete(null);
  };

  const handleSavePurchase = (updatedPurchase: PurchaseRecord) => {
    setPurchases((currentPurchases) =>
      currentPurchases.map((purchase) => (purchase.id === updatedPurchase.id ? updatedPurchase : purchase))
    );
    setPurchaseToEdit(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              {role === 'owner' ? 'Owner purchases view' : 'Manager purchases workspace'}
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Purchases</h1>
            <p className="mt-1 text-slate-600">Review all purchases with complete cost, payment, receiving, and profitability visibility.</p>
          </div>

          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 lg:max-w-md">
            {role === 'owner' ? (
              <>
                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500" htmlFor="purchases-business-select">
                  View business
                </label>
                <select
                  id="purchases-business-select"
                  value={selectedBusinessId}
                  onChange={(event) => handleBusinessChange(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                >
                  {businesses.map((business) => (
                    <option key={business.id} value={business.id}>
                      {business.name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-slate-600">
                  {selectedBusiness.legalName} · {activeBusinessRecord?.industry ?? 'Portfolio view'}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Active business</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{selectedBusiness.name}</p>
                <p className="mt-1 text-sm text-slate-600">{selectedBusiness.legalName}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Purchases" value={totalPurchases} description="Recorded purchase transactions" icon={Receipt} />
        <StatCard title="Total Purchase Cost" value={money(totalPurchaseCost)} description="Total procurement spend" icon={CircleDollarSign} />
        <StatCard title="Paid" value={money(totalPaid)} description="Amount already paid" icon={CreditCard} />
        <StatCard title="Outstanding" value={money(totalOutstanding)} description="Remaining supplier balance" icon={Landmark} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Inventory Purchases" value={inventoryPurchasesCount} description="Stock procurement" icon={TrendingUp} />
        <StatCard title="Asset Purchases" value={assetPurchasesCount} description="Capex purchases" icon={DollarSign} />
        <StatCard title="Service Purchases" value={servicePurchasesCount} description="Operational services" icon={Truck} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard title="Expected Revenue" value={money(expectedRevenue)} description="Projected sales value" icon={TrendingUp} />
        <StatCard title="Expected Gross Profit" value={money(expectedGrossProfit)} description="Projected profit from purchased items" icon={DollarSign} />
        <StatCard title="Expected Margin" value={percent(expectedMargin)} description="Projected gross margin" icon={DollarSign} />
        <StatCard title="Unpaid / Pending" value={`${unpaidCount} / ${receivingPendingCount}`} description="Unpaid and not fully received" icon={Landmark} />
      </div>

      <div className="flex justify-end">
        <Link
          href={`${routeBase}/add${selectedBusinessId ? `?businessId=${selectedBusinessId}` : ''}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Add Purchase
        </Link>
      </div>

      <DataTable<PurchaseRecord>
        title={`Purchases - ${selectedBusiness.name}`}
        description={`Showing ${totalPurchases} purchases with complete financial detail and actions`}
        data={purchases}
        fileName={`purchases-${selectedBusiness.id}`}
        columns={buildPurchaseColumns({
          onEdit: (purchase) => setPurchaseToEdit(purchase),
          onDelete: (purchase) => setPurchaseToDelete(purchase),
        })}
        filters={buildPurchaseFilters(purchases)}
        searchable={true}
        searchPlaceholder="Search purchases by bill, supplier, item, SKU, purchaser, or notes..."
        pagination={true}
        itemsPerPage={10}
      />

      <DeleteConfirmationModal
        isOpen={!!purchaseToDelete}
        title="Delete purchase"
        message={
          purchaseToDelete
            ? `Are you sure you want to delete purchase ${purchaseToDelete.billNo} from ${purchaseToDelete.supplier}? This action cannot be undone.`
            : ''
        }
        confirmLabel="Yes, delete"
        onCancel={() => setPurchaseToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      <PurchasesEditModal
        isOpen={!!purchaseToEdit}
        purchase={purchaseToEdit}
        onCancel={() => setPurchaseToEdit(null)}
        onSave={handleSavePurchase}
      />
    </div>
  );
}
