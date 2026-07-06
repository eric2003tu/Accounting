import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, ApiError } from '@/app/lib/route-utils';

export async function GET(request: NextRequest) {
  return handleApi(request, async () => {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('business_id');
    const where: Record<string, unknown> = {};
    if (businessId) where.businessId = parseInt(businessId);
    const items = await prisma.journalEntry.findMany({ where, orderBy: { id: 'asc' }, include: { lines: true } });
    return items;
  });
}

export async function POST(request: NextRequest) {
  return handleApi(request, async () => {
    const body = await request.json();
    if (!body.business_id) throw new ApiError('business_id is required');
    if (!body.lines || !Array.isArray(body.lines) || body.lines.length === 0) {
      throw new ApiError('lines array is required');
    }
    const result = await prisma.$transaction(async (tx) => {
      const entry = await tx.journalEntry.create({
        data: {
          businessId: body.business_id,
          reference: body.reference || undefined,
          date: body.date ? new Date(body.date) : new Date(),
          description: body.description || undefined,
          lines: {
            create: body.lines.map((line: { account_id: number; amount: number; type: string; description?: string }) => ({
              accountId: line.account_id,
              amount: line.amount,
              type: line.type,
              description: line.description || undefined,
            })),
          },
        },
        include: { lines: true },
      });
      return entry;
    });
    return result;
  });
}
