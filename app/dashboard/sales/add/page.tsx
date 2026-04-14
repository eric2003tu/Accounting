'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SalesCreateForm from '@/app/components/sales/SalesCreateForm';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const currentOwnerId = 5;

const ownerBusinesses = adminBusinesses.filter((business) => business.ownerId === currentOwnerId);

function AddSalePageContent() {
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
