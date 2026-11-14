import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { MAJOR_PROJECTS, MINOR_PROJECTS, type ProjectDetail } from "./projects-data";

export type ProjectsModalCategory = "major" | "minor" | "all";

interface ProjectsModalProps {
  initialCategory?: ProjectsModalCategory;
  onClose: () => void;
}

export function ProjectsModal({
  initialCategory = "all",
  onClose,
}: ProjectsModalProps) {
  const [activeTab, setActiveTab] = useState<ProjectsModalCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setActiveTab(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const allProjects = [...MAJOR_PROJECTS, ...MINOR_PROJECTS];
  const filteredProjects = allProjects.filter((p) => {
    if (activeTab !== "all" && p.category !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchSub = p.subtitle.toLowerCase().includes(q);
      const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchSub || matchTag;
    }
    return true;
  });

  return (
    <Html portal={{ current: document.body }}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl text-white overflow-hidden">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
                <span className="text-xs uppercase tracking-wider text-purple-400 font-bold">
                  Portfolio Catalog
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                All Projects ({allProjects.length}+ Total)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Filter Bar & Search */}
          <div className="p-4 sm:px-6 bg-slate-950/40 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {(["all", "major", "minor"] as const).map((tab) => {
                const count =
                  tab === "all"
                    ? allProjects.length
                    : tab === "major"
                    ? MAJOR_PROJECTS.length
                    : MINOR_PROJECTS.length;
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                        : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    {tab === "all"
                      ? `All (${count})`
                      : tab === "major"
                      ? `Major (${count})`
                      : `Minor (${count})`}
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              placeholder="Search by name, tech or platform..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Projects Grid List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {filteredProjects.map((project: ProjectDetail) => (
              <div
                key={project.id}
                className="p-4 sm:p-5 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-purple-500/40 transition-colors flex flex-col sm:flex-row gap-4 items-start"
              >
                {/* Thumbnail / Badge */}
                <div className="w-full sm:w-44 h-28 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0 relative border border-slate-700/40">
                  {project.thumbnail.image ? (
                    <img
                      src={project.thumbnail.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-slate-900 text-purple-400 text-xs font-semibold">
                      {project.title}
                    </div>
                  )}
                  <span
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      project.category === "major"
                        ? "bg-purple-600/90 text-white"
                        : "bg-cyan-600/90 text-white"
                    }`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {project.title}
                    </h3>
                    <div className="flex gap-1.5">
                      {project.platforms.map((plat) => (
                        <span
                          key={plat}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-700 text-slate-200"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-purple-300 font-medium mb-1.5">
                    {project.subtitle}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-700/40">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-900 text-slate-300 border border-slate-700/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Repository</span>
                          <span>↗</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Live Demo</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">
                No projects matched your search criteria.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 sm:px-6 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
            <a
              href="https://github.com/Mikkareem?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore all repositories on GitHub</span>
              <span>↗</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm text-slate-200 font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Html>
  );
}
