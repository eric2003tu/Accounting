'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SalesCreateForm from '@/app/components/sales/SalesCreateForm';
import { businessClient } from '@/app/lib/apiClients';

function AddSalePageContent() {
  const searchParams = useSearchParams();
  const initialBusinessId = searchParams.get('businessId') ?? '';
  const [businessOptions, setBusinessOptions] = useState<{ id: string; name: string; legalName?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const list = await businessClient.getOwned();
        if (!mounted) return;
        const opts = (list || []).map((business: any) => ({ id: String(business.id), name: business.businessName ?? business.name, legalName: business.legal_name ?? business.legalName }));
        setBusinessOptions(opts);
      } catch (err) {
        console.error('Failed to load businesses for add sale', err);
        if (mounted) setBusinessOptions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="text-slate-600">Loading add sale form...</div>;

  const safeDefaultBusinessId = businessOptions.some((item) => item.id === initialBusinessId) ? initialBusinessId : businessOptions[0]?.id ?? '';

  return (
    <SalesCreateForm
      role="owner"
      backHref="/dashboard/sales"
      submitHrefBase="/dashboard/sales"
      businesses={businessOptions}
      defaultBusinessId={safeDefaultBusinessId}
    />
  );
}

export default function AddSalePage() {
  return (
    <Suspense fallback={<div className="text-slate-600">Loading add sale form...</div>}>
      <AddSalePageContent />
    </Suspense>
  );
}
