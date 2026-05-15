'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PurchasesCreateForm from '@/app/components/purchases/PurchasesCreateForm';
import { businessClient } from '@/app/lib/apiClients';

function AddPurchasePageContent() {
  const searchParams = useSearchParams();
  const initialBusinessId = searchParams.get('businessId') ?? '';

  const [businessOptions, setBusinessOptions] = useState<{ id: string; name: string; legalName: string }[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await businessClient.getOwned();
        if (!mounted) return;
        const opts = (list || []).map((b: any) => ({ id: String(b.id), name: b.name ?? b.businessName ?? '', legalName: b.legal_name ?? '' }));
        setBusinessOptions(opts);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load businesses', err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const safeDefaultBusinessId = businessOptions.some((item) => item.id === initialBusinessId)
    ? initialBusinessId
    : businessOptions[0]?.id ?? '';

  return (
    <PurchasesCreateForm
      role="owner"
      backHref="/dashboard/purchases"
      submitHrefBase="/dashboard/purchases"
      businesses={businessOptions}
      defaultBusinessId={safeDefaultBusinessId}
    />
  );
}

export default function AddPurchasePage() {
  return (
    <Suspense fallback={<div className="text-slate-600">Loading add purchase form...</div>}>
      <AddPurchasePageContent />
    </Suspense>
  );
}
