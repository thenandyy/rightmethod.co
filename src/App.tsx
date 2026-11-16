import { motion, MotionConfig, useReducedMotion, useScroll } from 'motion/react';
import EngineeringBlueprintBackdrop from './components/EngineeringBlueprintBackdrop';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ContentEngineeringSection from './components/ContentEngineeringSection';
import RightOnesSection from './components/RightOnesSection';
import PlatformsSection from './components/PlatformsSection';
import AiAndRightSection from './components/AiAndRightSection';
import PillarsSection from './components/PillarsSection';
import PhilosophySection from './components/PhilosophySection';
import MythsSection from './components/MythsSection';
import PlaybookSection from './components/PlaybookSection';
import TeamSection from './components/TeamSection';
import FinalCtaAndFooter from './components/FinalCtaAndFooter';

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-black text-[#f2f2f2] editorial-grain">
        {/* Global Whisper-Thin Engineering CAD Blueprint Backdrop */}
        <EngineeringBlueprintBackdrop />

        {/* Subtle reading progress hairline */}
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            className="fixed top-0 left-0 right-0 z-[60] h-[1.5px] bg-gradient-to-r from-white/50 via-white to-[#2c86f6]"
          />
        )}
        <Navbar />
        <main className="relative z-10">
          <HeroSection />
          <ContentEngineeringSection />
          <RightOnesSection />
          <PlatformsSection />
          <AiAndRightSection />
          <PillarsSection />
          <PhilosophySection />
          <MythsSection />
          <PlaybookSection />
          <TeamSection />
          <FinalCtaAndFooter />
        </main>
      </div>
    </MotionConfig>
  );
}
