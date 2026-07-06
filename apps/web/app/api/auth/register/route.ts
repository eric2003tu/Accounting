import { prisma } from '@/app/lib/prisma';
import { signToken, hashPassword, jsonResponse, errorResponse } from '@/app/lib/auth-server';

export async function POST(request: Request) {
  try {
    const { email, password, first_name, last_name } = await request.json();
    if (!email || !password) return errorResponse('Email and password are required');

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return errorResponse('Email already registered', 409);

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName: first_name || null,
        lastName: last_name || null,
        systemRole: 'NORMAL',
      },
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.systemRole || 'NORMAL',
    });

    return jsonResponse({
      access_token: token,
      token_type: 'bearer',
      user: {
        id: String(user.id),
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        system_role: user.systemRole,
        systemRole: user.systemRole,
        is_active: user.isActive,
        created_at: user.createdAt.toISOString(),
      },
    }, 201);
  } catch (error) {
    console.error('Register error:', error);
    return errorResponse('Internal server error', 500);
  }
}
