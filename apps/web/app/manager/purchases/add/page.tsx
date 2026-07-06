'use client';

import React from 'react';
import PurchasesCreateForm from '@/app/components/purchases/PurchasesCreateForm';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const managerBusinessId = 1;
const managerBusiness = adminBusinesses.find((business) => business.id === managerBusinessId);

export default function AddManagerPurchasePage() {
  const businessOptions = managerBusiness
    ? [
        {
          id: String(managerBusiness.id),
          name: managerBusiness.businessName,
          legalName: managerBusiness.legalName,
        },
      ]
    : [];

  return (
    <PurchasesCreateForm
      role="manager"
      backHref="/manager/purchases"
      submitHrefBase="/manager/purchases"
      businesses={businessOptions}
      defaultBusinessId={businessOptions[0]?.id ?? ''}
    />
  );
}
