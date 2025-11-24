# Student Portfolio Showcase

UPDATE 2025.X 

A modern, accessible, and animated Next.js 15 application for showcasing student web development projects. Built with TypeScript, Tailwind CSS, and featuring smooth animations powered by anime.js.

## 🎯 Project Overview

This portfolio showcase highlights exceptional web development projects from computer science students. The site features:

- **Student Profiles**: Detailed pages for each student with bio, skills, and contact information
- **Project Showcases**: Interactive carousels with live project previews via iframes
- **Search & Filter**: Find students by name, skills, or semester
- **Smooth Animations**: Professional animations using anime.js
- **Fully Accessible**: WCAG 2.1 AA compliant with keyboard navigation
- **Responsive Design**: Mobile-first approach that works on all devices

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [anime.js v4](https://animejs.com/)
- **Carousel**: [Swiper.js](https://swiperjs.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Content**: JSON files (no database required)
- **Image Optimization**: Next.js Image component

## 📁 Project Structure

```
student-portfolio-showcase/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Landing page
│   ├── globals.css          # Global styles
│   ├── not-found.tsx        # 404 page
│   └── students/            # Student pages
│       ├── page.tsx         # All students grid
│       ├── loading.tsx      # Loading state
│       └── [id]/            # Dynamic student profile
│           ├── page.tsx
│           └── loading.tsx
├── components/              # React components
│   ├── animations/          # Animation components
│   │   ├── AnimatedGrid.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── PageTransition.tsx
│   ├── students/            # Student components
│   │   ├── StudentCard.tsx
│   │   ├── StudentGrid.tsx
│   │   └── StudentProfile.tsx
│   ├── projects/            # Project components
│   │   ├── ProjectCarousel.tsx
│   │   ├── ProjectSlide.tsx
│   │   └── ProjectCard.tsx
│   ├── ui/                  # UI components
│   │   ├── Button.tsx
│   │   ├── SearchBar.tsx
│   │   └── Hero.tsx
│   └── layout/              # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/                     # Utility functions
│   ├── data.ts             # Data fetching functions
│   ├── validation.ts       # Zod schemas
│   └── utils.ts            # Helper functions
├── data/                    # Student data
│   ├── students/           # JSON files for each student
│   ├── schemas/            # Schema documentation
│   └── templates/          # Template for new students
├── public/                  # Static assets
│   └── images/
│       ├── students/       # Student photos
│       └── projects/       # Project screenshots
├── scripts/                 # Utility scripts
│   └── validate-data.js    # Data validation script
└── ...config files
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+ and npm
- Git (optional)

### Steps

1. **Clone or download this repository**

```bash
git clone <repository-url>
cd student-portfolio-showcase
```

2. **Install dependencies**

```bash
npm install
```

3. **Add student data**

Place student JSON files in `data/students/` (see "Adding New Students" below)

4. **Add images**

Place student photos in `public/images/students/`
Place project screenshots in `public/images/projects/`

5. **Validate data**

```bash
npm run validate
```

6. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Adding New Students

### Step 1: Create Student JSON File

1. Copy the template:

```bash
cp data/templates/student-template.json data/students/your-name.json
```

2. Edit `your-name.json` and fill in your information:

```json
{
  "id": "your-name",
  "firstName": "Your",
  "lastName": "Name",
  "email": "your.email@university.edu",
  "photo": "images/students/your-name.jpg",
  "major": "Computer Science",
  "graduationYear": 2025,
  "bio": "Your bio here (50-500 characters)...",
  "skills": ["JavaScript", "React", "Node.js"],
  "semesters": [
    {
      "name": "Fall 2024",
      "startDate": "2024-09-01T00:00:00Z",
      "projects": [
        {
          "id": "my-project",
          "title": "My Awesome Project",
          "description": "Description here (50-500 characters)...",
          "technologies": ["React", "TypeScript"],
          "screenshot": "images/projects/my-project.png",
          "semester": "Fall 2024",
          "featured": true
        }
      ]
    }
  ]
}
```

3. See `data/schemas/student.schema.md` for complete field documentation

### Step 2: Add Images

1. **Student Photo**: Add your photo to `public/images/students/your-name.jpg`
   - Recommended: 400x400px or larger, square aspect ratio
   - Formats: JPG, PNG, or WebP

2. **Project Screenshots**: Add screenshots to `public/images/projects/`
   - Recommended: 1200x800px or larger
   - Use descriptive filenames

### Step 3: Validate

```bash
npm run validate
```

Fix any validation errors before building.

### Step 4: Build and Deploy

```bash
npm run build
```

## 🔍 Validation

The validation script (`scripts/validate-data.js`) checks:

- ✅ Required fields are present
- ✅ Field types are correct
- ✅ Character count limits
- ✅ Valid email format
- ✅ Valid URLs
- ✅ Project count (1-6 per semester)
- ✅ ID format (lowercase with hyphens)

**Important**: Validation runs automatically before build (`npm run prebuild`)

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: {
    50: '#eff6ff',
    // ... customize colors
  },
}
```

### Animations

Modify animation parameters in component files:
- `components/animations/AnimatedGrid.tsx` - Grid entrance animations
- `components/animations/ScrollReveal.tsx` - Scroll-triggered animations
- `components/ui/Hero.tsx` - Hero text animations

### Content

- Update site title and description in `app/layout.tsx`
- Modify hero section in `components/ui/Hero.tsx`
- Edit about section in `app/page.tsx`
- Customize footer in `components/layout/Footer.tsx`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Deploy!

**Features on Vercel**:
- Automatic deployments on git push
- ISR (Incremental Static Regeneration)
- Edge network CDN
- Automatic HTTPS

### Alternative Platforms

- **Netlify**: Requires static export (ISR not supported)
- **AWS Amplify**: Full Next.js support
- **Self-hosted**: Use `npm run build && npm start`

## ♿ Accessibility

This site follows WCAG 2.1 AA standards:

- ✅ Semantic HTML throughout
- ✅ Alt text on all images
- ✅ Keyboard navigation support
- ✅ Visible focus indicators
- ✅ ARIA labels on interactive elements
- ✅ Color contrast ratios meet standards
- ✅ Touch targets are 44x44px minimum
- ✅ Skip to main content link

## 🔒 Security

### Iframe Sandbox

All project iframes use strict sandboxing:

```html
<iframe sandbox="allow-scripts allow-popups allow-forms" ... />
```

**Never** combine `allow-scripts` and `allow-same-origin` for untrusted content.

### CSP Headers

Content Security Policy restricts iframe sources to:
- `*.vercel.app`
- `*.netlify.app`
- `*.github.io`

Configure in `next.config.ts` if you need additional domains.

### Data Validation

All JSON data is validated with Zod schemas before rendering.

## 📊 Performance

Target metrics (Lighthouse):

- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

### Optimizations

- Image optimization via Next.js Image
- Static generation for all pages
- ISR with 1-hour revalidation
- Code splitting automatic
- CSS purging in production
- Font optimization

## 🐛 Troubleshooting

### Build Errors

**Problem**: Validation errors during build

**Solution**: Run `npm run validate` to identify issues

---

**Problem**: Image loading errors

**Solution**: Ensure images exist at specified paths in `public/` directory

---

**Problem**: TypeScript errors

**Solution**: Check that all imports are correct and types match schemas

### Runtime Issues

**Problem**: Animations not working

**Solution**: Check browser console for anime.js errors, ensure `use client` directive

---

**Problem**: Student pages show 404

**Solution**: Verify student JSON file exists and ID matches URL

---

**Problem**: Iframe not loading

**Solution**: Check `canEmbed: true` and demo URL is from allowed domain

## 📚 Documentation

- [Student Schema Documentation](data/schemas/student.schema.md)
- [Student Template](data/templates/student-template.json)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [anime.js Documentation](https://animejs.com/documentation/)

## 🤝 Contributing

### For Instructors

1. Update student data files as needed
2. Run validation before committing
3. Test locally before deploying
4. Update documentation if schema changes

### For Students

1. Use the provided template
2. Follow character count limits
3. Include high-quality screenshots
4. Test your profile locally
5. Ensure all links work

## 📄 License

This project is created for educational purposes as part of CSC 436 - Web Development.

## 🙋 Support

For questions or issues:

1. Check the documentation in `data/schemas/`
2. Review example student files
3. Run validation to identify issues
4. Contact course instructor

## ✨ Features

- 🎨 Beautiful, modern design
- 📱 Fully responsive
- ⚡ Fast page loads
- ♿ Accessibility-first
- 🔍 Search and filter
- 🎭 Smooth animations
- 🖼️ Live project previews
- 📊 No database required
- 🔐 Secure iframe embedding
- 📈 SEO optimized

## 🎯 Future Enhancements

Potential improvements:

- [ ] Dark mode toggle
- [ ] Advanced filtering (by tech stack)
- [ ] Project categories/tags
- [ ] Export to PDF
- [ ] Analytics integration
- [ ] Comments/feedback system
- [ ] Search with fuzzy matching
- [ ] Pagination for large datasets

---

**Built with ❤️ for CSC 436 Students**
