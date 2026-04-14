'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BadgeInfo,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  ImageIcon,
  Package,
  Plus,
  Store,
  X,
  Warehouse,
} from 'lucide-react';

type BusinessOption = {
  id: string;
  name: string;
  legalName: string;
};

type ProductCreateFormProps = {
  role: 'owner' | 'manager';
  backHref: string;
  submitHrefBase: string;
  businesses: BusinessOption[];
  defaultBusinessId?: string;
};

type ProductImageDraft = {
  file: File;
  previewUrl: string;
};

const productStatuses = ['In Stock', 'Low Stock', 'Out of Stock'];
const valuationMethods = ['FIFO', 'Weighted Average'];
const taxRates = [0, 5, 7.5, 10, 12.5, 15, 18, 20];

export default function ProductCreateForm({
  role,
  backHref,
  submitHrefBase,
  businesses,
  defaultBusinessId = '',
}: ProductCreateFormProps) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const canSelectBusiness = role === 'owner';

  const [businessId, setBusinessId] = useState(defaultBusinessId || businesses[0]?.id || '');
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [supplier, setSupplier] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [valuationMethod, setValuationMethod] = useState('FIFO');
  const [status, setStatus] = useState('In Stock');

  const [currency, setCurrency] = useState('USD');
  const [unitCost, setUnitCost] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [taxRate, setTaxRate] = useState('18');
  const [discountRate, setDiscountRate] = useState('0');
  const [stockQuantity, setStockQuantity] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');
  const [safetyStock, setSafetyStock] = useState('');
  const [cogsToDate, setCogsToDate] = useState('0');
  const [revenueToDate, setRevenueToDate] = useState('0');
  const [lastPurchaseDate, setLastPurchaseDate] = useState(today);
  const [lastSaleDate, setLastSaleDate] = useState(today);
  const [productImages, setProductImages] = useState<ProductImageDraft[]>([]);

  React.useEffect(() => {
    return () => {
      productImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, [productImages]);

  const selectedBusiness = businesses.find((item) => item.id === businessId) ?? null;

  const metrics = useMemo(() => {
    const qty = Number(stockQuantity || '0');
    const cost = Number(unitCost || '0');
    const price = Number(unitPrice || '0');
    const cogs = Number(cogsToDate || '0');
    const revenue = Number(revenueToDate || '0');

    const inventoryValue = qty * cost;
    const potentialRevenue = qty * price;
    const projectedGrossProfit = potentialRevenue - inventoryValue;
    const projectedMargin = potentialRevenue > 0 ? (projectedGrossProfit / potentialRevenue) * 100 : 0;
    const realizedGrossProfit = revenue - cogs;
    const realizedGrossMargin = revenue > 0 ? (realizedGrossProfit / revenue) * 100 : 0;

    return {
      inventoryValue,
      potentialRevenue,
      projectedGrossProfit,
      projectedMargin,
      realizedGrossProfit,
      realizedGrossMargin,
    };
  }, [stockQuantity, unitCost, unitPrice, cogsToDate, revenueToDate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      businessId,
      businessName: selectedBusiness?.name ?? '',
      businessLegalName: selectedBusiness?.legalName ?? '',
      productName,
      sku,
      barcode,
      category,
      brand,
      supplier,
      warehouse,
      valuationMethod,
      status,
      currency,
      unitCost: Number(unitCost || '0'),
      unitPrice: Number(unitPrice || '0'),
      taxRate: Number(taxRate || '0'),
      discountRate: Number(discountRate || '0'),
      stockQuantity: Number(stockQuantity || '0'),
      reorderLevel: Number(reorderLevel || '0'),
      safetyStock: Number(safetyStock || '0'),
      cogsToDate: Number(cogsToDate || '0'),
      revenueToDate: Number(revenueToDate || '0'),
      lastPurchaseDate,
      lastSaleDate,
      imageNames: productImages.map((image) => image.file.name),
      imageCount: productImages.length,
      metrics,
    };

    console.log(payload);
    router.push(`${submitHrefBase}?businessId=${businessId}`);
  };

  const money = (value: number) => `$${value.toFixed(2)}`;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) {
      return;
    }

    const uploaded = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setProductImages((current) => [...current, ...uploaded]);
    event.target.value = '';
  };

  const removeImageAt = (index: number) => {
    setProductImages((current) => {
      const target = current[index];
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return current.filter((_, itemIndex) => itemIndex !== index);
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] lg:p-6">
        <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-green-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-36 w-36 rounded-full bg-emerald-100/50 blur-2xl" />
        <div className="relative">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
          <div className="mt-3">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Add Product</h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-600 sm:text-base">
              Create a product with full inventory and financial settings so your stock valuation, COGS, and margin reporting stay accurate.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Business context</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="businessId" className="mb-2 block text-sm font-medium text-slate-700">
                Which business is this product for? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="businessId"
                  value={businessId}
                  onChange={(event) => setBusinessId(event.target.value)}
                  required
                  disabled={!canSelectBusiness}
                  className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200 disabled:cursor-not-allowed disabled:bg-slate-100"
                >
                  <option value="">Select a business</option>
                  {businesses.map((business) => (
                    <option key={business.id} value={business.id}>
                      {business.name} - {business.legalName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {canSelectBusiness
                  ? 'Pick the legal entity that owns this product.'
                  : 'Managers can add products only for their assigned business.'}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <Package className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Product details</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Product Name <span className="text-red-500">*</span></label>
              <input value={productName} onChange={(event) => setProductName(event.target.value)} required className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="e.g., ApexBook Pro 14" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">SKU <span className="text-red-500">*</span></label>
              <input value={sku} onChange={(event) => setSku(event.target.value.toUpperCase())} required className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="e.g., ACM-LTP-14PRO" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Barcode</label>
              <input value={barcode} onChange={(event) => setBarcode(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="e.g., 8901001123401" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Category <span className="text-red-500">*</span></label>
              <input value={category} onChange={(event) => setCategory(event.target.value)} required className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="e.g., Computers" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Brand</label>
              <input value={brand} onChange={(event) => setBrand(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="e.g., Apex" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Supplier</label>
              <input value={supplier} onChange={(event) => setSupplier(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="e.g., Global Devices Ltd" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Warehouse</label>
              <div className="relative">
                <Warehouse className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input value={warehouse} onChange={(event) => setWarehouse(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="e.g., Kigali Main WH" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Valuation Method</label>
              <div className="relative">
                <select value={valuationMethod} onChange={(event) => setValuationMethod(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200">
                  {valuationMethods.map((method) => <option key={method} value={method}>{method}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Stock Status</label>
              <div className="relative">
                <select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200">
                  {productStatuses.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Product images</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="product-images" className="mb-2 block text-sm font-medium text-slate-700">
                Upload product images
              </label>
              <input
                id="product-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="block w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-green-100 file:px-3 file:py-2 file:font-semibold file:text-green-700 hover:file:bg-green-200"
              />
              <p className="mt-2 text-xs text-slate-500">You can upload more than one image.</p>
            </div>

            {productImages.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {productImages.map((image, index) => (
                  <div key={`${image.file.name}-${index}`} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <div className="relative aspect-square">
                      <img src={image.previewUrl} alt={image.file.name} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImageAt(index)}
                        className="absolute right-2 top-2 inline-flex items-center rounded-full border border-red-200 bg-white/95 p-1 text-red-700 transition hover:bg-red-50"
                        aria-label={`Remove ${image.file.name}`}
                        title="Remove image"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="truncate px-2 py-1 text-xs text-slate-600" title={image.file.name}>
                      {image.file.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mb-6 flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-green-700" />
            <h2 className="text-lg font-semibold text-slate-900">Inventory and financial inputs</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Currency</label>
              <input value={currency} onChange={(event) => setCurrency(event.target.value.toUpperCase())} maxLength={3} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="USD" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Unit Cost <span className="text-red-500">*</span></label>
              <input type="number" min="0" step="0.01" value={unitCost} onChange={(event) => setUnitCost(event.target.value)} required className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="0.00" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Unit Price <span className="text-red-500">*</span></label>
              <input type="number" min="0" step="0.01" value={unitPrice} onChange={(event) => setUnitPrice(event.target.value)} required className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="0.00" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Tax Rate (%)</label>
              <div className="relative">
                <select value={taxRate} onChange={(event) => setTaxRate(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200">
                  {taxRates.map((rate) => <option key={rate} value={rate}>{rate}%</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Discount Rate (%)</label>
              <input type="number" min="0" step="0.01" value={discountRate} onChange={(event) => setDiscountRate(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="0" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Stock Quantity <span className="text-red-500">*</span></label>
              <input type="number" min="0" value={stockQuantity} onChange={(event) => setStockQuantity(event.target.value)} required className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="0" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Reorder Level</label>
              <input type="number" min="0" value={reorderLevel} onChange={(event) => setReorderLevel(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="0" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Safety Stock</label>
              <input type="number" min="0" value={safetyStock} onChange={(event) => setSafetyStock(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="0" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">COGS (YTD)</label>
              <input type="number" min="0" step="0.01" value={cogsToDate} onChange={(event) => setCogsToDate(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="0.00" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Revenue (YTD)</label>
              <input type="number" min="0" step="0.01" value={revenueToDate} onChange={(event) => setRevenueToDate(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" placeholder="0.00" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Last Purchase Date</label>
              <div className="relative">
                <input type="date" value={lastPurchaseDate} onChange={(event) => setLastPurchaseDate(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Last Sale Date</label>
              <div className="relative">
                <input type="date" value={lastSaleDate} onChange={(event) => setLastSaleDate(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200" />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <div className="mb-4 flex items-center gap-2">
            <BadgeInfo className="h-4 w-4 text-green-700" />
            <h3 className="text-sm font-semibold text-green-900">Financial preview</h3>
          </div>
          <div className="grid gap-3 text-sm text-green-900 sm:grid-cols-2 lg:grid-cols-3">
            <p>Inventory Value: <span className="font-semibold">{money(metrics.inventoryValue)}</span></p>
            <p>Potential Revenue: <span className="font-semibold">{money(metrics.potentialRevenue)}</span></p>
            <p>Projected Gross Profit: <span className="font-semibold">{money(metrics.projectedGrossProfit)}</span></p>
            <p>Projected Margin: <span className="font-semibold">{metrics.projectedMargin.toFixed(2)}%</span></p>
            <p>Realized Gross Profit (YTD): <span className="font-semibold">{money(metrics.realizedGrossProfit)}</span></p>
            <p>Realized Gross Margin (YTD): <span className="font-semibold">{metrics.realizedGrossMargin.toFixed(2)}%</span></p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2 text-xs text-slate-500">
            <Store className="h-4 w-4" />
            {selectedBusiness ? `${selectedBusiness.name} (${selectedBusiness.legalName})` : 'Select a business to continue'}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={backHref}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              Create Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
