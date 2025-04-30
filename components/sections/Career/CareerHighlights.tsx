"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Section } from "@/interfaces/section.interface";

interface CareerHighlightsProps {
  section: Section;
}

export default function CareerHighlights({ section }: CareerHighlightsProps) {
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

  const highlights = careerHighlightsSection.highlights;
  const visionText = careerHighlightsSection.title;

  return (
    <section
      ref={ref}
      id="highlights"
      className={`w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Vision statement */}
        <div className="mb-16 md:mb-24">
          <p className="text-xl md:text-2xl text-center max-w-5xl mx-auto text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
            {visionText}
          </p>
        </div>

        <div className="relative">
          {/* Content columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20 px-20 mr-20">
            {highlights.map((highlight, index) => (
              <div key={highlight.id || index} className="flex flex-col">
              <h2 className="text-xl md:text-3xl font-semibold mb-3 text-gray-900 dark:text-white">
                {highlight.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {highlight.description}
              </p>
              <Link
                href={highlight.linkUrl}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium"
              >
                {highlight.linkText}
              </Link>
              </div>
            ))}
          </div>
          {/* Image on the right */}
          <div className=" absolute -right-96 top-0">
            {careerHighlightsSection.image?.url ? (
              <Image
                src={`${careerHighlightsSection.image.url}`}
                alt="Lyft career highlights"
                width={500}
                height={400}
                className="object-contain"
              />
            ) : (
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Lyft career highlights"
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
