"use client";
import type { PageData } from "@/interfaces/page.interface";
import type { Section } from "@/interfaces/section.interface";

import { motion } from "framer-motion";

import CareerHero from "@/components/sections/Career/CareerHero";
import CareerVision from "@/components/sections/Career/CareerVision";
import CareerHighlights from "@/components/sections/Career/CareerHighlights";
import CareerJobListings from "@/components/sections/Career/CareerJobListings";
import SubNav from "../Shared/SubNav";

interface CareerLayoutProps {
  page: PageData;
}

export default function CareerLayout({ page }: CareerLayoutProps) {
  const { sections } = page;

  const renderSection = (section: Section) => {
    switch (section.__component) {
      case "sections.career-hero":
        return <CareerHero section={section} />;
      case "sections.career-vision":
        return <CareerVision section={section} />;
      case "sections.career-highlights":
        return <CareerHighlights section={section} />;
      case "sections.career-job-listings":
        return <CareerJobListings section={section} />;
      default:
        return null;
    }
  };

  return (
    <main className="w-full overflow-x-hidden mb-10">
      <SubNav />
      {sections.map((section) => (
        <motion.section
          key={section.id}
          className="w-full bg-white dark:bg-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 max-w-7xl">
            {renderSection(section)}
          </div>
        </motion.section>
      ))}
    </main>
  );
}
