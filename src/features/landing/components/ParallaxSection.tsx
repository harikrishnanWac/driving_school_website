'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // -1 to 1, negative = slower, positive = faster
  scale?: boolean;
  fade?: boolean;
}

const ParallaxSection = ({
  children,
  className = '',
  speed = 0.3,
  scale = false,
  fade = false,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{
          y,
          ...(scale ? { scale: scaleValue } : {}),
          ...(fade ? { opacity } : {}),
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
