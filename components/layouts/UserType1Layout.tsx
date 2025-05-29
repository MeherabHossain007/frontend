import type { PageData } from "@/interfaces/page.interface";
import type { Section } from "@/interfaces/section.interface";

import HeroSection from "../sections/HeroSection";
import TextImageSection from "@/components/sections/TextImageSection";
import CallToAction from "@/components/sections/CallToAction";
import Testimonials from "../sections/Testimonial";
import FeatureSlider from "../sections/FeatureSlider";

interface UserType1LayoutProps {
  page: PageData;
}

// Sections that are rendered full-width
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
      ? "bg-white dark:bg-black "
      : "bg-gray-50 dark:bg-gray-900",
  container: "max-w-7xl",
};

export default function UserType1Layout({ page }: UserType1LayoutProps) {
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
      case "sections.testimonials":
        return <Testimonials key={key} section={section} />;
      case "sections.call-to-action":
        return <CallToAction key={key} section={section} />;
      default:
        return null;
    }
  };

  return (
    <main className="w-full overflow-x-hidden">
      {sections.map((section, index) => {
        const { __component, id } = section;
        const bgClass = sectionStyles.background(__component, index);

        return (
          <section key={id} className={`w-full ${bgClass}`}>
            {isFullWidthSection(__component) ? (
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
