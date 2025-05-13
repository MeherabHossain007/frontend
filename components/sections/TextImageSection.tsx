"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { JSX, useEffect, useState } from "react";
import { Section } from "@/interfaces/section.interface";
import { ArrowRight } from "lucide-react";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { PrimaryButton, SecondaryButton } from "../ui/Buttons";

interface TextImageSectionProps {
  section: Extract<Section, { __component: "sections.text-image" }>;
  reversed?: boolean;
}

export default function TextImageSection({ section }: TextImageSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const content: BlocksContent = Array.isArray(section.richText)
    ? section.richText
    : [];

  const imageUrl = section.image?.formats?.large?.url || section.image?.url;
  const { reversed = false } = section;

  // Filter out buttons with null or empty buttonText
  const validButtons = section.button?.filter((btn) => btn.buttonText) || [];

  return (
    <section
      ref={ref}
      className={`w-full px-4 py-10 md:py-16 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto flex flex-col ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-8 md:gap-12`}
      >
        <div className="w-full md:w-1/2 relative">
          {imageUrl ? (
            <div className="relative w-full h-0 pb-[90%] md:pb-[100%] overflow-hidden rounded-lg bg-transparent">
              <Image
                src={`${imageUrl}`}
                alt={section.title || "Section image"}
                fill
                className="object-contain absolute inset-0 w-full h-full p-1"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority={false}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-full h-0 pb-[90%] md:pb-[100%] relative bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                  No Image
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Text & Buttons */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-5">
          {section.title && (
            <h2 className="text-xl font-bold leading-tight text-gray-900">
              {section.title}
            </h2>
          )}
          {section.subtitle && (
            <p className="text-2xl md:text-3xl font-bold text-gray-900 w-full md:w-[90%]">
              {section.subtitle}
            </p>
          )}

          <BlocksRenderer
            content={content}
            blocks={{
              paragraph: ({ children }) => (
                <p className="mb-4 text-base text-gray-700">{children}</p>
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
                <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                  {children}
                </code>
              ),
            }}
          />

          {section.features && section.features.length > 0 && (
            <div className="space-y-6">
              {section.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  {feature.icon?.url && (
                    <div className="flex-shrink-0">
                      <Image
                        src={`${feature.icon.url}`}
                        alt={feature.title || ""}
                        height={32}
                        width={32}
                        className="h-8 w-8"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    {Array.isArray(feature.description) ? (
                      <BlocksRenderer
                        content={feature.description as BlocksContent}
                        blocks={{
                          paragraph: ({ children }) => (
                            <p className="mb-4 text-base text-gray-700">
                              {children}
                            </p>
                          ),
                          heading: ({ children, level }) => {
                            const Tag =
                              `h${level}` as keyof JSX.IntrinsicElements;
                            return (
                              <Tag
                                className={`text-${level * 2}xl font-bold mb-4`}
                              >
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
                          image: ({ image }) => (
                            <Image
                              src={image.url}
                              width={image.width}
                              height={image.height}
                              alt={image.alternativeText || ""}
                            />
                          ),
                          link: ({ children, url }) => (
                            <a
                              href={url}
                              className="text-blue-600 hover:underline"
                            >
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
                    ) : (
                      <p className="text-base text-gray-700">
                        {feature.description as React.ReactNode}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {validButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              {validButtons.map((btn, index) => {
                // Get the original index from the unfiltered button array
                const originalIndex =
                  section.button?.findIndex((b) => b.id === btn.id) || 0;

                return originalIndex === 0 ? (
                  <PrimaryButton
                    key={index}
                    text={btn.buttonText}
                    href={btn.buttonLink}
                  />
                ) : (
                  <SecondaryButton
                    key={index}
                    text={btn.buttonText}
                    href={btn.buttonLink}
                    className="flex items-center group"
                  >
                    {btn.buttonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </SecondaryButton>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
