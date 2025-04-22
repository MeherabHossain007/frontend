"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import type { Section } from "@/interfaces/section.interface";
import Image from "next/image";
import { Quote } from "lucide-react";

interface TestimonialsProps {
  section: Extract<Section, { __component: "sections.testimonials" }>;
}

export default function Testimonials({ section }: TestimonialsProps) {
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

  const testimonials = section.testimonials || [];

  return (
    <section
      ref={ref}
      className={`w-full px-4 py-12 md:py-20 bg-gray-50 dark:bg-gray-900 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-500 delay-${
                index * 100
              } ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="flex items-center mb-4">
                <Quote className="text-pink-500 w-8 h-8 mr-2" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                {testimonial.avatar && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${testimonial.avatar.url}`}
                    alt={testimonial.name || "Testimonial avatar"}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
