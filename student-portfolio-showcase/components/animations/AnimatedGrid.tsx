'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

interface AnimatedGridProps {
  children: React.ReactNode;
  columns?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedGrid({
  children,
  columns = 3,
  delay = 100,
  className = '',
}: AnimatedGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!gridRef.current || hasAnimated.current) return;

    const cards = gridRef.current.querySelectorAll('.student-card, .project-card');

    if (cards.length === 0) return;

    hasAnimated.current = true;

    animate(Array.from(cards), {
      scale: [0, 1],
      opacity: [0, 1],
      translateY: [100, 0],
      delay: stagger(delay, {
        grid: [columns, Math.ceil(cards.length / columns)],
        from: 'center',
      }),
      duration: 800,
      ease: 'out-elastic(1, 0.6)',
    });
  }, [columns, delay]);

  return (
    <div
      ref={gridRef}
      className={`grid gap-6 ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}
