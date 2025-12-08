'use client';

import { useState, useEffect } from 'react';
import ContactCard from '@/components/students/ContactCard';
import type { Student } from '@/lib/validation';

export default function ContactPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch students and skills
  useEffect(() => {
    async function fetchData() {
      try {
        const studentsResponse = await fetch('/api/students');
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);
        setFilteredStudents(studentsData);

        const skillsResponse = await fetch('/api/skills');
        const skillsData = await skillsResponse.json();
        setAllSkills(skillsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter students based on search and selected skills
  useEffect(() => {
    let result = students;

    // Filter by search query (name)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((student) => {
        const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
        return fullName.includes(query);
      });
    }

    // Filter by selected skills (student must have ALL selected skills)
    if (selectedSkills.length > 0) {
      result = result.filter((student) => {
        return selectedSkills.every((selectedSkill) =>
          student.skills.some(
            (skill) => skill.toLowerCase() === selectedSkill.toLowerCase()
          )
        );
      });
    }

    setFilteredStudents(result);
  }, [searchQuery, selectedSkills, students]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSkills([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Students
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with talented Computer Science students. Search by name or filter by skills to find the perfect candidate.
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
              Search by Name
            </label>
            <input
              type="text"
              id="search"
              placeholder="Enter student name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Skills Filter */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                Filter by Skills
              </label>
              {selectedSkills.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-lg">
              {allSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedSkills.includes(skill)
                      ? 'bg-primary-600 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {skill}
                  {selectedSkills.includes(skill) && (
                    <span className="ml-2 font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {(searchQuery || selectedSkills.length > 0) && (
            <div className="mt-4 p-3 bg-primary-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Active Filters:</span>{' '}
                {searchQuery && <span>Name: "{searchQuery}"</span>}
                {searchQuery && selectedSkills.length > 0 && <span>, </span>}
                {selectedSkills.length > 0 && (
                  <span>Skills: {selectedSkills.join(', ')}</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium">
            {isLoading ? (
              'Loading students...'
            ) : (
              <>
                Showing {filteredStudents.length} of {students.length} student
                {students.length !== 1 ? 's' : ''}
              </>
            )}
          </p>
        </div>

        {/* Students List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading students...</p>
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <ContactCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 text-lg">No students found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

