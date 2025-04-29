"use client";
import { Section } from "@/interfaces/section.interface";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  section: Extract<Section, { __component: "sections.hero" }>;
  userType?: string;
}

export default function HeroSection({ section, userType }: HeroSectionProps) {
  const imageUrl = section.image?.formats?.large?.url || section.image?.url;
  const buttonText = section.buttonText || "Get Started";
  const buttonLink = section.buttonLink || "#";
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  // Determine if button should be centered based on user type
  const shouldCenterButton =
    userType === "userType1" || userType === "userType2";
  console.log("shouldCenterButton", shouldCenterButton);
  console.log("userType", userType);
  // Determine if extra checkbox should be shown
  const showExtraCheckbox = userType === "userType2";

  return (
    <section className="w-full px-4 py-10 md:py-20">
      <div className="max-w-[1600px] mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
        {/* Left - Image */}
        <div className="w-full md:w-1/2 relative aspect-video md:aspect-[4/3]">
          {imageUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
              alt={section.title}
              fill
              className="object-cover rounded-xl shadow-md"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        {/* Right - Text & Buttons */}
        <div className="w-full flex flex-col justify-between items-center md:w-1/2 text-center md:text-left space-y-6">
          <h1
            className={`text-4xl md:text-5xl font-bold leading-tight ${
              shouldCenterButton ? "text-center" : ""
            }`}
          >
            {section.title}
          </h1>
          <div
            className={`text-lg md:text-xl text-gray-400 ${
              shouldCenterButton ? "text-center" : ""
            }`}
          >
            {section.subtitle}
          </div>

          {/* Extra checkbox for user-type2 */}
          {showExtraCheckbox && (
            <div className="flex items-center justify-center md:justify-start mt-4">
              <input
                type="checkbox"
                id="extra-checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
              />
              <label
                htmlFor="extra-checkbox"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                {section.checkText}
              </label>
            </div>
          )}

          {/* Button section with conditional centering */}
          <div
            className={`flex w-full flex-col sm:flex-row ${
              shouldCenterButton
                ? "justify-center"
                : "md:justify-start justify-center"
            } gap-10`}
          >
            <Link
              href={buttonLink}
              className="bg-pink-200 hover:bg-pink-300 text-pink-800 px-8 py-2 font-bold rounded-xl transition-colors duration-300 text-lg"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
