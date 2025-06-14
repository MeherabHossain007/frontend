"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";

import { PrimaryButton } from "@/components/ui/Buttons";
import { Section } from "@/interfaces/section.interface";

interface CareerHeroProps {
  section: Extract<Section, { __component: "sections.career-hero" }>;
}

export default function CareerHero({ section }: CareerHeroProps) {
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

  const title =
    section.title || "Building a more connected world, ride by ride.";
  const subtitle =
    section.subtitle ||
    "Whether it's an everyday commute or a journey that changes everything, we are driven by our purpose: to serve and connect.";
  const buttonText = section.buttonText || "Search job openings";
  const buttonLink = section.buttonLink || "#openings";
  const imageUrl = section.image?.url;

  return (
    <section
      ref={ref}
      className="w-full bg-white dark:bg-zinc-900 pt-8 pb-0 transition-colors duration-300"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Top Label */}
        <div className="mb-6">
          <span className="text-sm font-bold text-black dark:text-white uppercase tracking-wide">
            WORKING AT LYFT
          </span>
        </div>

        {/* Main Hero Section */}
        <div className="pb-12 md:pb-16 flex flex-col md:flex-row items-start gap-8 md:gap-12">
          {/* Left Content */}
          <div
            className={`w-full md:w-1/2 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6 leading-tight transition-colors duration-300">
              {title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-base md:text-lg max-w-lg transition-colors duration-300">
              {subtitle}
            </p>
            <PrimaryButton href={buttonLink} text={buttonText} />
          </div>

          {/* Right Image */}
          <div
            className={`w-full md:w-1/2 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative aspect-[16/11] rounded-md overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 shadow-lg dark:shadow-2xl transition-all duration-300">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Lyft office space"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <Image
                  src="https://ext.same-assets.com/2392121160/2064920765.webp"
                  alt="Lyft office space"
                  fill
                  className="object-cover"
                  priority
                />
              )}
              {/* Dark overlay for better contrast in dark mode */}
              <div className="absolute inset-0 bg-black/0 dark:bg-black/10 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}