// Supabase Database Types
// This file defines the database schema types for TypeScript

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      submissions: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          bio: string
          personal_statement: string | null
          skills: string[]
          career_goals: string | null
          major: string | null
          graduation_year: number | null
          website: string | null
          github: string | null
          linkedin: string | null
          twitter: string | null
          photo_data: string | null
          photo_url: string | null
          projects: Json
          status: 'pending' | 'approved' | 'rejected' | 'pr_created' | 'merged'
          submitted_at: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          review_notes: string | null
          pr_url: string | null
          pr_number: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          bio: string
          personal_statement?: string | null
          skills?: string[]
          career_goals?: string | null
          major?: string | null
          graduation_year?: number | null
          website?: string | null
          github?: string | null
          linkedin?: string | null
          twitter?: string | null
          photo_data?: string | null
          photo_url?: string | null
          projects?: Json
          status?: 'pending' | 'approved' | 'rejected' | 'pr_created' | 'merged'
          submitted_at?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          review_notes?: string | null
          pr_url?: string | null
          pr_number?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          bio?: string
          personal_statement?: string | null
          skills?: string[]
          career_goals?: string | null
          major?: string | null
          graduation_year?: number | null
          website?: string | null
          github?: string | null
          linkedin?: string | null
          twitter?: string | null
          photo_data?: string | null
          photo_url?: string | null
          projects?: Json
          status?: 'pending' | 'approved' | 'rejected' | 'pr_created' | 'merged'
          submitted_at?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          review_notes?: string | null
          pr_url?: string | null
          pr_number?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
