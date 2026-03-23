'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/features/blog/data/posts';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const categoryColors: Record<string, string> = {
  Tips: 'bg-blue-100 text-blue-700',
  Education: 'bg-purple-100 text-purple-700',
  Safety: 'bg-green-100 text-green-700',
  News: 'bg-orange-100 text-orange-700',
};

const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden h-full transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1">
          <div className="relative overflow-hidden">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
              {post.category}
            </span>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 text-gray-400 text-sm mb-3">
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <span>Read More</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
