'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import { animate } from 'animejs';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  screenshot: string;
  demoUrl?: string;
  repoUrl?: string;
  canEmbed?: boolean;
}

interface FeaturedProject extends Project {
  studentId: string;
  studentName: string;
}

interface FeaturedProjectCarouselProps {
  projects: FeaturedProject[];
}

export default function FeaturedProjectCarousel({ projects }: FeaturedProjectCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    // Animate title entrance
    animate(titleRef.current, {
      opacity: [0, 1],
      translateY: [-30, 0],
      duration: 800,
      ease: 'out-cubic',
    });

    // Animate container entrance
    animate(containerRef.current, {
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1000,
      delay: 200,
      ease: 'out-cubic',
    });
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  if (projects.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-accent-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12"
          style={{ opacity: 0 }}
        >
          Featured Student Projects
        </h2>

        <div ref={containerRef} style={{ opacity: 0 }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            onSwiper={setSwiper}
            onSlideChange={handleSlideChange}
            className="featured-carousel"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project.id} className="!w-[90%] md:!w-[70%] lg:!w-[60%]">
                <ProjectBrowserPreview
                  project={project}
                  isActive={index === activeIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Project Info */}
          <div className="mt-8 text-center max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {projects[activeIndex]?.title}
              </h3>
              <Link
                href={`/students/${projects[activeIndex]?.studentId}`}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors inline-block mb-3"
              >
                by {projects[activeIndex]?.studentName}
              </Link>
              <p className="text-gray-700 mb-4">{projects[activeIndex]?.description}</p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {projects[activeIndex]?.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 justify-center">
                {projects[activeIndex]?.demoUrl && (
                  <a
                    href={projects[activeIndex].demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-md"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live Site
                  </a>
                )}
                {projects[activeIndex]?.repoUrl && (
                  <a
                    href={projects[activeIndex].repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium shadow-md"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectBrowserPreview({
  project,
  isActive,
}: {
  project: FeaturedProject;
  isActive: boolean;
}) {
  const browserRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const hasLoadedRef = useRef(true);

  useEffect(() => {
    if (!browserRef.current || !isActive) return;

    animate(browserRef.current, {
      scale: [0.95, 1],
      duration: 400,
      ease: 'out-cubic',
    });
  }, [isActive]);

  // Reset loading state when project changes
  useEffect(() => {
    if (project.canEmbed && project.demoUrl) {
      // If this iframe has already loaded once, don't show loading state
      if (hasLoadedRef.current && isActive) {
        setIframeLoading(false);
      } else if (isActive) {
        // Set a safety timeout for first load (10 seconds)
        const timeout = setTimeout(() => {
          if (iframeLoading) {
            console.log('Safety timeout - assuming iframe loaded');
            hasLoadedRef.current = true;
            setIframeLoading(false);
          }
        }, 10000);

        return () => clearTimeout(timeout);
      }
    }
  }, [isActive, project.id, project.canEmbed, project.demoUrl, iframeLoading]);

  const shouldShowIframe = project.canEmbed && project.demoUrl && !iframeError;
  const shouldShowScreenshot = !shouldShowIframe || iframeError;

  return (
    <div
      ref={browserRef}
      className="bg-white rounded-lg shadow-2xl overflow-hidden transition-transform duration-300 hover:shadow-3xl"
    >
      {/* Browser Chrome */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-300 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-600 font-mono truncate border border-gray-300 flex items-center gap-2">
            <svg
              className="w-3 h-3 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="truncate">{project.demoUrl || 'localhost:3000'}</span>
          </div>
        </div>
        {project.demoUrl && (
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
        )}
      </div>

      {/* Browser Content */}
      <div className="relative bg-white" style={{ height: '600px' }}>
        {shouldShowIframe ? (
          <>
            {iframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mb-4"></div>
                  <p className="text-gray-600 text-lg font-medium mb-2">Loading interactive preview...</p>
                  <p className="text-gray-500 text-sm">Please wait while the site loads</p>
                </div>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={project.demoUrl}
              title={project.title}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
              referrerPolicy="no-referrer"
              onError={() => {
                console.error('Failed to load iframe - X-Frame-Options likely blocking');
                setIframeError(true);
                setIframeLoading(false);
              }}
              onLoad={() => {
                console.log('Iframe loaded successfully');
                hasLoadedRef.current = true;
                setIframeLoading(false);
              }}
              style={{ display: iframeLoading ? 'none' : 'block' }}
            />

            {/* Interactive Label */}
            {!iframeLoading && (
              <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 pointer-events-none z-20 animate-pulse">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                LIVE - Click to Interact
              </div>
            )}
          </>
        ) : (
          <div className="relative h-full bg-gray-100 overflow-hidden group">
            {!imageError ? (
              <Image
                src={`/${project.screenshot}`}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 60vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
                <div className="text-center p-8 max-w-md">
                  <svg
                    className="mx-auto h-20 w-20 text-primary-400 mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                  <p className="text-gray-800 font-bold text-xl mb-3">{project.title}</p>
                  <p className="text-gray-600 mb-6">Interactive preview unavailable - site blocks embedding</p>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open Live Demo
                  </a>
                </div>
              </div>
            )}

            {/* Overlay with Links */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-primary-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                >
                  View Live
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                >
                  View Code
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
