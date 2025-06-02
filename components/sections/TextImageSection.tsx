"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Section } from "@/interfaces/section.interface";
import { ArrowRight } from "lucide-react";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { PrimaryButton, SecondaryButton } from "../ui/Buttons";
import { JSX } from "react/jsx-runtime";

interface TextImageSectionProps {
  section: Extract<Section, { __component: "sections.text-image" }>;
}

const TextImageSection: React.FC<TextImageSectionProps> = React.memo(
  ({ section }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (inView) setIsVisible(true);
    }, [inView]);

    const content = useMemo<BlocksContent>(
      () => (Array.isArray(section.richText) ? section.richText : []),
      [section.richText]
    );

    const imageUrl = useMemo(
      () => section.image?.formats?.large?.url || section.image?.url,
      [section.image]
    );

    const validButtons = useMemo(
      () =>
        section.button?.filter(
          (b): b is NonNullable<typeof section.button>[number] =>
            Boolean(b.buttonText)
        ) || [],
      [section]
    );

    const renderBlocks = useCallback(
      (blocks: BlocksContent) => (
        <BlocksRenderer
          content={blocks}
          blocks={{
            paragraph: ({ children }) => (
              <p className="mb-3 md:text-lg font-light text-gray-700 dark:text-gray-300">
                {children}
              </p>
            ),
            heading: ({ children, level }) => {
              const Tag = `h${level}` as keyof JSX.IntrinsicElements;
              return (
                <Tag
                  className={`text-${
                    level + 2
                  }xl font-bold mb-4 text-gray-900 dark:text-white`}
                >
                  {children}
                </Tag>
              );
            },
            list: ({ children, format }) => {
              const ListTag = format === "ordered" ? "ol" : "ul";
              return (
                <ListTag className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  {children}
                </ListTag>
              );
            },
            "list-item": ({ children }) => <li>{children}</li>,
            quote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400">
                {children}
              </blockquote>
            ),
            code: ({ plainText }) => (
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
                <code>{plainText}</code>
              </pre>
            ),
            image: ({ image }) => (
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alternativeText || ""}
                loading="lazy"
                className="rounded-lg"
              />
            ),
            link: ({ children, url }) => (
              <a
                href={url}
                className="text-blue-600 dark:text-blue-400 hover:underline"
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
      ),
      []
    );

    const renderFeature = useCallback(
      (feature: NonNullable<typeof section.features>[number], idx: number) => {
        const desc = Array.isArray(feature.description)
          ? renderBlocks(feature.description)
          : feature.description;

        return (
          <div key={idx} className="flex items-start gap-4">
            {feature.icon?.url && (
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                <Image
                  src={feature.icon.url}
                  alt={feature.title || ""}
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain dark:invert dark:brightness-0 dark:contrast-200 dark:filter"
                />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {feature.title}
              </h3>
              <div className="text-gray-600 dark:text-gray-300">
                {desc as React.ReactNode}
              </div>
            </div>
          </div>
        );
      },
      [renderBlocks, section]
    );

    const renderButton = useCallback(
      (btn: NonNullable<typeof section.button>[number], idx: number) => {
        const originalIndex =
          section.button?.findIndex((b) => b.id === btn.id) ?? 0;

        return originalIndex === 0 ? (
          <PrimaryButton
            key={idx}
            text={btn.buttonText!}
            href={btn.buttonLink!}
          />
        ) : (
          <SecondaryButton
            key={idx}
            text={btn.buttonText!}
            href={btn.buttonLink!}
          >
            {btn.buttonText} <ArrowRight className="ml-2 h-5 w-5" />
          </SecondaryButton>
        );
      },
      [section]
    );

    return (
      <section
        ref={ref}
        className={`transition-opacity duration-700 px-6 py-16 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex flex-col-reverse  ${
            section.reversed ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-10 md:gap-16`}
        >
          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left ">
            {section.title && (
              <h2 className="text-sm font-bold uppercase tracking-wide text-black dark:text-primary">
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                {section.subtitle}
              </h3>
            )}

            {renderBlocks(content)}

            {section.features?.length ? (
              <div className="grid grid-cols-1 gap-5 mt-10 ">
                {section.features.map(renderFeature)}
              </div>
            ) : null}

            {validButtons.length > 0 && (
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start ">
                {validButtons.map(renderButton)}
              </div>
            )}
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="aspect-[4/4] overflow-hidden relative ">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={section.title || "Section image"}
                  fill
                  className="object-contain p-4 "
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

TextImageSection.displayName = "TextImageSection";

export default TextImageSection;
