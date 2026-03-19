'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const MouseGlow = () => {
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 150, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [x, y, visible]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[60] w-[500px] h-[500px] rounded-full"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(30,64,175,0.06) 0%, rgba(234,179,8,0.03) 40%, transparent 70%)',
        opacity: visible ? 1 : 0,
      }}
    />
  );
};

export default MouseGlow;
