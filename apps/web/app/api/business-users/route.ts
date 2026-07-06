import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, ApiError } from '@/app/lib/route-utils';

export async function GET(request: NextRequest) {
  return handleApi(request, async () => {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('business_id');
    const where: Record<string, unknown> = {};
    if (businessId) where.businessId = parseInt(businessId);
    const items = await prisma.businessUser.findMany({ where, orderBy: { id: 'asc' } });
    return items;
  });
}

export async function POST(request: NextRequest) {
  return handleApi(request, async () => {
    const body = await request.json();
    if (!body.business_id) throw new ApiError('business_id is required');
    if (!body.user_id) throw new ApiError('user_id is required');
    if (!body.role) throw new ApiError('role is required');
    const item = await prisma.businessUser.upsert({
      where: { businessId_userId: { businessId: body.business_id, userId: body.user_id } },
      update: { role: body.role },
      create: { businessId: body.business_id, userId: body.user_id, role: body.role },
    });
    return item;
  });
}
