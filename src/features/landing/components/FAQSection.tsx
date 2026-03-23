'use client';

import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FAQBackground } from './SectionBackgrounds';
import TextReveal from './TextReveal';

const faqs = [
  {
    question: "How many lessons will I need before my driving test?",
    answer: "Most learners need between 10-30 hours of professional instruction, depending on their starting level. Our instructors will assess your progress and recommend when you're test-ready. Our Beginner Plan with 10 sessions is great for those with some experience, while the Premium Plan with 30 sessions covers everything from scratch."
  },
  {
    question: "Do you provide the car for the driving test?",
    answer: "Yes! All our test packages include use of our dual-control vehicle for the driving test at no extra charge. You'll use the same car you've been practicing in, so you'll feel comfortable and confident on test day."
  },
  {
    question: "What areas do you cover for lessons?",
    answer: "We serve the greater Ernakulam area including Puthenveli, Elenthikkara, Kochi, and surrounding neighborhoods. Pick-up and drop-off service is available with our Premium Plan. Contact us to confirm coverage in your specific area."
  },
  {
    question: "Can I choose between manual and automatic cars?",
    answer: "Absolutely. We have both manual and automatic dual-control vehicles in our fleet. You can choose based on your preference, or try both to see what suits you best. Our instructors are certified to teach on either type."
  },
  {
    question: "What happens if I fail my driving test?",
    answer: "Don't worry — it happens to many learners! We offer discounted re-test preparation packages that focus on the specific areas you need to improve. Your instructor will review the examiner's feedback and create a targeted practice plan."
  },
  {
    question: "Do you offer weekend or evening lessons?",
    answer: "Yes, we have flexible scheduling including weekends and evenings. Our operating hours are Monday through Saturday, 8:00 AM to 6:00 PM, with extended hours available by request for evening sessions."
  },
  {
    question: "What should I bring to my first lesson?",
    answer: "You'll need your learner's permit (or provisional license), comfortable shoes suitable for driving, and any glasses or contacts you normally wear. We recommend wearing comfortable clothing that doesn't restrict movement."
  },
  {
    question: "Is there an age requirement to start lessons?",
    answer: "You must be at least 18 years old with a valid learner's permit to begin driving lessons. We recommend starting theory preparation early so you're ready to begin practical training as soon as you're eligible."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faq" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <motion.div style={{ y: bgY }}>
        <FAQBackground />
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
            FAQ
          </motion.div>
          <TextReveal className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </TextReveal>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Got questions? We&apos;ve got answers. Find everything you need to know about our driving lessons below.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="border-b border-gray-100 last:border-b-0"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} className="text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 leading-relaxed pb-6 pr-12">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
