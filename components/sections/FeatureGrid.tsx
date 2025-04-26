"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import type { Section } from "@/interfaces/section.interface";
import Image from "next/image";

interface FeatureGridProps {
  section: Extract<Section, { __component: "sections.feature-grid" }>;
}

export default function FeatureGrid({ section }: FeatureGridProps) {
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

  const features = section.features || [];

  return (
    <section
      ref={ref}
      className={`w-full px-4 py-12 md:py-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-[1280px] mx-auto ">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl  font-bold leading-tight py-4">
            {section.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
            {section.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id || index}
              className={`bg-[#FFDEDE] backdrop-blur-md p-6 rounded-2xl shadow-lg transition-all duration-500 delay-${
                index * 100
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {feature.icon && (
                <div className="flex justify-center items-center mb-6">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden ">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${feature.icon.url}`}
                      alt={feature.title || "Feature icon"}
                      fill
                      sizes="96px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-3 text-center text-gray-800 ">
                {feature.title}
              </h3>
              <p className="text-gray-900  text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
