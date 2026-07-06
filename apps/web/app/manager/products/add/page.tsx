'use client';

import React from 'react';
import ProductCreateForm from '@/app/components/products/ProductCreateForm';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const managerBusinessId = 1;

const managerBusinesses = adminBusinesses.filter((business) => business.id === managerBusinessId);

export default function AddManagerProductPage() {
  const businessOptions = managerBusinesses.map((business) => ({
    id: String(business.id),
    name: business.businessName,
    legalName: business.legalName,
  }));

  return (
    <ProductCreateForm
      role="manager"
      backHref="/manager/products"
      submitHrefBase="/manager/products"
      businesses={businessOptions}
      defaultBusinessId={businessOptions[0]?.id ?? ''}
    />
  );
}
