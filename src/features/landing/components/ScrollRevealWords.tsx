'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion';
import { BookOpen, ShieldCheck, Car, Users, Route, MapPin, Award, Timer, Gauge, type LucideIcon } from 'lucide-react';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

const ScrollObject3D = dynamic(() => import('./ScrollObject3D'), { ssr: false });

const sections = [
  {
    word: 'LEARN',
    label: '01',
    tagline: 'Master the fundamentals',
    description: 'Build a rock-solid foundation with our structured curriculum. From traffic rules to road awareness, we ensure you understand every aspect before getting behind the wheel.',
    color: 'from-primary to-blue-600',
    accentColor: 'bg-primary',
    features: [
      { icon: BookOpen, title: 'Theory Classes', desc: 'Comprehensive road rules & signs' },
      { icon: ShieldCheck, title: 'Safety Training', desc: 'Defensive driving techniques' },
      { icon: Users, title: 'Expert Instructors', desc: '15+ certified professionals' },
    ],
  },
  {
    word: 'DRIVE',
    label: '02',
    tagline: 'Practice with confidence',
    description: 'Get real road experience in our modern dual-control vehicles. Our step-by-step approach builds your skills progressively — from parking lots to highways.',
    color: 'from-yellow-500 to-secondary-hover',
    accentColor: 'bg-secondary',
    features: [
      { icon: Car, title: 'Modern Fleet', desc: 'Dual-control vehicles for safety' },
      { icon: Timer, title: 'Flexible Hours', desc: 'Weekends & evenings available' },
      { icon: Gauge, title: 'Progressive Training', desc: 'From basics to highway driving' },
    ],
  },
  {
    word: 'RIDE',
    label: '03',
    tagline: 'Own the road',
    description: 'Graduate with the skills and confidence to drive anywhere. Our students achieve a 98% first-attempt pass rate and become lifelong safe drivers.',
    color: 'from-primary to-blue-600',
    accentColor: 'bg-primary',
    features: [
      { icon: Award, title: '98% Pass Rate', desc: 'First-attempt test success' },
      { icon: Route, title: 'Highway Ready', desc: 'City & interstate confidence' },
      { icon: MapPin, title: 'License Support', desc: 'Full DMV guidance included' },
    ],
  },
];

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  accentColor,
  scrollYProgress,
  enterAt,
  exitAt,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  accentColor: string;
  scrollYProgress: MotionValue<number>;
  enterAt: [number, number];
  exitAt: [number, number];
}) => {
  const cardOpacity = useTransform(
    scrollYProgress,
    [enterAt[0], enterAt[1], exitAt[0], exitAt[1]],
    [0, 1, 1, 0]
  );
  const cardY = useTransform(
    scrollYProgress,
    [enterAt[0], enterAt[1]],
    [25, 0]
  );

  return (
    <motion.div
      className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/80 backdrop-blur-sm border border-gray-100"
      style={{ opacity: cardOpacity, y: cardY }}
    >
      <div className={`w-11 h-11 ${accentColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h4 className="text-gray-900 font-bold text-sm">{title}</h4>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
    </motion.div>
  );
};

const SectionBlock = ({
  section,
  index,
  totalSections,
  scrollYProgress,
}: {
  section: typeof sections[0];
  index: number;
  totalSections: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const segSize = 1 / totalSections;
  const start = index * segSize;
  const enterEnd = start + segSize * 0.25;
  const holdStart = enterEnd;
  const holdEnd = start + segSize * 0.75;
  const exitEnd = start + segSize;

  // Phase 1: Word appears (0% - 20%)
  // Phase 2: Details fade in (20% - 45%)
  // Phase 3: Hold (45% - 70%)
  // Phase 4: Everything exits (70% - 100%)

  const wordOpacity = useTransform(
    scrollYProgress,
    [start, start + segSize * 0.12, start + segSize * 0.2, holdEnd, exitEnd - segSize * 0.1, exitEnd],
    [0, 1, 1, 1, 1, 0]
  );
  const wordScale = useTransform(
    scrollYProgress,
    [start, start + segSize * 0.15, start + segSize * 0.2, holdEnd, exitEnd],
    [0.6, 1, 1, 1, 1.06]
  );
  const wordY = useTransform(
    scrollYProgress,
    [start, start + segSize * 0.15, holdEnd, exitEnd],
    [40, 0, 0, -40]
  );
  const wordBlurFilter = useTransform(
    scrollYProgress,
    [start, start + segSize * 0.15, holdEnd, exitEnd],
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)']
  );

  // Details come in AFTER the word is visible
  const contentOpacity = useTransform(
    scrollYProgress,
    [start + segSize * 0.22, start + segSize * 0.38, holdEnd - segSize * 0.05, exitEnd - segSize * 0.12],
    [0, 1, 1, 0]
  );
  const contentX = useTransform(
    scrollYProgress,
    [start + segSize * 0.22, start + segSize * 0.38, holdEnd, exitEnd - segSize * 0.1],
    [50, 0, 0, -30]
  );

  // Feature cards come in even later, one by one
  const featureDelays = [0.32, 0.38, 0.44];

  return (
    <motion.div
      className="absolute inset-0 flex items-center pointer-events-none z-10"
      style={{ opacity: wordOpacity }}
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

        {/* Left: Large word + label */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
          <motion.div
            className="flex items-center gap-3 mb-4"
            style={{ opacity: contentOpacity }}
          >
            <div className={`w-8 h-[2px] ${section.accentColor} rounded-full`} />
            <span className="text-gray-400 text-xs font-mono tracking-[0.3em] uppercase">
              {section.label} / 03
            </span>
          </motion.div>

          <motion.h2
            className={`text-[22vw] md:text-[16vw] lg:text-[14vw] font-black bg-gradient-to-br ${section.color} bg-clip-text text-transparent select-none leading-[0.85] tracking-tight`}
            style={{
              scale: wordScale,
              y: wordY,
              filter: wordBlurFilter,
            }}
          >
            {section.word}
          </motion.h2>

          <motion.p
            className="text-gray-400 text-sm md:text-base tracking-[0.2em] uppercase font-medium mt-3"
            style={{ opacity: contentOpacity }}
          >
            {section.tagline}
          </motion.p>
        </div>

        {/* Right: Content panel */}
        <motion.div
          className="lg:w-1/2 max-w-lg"
          style={{ opacity: contentOpacity, x: contentX }}
        >
          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8">
            {section.description}
          </p>

          <div className="space-y-4">
            {section.features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
                accentColor={section.accentColor}
                scrollYProgress={scrollYProgress}
                enterAt={[
                  start + segSize * featureDelays[idx],
                  start + segSize * (featureDelays[idx] + 0.1),
                ]}
                exitAt={[holdEnd, exitEnd - segSize * 0.1]}
              />
            ))}
          </div>
        </motion.div>

      </div>
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
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">

        {/* Grid lines background */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(30,64,175,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30,64,175,0.035) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
        </div>

        {/* Edge vignette */}
        <div className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,0.7) 100%)' }}
        />

        {/* Top/bottom blending */}
        <div className="absolute inset-0 z-[3] pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* 3D Object — background right side */}
        <div className="absolute right-0 top-0 w-[55%] h-full z-[4] opacity-[0.18] hidden lg:block pointer-events-none">
          <ErrorBoundary>
            <ScrollObject3D scrollProgress={progress} />
          </ErrorBoundary>
        </div>

        {/* Section blocks */}
        {sections.map((section, index) => (
          <SectionBlock
            key={section.word}
            section={section}
            index={index}
            totalSections={sections.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Vertical progress line — left edge */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 h-32 z-20">
          <div className="w-[2px] h-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-primary to-secondary rounded-full"
              style={{ height: lineWidth }}
            />
          </div>
        </div>

        {/* Scroll indicator — only at start */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-gray-300 text-xs tracking-[0.25em] uppercase">Scroll to discover</span>
            <div className="w-5 h-8 border-2 border-gray-200 rounded-full flex justify-center">
              <motion.div className="w-1 h-2 bg-gray-300 rounded-full mt-1.5" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollRevealWords;
