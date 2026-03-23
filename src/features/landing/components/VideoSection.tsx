'use client';

import React, { useState, useRef } from 'react';
import { Play, Clock } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { VideoBackground } from './SectionBackgrounds';
import TextReveal from './TextReveal';

const videos = [
  {
    title: "A Day at SafeDrive",
    thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800&h=450",
    duration: "3:24",
    description: "Follow a typical day of learning at SafeDrive Driving School."
  },
  {
    title: "Highway Training Tips",
    thumbnail: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800&h=450",
    duration: "5:12",
    description: "Essential highway driving techniques from our expert instructors."
  },
  {
    title: "Parallel Parking Made Easy",
    thumbnail: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800&h=450",
    duration: "4:08",
    description: "Master parallel parking with our step-by-step guide."
  },
  {
    title: "Night Driving Essentials",
    thumbnail: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=800&h=450",
    duration: "6:30",
    description: "Stay safe on the road after dark with these essential tips."
  }
];

const VideoSection = () => {
  const [featured, setFeatured] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="videos" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <motion.div style={{ y: bgY }}>
        <VideoBackground />
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
            Watch & Learn
          </motion.div>
          <TextReveal className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            See Us In Action
          </TextReveal>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Watch how our instructors help students build confidence behind the wheel with proven training methods.
          </motion.p>
        </div>

        {/* Featured Video */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={featured}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer group"
            >
              <img
                src={videos[featured].thumbnail}
                alt={videos[featured].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:bg-white transition-colors"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Play size={32} className="text-primary ml-1.5" fill="currentColor" />
                </motion.div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{videos[featured].title}</h3>
                <p className="text-white/80 text-sm md:text-base mb-3">{videos[featured].description}</p>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Clock size={14} />
                  <span>{videos[featured].duration}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Thumbnail Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map((video, index) => (
            <motion.button
              key={index}
              onClick={() => setFeatured(index)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative aspect-video rounded-xl overflow-hidden group text-left transition-all duration-300 ${
                featured === index
                  ? 'ring-3 ring-primary ring-offset-2 shadow-lg'
                  : 'hover:ring-2 hover:ring-gray-200'
              }`}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <Play size={16} className="text-primary ml-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-medium truncate">{video.title}</p>
                <span className="text-white/60 text-xs">{video.duration}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
