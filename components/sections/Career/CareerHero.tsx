"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { Section } from "@/interfaces/section.interface";
import { PrimaryButton } from "@/components/ui/Buttons";

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
  const buttonLink = section.buttonLink || "/";
  const imageUrl = section.image?.url;
  const vision =
    section.vision ||
    "We envision a world where cities feel small again. Where transportation and tech bring people together, instead of apart. We see the future as community-driven — and it starts with you.";

  return (
    <section ref={ref} className="w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        {/* Main Hero Section */}
        <div className="py-16 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left Content */}
          <div
            className={`w-full md:w-1/2 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-3">
              <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                WORKING AT LYFT
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-gray-700 mb-8 text-base md:text-lg max-w-lg">
              {subtitle}
            </p>
            <PrimaryButton href={buttonLink} text={buttonText} />
          </div>

          {/* Right Image */}
          <div
            className={`w-full md:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative aspect-[16/11] rounded-md overflow-hidden">
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
                  src="/api/placeholder/800/500"
                  alt="Lyft office space"
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-medium text-gray-900">
              {vision}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
