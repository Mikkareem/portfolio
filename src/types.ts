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
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Mobile';
  skills: Skill[];
}

export type ProjectType = 'major' | 'mini';

export type SpringTechnology =
  | 'Spring Boot'
  | 'Spring Boot w/Kotlin'
  | 'Spring Data JPA'
  | 'Spring Security'
  | 'Spring Webflux'
  | 'Spring GraphQL'
  | 'Spring Data JDBC'
  | 'Spring Cloud Gateway'
  | 'Spring Cloud Config Server/Client'
  | 'Spring Cloud Streams'
  | 'Spring Boot Testing';

export type InfrastructureTechnology =
  | 'Docker'
  | 'Docker Compose'
  | 'Kubernetes'
  | 'Google Cloud Platform (GCP)'
  | 'Amazon Web Services (AWS)';

export type MobileTechnology =
  | 'Kotlin Multiplatform'
  | 'Compose Multiplatform'
  | 'Koin'
  | 'Ktor Client'
  | 'Navigation 3'
  | 'Kotlinx Coroutines'
  | '';

export type TestingTechnology =
  | 'TestContainers'
  | 'WireMock'
  | 'Mockito'
  | 'MockK'
  | 'JUnit 4/5'
  | 'KoTest'
  | 'Kover (Test Coverage)'
  | 'Kotlinx Coroutines Test'
  | 'Spring Boot Testing'
  | 'Robolectric / Roborazzi'
  | 'Koin Testing'
  | 'Compose UI Testing'
  | 'Compose Unit Testing';

export type ProjectTechnology =
  | SpringTechnology
  | InfrastructureTechnology
  | MobileTechnology
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
