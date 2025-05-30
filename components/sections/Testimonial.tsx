"use client";
import { useInView } from "react-intersection-observer";
import { JSX, useEffect, useState } from "react";
import type { Section } from "@/interfaces/section.interface";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

interface TestimonialsProps {
  section: Extract<Section, { __component: "sections.testimonials" }>;
}

export default function Testimonials({ section }: TestimonialsProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const testimonials = section.testimonials || [];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section
      ref={ref}
      className={`w-full py-16 transition-opacity duration-700 bg-[#e0ffef] dark:bg-gray-900 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4">
        {testimonials.length > 0 && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-700 shadow-lg">
                {testimonials[activeIndex].avatar && (
                  <Image
                    src={`${testimonials[activeIndex].avatar.url}`}
                    alt={testimonials[activeIndex].name || "Testimonial avatar"}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            
            <div className="mb-8 text-xl md:text-2xl font-medium text-center text-gray-900 dark:text-gray-100">
              <BlocksRenderer
                content={testimonials[activeIndex].quote as unknown as BlocksContent}
                blocks={{
                  paragraph: ({ children }) => (
                    <p className="mb-4 text-center text-gray-900 dark:text-gray-100">
                      &quot;{children}&quot;
                    </p>
                  ),
                  heading: ({ children, level }) => {
                    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
                    return (
                      <Tag className={`text-${level * 2}xl font-bold mb-4 text-gray-900 dark:text-gray-100`}>
                        {children}
                      </Tag>
                    );
                  },
                  list: ({ children, format }) => {
                    const ListTag = format === "ordered" ? "ol" : "ul";
                    return (
                      <ListTag className="list-inside list-disc pl-5 mb-4 text-center text-gray-900 dark:text-gray-100">
                        {children}
                      </ListTag>
                    );
                  },
                  "list-item": ({ children }) => (
                    <li className="mb-2 text-gray-900 dark:text-gray-100">{children}</li>
                  ),
                }}
                modifiers={{
                  bold: ({ children }) => <strong className="text-gray-900 dark:text-gray-100">{children}</strong>,
                  italic: ({ children }) => <em className="text-gray-900 dark:text-gray-100">{children}</em>,
                  underline: ({ children }) => <u className="text-gray-900 dark:text-gray-100">{children}</u>,
                  strikethrough: ({ children }) => <s className="text-gray-900 dark:text-gray-100">{children}</s>,
                }}
              />
            </div>
            
            <div className="mb-8 text-center">
              <p className="font-semibold text-black dark:text-white">— {testimonials[activeIndex].name}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{testimonials[activeIndex].title}</p>
            </div>
            
            <div className="flex justify-center items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    activeIndex === index 
                      ? "bg-gray-900 dark:bg-gray-100" 
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
              <button 
                onClick={nextTestimonial}
                className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}