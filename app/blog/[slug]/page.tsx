import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { blogPosts } from '@/features/blog/data/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | SafeDrive Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const categoryColors: Record<string, string> = {
    Tips: 'bg-blue-100 text-blue-700',
    Education: 'bg-purple-100 text-purple-700',
    Safety: 'bg-green-100 text-green-700',
    News: 'bg-orange-100 text-orange-700',
  };

  return (
    <main className="pt-28 pb-20 bg-white min-h-screen">
      <article className="container mx-auto px-4 md:px-6 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary font-medium text-sm mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="mb-8">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
            {post.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-8 pb-8 border-b border-gray-100">
          <span className="flex items-center gap-1.5">
            <User size={14} />
            {post.author}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>

        <div className="relative rounded-3xl overflow-hidden mb-12">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        <div className="prose prose-lg prose-gray max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                  {paragraph.replace(/\*\*/g, '')}
                </h2>
              );
            }
            if (paragraph.startsWith('**')) {
              const match = paragraph.match(/^\*\*(.+?)\*\*\s*([\s\S]*)/);
              if (match) {
                return (
                  <div key={index}>
                    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">{match[1]}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{match[2]}</p>
                  </div>
                );
              }
            }
            return (
              <p key={index} className="text-gray-600 leading-relaxed mb-6">
                {paragraph}
              </p>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />
            Back to all posts
          </Link>
        </div>
      </article>
    </main>
  );
}
