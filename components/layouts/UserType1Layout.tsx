import type { PageData } from "@/interfaces/page.interface";
import TextImageSection from "@/components/sections/TextImageSection";
import FeatureGrid from "@/components/sections/FeatureGrid";
import CallToAction from "@/components/sections/CallToAction";
import HeroSection from "../sections/HeroSection";
import Testimonials from "../sections/Testimonial";

interface UserType1LayoutProps {
  page: PageData;
}

export default function UserType1Layout({ page }: UserType1LayoutProps) {
  const { sections } = page;

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      {sections.map((section) => {
        switch (section.__component) {
          case "sections.hero":
            return <HeroSection key={section.id} section={section} />;
          case "sections.text-image":
            return <TextImageSection key={section.id} section={section} />;
          case "sections.feature-grid":
            return <FeatureGrid key={section.id} section={section} />;
          case "sections.testimonials":
            return <Testimonials key={section.id} section={section} />;
          case "sections.call-to-action":
            return <CallToAction key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
