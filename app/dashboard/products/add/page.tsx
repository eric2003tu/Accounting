'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCreateForm from '@/app/components/products/ProductCreateForm';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const currentOwnerId = 5;

const ownerBusinesses = adminBusinesses.filter((business) => business.ownerId === currentOwnerId);

export default function AddProductPage() {
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
    <ProductCreateForm
      role="owner"
      backHref="/dashboard/products"
      submitHrefBase="/dashboard/products"
      businesses={businessOptions}
      defaultBusinessId={safeDefaultBusinessId}
    />
  );
}
