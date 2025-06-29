import React from 'react';
import Hero from '@/components/freemium/Hero';
import Features from '@/components/freemium/Features';
import PricingSection from '@/components/premium/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import UrgencySection from '@/components/UrgencySection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <TestimonialsSection />
      <UrgencySection />
      <PricingSection />
    </>
  );
}
