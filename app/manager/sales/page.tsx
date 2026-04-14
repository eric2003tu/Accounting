import React, { Suspense } from 'react';
import SalesBoard from '@/app/components/sales/SalesBoard';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const managerBusinessId = 1;
const managerBusiness = adminBusinesses.find((business) => business.id === managerBusinessId);

export default function SalesPage() {
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
    <Suspense fallback={<div className="text-slate-600">Loading sales...</div>}>
      <SalesBoard
        role="manager"
        routeBase="/manager/sales"
        businesses={businessOptions}
        defaultBusinessId={businessOptions[0]?.id ?? ''}
      />
    </Suspense>
  );
}
