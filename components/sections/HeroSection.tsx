"use client";
import { Section } from "@/interfaces/section.interface";
import Image from "next/image";

import { useState } from "react";
import { PrimaryButton } from "../ui/Buttons";

interface HeroSectionProps {
  section: Extract<Section, { __component: "sections.hero" }>;
  userType?: string;
}

export default function HeroSection({ section, userType }: HeroSectionProps) {
  const imageUrl = section.image?.formats?.large?.url || section.image?.url;
  const [isChecked, setIsChecked] = useState(false);

  // Determine if extra checkbox should be shown
  const showExtraCheckbox = userType === "userType2";

  return (
  <div className="w-full py-16 bg-white">
  <div className="w-full px-4 md:px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={section.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">{section.title}</h2>
          <p className="text-gray-700 text-lg">{section.subtitle}</p>

          {showExtraCheckbox && (
            <div className="flex items-center pt-2">
              <input
                type="checkbox"
                id="extra-checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-4 h-4 text-[#432DD7] bg-gray-100 border-gray-300 rounded focus:ring-[#432DD7]"
              />
              <label
                htmlFor="extra-checkbox"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                {section.checkText}
              </label>
            </div>
          )}

          <div className="pt-4">
            <PrimaryButton
              text={section.buttonText || "Get Started"}
              href={section.buttonLink || "#"}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}