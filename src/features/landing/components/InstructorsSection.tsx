'use client';

import React, { useRef } from 'react';
import Card from '@/components/ui/Card';
import { Award, Clock } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { InstructorsBackground } from './SectionBackgrounds';
import TextReveal from './TextReveal';

const instructors = [
  {
    name: "James Mitchell",
    role: "Lead Instructor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=500",
    experience: 15,
    certifications: ["ADI Certified", "First Aid"],
    specialties: ["Highway Driving", "Test Preparation"]
  },
  {
    name: "Priya Sharma",
    role: "Senior Instructor",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500",
    experience: 10,
    certifications: ["ADI Certified", "Defensive Driving"],
    specialties: ["Nervous Beginners", "Night Driving"]
  },
  {
    name: "David Park",
    role: "Highway Specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=500",
    experience: 12,
    certifications: ["ADI Certified", "Advanced Driving"],
    specialties: ["Highway Driving", "Defensive Driving"]
  },
  {
    name: "Emily Chen",
    role: "Refresher Expert",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=500",
    experience: 8,
    certifications: ["ADI Certified", "EV Specialist"],
    specialties: ["Refresher Courses", "Automatic Vehicles"]
  }
];

const InstructorsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="instructors" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      <motion.div style={{ y: bgY }}>
        <InstructorsBackground />
      </motion.div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="mb-2 text-primary font-bold tracking-wider uppercase text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Team
          </motion.div>
          <TextReveal className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Instructors
          </TextReveal>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Our certified professionals bring years of experience and passion to every lesson, ensuring you learn with confidence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card hoverEffect className="h-full group">
                <div className="relative overflow-hidden">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {instructor.specialties.map((specialty, idx) => (
                      <span key={idx} className="bg-white/90 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{instructor.name}</h3>
                  <p className="text-primary font-medium text-sm mb-4">{instructor.role}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <Clock size={14} />
                      <span>{instructor.experience}+ Years</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {instructor.certifications.map((cert, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 bg-indigo-50 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                        <Award size={12} />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
