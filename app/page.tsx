import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductMockup from "@/components/ProductMockup";
import StrokeAnimation from "@/components/StrokeAnimation";
import HowItWorks from "@/components/HowItWorks";
import AnalysisLenses from "@/components/AnalysisLenses";
import TrustedBy from "@/components/TrustedBy";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductMockup />
        <StrokeAnimation />
        <HowItWorks />
        <AnalysisLenses />
        <TrustedBy />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
