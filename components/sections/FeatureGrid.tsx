"use client";
import React, { useState, useRef, useEffect, JSX } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Section } from "@/interfaces/section.interface";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

interface FeatureGridProps {
  section: Extract<Section, { __component: "sections.feature-grid" }>;
}

export default function FeatureGrid({ section }: FeatureGridProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State and refs for carousel
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check if features should be in view
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Check scroll position to control arrow visibility
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
  };

  // Set up scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      scrollContainer?.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  // Handle navigation
  const handlePrev = () => {
    scrollContainerRef.current?.scrollBy({
      left: -272, // Card width (256) + margin (16)
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    scrollContainerRef.current?.scrollBy({
      left: 272, // Card width (256) + margin (16)
      behavior: "smooth",
    });
  };

  // Handle drag events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (scrollContainerRef.current) {
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (scrollContainerRef.current) {
      setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const features = section.features || [];

  return (
    <div ref={ref} className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {section.title}
            </h2>
            <p className="text-lg text-gray-700">{section.subtitle}</p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handlePrev}
              className={`flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 ${
                showLeftArrow
                  ? "text-black hover:bg-gray-100"
                  : "text-gray-300 cursor-default"
              }`}
              disabled={!showLeftArrow}
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              onClick={handleNext}
              className={`flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 ${
                showRightArrow
                  ? "hover:bg-indigo-700 text-white"
                  : "bg-indigo-300 cursor-default"
              }`}
              disabled={!showRightArrow}
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            ref={scrollContainerRef}
            className={`flex space-x-4 pb-6 scroll-smooth overflow-x-auto ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            style={{
              cursor: isDragging ? "grabbing" : "grab",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {features.map((feature, index) => (
              <div
                key={feature.id || index}
                className="flex-shrink-0 w-64 border border-gray-200 rounded-lg p-6 flex flex-col items-center bg-white shadow-sm hover:shadow-md transition duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                {feature.icon && (
                  <div className="relative w-36 h-24 mb-6">
                    <Image
                      src={`${feature.icon.url}`}
                      alt={feature.title || "Feature icon"}
                      fill
                      sizes="144px"
                      className="object-contain"
                    />
                  </div>
                )}

                <div className="w-full space-y-2">
                  <div className="flex flex-col items-start text-gray-700">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
