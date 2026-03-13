'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { ChevronRight, PlayCircle } from 'lucide-react';
import * as motion from 'framer-motion/client';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2070')" }}
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
        <div className="max-w-3xl text-center md:text-left pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-secondary/90 text-gray-900 font-bold text-sm mb-6 uppercase tracking-wider shadow-lg">
              #1 Driving School in Town
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Drive <span className="text-secondary">Safe</span>,<br/> Drive Smart.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto md:mx-0"
          >
            Learn to drive with confidence. Our certified instructors provide modern training in safe, dual-control vehicles to ensure you pass your driving test on the first try.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <a href="#packages" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 group shadow-lg shadow-primary/20">
                Enroll Now <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#contact" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-white/5 border-white text-white hover:bg-white/20 hover:text-white backdrop-blur-sm shadow-md">
                <PlayCircle size={20} /> Book a Trial Class
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
