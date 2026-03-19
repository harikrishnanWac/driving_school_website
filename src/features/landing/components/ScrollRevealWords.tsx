'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const ScrollCar3D = dynamic(() => import('./ScrollCar3D'), { ssr: false });

const words = [
  { text: 'LEARN', color: 'from-blue-400 to-blue-600' },
  { text: 'DRIVE', color: 'from-yellow-300 to-yellow-500' },
  { text: 'RIDE', color: 'from-blue-400 to-blue-600' },
];

const WordBlock = ({
  text,
  color,
  index,
  totalWords,
  scrollYProgress,
}: {
  text: string;
  color: string;
  index: number;
  totalWords: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) => {
  const segmentSize = 1 / totalWords;
  const start = index * segmentSize;
  const mid = start + segmentSize * 0.5;
  const end = start + segmentSize;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.15, mid, end - segmentSize * 0.15, end],
    [0, 1, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, mid, end - segmentSize * 0.15, end],
    [0.3, 1, 1, 1.05, 1.15]
  );

  const blur = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, mid, end - segmentSize * 0.15, end],
    [20, 0, 0, 0, 20]
  );

  const y = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, mid, end - segmentSize * 0.15, end],
    [60, 0, 0, -20, -80]
  );

  const letterSpacing = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3, mid],
    [40, 8, 8]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      style={{ opacity }}
    >
      <motion.h2
        className={`text-[18vw] md:text-[20vw] lg:text-[22vw] font-black bg-gradient-to-b ${color} bg-clip-text text-transparent select-none leading-none drop-shadow-2xl`}
        style={{
          scale,
          y,
          letterSpacing,
          filter: useTransform(blur, (v) => `blur(${v}px)`),
          textShadow: '0 0 80px rgba(30,64,175,0.3)',
        }}
      >
        {text}
      </motion.h2>
    </motion.div>
  );
};

const ScrollRevealWords = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setProgress(v);
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const subtitleOpacity = useTransform(scrollYProgress, [0.88, 0.96], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.88, 0.96], [30, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-gray-950">
        {/* 3D Car Scene */}
        <ScrollCar3D scrollProgress={progress} />

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-gray-950/40 via-transparent to-gray-950/60" />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[5]">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
        </div>

        {/* Words */}
        {words.map((word, index) => (
          <WordBlock
            key={word.text}
            text={word.text}
            color={word.color}
            index={index}
            totalWords={words.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Progress line at bottom */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 z-20">
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              style={{ width: lineWidth }}
            />
          </div>
        </div>

        {/* Subtitle at end */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none z-20"
          style={{ opacity: subtitleOpacity, y: subtitleY }}
        >
          <p className="text-white/50 text-sm md:text-base tracking-[0.3em] uppercase font-medium">
            Your journey starts here
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]) }}
        >
          <motion.div
            className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div className="w-1 h-2 bg-white/40 rounded-full mt-1.5" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollRevealWords;
