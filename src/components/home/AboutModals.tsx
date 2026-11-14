import { useEffect } from "react";
import { Html } from "@react-three/drei";

export type ActiveModalType = "about" | "articles" | null;

interface AboutModalsProps {
  activeModal: ActiveModalType;
  onClose: () => void;
}

export function AboutModals({ activeModal, onClose }: AboutModalsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (activeModal) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  return (
    <Html portal={{ current: document.body }}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onWheel={(e) => e.stopPropagation()}
      >
        {activeModal === "about" && (
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900/95 border border-purple-500/30 rounded-2xl p-6 sm:p-8 text-white shadow-2xl shadow-purple-500/10">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
                About Mohamed Irsath Kareem
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Full Stack & Mobile Engineer
            </h2>
            <p className="text-sm text-purple-300 mb-6 font-medium">
              Chennai, India • 7+ Years Experience • Cross-Platform & Cloud
            </p>

            {/* Bio Content */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              <p>
                I build modern software from mobile devices to cloud backends. My core focus
                revolves around <strong className="text-white">Kotlin Multiplatform</strong>,{" "}
                <strong className="text-white">Compose Multiplatform</strong>, and reactive{" "}
                <strong className="text-white">Spring Boot & Ktor</strong> microservices.
              </p>
              <p>
                Throughout my 7+ years in the industry, I have led microservices migrations
                that slashed API latency by 45%, architected scalable mobile platforms handling
                millions of operations, and automated production Kubernetes CI/CD pipelines
                achieving 99.9% uptime.
              </p>
            </div>

            {/* Core Competencies */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Key Technologies & Paradigms
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Kotlin Multiplatform",
                  "Compose Multiplatform",
                  "Android (Jetpack Compose)",
                  "React / TypeScript",
                  "Three.js / React Three Fiber",
                  "Spring Boot & Ktor",
                  "PostgreSQL & Redis",
                  "Docker & Kubernetes",
                  "CI/CD (GitHub Actions)",
                  "Clean Architecture & MVVM",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Timeline Highlights */}
            <div className="mb-6 border-t border-slate-800 pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Career Highlights
              </h3>
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="border-l-2 border-purple-500/40 pl-4">
                  <div className="font-semibold text-white">Lead Full Stack & Mobile Engineer</div>
                  <div className="text-purple-400 text-xs">Enterprise Solutions • 2024 – Present</div>
                  <div className="text-slate-400 mt-1">Cross-platform Kotlin Multiplatform & microservices architect.</div>
                </div>
                <div className="border-l-2 border-blue-500/40 pl-4">
                  <div className="font-semibold text-white">Senior Android & Backend Engineer</div>
                  <div className="text-blue-400 text-xs">NextGen Technologies • 2022 – 2023</div>
                  <div className="text-slate-400 mt-1">High-throughput reactive services and Compose mobile platforms.</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
              <a
                href="https://github.com/Mikkareem"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Visit GitHub Profile</span>
                <span>↗</span>
              </a>
              <a
                href="mailto:mohdirsath1997@gmail.com"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Get in Touch</span>
                <span>✉</span>
              </a>
              <button
                onClick={onClose}
                className="ml-auto px-4 py-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {activeModal === "articles" && (
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900/95 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 text-white shadow-2xl shadow-emerald-500/10">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                Technical Articles & Case Studies
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              My Articles & Publications
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Engineering guides, architectural deep-dives, and production case studies.
            </p>

            {/* Articles List */}
            <div className="space-y-4 mb-6">
              {[
                {
                  title: "Architecting Cross-Platform Apps with Kotlin Multiplatform (KMP)",
                  category: "Mobile Architecture",
                  date: "Featured Article",
                  desc: "Designing clean domain layers, SQLDelight persistence, and unified networking shared between Android, iOS, and Web.",
                  tag: "Kotlin",
                },
                {
                  title: "Declarative UI Engineering with Compose Multiplatform",
                  category: "Modern UI/UX",
                  date: "Case Study",
                  desc: "Creating responsive, platform-adaptive components and smooth state management across mobile and desktop.",
                  tag: "Compose",
                },
                {
                  title: "High-Performance Reactive Microservices with Ktor & Spring Boot",
                  category: "Backend Systems",
                  date: "Backend Guide",
                  desc: "Leveraging Kotlin Coroutines, asynchronous I/O, and Redis caching to achieve sub-millisecond API response times.",
                  tag: "Microservices",
                },
                {
                  title: "Zero-Downtime Deployment & CI/CD with Kubernetes and GitHub Actions",
                  category: "Cloud & DevOps",
                  date: "DevOps Insights",
                  desc: "Automating Docker container builds, Helm chart versioning, and ArgoCD GitOps pipelines for 99.9% uptime.",
                  tag: "DevOps",
                },
              ].map((article, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-1">
                    <span>{article.category}</span>
                    <span className="text-slate-400 text-[11px]">{article.date}</span>
                  </div>
                  <h3 className="font-semibold text-white text-base mb-1.5">
                    {article.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                    {article.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {article.tag}
                    </span>
                    <a
                      href="https://github.com/Mikkareem"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read on GitHub / Repos</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
              <a
                href="https://github.com/Mikkareem"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Code on GitHub</span>
                <span>↗</span>
              </a>
              <button
                onClick={onClose}
                className="ml-auto px-4 py-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Html>
  );
}
