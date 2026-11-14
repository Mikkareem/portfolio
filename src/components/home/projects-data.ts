import type { MajorProject } from "../playground/MajorProjectPreviewCard";
import type { TechnologiesUsedData } from "../playground/TechnologiesUsedCard";

export interface ProjectDetail extends MajorProject {
  id: string;
  category: "major" | "minor";
  description: string;
  tags: string[];
  color?: string;
  githubUrl?: string;
  liveUrl?: string;
  demoImages?: string[];
  demoVideos?: string[];
  demoGifs?: string[];
  markdownDescription?: string;
  technologies?: TechnologiesUsedData;
}

export const MAJOR_PROJECTS: ProjectDetail[] = [
  {
    id: "codehorn",
    title: "CodeHorn",
    subtitle: "Competitive programming platform with interactive contest telemetry",
    description:
      "A complete competitive programming platform featuring real-time code execution, live leaderboards, automated test verification, and analytics. Built with Kotlin Multiplatform, Compose, and Ktor microservices.",
    thumbnail: {
      video: "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
      image: "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn_light_3.png",
    },
    demoImages: [
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn_light_3.png",
      "/images/cmp.png",
      "/images/kmp.png",
    ],
    demoVideos: [
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
    ],
    demoGifs: [
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
    ],
    markdownDescription: `# CodeHorn Competitive Programming Platform

**CodeHorn** is a full-stack competitive programming and automated code evaluation ecosystem engineered for high-concurrency contest hosting.

### Key Architecture & Engineering
- **Sandboxed Worker Nodes**: Isolated Docker containers evaluate submitted solutions against time and memory quotas with strict security boundaries.
- **Real-Time Telemetry**: Reactive WebSocket streaming delivers live contest leaderboards, testcase evaluation progress, and sub-second standings updates.
- **Cross-Platform Compose UI**: A unified Kotlin Multiplatform codebase powering native desktop and mobile clients with zero logic duplication.

### Core Capabilities
- Multi-language support: Kotlin, Java, Python, C++, Go, and Rust
- Automated edge-case generation and memory leak profiling
- In-depth problem analysis and runtime performance bell-curves
`,
    platforms: ["Android", "Web", "Desktop"],
    category: "major",
    color: "#4f46e5",
    tags: ["Kotlin", "Compose", "Ktor", "Docker", "PostgreSQL"],
    githubUrl: "https://github.com/Mikkareem",
    technologies: {
      Frontend: ["Compose Multiplatform", "Android SDK", "Desktop JVM"],
      Backend: ["Kotlin", "Ktor", "PostgreSQL", "Docker", "WebSockets"],
      Platforms: ["Android", "Web", "Desktop"],
    },
  },
  {
    id: "enterprise-suite",
    title: "ComposeFlow Suite",
    subtitle: "Cross-platform enterprise system with Compose Multiplatform & cloud services",
    description:
      "Enterprise mobile and desktop solution unifying transactional business logic across Android, iOS, and Web. Incorporates offline-first persistence, reactive caching, and high-performance microservices.",
    thumbnail: {
      image: "/images/cmp.png",
    },
    platforms: ["Android", "Ios", "Web"],
    category: "major",
    color: "#0284c7",
    tags: ["KMP", "Compose Multiplatform", "Spring Boot", "Redis", "Kubernetes"],
    githubUrl: "https://github.com/Mikkareem",
  },
  {
    id: "finflow-banking",
    title: "FinFlow Reactive Core",
    subtitle: "High-throughput financial ledger handling 2M+ transactions daily",
    description:
      "Resilient transactional microservices designed for strict data consistency, event sourcing with Kafka, and reactive front-end dashboards in React and TypeScript.",
    thumbnail: {
      image: "/images/react.jpg",
    },
    platforms: ["Web", "Desktop"],
    category: "major",
    tags: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "React"],
    githubUrl: "https://github.com/Mikkareem",
  },
  {
    id: "cloudpulse-monitor",
    title: "CloudPulse Monitor",
    subtitle: "Distributed telemetry & infrastructure monitoring with alerting engine",
    description:
      "Cloud-native observability tool gathering cluster health metrics, container resource consumption, and automated Slack/PagerDuty alerts.",
    thumbnail: {
      image: "/images/kmp.png",
    },
    platforms: ["Web", "Android"],
    category: "major",
    tags: ["Go", "Kubernetes", "Prometheus", "Docker", "Compose"],
    githubUrl: "https://github.com/Mikkareem",
  },
  {
    id: "omniroute-logistics",
    title: "OmniRoute Logistics",
    subtitle: "Real-time fleet tracking & route optimization mobile system",
    description:
      "Native mobile navigation and fleet dispatching platform with real-time GPS tracking, offline map caching, and dynamic routing algorithms.",
    thumbnail: {
      image: "/images/cmp.png",
    },
    platforms: ["Android", "Ios"],
    category: "major",
    tags: ["Jetpack Compose", "Coroutines", "Room", "Maps API"],
    githubUrl: "https://github.com/Mikkareem",
  },
  {
    id: "aura-health",
    title: "Aura Health & Vitals",
    subtitle: "Cross-platform wearable biometric sync & predictive wellness engine",
    description:
      "Health vitals dashboard integrating Bluetooth LE devices, background synchronization, and reactive Compose UI with beautiful chart visualizations.",
    thumbnail: {
      image: "/images/kmp.png",
    },
    platforms: ["Android", "Ios", "Web"],
    category: "major",
    tags: ["KMP", "BLE", "HealthConnect", "Compose"],
    githubUrl: "https://github.com/Mikkareem",
  },
];

export const MINOR_PROJECTS: ProjectDetail[] = [
  {
    id: "markdown-3d",
    title: "3D Markdown Canvas",
    subtitle: "Spatial Markdown renderer in WebGL with interactive 3D layout engine",
    description:
      "High-performance modular 3D spatial markdown renderer for React Three Fiber. Automatically lays out headers, styled text, lists, and quote callouts in 3D scene graphs.",
    thumbnail: {
      video: "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
      image: "/images/react.jpg",
    },
    demoImages: [
      "/images/react.jpg",
      "/images/kmp.png",
      "/images/cmp.png",
    ],
    demoVideos: [
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
    ],
    demoGifs: [
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
    ],
    markdownDescription: `# 3D Spatial Markdown Canvas

An open-source declarative Markdown layout engine built natively for **React Three Fiber** and WebGL.

### Highlights & Features
- **Zero HTML DOM Overlays**: Every typography block, bullet, and inline style renders directly into WebGL scene graphs.
- **Dynamic Spatial Layout**: Automated word wrapping, multi-line paragraph metrics, and bounding-box measurement.
- **Rich Formatting**: Out-of-the-box support for headings, bold, italic, inline code blocks, and lists.

### Implementation
- Pure Three.js geometries and shaders with instancing support
- Sub-pixel SDF text rendering with Troika Three Text and Drei
`,
    platforms: ["Web", "Desktop"],
    category: "minor",
    color: "#059669",
    tags: ["Three.js", "R3F", "TypeScript", "GSAP"],
    githubUrl: "https://github.com/Mikkareem/portfolio",
    technologies: {
      "3D & Graphics": ["Three.js", "React Three Fiber", "Drei", "WebGL"],
      Language: ["TypeScript", "GSAP", "GLSL Shaders"],
      Platforms: ["Web", "Desktop"],
    },
  },
  {
    id: "kmp-coroutines-bridge",
    title: "KMP Coroutines Bridge",
    subtitle: "Reactive state & cache management library for Kotlin Multiplatform",
    description:
      "Lightweight MVI architecture library bridging Kotlin Coroutines/Flows smoothly across Android, iOS Swift Combine, and JavaScript Web targets.",
    thumbnail: {
      image: "/images/kmp.png",
    },
    platforms: ["Android", "Ios", "Desktop"],
    category: "minor",
    color: "#db2777",
    tags: ["Kotlin", "Coroutines", "Flow", "KMP"],
    githubUrl: "https://github.com/Mikkareem",
  },
  {
    id: "compose-shimmer",
    title: "Compose Shimmer FX",
    subtitle: "Silky shimmer loading placeholder modifiers for Jetpack Compose",
    description:
      "Hardware-accelerated shader-driven skeleton shimmer animation modifiers with customizable gradients and tilt angles.",
    thumbnail: {
      image: "/images/cmp.png",
    },
    platforms: ["Android", "Desktop"],
    category: "minor",
    tags: ["Jetpack Compose", "Canvas", "Graphics"],
    githubUrl: "https://github.com/Mikkareem",
  },
  {
    id: "ktor-jwt-auth",
    title: "Ktor Auth JWT Plugin",
    subtitle: "Zero-dependency JWT & OAuth2 authorization pipeline for Ktor Server",
    description:
      "Pluggable token validation, refresh-token rotation, and role-based access control middleware for microservice architectures.",
    thumbnail: {
      image: "/images/kmp.png",
    },
    platforms: ["Web", "Desktop"],
    category: "minor",
    tags: ["Ktor", "Kotlin", "JWT", "Security"],
    githubUrl: "https://github.com/Mikkareem",
  },
  {
    id: "sqldelight-sync",
    title: "SQLDelight Sync",
    subtitle: "Optimistic offline SQLite synchronization engine with conflict resolution",
    description:
      "Lightweight delta-sync protocol enabling cross-platform mobile apps to operate fully offline and reconcile state seamlessly upon reconnecting.",
    thumbnail: {
      image: "/images/cmp.png",
    },
    platforms: ["Android", "Ios"],
    category: "minor",
    tags: ["SQLDelight", "SQLite", "KMP"],
    githubUrl: "https://github.com/Mikkareem",
  },
  {
    id: "compose-charts-canvas",
    title: "Compose Canvas Charts",
    subtitle: "Custom declarative charting library with interactive touch gestures",
    description:
      "Lightweight line, bar, pie, and candlestick charts with smooth Bezier curve interpolation and pinch-to-zoom gestures.",
    thumbnail: {
      image: "/images/cmp.png",
    },
    platforms: ["Android", "Desktop", "Web"],
    category: "minor",
    tags: ["Jetpack Compose", "Math", "DataViz"],
    githubUrl: "https://github.com/Mikkareem",
  },
];
