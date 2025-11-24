# Student Data Schema Documentation

This document describes the JSON schema for student portfolio data files.

## File Location

Student data files must be placed in: `data/students/`

File naming convention: `{student-id}.json` (e.g., `john-doe.json`)

## Schema Structure

### Root Object

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `id` | string | ✅ Yes | Regex: `^[a-z0-9-]+$` | Unique identifier, lowercase with hyphens |
| `firstName` | string | ✅ Yes | 1-50 characters | Student's first name |
| `lastName` | string | ✅ Yes | 1-50 characters | Student's last name |
| `email` | string | ✅ Yes | Valid email format | Contact email |
| `photo` | string | ✅ Yes | Path pattern: `images/students/*.{jpg,jpeg,png,webp}` | Profile photo path |
| `bio` | string | ✅ Yes | 50-500 characters | Short biography |
| `personalStatement` | string | ❌ No | Max 1000 characters | Longer personal statement |
| `contact` | object | ❌ No | See Contact Object | Social/professional links |
| `skills` | array[string] | ✅ Yes | Min 1 item | List of skills |
| `careerGoals` | string | ❌ No | Max 300 characters | Career aspirations |
| `major` | string | ❌ No | - | Academic major |
| `graduationYear` | number | ❌ No | Integer | Expected graduation year |
| `semesters` | array[Semester] | ✅ Yes | Min 1 item | Semester data |

### Contact Object

All fields are optional but must be valid URLs if provided.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `website` | string | ❌ No | Personal website URL |
| `github` | string | ❌ No | GitHub profile URL |
| `linkedin` | string | ❌ No | LinkedIn profile URL |
| `twitter` | string | ❌ No | Twitter profile URL |

### Semester Object

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `name` | string | ✅ Yes | - | Semester name (e.g., "Fall 2024") |
| `startDate` | string | ✅ Yes | ISO 8601 datetime | Semester start date |
| `endDate` | string | ❌ No | ISO 8601 datetime | Semester end date |
| `projects` | array[Project] | ✅ Yes | 1-6 items | Project list for this semester |

### Project Object

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `id` | string | ✅ Yes | Regex: `^[a-z0-9-]+$` | Unique project identifier |
| `title` | string | ✅ Yes | 3-100 characters | Project title |
| `description` | string | ✅ Yes | 50-500 characters | Detailed description |
| `technologies` | array[string] | ✅ Yes | Min 1 item | Technologies used |
| `demoUrl` | string | ❌ No | Valid URL | Live demo link |
| `repoUrl` | string | ❌ No | Valid URL | Source code repository |
| `screenshot` | string | ✅ Yes | Path pattern: `images/projects/*.{jpg,jpeg,png,webp}` | Screenshot path |
| `semester` | string | ✅ Yes | - | Semester name (should match parent) |
| `completedDate` | string | ❌ No | ISO 8601 datetime | Completion date |
| `featured` | boolean | ❌ No | Default: false | Featured on homepage |
| `canEmbed` | boolean | ❌ No | Default: true | Allow iframe embedding |

## Validation Rules

### ID Format
- Must be lowercase
- Can only contain letters, numbers, and hyphens
- No spaces or special characters
- Example: `john-doe`, `weather-app-2024`

### Dates
- Must use ISO 8601 format: `YYYY-MM-DDTHH:mm:ssZ`
- Example: `2024-09-01T00:00:00Z`

### Character Limits
- **Bio**: 50-500 characters (required)
- **Personal Statement**: 0-1000 characters (optional)
- **Career Goals**: 0-300 characters (optional)
- **Project Title**: 3-100 characters (required)
- **Project Description**: 50-500 characters (required)

### Project Limits
- Each semester must have **1-6 projects**
- Having exactly 6 projects per semester is recommended for visual consistency

### Image Paths
- Student photos: `images/students/{filename}.{jpg|jpeg|png|webp}`
- Project screenshots: `images/projects/{filename}.{jpg|jpeg|png|webp}`
- All paths are relative to the `public` directory

## Featured Projects

Set `featured: true` on projects you want displayed on the homepage. Only featured projects from students will appear in the "Featured Projects" section.

## Iframe Embedding

The `canEmbed` field controls whether a project's demo URL can be shown in an iframe:

- `true` (default): If `demoUrl` exists, shows live iframe preview
- `false`: Always shows screenshot, even if `demoUrl` exists

**Security Note**: Only embed demos from trusted domains (*.vercel.app, *.netlify.app, *.github.io)

## Common Mistakes

1. **ID Mismatch**: Ensure `project.semester` matches the parent `semester.name`
2. **Character Counts**: Descriptions that are too short (<50 chars) will fail validation
3. **Invalid URLs**: Must include protocol (`https://`)
4. **Date Format**: Don't use `MM/DD/YYYY` - must use ISO 8601
5. **Image Paths**: Don't include `/public/` in the path - start with `images/`
6. **Too Many Projects**: Max 6 projects per semester

## Example Valid Entry

```json
{
  "id": "jane-doe",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@university.edu",
  "photo": "images/students/jane-doe.jpg",
  "major": "Computer Science",
  "graduationYear": 2025,
  "bio": "Passionate full-stack developer with a focus on creating accessible, user-friendly web applications. Experienced in modern JavaScript frameworks and cloud technologies.",
  "skills": ["JavaScript", "React", "Node.js", "AWS"],
  "semesters": [
    {
      "name": "Fall 2024",
      "startDate": "2024-09-01T00:00:00Z",
      "endDate": "2024-12-15T00:00:00Z",
      "projects": [
        {
          "id": "weather-app",
          "title": "Weather Dashboard",
          "description": "Interactive weather application with 7-day forecasts, real-time updates, and location-based alerts using the OpenWeather API.",
          "technologies": ["React", "TypeScript", "Tailwind CSS", "OpenWeather API"],
          "demoUrl": "https://weather-app-demo.vercel.app",
          "repoUrl": "https://github.com/janedoe/weather-app",
          "screenshot": "images/projects/weather-app.png",
          "semester": "Fall 2024",
          "completedDate": "2024-11-10T00:00:00Z",
          "featured": true,
          "canEmbed": true
        }
      ]
    }
  ]
}
```

## Validation

Run validation before building:

```bash
npm run validate
```

This checks all student JSON files for:
- Required fields
- Correct data types
- Character count limits
- Valid formats (IDs, emails, URLs, dates)
- Project count (1-6 per semester)

## Tips

1. **Start from Template**: Copy `data/templates/student-template.json`
2. **Remove Comments**: The template has `__note__` fields - remove these
3. **Test Early**: Run `npm run validate` frequently
4. **Consistent Dates**: Use the same timezone for all dates (UTC recommended)
5. **Descriptive IDs**: Use meaningful project IDs (e.g., `ecommerce-platform` not `project1`)
6. **Quality Screenshots**: Use high-resolution images (at least 1200px wide)
7. **Accurate Tech Lists**: Only list technologies actually used in the project
