import Image from 'next/image';
import Link from 'next/link';
import type { Student } from '@/lib/validation';
import ProjectCard from '@/components/projects/ProjectCard';

interface StudentListItemProps {
  student: Student;
}

export default function StudentListItem({ student }: StudentListItemProps) {
  const allProjects = student.semesters.flatMap(semester => semester.projects);

  return (
    <article className="mb-16 pb-16 border-b border-gray-200 last:border-b-0">
      {/* Student Header */}
      <div className="flex items-start gap-6 mb-8">
        <Link href={`/students/${student.id}`} className="flex-shrink-0 group">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50 ring-2 ring-gray-200 group-hover:ring-primary-400 transition-all">
            <Image
              src={`/${student.photo}`}
              alt={`${student.firstName} ${student.lastName}`}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        </Link>

        <div className="flex-1">
          <Link
            href={`/students/${student.id}`}
            className="inline-block group"
          >
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {student.firstName} {student.lastName}
            </h2>
          </Link>

          {student.major && (
            <p className="text-sm text-gray-600 mt-1">{student.major} • Class of {student.graduationYear}</p>
          )}

          <p className="text-gray-700 mt-3">{student.bio}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {student.skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
            {student.skills.length > 6 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                +{student.skills.length - 6} more
              </span>
            )}
          </div>

          {/* Contact Links */}
          {student.contact && (
            <div className="flex gap-4 mt-4">
              {student.contact.github && (
                <a
                  href={student.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                  aria-label="GitHub profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {student.contact.linkedin && (
                <a
                  href={student.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {student.contact.website && (
                <a
                  href={student.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                  aria-label="Visit website"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects ({allProjects.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </article>
  );
}
