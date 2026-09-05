import React from 'react';
import { motion } from 'motion/react';
import { FolderSearch, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data',
  description = 'No items found matching the selected filter.',
  onReset,
  resetLabel = 'Reset Filter',
  icon,
}) => {
  return (
    <motion.div
      id="empty-state-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full py-16 px-6 rounded-2xl glass-panel border border-white/10 overflow-hidden flex flex-col items-center justify-center text-center space-y-5"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Icon with glowing badge */}
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-black/20 text-brand-primary">
        <div className="absolute inset-0 rounded-2xl bg-brand-primary/10 blur-sm pointer-events-none" />
        {icon || <FolderSearch className="w-8 h-8 text-brand-primary relative z-10" />}
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-2 max-w-md">
        <h3 id="empty-state-title" className="text-xl font-display font-bold text-white tracking-tight">
          {title}
        </h3>
        <p id="empty-state-desc" className="text-sm text-text-muted leading-relaxed font-sans">
          {description}
        </p>
      </div>

      {/* Action CTA */}
      {onReset && (
        <div className="relative z-10 pt-2">
          <button
            id="empty-state-reset-btn"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-brand-primary/15 border border-white/10 hover:border-brand-primary/40 text-text-muted hover:text-brand-primary text-xs font-mono font-semibold transition-all duration-300 group cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-45 transition-transform duration-300" />
            <span>{resetLabel}</span>
          </button>
        </div>
      )}
    </motion.div>
  );
};
