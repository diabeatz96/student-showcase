import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/db';

// POST /api/auth/login - Admin login
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user is in admin list
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim());
    if (!adminEmails.includes(email)) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Authenticate with Supabase
    const result = await auth().generateToken(email, password);

    if (result.error || !result.data) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      token: result.data,
      email,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
