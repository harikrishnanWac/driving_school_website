'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Users, Calendar, Award, TrendingUp } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { StatisticsBackground } from './SectionBackgrounds';

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
      <circle
        cx="40"
        cy="40"
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="3"
      />
      <motion.circle
        cx="40"
        cy="40"
        r={radius}
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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-primary">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
      </div>
      <StatisticsBackground />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-20 h-20 mx-auto mb-6">
                <ProgressRing progress={stat.progress} isInView={isInView} />
                <div className="absolute inset-0 bg-white/10 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-sm">
                  {stat.icon}
                </div>
              </div>
              <div className="mb-3">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-blue-100 font-medium text-lg tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
