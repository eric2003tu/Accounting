import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, errorResponse, parseId } from '@/app/lib/route-utils';

const userSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  systemRole: true,
  phone: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async () => {
    const id = parseId(params);
    const item = await prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });
    if (!item) return errorResponse('User not found', 404);
    return item;
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async (auth) => {
    const id = parseId(params);
    const body = await request.json();
    if (body.systemRole && auth.role !== 'admin') {
      return errorResponse('Only admins can update roles', 403);
    }
    const { passwordHash, ...data } = body;
    const item = await prisma.user.update({
      where: { id },
      data,
      select: userSelect,
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
    const body = await request.json();
    if (body.systemRole && auth.role !== 'admin') {
      return errorResponse('Only admins can update roles', 403);
    }
    const { passwordHash, ...data } = body;
    const item = await prisma.user.update({
      where: { id },
      data,
      select: userSelect,
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
    await prisma.user.delete({ where: { id } });
    return { success: true };
  });
}
