"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/interfaces/section.interface";
import { PrimaryButton } from "../ui/Buttons";

interface HeroSectionProps {
  section: Extract<Section, { __component: "sections.hero" }>;
  userType?: string;
}

export default function HeroSection({ section, userType }: HeroSectionProps) {
  const imageUrl = section.image?.formats?.large?.url || section.image?.url;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const showExtraInput = userType === "userType1";

  return (
    <section className="w-full bg-white py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-200">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={section.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
            {section.title}
          </h2>

          {showExtraInput ? (
            <>
              {/* Phone Input */}
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter mobile phone number*"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#432DD7]"
              />

              {/* Consent Text */}
              <p className="text-sm font-light text-gray-600">{section.subtitle}</p>

              {/* CTA and Terms */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                <PrimaryButton
                  text={section.buttonText || "Get Started"}
                  href={section.buttonLink || "#"}
                />

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="w-4 h-4 text-[#432DD7] border-gray-300 rounded focus:ring-[#432DD7]"
                  />
                  {section.checkText || "I agree to Lyft's Terms of Service"}
                </label>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-700">{section.subtitle}</p>
              <div className="pt-4">
                <PrimaryButton
                  text={section.buttonText || "Get Started"}
                  href={section.buttonLink || "#"}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
