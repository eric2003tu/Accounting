import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { handleApi, errorResponse } from '@/app/lib/route-utils';

export async function GET(request: NextRequest) {
  return handleApi(request, async (auth) => {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'admin') {
      if (auth.role !== 'admin') return errorResponse('Forbidden', 403);
      const [totalUsers, totalBusinesses, revenueAgg, pendingApps] = await Promise.all([
        prisma.user.count(),
        prisma.business.count(),
        prisma.sale.aggregate({ _sum: { total: true } }),
        prisma.ownerApplication.count({ where: { status: 'pending' } }),
      ]);
      return {
        totalUsers,
        totalBusinesses,
        platformRevenue: revenueAgg._sum.total,
        pendingApplications: pendingApps,
      };
    }

    const roleFilter = type === 'managed' ? 'manager' : 'owner';
    const businessUserRecords = await prisma.businessUser.findMany({
      where: { userId: auth.userId, role: roleFilter },
      select: { businessId: true },
    });
    const businessIds = businessUserRecords.map((b) => b.businessId);

    if (businessIds.length === 0) {
      return {
        totalBusinesses: 0,
        totalRevenue: 0,
        totalExpenses: 0,
        accountBalance: 0,
        recentTransactions: [],
        revenueTrend: [],
      };
    }

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);

    const [businesses, revenueAgg, expensesAgg, balanceAgg, recentTransactions, sales] =
      await Promise.all([
        prisma.business.count({ where: { id: { in: businessIds } } }),
        prisma.sale.aggregate({
          where: { businessId: { in: businessIds } },
          _sum: { total: true },
        }),
        prisma.purchase.aggregate({
          where: { businessId: { in: businessIds } },
          _sum: { total: true },
        }),
        prisma.account.aggregate({
          where: { businessId: { in: businessIds } },
          _sum: { balance: true },
        }),
        prisma.journalEntry.findMany({
          where: { businessId: { in: businessIds } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        }),
        prisma.sale.findMany({
          where: {
            businessId: { in: businessIds },
            saleDate: { gte: twelveMonthsAgo },
          },
          select: { saleDate: true, total: true },
        }),
      ]);

    const revenueTrendMap: Record<string, number> = {};
    for (const sale of sales) {
      const key = `${sale.saleDate.getFullYear()}-${String(sale.saleDate.getMonth() + 1).padStart(2, '0')}`;
      revenueTrendMap[key] = (revenueTrendMap[key] || 0) + Number(sale.total || 0);
    }
    const revenueTrend = Object.entries(revenueTrendMap)
      .map(([month, revenue]) => ({ month, revenue }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return {
      totalBusinesses: businesses,
      totalRevenue: revenueAgg._sum.total || 0,
      totalExpenses: expensesAgg._sum.total || 0,
      accountBalance: balanceAgg._sum.balance || 0,
      recentTransactions,
      revenueTrend,
    };
  });
}
