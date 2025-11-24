'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

interface TimelineEvent {
  year: string;
  title: string;
  organization: string;
  description: string;
  color: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    // Animate timeline line
    animate(lineRef.current, {
      scaleX: [0, 1],
      duration: 1500,
      ease: 'out-cubic',
    });

    // Animate cards with 3D effects
    const validCards = cardsRef.current.filter(Boolean);
    if (validCards.length > 0) {
      animate(validCards, {
        opacity: [0, 1],
        translateY: [60, 0],
        rotateX: [45, 0],
        scale: [0.8, 1],
        duration: 900,
        delay: stagger(80, { start: 400 }),
        ease: 'out-elastic(1, 0.6)',
      });
    }

    // Animate dots
    const dots = containerRef.current.querySelectorAll('.timeline-dot');
    animate(Array.from(dots), {
      scale: [0, 1],
      rotate: [180, 0],
      duration: 600,
      delay: stagger(80, { start: 600 }),
      ease: 'out-back(1.7)',
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient Overlays for scroll indication */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div
        ref={containerRef}
        className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary-400 scrollbar-track-gray-100"
        style={{ perspective: '1500px' }}
      >
        <div className="inline-flex gap-6 px-8 min-w-full">
          {events.map((event, index) => (
            <div
              key={index}
              className="relative"
              style={{ transformStyle: 'preserve-3d', minWidth: '320px', maxWidth: '320px' }}
            >
              {/* Timeline Dot */}
              <div className="flex justify-center mb-4">
                <div className="timeline-dot relative">
                  <div className="absolute inset-0 w-4 h-4 bg-primary-400 rounded-full animate-ping opacity-30"></div>
                  <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-lg ${event.color}`}></div>
                </div>
              </div>

              {/* Connecting Line */}
              {index < events.length - 1 && (
                <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 opacity-40"></div>
              )}

              {/* Card */}
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 border border-gray-100 hover:border-primary-300 opacity-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-5 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Year Badge */}
                  <div className="inline-block mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${event.color} shadow-md`}>
                      {event.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors leading-tight">
                    {event.title}
                  </h3>

                  {/* Organization */}
                  <p className="text-sm text-primary-600 font-semibold mb-2">
                    {event.organization}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute bottom-3 right-3 w-6 h-6 border-2 border-primary-300 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal Timeline Line */}
        <div
          ref={lineRef}
          className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-300 via-primary-500 to-primary-300 mx-8"
          style={{ transformOrigin: 'left', scaleX: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 blur-sm opacity-50"></div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <svg className="w-4 h-4 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Scroll to explore the journey
          <svg className="w-4 h-4 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </p>
      </div>
    </div>
  );
}
