import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, ApiError } from '@/app/lib/route-utils';

export async function GET(request: NextRequest) {
  return handleApi(request, async () => {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('business_id');
    const where: Record<string, unknown> = {};
    if (businessId) where.businessId = parseInt(businessId);
    const items = await prisma.fiscalYear.findMany({ where, orderBy: { id: 'asc' } });
    return items;
  });
}

export async function POST(request: NextRequest) {
  return handleApi(request, async () => {
    const body = await request.json();
    if (!body.business_id) throw new ApiError('business_id is required');
    if (!body.start_date) throw new ApiError('start_date is required');
    if (!body.end_date) throw new ApiError('end_date is required');
    const item = await prisma.fiscalYear.create({
      data: {
        businessId: body.business_id,
        startDate: new Date(body.start_date),
        endDate: new Date(body.end_date),
        isOpen: body.is_open !== undefined ? body.is_open : true,
      },
    });
    return item;
  });
}
