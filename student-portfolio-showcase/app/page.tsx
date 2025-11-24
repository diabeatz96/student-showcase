import Hero from '@/components/ui/Hero';
import StudentCard from '@/components/students/StudentCard';
import AnimatedGrid from '@/components/animations/AnimatedGrid';
import FeaturedProjectCarousel from '@/components/projects/FeaturedProjectCarousel';
import { getAllStudents, getFeaturedProjects } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSI Student Showcase | Web Development Fall 2024',
  description: 'Computer Science student web development projects from Fall 2024',
};

export const revalidate = 3600; // ISR: revalidate every hour

export default async function HomePage() {
  const students = await getAllStudents();
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <Hero />

      {/* Featured Projects Carousel */}
      {featuredProjects.length > 0 && (
        <FeaturedProjectCarousel projects={featuredProjects} />
      )}

      {/* Students Gallery */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Students
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore portfolios from talented Computer Science students at CSI
          </p>
        </div>

        {students.length > 0 ? (
          <AnimatedGrid columns={3}>
            {students.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </AnimatedGrid>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No students found.</p>
          </div>
        )}
      </div>
    </>
  );
}
