"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Section } from "@/interfaces/section.interface";

interface FeatureSliderProps {
  section: Section;
}

export default function FeatureSlider({ section }: FeatureSliderProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Type assertion to access specific properties
  const careerHighlightsSection = section as Extract<
    Section,
    { __component: "sections.career-highlights" }
  >;

  const highlights = careerHighlightsSection.highlights || [];

  // Auto-rotate highlights for mobile view (controlled by CSS visibility)
  useEffect(() => {
    if (highlights.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % highlights.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [highlights.length]);
  const visionText = careerHighlightsSection.title;

  return (
    <section
      ref={ref}
      id="highlights"
      className={`w-full py-16 px-10 bg-white dark:bg-gray-900 transition-opacity duration-700 overflow-hidden ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Vision statement */}
        <div className="mb-10 md:mb-16">
          <p className="text-xl md:text-2xl text-center max-w-5xl mx-auto text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
            {visionText}
          </p>
        </div>

        <div className="relative">
          {/* Mobile View - Slider (visible only on mobile screens) */}
          <div className="md:hidden">
            <div className="flex flex-col items-center">
              <div className="mb-8 w-full">
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white text-center">
                    {highlights[activeIndex]?.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
                    {highlights[activeIndex]?.description}
                  </p>
                  {highlights[activeIndex]?.linkUrl && (
                    <Link
                      href={highlights[activeIndex]?.linkUrl}
                      className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
                    >
                      {highlights[activeIndex]?.linkText}
                    </Link>
                  )}
                </div>
              </div>

              {/* Dots navigation */}
              <div className="flex justify-center space-x-2 mt-4">
                {highlights.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      activeIndex === index
                        ? "bg-purple-600 dark:bg-purple-400"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile image */}
            {careerHighlightsSection.image?.url && (
              <div className="mt-8 flex justify-center">
                <Image
                  src={`${careerHighlightsSection.image.url}`}
                  alt="Career highlights"
                  width={300}
                  height={240}
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Desktop View - Grid (hidden on mobile, visible on md screens and up) */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
              {/* Content columns */}
              <div className="md:col-span-3 lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {highlights.map((highlight, index) => (
                  <div key={highlight.id || index} className="flex flex-col">
                    <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {highlight.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm md:text-base">
                      {highlight.description}
                    </p>
                    {highlight.linkUrl && (
                      <Link
                        href={highlight.linkUrl}
                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium"
                      >
                        {highlight.linkText}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Image on the right - only visible on large screens */}
              <div className="hidden lg:block lg:col-span-1">
                {careerHighlightsSection.image?.url && (
                  <Image
                    src={`${careerHighlightsSection.image.url}`}
                    alt="Career highlights"
                    width={400}
                    height={320}
                    className="object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
