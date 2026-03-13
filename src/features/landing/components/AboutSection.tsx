'use client';

import React from 'react';
import { Award, Clock, ShieldCheck, Car } from 'lucide-react';

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
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2 relative w-full">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000" 
                alt="Student learning to drive" 
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-2 md:bottom-10 md:-right-10 bg-primary text-white p-8 rounded-3xl shadow-xl z-20">
              <div className="text-4xl font-bold mb-1">12+</div>
              <div className="text-sm font-medium text-blue-100">Years of<br/>Experience</div>
            </div>
            {/* Background Pattern */}
            <div className="absolute top-10 -left-6 md:-left-10 w-full h-full border-4 border-secondary rounded-3xl z-0"></div>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="mb-2 text-primary font-bold tracking-wider uppercase text-sm">About Our School</div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              We empower learners to master the road with confidence.
            </h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              At SafeDrive, we believe that driving is a life skill. Our comprehensive curriculum goes beyond basic operation, focusing on road awareness, defensive driving, and building the lifelong habits necessary for true safety on the modern road.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: 'group-hover:text-white transition-colors duration-300' })}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
