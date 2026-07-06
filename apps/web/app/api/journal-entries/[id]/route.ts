import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, errorResponse, parseId } from '@/app/lib/route-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return handleApi(request, async () => {
    const id = parseId(params);
    const item = await prisma.journalEntry.findUnique({
      where: { id },
      include: { lines: { include: { account: true } } },
    });
    if (!item) return errorResponse('Journal entry not found', 404);
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
    const { lines, ...data } = body;
    const item = await prisma.$transaction(async (tx) => {
      await tx.journalLine.deleteMany({ where: { journalEntryId: id } });
      return tx.journalEntry.update({
        where: { id },
        data: { ...data, lines: { create: lines || [] } },
        include: { lines: { include: { account: true } } },
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
    const { lines, ...data } = body;
    if (lines) {
      const item = await prisma.$transaction(async (tx) => {
        await tx.journalLine.deleteMany({ where: { journalEntryId: id } });
        return tx.journalEntry.update({
          where: { id },
          data: { ...data, lines: { create: lines } },
          include: { lines: { include: { account: true } } },
        });
      });
      return item;
    }
    const item = await prisma.journalEntry.update({
      where: { id },
      data,
      include: { lines: { include: { account: true } } },
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
    await prisma.journalEntry.delete({ where: { id } });
    return { success: true };
  });
}
