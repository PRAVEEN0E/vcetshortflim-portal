import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { PrizeCards } from "@/components/home/PrizeCards";
import { JudgingCriteria } from "@/components/home/JudgingCriteria";
import { RulesSection } from "@/components/home/RulesSection";
import { Timeline } from "@/components/home/Timeline";
import { ContactSection } from "@/components/home/ContactSection";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#050505", color: "#fff" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <AboutSection />
        <HighlightsSection />
        <PrizeCards />
        <JudgingCriteria />
        <RulesSection />
        <Timeline />
        <ContactSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
