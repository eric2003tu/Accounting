'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getCurrentUserRole, hasRole, getHomeRouteForRole } from '@/app/lib/clients/appClient';

type UseRequireAuthOptions = {
  allowedHomeRoute?: string;
};

export default function useRequireAuth(requiredRole?: string | string[], options: UseRequireAuthOptions = {}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.replace('/login');
      return;
    }

    const currentRole = getCurrentUserRole();

    if (options.allowedHomeRoute) {
      const homeRoute = getHomeRouteForRole(currentRole);
      if (homeRoute !== options.allowedHomeRoute) {
        router.replace(homeRoute || '/login');
        return;
      }
    } else if (requiredRole) {
      const allowed = hasRole(requiredRole);
      if (!allowed) {
        const dest = getHomeRouteForRole(currentRole) || '/login';
        router.replace(dest);
        return;
      }
    }

    setReady(true);
  }, [router, requiredRole, options.allowedHomeRoute]);

  return ready;
}
