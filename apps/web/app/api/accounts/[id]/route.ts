import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, errorResponse, parseId } from '@/app/lib/route-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return handleApi(request, async () => {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    const item = await prisma.account.findUnique({ where: { id } });
    if (!item) return errorResponse('Account not found', 404);
    return item;
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return handleApi(request, async () => {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    const body = await request.json();
    const item = await prisma.account.update({ where: { id }, data: body });
    return item;
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return handleApi(request, async () => {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    const body = await request.json();
    const item = await prisma.account.update({ where: { id }, data: body });
    return item;
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
