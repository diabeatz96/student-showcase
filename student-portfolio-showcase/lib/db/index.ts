// Database abstraction layer - switch providers here
import type { ISubmissionRepository, IStorageService, IAuthService } from './interface';
import {
  SupabaseSubmissionRepository,
  SupabaseStorageService,
  SupabaseAuthService,
} from './supabase/repository';

// Export types
export * from './types';
export * from './interface';

// Current provider configuration
const DB_PROVIDER = process.env.DB_PROVIDER || 'supabase';

// Factory functions - swap implementations here when changing providers
export function getSubmissionRepository(): ISubmissionRepository {
  switch (DB_PROVIDER) {
    case 'supabase':
      return new SupabaseSubmissionRepository();
    // Add other providers here:
    // case 'express':
    //   return new ExpressSubmissionRepository();
    // case 'mongodb':
    //   return new MongoSubmissionRepository();
    default:
      return new SupabaseSubmissionRepository();
  }
}

export function getStorageService(): IStorageService {
  switch (DB_PROVIDER) {
    case 'supabase':
      return new SupabaseStorageService();
    default:
      return new SupabaseStorageService();
  }
}

export function getAuthService(): IAuthService {
  switch (DB_PROVIDER) {
    case 'supabase':
      return new SupabaseAuthService();
    default:
      return new SupabaseAuthService();
  }
}

// Singleton instances for convenience
let submissionRepo: ISubmissionRepository | null = null;
let storageService: IStorageService | null = null;
let authService: IAuthService | null = null;

export function db() {
  if (!submissionRepo) {
    submissionRepo = getSubmissionRepository();
  }
  return submissionRepo;
}

export function storage() {
  if (!storageService) {
    storageService = getStorageService();
  }
  return storageService;
}

export function auth() {
  if (!authService) {
    authService = getAuthService();
  }
  return authService;
}
