import { MINOR_PROJECTS, type ProjectDetail } from "../home/projects-data";
import { ProjectsPageView } from "../playground/ProjectsPageView";

export interface MinorProjectsProps {
  projects?: ProjectDetail[];
  categoryDescription?: string;
  onGoHome?: () => void;
  landscapeScale?: number;
  portraitScale?: number;
}

export const MinorProjects = ({
  projects = MINOR_PROJECTS,
  categoryDescription = "Open-source libraries, spatial 3D tools & developer utilities",
  onGoHome,
  landscapeScale,
  portraitScale,
}: MinorProjectsProps) => {
  return (
    <ProjectsPageView
      projects={projects}
      categoryTitle="Minor Projects"
      categoryDescription={categoryDescription}
      accentColor="#059669"
      glowColor="#34d399"
      landscapeScale={landscapeScale}
      portraitScale={portraitScale}
      onGoHome={onGoHome}
    />
  );
};

export default MinorProjects;
