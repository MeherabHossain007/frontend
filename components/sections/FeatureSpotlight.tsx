"use client";
import { Section } from "@/interfaces/section.interface";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Link from "next/link";
import React, { JSX } from "react";

interface FeatureSpotlightProps {
  section: Extract<Section, { __component: "sections.feature-spotlight" }>;
}

export default function FeatureSpotlight({ section }: FeatureSpotlightProps) {
  // Extract values from section to match memberRewardsData structure
  const sectionTitle = section.title; // Maps to memberRewardsData.sectionTitle
  const mainHeading = section.subtitle; // Maps to memberRewardsData.mainHeading

  // Handling button click actions
  const handleButtonClick = (action: string) => {
    console.log(`Button clicked: ${action}`);
    // Add your button click logic here
  };

  // Check if there are features and handle safely
  const featuresArray = Array.isArray(section.features) ? section.features : [];
  const firstFeature = featuresArray[0] || null;
  const secondFeature = featuresArray[1] || null;

  return (
    <section className="bg-[#f7f7fc] dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-16 transition-colors duration-300">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 md:gap-0 md:divide-x md:divide-gray-300 dark:md:divide-gray-600">
        {/* Left Side - Only render if there's at least one feature */}
        <div className="space-y-8 pr-0 md:pr-12">
          <p className="text-base font-semibold text-gray-600 dark:text-gray-400 tracking-wide">
            {sectionTitle}
          </p>
          <h2
            className="text-4xl font-bold text-[#0a0033] dark:text-white leading-snug"
            dangerouslySetInnerHTML={{ __html: mainHeading }}
          />

          {firstFeature?.icon?.url && (
            <Image
              src={firstFeature.icon.url}
              alt={firstFeature.title}
              width={200}
              height={80}
              className="dark:brightness-110 dark:contrast-125"
            />
          )}

          {firstFeature && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#0a0033] dark:text-white">
                {firstFeature.title}
              </h3>

              {/* Description Block Renderer */}
              {Array.isArray(firstFeature.description) ? (
                <BlocksRenderer
                  content={firstFeature.description as BlocksContent}
                  blocks={{
                    paragraph: ({ children }) => (
                      <p className="text-base text-[#5f5f7a] dark:text-gray-300 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    heading: ({ children, level }) => {
                      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
                      return (
                        <Tag className={`text-${level * 2}xl font-bold mb-4 text-[#0a0033] dark:text-white`}>
                          {children}
                        </Tag>
                      );
                    },
                    list: ({ children, format }) => {
                      const ListTag = format === "ordered" ? "ol" : "ul";
                      return (
                        <ListTag className="list-inside list-disc pl-5 mb-4 text-[#5f5f7a] dark:text-gray-300">
                          {children}
                        </ListTag>
                      );
                    },
                    "list-item": ({ children }) => (
                      <li className="mb-2">{children}</li>
                    ),
                    quote: ({ children }) => (
                      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 mb-4">
                        {children}
                      </blockquote>
                    ),
                    code: ({ plainText }) => (
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-x-auto">
                        <code className="text-gray-800 dark:text-gray-200">{plainText}</code>
                      </pre>
                    ),
                    image: ({ image }) => (
                      <Image
                        src={image.url}
                        width={image.width}
                        height={image.height}
                        alt={image.alternativeText || ""}
                        className="dark:brightness-110 dark:contrast-125"
                      />
                    ),
                    link: ({ children, url }) => (
                      <Link
                        href={url}
                        className="text-[#6e00ff] dark:text-purple-400 hover:underline hover:text-[#5800cc] dark:hover:text-purple-300 transition-colors"
                      >
                        {children}
                      </Link>
                    ),
                  }}
                  modifiers={{
                    bold: ({ children }) => <strong className="text-[#0a0033] dark:text-white">{children}</strong>,
                    italic: ({ children }) => <em>{children}</em>,
                    underline: ({ children }) => <u>{children}</u>,
                    strikethrough: ({ children }) => <s>{children}</s>,
                    code: ({ children }) => (
                      <code className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1 rounded">
                        {children}
                      </code>
                    ),
                  }}
                />
              ) : (
                <p className="text-base text-[#5f5f7a] dark:text-gray-300 leading-relaxed">
                  {firstFeature.description as React.ReactNode}
                </p>
              )}
            </div>
          )}

          {firstFeature.button?.buttonText && (
            <Link
              href={firstFeature.button.buttonLink || "#"}
              className="inline-block bg-[#6e00ff] dark:bg-purple-600 text-white font-bold py-3 px-6 rounded-full hover:bg-[#5800cc] dark:hover:bg-purple-700 transition-colors duration-200 transform hover:scale-105"
              onClick={() => handleButtonClick("feature0")}
            >
              {firstFeature.button.buttonText || "Learn More"}
            </Link>
          )}
        </div>

        {/* Right Side - Only render if there's a second feature */}
        {secondFeature && (
          <div className="flex flex-col items-center justify-center text-center space-y-8 pl-0 md:pl-12 mt-12 md:mt-0">
            {secondFeature.icon?.url && (
              <Image
                src={secondFeature.icon.url}
                alt={secondFeature.title || "Feature Image"}
                width={300}
                height={200}
                className="dark:brightness-110 dark:contrast-125"
              />
            )}

            <div>
              <h3 className="text-xl font-semibold text-[#0a0033] dark:text-white">
                {secondFeature.title}
              </h3>

              {/* Description Block Renderer */}
              {Array.isArray(secondFeature.description) ? (
                <BlocksRenderer
                  content={secondFeature.description as BlocksContent}
                  blocks={{
                    paragraph: ({ children }) => (
                      <p className="text-base text-[#5f5f7a] dark:text-gray-300 mt-2 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    heading: ({ children, level }) => {
                      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
                      return (
                        <Tag className={`text-${level * 2}xl font-bold mb-4 text-[#0a0033] dark:text-white`}>
                          {children}
                        </Tag>
                      );
                    },
                    list: ({ children, format }) => {
                      const ListTag = format === "ordered" ? "ol" : "ul";
                      return (
                        <ListTag className="list-inside list-disc pl-5 mb-4 text-[#5f5f7a] dark:text-gray-300">
                          {children}
                        </ListTag>
                      );
                    },
                    "list-item": ({ children }) => (
                      <li className="mb-2">{children}</li>
                    ),
                    quote: ({ children }) => (
                      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 mb-4">
                        {children}
                      </blockquote>
                    ),
                    code: ({ plainText }) => (
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-x-auto">
                        <code className="text-gray-800 dark:text-gray-200">{plainText}</code>
                      </pre>
                    ),
                    image: ({ image }) => (
                      <Image
                        src={image.url}
                        width={image.width}
                        height={image.height}
                        alt={image.alternativeText || ""}
                        className="dark:brightness-110 dark:contrast-125"
                      />
                    ),
                    link: ({ children, url }) => (
                      <Link
                        href={url}
                        className="text-[#6e00ff] dark:text-purple-400 hover:underline hover:text-[#5800cc] dark:hover:text-purple-300 transition-colors"
                      >
                        {children}
                      </Link>
                    ),
                  }}
                  modifiers={{
                    bold: ({ children }) => <strong className="text-[#0a0033] dark:text-white">{children}</strong>,
                    italic: ({ children }) => <em>{children}</em>,
                    underline: ({ children }) => <u>{children}</u>,
                    strikethrough: ({ children }) => <s>{children}</s>,
                    code: ({ children }) => (
                      <code className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1 rounded">
                        {children}
                      </code>
                    ),
                  }}
                />
              ) : (
                <p className="text-base text-[#5f5f7a] dark:text-gray-300 mt-2 leading-relaxed">
                  {secondFeature.description as React.ReactNode}
                </p>
              )}
            </div>

            {secondFeature.button?.buttonText && (
              <Link
                href={secondFeature.button.buttonLink || "#"}
                className="inline-block bg-[#6e00ff] dark:bg-purple-600 text-white font-bold py-3 px-6 rounded-full hover:bg-[#5800cc] dark:hover:bg-purple-700 transition-colors duration-200 transform hover:scale-105"
                onClick={() => handleButtonClick("feature1")}
              >
                {secondFeature.button.buttonText || "Get Started"}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}