'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCreateForm from '@/app/components/products/ProductCreateForm';
import BrandLoadingScreen from '@/app/components/BrandLoadingScreen';
import { businessClient } from '@/app/lib/apiClients';

function AddProductPageContent() {
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

  const safeDefaultBusinessId = businessOptions.some((item) => item.id === initialBusinessId) ? initialBusinessId : businessOptions[0]?.id ?? '';

  return (
    <ProductCreateForm
      role="owner"
      backHref="/dashboard/products"
      submitHrefBase="/dashboard/products"
      businesses={businessOptions}
      defaultBusinessId={safeDefaultBusinessId}
    />
  );
}

export default function AddProductPage() {
  return (
    <Suspense fallback={<BrandLoadingScreen title="Loading product form" subtitle="Preparing the product entry form and catalog data." />}>
      <AddProductPageContent />
    </Suspense>
  );
}
