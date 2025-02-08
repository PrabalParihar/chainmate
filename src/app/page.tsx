"use client";
import { HeroSection } from "../components/ui/HeroSection";
import ScrollDownArrow from "../components/ui/ScrollDownArrow";
import About from "../components/About";
import { useRef } from "react";
import { Navbar } from "../components/ui/Navbar";

export default function Home() {
  const homeSectionRef = useRef<HTMLDivElement>(null);
  const whySectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-black">
      <Navbar
        homeSectionRef={homeSectionRef}
        whySectionRef={whySectionRef}
      />
      <div ref={homeSectionRef} className="h-screen bg-black relative">
        <HeroSection />
        <ScrollDownArrow targetRef={whySectionRef} />
      </div>
      <div ref={whySectionRef} className="h-screen bg-black">
        <About />
      </div>
    </div>
  );
}