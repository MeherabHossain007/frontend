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
    <div ref={ref} className="w-full py-16 bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-zfrom-zinc-900 dark:text-white mb-4">
              {section.title}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {section.subtitle}
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handlePrev}
              className={`flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 transition-colors ${
                !isBeginning
                  ? "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
                  : "text-gray-300 dark:text-gray-600 cursor-not-allowed"
              }`}
              disabled={isBeginning}
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              onClick={handleNext}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                !isEnd
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-indigo-300 dark:bg-indigo-800 cursor-not-allowed text-white"
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
          <div className="swiper-container-with-mask relative">
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
                  <div className="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 flex flex-col items-center bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-shadow duration-300 h-full">
                    <h3 className="text-xl font-bold text-zfrom-zinc-900 dark:text-white mb-4 text-center">
                      {feature.title}
                    </h3>

                    {feature.icon && (
                      <div className="relative w-36 h-24 mb-6 flex-shrink-0">
                        <Image
                          src={`${feature.icon.url}`}
                          alt={feature.title || "Feature icon"}
                          fill
                          sizes="144px"
                          className="object-contain"
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
                                const Tag =
                                  `h${level}` as keyof JSX.IntrinsicElements;
                                return (
                                  <Tag
                                    className={`text-${
                                      level === 1
                                        ? "2xl"
                                        : level === 2
                                        ? "xl"
                                        : "lg"
                                    } font-bold mb-4 w-full text-zfrom-zinc-900 dark:text-white`}
                                  >
                                    {children}
                                  </Tag>
                                );
                              },
                              list: ({ children, format }) => {
                                const ListTag =
                                  format === "ordered" ? "ol" : "ul";
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
                                <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 mb-4 w-full">
                                  {children}
                                </blockquote>
                              ),
                              code: ({ plainText }) => (
                                <pre className="bg-gray-100 dark:bg-zinc-800 p-4 rounded mb-4 overflow-x-auto w-full text-sm text-zfrom-zinc-900 dark:text-gray-100">
                                  <code>{plainText}</code>
                                </pre>
                              ),
                              image: ({ image }) => (
                                <div className="mb-4 w-full">
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
                                  className="text-blue-600 dark:text-blue-400 hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                            modifiers={{
                              bold: ({ children }) => (
                                <strong>{children}</strong>
                              ),
                              italic: ({ children }) => <em>{children}</em>,
                              underline: ({ children }) => <u>{children}</u>,
                              strikethrough: ({ children }) => (
                                <s>{children}</s>
                              ),
                              code: ({ children }) => (
                                <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded text-sm text-zfrom-zinc-900 dark:text-gray-100">
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

            {/* Gradient mask overlays */}
            {!isBeginning && (
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent pointer-events-none z-10 transition-opacity duration-300"></div>
            )}
            {!isEnd && (
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent pointer-events-none z-10 transition-opacity duration-300"></div>
            )}
          </div>
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

        /* Optional: Custom scrollbar styling */
        .swiper-scrollbar {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .swiper-scrollbar-drag {
          background: #6366f1;
          border-radius: 10px;
        }

        /* Dark mode scrollbar */
        @media (prefers-color-scheme: dark) {
          .dark .swiper-scrollbar {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        /* Ensure proper stacking for gradient masks */
        .swiper-container-with-mask {
          isolation: isolate;
        }
      `}</style>
    </div>
  );
}
