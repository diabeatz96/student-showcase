'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/validation';

interface ProjectSlideProps {
  project: Project;
}

export default function ProjectSlide({ project }: ProjectSlideProps) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const shouldShowIframe = project.canEmbed && project.demoUrl && !iframeError;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Preview */}
        <div className="order-2 lg:order-1">
          {shouldShowIframe ? (
            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200">
              {/* Browser Chrome */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-300 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-600 font-mono truncate border border-gray-300">
                    {project.demoUrl}
                  </div>
                </div>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                  title="Open in new tab"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Interactive Iframe */}
              <div className="relative bg-white" style={{ height: '500px' }}>
                {iframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                      <p className="text-gray-600">Loading interactive preview...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src={project.demoUrl}
                  title={project.title}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-downloads"
                  loading="lazy"
                  className="w-full h-full border-0"
                  onError={() => {
                    setIframeError(true);
                    setIframeLoading(false);
                  }}
                  onLoad={() => setIframeLoading(false)}
                  style={{ display: iframeLoading ? 'none' : 'block' }}
                />
              </div>

              {/* Interactive Label */}
              <div className="absolute top-16 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 pointer-events-none">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Interactive
              </div>
            </div>
          ) : (
            <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ paddingBottom: '75%' }}>
              {!imageError ? (
                <Image
                  src={`/${project.screenshot}`}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center p-6">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-600 font-medium">{project.title}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="order-1 lg:order-2 flex flex-col">
          {/* Featured Badge */}
          {project.featured && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-accent-500 text-white">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured Project
              </span>
            </div>
          )}

          <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>

          <p className="text-gray-700 mb-4 flex-grow">{project.description}</p>

          {/* Technologies */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="text-sm text-gray-600 mb-4">
            <p><span className="font-semibold">Semester:</span> {project.semester}</p>
            {project.completedDate && (
              <p>
                <span className="font-semibold">Completed:</span>{' '}
                {new Date(project.completedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors font-medium"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
