import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, ApiError } from '@/app/lib/route-utils';
import { hashPassword } from '@/app/lib/auth-server';

export async function GET(request: NextRequest) {
  return handleApi(request, async (auth) => {
    if (auth.role !== 'ADMIN') throw new ApiError('Forbidden', 403);
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const where: Record<string, unknown> = {};
    if (q) {
      where.OR = [
        { firstName: { contains: q } },
        { lastName: { contains: q } },
        { email: { contains: q } },
      ];
    }
    const items = await prisma.user.findMany({ where, orderBy: { id: 'asc' } });
    return items;
  });
}

export async function POST(request: NextRequest) {
  return handleApi(request, async () => {
    const body = await request.json();
    if (!body.email) throw new ApiError('email is required');
    if (!body.first_name) throw new ApiError('first_name is required');
    if (!body.last_name) throw new ApiError('last_name is required');
    if (!body.password) throw new ApiError('password is required');
    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) throw new ApiError('Email already exists', 409);
    const passwordHash = await hashPassword(body.password);
    const item = await prisma.user.create({
      data: {
        email: body.email,
        passwordHash,
        firstName: body.first_name,
        lastName: body.last_name,
        phone: body.phone || undefined,
        systemRole: body.system_role || 'NORMAL',
      },
    });
    return item;
  });
}
