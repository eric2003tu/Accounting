'use client';

import React from 'react';
import SalesCreateForm from '@/app/components/sales/SalesCreateForm';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const managerBusinessId = 1;
const managerBusiness = adminBusinesses.find((business) => business.id === managerBusinessId);

export default function AddManagerSalePage() {
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
    <SalesCreateForm
      role="manager"
      backHref="/manager/sales"
      submitHrefBase="/manager/sales"
      businesses={businessOptions}
      defaultBusinessId={businessOptions[0]?.id ?? ''}
    />
  );
}
