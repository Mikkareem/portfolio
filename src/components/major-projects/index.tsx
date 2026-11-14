import { MAJOR_PROJECTS, type ProjectDetail } from "../home/projects-data";
import { ProjectsPageView } from "../playground/ProjectsPageView";

export interface MajorProjectsProps {
  projects?: ProjectDetail[];
  categoryDescription?: string;
  onGoHome?: () => void;
  landscapeScale?: number;
  portraitScale?: number;
}

export const MajorProjects = ({
  projects = MAJOR_PROJECTS,
  categoryDescription = "Production platforms, multiplatform systems & enterprise architectures",
  onGoHome,
  landscapeScale,
  portraitScale,
}: MajorProjectsProps) => {
  return (
    <ProjectsPageView
      projects={projects}
      categoryTitle="Major Projects"
      categoryDescription={categoryDescription}
      accentColor="#6366f1"
      glowColor="#818cf8"
      landscapeScale={landscapeScale}
      portraitScale={portraitScale}
      onGoHome={onGoHome}
    />
  );
};

export default MajorProjects;
