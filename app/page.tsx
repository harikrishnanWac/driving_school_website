import HeroSection from '@/features/landing/components/HeroSection';
import ScrollRevealWords from '@/features/landing/components/ScrollRevealWords';
import AboutSection from '@/features/landing/components/AboutSection';
import InstructorsSection from '@/features/landing/components/InstructorsSection';
import PricingSection from '@/features/landing/components/PricingSection';
import StatisticsSection from '@/features/landing/components/StatisticsSection';
import GallerySection from '@/features/landing/components/GallerySection';
import VideoSection from '@/features/landing/components/VideoSection';
import TestimonialsSection from '@/features/landing/components/TestimonialsSection';
import FAQSection from '@/features/landing/components/FAQSection';
import BlogPreviewSection from '@/features/landing/components/BlogPreviewSection';
import ContactSection from '@/features/landing/components/ContactSection';
import ScrollProgress from '@/features/landing/components/ScrollProgress';
import MouseGlow from '@/features/landing/components/MouseGlow';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <MouseGlow />
      <HeroSection />
      <ScrollRevealWords />
      <AboutSection />
      <InstructorsSection />
      <PricingSection />
      <StatisticsSection />
      <GallerySection />
      <VideoSection />
      <TestimonialsSection />
      <FAQSection />
      <BlogPreviewSection />
      <ContactSection />
    </>
  );
}
