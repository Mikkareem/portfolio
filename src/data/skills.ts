import { SkillGroup } from '../types';

export const skillsData: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'ReactJS', iconName: 'Atom', level: 95 },
      { name: 'TypeScript', iconName: 'Code2', level: 92 },
      { name: 'JavaScript', iconName: 'Cpu', level: 95 },
      { name: 'Vite', iconName: 'Zap', level: 90 },
      { name: 'NextJS', iconName: 'Layers', level: 88 },
      { name: 'TanStack Query', iconName: 'RefreshCw', level: 90 },
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Spring Boot', iconName: 'Leaf', level: 88 },
      { name: 'Java', iconName: 'Coffee', level: 90 },
      { name: 'Kotlin', iconName: 'Flame', level: 92 },
      { name: 'Spring Cloud', iconName: 'CloudLightning', level: 82 },
      { name: 'SQL', iconName: 'Database', level: 88 },
      { name: 'NoSQL', iconName: 'HardDrive', level: 85 },
      { name: 'Testing', iconName: 'CheckSquare', level: 85 },
    ]
  },
  {
    category: 'DevOps',
    skills: [
      { name: 'Docker', iconName: 'Box', level: 90 },
      { name: 'Kubernetes', iconName: 'Grid', level: 85 },
      { name: 'Helm', iconName: 'Compass', level: 80 },
      { name: 'Terraform', iconName: 'Map', level: 82 },
      { name: 'ArgoCD', iconName: 'Network', level: 84 },
      { name: 'AWS', iconName: 'Cloud', level: 85 },
      { name: 'GCP', iconName: 'Globe', level: 80 },
      { name: 'Jenkins', iconName: 'Wrench', level: 82 },
      { name: 'GitHub Actions', iconName: 'Play', level: 90 },
    ]
  },
  {
    category: 'Mobile',
    skills: [
      { name: 'Jetpack Compose', iconName: 'Smartphone', level: 95 },
      { name: 'Compose Multiplatform', iconName: 'MonitorSmartphone', level: 92 },
      { name: 'Kotlin Multiplatform', iconName: 'Share2', level: 90 },
      { name: 'Koin', iconName: 'Key', level: 88 },
      { name: 'Room', iconName: 'FolderClosed', level: 90 },
      { name: 'Ktor', iconName: 'Radio', level: 88 },
      { name: 'Coil', iconName: 'Image', level: 90 },
    ]
  }
];
