'use client';

import { usePathname } from 'next/navigation';
import NavBar from './NavBar';
import Footer from './Footer';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideGlobalChrome =
    pathname.startsWith('/dashboard') || pathname.startsWith('/admin');

  return (
    <>
      {!hideGlobalChrome && <NavBar />}
      <main className="flex-1">{children}</main>
      {!hideGlobalChrome && <Footer />}
    </>
  );
}
