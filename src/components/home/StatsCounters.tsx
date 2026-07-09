import { portfolioRepository } from '../../data/repositories/portfolioRepository';
import { StaggerContainer, StaggerItem } from '../animations/FadeIn';

export const StatsCounters = () => {
  const profile = portfolioRepository.getProfile();

  return (
    <div className="mt-16 md:mt-24 pt-10 border-t border-white/5">
      <StaggerContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">

          <StaggerItem>
            <div className="glass-panel p-5 sm:p-6 rounded-2xl text-center space-y-2 border-white/5 hover:border-brand-primary/20 hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-primary">
                {profile.yearsExperience}+
              </h3>
              <p className="text-xs sm:text-sm font-sans text-text-muted font-medium">Years Experience</p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="glass-panel p-5 sm:p-6 rounded-2xl text-center space-y-2 border-white/5 hover:border-brand-accent/20 hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-accent">
                {profile.projectsBuiltCount}+
              </h3>
              <p className="text-xs sm:text-sm font-sans text-text-muted font-medium">Projects Built</p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="glass-panel p-5 sm:p-6 rounded-2xl text-center space-y-2 border-white/5 hover:border-brand-secondary/20 hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-color-brand-secondary">
                {profile.articlesCount}+
              </h3>
              <p className="text-xs sm:text-sm font-sans text-text-muted font-medium">Articles Written</p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="glass-panel p-5 sm:p-6 rounded-2xl text-center space-y-2 border-white/5 hover:border-brand-primary/20 hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-primary">
                {profile.technologiesCount}+
              </h3>
              <p className="text-xs sm:text-sm font-sans text-text-muted font-medium">Tech & Systems</p>
            </div>
          </StaggerItem>

        </div>
      </StaggerContainer>
    </div>
  );
};
export default StatsCounters;
