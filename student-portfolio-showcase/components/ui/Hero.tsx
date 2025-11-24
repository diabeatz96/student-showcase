'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [particlePositions, setParticlePositions] = useState<{ left: number; top: number }[]>([]);

  useEffect(() => {
    // Generate random positions on client side only
    setParticlePositions(
      Array.from({ length: 15 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
      }))
    );
  }, []);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    // Animate title with character reveal
    const titleText = titleRef.current.textContent || '';
    titleRef.current.innerHTML = titleText
      .split('')
      .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const chars = titleRef.current.querySelectorAll('span');

    animate(Array.from(chars), {
      opacity: [0, 1],
      translateY: [-20, 0],
      rotate: [10, 0],
      duration: 800,
      delay: stagger(30),
      ease: 'out-elastic(1, 0.6)',
    });

    // Animate subtitle
    animate(subtitleRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: 400,
      ease: 'out-cubic',
    });

    // Create floating particles
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll('.particle');
      animate(Array.from(particles), {
        translateY: [0, -20, 0],
        translateX: (el, i) => [0, (i % 2 === 0 ? 10 : -10), 0],
        opacity: [0.3, 0.6, 0.3],
        duration: 3000,
        delay: stagger(200),
        loop: true,
        ease: 'in-out-sine',
      });
    }
  }, [particlePositions]);

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-100 py-20 border-b border-gray-200 overflow-hidden">
      {/* Floating Particles Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-primary-300 rounded-full opacity-30"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-4"
        >
          CSI Student Showcase
        </h1>

        <p
          ref={subtitleRef}
          className="text-center text-lg md:text-xl text-gray-600 opacity-0 max-w-2xl mx-auto"
        >
          Discover innovative web development projects from Computer Science students
        </p>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
