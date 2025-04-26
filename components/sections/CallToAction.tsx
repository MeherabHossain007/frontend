"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import type { Section } from "@/interfaces/section.interface";
import Link from "next/link";
import Image from "next/image";

interface CallToActionProps {
  section: Extract<Section, { __component: "sections.call-to-action" }>;
}

export default function CallToAction({ section }: CallToActionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isVisible, setIsVisible] = useState(false);
  const imageUrl = section.image?.formats?.large?.url || section.image?.url;

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className={`w-full px-4 py-10 md:py-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
        {/* Left - Image */}
        {section.image && (
          <div className="w-full md:w-1/2 relative aspect-video md:aspect-[4/3]">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
              alt={section.title}
              fill
              className="object-cover rounded-xl shadow-md"
              priority
            />
          </div>
        )}

        {/* Right - Text & Buttons */}
        <div className={`w-full ${section.image ? "md:w-1/2" : "w-full"} text-center md:text-left space-y-6`}>
          <h1 className="text-4xl md:text-4xl font-bold leading-tight">
            {section.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400">{section.subtitle}</p>

          {section.features && section.features.length > 0 && (
            <div className="space-y-6">
              {section.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  {feature.icon?.url && (
                    <div className="flex-shrink-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${feature.icon.url}`}
                        alt={feature.title || ""}
                        height={32}
                        width={32}
                        className="h-8 w-8"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link
              href={section.buttonLink || "#"}
              className="bg-pink-200 hover:bg-pink-300 text-pink-800 px-8 py-2 font-bold rounded-xl transition-colors duration-300 text-lg"
            >
              {section.buttonText || "Get Started"}
            </Link>

            {section.secondaryButtonText && (
              <Link
                href={section.secondaryButtonLink || "#"}
                className="border border-gray-300 hover:bg-gray-500 px-8 py-2 font-bold rounded-xl transition-colors duration-300 text-lg"
              >
                {section.secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}