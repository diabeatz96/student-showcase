'use client';

import { useEffect, useRef } from 'react';
import PageTransition from '@/components/animations/PageTransition';
import Timeline from '@/components/about/Timeline';
import Image from 'next/image';
import { animate } from 'animejs';

export default function AboutPage() {
  const profileRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileRef.current || !imageRef.current) return;

    // Animate profile image
    animate(imageRef.current, {
      scale: [0, 1],
      rotate: [180, 0],
      opacity: [0, 1],
      duration: 1000,
      ease: 'out-elastic(1, 0.8)',
    });

    // Animate profile content
    const profileElements = profileRef.current.querySelectorAll('.profile-item');
    animate(Array.from(profileElements), {
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 800,
      delay: (el, i) => 400 + i * 100,
      ease: 'out-cubic',
    });
  }, []);

  const timelineEvents = [
    {
      year: '2025',
      title: 'Adjunct Lecturer & Showcase Launch',
      organization: 'College of Staten Island',
      description: 'Teaching intro CS courses covering programming, data structures, algorithms. Launched CSI Student Showcase to connect students with opportunities.',
      color: 'bg-blue-600',
    },
    {
      year: '2024',
      title: 'Computer Lab Technician',
      organization: 'College of Staten Island',
      description: 'Supervising team of 10+ tutors and staff. Empowering students in robotics and CS through hands-on support with IDEs and development tools.',
      color: 'bg-indigo-600',
    },
    {
      year: '2023-24',
      title: 'Software Engineer Intern',
      organization: 'REVAstaff',
      description: 'Built React image uploader boosting Realtor efficiency by 35%. Automated Apache deployments and integrated PayPal API for seamless payments.',
      color: 'bg-purple-600',
    },
    {
      year: '2023',
      title: 'SecDevOps Intern',
      organization: 'New York-Presbyterian Hospital',
      description: 'Automated Linux server security with Python. Restructured Azure CI/CD pipelines. Optimized malware protection achieving 200% efficiency gains.',
      color: 'bg-pink-600',
    },
    {
      year: '2022-23',
      title: 'CUNY Tech Prep Fellow',
      organization: 'CUNY Tech Prep',
      description: 'Year-long fellowship mastering React, Node, PostgreSQL. Practiced MVC, Git workflows, Agile/Scrum, TDD, and modern deployment strategies.',
      color: 'bg-red-600',
    },
    {
      year: '2022',
      title: 'Software Engineer Intern',
      organization: 'Develop for Good',
      description: 'Developed React Native mentorship app connecting STEM students with industry mentors. Leveraged AWS Amplify and EXPO for backend infrastructure.',
      color: 'bg-orange-600',
    },
    {
      year: '2021-24',
      title: 'BS Computer Science',
      organization: 'College of Staten Island (CUNY)',
      description: 'Earned Computer Science degree with focus on algorithms, data structures, software engineering, and full-stack web development.',
      color: 'bg-amber-600',
    },
    {
      year: '2018-22',
      title: 'Founder & Creative Director',
      organization: 'The Golden Cut Productions',
      description: 'Founded production company creating visual content for emerging artists, musicians, and brands. Directed fantasy/hip-hop projects, edited on Adobe Premiere, managed clients. Bridged creative vision with technical execution.',
      color: 'bg-yellow-600',
    },
    {
      year: '2017',
      title: 'Post-Production Intern',
      organization: 'Optomen Productions (Food Network)',
      description: 'Worked on-set for Food Network shows. Managed legal files, completed equipment runs, edited using Avid Media Composer for television production.',
      color: 'bg-lime-600',
    },
    {
      year: '2017-18',
      title: 'Media Production Coordinator',
      organization: 'One EPIC Place',
      description: 'Led video production creating weekly brand awareness content. Filmed and edited promotional videos using industry-standard equipment.',
      color: 'bg-green-600',
    },
    {
      year: '2014-18',
      title: 'BA Digital Media Production',
      organization: 'SUNY New Paltz',
      description: 'Studied film, video production, post-production techniques. Built foundation in storytelling, cinematography, and editing that later influenced technical career.',
      color: 'bg-teal-600',
    },
  ];

  return (
    <PageTransition>
      <div className="bg-gradient-to-b from-primary-50 to-white">
        {/* Hero Section with Profile */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                {/* Profile Image */}
                <div className="md:w-2/5 bg-gradient-to-br from-primary-100 to-accent-100 p-8 flex items-center justify-center">
                  <div ref={imageRef} className="relative" style={{ opacity: 0 }}>
                    <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                      <Image
                        src="/images/adam-kostandy.jpg"
                        alt="Adam Kostandy"
                        width={256}
                        height={256}
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-primary-600 text-white text-6xl font-bold">AK</div>';
                        }}
                      />
                    </div>
                    {/* Floating decoration */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent-500 rounded-full opacity-80 animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-500 rounded-full opacity-80 animate-pulse"></div>
                  </div>
                </div>

                {/* Profile Info */}
                <div ref={profileRef} className="md:w-3/5 p-8">
                  <div className="profile-item opacity-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                      Adam Kostandy
                    </h1>
                  </div>

                  <div className="profile-item opacity-0">
                    <p className="text-xl text-primary-600 font-semibold mb-4">
                      Adjunct Lecturer & Full-Stack Developer
                    </p>
                  </div>

                  <div className="profile-item opacity-0">
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Passionate educator and developer with expertise in full-stack web development,
                      DevOps, and computer science education. Currently teaching at CSI while building
                      innovative solutions that bridge education and technology.
                    </p>
                  </div>

                  <div className="profile-item opacity-0">
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium">
                        React
                      </span>
                      <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium">
                        Python
                      </span>
                      <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium">
                        DevOps
                      </span>
                      <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium">
                        Azure
                      </span>
                      <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium">
                        Teaching
                      </span>
                    </div>
                  </div>

                  <div className="profile-item opacity-0">
                    <div className="flex flex-wrap gap-4">
                      <a
                        href="https://www.linkedin.com/in/adamkostandy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                      <a
                        href="https://adamkostandy.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Portfolio
                      </a>
                      <a
                        href="mailto:adam.kostandy@csi.cuny.edu"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-600 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Career Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From film production to software engineering and computer science education
            </p>
          </div>

          <Timeline events={timelineEvents} />
        </div>

        {/* Key Achievements */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Key Achievements
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">35% Upload Increase</h3>
                  <p className="text-sm text-gray-700">
                    React-based image uploader at REVAstaff increased Realtor efficiency by 35% in Q1.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">200% Efficiency Boost</h3>
                  <p className="text-sm text-gray-700">
                    Optimized NYP malware protection with Python multiprocessing achieving 200% runtime improvement.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-pink-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Enterprise Security</h3>
                  <p className="text-sm text-gray-700">
                    Automated password rotation and log monitoring at NYP, enhancing critical infrastructure security.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Team Leadership</h3>
                  <p className="text-sm text-gray-700">
                    Supervising 10+ tutors and staff at CSI, empowering students in robotics and CS fundamentals.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Technical Skills</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Azure DevOps',
                    'AWS Amplify', 'Docker', 'Git/GitHub', 'CI/CD', 'Bash Scripting', 'React Native',
                    'PayPal API', 'Apache', 'NGINX', 'Linux'].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white text-gray-800 rounded-lg font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSI Student Showcase Info */}
        <div className="bg-gradient-to-b from-white to-primary-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About CSI Student Showcase
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                The CSI Student Showcase is a platform I created to highlight the innovative web development
                projects from Computer Science students at the College of Staten Island. This platform connects
                talented students with opportunities while demonstrating their skills in modern web technologies.
              </p>
              <div className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg">
                <span>Projects Started: 2025</span>
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
