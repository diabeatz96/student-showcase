import { NextRequest, NextResponse } from 'next/server';
import { db, SubmissionStatus } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/submissions/[id]/approve - Approve and trigger GitHub PR
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { reviewNotes, reviewedBy } = body;

    // Get the submission
    const submissionResult = await db().getById(id);
    if (submissionResult.error || !submissionResult.data) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    const submission = submissionResult.data;

    // Check if already approved
    if (submission.status !== SubmissionStatus.PENDING) {
      return NextResponse.json(
        { error: `Submission is already ${submission.status}` },
        { status: 400 }
      );
    }

    // Update status to approved
    const updateResult = await db().updateStatus(id, SubmissionStatus.APPROVED, {
      reviewNotes,
      reviewedBy,
    });

    if (updateResult.error) {
      return NextResponse.json(
        { error: 'Failed to approve submission' },
        { status: 500 }
      );
    }

    // Trigger GitHub Action to create PR
    const githubResult = await triggerGitHubAction(submission);

    if (githubResult.success) {
      // Update with PR info
      await db().update(id, {
        status: SubmissionStatus.PR_CREATED,
        prUrl: githubResult.prUrl,
        prNumber: githubResult.prNumber,
      });

      return NextResponse.json({
        message: 'Submission approved and PR created',
        prUrl: githubResult.prUrl,
        prNumber: githubResult.prNumber,
      });
    } else {
      // PR creation failed, but approval succeeded
      return NextResponse.json({
        message: 'Submission approved, but PR creation failed. You can retry.',
        error: githubResult.error,
      });
    }
  } catch (error) {
    console.error('Approve submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function triggerGitHubAction(submission: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}): Promise<{ success: boolean; prUrl?: string; prNumber?: number; error?: string }> {
  const githubToken = process.env.GITHUB_TOKEN;
  const repoOwner = process.env.GITHUB_REPO_OWNER || 'diabeatz96';
  const repoName = process.env.GITHUB_REPO_NAME || 'student-showcase';

  if (!githubToken) {
    return { success: false, error: 'GitHub token not configured' };
  }

  try {
    // Trigger repository dispatch event
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'create-student-pr',
          client_payload: {
            submission_id: submission.id,
            student_name: `${submission.firstName} ${submission.lastName}`,
            student_email: submission.email,
            submission_data: JSON.stringify(submission),
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', errorText);
      return { success: false, error: `GitHub API error: ${response.status}` };
    }

    // The actual PR URL will be updated by the GitHub Action webhook
    return {
      success: true,
      prUrl: undefined,
      prNumber: undefined,
    };
  } catch (error) {
    console.error('GitHub trigger error:', error);
    return { success: false, error: 'Failed to trigger GitHub Action' };
  }
}
