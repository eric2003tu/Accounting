import React, { Suspense } from 'react';
import PurchasesBoard from '@/app/components/purchases/PurchasesBoard';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const managerBusinessId = 1;
const managerBusiness = adminBusinesses.find((business) => business.id === managerBusinessId);

export default function PurchasesPage() {
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
    <Suspense fallback={<div className="text-slate-600">Loading purchases...</div>}>
      <PurchasesBoard
        role="manager"
        routeBase="/manager/purchases"
        businesses={businessOptions}
        defaultBusinessId={businessOptions[0]?.id ?? ''}
      />
    </Suspense>
  );
}
