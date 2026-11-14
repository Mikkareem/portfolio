import { MAJOR_PROJECTS, type ProjectDetail } from "../home/projects-data";
import { ProjectDetailsView } from "../playground/ProjectDetailsView";

export interface MajorProjectDetailsProps {
  project?: ProjectDetail;
  onGoHome?: () => void;
  landscapeScale?: number;
  portraitScale?: number;
}

export const MajorProjectDetails = ({
  project = MAJOR_PROJECTS[0],
  onGoHome,
  landscapeScale,
  portraitScale,
}: MajorProjectDetailsProps) => {
  // Title + Tags + Demo (Image Carousel, VideoPlayer) + Source Code (Button) + Project Description Card
  // Image Carousel is a single component for all the available images
  // Multiple VideoPlayer's are need to be present in the column manner with autoplay
  // Multiple Gif Player's as well for each one in column

  // Once all the demos are rendered, then only Project Description Card should be present

  // Page Size should be calculated based on total size
  // Last Page contains "Go to Home" Button
  return (
    <ProjectDetailsView
      project={project}
      categoryLabel="MAJOR PROJECT"
      accentColor="#6366f1"
      glowColor="#818cf8"
      cardColor="#111827"
      onGoHome={onGoHome}
      landscapeScale={landscapeScale}
      portraitScale={portraitScale}
    />
  );
};

export default MajorProjectDetails;
