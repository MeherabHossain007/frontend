"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import type { Section } from "@/interfaces/section.interface";

interface CareerVisionProps {
  section: Section;
}

export default function CareerVision({ section }: CareerVisionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Type assertion to access specific properties
  const careerVisionSection = section as Extract<
    Section,
    { __component: "sections.career-vision" }
  >;
  const visionText =
    careerVisionSection.visionText ||
    "We envision a world where cities feel small again. Where transportation and tech bring people together, instead of apart. We see the future as community-driven — and it starts with you.";

  return (
    <section
      ref={ref}
      className={`w-full py-12 md:py-16  transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <p className="text-xl md:text-2xl text-center max-w-4xl mx-auto  leading-relaxed">
          {visionText}
        </p>
      </div>
    </section>
  );
}
