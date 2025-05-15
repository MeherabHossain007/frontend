import type { PageData } from "@/interfaces/page.interface";
import { Section } from "@/interfaces/section.interface";
import TextImageSection from "@/components/sections/TextImageSection";
import CallToAction from "@/components/sections/CallToAction";
import HeroSection from "../sections/HeroSection";
import Testimonials from "../sections/Testimonial";
import FeatureSlider from "../sections/FeatureSlider";

interface UserType1LayoutProps {
  page: PageData;
}

export default function UserType1Layout({ page }: UserType1LayoutProps) {
  const { sections } = page;

  const renderSection = (section: Section) => {
    switch (section.__component) {
      case "sections.hero":
        return (
          <HeroSection
            key={section.id}
            section={section}
            userType={page.pageType}
          />
        );
      case "sections.text-image":
        return (
          <TextImageSection
            key={section.id}
            section={
              section as Extract<
                Section,
                { __component: "sections.text-image" }
              >
            }
          />
        );
      case "sections.feature-slider":
        return <FeatureSlider key={section.id} section={section} />;
      case "sections.testimonials":
        return <Testimonials key={section.id} section={section} />;
      case "sections.call-to-action":
        return <CallToAction key={section.id} section={section} />;
      default:
        return null;
    }
  };

  // Function to determine background color based on section type and position
  const getSectionBackground = (component: string, index: number): string => {
    if (component === "sections.hero") return "bg-white"; // Hero typically has its own background
    if (component === "sections.call-to-action") return "bg-purple-50"; // CTA with light highlight color
    // Alternate between white and very light gray for visual separation (Lyft style)
    return index % 2 === 0 ? "bg-gray-50" : "bg-white";
  };

  // Function to get section-specific padding
  const getSectionPadding = (component: string): string => {
    if (component === "sections.hero") return "py-0"; // Heroes often handle their own padding
    if (component === "sections.feature-slider") return "py-0"; // Feature slider goes edge to edge

    // Standard sections get responsive padding that increases on larger screens
    return "py-12 md:py-16 lg:py-24 xl:py-28";
  };

  return (
    <main className="w-full overflow-x-hidden">
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`w-full ${getSectionBackground(
            section.__component,
            index
          )} ${getSectionPadding(section.__component)}`}
        >
          {/* Feature slider is typically full width without standard container */}
          {section.__component === "sections.feature-slider" ? (
            renderSection(section)
          ) : (
            /* Lyft-style container - wider than typical for most sections */
            <div
              className={`
              mx-auto px-4 sm:px-6 lg:px-10 xl:px-20
              ${
                section.__component === "sections.hero"
                  ? "max-w-full"
                  : section.__component === "sections.call-to-action"
                  ? "max-w-5xl"
                  : "max-w-7xl"
              }
            `}
            >
              {renderSection(section)}
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
