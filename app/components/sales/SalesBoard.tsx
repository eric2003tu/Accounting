'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Building2,
  CircleDollarSign,
  CreditCard,
  DollarSign,
  FileText,
  Landmark,
  Receipt,
  TrendingUp,
} from 'lucide-react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import DeleteConfirmationModal from '@/app/components/admin/DeleteConfirmationModal';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';
import { salesByBusiness, type SaleRecord } from '@/app/lib/salesData';
import { buildSalesColumns, buildSalesFilters } from './salesTableConfig';
import SalesEditModal from './SalesEditModal';

type BusinessOption = {
  id: string;
  name: string;
  legalName: string;
};

type SalesBoardProps = {
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

export default function SalesBoard({ role, routeBase, businesses, defaultBusinessId = '' }: SalesBoardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryBusinessId = searchParams.get('businessId') ?? '';

  const [selectedBusinessId, setSelectedBusinessId] = React.useState(
    role === 'owner' && businesses.some((business) => business.id === queryBusinessId)
      ? queryBusinessId
      : defaultBusinessId || businesses[0]?.id || ''
  );
  const [sales, setSales] = React.useState<SaleRecord[]>([]);
  const [saleToDelete, setSaleToDelete] = React.useState<SaleRecord | null>(null);
  const [saleToEdit, setSaleToEdit] = React.useState<SaleRecord | null>(null);

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
    setSales(salesByBusiness[selectedBusinessNumericId] ?? []);
  }, [selectedBusiness]);

  const handleBusinessChange = (businessId: string) => {
    setSelectedBusinessId(businessId);
    router.replace(`${routeBase}?businessId=${businessId}`);
  };

  const totalSales = sales.length;
  const totalInvoiced = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalCollected = sales.reduce((sum, sale) => sum + sale.paidAmount, 0);
  const totalOutstanding = sales.reduce((sum, sale) => sum + sale.balanceDue, 0);
  const productSalesCount = sales.filter((sale) => sale.saleType === 'Product Sale').length;
  const loanSalesCount = sales.filter((sale) => sale.saleType === 'Loan Sale').length;
  const partiallyPaidCount = sales.filter((sale) => sale.paymentStatus === 'Partially Paid').length;
  const fullyPaidCount = sales.filter((sale) => sale.paymentStatus === 'Fully Paid').length;
  const grossProfit = sales.reduce((sum, sale) => sum + sale.grossProfit, 0);
  const grossMargin = totalInvoiced > 0 ? (grossProfit / totalInvoiced) * 100 : 0;

  const activeBusinessRecord =
    selectedBusiness && selectedBusiness.id !== 'all'
      ? adminBusinesses.find((business) => String(business.id) === selectedBusiness.id) ?? null
      : null;

  if (!selectedBusiness) {
    return <div className="text-slate-600">No businesses available.</div>;
  }

  const handleConfirmDelete = () => {
    if (!saleToDelete) {
      return;
    }

    setSales((currentSales) => currentSales.filter((sale) => sale.id !== saleToDelete.id));
    setSaleToDelete(null);
  };

  const handleSaveSale = (updatedSale: SaleRecord) => {
    setSales((currentSales) => currentSales.map((sale) => (sale.id === updatedSale.id ? updatedSale : sale)));
    setSaleToEdit(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              {role === 'owner' ? 'Owner sales view' : 'Manager sales workspace'}
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Sales</h1>
            <p className="mt-1 text-slate-600">Review every sale, including product sales, loan sales, and payment settlements.</p>
          </div>

          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 lg:max-w-md">
            {role === 'owner' ? (
              <>
                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500" htmlFor="sales-business-select">
                  View business
                </label>
                <select
                  id="sales-business-select"
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
        <StatCard title="Total Sales" value={totalSales} description="Recorded sale transactions" icon={Receipt} />
        <StatCard title="Total Invoiced" value={money(totalInvoiced)} description="All sales values" icon={CircleDollarSign} />
        <StatCard title="Collected" value={money(totalCollected)} description="Amount already received" icon={DollarSign} />
        <StatCard title="Outstanding" value={money(totalOutstanding)} description="Unpaid balances" icon={Landmark} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Product Sales" value={productSalesCount} description="Sales of goods" icon={TrendingUp} />
        <StatCard title="Loan Sales" value={loanSalesCount} description="Credit / loan transactions" icon={FileText} />
        <StatCard title="Gross Margin" value={percent(grossMargin)} description="Overall margin on sales" icon={DollarSign} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StatCard title="Fully Paid" value={fullyPaidCount} description="Closed payment records" icon={CreditCard} />
        <StatCard title="Partially Paid" value={partiallyPaidCount} description="Balance still due" icon={Landmark} />
      </div>

      <DataTable<SaleRecord>
        title={`Sales - ${selectedBusiness.name}`}
        description={`Showing ${totalSales} sales with payment, loan, and profitability details`}
        data={sales}
        fileName={`sales-${selectedBusiness.id}`}
        columns={buildSalesColumns({
          onEdit: (sale) => setSaleToEdit(sale),
          onDelete: (sale) => setSaleToDelete(sale),
        })}
        filters={buildSalesFilters(sales)}
        searchable={true}
        searchPlaceholder="Search sales by invoice, customer, product, SKU, or notes..."
        pagination={true}
        itemsPerPage={10}
      />

      <DeleteConfirmationModal
        isOpen={!!saleToDelete}
        title="Delete sale"
        message={
          saleToDelete
            ? `Are you sure you want to delete sale ${saleToDelete.invoiceNo} for ${saleToDelete.customer}? This action cannot be undone.`
            : ''
        }
        confirmLabel="Yes, delete"
        onCancel={() => setSaleToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      <SalesEditModal
        isOpen={!!saleToEdit}
        sale={saleToEdit}
        onCancel={() => setSaleToEdit(null)}
        onSave={handleSaveSale}
      />
    </div>
  );
}
