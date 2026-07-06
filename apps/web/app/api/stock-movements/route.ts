import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, ApiError } from '@/app/lib/route-utils';

export async function GET(request: NextRequest) {
  return handleApi(request, async () => {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('business_id');
    const productId = searchParams.get('product_id');
    const where: Record<string, unknown> = {};
    if (businessId) where.businessId = parseInt(businessId);
    if (productId) where.productId = parseInt(productId);
    const items = await prisma.stockMovement.findMany({ where, orderBy: { id: 'asc' } });
    return items;
  });
}

export async function POST(request: NextRequest) {
  return handleApi(request, async () => {
    const body = await request.json();
    if (!body.product_id) throw new ApiError('product_id is required');
    if (!body.business_id) throw new ApiError('business_id is required');
    if (!body.qty) throw new ApiError('qty is required');
    const item = await prisma.stockMovement.create({
      data: {
        productId: body.product_id,
        businessId: body.business_id,
        qty: body.qty,
        fromWarehouseId: body.from_warehouse_id || undefined,
        toWarehouseId: body.to_warehouse_id || undefined,
        reason: body.reason || undefined,
      },
    });
    return item;
  });
}
