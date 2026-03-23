import React from 'react';
import { blogPosts } from '@/features/blog/data/posts';
import BlogGrid from '@/features/blog/components/BlogGrid';

export const metadata = {
  title: 'Blog | SafeDrive Driving School',
  description: 'Driving tips, road safety advice, and the latest news from SafeDrive Driving School.',
};

export default function BlogPage() {
  return (
    <main className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="mb-2 text-primary font-bold tracking-wider uppercase text-sm">
            Our Blog
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Driving Tips & Insights
          </h1>
          <p className="text-gray-600 text-lg">
            Expert advice from our certified instructors to help you become a safer, more confident driver.
          </p>
        </div>

        <BlogGrid posts={blogPosts} />
      </div>
    </main>
  );
}
