import type { Metadata } from "next";

import { AboutSection } from "@/components/landing/about-section";
import { HeroSlider } from "@/components/landing/hero-slider";
import { LandingCta } from "@/components/landing/landing-cta";
import { ServicesCards } from "@/components/landing/services-cards";
import { Testimonials } from "@/components/landing/testimonials";

export const metadata: Metadata = {
  title: "Dentist | Modern dental care",
  description:
    "Premier dental clinic offering preventive, cosmetic, and restorative care in a calm, modern setting.",
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <ServicesCards />
      <Testimonials />
      <LandingCta />
    </>
  );
}
