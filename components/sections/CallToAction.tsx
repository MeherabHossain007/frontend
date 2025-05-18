"use client";
import { useInView } from "react-intersection-observer";
import { JSX, useEffect, useState } from "react";
import type { Section } from "@/interfaces/section.interface";
import Image from "next/image";
import { PrimaryButton, SecondaryButton } from "../ui/Buttons";
import { BlocksRenderer, BlocksContent } from "@strapi/blocks-react-renderer";

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
      className={`w-full px-4 py-12 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-15">
        {/* Left - Image */}
        {section.image && (
          <div className="w-full md:w-1/2 relative aspect-[4/5]">
            <Image
              src={`${imageUrl}`}
              alt={section.title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        )}

        {/* Right - Text & Features */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900">
            {section.title}
          </h1>
          <p className="text-lg text-gray-800">{section.subtitle}</p>

          {section.features && section.features.length > 0 && (
            <div className="space-y-6 mt-8">
              {section.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  {feature.icon?.url && (
                    <div className="flex-shrink-0">
                      <Image
                        src={`${feature.icon.url}`}
                        alt={feature.title || ""}
                        height={24}
                        width={24}
                        className="h-6 w-6"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-xl">{feature.title}</h3>
                    {Array.isArray(feature.description) ? (
                      <BlocksRenderer
                        content={feature.description as BlocksContent}
                        blocks={{
                          paragraph: ({ children }) => (
                            <p className="mb-2 text-base text-gray-700 block w-full">
                              {children}
                            </p>
                          ),
                          heading: ({ children, level }) => {
                            const Tag =
                              `h${level}` as keyof JSX.IntrinsicElements;
                            return (
                              <Tag
                                className={`text-${
                                  level * 2
                                }xl font-bold mb-4 w-full`}
                              >
                                {children}
                              </Tag>
                            );
                          },
                          list: ({ children, format }) => {
                            const ListTag = format === "ordered" ? "ol" : "ul";
                            return (
                              <ListTag className="list-inside list-disc pl-5 mb-4 w-full">
                                {children}
                              </ListTag>
                            );
                          },
                          "list-item": ({ children }) => (
                            <li className="mb-2">{children}</li>
                          ),
                          quote: ({ children }) => (
                            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:text-gray-400 mb-4 w-full">
                              {children}
                            </blockquote>
                          ),
                          code: ({ plainText }) => (
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-x-auto w-full">
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

          <div className="pt-6">
            <PrimaryButton
              text={section.buttonText || "Join now"}
              href={section.buttonLink || "#"}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg"
            />
            {section.secondaryButtonText && (
              <SecondaryButton
                text={section.secondaryButtonText}
                href={section.secondaryButtonLink || "#"}
                showArrow={true}
              />
            )}
          </div>

          {/* {section.disclaimer && (
            <p className="text-sm text-gray-600 mt-4">{section.disclaimer}</p>
          )} */}
        </div>
      </div>
    </section>
  );
}
