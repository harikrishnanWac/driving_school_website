'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { GalleryBackground } from './SectionBackgrounds';
import TextReveal from './TextReveal';

const images = [
  { src: "https://images.unsplash.com/photo-1606778465053-5290a2fc7225?auto=format&fit=crop&q=80&w=800", alt: "Students learning driving", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800", alt: "Training vehicles", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800", alt: "Driving practice", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800", alt: "Modern cars", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" }
];

const Lightbox = ({
  imageIndex,
  onClose,
  onPrev,
  onNext
}: {
  imageIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10 p-2">
        <X size={28} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
      >
        <ChevronLeft size={28} />
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={imageIndex}
          src={images[imageIndex].src.replace('w=800', 'w=1400')}
          alt={images[imageIndex].alt}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: -20 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
      >
        <ChevronRight size={28} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === imageIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

const GallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const handlePrev = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev - 1 + images.length) % images.length : null);
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev + 1) % images.length : null);
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <GalleryBackground />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="mb-2 text-primary font-bold tracking-wider uppercase text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Action Gallery
          </motion.div>
          <TextReveal className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Inside Our Training
          </TextReveal>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Take a look at our modern vehicles and facilities. Experience the professional environment where our students become confident drivers.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]"
          style={{ y: gridY }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${image.colSpan} ${image.rowSpan}`}
              onClick={() => setLightboxIndex(index)}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full flex items-end justify-between">
                  <motion.h4
                    className="text-white font-semibold text-lg"
                    initial={{ y: 10 }}
                    whileInView={{ y: 0 }}
                  >
                    {image.alt}
                  </motion.h4>
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm p-2.5 rounded-full"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ZoomIn size={20} className="text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            imageIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
