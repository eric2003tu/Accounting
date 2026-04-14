import React, { Suspense } from 'react';
import PurchasesBoard from '@/app/components/purchases/PurchasesBoard';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const currentOwnerId = 5;

const ownerBusinesses = adminBusinesses.filter((business) => business.ownerId === currentOwnerId);

export default function PurchasesPage() {
  const businessOptions = ownerBusinesses.map((business) => ({
    id: String(business.id),
    name: business.businessName,
    legalName: business.legalName,
  }));

  return (
    <Suspense fallback={<div className="text-slate-600">Loading purchases...</div>}>
      <PurchasesBoard
        role="owner"
        routeBase="/dashboard/purchases"
        businesses={businessOptions}
        defaultBusinessId={businessOptions[0]?.id ?? ''}
      />
    </Suspense>
  );
}
