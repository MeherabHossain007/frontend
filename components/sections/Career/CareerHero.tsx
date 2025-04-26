"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Section } from "@/interfaces/section.interface";

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

  const title = section.title;
  const subtitle = section.subtitle;
  const buttonText = section.buttonText;
  const buttonLink = section.buttonLink || "/";
  const imageUrl = section.image?.url;

  return (
    <section ref={ref} className="w-full bg-white dark:bg-gray-900 px-36">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-16 flex flex-col md:flex-row gap-8 md:gap-12">
          <div
            className={`w-full md:w-1/2 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-6">
              <span className="text-sm font-medium text-pink-500 uppercase">
                WORKING AT LYFT
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              {subtitle}
            </p>
            <Link
              href={buttonLink}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-medium"
            >
              {buttonText}
            </Link>
          </div>

          <div
            className={`w-full md:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
                alt="Lyft office space"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
