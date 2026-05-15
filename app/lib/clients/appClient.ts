const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

type FetchOptions = RequestInit & { withAuth?: boolean };

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
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
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
  if (token) localStorage.setItem('access_token', token);
  else localStorage.removeItem('access_token');
}

export default {
  apiFetch,
  setAuthToken,
};