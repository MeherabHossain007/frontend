"use client";
import { useInView } from "react-intersection-observer";
import { JSX, useEffect, useState } from "react";
import type { Section } from "@/interfaces/section.interface";
import Image from "next/image";
import { Quote } from "lucide-react";
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

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const testimonials = section.testimonials || [];

  return (
    <section
      ref={ref}
      className={`w-full px-4 py-12 md:py-20 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 ">
            {section.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-[650px] mx-auto">
            {section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              className={`bg-[#FFDEDE] p-6 rounded-xl shadow-md transition-all duration-500 delay-${
                index * 100
              } ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="flex items-center mb-4">
                <Quote className="text-pink-500 w-8 h-8 mr-2" />
              </div>
              <BlocksRenderer
                content={testimonial.quote as unknown as BlocksContent}
                blocks={{
                  paragraph: ({ children }) => (
                    <p className="mb-4 text-base text-gray-700 ">
                      {children}
                    </p>
                  ),
                  heading: ({ children, level }) => {
                    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
                    return (
                      <Tag className={`text-${level * 2}xl font-bold mb-4`}>
                        {children}
                      </Tag>
                    );
                  },
                  list: ({ children, format }) => {
                    const ListTag = format === "ordered" ? "ol" : "ul";
                    return (
                      <ListTag className="list-inside list-disc pl-5 mb-4">
                        {children}
                      </ListTag>
                    );
                  },
                  "list-item": ({ children }) => (
                    <li className="mb-2">{children}</li>
                  ),
                  quote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:text-gray-400 mb-4">
                      {children}
                    </blockquote>
                  ),
                  code: ({ plainText }) => (
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-x-auto">
                      <code>{plainText}</code>
                    </pre>
                  ),
                  image: ({ image }) => {
                    console.log(image);
                    return (
                      <Image
                        src={image.url}
                        width={image.width}
                        height={image.height}
                        alt={image.alternativeText || ""}
                      />
                    );
                  },
                  link: ({ children, url }) => (
                    <a href={url} className="text-blue-600 hover:underline">
                      {children}
                    </a>
                  ),
                }}
                modifiers={{
                  bold: ({ children }) => <strong>{children}</strong>,
                  italic: ({ children }) => <em>{children}</em>,
                  underline: ({ children }) => <u>{children}</u>,
                  strikethrough: ({ children }) => <s>{children}</s>,
                  code: ({ children }) => (
                    <code className="bg-gray-200 px-1 rounded ">
                      {children}
                    </code>
                  ),
                }}
              />
              <div className="flex items-center">
                {testimonial.avatar && (
                  <Image
                    src={`${testimonial.avatar.url}`}
                    alt={testimonial.name || "Testimonial avatar"}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-black">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 ">
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
