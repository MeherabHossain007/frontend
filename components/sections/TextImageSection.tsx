"use client";
import type { Section } from "@/interfaces/section.interface";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface TextImageSectionProps {
  section: Extract<Section, { __component: "sections.text-image" }>;
  reversed?: boolean;
}

export default function TextImageSection({
  section,
  reversed = false,
}: TextImageSectionProps) {
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

  const imageUrl = section.image?.formats?.large?.url || section.image?.url;
  const buttonText = section.buttonText || "Learn More";
  const buttonLink = section.buttonLink || "#";

  return (
    <section
      ref={ref}
      className={`w-full px-4 py-10 md:py-16 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`max-w-[1280px] mx-auto flex flex-col ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-10 md:gap-16`}
      >
        {/* Image */}
        <div className="w-full md:w-1/2 relative aspect-video md:aspect-square">
          {imageUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
              alt={section.title || "Section image"}
              fill
              className="object-cover rounded-xl shadow-md"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">No Image</span>
            </div>
          )}
        </div>

        {/* Text & Buttons */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            {section.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {section.subtitle}
          </p>
          {section.buttonText && (
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link
                href={buttonLink}
                className="bg-pink-200 hover:bg-pink-300 text-pink-800 dark:bg-pink-800 dark:hover:bg-pink-700 dark:text-pink-100 px-6 py-3 rounded-xl transition-colors duration-300 font-medium"
              >
                {buttonText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
