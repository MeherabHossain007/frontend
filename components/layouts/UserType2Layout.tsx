"use client"
import type { PageData } from "@/interfaces/page.interface";
import type { Section } from "@/interfaces/section.interface";

import { motion } from "framer-motion";

import HeroSection from "../sections/HeroSection";
import TextImageSection from "@/components/sections/TextImageSection";
import FeatureSlider from "../sections/FeatureSlider";
import FeatureGrid from "../sections/FeatureGrid";
import FeatureSpotlight from "../sections/FeatureSpotlight";
import Testimonials from "../sections/Testimonial";

interface UserType2LayoutProps {
  page: PageData;
}

const fullWidthSections = new Set([
  "sections.feature-slider",
  "sections.testimonials",
]);

const isFullWidthSection = (component: Section["__component"]) =>
  fullWidthSections.has(component);

const sectionStyles = {
  background: (component: Section["__component"], index: number): string =>
    isFullWidthSection(component)
      ? ""
      : index % 2 === 0
      ? "bg-white dark:bg-zinc-900 "
      : "bg-gray-50 dark:bg-zinc-900",
  container: "max-w-7xl",
};

export default function UserType2Layout({ page }: UserType2LayoutProps) {
  const { sections } = page;

  const renderSection = (section: Section) => {
    const key = section.id;

    switch (section.__component) {
      case "sections.hero":
        return (
          <HeroSection key={key} section={section} userType={page.pageType} />
        );
      case "sections.text-image":
        return (
          <TextImageSection
            key={key}
            section={
              section as Extract<
                Section,
                { __component: "sections.text-image" }
              >
            }
          />
        );
      case "sections.feature-slider":
        return <FeatureSlider key={key} section={section} />;
      case "sections.feature-grid":
        return <FeatureGrid key={key} section={section} />;
      case "sections.feature-spotlight":
        return <FeatureSpotlight key={key} section={section} />;
      case "sections.testimonials":
        return <Testimonials key={key} section={section} />;
      default:
        return null;
    }
  };

  return (
    <main className="w-full overflow-x-hidden">
      {sections.map((section, index) => {
        const { id, __component } = section;
        const isFullWidth = isFullWidthSection(__component);
        const bgClass = sectionStyles.background(__component, index);

        return (
          <motion.section
            key={id}
            className={`w-full ${bgClass}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {isFullWidth ? (
              renderSection(section)
            ) : (
              <div
                className={`mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 ${sectionStyles.container}`}
              >
                {renderSection(section)}
              </div>
            )}
          </motion.section>
        );
      })}
    </main>
  );
}
