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

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className={`w-full py-12 md:py-16 px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {section.image && (
            <div className="md:w-1/2">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${section.image.url}`}
                  alt={section.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          )}

          <div className={section.image ? "md:w-1/2" : "w-full"}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {section.title}
            </h2>
            <p className="text-lg mb-8">{section.subtitle}</p>

            {section.features && section.features.length > 0 && (
              <div className="space-y-6 mb-8">
                {section.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-2xl text-blue-500">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${feature.icon?.url}`}
                        alt={section.title}
                        height={32}
                        width={32}
                        className="h-10 w-10"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={section.buttonLink}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-center font-medium transition-colors duration-300"
              >
                {section.buttonText}
              </Link>

              {section.secondaryButtonText && (
                <Link
                  href={section.secondaryButtonLink || "#"}
                  className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-full text-center font-medium transition-colors duration-300"
                >
                  {section.secondaryButtonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
