import { NextRequest, NextResponse } from 'next/server';
import { db, SubmissionSchema, SubmissionStatus } from '@/lib/db';

// POST /api/submissions - Create new submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate submission data
    const parseResult = SubmissionSchema.omit({ id: true, status: true }).safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const submissionData = parseResult.data;

    // Check for existing submission with same email in pending/approved status
    const existingResult = await db().getByEmail(submissionData.email);
    if (existingResult.data) {
      const existing = existingResult.data;
      if (existing.status === SubmissionStatus.PENDING) {
        return NextResponse.json(
          {
            error: 'You already have a pending submission. Please wait for review.',
            existingId: existing.id,
          },
          { status: 409 }
        );
      }
    }

    // Create submission
    const result = await db().create({
      ...submissionData,
      status: SubmissionStatus.PENDING,
      submittedAt: new Date().toISOString(),
    });

    if (result.error) {
      console.error('Failed to create submission:', result.error);
      return NextResponse.json(
        { error: 'Failed to create submission' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Submission received successfully',
        id: result.data?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/submissions - List submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as typeof SubmissionStatus[keyof typeof SubmissionStatus] | null;
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const result = await db().list({
      status: status || undefined,
      limit,
      offset,
      orderBy: 'created_at',
      orderDirection: 'desc',
    });

    if (result.error) {
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      submissions: result.data,
      total: result.count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('List submissions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
