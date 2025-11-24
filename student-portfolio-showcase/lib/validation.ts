import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'ID must be lowercase with hyphens'),
  title: z.string().min(3).max(100),
  description: z.string().min(50).max(500),
  technologies: z.array(z.string()).min(1),
  demoUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  screenshot: z.string().regex(/^images\/projects\/.*\.(jpg|jpeg|png|webp)$/),
  semester: z.string(),
  completedDate: z.string().datetime().optional(),
  featured: z.boolean().default(false),
  canEmbed: z.boolean().default(true),
});

export const SemesterSchema = z.object({
  name: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  projects: z.array(ProjectSchema).min(1).max(6),
});

export const StudentSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  photo: z.string().regex(/^images\/students\/.*\.(jpg|jpeg|png|webp)$/),
  bio: z.string().min(50).max(500),
  personalStatement: z.string().max(1000).optional(),
  contact: z.object({
    website: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
  }).optional(),
  skills: z.array(z.string()).min(1),
  careerGoals: z.string().max(300).optional(),
  major: z.string().optional(),
  graduationYear: z.number().optional(),
  semesters: z.array(SemesterSchema).min(1),
});

export type Student = z.infer<typeof StudentSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Semester = z.infer<typeof SemesterSchema>;
