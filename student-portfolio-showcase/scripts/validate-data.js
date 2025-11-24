const fs = require('fs');
const path = require('path');

const studentsDir = path.join(__dirname, '../data/students');

console.log('\n🔍 Validating student data files...\n');

let errorCount = 0;
const errors = [];
let totalProjects = 0;

try {
  const files = fs.readdirSync(studentsDir).filter(f => f.endsWith('.json'));

  if (files.length === 0) {
    console.error('❌ No student JSON files found in data/students/');
    process.exit(1);
  }

  console.log(`Found ${files.length} student file(s) to validate\n`);

  files.forEach(file => {
    try {
      const filePath = path.join(studentsDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Basic validation checks
      if (!data.id || typeof data.id !== 'string') {
        throw new Error('Missing or invalid "id" field');
      }

      if (!data.id.match(/^[a-z0-9-]+$/)) {
        throw new Error('ID must be lowercase with hyphens only');
      }

      if (!data.firstName || typeof data.firstName !== 'string') {
        throw new Error('Missing or invalid "firstName" field');
      }

      if (!data.lastName || typeof data.lastName !== 'string') {
        throw new Error('Missing or invalid "lastName" field');
      }

      if (!data.email || !data.email.includes('@')) {
        throw new Error('Missing or invalid "email" field');
      }

      if (!data.photo || typeof data.photo !== 'string') {
        throw new Error('Missing or invalid "photo" field');
      }

      if (!data.bio || data.bio.length < 50 || data.bio.length > 500) {
        throw new Error('Bio must be between 50 and 500 characters');
      }

      if (!Array.isArray(data.skills) || data.skills.length === 0) {
        throw new Error('Must have at least one skill');
      }

      if (!Array.isArray(data.semesters) || data.semesters.length === 0) {
        throw new Error('Student must have at least one semester');
      }

      // Validate semesters and projects
      data.semesters.forEach((semester, idx) => {
        if (!semester.name) {
          throw new Error(`Semester ${idx + 1} missing name`);
        }

        if (!semester.startDate) {
          throw new Error(`Semester ${idx + 1} missing startDate`);
        }

        if (!Array.isArray(semester.projects)) {
          throw new Error(`Semester ${idx + 1} projects must be an array`);
        }

        if (semester.projects.length === 0 || semester.projects.length > 6) {
          throw new Error(`Semester ${idx + 1} must have 1-6 projects (has ${semester.projects.length})`);
        }

        // Validate each project
        semester.projects.forEach((project, pIdx) => {
          if (!project.id || !project.id.match(/^[a-z0-9-]+$/)) {
            throw new Error(`Semester ${idx + 1}, Project ${pIdx + 1}: Invalid project ID`);
          }

          if (!project.title || project.title.length < 3 || project.title.length > 100) {
            throw new Error(`Semester ${idx + 1}, Project ${pIdx + 1}: Title must be 3-100 characters`);
          }

          if (!project.description || project.description.length < 50 || project.description.length > 500) {
            throw new Error(`Semester ${idx + 1}, Project ${pIdx + 1}: Description must be 50-500 characters`);
          }

          if (!Array.isArray(project.technologies) || project.technologies.length === 0) {
            throw new Error(`Semester ${idx + 1}, Project ${pIdx + 1}: Must have at least one technology`);
          }

          if (!project.screenshot) {
            throw new Error(`Semester ${idx + 1}, Project ${pIdx + 1}: Missing screenshot field`);
          }

          if (!project.semester) {
            throw new Error(`Semester ${idx + 1}, Project ${pIdx + 1}: Missing semester field`);
          }

          totalProjects++;
        });
      });

      console.log(`✅ ${file} - ${data.firstName} ${data.lastName} (${data.semesters.reduce((sum, s) => sum + s.projects.length, 0)} projects)`);

    } catch (err) {
      errorCount++;
      errors.push({ file, error: err.message });
      console.log(`❌ ${file} - ${err.message}`);
    }
  });

  console.log(`\n${'='.repeat(60)}`);

  if (errorCount > 0) {
    console.log(`\n❌ Validation failed with ${errorCount} error(s)\n`);
    errors.forEach(({ file, error }) => {
      console.log(`  ${file}: ${error}`);
    });
    console.log('');
    process.exit(1);
  } else {
    console.log(`\n✅ All ${files.length} file(s) validated successfully!`);
    console.log(`   Total projects: ${totalProjects}`);
    console.log('');
    process.exit(0);
  }

} catch (err) {
  console.error('\n❌ Error reading students directory:', err.message);
  console.log('');
  process.exit(1);
}
