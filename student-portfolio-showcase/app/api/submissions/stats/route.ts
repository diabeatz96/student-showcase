import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/submissions/stats - Get submission statistics
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await db().countByStatus();

    if (result.error || !result.data) {
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      );
    }

    const counts = result.data;
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

    return NextResponse.json({
      total,
      ...counts,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
