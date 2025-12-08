'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { animate } from 'animejs';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate logo on mount
    if (logoRef.current) {
      animate(logoRef.current, {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 600,
        ease: 'out-cubic',
      });
    }

    // Animate nav links
    if (navLinksRef.current) {
      const links = navLinksRef.current.querySelectorAll('a');
      animate(Array.from(links), {
        opacity: [0, 1],
        translateY: [-10, 0],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delay: (_el: any, i: number) => 100 + i * 50,
        duration: 400,
        ease: 'out-cubic',
      });
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/students', label: 'Students' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-gradient-to-r from-white via-primary-50/30 to-white'
      }`}
    >
      {/* Animated gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 transition-opacity duration-300"
           style={{ opacity: isScrolled ? 0.5 : 0 }} />

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            ref={logoRef}
            href="/"
            className="group flex items-center space-x-3 text-xl font-bold text-primary-700 hover:text-primary-800 transition-all duration-300"
            style={{ opacity: 0 }}
          >
            {/* Animated Logo Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary-400 rounded-lg blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-lg shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                CSI Showcase
              </span>
              <span className="text-[10px] text-gray-500 font-normal tracking-wider uppercase -mt-1">
                Student Projects
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div ref={navLinksRef} className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                  isActive(link.href)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
                style={{ opacity: 0 }}
              >
                {link.label}
                {/* Active indicator */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500 transition-all duration-300 ${
                    isActive(link.href) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                />
                {/* Hover underline effect */}
                <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-primary-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}

            {/* Submit Button - Highlighted CTA */}
            <Link
              href="/submit"
              className="ml-4 relative overflow-hidden px-5 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md hover:shadow-lg transition-all duration-300 group"
              style={{ opacity: 0 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Submit
              </span>
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
              isMobileMenuOpen
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Open main menu</span>
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? 'rotate-45 translate-x-[2px] -translate-y-[1px]' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 translate-x-3' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? '-rotate-45 translate-x-[2px] translate-y-[1px]' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-gray-100 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/submit"
              className="flex items-center gap-2 mx-4 mt-3 px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 text-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Submit Project
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
