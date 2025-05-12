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

  return (
    <section
      ref={ref}
      id="highlights"
      className={`w-full py-16 md:py-24 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          {/* Main content section with three columns */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {highlights.slice(0, 3).map((highlight, index) => (
              <div
                key={highlight.id || index}
                className={`flex flex-col transition-all duration-700 delay-${
                  index * 100
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                  {highlight.title || getDefaultTitle(index)}
                </h2>
                <p className="text-gray-700 mb-5 text-base leading-relaxed">
                  {highlight.description || getDefaultDescription(index)}
                </p>
                <div className="mt-auto">
                  <Link
                    href={highlight.linkUrl || "#"}
                    className="text-[#7141FF] hover:text-[#000000] underline font-medium inline-block"
                  >
                    {highlight.linkText || "Learn more"}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Image on the right */}
          <div
            className={`hidden lg:block w-full lg:w-1/3 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            {careerHighlightsSection.image?.url ? (
              <Image
                src={careerHighlightsSection.image.url}
                alt="Lyft vehicle illustration"
                width={500}
                height={400}
                className="object-contain"
              />
            ) : (
              <Image
                src="/api/placeholder/500/400"
                alt="Lyft vehicle illustration"
                width={500}
                height={400}
                className="object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Default content helpers to match the image
function getDefaultTitle(index: number): string {
  const titles = ["Life at Lyft", "Early Talent Programs", "Belonging at Lyft"];
  return titles[index] || "Feature Highlight";
}

function getDefaultDescription(index: number): string {
  const descriptions = [
    "Lyft culture revolves around our core values. We have superb benefits and great perks (and some pretty cute office dogs). Across our over 45 locations, we've got fabulous programs to connect, grow, and celebrate.",
    "Working at Lyft as an intern, new graduate, or apprentice is a great start to your career. With plenty of mentor support, you'll make an impact with valuable projects. Plus, you'll love how friendly and welcoming Lyft culture is.",
    "Community is at the center of who we are. To offer everyone the best ride, we start by fostering a strong sense of belonging within our team—creating an environment where everyone feels valued, supported, and connected.",
  ];
  return descriptions[index] || "Description content goes here.";
}
