import fs from 'fs';
import path from 'path';
import { StudentSchema, type Student, type Project } from './validation';

const studentsDirectory = path.join(process.cwd(), 'data/students');

/**
 * Get all students from JSON files
 */
export async function getAllStudents(): Promise<Student[]> {
  try {
    const fileNames = fs.readdirSync(studentsDirectory);
    const students = fileNames
      .filter(fileName => fileName.endsWith('.json'))
      .map(fileName => {
        const filePath = path.join(studentsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const studentData = JSON.parse(fileContents);

        // Validate with Zod
        const result = StudentSchema.safeParse(studentData);
        if (!result.success) {
          console.error(`Validation failed for ${fileName}:`, result.error);
          return null;
        }

        return result.data;
      })
      .filter((student): student is Student => student !== null);

    return students;
  } catch (error) {
    console.error('Error reading students directory:', error);
    return [];
  }
}

/**
 * Get a single student by ID
 */
export async function getStudentById(id: string): Promise<Student | null> {
  const filePath = path.join(studentsDirectory, `${id}.json`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const studentData = JSON.parse(fileContents);
    const result = StudentSchema.safeParse(studentData);

    return result.success ? result.data : null;
  } catch (error) {
    console.error(`Error reading student ${id}:`, error);
    return null;
  }
}

/**
 * Get all projects for a specific student
 */
export async function getProjectsByStudent(studentId: string): Promise<Project[]> {
  const student = await getStudentById(studentId);
  if (!student) return [];

  return student.semesters.flatMap(semester => semester.projects);
}

/**
 * Get all featured projects across all students
 * Only returns interactive (embeddable) projects with live demos
 */
export async function getFeaturedProjects(): Promise<(Project & { studentId: string; studentName: string })[]> {
  const students = await getAllStudents();
  return students
    .flatMap(student =>
      student.semesters.flatMap(semester =>
        semester.projects
          .filter(project =>
            project.featured &&
            project.canEmbed &&
            project.demoUrl
          )
          .map(project => ({
            ...project,
            studentId: student.id,
            studentName: `${student.firstName} ${student.lastName}`,
          }))
      )
    )
    .slice(0, 10); // Cap at 10 featured projects
}

/**
 * Get students with featured projects
 */
export async function getFeaturedStudents(): Promise<Student[]> {
  const students = await getAllStudents();
  return students.filter(student =>
    student.semesters.some(semester =>
      semester.projects.some(project => project.featured)
    )
  ).slice(0, 3); // Return top 3 featured students
}

/**
 * Search students by name or skills
 */
export async function searchStudents(query: string): Promise<Student[]> {
  const students = await getAllStudents();
  const lowerQuery = query.toLowerCase();

  return students.filter(student => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const skillsMatch = student.skills.some(skill =>
      skill.toLowerCase().includes(lowerQuery)
    );

    return fullName.includes(lowerQuery) || skillsMatch;
  });
}

/**
 * Get unique skills across all students
 */
export async function getAllSkills(): Promise<string[]> {
  const students = await getAllStudents();
  const skillsSet = new Set<string>();

  students.forEach(student => {
    student.skills.forEach(skill => skillsSet.add(skill));
  });

  return Array.from(skillsSet).sort();
}

/**
 * Get unique semesters across all students
 */
export async function getAllSemesters(): Promise<string[]> {
  const students = await getAllStudents();
  const semestersSet = new Set<string>();

  students.forEach(student => {
    student.semesters.forEach(semester => semestersSet.add(semester.name));
  });

  return Array.from(semestersSet).sort();
}
