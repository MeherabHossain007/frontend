"use client";
import type { PageData } from "@/interfaces/page.interface";
import type { Section } from "@/interfaces/section.interface";

import CallToAction from "../sections/CallToAction";
import FeatureGrid from "../sections/FeatureGrid";
import HeroSection from "../sections/HeroSection";
import Testimonials from "../sections/Testimonial";
import TextImageSection from "../sections/TextImageSection";
import Ticker from "../sections/Ticker";

interface HomeLayoutProps {
  page: PageData;
}

const sectionStyles = {
  background: (component: Section["__component"], index: number): string =>
    component === "sections.ticker"
      ? ""
      : index % 2 === 0
      ? "bg-gray-50 dark:bg-zinc-900"
      : "bg-white dark:bg-zinc-900",

  container: "max-w-7xl",
};

export default function HomeLayout({ page }: HomeLayoutProps) {
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
      case "sections.feature-grid":
        return <FeatureGrid key={key} section={section} />;
      case "sections.testimonials":
        return <Testimonials key={key} section={section} />;
      case "sections.call-to-action":
        return <CallToAction key={key} section={section} />;
      case "sections.ticker":
        return (
          <Ticker
            key={key}
            section={
              section as Extract<Section, { __component: "sections.ticker" }>
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="w-full overflow-x-hidden">
      {sections.map((section, index) => {
        const { __component, id } = section;
        const isTicker = __component === "sections.ticker";
        const bgClass = sectionStyles.background(__component, index);

        return (
          <section key={id} className={`w-full ${bgClass}`}>
            {isTicker ? (
              renderSection(section)
            ) : (
              <div
                className={`mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 ${sectionStyles.container}`}
              >
                {renderSection(section)}
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
