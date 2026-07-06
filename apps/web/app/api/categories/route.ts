import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, ApiError } from '@/app/lib/route-utils';

export async function GET(request: NextRequest) {
  return handleApi(request, async () => {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('business_id');
    const where: Record<string, unknown> = {};
    if (businessId) where.businessId = parseInt(businessId);
    const items = await prisma.category.findMany({ where, orderBy: { id: 'asc' } });
    return items;
  });
}

export async function POST(request: NextRequest) {
  return handleApi(request, async () => {
    const body = await request.json();
    if (!body.name) throw new ApiError('name is required');
    if (!body.business_id) throw new ApiError('business_id is required');
    const item = await prisma.category.create({
      data: {
        businessId: body.business_id,
        name: body.name,
        description: body.description || undefined,
      },
    });
    return item;
  });
}
