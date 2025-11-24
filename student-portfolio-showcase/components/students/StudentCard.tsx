'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { animate } from 'animejs';
import type { Student } from '@/lib/validation';

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const featuredProjectsCount = student.semesters
    .flatMap(s => s.projects)
    .filter(p => p.featured).length;

  const displaySkills = student.skills.slice(0, 3);
  const remainingSkills = student.skills.length - 3;

  useEffect(() => {
    if (!isHovered || !skillsRef.current) return;

    const skills = skillsRef.current.querySelectorAll('.skill-tag');
    animate(Array.from(skills), {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      duration: 400,
      delay: (el, i) => i * 50,
      ease: 'out-elastic(1, 0.5)',
    });
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    setIsHovered(false);
  };

  return (
    <Link href={`/students/${student.id}`} className="block student-card">
      <article
        ref={cardRef}
        className="card group h-full transition-all duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container */}
        <div className="relative h-64 bg-gradient-to-br from-primary-100 to-primary-50 overflow-hidden">
          {!imageError ? (
            <Image
              src={`/${student.photo}`}
              alt={`${student.firstName} ${student.lastName}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl font-bold text-primary-300">
                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
              </div>
            </div>
          )}

          {/* Overlay Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Featured Badge */}
          {featuredProjectsCount > 0 && (
            <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg transform transition-transform group-hover:scale-110">
              {featuredProjectsCount} Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
            {student.firstName} {student.lastName}
          </h3>

          {student.major && (
            <p className="text-sm text-gray-600 mb-3">{student.major}</p>
          )}

          <p className="text-gray-700 mb-4 line-clamp-3">{student.bio}</p>

          {/* Skills */}
          <div ref={skillsRef} className="flex flex-wrap gap-2 mb-4">
            {displaySkills.map((skill) => (
              <span
                key={skill}
                className="skill-tag px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full transition-all duration-200 hover:bg-primary-100"
              >
                {skill}
              </span>
            ))}
            {remainingSkills > 0 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                +{remainingSkills} more
              </span>
            )}
          </div>

          {/* View Profile Link */}
          <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
            <span>View Profile</span>
            <svg
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2 duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
