import { getSupabaseAdminClient } from './client';
import type {
  ISubmissionRepository,
  IStorageService,
  IAuthService,
} from '../interface';
import type {
  Submission,
  SubmissionRecord,
  SubmissionStatusType,
  QueryOptions,
  DbResponse,
  DbListResponse,
} from '../types';
import { SubmissionStatus } from '../types';

const TABLE_NAME = 'submissions';

// Helper to convert camelCase to snake_case for database insert/update
function toDbRecord(submission: Partial<Submission>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const record: any = {};
  if (submission.firstName !== undefined) record.first_name = submission.firstName;
  if (submission.lastName !== undefined) record.last_name = submission.lastName;
  if (submission.email !== undefined) record.email = submission.email;
  if (submission.bio !== undefined) record.bio = submission.bio;
  if (submission.personalStatement !== undefined) record.personal_statement = submission.personalStatement;
  if (submission.skills !== undefined) record.skills = submission.skills;
  if (submission.careerGoals !== undefined) record.career_goals = submission.careerGoals;
  if (submission.major !== undefined) record.major = submission.major;
  if (submission.graduationYear !== undefined) record.graduation_year = submission.graduationYear;
  if (submission.website !== undefined) record.website = submission.website;
  if (submission.github !== undefined) record.github = submission.github;
  if (submission.linkedin !== undefined) record.linkedin = submission.linkedin;
  if (submission.twitter !== undefined) record.twitter = submission.twitter;
  if (submission.photoData !== undefined) record.photo_data = submission.photoData;
  if (submission.photoUrl !== undefined) record.photo_url = submission.photoUrl;
  if (submission.projects !== undefined) record.projects = submission.projects;
  if (submission.status !== undefined) record.status = submission.status;
  if (submission.submittedAt !== undefined) record.submitted_at = submission.submittedAt;
  if (submission.reviewedAt !== undefined) record.reviewed_at = submission.reviewedAt;
  if (submission.reviewedBy !== undefined) record.reviewed_by = submission.reviewedBy;
  if (submission.reviewNotes !== undefined) record.review_notes = submission.reviewNotes;
  if (submission.prUrl !== undefined) record.pr_url = submission.prUrl;
  if (submission.prNumber !== undefined) record.pr_number = submission.prNumber;
  return record;
}

export class SupabaseSubmissionRepository implements ISubmissionRepository {
  private get client() {
    return getSupabaseAdminClient();
  }

  async create(submission: Omit<Submission, 'id'>): Promise<DbResponse<SubmissionRecord>> {
    try {
      const dbRecord = toDbRecord(submission);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (this.client.from(TABLE_NAME) as any)
        .insert({
          ...dbRecord,
          status: submission.status || SubmissionStatus.PENDING,
          submitted_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      return { data: this.mapRecord(data), error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async getById(id: string): Promise<DbResponse<SubmissionRecord>> {
    try {
      const { data, error } = await this.client
        .from(TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data: this.mapRecord(data), error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async getByEmail(email: string): Promise<DbResponse<SubmissionRecord>> {
    try {
      const { data, error } = await this.client
        .from(TABLE_NAME)
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows

      return { data: data ? this.mapRecord(data) : null, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async list(options: QueryOptions = {}): Promise<DbListResponse<SubmissionRecord>> {
    try {
      const {
        limit = 20,
        offset = 0,
        orderBy = 'created_at',
        orderDirection = 'desc',
        status,
      } = options;

      let query = this.client
        .from(TABLE_NAME)
        .select('*', { count: 'exact' });

      if (status) {
        query = query.eq('status', status);
      }

      query = query
        .order(orderBy, { ascending: orderDirection === 'asc' })
        .range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map(this.mapRecord),
        count: count || 0,
        error: null,
      };
    } catch (error) {
      return { data: [], count: 0, error: error as Error };
    }
  }

  async update(id: string, updateData: Partial<Submission>): Promise<DbResponse<SubmissionRecord>> {
    try {
      const dbRecord = toDbRecord(updateData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (this.client.from(TABLE_NAME) as any)
        .update({
          ...dbRecord,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: this.mapRecord(data), error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async updateStatus(
    id: string,
    status: SubmissionStatusType,
    reviewData?: { reviewedBy?: string; reviewNotes?: string }
  ): Promise<DbResponse<SubmissionRecord>> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (this.client.from(TABLE_NAME) as any)
        .update({
          status,
          reviewed_at: new Date().toISOString(),
          reviewed_by: reviewData?.reviewedBy,
          review_notes: reviewData?.reviewNotes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: this.mapRecord(data), error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async delete(id: string): Promise<DbResponse<boolean>> {
    try {
      const { error } = await this.client
        .from(TABLE_NAME)
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { data: true, error: null };
    } catch (error) {
      return { data: false, error: error as Error };
    }
  }

  async countByStatus(): Promise<DbResponse<Record<SubmissionStatusType, number>>> {
    try {
      const counts: Record<SubmissionStatusType, number> = {
        pending: 0,
        approved: 0,
        rejected: 0,
        pr_created: 0,
        merged: 0,
      };

      for (const status of Object.values(SubmissionStatus)) {
        const { count, error } = await this.client
          .from(TABLE_NAME)
          .select('*', { count: 'exact', head: true })
          .eq('status', status);

        if (error) throw error;
        counts[status] = count || 0;
      }

      return { data: counts, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Map database record to TypeScript type (handle snake_case to camelCase)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapRecord(record: any): SubmissionRecord {
    return {
      id: record.id,
      firstName: record.first_name,
      lastName: record.last_name,
      email: record.email,
      bio: record.bio,
      personalStatement: record.personal_statement,
      skills: record.skills,
      careerGoals: record.career_goals,
      major: record.major,
      graduationYear: record.graduation_year,
      website: record.website,
      github: record.github,
      linkedin: record.linkedin,
      twitter: record.twitter,
      photoData: record.photo_data,
      photoUrl: record.photo_url,
      projects: record.projects,
      status: record.status,
      submittedAt: record.submitted_at,
      reviewedAt: record.reviewed_at,
      reviewedBy: record.reviewed_by,
      reviewNotes: record.review_notes,
      prUrl: record.pr_url,
      prNumber: record.pr_number,
      created_at: record.created_at,
      updated_at: record.updated_at,
    };
  }
}

export class SupabaseStorageService implements IStorageService {
  private get client() {
    return getSupabaseAdminClient();
  }

  async uploadFile(
    bucket: string,
    path: string,
    file: Buffer | Blob,
    contentType: string
  ): Promise<DbResponse<string>> {
    try {
      const { error } = await this.client.storage
        .from(bucket)
        .upload(path, file, {
          contentType,
          upsert: true,
        });

      if (error) throw error;

      const publicUrl = this.getPublicUrl(bucket, path);
      return { data: publicUrl, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async deleteFile(bucket: string, path: string): Promise<DbResponse<boolean>> {
    try {
      const { error } = await this.client.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;

      return { data: true, error: null };
    } catch (error) {
      return { data: false, error: error as Error };
    }
  }

  getPublicUrl(bucket: string, path: string): string {
    const { data } = this.client.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }
}

export class SupabaseAuthService implements IAuthService {
  private get client() {
    return getSupabaseAdminClient();
  }

  async verifyAdmin(token: string): Promise<DbResponse<{ userId: string; email: string }>> {
    try {
      const { data, error } = await this.client.auth.getUser(token);

      if (error) throw error;

      // Check if user is admin (you can customize this logic)
      const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim());
      if (!adminEmails.includes(data.user.email || '')) {
        throw new Error('User is not an admin');
      }

      return {
        data: { userId: data.user.id, email: data.user.email || '' },
        error: null,
      };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async generateToken(email: string, password: string): Promise<DbResponse<string>> {
    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { data: data.session?.access_token || null, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
}
