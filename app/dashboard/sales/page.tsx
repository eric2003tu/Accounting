"use client";
import React, { useEffect, useState } from 'react';
import SalesBoard from '@/app/components/sales/SalesBoard';
import { businessClient } from '@/app/lib/apiClients';

const currentOwnerId = 5;

export default function SalesPage() {
  const [businessOptions, setBusinessOptions] = useState<{ id: string; name: string; legalName?: string; industry?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const list = await businessClient.getOwned();
        if (!mounted) return;
        const opts = (list || []).map((business: any) => ({
          id: String(business.id),
          name: business.businessName,
          legalName: business.legalName,
          industry: business.industry,
        }));
        setBusinessOptions(opts.filter((b) => b));
      } catch (err) {
        console.error('Failed to load businesses for sales page', err);
        if (mounted) setBusinessOptions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="text-slate-600">Loading sales...</div>;

  return (
    <SalesBoard
      role="owner"
      routeBase="/dashboard/sales"
      businesses={businessOptions}
      defaultBusinessId={businessOptions[0]?.id ?? ''}
    />
  );
}
