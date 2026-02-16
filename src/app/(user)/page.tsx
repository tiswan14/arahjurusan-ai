import WhySection from "@/components/user/Why";
import FinalCTASection from "@/components/user/Cta";
import FAQSection from "@/components/user/Faq";
import Hero from "@/components/user/Hero";
import HowItWorksSection from "@/components/user/HowItWorks";
import TestimonialSection from "@/components/user/Testimony";

export default function Home() {
  return (
    <>
      <Hero />
      <WhySection />
      <HowItWorksSection />
      <TestimonialSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
