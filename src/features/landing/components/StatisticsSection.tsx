'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Users, Calendar, Award, TrendingUp } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { StatisticsBackground } from './SectionBackgrounds';
import dynamic from 'next/dynamic';

const StatisticsTrack = dynamic(() => import('./StatisticsTrack'), { ssr: false });

const stats = [
  { icon: <Users size={32} />, value: 2500, suffix: "+", label: "Students Trained", progress: 85 },
  { icon: <Calendar size={32} />, value: 12, suffix: "", label: "Years Experience", progress: 60 },
  { icon: <Award size={32} />, value: 15, suffix: "", label: "Certified Trainers", progress: 75 },
  { icon: <TrendingUp size={32} />, value: 98, suffix: "%", label: "Test Pass Rate", progress: 98 }
];

const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const totalSteps = 60;
      const stepTime = duration / totalSteps;
      const valueIncrement = value / totalSteps;

      const timer = setInterval(() => {
        start += 1;
        setCount(prev => {
          if (start >= totalSteps) {
            clearInterval(timer);
            return value;
          }
          return Math.min(Math.floor(prev + valueIncrement), value);
        });
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
      {count}{suffix}
    </span>
  );
};

const ProgressRing = ({ progress, isInView }: { progress: number; isInView: boolean }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
      <motion.circle
        cx="40" cy="40" r={radius}
        fill="none"
        stroke="rgba(234,179,8,0.6)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={isInView ? { strokeDashoffset: offset } : {}}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
      />
    </svg>
  );
};

const StatisticsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgX = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-primary">
      {/* Background Decor with parallax */}
      <motion.div className="absolute inset-0 opacity-10 pointer-events-none" style={{ x: bgX }}>
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
      </motion.div>
      <StatisticsBackground />
      <Suspense fallback={null}>
        <StatisticsTrack />
      </Suspense>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.08, y: -8 }}
            >
              <div className="relative w-20 h-20 mx-auto mb-6">
                <ProgressRing progress={stat.progress} isInView={isInView} />
                <div className="absolute inset-0 bg-white/10 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-white/20 transition-all duration-300 shadow-xl backdrop-blur-sm">
                  {stat.icon}
                </div>
              </div>
              <div className="mb-3">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <motion.p
                className="text-blue-100 font-medium text-lg tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                viewport={{ once: true }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
