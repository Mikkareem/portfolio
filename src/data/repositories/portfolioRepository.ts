import { profileData } from '../portfolio';
import { skillsData } from '../skills';
import { majorProjectsData } from '../majorprojects';
import { miniProjectsData } from '../miniprojects';
import { blogsData } from '../blogs';
import { Profile, SkillGroup, Project, Blog, ProjectType, MajorProject, MiniProject } from '../../types';

export class PortfolioRepository {
  getProfile(): Profile {
    return profileData;
  }

  getSkills(): SkillGroup[] {
    return skillsData;
  }

  getSkillsByCategory(category: 'Frontend' | 'Backend' | 'DevOps' | 'Mobile'): SkillGroup | undefined {
    return skillsData.find(group => group.category === category);
  }

  getProjects(type?: ProjectType): Project[] {
    const all = [...majorProjectsData, ...miniProjectsData];
    if (type) {
      return all.filter(project => project.type === type);
    }
    return all;
  }

  getMajorProjects(): MajorProject[] {
    return majorProjectsData;
  }

  getMiniProjects(): MiniProject[] {
    return miniProjectsData;
  }

  getProjectBySlug(slug: string): Project | undefined {
    const all = [...majorProjectsData, ...miniProjectsData];
    return all.find(project => project.slug === slug);
  }

  getBlogs(): Blog[] {
    return blogsData;
  }

  getBlogBySlug(slug: string): Blog | undefined {
    return blogsData.find(blog => blog.slug === slug);
  }
}

// Export a single singleton instance for components to import directly
export const portfolioRepository = new PortfolioRepository();
