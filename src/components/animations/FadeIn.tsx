import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  scale?: boolean;
  key?: any;
}

export const FadeIn = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  scale = false,
}: FadeInProps) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
    scale: scale ? 0.92 : 1,
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier matching Linear website
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({
  children,
  delayChildren = 0,
  staggerBy = 0.1,
}: {
  children: ReactNode;
  delayChildren?: number;
  staggerBy?: number;
  key?: any;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerBy,
            delayChildren: delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children }: { children: ReactNode; key?: any }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 25 } },
      }}
    >
      {children}
    </motion.div>
  );
};
