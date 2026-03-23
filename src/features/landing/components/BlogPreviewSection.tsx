'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
import { BlogPreviewBackground } from './SectionBackgrounds';
import TextReveal from './TextReveal';
import BlogCard from '@/features/blog/components/BlogCard';
import { blogPosts } from '@/features/blog/data/posts';

const BlogPreviewSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section ref={sectionRef} id="blog" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      <motion.div style={{ y: bgY }}>
        <BlogPreviewBackground />
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
            From Our Blog
          </motion.div>
          <TextReveal className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Latest Insights and Tips
          </TextReveal>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Stay updated with driving tips, road safety advice, and the latest news from SafeDrive.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/blog">
            <Button variant="outline" size="lg" className="gap-2">
              View All Posts
              <ArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
