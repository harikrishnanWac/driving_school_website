'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { TestimonialsBackground } from './SectionBackgrounds';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Passed on 1st Attempt",
    image: "https://i.pravatar.cc/150?img=47",
    review: "The instructors are amazingly patient and detail-oriented. The dual-control cars made me feel safe from day one. I passed my driving test on the very first try!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Standard Plan Graduate",
    image: "https://i.pravatar.cc/150?img=11",
    review: "I was extremely nervous about interstate driving. SafeDrive's progressive teaching method helped me build confidence step-by-step. Highly recommended.",
    rating: 5
  },
  {
    name: "Amanda Rivera",
    role: "Premium Plan Graduate",
    image: "https://i.pravatar.cc/150?img=5",
    review: "Worth every penny! The license guidance and mock exams mirrored the actual DMV test perfectly. They handled all the stress so I could just focus on driving.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-gray-50 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-yellow-100/50 blur-3xl opacity-50 z-0"></div>
      <TestimonialsBackground />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-2 text-primary font-bold tracking-wider uppercase text-sm">Success Stories</div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Students Say
          </h2>
          <p className="text-gray-600 text-lg">
            Don&apos;t just take our word for it. Read the experiences of learners who achieved their driving goals with SafeDrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card hoverEffect className="h-full relative pt-12">
                <div className="absolute top-8 right-8 text-indigo-100">
                  <Quote size={60} className="opacity-40" />
                </div>
                <div className="p-8 pb-10 flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8 relative z-10 flex-grow">
                    &quot;{testimonial.review}&quot;
                  </p>
                  
                  <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
