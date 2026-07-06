import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, ApiError } from '@/app/lib/route-utils';

export async function GET(request: NextRequest) {
  return handleApi(request, async (auth) => {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id') ? parseInt(searchParams.get('user_id')!) : auth.userId;
    const where: Record<string, unknown> = {};
    if (userId) where.userId = userId;
    const items = await prisma.notification.findMany({ where, orderBy: { id: 'asc' } });
    return items;
  });
}

export async function POST(request: NextRequest) {
  return handleApi(request, async (auth) => {
    const body = await request.json();
    if (!body.title && !body.body) throw new ApiError('title or body is required');
    const item = await prisma.notification.create({
      data: {
        userId: body.user_id || auth.userId || undefined,
        businessId: body.business_id || undefined,
        title: body.title || undefined,
        body: body.body || undefined,
        level: body.level || undefined,
        read: body.read || false,
      },
    });
    return item;
  });
}
