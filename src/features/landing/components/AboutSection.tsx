'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Award, Clock, ShieldCheck, Car } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { AboutBackground } from './SectionBackgrounds';
import TextReveal from './TextReveal';

const features = [
  {
    icon: <Award className="text-primary" size={32} />,
    title: "Experienced Trainers",
    description: "Learn from 15+ certified professionals with over a decade of teaching experience."
  },
  {
    icon: <Car className="text-primary" size={32} />,
    title: "Modern Cars",
    description: "Train in our fleet of safe, well-maintained dual-control modern vehicles."
  },
  {
    icon: <ShieldCheck className="text-primary" size={32} />,
    title: "Safety First",
    description: "We prioritize defensive driving techniques to ensure lifelong road safety."
  },
  {
    icon: <Clock className="text-primary" size={32} />,
    title: "Flexible Timing",
    description: "We offer weekend and evening classes completely tailored to your schedule."
  }
];

const ROAD1 = "M-50,100 Q200,50 400,200 T800,150 T1200,250 T1600,100";
const ROAD2 = "M-50,400 Q300,350 500,500 T900,400 T1400,550 T1800,350";

const ScrollCar = ({ pathD, progress, color, roofColor, opacity }: {
  pathD: string;
  progress: number;
  color: string;
  roofColor: string;
  opacity: number;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pos, setPos] = useState({ x: -50, y: 100, angle: 0 });

  const update = useCallback(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    const p = pathRef.current.getPointAtLength(progress * len);
    const ahead = pathRef.current.getPointAtLength(Math.min(progress * len + 5, len));
    const angle = Math.atan2(ahead.y - p.y, ahead.x - p.x) * (180 / Math.PI);
    setPos({ x: p.x, y: p.y, angle });
  }, [progress]);

  useEffect(() => { update(); }, [update]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" preserveAspectRatio="none">
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />
      <g transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.angle})`} opacity={opacity}>
        <rect x="-12" y="-6" width="24" height="12" rx="4" fill={color} />
        <rect x="1" y="-4.5" width="7" height="9" rx="2" fill="#60a5fa" opacity="0.6" />
        <rect x="-4" y="-8.5" width="9" height="3" rx="1.5" fill={roofColor} />
        <circle cx="-7" cy="-6.5" r="2.2" fill="#1f2937" />
        <circle cx="-7" cy="6.5" r="2.2" fill="#1f2937" />
        <circle cx="7" cy="-6.5" r="2.2" fill="#1f2937" />
        <circle cx="7" cy="6.5" r="2.2" fill="#1f2937" />
        <circle cx="12" cy="-3.5" r="1.5" fill="#fef08a" />
        <circle cx="12" cy="3.5" r="1.5" fill="#fef08a" />
      </g>
    </svg>
  );
};

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setScrollProgress(v));

  // Content reveals tied to scroll/car progress
  const imageOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const imageY = useTransform(scrollYProgress, [0, 0.15], [50, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.2], [0.92, 1]);
  const badgeRotate = useTransform(scrollYProgress, [0.15, 0.3], [-15, 5]);
  const badgeScale = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.1, 0.25], [30, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const f0Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const f0Y = useTransform(scrollYProgress, [0.35, 0.45], [25, 0]);
  const f1Opacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);
  const f1Y = useTransform(scrollYProgress, [0.42, 0.52], [25, 0]);
  const f2Opacity = useTransform(scrollYProgress, [0.49, 0.59], [0, 1]);
  const f2Y = useTransform(scrollYProgress, [0.49, 0.59], [25, 0]);
  const f3Opacity = useTransform(scrollYProgress, [0.56, 0.66], [0, 1]);
  const f3Y = useTransform(scrollYProgress, [0.56, 0.66], [25, 0]);

  const featureAnim = [
    { opacity: f0Opacity, y: f0Y },
    { opacity: f1Opacity, y: f1Y },
    { opacity: f2Opacity, y: f2Y },
    { opacity: f3Opacity, y: f3Y },
  ];

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        <section id="about" className="h-full relative">
          <AboutBackground />
          <ScrollCar pathD={ROAD1} progress={scrollProgress} color="#1e40af" roofColor="#eab308" opacity={0.35} />
          <ScrollCar pathD={ROAD2} progress={Math.min(scrollProgress * 1.3, 1)} color="#ca8a04" roofColor="#fef08a" opacity={0.25} />

          <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex items-center">
            <div className="flex flex-col lg:flex-row gap-16 items-center w-full">

              <motion.div className="lg:w-1/2 relative w-full" style={{ opacity: imageOpacity, y: imageY }}>
                <motion.div
                  className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
                  style={{ scale: imageScale }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200"
                    alt="Professional driving instructor teaching a student in a modern car"
                    className="w-full h-[500px] object-cover"
                  />
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -right-2 md:bottom-10 md:-right-10 bg-primary text-white p-8 rounded-3xl shadow-xl z-20"
                  style={{ scale: badgeScale, rotate: badgeRotate }}
                >
                  <div className="text-4xl font-bold mb-1">12+</div>
                  <div className="text-sm font-medium text-blue-100">Years of<br/>Experience</div>
                </motion.div>
                <div className="absolute top-10 -left-6 md:-left-10 w-full h-full border-4 border-secondary rounded-3xl z-0"></div>
              </motion.div>

              <div className="lg:w-1/2 mt-12 lg:mt-0">
                <motion.div
                  className="mb-2 text-primary font-bold tracking-wider uppercase text-sm"
                  style={{ opacity: headingOpacity, y: headingY }}
                >
                  About Our School
                </motion.div>

                <motion.div style={{ opacity: headingOpacity, y: headingY }}>
                  <TextReveal
                    className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                  >
                    We empower learners to master the road with confidence.
                  </TextReveal>
                </motion.div>

                <motion.p
                  className="text-gray-600 mb-10 text-lg leading-relaxed"
                  style={{ opacity: descOpacity }}
                >
                  At SafeDrive, we believe that driving is a life skill. Our comprehensive curriculum goes beyond basic operation, focusing on road awareness, defensive driving, and building the lifelong habits necessary for true safety on the modern road.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4 group cursor-pointer"
                      style={{ opacity: featureAnim[index].opacity, y: featureAnim[index].y }}
                      whileHover={{ x: 8, transition: { duration: 0.2 } }}
                    >
                      <motion.div
                        className="flex-shrink-0 w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                        whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: 'group-hover:text-white transition-colors duration-300' })}
                      </motion.div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{feature.title}</h4>
                        <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutSection;
