import Image from 'next/image';
import type { Student } from '@/lib/validation';
import ProjectCarousel from '@/components/projects/ProjectCarousel';

interface StudentProfileProps {
  student: Student;
}

export default function StudentProfile({ student }: StudentProfileProps) {
  const allProjects = student.semesters.flatMap(semester => semester.projects);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card sticky top-24">
            <div className="p-6">
              {/* Profile Photo */}
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50">
                <Image
                  src={`/${student.photo}`}
                  alt={`${student.firstName} ${student.lastName}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 192px"
                  priority
                />
              </div>

              {/* Name and Major */}
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                {student.firstName} {student.lastName}
              </h1>

              {student.major && (
                <p className="text-gray-600 text-center mb-2">{student.major}</p>
              )}

              {student.graduationYear && (
                <p className="text-sm text-gray-500 text-center mb-6">
                  Class of {student.graduationYear}
                </p>
              )}

              {/* Contact Links */}
              {student.contact && (
                <div className="flex justify-center gap-4 mb-6 flex-wrap">
                  {student.contact.website && (
                    <a
                      href={student.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      aria-label="Visit website"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {student.contact.github && (
                    <a
                      href={student.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      aria-label="Visit GitHub profile"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                      aria-label="Visit LinkedIn profile"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {student.contact.twitter && (
                    <a
                      href={student.contact.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      aria-label="Visit Twitter profile"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}

              {/* Email */}
              <a
                href={`mailto:${student.email}`}
                className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mb-6"
              >
                Contact
              </a>

              {/* Skills */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Bio */}
          <section className="card mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 mb-4">{student.bio}</p>

              {student.personalStatement && (
                <p className="text-gray-700 italic border-l-4 border-primary-500 pl-4">
                  {student.personalStatement}
                </p>
              )}
            </div>
          </section>

          {/* Career Goals */}
          {student.careerGoals && (
            <section className="card mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Career Goals</h2>
                <p className="text-gray-700">{student.careerGoals}</p>
              </div>
            </section>
          )}

          {/* Projects Carousel */}
          {allProjects.length > 0 && (
            <ProjectCarousel projects={allProjects} />
          )}
        </div>
      </div>
    </div>
  );
}
