import { FRONTEND_TECHNOLOGIES, INFRASTRUCTURE_TECHNOLOGIES, SPRING_TECHNOLOGIES, TESTING_TECHNOLOGIES } from "./data/technologies";

export interface SocialLinks {
  github: string;
  linkedin: string;
  medium: string;
  email: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  yearsExperience: number;
  projectsBuiltCount: number;
  articlesCount: number;
  technologiesCount: number;
  socials: SocialLinks;
  roles: string[];
}

export interface Skill {
  name: string;
  iconName: string; // Used to look up Lucide icons
  level: number; // 0-100 indicating familiarity
}

export interface SkillGroup {
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Mobile' | 'Cloud' | 'Testing' | 'Spring';
  skills: Skill[];
}

export type ProjectType = 'major' | 'mini';

export type SpringTechnology = (typeof SPRING_TECHNOLOGIES)[number]
export type InfrastructureTechnology = (typeof INFRASTRUCTURE_TECHNOLOGIES)[number];

export type FrontendTechnology = (typeof FRONTEND_TECHNOLOGIES)[number]
export type TestingTechnology = (typeof TESTING_TECHNOLOGIES)[number]

export type ProjectTechnology =
  | SpringTechnology
  | InfrastructureTechnology
  | FrontendTechnology
  | TestingTechnology;

export type PlatformType = 'web' | 'android' | 'ios' | 'desktop' | 'backend';

export interface ProjectTag {
  color: string[]; // Gradient (if many)
  label: string;
}

export interface Project {
  id: string; // Internal identifier for keys
  slug: string; // Identifier for routing
  type: ProjectType; // Kept for existing UI classification (major / mini)
  name: string;
  tags: ProjectTag[];
  description: string;
  overview: string;
  platforms: PlatformType[];
  source: string; // Link
  technologies: ProjectTechnology[];
  screenshots: string[]; // Links
  videos?: string[]; // Gif(s), MP4(s), etc.
  youtubeVideos?: string[]; // YouTube link(s)
}

export interface MajorProject extends Project {
  type: 'major';
  thumbnailImage: string;
}

export interface MiniProject extends Project {
  type: 'mini';
  createdAt?: string;
  thumbnail?: {
    video?: string;
    image?: string;
  };
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string; // Markdown text (optional for external blogs)
  isExternal: boolean;
  externalUrl?: string;
  thumbnail: string;
  tags: string[];
  date: string;
  readTime: string;
}
