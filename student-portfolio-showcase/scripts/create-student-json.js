#!/usr/bin/env node

/**
 * Script to create a student JSON file from submission data
 * Used by GitHub Actions workflow
 */

const fs = require('fs');
const path = require('path');

function main() {
  const submissionDataJson = process.argv[2];

  if (!submissionDataJson) {
    console.error('No submission data provided');
    process.exit(1);
  }

  let submission;
  try {
    submission = JSON.parse(submissionDataJson);
  } catch (error) {
    console.error('Failed to parse submission data:', error);
    process.exit(1);
  }

  // Generate student ID from name
  const studentId = `${submission.firstName}-${submission.lastName}`
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-');

  // Create student data structure matching the schema
  const studentData = {
    id: studentId,
    firstName: submission.firstName,
    lastName: submission.lastName,
    email: submission.email,
    photo: submission.photoUrl || `images/students/${studentId}.jpg`,
    bio: submission.bio,
    personalStatement: submission.personalStatement || undefined,
    contact: {
      website: submission.website || undefined,
      github: submission.github || undefined,
      linkedin: submission.linkedin || undefined,
      twitter: submission.twitter || undefined,
    },
    skills: submission.skills,
    careerGoals: submission.careerGoals || undefined,
    major: submission.major || undefined,
    graduationYear: submission.graduationYear || undefined,
    semesters: groupProjectsBySemester(submission.projects, studentId),
  };

  // Remove undefined values
  cleanObject(studentData);

  // Write to data/students directory
  const outputPath = path.join(
    process.cwd(),
    'data',
    'students',
    `${studentId}.json`
  );

  // Ensure directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // Write JSON file
  fs.writeFileSync(outputPath, JSON.stringify(studentData, null, 2));

  console.log(`Created student file: ${outputPath}`);

  // Handle image files if they exist as base64
  handleImages(submission, studentId);
}

function groupProjectsBySemester(projects, studentId) {
  const semesterMap = {};

  projects.forEach((project, index) => {
    const semester = project.semester || 'Fall 2024';

    if (!semesterMap[semester]) {
      semesterMap[semester] = {
        name: semester,
        startDate: getSemesterStartDate(semester),
        projects: [],
      };
    }

    const projectId = `${studentId}-project-${index + 1}`;

    semesterMap[semester].projects.push({
      id: projectId,
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      demoUrl: project.demoUrl || undefined,
      repoUrl: project.repoUrl || undefined,
      screenshot:
        project.screenshotUrl || `images/projects/${projectId}.jpg`,
      semester: semester,
      completedDate: project.completedDate || undefined,
      featured: project.featured || false,
      canEmbed: project.canEmbed !== false,
    });
  });

  return Object.values(semesterMap);
}

function getSemesterStartDate(semester) {
  const [season, year] = semester.split(' ');
  const yearNum = parseInt(year, 10);

  switch (season.toLowerCase()) {
    case 'spring':
      return `${yearNum}-01-15T00:00:00Z`;
    case 'summer':
      return `${yearNum}-05-15T00:00:00Z`;
    case 'fall':
      return `${yearNum}-08-25T00:00:00Z`;
    case 'winter':
      return `${yearNum}-01-01T00:00:00Z`;
    default:
      return `${yearNum}-01-01T00:00:00Z`;
  }
}

function cleanObject(obj) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
      delete obj[key];
    } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      cleanObject(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  });
}

function handleImages(submission, studentId) {
  // Handle student photo
  if (submission.photoData && submission.photoData.startsWith('data:image')) {
    saveBase64Image(
      submission.photoData,
      path.join('public', 'images', 'students', `${studentId}.jpg`)
    );
  }

  // Handle project screenshots
  if (submission.projects) {
    submission.projects.forEach((project, index) => {
      if (
        project.screenshotData &&
        project.screenshotData.startsWith('data:image')
      ) {
        const projectId = `${studentId}-project-${index + 1}`;
        saveBase64Image(
          project.screenshotData,
          path.join('public', 'images', 'projects', `${projectId}.jpg`)
        );
      }
    });
  }
}

function saveBase64Image(base64Data, outputPath) {
  try {
    // Extract the base64 content
    const matches = base64Data.match(/^data:image\/\w+;base64,(.+)$/);
    if (!matches) {
      console.warn('Invalid base64 image data');
      return;
    }

    const buffer = Buffer.from(matches[1], 'base64');

    // Ensure directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // Write file
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved image: ${outputPath}`);
  } catch (error) {
    console.error(`Failed to save image ${outputPath}:`, error);
  }
}

main();
