import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, ApiError } from '@/app/lib/route-utils';

export async function GET(request: NextRequest) {
  return handleApi(request, async () => {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('business_id');
    const status = searchParams.get('status');
    const q = searchParams.get('q');
    const where: Record<string, unknown> = {};
    if (businessId) where.businessId = parseInt(businessId);
    if (status) where.status = status;
    if (q) where.reference = { contains: q };
    const items = await prisma.sale.findMany({ where, orderBy: { id: 'asc' }, include: { items: true } });
    return items;
  });
}

export async function POST(request: NextRequest) {
  return handleApi(request, async () => {
    const body = await request.json();
    if (!body.business_id) throw new ApiError('business_id is required');
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      throw new ApiError('items array is required');
    }
    const result = await prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          businessId: body.business_id,
          reference: body.reference || undefined,
          customerId: body.customer_id || undefined,
          saleDate: body.sale_date ? new Date(body.sale_date) : new Date(),
          total: body.total || undefined,
          paid: body.paid || undefined,
          status: body.status || undefined,
          paymentMethod: body.payment_method || undefined,
          dueDate: body.due_date ? new Date(body.due_date) : undefined,
          items: {
            create: body.items.map((item: { product_id: number; qty: number; unit_price?: number; total?: number }) => ({
              productId: item.product_id,
              qty: item.qty,
              unitPrice: item.unit_price || undefined,
              total: item.total || undefined,
            })),
          },
        },
        include: { items: true },
      });
      return sale;
    });
    return result;
  });
}
