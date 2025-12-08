'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import type { SubmissionRecord, SubmissionStatusType } from '@/lib/db/types';

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  pr_created: number;
  merged: number;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SubmissionStatusType | 'all'>('all');
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      // Fetch submissions
      const statusParam = filter !== 'all' ? `?status=${filter}` : '';
      const [submissionsRes, statsRes] = await Promise.all([
        fetch(`/api/submissions${statusParam}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/submissions/stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!submissionsRes.ok || !statsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const submissionsData = await submissionsRes.json();
      const statsData = await statsRes.json();

      setSubmissions(submissionsData.submissions);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getStatusColor = (status: SubmissionStatusType) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pr_created':
        return 'bg-blue-100 text-blue-800';
      case 'merged':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard
          label="Total"
          value={stats?.total || 0}
          color="bg-gray-100 text-gray-800"
          onClick={() => setFilter('all')}
          active={filter === 'all'}
        />
        <StatCard
          label="Pending"
          value={stats?.pending || 0}
          color="bg-yellow-100 text-yellow-800"
          onClick={() => setFilter('pending')}
          active={filter === 'pending'}
        />
        <StatCard
          label="Approved"
          value={stats?.approved || 0}
          color="bg-green-100 text-green-800"
          onClick={() => setFilter('approved')}
          active={filter === 'approved'}
        />
        <StatCard
          label="Rejected"
          value={stats?.rejected || 0}
          color="bg-red-100 text-red-800"
          onClick={() => setFilter('rejected')}
          active={filter === 'rejected'}
        />
        <StatCard
          label="PR Created"
          value={stats?.pr_created || 0}
          color="bg-blue-100 text-blue-800"
          onClick={() => setFilter('pr_created')}
          active={filter === 'pr_created'}
        />
        <StatCard
          label="Merged"
          value={stats?.merged || 0}
          color="bg-purple-100 text-purple-800"
          onClick={() => setFilter('merged')}
          active={filter === 'merged'}
        />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {filter === 'all' ? 'All Submissions' : `${filter.charAt(0).toUpperCase() + filter.slice(1).replace('_', ' ')} Submissions`}
        </h1>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg
            className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      )}

      {/* Submissions Table */}
      {!loading && submissions.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {submission.firstName} {submission.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {submission.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {submission.projects?.length || 0} project(s)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}
                      >
                        {submission.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.submittedAt
                        ? formatDate(submission.submittedAt)
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/submissions/${submission.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && submissions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No submissions
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all'
              ? 'No submissions have been received yet.'
              : `No ${filter.replace('_', ' ')} submissions.`}
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  onClick,
  active,
}: {
  label: string;
  value: number;
  color: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl transition-all ${
        active
          ? 'ring-2 ring-primary-500 ring-offset-2'
          : 'hover:shadow-md'
      } ${color}`}
    >
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm font-medium opacity-80">{label}</div>
    </button>
  );
}
