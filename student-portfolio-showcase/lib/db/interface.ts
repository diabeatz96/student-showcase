// Abstract database interface - implement this for any database provider
import type {
  Submission,
  SubmissionRecord,
  SubmissionStatusType,
  QueryOptions,
  DbResponse,
  DbListResponse,
} from './types';

export interface ISubmissionRepository {
  // Create a new submission
  create(submission: Omit<Submission, 'id'>): Promise<DbResponse<SubmissionRecord>>;

  // Get a single submission by ID
  getById(id: string): Promise<DbResponse<SubmissionRecord>>;

  // Get a single submission by email (to check for duplicates)
  getByEmail(email: string): Promise<DbResponse<SubmissionRecord>>;

  // List submissions with filtering and pagination
  list(options?: QueryOptions): Promise<DbListResponse<SubmissionRecord>>;

  // Update a submission
  update(id: string, data: Partial<Submission>): Promise<DbResponse<SubmissionRecord>>;

  // Update submission status
  updateStatus(
    id: string,
    status: SubmissionStatusType,
    reviewData?: { reviewedBy?: string; reviewNotes?: string }
  ): Promise<DbResponse<SubmissionRecord>>;

  // Delete a submission
  delete(id: string): Promise<DbResponse<boolean>>;

  // Count submissions by status
  countByStatus(): Promise<DbResponse<Record<SubmissionStatusType, number>>>;
}

export interface IStorageService {
  // Upload a file and return the public URL
  uploadFile(
    bucket: string,
    path: string,
    file: Buffer | Blob,
    contentType: string
  ): Promise<DbResponse<string>>;

  // Delete a file
  deleteFile(bucket: string, path: string): Promise<DbResponse<boolean>>;

  // Get public URL for a file
  getPublicUrl(bucket: string, path: string): string;
}

export interface IAuthService {
  // Verify admin credentials
  verifyAdmin(token: string): Promise<DbResponse<{ userId: string; email: string }>>;

  // Generate admin token
  generateToken(email: string, password: string): Promise<DbResponse<string>>;
}
