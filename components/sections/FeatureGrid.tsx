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
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {section.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id || index}
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-500 delay-${
                index * 100
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {feature.icon && (
                <div className="mb-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${feature.icon.url}`}
                    alt={feature.title || "Feature icon"}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
