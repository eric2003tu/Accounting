'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PurchasesCreateForm from '@/app/components/purchases/PurchasesCreateForm';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const currentOwnerId = 5;

const ownerBusinesses = adminBusinesses.filter((business) => business.ownerId === currentOwnerId);

function AddPurchasePageContent() {
  const searchParams = useSearchParams();
  const initialBusinessId = searchParams.get('businessId') ?? '';

  const businessOptions = ownerBusinesses.map((business) => ({
    id: String(business.id),
    name: business.businessName,
    legalName: business.legalName,
  }));

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
