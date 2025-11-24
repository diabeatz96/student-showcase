'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { animate } from 'animejs';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animate(containerRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      ease: 'out-cubic',
    });
  }, []);

  return (
    <div ref={containerRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
