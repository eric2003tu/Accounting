import React, { Suspense } from 'react';
import SalesBoard from '@/app/components/sales/SalesBoard';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const currentOwnerId = 5;

const ownerBusinesses = adminBusinesses.filter((business) => business.ownerId === currentOwnerId);

export default function SalesPage() {
  const businessOptions = ownerBusinesses.map((business) => ({
    id: String(business.id),
    name: business.businessName,
    legalName: business.legalName,
  }));

  return (
    <Suspense fallback={<div className="text-slate-600">Loading sales...</div>}>
      <SalesBoard
        role="owner"
        routeBase="/dashboard/sales"
        businesses={businessOptions}
        defaultBusinessId={businessOptions[0]?.id ?? ''}
      />
    </Suspense>
  );
}
