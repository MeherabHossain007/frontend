"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import type { Section } from "@/interfaces/section.interface";
import Link from "next/link";

// We need to specifically type this as CallToActionSection
interface CallToActionProps {
  section: Extract<Section, { __component: "sections.call-to-action" }>;
}

export default function CallToAction({ section }: CallToActionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Now we can safely access these properties since we've narrowed the type
  const primaryButtonText = section.buttonText || "Get Started";
  const primaryButtonLink = section.buttonLink || "#";
  const secondaryButtonText = section.secondaryButtonText || "Learn More";
  const secondaryButtonLink = section.secondaryButtonLink || "#";

  return (
    <section
      ref={ref}
      className={`w-full px-4 py-16 md:py-24 bg-gray-900 text-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-[1280px] mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">{section.title}</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          {section.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={primaryButtonLink}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl transition-colors duration-300 font-medium text-lg"
          >
            {primaryButtonText}
          </Link>

          {section.secondaryButtonText && (
            <Link
              href={secondaryButtonLink}
              className="bg-transparent hover:bg-gray-800 text-white border border-white px-8 py-4 rounded-xl transition-colors duration-300 font-medium text-lg"
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
