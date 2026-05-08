import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "@/components/thirst/Hero";
import ScaleSection from "@/components/thirst/ScaleSection";
import DataVacuum from "@/components/thirst/DataVacuum";
import Caveat from "@/components/thirst/Caveat";
import HotspotsMap from "@/components/thirst/HotspotsMap";
import Trilemma from "@/components/thirst/Trilemma";
import Governance from "@/components/thirst/Governance";
import Comparisons from "@/components/thirst/Comparisons";
import NuclearShift from "@/components/thirst/NuclearShift";
import Solutions from "@/components/thirst/Solutions";
import Conclusion from "@/components/thirst/Conclusion";
import SiteFooter from "@/components/thirst/SiteFooter";
import Navigation from "@/components/thirst/Navigation";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ids = ["hero", "scale", "data", "geography", "technology", "regulation", "comparisons", "nuclear", "solutions", "conclusion"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen bg-background font-body">
      {/* scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-water z-[60] origin-left"
        style={{ scaleX: progress }}
      />
      <Navigation active={active} />

      <Hero />
      <ScaleSection />
      <Caveat />
      <DataVacuum />
      <HotspotsMap />
      <Trilemma />
      <NuclearShift />
      <Governance />
      <Comparisons />
      <Solutions />
      <Conclusion />
      <SiteFooter />
    </main>
  );
};

export default Index;
