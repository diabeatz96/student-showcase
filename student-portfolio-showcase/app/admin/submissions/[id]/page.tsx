'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { SubmissionRecord } from '@/lib/db/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SubmissionDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [submission, setSubmission] = useState<SubmissionRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchSubmission();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchSubmission = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const response = await fetch(`/api/submissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch submission');
      }

      const data = await response.json();
      setSubmission(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load submission');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!confirm('Are you sure you want to approve this submission? This will create a GitHub PR.')) {
      return;
    }

    setActionLoading(true);
    setError('');

    const token = localStorage.getItem('admin_token');

    try {
      const response = await fetch(`/api/submissions/${id}/approve`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewNotes,
          reviewedBy: 'admin',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to approve');
      }

      alert(data.message);
      fetchSubmission();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!reviewNotes.trim()) {
      alert('Please provide rejection notes');
      return;
    }

    if (!confirm('Are you sure you want to reject this submission?')) {
      return;
    }

    setActionLoading(true);
    setError('');

    const token = localStorage.getItem('admin_token');

    try {
      const response = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'rejected',
          reviewNotes,
          reviewedBy: 'admin',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject');
      }

      alert('Submission rejected');
      fetchSubmission();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to permanently delete this submission?')) {
      return;
    }

    setActionLoading(true);
    const token = localStorage.getItem('admin_token');

    try {
      const response = await fetch(`/api/submissions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Submission not found</h1>
          <Link href="/admin" className="text-primary-600 hover:underline mt-4 inline-block">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pr_created': return 'bg-blue-100 text-blue-800';
      case 'merged': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {submission.firstName} {submission.lastName}
            </h1>
            <p className="text-gray-600">{submission.email}</p>
          </div>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(submission.status)}`}>
            {submission.status.replace('_', ' ')}
          </span>
        </div>

        {submission.prUrl && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <a
              href={submission.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View Pull Request #{submission.prNumber}
            </a>
          </div>
        )}
      </div>

      {/* Student Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Bio</label>
            <p className="mt-1 text-gray-900">{submission.bio}</p>
          </div>
          {submission.personalStatement && (
            <div>
              <label className="block text-sm font-medium text-gray-500">Personal Statement</label>
              <p className="mt-1 text-gray-900">{submission.personalStatement}</p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-500">Skills</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {submission.skills?.map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {submission.major && (
            <div>
              <label className="block text-sm font-medium text-gray-500">Major</label>
              <p className="mt-1 text-gray-900">{submission.major}</p>
            </div>
          )}
          {submission.graduationYear && (
            <div>
              <label className="block text-sm font-medium text-gray-500">Graduation Year</label>
              <p className="mt-1 text-gray-900">{submission.graduationYear}</p>
            </div>
          )}
          {submission.careerGoals && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500">Career Goals</label>
              <p className="mt-1 text-gray-900">{submission.careerGoals}</p>
            </div>
          )}
        </div>

        {/* Contact Links */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-500 mb-2">Links</label>
          <div className="flex flex-wrap gap-3">
            {submission.website && (
              <a href={submission.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline text-sm">
                Website
              </a>
            )}
            {submission.github && (
              <a href={submission.github} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline text-sm">
                GitHub
              </a>
            )}
            {submission.linkedin && (
              <a href={submission.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline text-sm">
                LinkedIn
              </a>
            )}
            {submission.twitter && (
              <a href={submission.twitter} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline text-sm">
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Projects ({submission.projects?.length || 0})
        </h2>
        <div className="space-y-4">
          {submission.projects?.map((project, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">{project.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{project.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {project.technologies?.map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex gap-3 text-sm">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Repository
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      {submission.status === 'pending' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Review Actions</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Notes (required for rejection)
            </label>
            <textarea
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Add notes about this submission..."
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleApprove}
              disabled={actionLoading}
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading ? 'Processing...' : 'Approve & Create PR'}
            </button>
            <button
              onClick={handleReject}
              disabled={actionLoading}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reject
            </button>
            <button
              onClick={handleDelete}
              disabled={actionLoading}
              className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Review Info */}
      {submission.reviewedAt && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Review Information</h2>
          <p className="text-sm text-gray-600">
            Reviewed on {new Date(submission.reviewedAt).toLocaleString()}
            {submission.reviewedBy && ` by ${submission.reviewedBy}`}
          </p>
          {submission.reviewNotes && (
            <p className="mt-2 text-gray-700">{submission.reviewNotes}</p>
          )}
        </div>
      )}
    </div>
  );
}
