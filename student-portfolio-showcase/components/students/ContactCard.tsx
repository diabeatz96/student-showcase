'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Student } from '@/lib/validation';

interface ContactCardProps {
  student: Student;
}

export default function ContactCard({ student }: ContactCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 p-6 mb-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50">
            {!imageError ? (
              <Image
                src={`/${student.photo}`}
                alt={`${student.firstName} ${student.lastName}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 128px"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-4xl font-bold text-primary-300">
                  {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Middle - Name and Contact Info */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            {/* Name and Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {student.firstName} {student.lastName}
              </h3>
              {student.major && (
                <p className="text-sm text-gray-600 mb-2">{student.major}</p>
              )}
              {student.graduationYear && (
                <p className="text-sm text-gray-600 mb-3">
                  Class of {student.graduationYear}
                </p>
              )}
            </div>

            {/* Contact Information */}
            <div className="flex flex-col gap-2">
              {/* Email */}
              <a
                href={`mailto:${student.email}`}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm">{student.email}</span>
              </a>

              {/* LinkedIn */}
              {student.contact?.linkedin && (
                <a
                  href={student.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}

              {/* GitHub */}
              {student.contact?.github && (
                <a
                  href={student.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-sm">GitHub</span>
                </a>
              )}

              {/* Website */}
              {student.contact?.website && (
                <a
                  href={student.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span className="text-sm">Website</span>
                </a>
              )}
            </div>
          </div>

          {/* Bio */}
          {student.bio && (
            <p className="text-gray-700 mt-4 text-sm leading-relaxed">
              {student.bio}
            </p>
          )}

          {/* Skills at the bottom */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-full border border-primary-200 transition-all duration-200 hover:bg-primary-100 hover:border-primary-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

