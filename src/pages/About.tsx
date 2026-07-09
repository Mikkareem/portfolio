import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Award, Briefcase, Calendar, GraduationCap, ArrowRight, UserCheck, ShieldCheck, Milestone } from 'lucide-react';
import { portfolioRepository } from '../data/repositories/portfolioRepository';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/animations/FadeIn';

export const About = () => {
  const profile = portfolioRepository.getProfile();

  const focusAreas = [
    {
      title: 'Full Stack Development',
      badge: 'Web Systems',
      description: 'Architecting robust reactive frontends combined with scalable microservices. Skilled in standard REST APIs, full state memoization, and real-time async communication schemas.',
      tech: 'ReactJS, TypeScript, NextJS, Spring Boot'
    },
    {
      title: 'Mobile Development',
      badge: 'Native Experience',
      description: 'Building modern cross-platform and fully native mobile applications. Expert in declarative visual layouts, custom gesture states, and lightweight background synchronization.',
      tech: 'Jetpack Compose, Kotlin Multiplatform, Room, Ktor'
    },
    {
      title: 'Cloud Native Engineering',
      badge: 'Cluster Mesh',
      description: 'Deploying high-availability container topologies. Proficient in persistent volume allocations, multi-tenant cluster boundaries, and security ingress parameters.',
      tech: 'Kubernetes, Docker, AWS, GCP, Terraform'
    },
    {
      title: 'DevOps & GitOps',
      badge: 'Continuous Flow',
      description: 'Automating standard CI/CD deployment pipelines. Designing declarative deployment pipelines, automatic verification hooks, and roll-back workflows.',
      tech: 'ArgoCD, GitActions, Helm, Jenkins, Argo'
    }
  ];

  const milestones = [
    {
      year: '2024 - Present',
      role: 'Lead Full Stack & Mobile Engineer',
      company: 'NextGen Engineering Solutions',
      details: 'Heading development on distributed Kotlin Multiplatform configurations and containerized microservice clusters on AWS EKS. Synchronizing multi-brand teams, implementing ArgoCD continuous feedback loops.'
    },
    {
      year: '2022 - 2024',
      role: 'Senior Software Engineer (Backend/DevOps Focus)',
      company: 'Zenith Tech Group',
      details: 'Built resilient Spring Cloud routing frameworks processing high-concurrency ticket locking layers. Designed custom Kubernetes ingress configurations and cut AWS billing parameters by 24% via scale-to-zero setups.'
    },
    {
      year: '2021 - 2022',
      role: 'Full Stack Web & Mobile App Developer',
      company: 'Quantum Studio Labs',
      details: 'Authored premium React dashboards and custom Jetpack Compose layout engines. Implemented secure offline-first caching structures with Room and state flow managers.'
    },
    {
      year: '2019 - 2021',
      role: 'Systems Developer (Associate)',
      company: 'Apex Code Systems',
      details: 'Managed core Java API endpoints, authored Unit Testing packages, and configured continuous verification workflows inside Jenkins clusters.'
    }
  ];

  return (
    <div id="about-page" className="relative min-h-screen pt-28 pb-20 font-sans">
      
      {/* Visual background meshes */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Header segment */}
        <div className="max-w-3xl space-y-4">
          <FadeIn direction="up">
            <span className="text-xs font-mono font-bold tracking-widest text-[#38bdf8] uppercase">GET TO KNOW ME</span>
            <h1 className="text-4xl font-display font-extrabold tracking-tight text-white sm:text-5xl">About <span className="text-gradient">Mohamed</span></h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p className="text-lg text-text-muted leading-relaxed">
              I am focused on designing high-fidelity, polished, and functionally impeccable products. I specialize in building reactive user interfaces, native mobile architectures, and cloud deployments that operate flawlessly at scale.
            </p>
          </FadeIn>
        </div>

        {/* Bento Core Strengths */}
        <div className="space-y-8">
          <FadeIn direction="up">
            <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-brand-primary" /> Focus Verticals &amp; Core Pillars
            </h2>
          </FadeIn>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {focusAreas.map((area, idx) => (
                <StaggerItem key={area.title}>
                  <div className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 bg-surface-card hover:border-brand-accent/30 hover:scale-[1.01] transition-all duration-300 space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold tracking-wider text-brand-accent uppercase px-2.5 py-1 rounded bg-brand-accent/5 border border-brand-accent/10">
                          {area.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-white">
                        {area.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                    <div className="border-t border-white/5 pt-4">
                      <p className="text-xs font-mono text-white/50">
                        <span className="text-brand-primary">Stack:</span> {area.tech}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          <FadeIn direction="up">
            <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-brand-primary" /> Professional Track Record
            </h2>
          </FadeIn>

          <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-6 md:pl-10 space-y-12 font-sans">
            {milestones.map((milestone, idx) => (
              <FadeIn key={milestone.role} direction="up" delay={idx * 0.1}>
                <div className="relative">
                  {/* Timeline bullet indicator */}
                  <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-bg-base border border-brand-primary">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-primary" />
                  </span>

                  <div className="glass-panel p-6 rounded-2xl border-white/5 bg-surface-card space-y-3 shadow-lg hover:border-brand-primary/20 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <span className="text-xs font-mono font-semibold text-brand-primary flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {milestone.year}
                      </span>
                      <span className="text-xs font-sans text-text-muted font-medium bg-white/5 px-2.5 py-1 rounded">
                        {milestone.company}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-white">
                      {milestone.role}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {milestone.details}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Action Drive */}
        <FadeIn direction="up">
          <div className="glass-panel border-white/5 bg-gradient-to-r from-surface-card via-surface shadow-2xl p-8 sm:p-10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 glow-primary">
            <div className="space-y-2 text-center sm:text-left max-w-xl">
              <h3 className="text-xl font-bold font-display text-white">Let&apos;s build the next production system together.</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Whether you need a high-performance cross-platform mobile app, a Kubernetes migration checklist, or a highly polished frontend interface.
              </p>
            </div>
            <Link
              id="about-cta-get-in-touch"
              to="/contact"
              className="flex items-center gap-2 px-6 py-3.5 bg-[#38bdf8] text-[#050816] font-bold rounded-xl hover:opacity-90 transition-all text-sm font-sans shrink-0 hover:scale-105 glow-blue"
            >
              Start Conversation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

      </div>
    </div>
  );
};
export default About;
