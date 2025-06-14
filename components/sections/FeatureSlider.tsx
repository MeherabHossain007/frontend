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
      className="relative w-full overflow-hidden flex flex-col justify-center items-center py-12 md:py-16 lg:py-20 bg-white dark:bg-zinc-900 transition-colors duration-300"
    >
      {/* Background */}
      <div
        className="absolute h-1/2 md:h-[50%] inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for better text readability in dark mode */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 transition-all duration-300"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Content Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-12">
          {/* Left: Main Title */}
          <div className="w-full lg:w-1/3 text-center lg:text-right mt-16 lg:mt-40 mb-6 lg:mb-0">
            <h2 className="text-lg md:text-xl font-semibold leading-tight text-black dark:text-white transition-colors duration-300">
              {section.title}
            </h2>
          </div>

          {/* Center: Phone Image - Vertically centered and properly sized */}
          <div className="flex justify-center w-full lg:w-1/3">
            <div className="relative h-[300px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px] max-w-lg">
              {section.slides[currentSlide].image?.url && (
                <div className="relative w-full h-full rounded-2xl">
                  <Image
                    src={section.slides[currentSlide].image.url}
                    alt={section.slides[currentSlide].title || "Feature image"}
                    fill
                    priority={currentSlide === 0}
                    className="object-contain p-2 dark:brightness-110"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right: Title + Subtitle + Button */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start mt-6 lg:mt-[15rem]">
            <h3 className="text-md md:text-lg font-semibold mb-3 text-center lg:text-left text-gray-900 dark:text-white transition-colors duration-300">
              {section.slides[currentSlide].title}
            </h3>
            <p className="text-sm md:text-base text-black dark:text-white mb-6 max-w-sm text-center lg:text-left transition-colors duration-300">
              {section.slides[currentSlide].subtitle}
            </p>

            {!hasMultipleSlides && section.slides[currentSlide].buttonText && (
              <SecondaryButton
                key={section.slides[currentSlide].id}
                text={section.slides[currentSlide].buttonText}
                href={section.slides[currentSlide].buttonLink}
                className="flex items-center group border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 px-4 py-2 rounded-full"
              >
                {section.slides[currentSlide].buttonText}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </SecondaryButton>
            )}

            {hasMultipleSlides && section.slides[currentSlide].buttonText && (
              <Link
                href={section.slides[currentSlide].buttonLink || "#"}
                className="inline-flex items-center bg-black dark:bg-white text-white dark:text-gray-900 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 hover:shadow-lg transition-all duration-200 group"
              >
                {section.slides[currentSlide].buttonText}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            )}
          </div>
        </div>

        {/* Dots - Better positioned and only shown for multiple slides */}
        {hasMultipleSlides && (
          <div className="flex justify-center mt-8 space-x-3 z-10">
            {section.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-black dark:bg-white scale-110 shadow-lg"
                    : "bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400 hover:scale-105"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default FeatureSlider;