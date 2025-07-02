export interface ProjectImage {
  title: string;
  slug: string;
  src: string;
  alt: string;
  aspect: string;
  project: string;
  order: number;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  featured: boolean;
  order: number;
}

// Import project data from JSON files
import mountainEscape from './mountain-escape.json';
import urbanNights from './urban-nights.json';

// Import image data from JSON files
import goldenroof from './images/goldenroof.json';
import industrypioneer from './images/industrypioneer.json';

export const projects: Project[] = [
  mountainEscape as Project,
  urbanNights as Project,
];

export const images: ProjectImage[] = [
  goldenroof as ProjectImage,
  industrypioneer as ProjectImage,
];

// Helper function to get images for a specific project
export function getProjectImages(projectSlug: string): ProjectImage[] {
  return images.filter(img => img.project === projectSlug);
}

// Helper function to get a specific project
export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
} 