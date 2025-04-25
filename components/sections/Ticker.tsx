"use client";
import type { Section } from "@/interfaces/section.interface";
import Image from "next/image";
import { useRef, useEffect } from "react";

interface TickerProps {
  section: Extract<Section, { __component: "sections.ticker" }>;
}

export default function Ticker({ section }: TickerProps) {
  const items = section.items || [];
  const duplicatedItems = [...items, ...items]; // For seamless loop

  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    const totalWidth = ticker.scrollWidth / 2;
    ticker.style.setProperty("--ticker-width", `${totalWidth}px`);
  }, []);

  return (
    <section className="w-full overflow-hidden py-6 bg-gray-50 dark:bg-gray-900">
      <div className="relative">
        <div ref={tickerRef} className="flex animate-scroll whitespace-nowrap">
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id || "item"}-${index}`}
              className="mx-6 flex-shrink-0 flex items-center"
            >
              {item.logo ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.logo.url}`}
                  alt={item.name || "Logo"}
                  width={120}
                  height={60}
                  className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition duration-300 ease-in-out"
                />
              ) : (
                <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--ticker-width)));
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
