import type { Experience } from "./ExperienceCard";

export const DEFAULT_EXPERIENCES: Experience[] = [
  {
    jobTitle: "Lead Full Stack & Mobile Engineer",
    companyName: "Enterprise Solutions",
    interval: "Jan 2024 – Present",
    descriptionPoints: [
      "Architected cross-platform mobile and web applications with **Kotlin Multiplatform** and **Compose Multiplatform**",
      "Spearheaded **microservices migration** reducing API latency by **45%** across distributed cloud services",
      "Orchestrated **automated CI/CD pipelines** with Docker, Kubernetes, and GitHub Actions achieving **99.9% uptime**",
    ],
  },
  {
    jobTitle: "Senior Android & Backend Engineer",
    companyName: "NextGen Technologies",
    interval: "Mar 2022 – Dec 2023",
    descriptionPoints: [
      "Engineered high-performance real-time features using **Jetpack Compose**, Coroutines, and Ktor Client",
      "Designed and deployed **Spring Boot** and Kotlin microservices backed by PostgreSQL and Redis caching",
      "Led technical design reviews and mentored **6 junior and mid-level engineers**",
    ],
  },
  {
    jobTitle: "Full Stack Software Engineer",
    companyName: "FinTech Innovations",
    interval: "Jul 2020 – Feb 2022",
    descriptionPoints: [
      "Built resilient transactional processing services handling **over 2M daily operations** with strict security standards",
      "Implemented reactive front-end dashboards in **React** and TypeScript with state synchronization",
      "Streamlined automated unit and integration testing suite to achieve **92% code coverage**",
    ],
  },
  {
    jobTitle: "Mobile & Web Developer",
    companyName: "Digital Dynamics Lab",
    interval: "Aug 2018 – Jun 2020",
    descriptionPoints: [
      "Developed native Android applications utilizing **Kotlin**, Room database, and MVVM architectural pattern",
      "Collaborated with product designers to create an accessible, responsive **design component system**",
      "Optimized app startup performance and decreased bundle size by **35%**",
    ],
  },
];
