import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CSI Student Showcase',
  description: 'Computer Science student web development projects - Fall 2024',
  keywords: ['web development', 'student projects', 'CSI', 'computer science', 'React', 'Next.js'],
  authors: [{ name: 'CSI Students' }],
  openGraph: {
    title: 'CSI Student Showcase',
    description: 'Computer Science student web development projects - Fall 2024',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
