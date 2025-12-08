// Database types - abstracted for easy provider switching
import { z } from 'zod';

// Submission status enum
export const SubmissionStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PR_CREATED: 'pr_created',
  MERGED: 'merged',
} as const;

export type SubmissionStatusType = typeof SubmissionStatus[keyof typeof SubmissionStatus];

// Submission schema for validation
export const SubmissionSchema = z.object({
  id: z.string().uuid().optional(),

  // Student info
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  bio: z.string().min(50).max(500),
  personalStatement: z.string().max(1000).optional(),
  skills: z.array(z.string()).min(1),
  careerGoals: z.string().max(300).optional(),
  major: z.string().optional(),
  graduationYear: z.number().min(2020).max(2035).optional(),

  // Contact links
  website: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),

  // Photo (base64 or URL after upload)
  photoData: z.string().optional(),
  photoUrl: z.string().optional(),

  // Projects array
  projects: z.array(z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(50).max(500),
    technologies: z.array(z.string()).min(1),
    demoUrl: z.string().url().optional().or(z.literal('')),
    repoUrl: z.string().url().optional().or(z.literal('')),
    screenshotData: z.string().optional(),
    screenshotUrl: z.string().optional(),
    semester: z.string(),
    completedDate: z.string().optional(),
    featured: z.boolean().default(false),
    canEmbed: z.boolean().default(true),
  })).min(1).max(6),

  // Metadata
  status: z.enum(['pending', 'approved', 'rejected', 'pr_created', 'merged']).default('pending'),
  submittedAt: z.string().datetime().optional(),
  reviewedAt: z.string().datetime().optional(),
  reviewedBy: z.string().optional(),
  reviewNotes: z.string().optional(),
  prUrl: z.string().url().optional(),
  prNumber: z.number().optional(),
});

export type Submission = z.infer<typeof SubmissionSchema>;

// Database record type (includes DB-specific fields)
export interface SubmissionRecord extends Submission {
  id: string;
  created_at: string;
  updated_at: string;
}

// Query options for flexibility
export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  status?: SubmissionStatusType;
}

// Generic response types
export interface DbResponse<T> {
  data: T | null;
  error: Error | null;
}

export interface DbListResponse<T> {
  data: T[];
  count: number;
  error: Error | null;
}
