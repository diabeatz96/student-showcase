import { notFound } from 'next/navigation';
import { getAllStudents, getStudentById } from '@/lib/data';
import StudentProfile from '@/components/students/StudentProfile';
import PageTransition from '@/components/animations/PageTransition';
import type { Metadata } from 'next';

interface StudentPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const students = await getAllStudents();
  return students.map((student) => ({
    id: student.id,
  }));
}

export async function generateMetadata({ params }: StudentPageProps): Promise<Metadata> {
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) {
    return {
      title: 'Student Not Found',
    };
  }

  return {
    title: `${student.firstName} ${student.lastName} | Student Portfolio Showcase`,
    description: student.bio,
    openGraph: {
      title: `${student.firstName} ${student.lastName}`,
      description: student.bio,
    },
  };
}

export default async function StudentPage({ params }: StudentPageProps) {
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) {
    notFound();
  }

  return (
    <PageTransition>
      <StudentProfile student={student} />
    </PageTransition>
  );
}
