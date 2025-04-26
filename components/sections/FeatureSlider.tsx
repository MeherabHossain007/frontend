"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { Section } from "@/interfaces/section.interface";

interface SliderProps {
  section: Extract<Section, { __component: "sections.feature-slider" }>;
}

const FeatureSlider = ({ section }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { ref } = useInView({ triggerOnce: true, threshold: 0.2 });

  const backgroundImage = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${section?.backgroundImage?.url}`;

  useEffect(() => {
    if (!section.slides.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % section.slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [section.slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!section.slides.length) return null;

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center items-center py-10"
    >
      {/* Background */}
      <div
        className="absolute h-[50%] inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl px-8">
        {/* Left: Title */}
        <div className=" w-1/2 text-left mt-40">
          <h2 className="text-lg md:text-xl font-semibold leading-tight text-white">
            {section.slides[currentSlide].title}
          </h2>
        </div>

        {/* Center: Phone */}
        <div className="flex justify-center">
          <div className="relative h-[700px] w-[700px] max-w-lg max-h-lg">
            {section.slides[currentSlide].image?.url && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${section.slides[currentSlide].image.url}`}
                alt={section.slides[currentSlide].title}
                fill
                className="object-contain"
              />
            )}
          </div>
        </div>

        {/* Right: Subtitle + Button */}
        <div className="w-1/2 flex flex-col items-start mt-48">
          <p className="text-sm md:text-base text-white mb-6 max-w-sm">
            {section.slides[currentSlide].subtitle}
          </p>
          <Link
            href={section.slides[currentSlide].buttonLink}
            className="inline-block bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-800 transition"
          >
            {section.slides[currentSlide].buttonText}
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-32 flex space-x-2 z-10">
        {section.slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentSlide ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureSlider;
