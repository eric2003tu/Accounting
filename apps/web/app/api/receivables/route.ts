import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, ApiError } from '@/app/lib/route-utils';

export async function GET(request: NextRequest) {
  return handleApi(request, async () => {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('business_id');
    const where: Record<string, unknown> = {};
    if (businessId) where.businessId = parseInt(businessId);
    const items = await prisma.receivable.findMany({ where, orderBy: { id: 'asc' } });
    return items;
  });
}

export async function POST(request: NextRequest) {
  return handleApi(request, async () => {
    const body = await request.json();
    if (!body.business_id) throw new ApiError('business_id is required');
    if (!body.amount) throw new ApiError('amount is required');
    const item = await prisma.receivable.create({
      data: {
        businessId: body.business_id,
        customerId: body.customer_id || undefined,
        amount: body.amount,
        dueDate: body.due_date ? new Date(body.due_date) : undefined,
        status: body.status || undefined,
      },
    });
    return item;
  });
}
