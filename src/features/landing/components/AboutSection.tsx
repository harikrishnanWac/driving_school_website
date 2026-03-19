'use client';

import React, { useRef } from 'react';
import { Award, Clock, ShieldCheck, Car } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const badgeRotate = useTransform(scrollYProgress, [0.2, 0.6], [-15, 5]);
  const badgeScale = useTransform(scrollYProgress, [0.2, 0.5], [0.5, 1]);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-32 bg-white overflow-hidden relative">
      <AboutBackground />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          <div ref={imageRef} className="lg:w-1/2 relative w-full">
            <motion.div
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
              style={{ y: imageY, scale: imageScale }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000"
                alt="Student learning to drive"
                className="w-full h-[500px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
            </motion.div>
            {/* Experience Badge */}
            <motion.div
              className="absolute -bottom-6 -right-2 md:bottom-10 md:-right-10 bg-primary text-white p-8 rounded-3xl shadow-xl z-20"
              style={{ rotate: badgeRotate, scale: badgeScale }}
              whileHover={{ scale: 1.15, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl font-bold mb-1">12+</div>
              <div className="text-sm font-medium text-blue-100">Years of<br/>Experience</div>
            </motion.div>
            {/* Background Pattern */}
            <div className="absolute top-10 -left-6 md:-left-10 w-full h-full border-4 border-secondary rounded-3xl z-0"></div>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <motion.div
              className="mb-2 text-primary font-bold tracking-wider uppercase text-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              About Our School
            </motion.div>

            <TextReveal
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              We empower learners to master the road with confidence.
            </TextReveal>

            <motion.p
              className="text-gray-600 mb-10 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              At SafeDrive, we believe that driving is a life skill. Our comprehensive curriculum goes beyond basic operation, focusing on road awareness, defensive driving, and building the lifelong habits necessary for true safety on the modern road.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 group cursor-pointer"
                  initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  viewport={{ once: true, margin: "-50px" }}
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
  );
};

export default AboutSection;
