import { getAllStudents } from '@/lib/data';
import StudentGrid from '@/components/students/StudentGrid';
import PageTransition from '@/components/animations/PageTransition';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Students | CSI Student Showcase',
  description: 'Browse all CSI student portfolios and discover innovative web development projects',
};

export const revalidate = 3600; // ISR: revalidate every hour

export default async function StudentsPage() {
  const students = await getAllStudents();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Students
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse and filter CSI students and their web development projects
          </p>
        </div>

        <StudentGrid students={students} />
      </div>
    </PageTransition>
  );
}
