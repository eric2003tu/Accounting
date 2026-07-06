import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, ApiError } from '@/app/lib/route-utils';

export async function GET(request: NextRequest) {
  return handleApi(request, async (auth) => {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const userIdParam = searchParams.get('user_id');
    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (auth.role === 'ADMIN') {
      if (userIdParam) where.userId = parseInt(userIdParam);
    } else {
      where.userId = auth.userId;
    }
    const items = await prisma.ownerApplication.findMany({ where, orderBy: { id: 'asc' } });
    return items;
  });
}

export async function POST(request: NextRequest) {
  return handleApi(request, async (auth) => {
    const body = await request.json();
    if (!body.business_name && !body.business_id) {
      throw new ApiError('business_name or business_id is required');
    }
    const item = await prisma.ownerApplication.create({
      data: {
        userId: auth.userId,
        businessId: body.business_id || undefined,
        businessName: body.business_name || undefined,
        businessDescription: body.business_description || undefined,
        status: 'pending',
      },
    });
    return item;
  });
}
