-- Supabase Schema for Student Showcase Submissions
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Student info
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  personal_statement TEXT,
  skills TEXT[] NOT NULL DEFAULT '{}',
  career_goals TEXT,
  major VARCHAR(100),
  graduation_year INTEGER,

  -- Contact links
  website VARCHAR(500),
  github VARCHAR(500),
  linkedin VARCHAR(500),
  twitter VARCHAR(500),

  -- Photo
  photo_data TEXT, -- Base64 data (temporary)
  photo_url VARCHAR(500), -- Final URL after upload

  -- Projects (stored as JSONB array)
  projects JSONB NOT NULL DEFAULT '[]',

  -- Status tracking
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'pr_created', 'merged')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by VARCHAR(255),
  review_notes TEXT,

  -- GitHub PR tracking
  pr_url VARCHAR(500),
  pr_number INTEGER,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_submissions_updated_at ON submissions;
CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (submit)
CREATE POLICY "Anyone can submit" ON submissions
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated admins can read
CREATE POLICY "Admins can read all" ON submissions
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated admins can update
CREATE POLICY "Admins can update" ON submissions
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated admins can delete
CREATE POLICY "Admins can delete" ON submissions
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create storage bucket for uploads (run in Supabase Dashboard > Storage)
-- Name: submissions
-- Public: true (for serving images)

-- Storage policies (run after creating bucket)
-- INSERT policy: Anyone can upload to submissions bucket
-- SELECT policy: Anyone can view files
-- UPDATE/DELETE: Only authenticated users

COMMENT ON TABLE submissions IS 'Student portfolio submissions awaiting review';
COMMENT ON COLUMN submissions.projects IS 'Array of project objects with title, description, technologies, urls, etc.';
COMMENT ON COLUMN submissions.status IS 'Workflow: pending -> approved/rejected -> pr_created -> merged';
