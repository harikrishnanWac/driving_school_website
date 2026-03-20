'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Card from '@/components/ui/Card';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { TestimonialsBackground } from './SectionBackgrounds';
import TextReveal from './TextReveal';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Passed on 1st Attempt",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    review: "The instructors are amazingly patient and detail-oriented. The dual-control cars made me feel safe from day one. I passed my driving test on the very first try!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Standard Plan Graduate",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    review: "I was extremely nervous about interstate driving. SafeDrive's progressive teaching method helped me build confidence step-by-step. Highly recommended.",
    rating: 5
  },
  {
    name: "Amanda Rivera",
    role: "Premium Plan Graduate",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    review: "Worth every penny! The license guidance and mock exams mirrored the actual DMV test perfectly. They handled all the stress so I could just focus on driving.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const next = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 md:py-32 bg-gray-50 overflow-hidden relative">
      <motion.div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl opacity-50 z-0" style={{ y: decorY }} />
      <motion.div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-yellow-100/50 blur-3xl opacity-50 z-0" style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 40]) }} />
      <TestimonialsBackground />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="mb-2 text-primary font-bold tracking-wider uppercase text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Success Stories
          </motion.div>
          <TextReveal className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Students Say
          </TextReveal>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Don&apos;t just take our word for it. Read the experiences of learners who achieved their driving goals with SafeDrive.
          </motion.p>
        </div>

        {/* Desktop: Staggered grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`h-full ${index === 1 ? 'lg:-mt-6' : ''}`}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card hoverEffect className="h-full relative pt-12 group">
                <motion.div
                  className="absolute top-8 right-8 text-indigo-100"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Quote size={60} className="opacity-40 group-hover:opacity-60 transition-opacity" />
                </motion.div>
                <div className="p-8 pb-10 flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.15 + i * 0.08, type: "spring" }}
                        viewport={{ once: true }}
                      >
                        <Star size={20} className="fill-secondary text-secondary" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8 relative z-10 flex-grow">
                    &quot;{testimonial.review}&quot;
                  </p>

                  <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                    <motion.img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring" }}
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet: Carousel */}
        <div
          className="lg:hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <Card hoverEffect className="relative pt-12 max-w-lg mx-auto">
                  <div className="absolute top-8 right-8 text-indigo-100">
                    <Quote size={60} className="opacity-40" />
                  </div>
                  <div className="p-8 pb-10 flex flex-col">
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star key={i} size={20} className="fill-secondary text-secondary" />
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg mb-8 relative z-10">
                      &quot;{testimonials[activeIndex].review}&quot;
                    </p>

                    <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                      <img
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonials[activeIndex].name}</h4>
                        <p className="text-sm text-primary font-medium">{testimonials[activeIndex].role}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="p-2.5 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors border border-gray-100">
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2.5 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors border border-gray-100">
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
