import Image from 'next/image';
import type { Project } from '@/lib/validation';

interface ProjectCardProps {
  project: Project;
  studentName?: string;
}

export default function ProjectCard({ project, studentName }: ProjectCardProps) {
  return (
    <article className="card project-card h-full flex flex-col">
      {/* Project Screenshot */}
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-50 overflow-hidden">
        <Image
          src={`/${project.screenshot}`}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {project.title}
        </h3>

        {studentName && (
          <p className="text-sm text-gray-600 mb-2">by {studentName}</p>
        )}

        <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map(tech => (
            <span
              key={tech}
              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-2 border-2 border-primary-600 text-primary-600 text-sm rounded-lg hover:bg-primary-600 hover:text-white transition-colors font-medium"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
