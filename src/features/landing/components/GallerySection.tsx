'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GalleryBackground } from './SectionBackgrounds';

const images = [
  { src: "https://images.unsplash.com/photo-1606778465053-5290a2fc7225?auto=format&fit=crop&q=80&w=800", alt: "Students learning driving", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800", alt: "Training vehicles", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800", alt: "Driving practice", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800", alt: "Modern cars", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" }
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      <GalleryBackground />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-2 text-primary font-bold tracking-wider uppercase text-sm">Action Gallery</div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Inside Our Training
          </h2>
          <p className="text-gray-600 text-lg">
            Take a look at our modern vehicles and facilities. Experience the professional environment where our students become confident drivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((image, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-2xl group ${image.colSpan} ${image.rowSpan}`}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h4 className="text-white font-semibold text-lg">{image.alt}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
