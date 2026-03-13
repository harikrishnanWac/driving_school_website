import HeroSection from '@/features/landing/components/HeroSection';
import AboutSection from '@/features/landing/components/AboutSection';
import PricingSection from '@/features/landing/components/PricingSection';
import StatisticsSection from '@/features/landing/components/StatisticsSection';
import GallerySection from '@/features/landing/components/GallerySection';
import TestimonialsSection from '@/features/landing/components/TestimonialsSection';
import ContactSection from '@/features/landing/components/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PricingSection />
      <StatisticsSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
