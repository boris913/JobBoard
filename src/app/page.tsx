import { loadOffers } from "@/lib/offers";
import { HeroSection } from "@/components/sections/HeroSection";
import {
  TrustLogos,
  Features,
  HowItWorks,
  Stats,
  Testimonials,
  Pricing,
  FAQ,
  FinalCTA,
} from "@/components/sections/InteractiveSections";

export default function HomePage() {
  const offers = loadOffers();

  return (
    <>
      <HeroSection offers={offers} />
      <TrustLogos />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}