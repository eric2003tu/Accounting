import { NextRequest } from 'next/server';
import { getAuthUser, jsonResponse, errorResponse } from '@/app/lib/auth-server';

export { jsonResponse, errorResponse };

export function requireAuth(request: NextRequest) {
  const auth = getAuthUser(request);
  if (!auth) throw new AuthError();
  return auth;
}

export class AuthError extends Error {
  constructor() { super('Not authenticated'); }
}

export async function handleApi<T>(
  request: NextRequest,
  handler: (auth: { userId: number; email: string; role: string }) => Promise<T>,
): Promise<Response> {
  try {
    const auth = requireAuth(request);
    const result = await handler(auth);
    return jsonResponse(result);
  } catch (error) {
    if (error instanceof AuthError) return errorResponse('Not authenticated', 401);
    if (error instanceof ApiError) return errorResponse(error.message, error.status);
    console.error('API error:', error);
    return errorResponse('Internal server error', 500);
  }
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export function parseId(params: { id: string }): number {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) throw new ApiError('Invalid ID', 400);
  return id;
}
