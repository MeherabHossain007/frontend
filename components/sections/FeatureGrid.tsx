"use client";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { Section } from "@/interfaces/section.interface";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { JSX } from "react/jsx-runtime";

interface FeatureGridProps {
  section: Extract<Section, { __component: "sections.feature-grid" }>;
}

export default function FeatureGrid({ section }: FeatureGridProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const features = section.features || [];

  // Check if features should be in view
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Handle navigation
  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  // Handle swiper events
  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div ref={ref} className="w-full py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">{section.subtitle}</p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handlePrev}
              className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-200 ${
                !isBeginning
                  ? "border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
                  : "border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed"
              }`}
              disabled={isBeginning}
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              onClick={handleNext}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                !isEnd
                  ? "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-lg hover:shadow-xl"
                  : "bg-indigo-300 dark:bg-indigo-800 cursor-not-allowed text-white dark:text-gray-400"
              }`}
              disabled={isEnd}
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className={`transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Swiper
            modules={[Navigation, Pagination, Keyboard, A11y]}
            spaceBetween={16}
            slidesPerView="auto"
            grabCursor={true}
            keyboard={{
              enabled: true,
            }}
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
            className="pb-6"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={feature.id || index} className="!w-64">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center bg-white dark:bg-gray-800 shadow-sm hover:shadow-md dark:shadow-gray-900/20 dark:hover:shadow-gray-900/40 transition-all duration-300 h-full">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    {feature.title}
                  </h3>

                  {feature.icon && (
                    <div className="relative w-36 h-24 mb-6 flex-shrink-0 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Image
                        src={`${feature.icon.url}`}
                        alt={feature.title || "Feature icon"}
                        fill
                        sizes="144px"
                        className="object-contain dark:brightness-110"
                      />
                    </div>
                  )}

                  <div className="w-full space-y-2 flex-grow">
                    <div className="flex flex-col items-start text-gray-700 dark:text-gray-300">
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
                                1: "text-2xl",
                                2: "text-xl",
                                3: "text-lg",
                                4: "text-base",
                                5: "text-sm",
                                6: "text-sm"
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
                              <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 mb-4 w-full bg-gray-50 dark:bg-gray-700 py-2 rounded-r">
                                {children}
                              </blockquote>
                            ),
                            code: ({ plainText }) => (
                              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-x-auto w-full text-sm border border-gray-200 dark:border-gray-600">
                                <code className="text-gray-800 dark:text-gray-200">{plainText}</code>
                              </pre>
                            ),
                            image: ({ image }) => (
                              <div className="mb-4 w-full rounded-lg overflow-hidden">
                                <Image
                                  src={image.url}
                                  width={image.width}
                                  height={image.height}
                                  alt={image.alternativeText || ""}
                                  className="max-w-full h-auto"
                                />
                              </div>
                            ),
                            link: ({ children, url }) => (
                              <a
                                href={url}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .swiper-slide {
          height: auto;
        }

        .swiper-wrapper {
          align-items: stretch;
        }

        /* Hide default swiper navigation since we use custom buttons */
        .swiper-button-next,
        .swiper-button-prev {
          display: none;
        }

        /* Custom scrollbar styling for dark mode */
        .swiper-scrollbar {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        @media (prefers-color-scheme: dark) {
          .swiper-scrollbar {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        .swiper-scrollbar-drag {
          background: #6366f1;
          border-radius: 10px;
        }

        /* Dark mode support for class-based dark mode */
        .dark .swiper-scrollbar {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .dark .swiper-scrollbar-drag {
          background: #818cf8;
        }

        /* Enhanced hover effects for cards */
        .dark .swiper-slide > div:hover {
          border-color: rgba(75, 85, 99, 0.8);
          background-color: rgba(55, 65, 81, 0.9);
        }
      `}</style>
    </div>
  );
}