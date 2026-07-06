import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, errorResponse, parseId } from '@/app/lib/route-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async () => {
    const id = parseId(params);
    const item = await prisma.ownerApplication.findUnique({
      where: { id },
      include: { user: true, reviewer: true },
    });
    if (!item) return errorResponse('Owner application not found', 404);
    return item;
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async (auth) => {
    const id = parseId(params);
    if (auth.role !== 'admin') return errorResponse('Only admins can update applications', 403);
    const body = await request.json();
    const item = await prisma.ownerApplication.update({
      where: { id },
      data: { ...body, reviewedBy: auth.userId, reviewedAt: body.status ? new Date() : undefined },
      include: { user: true, reviewer: true },
    });
    return item;
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async (auth) => {
    const id = parseId(params);
    if (auth.role !== 'admin') return errorResponse('Only admins can update applications', 403);
    const body = await request.json();
    const item = await prisma.ownerApplication.update({
      where: { id },
      data: { ...body, reviewedBy: auth.userId, reviewedAt: body.status ? new Date() : undefined },
      include: { user: true, reviewer: true },
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
    await prisma.ownerApplication.delete({ where: { id } });
    return { success: true };
  });
}
