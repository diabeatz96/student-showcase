'use client';

import { useState, useMemo } from 'react';
import StudentCard from './StudentCard';
import AnimatedGrid from '@/components/animations/AnimatedGrid';
import type { Student } from '@/lib/validation';

interface StudentGridProps {
  students: Student[];
  searchQuery?: string;
}

export default function StudentGrid({ students, searchQuery = '' }: StudentGridProps) {
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');

  // Get unique skills and semesters
  const { allSkills, allSemesters } = useMemo(() => {
    const skillsSet = new Set<string>();
    const semestersSet = new Set<string>();

    students.forEach(student => {
      student.skills.forEach(skill => skillsSet.add(skill));
      student.semesters.forEach(semester => semestersSet.add(semester.name));
    });

    return {
      allSkills: Array.from(skillsSet).sort(),
      allSemesters: Array.from(semestersSet).sort(),
    };
  }, [students]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
        const hasNameMatch = fullName.includes(query);
        const hasSkillMatch = student.skills.some(skill =>
          skill.toLowerCase().includes(query)
        );

        if (!hasNameMatch && !hasSkillMatch) return false;
      }

      // Skill filter
      if (selectedSkill && !student.skills.includes(selectedSkill)) {
        return false;
      }

      // Semester filter
      if (selectedSemester && !student.semesters.some(s => s.name === selectedSemester)) {
        return false;
      }

      return true;
    });
  }, [students, searchQuery, selectedSkill, selectedSemester]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        {/* Skill Filter */}
        <div className="flex-1">
          <label htmlFor="skill-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Skill
          </label>
          <select
            id="skill-filter"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Skills</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Filter */}
        <div className="flex-1">
          <label htmlFor="semester-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Semester
          </label>
          <select
            id="semester-filter"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Semesters</option>
            {allSemesters.map(semester => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        Showing {filteredStudents.length} of {students.length} students
      </div>

      {/* Grid */}
      {filteredStudents.length > 0 ? (
        <AnimatedGrid columns={3}>
          {filteredStudents.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </AnimatedGrid>
      ) : (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No students found</h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
