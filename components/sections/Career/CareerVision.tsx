"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import type { Section } from "@/interfaces/section.interface";
import { JSX } from "react/jsx-runtime";

interface CareerVisionProps {
  section: Section;
}

export default function CareerVision({ section }: CareerVisionProps) {
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

  // Type assertion to access specific properties
  const careerVisionSection = section as Extract<
    Section,
    { __component: "sections.career-vision" }
  >;

  const content: BlocksContent = Array.isArray(careerVisionSection.richText)
    ? careerVisionSection.richText
    : [];

  return (
    <section
      ref={ref}
      className={`w-full transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <BlocksRenderer
          content={content}
          blocks={{
            paragraph: ({ children }) => (
              <p className="mb-4 text-xs text-gray-700">{children}</p>
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
            "list-item": ({ children }) => <li className="mb-2">{children}</li>,
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
            image: ({ image }) => (
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alternativeText || ""}
              />
            ),
            link: ({ children, url }) => (
              <a href={url} className="text-purple-600 hover:underline">
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
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                {children}
              </code>
            ),
          }}
        />
      </div>
    </section>
  );
}
