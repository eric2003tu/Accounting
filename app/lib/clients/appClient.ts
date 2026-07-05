import { MOCK_USERS, MOCK_OWNER_APPLICATIONS } from '@/app/lib/mockData';

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
  if (path === '/business/apply-owner') {
    const user = getCurrentUser();
    if (!user) throw Object.assign(new Error('Not authenticated'), { status: 401, body: 'Not authenticated' });
    return { success: true, message: 'Application submitted' };
  }
  throw Object.assign(new Error(`Mock API: ${path} not mocked`), { status: 404, body: 'Not found in mock data' });
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
  } catch (e) {}
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
  return { success: true, message: 'Application submitted' };
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
