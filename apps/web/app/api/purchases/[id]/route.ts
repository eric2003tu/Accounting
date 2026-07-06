import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, errorResponse, parseId } from '@/app/lib/route-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async () => {
    const id = parseId(params);
    const item = await prisma.purchase.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });
    if (!item) return errorResponse('Purchase not found', 404);
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
      await tx.purchaseItem.deleteMany({ where: { purchaseId: id } });
      return tx.purchase.update({
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
        await tx.purchaseItem.deleteMany({ where: { purchaseId: id } });
        return tx.purchase.update({
          where: { id },
          data: { ...data, items: { create: items } },
          include: { items: { include: { product: true } } },
        });
      });
      return item;
    }
    const item = await prisma.purchase.update({
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
    await prisma.purchase.delete({ where: { id } });
    return { success: true };
  });
}
