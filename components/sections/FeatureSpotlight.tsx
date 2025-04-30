// components/FeatureSpotlight.tsx
"use client";

import { Section } from "@/interfaces/section.interface";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FeatureSpotlightProps {
  section: Extract<Section, { __component: "sections.feature-spotlight" }>;
  userType?: string;
}

export default function FeatureSpotlight({ section }: FeatureSpotlightProps) {
  // Extract image URL from Strapi's format structure
  const imageUrl = section.image?.url;

  // Default fallbacks or use provided data
  const buttonText = section.buttonText || "Learn More";
  const buttonLink = section.buttonLink || "#";

  // State for interaction if needed
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Log image URL for debugging
    console.log("Feature image URL:", imageUrl);
  }, [imageUrl]);

  return (
    <section className="relative bg-gray-900 py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Image with gradient overlay */}
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          {imageUrl ? (
            <Image
              src={`${imageUrl}`}
              alt={section.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-500/20 to-gray-900/80"></div>
        </div>

        {/* Text content */}
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            {section.title}
          </h2>

          <p className="text-lg text-gray-300 mb-8">{section.subtitle}</p>

          <Link
            href={buttonLink}
            className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 
                      text-white font-medium rounded-md transition-colors duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {buttonText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ml-2 transition-transform ${
                isHovered ? "translate-x-1" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
