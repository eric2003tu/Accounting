import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, errorResponse, parseId } from '@/app/lib/route-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async () => {
    const id = parseId(params);
    const item = await prisma.sale.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });
    if (!item) return errorResponse('Sale not found', 404);
    return item;
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async () => {
    const id = parseId(params);
    const body = await request.json();
    const { items, ...data } = body;
    const item = await prisma.$transaction(async (tx) => {
      await tx.saleItem.deleteMany({ where: { saleId: id } });
      return tx.sale.update({
        where: { id },
        data: { ...data, items: { create: items || [] } },
        include: { items: { include: { product: true } } },
      });
    });
    return item;
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async () => {
    const id = parseId(params);
    const body = await request.json();
    const { items, ...data } = body;
    if (items) {
      const item = await prisma.$transaction(async (tx) => {
        await tx.saleItem.deleteMany({ where: { saleId: id } });
        return tx.sale.update({
          where: { id },
          data: { ...data, items: { create: items } },
          include: { items: { include: { product: true } } },
        });
      });
      return item;
    }
    const item = await prisma.sale.update({
      where: { id },
      data,
      include: { items: { include: { product: true } } },
    });
    return item;
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async () => {
    const id = parseId(params);
    await prisma.sale.delete({ where: { id } });
    return { success: true };
  });
}
