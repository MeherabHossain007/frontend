"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { Section } from "@/interfaces/section.interface";
import { SecondaryButton } from "../ui/Buttons";
import { ArrowRight } from "lucide-react";

interface SliderProps {
  section: Extract<Section, { __component: "sections.feature-slider" }>;
}

const FeatureSlider = ({ section }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const backgroundImage = section?.backgroundImage?.url || "";
  const hasMultipleSlides = section.slides.length > 1;

  useEffect(() => {
    if (!hasMultipleSlides || !inView) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % section.slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [section.slides.length, hasMultipleSlides, inView]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!section.slides.length) return null;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden flex flex-col justify-center items-center py-12 md:py-16 lg:py-20"
    >
      {/* Background */}
      <div
        className="absolute h-1/2 md:h-[50%] inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Content Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-12">
          {/* Left: Main Title */}
          <div className="w-full lg:w-1/3 text-center lg:text-right mt-16 lg:mt-40 mb-6 lg:mb-0">
            <h2 className="text-lg md:text-xl font-semibold leading-tight text-black">
              {section.title}
            </h2>
          </div>

          {/* Center: Phone Image - Vertically centered and properly sized */}
          <div className="flex justify-center w-full lg:w-1/3">
            <div className="relative h-[300px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px] max-w-lg">
              {section.slides[currentSlide].image?.url && (
                <Image
                  src={section.slides[currentSlide].image.url}
                  alt={section.slides[currentSlide].title || "Feature image"}
                  fill
                  priority={currentSlide === 0}
                  className="object-contain"
                />
              )}
            </div>
          </div>

          {/* Right: Title + Subtitle + Button */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start mt-6 lg:mt-[15rem]">
            <h3 className="text-md md:text-lg font-semibold mb-3 text-center lg:text-left">
              {section.slides[currentSlide].title}
            </h3>
            <p className="text-sm md:text-base text-black mb-6 max-w-sm text-center lg:text-left">
              {section.slides[currentSlide].subtitle}
            </p>
            {!hasMultipleSlides && section.slides[currentSlide].buttonText && (
              <SecondaryButton
                key={section.slides[currentSlide].id}
                text={section.slides[currentSlide].buttonText}
                href={section.slides[currentSlide].buttonLink}
                className="flex items-center group"
              >
                {section.slides[currentSlide].buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </SecondaryButton>
            )}
            {hasMultipleSlides && section.slides[currentSlide].buttonText && (
              <Link
                href={section.slides[currentSlide].buttonLink || "#"}
                className="inline-block bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-800 transition"
              >
                {section.slides[currentSlide].buttonText}
              </Link>
            )}
          </div>
        </div>

        {/* Dots - Better positioned and only shown for multiple slides */}
        {hasMultipleSlides && (
          <div className="flex justify-center mt-8 space-x-2 z-10">
            {section.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentSlide
                    ? "bg-black"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureSlider;
