"use client";

import React, { useEffect, useState } from 'react';
import PurchasesBoard from '@/app/components/purchases/PurchasesBoard';
import BrandLoadingScreen from '@/app/components/BrandLoadingScreen';
import { businessClient } from '@/app/lib/apiClients';

export default function PurchasesPage() {
  const [businessOptions, setBusinessOptions] = useState<{ id: string; name: string; legalName?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const list = await businessClient.getOwned();
        if (!mounted) return;
        const opts = (list || []).map((business: any) => ({ id: String(business.id), name: business.businessName ?? business.name, legalName: business.legal_name ?? business.legalName }));
        setBusinessOptions(opts);
      } catch (err) {
        console.error('Failed to load businesses for purchases page', err);
        if (mounted) setBusinessOptions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <BrandLoadingScreen title="Loading purchases" subtitle="Preparing purchase records for the selected business." />;

  return (
    <PurchasesBoard
      role="owner"
      routeBase="/dashboard/purchases"
      businesses={businessOptions}
      defaultBusinessId={businessOptions[0]?.id ?? ''}
    />
  );
}
