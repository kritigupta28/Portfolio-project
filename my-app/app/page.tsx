import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import WorkSection from "./components/WorkSection";
import SkillsSection from "./components/skills/SkillsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
