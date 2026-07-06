import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, errorResponse, parseId } from '@/app/lib/route-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async () => {
    const id = parseId(params);
    const item = await prisma.notification.findUnique({ where: { id } });
    if (!item) return errorResponse('Notification not found', 404);
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
    const item = await prisma.notification.update({ where: { id }, data: body });
    return item;
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async () => {
    const id = parseId(params);
    const item = await prisma.notification.update({
      where: { id },
      data: { read: true },
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
    await prisma.notification.delete({ where: { id } });
    return { success: true };
  });
}
