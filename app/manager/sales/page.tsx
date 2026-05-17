"use client";

import React, { Suspense } from 'react';
import SalesBoard from '@/app/components/sales/SalesBoard';
import { businessClient } from '@/app/lib/apiClients';

const managerBusinessId = 1;

export default function SalesPage() {
  const [managerBusiness, setManagerBusiness] = React.useState<any | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await businessClient.getOwned();
        if (!mounted) return;
        const found = (list || []).find((b: any) => Number(b.id) === managerBusinessId) ?? null;
        setManagerBusiness(found);
      } catch (err) {
        console.error('Failed to load manager business for sales', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

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
    <Suspense fallback={<BrandLoadingScreen title="Loading sales" subtitle="Preparing sales records for your assigned business." />}>
      <SalesBoard
        role="manager"
        routeBase="/manager/sales"
        businesses={businessOptions}
        defaultBusinessId={businessOptions[0]?.id ?? ''}
      />
    </Suspense>
  );
}
