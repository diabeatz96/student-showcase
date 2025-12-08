import { NextRequest, NextResponse } from 'next/server';
import { db, SubmissionStatus } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/submissions/[id] - Get single submission
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await db().getById(id);

    if (result.error || !result.data) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Get submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/submissions/[id] - Update submission status
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status, reviewNotes, reviewedBy } = body;

    // Validate status
    if (!Object.values(SubmissionStatus).includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const result = await db().updateStatus(id, status, {
      reviewNotes,
      reviewedBy,
    });

    if (result.error || !result.data) {
      return NextResponse.json(
        { error: 'Failed to update submission' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Submission updated',
      submission: result.data,
    });
  } catch (error) {
    console.error('Update submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/submissions/[id] - Delete submission
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await db().delete(id);

    if (result.error || !result.data) {
      return NextResponse.json(
        { error: 'Failed to delete submission' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Submission deleted' });
  } catch (error) {
    console.error('Delete submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
