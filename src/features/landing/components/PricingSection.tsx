'use client';

import React, { useRef } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Check } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { PricingBackground } from './SectionBackgrounds';
import TextReveal from './TextReveal';

const plans = [
  {
    name: "Beginner Plan",
    price: "$299",
    description: "Perfect for completely new learners",
    features: [
      "10 Driving Sessions",
      "Basic Road Training",
      "Traffic Rules Theory",
      "Parking Practice",
      "Dual Control Vehicle"
    ],
    popular: false
  },
  {
    name: "Standard Plan",
    price: "$499",
    description: "Our most chosen comprehensive package",
    features: [
      "20 Driving Sessions",
      "Highway Training",
      "Parking + Reverse Driving",
      "Night Driving Basics",
      "Mock Driving Test"
    ],
    popular: true
  },
  {
    name: "Premium Plan",
    price: "$699",
    description: "End-to-end guidance until you get licensed",
    features: [
      "30 Driving Sessions",
      "Highway + City Driving",
      "Test Preparation",
      "License Guidance & Support",
      "Pick & Drop Service"
    ],
    popular: false
  }
];

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });
  const glareOpacity = useTransform(x, [-0.5, 0, 0.5], [0, 0, 0.15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          opacity: glareOpacity,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
        }}
      />
    </motion.div>
  );
};

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="packages" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      <motion.div style={{ y: bgY }}>
        <PricingBackground />
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
            Driving Packages
          </motion.div>
          <TextReveal className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose the Right Plan for You
          </TextReveal>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            We offer flexible and affordable packages tailored to your current experience level. All plans include one-on-one training with certified instructors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
              initial={{ opacity: 0, y: 60, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                  <motion.span
                    className="bg-secondary text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md"
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Most Popular
                  </motion.span>
                </div>
              )}
              <TiltCard className="h-full">
                <Card hoverEffect className={`h-full flex flex-col ${plan.popular ? 'border-2 border-secondary shadow-xl relative z-0' : ''}`}>
                  <div className="p-8 pb-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-500 text-sm mb-6">{plan.description}</p>
                    <div className="flex items-baseline gap-2 mb-8">
                      <motion.span
                        className="text-5xl font-extrabold text-gray-900"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1, type: "spring" }}
                        viewport={{ once: true }}
                      >
                        {plan.price}
                      </motion.span>
                    </div>
                  </div>

                  <div className="bg-gray-50/50 p-8 flex-grow flex flex-col justify-between border-t border-gray-100 mt-4">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.08 + idx * 0.06 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className="mt-1 bg-green-100 text-green-600 rounded-full p-0.5"
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.08 + idx * 0.06, type: "spring", stiffness: 300 }}
                            viewport={{ once: true }}
                          >
                            <Check size={14} strokeWidth={3} />
                          </motion.div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <a href="#contact" onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('select-plan', { detail: plan.name }));
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                      <Button
                        variant={plan.popular ? 'primary' : 'outline'}
                        size="lg"
                        fullWidth
                        className={plan.popular ? 'shadow-lg shadow-primary/25' : 'bg-white'}
                      >
                        Enroll in {plan.name}
                      </Button>
                    </a>
                  </div>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
