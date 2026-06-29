import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import AboutSection from "@/sections/AboutSection";
import ContactSection from "@/sections/ContactSection";
import FAQSection from "@/sections/FAQSection";
import FinanceProSection from "@/sections/FinanceProSection";
import HeroSection from "@/sections/HeroSection";
import IndustriesSection from "@/sections/IndustriesSection";
import ProductsSection from "@/sections/ProductsSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import TrustedSection from "@/sections/TrustedSection";
import WhyChooseUsSection from "@/sections/WhyChooseUsSection";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <LoadingScreen isVisible={isLoading} />
      <Navbar />
      <main>
        <HeroSection />
        <TrustedSection />
        <AboutSection />
        <ProductsSection />
        <FinanceProSection />
        <WhyChooseUsSection />
        <IndustriesSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
