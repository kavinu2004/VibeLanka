import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SouthCoastShowcase from "@/components/SouthCoastShowcase";
import ContextSlide from "@/components/ContextSlide";
import ThreeWaysToFind from "@/components/ThreeWaysToFind";
import PlanShowcase from "@/components/PlanShowcase";
import PartnerSection from "@/components/PartnerSection";
import Manifesto from "@/components/Manifesto";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ContextSlide />
      <SouthCoastShowcase />
      <ThreeWaysToFind />
      <PlanShowcase />
      <PartnerSection />
      <Manifesto />
      <CTA />
      <Footer />
    </>
  );
}
