// ScrollIntoView.tsx
import { motion as m, useInView } from "framer-motion";
import { useState, useEffect, useRef} from "react";

type BaseDirection = "up" | "down" | "left" | "right";
type Direction = BaseDirection | "autoY";

type ScrollIntoViewProps = {
  children: React.ReactNode;        // anything: h1, div, form, etc...!
  className?: string; // optional styling
  direction?: Direction; // default "up"
};

export function ScrollIntoView({
  children,
  className = "",
  direction = "autoY", // default, was up, needs to adapt based on scroll
}: ScrollIntoViewProps) {
  const ref = useRef<HTMLElement | null>(null); // useRef is for DOM access
  const scrollDirection = useScrollDirection(); // custom hook to get scroll direction
  const inView = useInView(ref, { amount: scrollDirection === "up" ? 0.1 : 0.1 }); // re-triggers when in/out of view, use in view is for checking visibility

  // starting offset based on direction
  const offsets: Record<BaseDirection, { x?: number; y?: number }> = { //record is like an object but with specific keys
    up:    { y: 50 },//top
    down:  { y: -50 }, 
    left:  { x: -50 },
    right: { x: 50 },
  };

  const Usedirection: BaseDirection = 
  direction === "autoY" 
  ? (scrollDirection === "up" ? "up" : "down") 
  : direction;

  const start = offsets[Usedirection]; // get starting offset based on direction

  return (
    <m.section
      ref={ref}// attach ref to motion section
      className={className} 
      initial={{ opacity: 0, ...start }} //spread operator to combine objects
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, }        // when visible
          : { opacity: 0, ...start }         // when not visible (reset)
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </m.section>
  );
}

// useScrollDirection.ts
export type ScrollDir = "up" | "down";

export function useScrollDirection(): ScrollDir { //scrollDir monitors scroll direction
  const [direction, setDirection] = useState<ScrollDir>("down"); // default down because we scroll down first
  const lastY = useRef(0); // to store last scroll position

  useEffect(() => { //scroll listner
    const handleScroll = () => { // on scroll event
      //can return different values based on browser support
      const y = window.scrollY || window.pageYOffset; // window is for browser, scrollY is current scroll position while pageYOffset is for older browsers
      if (y > lastY.current) { // compare current with last scroll position
        setDirection("down"); // scrolling down
      } else if (y < lastY.current) {
        setDirection("up"); // scrolling up
      }
      lastY.current = y; // update lastY to current position
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // passive for better performance
    return () => window.removeEventListener("scroll", handleScroll); // cleanup on unmount
  }, []);

  return direction; // return current scroll direction
}