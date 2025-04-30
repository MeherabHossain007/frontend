"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import type { Section } from "@/interfaces/section.interface";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

interface TickerProps {
  section: Extract<Section, { __component: "sections.ticker" }> & {
    speed?: number;
  };
}

export default function Ticker({ section }: TickerProps) {
  const items = useMemo(() => section.items || [], [section.items]);
  const [tickerWidth, setTickerWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Get speed from Strapi or use default value
  const speed = section.speed || 1;

  // Create triple items for smoother infinite loop
  const tripleItems = [...items, ...items, ...items];

  // Track if ticker is in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Calculate and set ticker dimensions
  useEffect(() => {
    const calculateWidth = () => {
      if (contentRef.current) {
        // Divide by 3 since we're using triple items
        const itemsWidth = contentRef.current.scrollWidth / 3;
        setTickerWidth(itemsWidth);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [items]);

  // Calculate animation duration based on content width and speed from Strapi
  const getAnimationDuration = () => {
    // Base duration adjusted by content width for consistent speed
    const baseDuration = 100;
    const speedFactor = Math.max(tickerWidth / 1000, 1);
    return `${(baseDuration * speedFactor) / speed}s`;
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 bg:[#FFDEDE] py-2"
      aria-label="Ticker showcase"
    >
      <div
        ref={inViewRef}
        className="relative max-w-screen-2xl mx-auto"
      >
        <div
          ref={contentRef}
          className="flex items-center whitespace-nowrap"
          style={{
            animation: inView
              ? `ticker-scroll ${getAnimationDuration()} linear infinite`
              : "none",
          }}
        >
          {tripleItems.map((item, index) => (
            <div
              key={`${item.id || "item"}-${index}`}
              className="group mx-8 flex-shrink-0 flex items-center"
              role="listitem"
            >
              {item.logo ? (
                <div className="relative overflow-hidden rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                  <Image
                    src={`${item.logo.url}`}
                    alt={item.name || "Partner logo"}
                    width={140}
                    height={70}
                    className="h-12 sm:h-16 w-auto object-contain filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              ) : (
                <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all group-hover:bg-blue-50 dark:group-hover:bg-gray-700">
                  <span className="text-lg font-medium bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600">
                    {item.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-${tickerWidth}px);
          }
        }
      `}</style>
    </section>
  );
}