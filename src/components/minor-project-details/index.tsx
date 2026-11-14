import { MINOR_PROJECTS, type ProjectDetail } from "../home/projects-data";
import { ProjectDetailsView } from "../playground/ProjectDetailsView";

export interface MinorProjectDetailsProps {
  project?: ProjectDetail;
  onGoHome?: () => void;
  landscapeScale?: number;
  portraitScale?: number;
}

export const MinorProjectDetails = ({
  project = MINOR_PROJECTS[0],
  onGoHome,
  landscapeScale,
  portraitScale,
}: MinorProjectDetailsProps) => {
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
      categoryLabel="MINOR PROJECT"
      accentColor="#059669"
      glowColor="#34d399"
      cardColor="#111827"
      onGoHome={onGoHome}
      landscapeScale={landscapeScale}
      portraitScale={portraitScale}
    />
  );
};

export default MinorProjectDetails;
