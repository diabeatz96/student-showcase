'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProjectSlide from './ProjectSlide';
import type { Project } from '@/lib/validation';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="project-carousel-section">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
      <div className="card">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          className="project-swiper"
          style={{ minHeight: '500px' }}
        >
          {projects.map(project => (
            <SwiperSlide key={project.id}>
              <ProjectSlide project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
