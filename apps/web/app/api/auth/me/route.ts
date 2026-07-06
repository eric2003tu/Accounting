import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { getAuthUser, jsonResponse, errorResponse } from '@/app/lib/auth-server';

export async function GET(request: NextRequest) {
  const auth = getAuthUser(request);
  if (!auth) return errorResponse('Not authenticated', 401);

  const user = await prisma.user.findUnique({ where: { id: auth.userId } });
  if (!user) return errorResponse('User not found', 404);

  return jsonResponse({
    id: String(user.id),
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    system_role: user.systemRole,
    systemRole: user.systemRole,
    phone: user.phone,
    is_active: user.isActive,
    created_at: user.createdAt.toISOString(),
    updated_at: user.updatedAt.toISOString(),
  });
}
