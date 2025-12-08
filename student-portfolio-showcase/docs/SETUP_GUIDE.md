# CSI Student Showcase - Setup Guide

This guide walks you through setting up the complete submission system with Supabase, Vercel, and GitHub Actions.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [GitHub Configuration](#github-configuration)
4. [Vercel Deployment](#vercel-deployment)
5. [Testing the System](#testing-the-system)
6. [Admin Dashboard Usage](#admin-dashboard-usage)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- [ ] A [GitHub](https://github.com) account
- [ ] A [Vercel](https://vercel.com) account (free tier works)
- [ ] A [Supabase](https://supabase.com) account (free tier works)
- [ ] Node.js 18+ installed locally
- [ ] The repository cloned to your local machine

---

## Supabase Setup

### Step 1: Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: `csi-student-showcase`
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose the closest to your users (e.g., `East US`)
4. Click **"Create new project"**
5. Wait 2-3 minutes for the project to initialize

### Step 2: Get Your API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values (you'll need them later):

   | Key | Description |
   |-----|-------------|
   | **Project URL** | `https://xxxxx.supabase.co` |
   | **anon/public key** | Starts with `eyJ...` |
   | **service_role key** | Starts with `eyJ...` (keep this secret!) |

### Step 3: Create the Database Schema

1. In Supabase, go to **SQL Editor**
2. Click **"New query"**
3. Copy and paste the entire contents of `supabase/schema.sql` from this repo
4. Click **"Run"**
5. You should see "Success. No rows returned"

### Step 4: Create Storage Bucket

1. Go to **Storage** in the Supabase sidebar
2. Click **"New bucket"**
3. Configure:
   - **Name**: `submissions`
   - **Public bucket**: ✅ Enabled
4. Click **"Create bucket"**

### Step 5: Set Up Storage Policies

1. Click on the `submissions` bucket
2. Go to **Policies** tab
3. Click **"New policy"** and create these policies:

**Policy 1: Allow public uploads**
```sql
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'submissions');
```

**Policy 2: Allow public viewing**
```sql
CREATE POLICY "Allow public viewing"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'submissions');
```

### Step 6: Create an Admin User

1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email**: Your admin email (e.g., `adam.kostandy@csi.cuny.edu`)
   - **Password**: A strong password
4. Click **"Create user"**
5. Note: You'll use this email/password to log into the admin dashboard

---

## GitHub Configuration

### Step 1: Generate a Personal Access Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Configure:
   - **Note**: `CSI Showcase PR Creation`
   - **Expiration**: Choose based on your needs (e.g., 90 days)
   - **Scopes**: Select these:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
4. Click **"Generate token"**
5. **IMPORTANT**: Copy the token immediately (starts with `ghp_`). You won't see it again!

### Step 2: Add Repository Secrets

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets by clicking **"New repository secret"**:

| Secret Name | Value |
|-------------|-------|
| `APP_URL` | Your Vercel deployment URL (e.g., `https://csi-showcase.vercel.app`) |
| `WEBHOOK_SECRET` | Generate a random string (e.g., use `openssl rand -hex 32`) |

### Step 3: Enable GitHub Actions

1. Go to **Actions** tab in your repository
2. If prompted, click **"I understand my workflows, go ahead and enable them"**
3. The `create-student-pr.yml` workflow should now be visible

---

## Vercel Deployment

### Step 1: Import Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Choose your `student-showcase` repository
5. Click **"Import"**

### Step 2: Configure Environment Variables

Before deploying, add these environment variables:

1. In the Vercel project setup, expand **"Environment Variables"**
2. Add each of these:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | From Supabase API settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | From Supabase API settings |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | From Supabase API settings (secret!) |
| `DB_PROVIDER` | `supabase` | Database provider |
| `ADMIN_EMAILS` | `admin@example.com,adam.kostandy@csi.cuny.edu` | Comma-separated admin emails |
| `GITHUB_TOKEN` | `ghp_xxxxx` | Your GitHub Personal Access Token |
| `GITHUB_REPO_OWNER` | `diabeatz96` | GitHub username/org |
| `GITHUB_REPO_NAME` | `student-showcase` | Repository name |
| `WEBHOOK_SECRET` | `your-random-string` | Same as GitHub secret |

### Step 3: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (2-5 minutes)
3. Once deployed, note your production URL (e.g., `https://csi-showcase.vercel.app`)

### Step 4: Update GitHub Secret

1. Go back to GitHub → Repository Settings → Secrets
2. Update `APP_URL` with your actual Vercel URL

---

## Testing the System

### Test 1: Student Submission

1. Go to your deployed site: `https://your-app.vercel.app/submit`
2. Fill out the form with test data:
   - Name: `Test Student`
   - Email: `test@example.com`
   - Bio: At least 50 characters
   - Add at least one project
3. Click **"Submit Portfolio"**
4. You should see a success message

### Test 2: Admin Dashboard

1. Go to `https://your-app.vercel.app/admin`
2. You'll be redirected to the login page
3. Enter your admin credentials (from Supabase Auth)
4. You should see the dashboard with your test submission

### Test 3: Approve Submission

1. In the admin dashboard, click **"Review"** on a submission
2. Add optional review notes
3. Click **"Approve & Create PR"**
4. Check your GitHub repository for a new Pull Request

### Test 4: Merge PR

1. Go to the Pull Request on GitHub
2. Review the changes (new student JSON file)
3. Merge the PR
4. Your site will automatically redeploy with the new student

---

## Admin Dashboard Usage

### Dashboard Overview

The admin dashboard (`/admin`) shows:
- **Stats cards**: Total submissions by status
- **Submissions table**: All submissions with quick filters
- **Review page**: Detailed view of each submission

### Submission Statuses

| Status | Description |
|--------|-------------|
| `pending` | Awaiting review |
| `approved` | Approved, PR being created |
| `rejected` | Rejected by admin |
| `pr_created` | GitHub PR has been created |
| `merged` | PR merged, student is live |

### Reviewing a Submission

1. Click **"Review"** on any submission
2. Check all student information and projects
3. Verify project URLs work
4. Add review notes (required for rejection)
5. Click **"Approve & Create PR"** or **"Reject"**

### Deleting a Submission

- Use **"Delete"** only for spam or duplicate submissions
- This action is permanent

---

## Troubleshooting

### "Missing Supabase environment variables"

**Cause**: Environment variables not set in Vercel
**Fix**:
1. Go to Vercel → Project Settings → Environment Variables
2. Ensure all required variables are set
3. Redeploy the project

### "User is not an admin"

**Cause**: Your email is not in the `ADMIN_EMAILS` list
**Fix**:
1. Update `ADMIN_EMAILS` in Vercel to include your email
2. Redeploy

### "GitHub API error: 401"

**Cause**: GitHub token expired or invalid
**Fix**:
1. Generate a new Personal Access Token on GitHub
2. Update `GITHUB_TOKEN` in Vercel
3. Redeploy

### PR not being created

**Cause**: GitHub Actions not enabled or workflow file issue
**Fix**:
1. Check repository Actions tab for errors
2. Ensure the workflow file exists at `.github/workflows/create-student-pr.yml`
3. Check that GitHub token has correct permissions

### Submission form errors

**Cause**: Validation failing
**Fix**:
- Ensure bio is at least 50 characters
- Ensure at least one project is added
- Check all required fields are filled

---

## Architecture Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Student       │     │    Vercel        │     │   Supabase      │
│   Submit Form   │────▶│  API Routes      │────▶│   Database      │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                │
                                │ On Approve
                                ▼
                        ┌──────────────────┐
                        │  GitHub Action   │
                        │  Creates PR      │
                        └──────────────────┘
                                │
                                │ On Merge
                                ▼
                        ┌──────────────────┐
                        │  Vercel Rebuild  │
                        │  Student Live!   │
                        └──────────────────┘
```

---

## Switching to Express.js (Future)

The system is designed to be extensible. To switch from Supabase to Express:

1. Create a new implementation of `ISubmissionRepository` in `lib/db/express/repository.ts`
2. Update `lib/db/index.ts` to use the new provider
3. Set `DB_PROVIDER=express` in environment variables

---

## Support

For issues or questions:
- Create an issue on the [GitHub repository](https://github.com/diabeatz96/student-showcase/issues)
- Contact: adam.kostandy@csi.cuny.edu

---

*Last updated: December 2024*
