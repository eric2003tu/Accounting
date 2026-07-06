import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, ApiError } from '@/app/lib/route-utils';

export async function GET(request: NextRequest) {
  return handleApi(request, async () => {
    const { searchParams } = new URL(request.url);
    const ownedBy = searchParams.get('owned_by');
    let where: Record<string, unknown> = {};
    if (ownedBy) {
      const userId = parseInt(ownedBy);
      const bu = await prisma.businessUser.findMany({
        where: { userId, role: 'OWNER' },
        select: { businessId: true },
      });
      where = { id: { in: bu.map((b) => b.businessId) } };
    }
    const items = await prisma.business.findMany({ where, orderBy: { id: 'asc' } });
    return items;
  });
}

export async function POST(request: NextRequest) {
  return handleApi(request, async (auth) => {
    const body = await request.json();
    if (!body.name) throw new ApiError('name is required');
    const result = await prisma.$transaction(async (tx) => {
      const business = await tx.business.create({
        data: {
          name: body.name,
          legalName: body.legal_name || undefined,
          tradeName: body.trade_name || undefined,
          vatNumber: body.vat_number || undefined,
          registrationNo: body.registration_no || undefined,
          currency: body.currency || 'RWF',
          timezone: body.timezone || undefined,
          address: body.address || undefined,
          city: body.city || undefined,
          country: body.country || undefined,
          industry: body.industry || undefined,
          status: body.status || undefined,
          subscription: body.subscription || undefined,
          billingCycle: body.billing_cycle || undefined,
          nextBillingDate: body.next_billing_date ? new Date(body.next_billing_date) : undefined,
        },
      });
      await tx.businessUser.create({
        data: {
          businessId: business.id,
          userId: auth.userId,
          role: 'OWNER',
        },
      });
      return business;
    });
    return result;
  });
}
