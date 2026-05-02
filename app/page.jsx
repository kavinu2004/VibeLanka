import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PhilosophyBar from "@/components/PhilosophyBar";
import FeatureExplainer from "@/components/FeatureExplainer";
import SouthCoastShowcase from "@/components/SouthCoastShowcase";
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
      <PhilosophyBar />
      <FeatureExplainer />
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
