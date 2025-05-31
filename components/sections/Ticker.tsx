"use client";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
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
  const animationRef = useRef<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const lastTimeRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);

  // Get speed from Strapi or use default value (pixels per second)
  const speed = (section.speed || 1) * 20; // Convert to pixels per second

  // Create multiple copies for seamless infinite scroll
  const multipleItems = [...items, ...items, ...items, ...items];

  // Track if ticker is in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Calculate and set ticker dimensions
  useEffect(() => {
    const calculateWidth = () => {
      if (contentRef.current) {
        // Get width of one complete set
        const itemsWidth = contentRef.current.scrollWidth / 4;
        setTickerWidth(itemsWidth);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [items]);

  // Initialize starting position
  useEffect(() => {
    if (tickerWidth > 0 && currentPosition === 0) {
      setCurrentPosition(window.innerWidth);
    }
  }, [currentPosition, tickerWidth]);

  // Continuous animation function
  const animate = useCallback((timestamp: number) => {
    if (!isAnimatingRef.current) return;

    if (lastTimeRef.current === 0) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = (timestamp - lastTimeRef.current) / 1000; // Convert to seconds
    const movement = speed * deltaTime;

    setCurrentPosition((prevPosition) => {
      let newPosition = prevPosition - movement;

      // Reset position when one complete set has passed
      if (newPosition <= -tickerWidth) {
        newPosition = newPosition + tickerWidth;
      }

      return newPosition;
    });

    lastTimeRef.current = timestamp;
    animationRef.current = requestAnimationFrame(animate);
  }, [speed, tickerWidth]);

  // Handle animation start/pause based on visibility
  useEffect(() => {
    if (tickerWidth === 0) return;

    if (inView) {
      // Start or resume animation
      isAnimatingRef.current = true;
      lastTimeRef.current = 0; // Reset timer to avoid jumps
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Pause animation
      isAnimatingRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [inView, tickerWidth, speed, animate]);

  // Update transform when position changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translateX(${currentPosition}px)`;
    }
  }, [currentPosition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isAnimatingRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-2"
      aria-label="Ticker showcase"
    >
      <div ref={inViewRef} className="relative max-w-screen-2xl mx-auto">
        <div
          ref={contentRef}
          className="flex items-center whitespace-nowrap will-change-transform"
          style={{
            transform: `translateX(${currentPosition}px)`,
          }}
        >
          {multipleItems.map((item, index) => (
            <div
              key={`${item.id || "item"}-${index}`}
              className="group mx-8 flex-shrink-0 flex items-center"
              role="listitem"
            >
              {item.logo ? (
                <div className="relative overflow-hidden rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-700/30">
                  <Image
                    src={`${item.logo.url}`}
                    alt={item.name || "Partner logo"}
                    width={140}
                    height={70}
                    className="h-12 sm:h-16 w-auto object-contain filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 dark:opacity-60 dark:group-hover:opacity-100"
                  />
                </div>
              ) : (
                <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-700/20 dark:hover:shadow-gray-600/30 transition-all group-hover:bg-blue-50 dark:group-hover:bg-gray-700 border border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-medium bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-100 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400">
                    {item.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}