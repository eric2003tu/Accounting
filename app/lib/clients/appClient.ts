// const BASE_URL =  'http://localhost:3000';

const BASE_URL = 'https://accplan-be.onrender.com';


type FetchOptions = RequestInit & { withAuth?: boolean };

export type User = {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  system_role?: string;
  [k: string]: any;
};

type LoginResponse = {
  access_token: string;
  token_type?: string;
  user?: User | null;
};

const ACCESS_TOKEN_KEY = 'access_token';
const CURRENT_USER_KEY = 'current_user';

export async function apiFetch(path: string, opts: FetchOptions = {}): Promise<any> {
  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (opts.headers) {
    Object.assign(headers, opts.headers as Record<string, string>);
  }

  if (opts.withAuth) {
    try {
      const token = getAccessToken();
      if (token) headers.Authorization = `Bearer ${token}`;
    } catch (e) {
      // ignore
    }
  }

  const res = await fetch(url, { ...opts, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err: any = new Error(`API fetch failed: ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return res.json();
  return res.text();
}

export function setAuthToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
  else localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (e) {
    return null;
  }
}

export function setCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return;
  try {
    if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(CURRENT_USER_KEY);
  } catch (e) {
    // ignore
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = localStorage.getItem(CURRENT_USER_KEY);
    if (!v) return null;
    return JSON.parse(v) as User;
  } catch (e) {
    return null;
  }
}

export function clearAuth() {
  setAuthToken(null);
  setCurrentUser(null);
}

export function applyLoginResponse(resp: LoginResponse) {
  if (!resp) return;
  if (resp.access_token) setAuthToken(resp.access_token);
  if (resp.user) setCurrentUser(resp.user);
}

// Check whether current user has at least one of the required roles.
export function hasRole(required: string | string[]): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  const roles = Array.isArray(required) ? required : [required];
  const userRole = (user.system_role || user.systemRole || user.role || '').toString().trim().toUpperCase();
  const normalizedRoles = roles.map((role) => role.toString().trim().toUpperCase());
  return normalizedRoles.includes(userRole);
}

export function getCurrentUserRole(): string {
  const user = getCurrentUser();
  if (!user) return '';
  return (user.system_role || user.systemRole || user.role || '').toString().trim().toUpperCase();
}

export function getHomeRouteForRole(role?: string | null): string {
  const normalized = (role || '').toString().toUpperCase();
  if (normalized === 'ADMIN') return '/admin';
  if (normalized === 'MANAGER') return '/manager';
  if (normalized === 'OWNER') return '/dashboard';
  if (normalized === 'NORMAL' || normalized === 'USER') return '/normal';
  return '/normal';
}

export async function applyToBeOwner(): Promise<any> {
  return apiFetch('/business/apply-owner', { method: 'POST', withAuth: true });
}

export default {
  apiFetch,
  setAuthToken,
  getAccessToken,
  setCurrentUser,
  getCurrentUser,
  clearAuth,
  applyLoginResponse,
  hasRole,
  getCurrentUserRole,
  getHomeRouteForRole,
  applyToBeOwner,
};