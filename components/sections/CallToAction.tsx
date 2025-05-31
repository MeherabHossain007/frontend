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
      className={`w-full px-4 py-12 bg-white dark:bg-gray-900 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-15">
        {/* Left - Image */}
        {section.image && (
          <div className="w-full md:w-1/2 relative aspect-[4/5] bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
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
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white">
            {section.title}
          </h1>
          <p className="text-lg text-gray-800 dark:text-gray-200">{section.subtitle}</p>

          {section.features && section.features.length > 0 && (
            <div className="space-y-6 mt-8">
              {section.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  {feature.icon?.url && (
                    <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                      <Image
                        src={`${feature.icon.url}`}
                        alt={feature.title || ""}
                        height={24}
                        width={24}
                        className="h-6 w-6 dark:brightness-110"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white">{feature.title}</h3>
                    {Array.isArray(feature.description) ? (
                      <BlocksRenderer
                        content={feature.description as BlocksContent}
                        blocks={{
                          paragraph: ({ children }) => (
                            <p className="mb-2 text-base text-gray-700 dark:text-gray-300 block w-full">
                              {children}
                            </p>
                          ),
                          heading: ({ children, level }) => {
                            const Tag = `h${level}` as keyof JSX.IntrinsicElements;
                            const headingClasses = {
                              1: "text-4xl",
                              2: "text-3xl",
                              3: "text-2xl",
                              4: "text-xl",
                              5: "text-lg",
                              6: "text-base"
                            }[level] || "text-lg";
                            
                            return (
                              <Tag className={`${headingClasses} font-bold mb-4 w-full text-gray-900 dark:text-white`}>
                                {children}
                              </Tag>
                            );
                          },
                          list: ({ children, format }) => {
                            const ListTag = format === "ordered" ? "ol" : "ul";
                            return (
                              <ListTag className="list-inside list-disc pl-5 mb-4 w-full text-gray-700 dark:text-gray-300">
                                {children}
                              </ListTag>
                            );
                          },
                          "list-item": ({ children }) => (
                            <li className="mb-2">{children}</li>
                          ),
                          quote: ({ children }) => (
                            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 mb-4 w-full bg-gray-50 dark:bg-gray-800 py-2 rounded-r">
                              {children}
                            </blockquote>
                          ),
                          code: ({ plainText }) => (
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-x-auto w-full border border-gray-200 dark:border-gray-700">
                              <code className="text-gray-800 dark:text-gray-200">{plainText}</code>
                            </pre>
                          ),
                          image: ({ image }) => (
                            <div className="mb-4 rounded-lg overflow-hidden">
                              <Image
                                src={image.url}
                                width={image.width}
                                height={image.height}
                                alt={image.alternativeText || ""}
                                className="w-full h-auto"
                              />
                            </div>
                          ),
                          link: ({ children, url }) => (
                            <a
                              href={url}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
                            >
                              {children}
                            </a>
                          ),
                        }}
                        modifiers={{
                          bold: ({ children }) => (
                            <strong className="text-gray-900 dark:text-white">{children}</strong>
                          ),
                          italic: ({ children }) => <em>{children}</em>,
                          underline: ({ children }) => <u>{children}</u>,
                          strikethrough: ({ children }) => <s>{children}</s>,
                          code: ({ children }) => (
                            <code className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm">
                              {children}
                            </code>
                          ),
                        }}
                      />
                    ) : (
                      <p className="text-base text-gray-700 dark:text-gray-300">
                        {feature.description as React.ReactNode}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <PrimaryButton
              text={section.buttonText || "Join now"}
              href={section.buttonLink || "#"}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            />
            {section.secondaryButtonText && (
              <SecondaryButton
                text={section.secondaryButtonText}
                href={section.secondaryButtonLink || "#"}
                showArrow={true}
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full text-lg transition-colors duration-200"
              />
            )}
          </div>

          {/* Uncomment the following if 'disclaimer' is added to the Section type
          {section.disclaimer && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {section.disclaimer}
              </p>
            </div>
          )}
          */}
        </div>
      </div>
    </section>
  );
}