'use client'
import { Section } from "@/interfaces/section.interface";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface HeroSectionProps {
  section: Extract<Section, { __component: "sections.hero" }>;
}

export default function HeroSection({ section }: HeroSectionProps) {
  const imageUrl = section.image?.formats?.large?.url || section.image?.url;
  const buttonText = section.buttonText || "Get Started";
  const buttonLink = section.buttonLink || "#";

  useEffect(()=>{
    console.log(imageUrl);
  },[imageUrl])
  

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
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl  font-bold leading-tight">
            {section.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400">{section.subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link
              href={buttonLink}
              className="bg-pink-200 hover:bg-pink-300 text-pink-800 px-8 py-2 font-bold rounded-xl transition-colors duration-300  text-lg"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
