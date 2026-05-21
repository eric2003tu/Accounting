'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getCurrentUser, clearAuth, getHomeRouteForRole } from '@/app/lib/clients/appClient';

const items = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Pricing', path: '/pricing' },
];

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());

    const onStorage = () => setCurrentUser(getCurrentUser());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const userInitials = (user: any | null) => {
    if (!user) return '';
    const first = (user.first_name || user.firstName || (user.name || '').split(' ')[0] || '').toString().trim();
    const last = (user.last_name || user.lastName || (user.name || '').split(' ')[1] || '').toString().trim();
    if (first && last) return `${first[0]}${last[0]}`.toUpperCase();
    const fallback = (user.name || user.email || '').toString().trim();
    return fallback.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-green-900 text-sm font-bold text-white">
              AC
            </span>
            <span className="text-lg font-bold tracking-tight text-green-900 hidden sm:inline">
              Accounting
            </span>
            <span className="text-lg font-bold tracking-tight text-green-900 sm:hidden">
              AC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {items.map((item) => {
              const isActive =
                item.path === '/'
                  ? pathname === '/'
                  : pathname === item.path || pathname.startsWith(`${item.path}/`);

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-green-900 text-white'
                        : 'text-zinc-700 hover:bg-zinc-100 hover:text-black'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-2 relative">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((s) => !s)}
                  className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-900 text-sm font-semibold text-white">
                    {userInitials(currentUser)}
                  </span>
                  <ChevronDown className="h-4 w-4 text-zinc-700" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg z-50">
                    <Link
                      href={getHomeRouteForRole(currentUser.system_role || currentUser.role) || '/'}
                      className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={`${getHomeRouteForRole(currentUser.system_role || currentUser.role) || '/'}${getHomeRouteForRole(currentUser.system_role || currentUser.role) === '/' ? 'profile' : '/profile'}`}
                      className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        clearAuth();
                        setCurrentUser(null);
                        setUserMenuOpen(false);
                        router.push('/login');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-green-900 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/get-started"
                  className="rounded-md bg-green-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-800"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-100">
            <ul className="flex flex-col gap-1">
              {items.map((item) => {
                const isActive =
                  item.path === '/'
                    ? pathname === '/'
                    : pathname === item.path || pathname.startsWith(`${item.path}/`);

                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-green-900 text-white'
                          : 'text-zinc-700 hover:bg-zinc-100 hover:text-black'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-col gap-2">
              {currentUser ? (
                <>
                  <Link
                    href={getHomeRouteForRole(currentUser.system_role || currentUser.role) || '/'}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md px-3 py-2 text-center text-base font-medium text-zinc-700 hover:bg-zinc-100 hover:text-black"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={`${getHomeRouteForRole(currentUser.system_role || currentUser.role) || '/'}${getHomeRouteForRole(currentUser.system_role || currentUser.role) === '/' ? 'profile' : '/profile'}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md px-3 py-2 text-center text-base font-medium text-zinc-700 hover:bg-zinc-100 hover:text-black"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      clearAuth();
                      setCurrentUser(null);
                      setIsMenuOpen(false);
                      router.push('/login');
                    }}
                    className="rounded-md px-3 py-2 text-center text-base font-medium text-zinc-700 hover:bg-zinc-100 hover:text-black"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md px-3 py-2 text-center text-base font-medium text-zinc-700 hover:bg-zinc-100 hover:text-black"
                  >
                    Login
                  </Link>
                  <Link
                    href="/get-started"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md bg-green-900 px-3 py-2 text-center text-base font-semibold text-white hover:bg-green-800"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;