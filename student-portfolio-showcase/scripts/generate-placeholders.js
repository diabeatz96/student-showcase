const fs = require('fs');
const path = require('path');

const projectImages = [
  { name: 'ecommerce-01.png', title: 'E-Commerce Platform', color1: '#3b82f6', color2: '#1d4ed8' },
  { name: 'task-manager-01.png', title: 'Task Manager', color1: '#8b5cf6', color2: '#6d28d9' },
  { name: 'weather-dashboard-01.png', title: 'Weather Dashboard', color1: '#0ea5e9', color2: '#0369a1' },
  { name: 'blog-cms-01.png', title: 'Blog CMS', color1: '#10b981', color2: '#047857' },
  { name: 'recipe-finder-01.png', title: 'Recipe Finder', color1: '#f59e0b', color2: '#d97706' },
  { name: 'snippet-manager-01.png', title: 'Code Snippet Manager', color1: '#ec4899', color2: '#be185d' },
  { name: 'portfolio-builder-01.png', title: 'Portfolio Builder', color1: '#6366f1', color2: '#4f46e5' },
  { name: '3d-showcase-01.png', title: '3D Product Showcase', color1: '#14b8a6', color2: '#0d9488' },
  { name: 'dataviz-01.png', title: 'Data Visualization', color1: '#f97316', color2: '#ea580c' },
  { name: 'animation-library-01.png', title: 'Animation Library', color1: '#a855f7', color2: '#9333ea' },
  { name: 'design-system-01.png', title: 'Design System', color1: '#06b6d4', color2: '#0891b2' },
  { name: 'music-viz-01.png', title: 'Music Visualizer', color1: '#ef4444', color2: '#dc2626' },
  { name: 'api-gateway-01.png', title: 'API Gateway', color1: '#84cc16', color2: '#65a30d' },
  { name: 'chat-app-01.png', title: 'Chat Application', color1: '#22c55e', color2: '#16a34a' },
  { name: 'cicd-pipeline-01.png', title: 'CI/CD Pipeline', color1: '#64748b', color2: '#475569' },
  { name: 'graphql-api-01.png', title: 'GraphQL API', color1: '#e11d48', color2: '#be123c' },
  { name: 'job-queue-01.png', title: 'Job Queue System', color1: '#7c3aed', color2: '#6d28d9' },
  { name: 'monitoring-01.png', title: 'Monitoring System', color1: '#0891b2', color2: '#0e7490' },
];

const outputDir = path.join(__dirname, '../public/images/projects');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

projectImages.forEach(({ name, title, color1, color2 }) => {
  const svg = `<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#grad-${name})"/>
  <rect x="50" y="50" width="1100" height="700" fill="white" opacity="0.1" rx="10"/>
  <text x="600" y="380" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="white" text-anchor="middle">${title}</text>
  <text x="600" y="450" font-family="Arial, sans-serif" font-size="28" fill="white" text-anchor="middle" opacity="0.9">Project Screenshot</text>
  <circle cx="200" cy="150" r="40" fill="white" opacity="0.2"/>
  <circle cx="1000" cy="650" r="60" fill="white" opacity="0.15"/>
  <rect x="100" y="550" width="250" height="40" fill="white" opacity="0.3" rx="5"/>
  <rect x="100" y="610" width="200" height="40" fill="white" opacity="0.3" rx="5"/>
  <rect x="850" y="550" width="250" height="40" fill="white" opacity="0.3" rx="5"/>
  <rect x="850" y="610" width="220" height="40" fill="white" opacity="0.3" rx="5"/>
  <circle cx="950" cy="200" r="30" fill="white" opacity="0.2"/>
  <circle cx="300" cy="680" r="50" fill="white" opacity="0.15"/>
</svg>`;

  const outputPath = path.join(outputDir, name);
  fs.writeFileSync(outputPath, svg);
  console.log(`✅ Created ${name}`);
});

console.log(`\n🎉 Successfully created ${projectImages.length} placeholder images!`);
