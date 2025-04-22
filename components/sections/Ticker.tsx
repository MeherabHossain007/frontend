"use client";
import { useEffect, useRef } from "react";
import type { Section } from "@/interfaces/section.interface";
import Image from "next/image";

interface TickerProps {
  section: Extract<Section, { __component: "sections.ticker" }>;
}

export default function Ticker({ section }: TickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let animationId: number;
    let position = 0;

    const scroll = () => {
      if (!scrollElement) return;

      position -= 1;
      if (position <= -scrollElement.scrollWidth / 2) {
        position = 0;
      }

      scrollElement.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const items = section.items || [];
  const duplicatedItems = [...items, ...items]; // Duplicate items for seamless scrolling

  return (
    <section className="w-full py-8 overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="relative">
        <div className="flex items-center" ref={scrollRef}>
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id || "item"}-${index}`}
              className="flex-shrink-0 mx-8 flex items-center"
            >
              {item.logo && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.logo.url}`}
                  alt={item.name || "Partner logo"}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              )}
              {!item.logo && item.name && (
                <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
