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
              className={`flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 transition-colors ${
                !isBeginning
                  ? "text-black hover:bg-gray-100"
                  : "text-gray-300 cursor-not-allowed"
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
                  : "bg-indigo-300 cursor-not-allowed text-white"
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
                <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center bg-white shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
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
                                    level === 1
                                      ? "2xl"
                                      : level === 2
                                      ? "xl"
                                      : "lg"
                                  } font-bold mb-4 w-full`}
                                >
                                  {children}
                                </Tag>
                              );
                            },
                            list: ({ children, format }) => {
                              const ListTag =
                                format === "ordered" ? "ol" : "ul";
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
                              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4 w-full">
                                {children}
                              </blockquote>
                            ),
                            code: ({ plainText }) => (
                              <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto w-full text-sm">
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
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
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
                              <code className="bg-gray-200 px-1 rounded text-sm">
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

        /* Optional: Custom scrollbar styling */
        .swiper-scrollbar {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .swiper-scrollbar-drag {
          background: #6366f1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
