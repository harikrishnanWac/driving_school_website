'use client';

import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { src: "https://images.unsplash.com/photo-1600320844678-460539823188?auto=format&fit=crop&q=80&w=800", alt: "Student learning to drive with instructor", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&q=80&w=800", alt: "Instructor mentoring a new driver", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800", alt: "Hands-on driving practice", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800", alt: "Our training vehicles", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" }
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
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
