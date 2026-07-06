import { prisma } from '@/app/lib/prisma';
import { signToken, comparePassword, jsonResponse, errorResponse } from '@/app/lib/auth-server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return errorResponse('Email and password are required');

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return errorResponse('Invalid email or password', 401);

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) return errorResponse('Invalid email or password', 401);

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
        phone: user.phone,
        is_active: user.isActive,
        created_at: user.createdAt.toISOString(),
        updated_at: user.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('Internal server error', 500);
  }
}
